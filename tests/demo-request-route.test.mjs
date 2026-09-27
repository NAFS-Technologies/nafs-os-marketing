import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, mock, test } from 'node:test'

import ts from 'typescript'

// Compile the actual dependency-free route, then exercise its Web Request/Response boundary.
const source = readFileSync(new URL('../src/app/api/demo-request/route.ts', import.meta.url), 'utf8')

const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  reportDiagnostics: true
})

assert.deepEqual(compiled.diagnostics, [])

const { POST } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`)
const previousWebhook = process.env.NAFS_LEAD_WEBHOOK_URL

const validLead = {
  name: 'Example Operator',
  businessName: 'Example Commerce',
  email: 'operator@example.com',
  phone: '+880 1712 345678',
  monthlyOrders: '500-2000',
  interest: 'orders-delivery',
  message: 'We need help with order handoffs.',
  companyWebsite: ''
}

let delivery

const request = (payload = validLead, headers = {}) => new Request('https://site.example/api/demo-request', {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...headers },
  body: JSON.stringify(payload)
})

beforeEach(() => {
  delete process.env.NAFS_LEAD_WEBHOOK_URL
  delivery = mock.method(globalThis, 'fetch', async () => new Response(null, { status: 204 }))
})

afterEach(() => {
  mock.restoreAll()
  if (previousWebhook === undefined) delete process.env.NAFS_LEAD_WEBHOOK_URL
  else process.env.NAFS_LEAD_WEBHOOK_URL = previousWebhook
})

test('missing lead delivery configuration never reports success', async () => {
  const response = await POST(request())
  const body = await response.json()

  assert.equal(response.status, 503)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.notEqual(body.accepted, true)
  assert.equal('configured' in body, false)
  assert.equal(delivery.mock.callCount(), 0)
})

test('blank delivery configuration never reports success', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = '   '
  assert.equal((await POST(request())).status, 503)
  assert.equal(delivery.mock.callCount(), 0)
})

for (const payload of [null, [], 'not an object', 42, false]) {
  test(`rejects non-object JSON: ${JSON.stringify(payload)}`, async () => {
    assert.equal((await POST(request(payload))).status, 400)
    assert.equal(delivery.mock.callCount(), 0)
  })
}

test('rejects malformed JSON without throwing', async () => {
  const response = await POST(new Request('https://site.example/api/demo-request', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{'
  }))

  assert.equal(response.status, 400)
  assert.equal(delivery.mock.callCount(), 0)
})

test('rejects an empty body', async () => {
  const response = await POST(new Request('https://site.example/api/demo-request', {
    method: 'POST', headers: { 'content-type': 'application/json' }
  }))

  assert.equal(response.status, 400)
})

test('rejects non-JSON requests before any delivery attempt', async () => {
  assert.equal((await POST(request(validLead, { 'content-type': 'text/plain' }))).status, 415)
  assert.equal(delivery.mock.callCount(), 0)
})

test('accepts the JSON charset parameter', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'
  assert.equal((await POST(request(validLead, { 'content-type': 'application/json; charset=UTF-8' }))).status, 202)
})

test('rejects oversized declared bodies', async () => {
  assert.equal((await POST(request(validLead, { 'content-length': '16001' }))).status, 413)
  assert.equal(delivery.mock.callCount(), 0)
})

for (const headers of [{}, { 'content-length': '1' }, { 'content-length': 'not-a-number' }]) {
  test(`enforces actual bytes despite length header ${JSON.stringify(headers)}`, async () => {
    let cancelled = false

    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"message":"'))
        controller.enqueue(new TextEncoder().encode('x'.repeat(16_001)))
      },
      cancel() { cancelled = true }
    })

    const response = await POST(new Request('https://site.example/api/demo-request', {
      method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body, duplex: 'half'
    }))

    assert.equal(response.status, 413)
    assert.equal(cancelled, true)
    assert.equal(delivery.mock.callCount(), 0)
  })
}

test('counts UTF-8 bytes rather than JavaScript character count', async () => {
  assert.equal((await POST(request({ ...validLead, message: 'ক'.repeat(6000) }))).status, 413)
})

test('accepts a valid UTF-8 character split across body chunks', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'

  const bytes = new TextEncoder().encode(JSON.stringify({ ...validLead, name: 'আসিফ' }))

  const body = new ReadableStream({
    start(controller) {
      for (const byte of bytes) controller.enqueue(Uint8Array.of(byte))
      controller.close()
    }
  })

  const response = await POST(new Request('https://site.example/api/demo-request', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body, duplex: 'half'
  }))

  assert.equal(response.status, 202)
  assert.equal(JSON.parse(delivery.mock.calls[0].arguments[1].body).name, 'আসিফ')
})

test('rejects invalid UTF-8 and unreadable request streams', async () => {
  for (const body of [Uint8Array.of(0xff), new ReadableStream({ start(controller) { controller.error(new Error('read failed')) } })]) {
    const response = await POST(new Request('https://site.example/api/demo-request', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body, duplex: 'half'
    }))

    assert.equal(response.status, 400)
  }

  assert.equal(delivery.mock.callCount(), 0)
})

test('honeypot submissions are discarded without contacting the webhook', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'
  assert.equal((await POST(request({ companyWebsite: 'https://bot.example' }))).status, 202)
  assert.equal(delivery.mock.callCount(), 0)
})

test('returns field-specific errors for missing or non-string required values', async () => {
  for (const value of [undefined, null, 42, {}, [], '', '   ']) {
    const response = await POST(request({ name: value, businessName: value, email: value, phone: value, monthlyOrders: value, interest: value }))
    const body = await response.json()

    assert.equal(response.status, 400)
    assert.deepEqual(Object.keys(body.errors).sort(), ['businessName', 'email', 'interest', 'monthlyOrders', 'name', 'phone'])
  }

  assert.equal(delivery.mock.callCount(), 0)
})

for (const [name, limit] of Object.entries({ name: 100, businessName: 120, email: 160, phone: 30, monthlyOrders: 40, interest: 80, message: 1500 })) {
  test(`rejects an overlong ${name} instead of silently truncating it`, async () => {
    const response = await POST(request({ ...validLead, [name]: 'x'.repeat(limit + 1) }))
    const body = await response.json()

    assert.equal(response.status, 400)
    assert.match(body.errors[name], /no more than/)
    assert.equal(delivery.mock.callCount(), 0)
  })
}

test('rejects malformed email, punctuation-only phone and unknown selections', async () => {
  const response = await POST(request({ ...validLead, email: 'a@', phone: '-------', monthlyOrders: 'unlimited', interest: 'unknown' }))
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.deepEqual(Object.keys(body.errors).sort(), ['email', 'interest', 'monthlyOrders', 'phone'])
  assert.equal(delivery.mock.callCount(), 0)
})

test('requires 7–15 phone digits independently of formatting', async () => {
  for (const phone of ['+88012', '1234567890123456', 'abcdefghij']) {
    const response = await POST(request({ ...validLead, phone }))

    assert.equal(response.status, 400)
    assert.ok((await response.json()).errors.phone)
  }
})

test('accepts every monthly order and interest option in the visible form', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'

  const form = readFileSync(new URL('../src/components/landing/demo-request-form.tsx', import.meta.url), 'utf8')

  for (const name of ['monthlyOrders', 'interest']) {
    const select = form.match(new RegExp(`<select[^>]*name='${name}'[\\s\\S]*?<\\/select>`))?.[0]

    assert.ok(select, `${name} must remain a labelled native select`)

    const options = [...select.matchAll(/<option value='([^']+)'/g)].map(match => match[1])

    assert.ok(options.length > 0)

    for (const option of options) assert.equal((await POST(request({ ...validLead, [name]: option }))).status, 202, `${name}=${option}`)
  }
})

test('normalizes fields and forwards only the intended lead after successful validation', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'

  const response = await POST(request({ ...validLead, name: '  Example Operator  ', email: ' OPERATOR@EXAMPLE.COM ', extra: 'do not forward' }))
  const [url, options] = delivery.mock.calls[0].arguments
  const lead = JSON.parse(options.body)
  const body = await response.json()

  assert.equal(response.status, 202)
  assert.equal(body.accepted, true)
  assert.equal(delivery.mock.callCount(), 1)
  assert.equal(url, 'https://delivery.example/lead')
  assert.equal(options.method, 'POST')
  assert.equal(options.cache, 'no-store')
  assert.equal(options.headers['x-nafs-source'], 'website-demo-request')
  assert.equal(lead.name, 'Example Operator')
  assert.equal(lead.email, 'operator@example.com')
  assert.equal(lead.source, 'nafs-site-demo-request')
  assert.ok(Number.isFinite(Date.parse(lead.receivedAt)))
  assert.equal('companyWebsite' in lead, false)
  assert.equal('extra' in lead, false)
  assert.equal(JSON.stringify(body).includes('operator@example.com'), false)
})

test('optional message can be absent or blank but not an object', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'

  for (const message of [undefined, '', '   ']) assert.equal((await POST(request({ ...validLead, message }))).status, 202)

  const response = await POST(request({ ...validLead, message: {} }))

  assert.equal(response.status, 400)
  assert.ok((await response.json()).errors.message)
})

test('webhook rejection never acknowledges delivery or retries automatically', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'
  delivery.mock.mockImplementation(async () => new Response('private provider error', { status: 500 }))

  const response = await POST(request())
  const body = await response.json()

  assert.equal(response.status, 502)
  assert.notEqual(body.accepted, true)
  assert.equal(delivery.mock.callCount(), 1)
  assert.equal(JSON.stringify(body).includes('private provider error'), false)
})

test('webhook network errors do not expose configuration or lose the error state', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'
  delivery.mock.mockImplementation(async () => { throw new Error('private provider secret') })

  const response = await POST(request())
  const body = await response.json()

  assert.equal(response.status, 502)
  assert.equal(JSON.stringify(body).includes('private provider secret'), false)
  assert.equal(delivery.mock.callCount(), 1)
})

test('webhook timeout aborts delivery, clears its timer and returns a recoverable error', async () => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://delivery.example/lead'
  mock.method(globalThis, 'setTimeout', (callback, delay) => {
    assert.equal(delay, 8000)
    queueMicrotask(callback)

    return 123
  })

  const clear = mock.method(globalThis, 'clearTimeout', () => {})

  delivery.mock.mockImplementation(async (_url, { signal }) => new Promise((_resolve, reject) => {
    if (signal.aborted) reject(new Error('aborted'))
    else signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true })
  }))

  const response = await POST(request())

  assert.equal(response.status, 502)
  assert.equal(delivery.mock.callCount(), 1)
  assert.equal(clear.mock.calls[0].arguments[0], 123)
})

test('optional details still enforce limits when made entirely of whitespace', async () => {
  const response = await POST(request({ ...validLead, message: ' '.repeat(1501) }))

  assert.equal(response.status, 400)
  assert.ok((await response.json()).errors.message)
})
