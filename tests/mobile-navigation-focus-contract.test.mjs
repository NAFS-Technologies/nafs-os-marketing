import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const header = read('src/components/landing/site-header.tsx')
const css = read('src/app/marketing.css')

// Native modal owns Escape, focus containment and background inertness.
// Runtime keyboard/focus assertions live in browser acceptance, not copy snapshots.
for (const required of ['<dialog', 'showModal()', 'onClose={afterClose}', "aria-label='Mobile navigation'", "aria-controls='mobile-navigation'", 'aria-expanded={isOpen}', 'usePathname', 'menuButtonRef.current?.focus', 'homeLinkRef.current?.focus', "desktop.addEventListener('change'", "desktop.removeEventListener('change'", "window.addEventListener('popstate'", "window.removeEventListener('popstate'"]) {
  assert.ok(header.includes(required), `missing navigation behavior: ${required}`)
}

assert.match(css, /body:has\(\.m-mobile-dialog\[open\]\)/)
assert.match(css, /100dvh/)
assert.match(css, /safe-area-inset-bottom/)
assert.match(read('src/app/(pages)/layout.tsx'), /<main id='main-content' tabIndex=\{-1\}/)
