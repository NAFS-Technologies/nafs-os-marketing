import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/app/marketing.css', import.meta.url), 'utf8')

// Structural budgets only. Browser tests own actual layout acceptance.
for (const required of ['minmax(0, 1fr)', 'max-width: 767px', 'max-width: 419px', 'min-height: 48px', 'prefers-reduced-motion: reduce', 'overflow-wrap: anywhere', ':focus-visible', '100dvh']) {
  assert.ok(css.includes(required), `missing responsive/accessibility budget: ${required}`)
}

assert.equal(css.includes('420vh'), false)
