import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const headerSource = read('src/components/landing/site-header.tsx')
const pagesLayoutSource = read('src/app/(pages)/layout.tsx')

for (const required of [
  'ref={menuButtonRef}',
  'ref={mobileNavigationRef}',
  "querySelector<HTMLElement>('[data-mobile-nav-initial]')",
  'menuButtonRef.current?.focus()',
  "event.key === 'Escape'",
  "event.key !== 'Tab'",
  'navigation.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)',
  'document.activeElement',
  'activeElement === last',
  'activeElement === first',
  '{isOpen ? (',
  "role='dialog'",
  "aria-modal='true'",
  "aria-label='Mobile navigation'",
  'data-mobile-nav-initial',
  "aria-label='Close navigation'",
  "className='grid size-11",
  "className='fixed inset-x-0 top-[72px] z-[60]",
  'h-[calc(100dvh-72px)]',
  'safe-area-inset-bottom',
  'body:has(#mobile-navigation){overflow:hidden}'
]) {
  assert.equal(
    headerSource.includes(required),
    true,
    `mobile navigation focus contract is missing: ${required}`
  )
}

for (const forbidden of [
  'inert={!isOpen}',
  "aria-hidden='false'",
  'aria-hidden={!isOpen}'
]) {
  assert.equal(
    headerSource.includes(forbidden),
    false,
    `conditionally mounted mobile navigation must not carry hidden-state semantics: ${forbidden}`
  )
}

for (const required of [
  'const handleMobileNavigationClick = (href: string)',
  'destination.pathname === window.location.pathname',
  'destination.search === window.location.search',
  'closeMobileNavigation(restoreFocus)',
  'handleMobileNavigationClick(item.href)',
  'handleMobileNavigationClick(signUpUrl)'
]) {
  assert.equal(
    headerSource.includes(required),
    true,
    `same-page navigation focus contract is missing: ${required}`
  )
}

for (const routeLabel of ['Platform', 'Integrations', 'B2B', 'Partners', 'Solutions', 'Pricing']) {
  assert.equal(headerSource.includes(`label: '${routeLabel}'`), true, `mobile navigation is missing ${routeLabel}`)
}

assert.equal(
  pagesLayoutSource.includes("<main id='main-content' tabIndex={-1}"),
  true,
  'skip-link target must accept programmatic focus'
)

for (const required of [
  "window.matchMedia('(min-width: 1280px)')",
  "desktop.addEventListener('change', onDesktopChange)",
  "desktop.removeEventListener('change', onDesktopChange)",
  "window.addEventListener('popstate', onHistoryChange)",
  "window.removeEventListener('popstate', onHistoryChange)",
  'element.inert = true',
  'element.inert = inert',
  'homeLinkRef.current?.focus({ preventScroll: true })'
]) {
  assert.equal(headerSource.includes(required), true, `mobile navigation recovery contract is missing: ${required}`)
}

console.log('public mobile navigation and focus contract passed')
