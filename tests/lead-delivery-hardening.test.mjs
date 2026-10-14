import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, mock, test } from 'node:test'

import ts from 'typescript'

const code = ts.transpileModule(readFileSync(new URL('../src/app/api/demo-request/route.ts', import.meta.url), 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
const saved = { url: process.env.NAFS_LEAD_WEBHOOK_URL, token: process.env.NAFS_LEAD_WEBHOOK_TOKEN, site: process.env.NEXT_PUBLIC_SITE_URL }
const valid = { name: 'Test Operator', businessName: 'Test Business', email: 'test@example.com', phone: '+8801712345678', monthlyOrders: 'under-500', interest: 'partners', message: '', requestId: '11111111-1111-4111-8111-111111111111' }
const request = (payload = valid, headers = {}) => new Request('https://site.example/api/demo-request', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(payload) })
let delivery

beforeEach(() => {
  process.env.NAFS_LEAD_WEBHOOK_URL = 'https://receiver.example/leads'
  delete process.env.NAFS_LEAD_WEBHOOK_TOKEN
  delete process.env.NEXT_PUBLIC_SITE_URL
  delivery = mock.method(globalThis, 'fetch', async () => new Response(null, { status: 204 }))
})

afterEach(() => {
  mock.restoreAll()

  for (const [name, value] of Object.entries({ NAFS_LEAD_WEBHOOK_URL: saved.url, NAFS_LEAD_WEBHOOK_TOKEN: saved.token, NEXT_PUBLIC_SITE_URL: saved.site })) {
    if (value === undefined) delete process.env[name]
    else process.env[name] = value
  }
})

test('reject cross-origin browser submissions without delivering', async () => {
  assert.equal((await POST(request(valid, { origin: 'https://unrelated.example' }))).status, 403)
  assert.equal(delivery.mock.callCount(), 0)
  assert.equal((await POST(request(valid, { origin: 'https://site.example' }))).status, 202)
})

test('allow the configured public origin behind a reverse proxy', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://marketing.example'

  assert.equal((await POST(request(valid, { origin: 'https://marketing.example' }))).status, 202)
})

test('forward a stable idempotency reference, prevent redirects and isolate bearer credentials', async () => {
  process.env.NAFS_LEAD_WEBHOOK_TOKEN = 'server-only-test-token'

  const response = await POST(request())
  const options = delivery.mock.calls[0].arguments[1]

  assert.equal(options.headers['Idempotency-Key'], valid.requestId)
  assert.equal(JSON.parse(options.body).requestId, valid.requestId)
  assert.equal(options.headers.authorization, 'Bearer server-only-test-token')
  assert.equal(options.redirect, 'error')
  assert.equal((await response.text()).includes('server-only-test-token'), false)
})

test('invalid request references never reach the receiver', async () => {
  for (const requestId of ['', {}, 'not-a-uuid', '11111111-1111-4111-8111-111111111111\r\nsecret']) assert.equal((await POST(request({ ...valid, requestId }))).status, 400)
  assert.equal(delivery.mock.callCount(), 0)
})

test('allowlist bounded campaign labels without raw URLs or contact fields', async () => {
  await POST(request({ ...valid, attribution: { utm_source: 'newsletter', utm_campaign: 'autumn-2026', utm_content: 'person@example.com', utm_medium: 'x'.repeat(81), email: 'private@example.com', referrer: 'https://example.com/?secret=1' } }))

  const lead = JSON.parse(delivery.mock.calls[0].arguments[1].body)

  assert.deepEqual(lead.attribution, { utm_source: 'newsletter', utm_campaign: 'autumn-2026' })
})

test('reject insecure or credential-bearing configured destinations', async () => {
  for (const url of ['http://receiver.example/leads', 'https://user:password@receiver.example', 'file:///tmp/leads', 'not-a-url']) {
    process.env.NAFS_LEAD_WEBHOOK_URL = url
    assert.equal((await POST(request())).status, 503)
  }

  assert.equal(delivery.mock.callCount(), 0)
})
