export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16_000
const fieldLimits = { name: 100, businessName: 120, email: 160, phone: 30, monthlyOrders: 40, interest: 80, message: 1500 } as const
const monthlyOrderRanges = new Set(['under-500', '500-2000', '2000-5000', '5000-15000', '15000-plus'])
const interests = new Set(['orders-delivery', 'stock-accuracy', 'cod-payments', 'purchasing', 'reporting', 'staff-process', 'multiple-problems', 'b2b', 'partners'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-\s\d]{7,30}$/
const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type FieldName = keyof typeof fieldLimits

const reply = (message: string, status: number, extra: Record<string, unknown> = {}) =>
  Response.json({ message, ...extra }, { status, headers: { 'Cache-Control': 'no-store' } })

function permittedOrigin(request: Request) {
  const origin = request.headers.get('origin')

  if (!origin) return true

  const allowed = new Set([new URL(request.url).origin])
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim()

  if (configured) {
    try {
      allowed.add(new URL(configured).origin)
    } catch {
      return false
    }
  }

  return allowed.has(origin)
}

export async function POST(request: Request) {
  if (!permittedOrigin(request)) return reply('Please submit this request from the NAFS website.', 403)
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return reply('The request is too large.', 413)

  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return reply('Please submit the form as JSON.', 415)
  }

  const reader = request.body?.getReader()

  if (!reader) return reply('Please submit a valid request.', 400)

  let payload: unknown

  try {
    const decoder = new TextDecoder('utf-8', { fatal: true })
    let body = ''
    let bytes = 0

    // Bound actual bytes, including streams with an absent or untrusted length header.
    while (true) {
      const { done, value } = await reader.read()

      if (done) break
      bytes += value.byteLength

      if (bytes > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => undefined)

        return reply('The request is too large.', 413)
      }

      body += decoder.decode(value, { stream: true })
    }

    payload = JSON.parse(body + decoder.decode())
  } catch {
    return reply('Please submit a valid request.', 400)
  } finally {
    reader.releaseLock()
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return reply('Please submit a valid request.', 400)

  const values = payload as Record<string, unknown>

  // A honeypot response is deliberately indistinguishable to automated submissions.
  if (typeof values.companyWebsite === 'string' && values.companyWebsite.trim()) {
    return reply('Thanks. Your request has been received.', 202, { accepted: true })
  }

  const fields = {} as Record<FieldName, string>
  const errors: Partial<Record<FieldName, string>> = {}

  for (const name of Object.keys(fieldLimits) as FieldName[]) {
    const value = values[name]

    fields[name] = typeof value === 'string' ? value.trim() : ''

    if (name === 'message' && (value === undefined || value === '')) continue

    if (typeof value !== 'string') errors[name] = 'Please complete this field.'
    else if (value.length > fieldLimits[name]) errors[name] = `Please use no more than ${fieldLimits[name]} characters.`
    else if (name !== 'message' && !fields[name]) errors[name] = 'Please complete this field.'
  }

  if (!errors.email && !emailPattern.test(fields.email)) errors.email = 'Please enter a valid work email.'

  const phoneDigits = fields.phone.replace(/\D/g, '').length

  if (!errors.phone && (!phonePattern.test(fields.phone) || phoneDigits < 7 || phoneDigits > 15)) errors.phone = 'Please enter a phone or WhatsApp number with 7–15 digits.'
  if (!errors.monthlyOrders && !monthlyOrderRanges.has(fields.monthlyOrders)) errors.monthlyOrders = 'Please select a monthly order range.'
  if (!errors.interest && !interests.has(fields.interest)) errors.interest = 'Please select the closest problem.'
  if (Object.keys(errors).length) return reply('Please check the highlighted fields.', 400, { errors })

  if (values.requestId !== undefined && (typeof values.requestId !== 'string' || !requestIdPattern.test(values.requestId))) {
    return reply('The request reference is invalid. Please reload the page and try again.', 400)
  }

  const requestId = typeof values.requestId === 'string' ? values.requestId : crypto.randomUUID()
  const attribution: Record<string, string> = {}

  if (values.attribution && typeof values.attribution === 'object' && !Array.isArray(values.attribution)) {
    const input = values.attribution as Record<string, unknown>

    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const value = input[key]

      if (typeof value === 'string' && /^[a-zA-Z0-9 _.-]{1,80}$/.test(value)) attribution[key] = value
    }
  }

  const webhookUrl = process.env.NAFS_LEAD_WEBHOOK_URL?.trim()

  if (!webhookUrl) return reply('Online requests are temporarily unavailable. Please contact us by email.', 503)

  try {
    const url = new URL(webhookUrl)
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)

    if (url.username || url.password || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) {
      return reply('Online requests are temporarily unavailable. Please contact us by email.', 503)
    }
  } catch {
    return reply('Online requests are temporarily unavailable. Please contact us by email.', 503)
  }

  const lead = { ...fields, email: fields.email.toLowerCase(), source: 'nafs-site-demo-request', receivedAt: new Date().toISOString(), requestId, ...(Object.keys(attribution).length ? { attribution } : {}) }
  const headers: Record<string, string> = { 'content-type': 'application/json', 'x-nafs-source': 'website-demo-request', 'Idempotency-Key': requestId }
  const webhookToken = process.env.NAFS_LEAD_WEBHOOK_TOKEN?.trim()

  if (webhookToken) headers.authorization = `Bearer ${webhookToken}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8_000)

  try {
    const response = await fetch(webhookUrl, { method: 'POST', headers, body: JSON.stringify(lead), cache: 'no-store', redirect: 'error', signal: controller.signal })

    if (!response.ok) return reply('We could not confirm delivery. Please contact us by email before sending again.', 502)
  } catch {
    return reply('We could not confirm delivery. Please contact us by email before sending again.', 502)
  } finally {
    clearTimeout(timeout)
  }

  return reply('Thanks. We will contact you to plan a walkthrough around your business.', 202, { accepted: true })
}
