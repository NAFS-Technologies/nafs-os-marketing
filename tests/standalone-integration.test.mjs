import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const pkg = JSON.parse(read('package.json'))
const config = read('next.config.ts')
const environment = read('.env.example')

assert.equal(pkg.name, '@nafs/marketing')

for (const name of ['NEXT_PUBLIC_SITE_URL=', 'NEXT_PUBLIC_ERP_URL=', 'NEXT_PUBLIC_SIGN_IN_URL=', 'NAFS_LEAD_WEBHOOK_URL=']) assert.ok(environment.includes(name))
for (const guardrail of ['poweredByHeader: false', "key: 'Content-Security-Policy'", "frame-ancestors 'none'", "key: 'Permissions-Policy'", "key: 'Referrer-Policy'", "key: 'X-Content-Type-Options'", "key: 'X-Frame-Options'"]) assert.ok(config.includes(guardrail), `missing delivery security: ${guardrail}`)

const containment = read('src/app/ui-guardrails.css')

assert.ok(read('src/app/layout.tsx').includes('ui-guardrails.css'))

for (const rule of ['overflow-x: clip', 'min-width: 0', "[data-slot='dropdown-menu-content']", "[data-slot='select-trigger']", 'max-width: calc(100vw - 2rem)']) assert.ok(containment.includes(rule))
assert.match(read('src/components/landing/site-header.tsx'), /siteConfig.signInUrl/)
assert.match(read('compose.yml'), /127\.0\.0\.1:/)
assert.equal(read('Dockerfile').includes('services/erp'), false)
