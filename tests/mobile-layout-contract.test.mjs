import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const files = {
  landing: read('src/components/landing/nafs-landing-page.tsx'),
  visuals: read('src/components/landing/platform-visuals.tsx'),
  hero: read('src/components/landing/pristine-scenes.tsx'),
  ticker: read('src/components/landing/event-ticker.tsx'),
  header: read('src/components/landing/site-header.tsx'),
  form: read('src/components/landing/demo-request-form.tsx'),
  products: read('src/app/(pages)/products/page.tsx'),
  productDetail: read('src/app/(pages)/products/[slug]/page.tsx'),
  integrations: read('src/app/(pages)/integrations/page.tsx'),
  b2b: read('src/app/(pages)/b2b/page.tsx'),
  partners: read('src/app/(pages)/partners/page.tsx'),
  solutions: read('src/app/(pages)/solutions/page.tsx'),
  solutionDetail: read('src/app/(pages)/solutions/[slug]/page.tsx'),
  useCases: read('src/app/(pages)/use-cases/page.tsx'),
  useCaseDetail: read('src/app/(pages)/use-cases/[slug]/page.tsx'),
  pricing: read('src/app/(pages)/pricing/page.tsx'),
  blog: read('src/app/(pages)/blog/page.tsx'),
  blogDetail: read('src/app/(pages)/blog/[slug]/page.tsx'),
  notFound: read('src/app/not-found.tsx')
}

assert.match(files.landing, /text-\[48px\]/, 'homepage needs a deliberate 360px hero size')
assert.match(files.landing, /min-\[390px\]:text-\[54px\]/, 'homepage needs an intentional 390px hero step')
assert.match(files.landing, /grid grid-cols-2 gap-3/, 'homepage proof strip must remain two columns on mobile')
assert.match(files.landing, /items-stretch[^'\n]*min-\[420px\]:items-center/, 'homepage actions must stretch on narrow screens')
assert.equal(files.landing.includes('h-[420vh]'), false, 'homepage must not restore the long sticky mobile story')

for (const [name, source] of Object.entries({
  products: files.products,
  productDetail: files.productDetail,
  integrations: files.integrations,
  b2b: files.b2b,
  partners: files.partners,
  solutions: files.solutions,
  solutionDetail: files.solutionDetail,
  useCases: files.useCases,
  useCaseDetail: files.useCaseDetail,
  pricing: files.pricing,
  blog: files.blog,
  blogDetail: files.blogDetail
})) {
  assert.match(source, /text-4xl/, `${name} needs a readable mobile page-title scale`)
}

assert.match(files.visuals, /site-scrollbar-hidden[^'\n]*snap-x/, 'multi-step scenes need touch-friendly horizontal navigation')
assert.match(files.visuals, /min-w-\[168px\]/, 'commerce stages need readable mobile widths')
assert.match(files.visuals, /className='relative md:hidden'/, 'platform map needs a dedicated mobile composition')
assert.match(files.visuals, /hidden min-h-\[520px\] max-w-5xl md:block/, 'desktop orbital map must stay off the mobile canvas')
assert.match(files.visuals, /grid-cols-\[88px_1fr_auto\]/, 'activity rows need a compact mobile layout')

assert.match(files.hero, /sm:hidden/, 'hero needs mobile order cards')
assert.match(files.hero, /hidden sm:block/, 'desktop order table must stay off the mobile presentation')
assert.equal(files.hero.includes('min-w-[720px]'), false, 'hero must not require horizontal table scrolling on mobile')
assert.match(files.hero, /grid grid-cols-3 gap-3/, 'mobile order cards need compact status details')

assert.match(files.ticker, /sm:grid-cols-3/, 'activity details must expand cleanly beyond mobile')
assert.match(files.form, /text-base/, 'form controls must remain at least 16px on mobile')
assert.match(files.form, /w-full[^'\n]*sm:w-auto/, 'form action must use a full-width mobile touch target')
assert.match(files.header, /100dvh/, 'mobile menu must use the dynamic viewport height')
assert.match(files.header, /safe-area-inset-bottom/, 'mobile menu must respect the device safe area')
assert.match(files.header, /min-\[390px\]:grid-cols/, 'mobile account actions must retain the 390px grid step')
assert.match(files.header, /h-12 items-center justify-center/, 'mobile account actions need 48px touch targets')
assert.match(files.b2b, /sm:grid-cols-\[48px_190px_1fr\]/, 'B2B lifecycle must stay stacked on narrow screens')
assert.match(files.notFound, /px-4 py-16/, '404 page must retain narrow-screen page padding')

console.log('NAFS mobile readability and layout contract passed')
