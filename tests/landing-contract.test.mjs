import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const files = {
  landing: read('src/components/landing/nafs-landing-page.tsx'),
  motion: read('src/components/landing/cinematic-motion.tsx'),
  visuals: read('src/components/landing/platform-visuals.tsx'),
  ticker: read('src/components/landing/event-ticker.tsx'),
  header: read('src/components/landing/site-header.tsx'),
  footer: read('src/components/landing/site-footer.tsx'),
  products: read('src/app/(pages)/products/page.tsx'),
  productDetail: read('src/app/(pages)/products/[slug]/page.tsx'),
  integrations: read('src/app/(pages)/integrations/page.tsx'),
  b2b: read('src/app/(pages)/b2b/page.tsx'),
  whiteLabelRedirect: read('src/app/(pages)/white-label/page.tsx'),
  partners: read('src/app/(pages)/partners/page.tsx'),
  solutions: read('src/app/(pages)/solutions/page.tsx'),
  solutionDetail: read('src/app/(pages)/solutions/[slug]/page.tsx'),
  useCases: read('src/app/(pages)/use-cases/page.tsx'),
  useCaseDetail: read('src/app/(pages)/use-cases/[slug]/page.tsx'),
  pricing: read('src/app/(pages)/pricing/page.tsx'),
  blog: read('src/app/(pages)/blog/page.tsx'),
  blogDetail: read('src/app/(pages)/blog/[slug]/page.tsx'),
  checkoutArticle: read('src/content/blog/nafs-commerce-does-not-stop-at-checkout.mdx'),
  reliabilityArticle: read('src/content/blog/nafs-durable-work-is-a-product-feature.mdx'),
  codArticle: read('src/content/blog/nafs-building-around-cod-and-courier-reality.mdx'),
  posts: read('src/lib/posts.ts'),
  content: read('src/content/nafs-landing.ts'),
  form: read('src/components/landing/demo-request-form.tsx'),
  rootLayout: read('src/app/layout.tsx'),
  pagesLayout: read('src/app/(pages)/layout.tsx'),
  polish: read('src/app/polish.css'),
  home: read('src/app/(pages)/page.tsx'),
  notFound: read('src/app/not-found.tsx'),
  og: read('src/app/opengraph-image.tsx'),
  sitemap: read('src/app/sitemap.ts'),
  manifest: read('src/app/manifest.json')
}

const allPublicCopy = Object.values(files).join('\n')

const buyerFacingCopy = [
  files.landing,
  files.visuals,
  files.ticker,
  files.footer,
  files.products,
  files.productDetail,
  files.integrations,
  files.b2b,
  files.partners,
  files.solutions,
  files.solutionDetail,
  files.useCases,
  files.useCaseDetail,
  files.pricing,
  files.blog,
  files.checkoutArticle,
  files.reliabilityArticle,
  files.codArticle,
  files.content,
  files.form,
  files.notFound
].join('\n')

for (const forbidden of [
  'Take Control of Your Money',
  'Personalized Budgeting',
  'Smart Expense Tracking',
  'One operating brain',
  'AI-powered commerce',
  'revolutionize your business',
  'transform your business with AI',
  'Smarter Money Decisions',
  'Get Money Tips',
  'Track expenses, manage budgets',
  'Swipe - the app',
  '৳19,900',
  '৳39,900',
  'all couriers are supported',
  'fully integrated Daraz',
  'Redis is the NAFS OS core',
  'all 900 APIs are already integrated into NAFS',
  'Serious operations leave a trace.'
]) {
  assert.equal(allPublicCopy.toLowerCase().includes(forbidden.toLowerCase()), false, `unsafe, legacy or outdated positioning remains: ${forbidden}`)
}

for (const internalPhrase of [
  'control plane',
  'canonical commerce',
  'client tenant',
  'tenant context',
  'source of truth',
  'execution boundary',
  'commercial state',
  'business contracts',
  'configured adapter path',
  'provider boundary',
  'operational truth',
  'replatform',
  'idempotency',
  'outbox pattern',
  'inbox pattern'
]) {
  assert.equal(buyerFacingCopy.toLowerCase().includes(internalPhrase.toLowerCase()), false, `internal engineering language is visible to visitors: ${internalPhrase}`)
}

for (const required of [
  'Everything behind modern commerce.',
  'One sale. The entire business keeps moving.',
  'Know what happened, what is running and what needs attention.',
  'Connect the tools you already use. Run the work in one place.',
  'Launch commerce software under your brand—without building it from scratch.',
  'Grow with NAFS—and earn from the value you help create.',
  'One platform for every part of commerce.',
  'What would you most like to fix?',
  'Pathao is currently available',
  'RedX and Steadfast are not advertised as available',
  'NAFS Flow',
  'NAFS Storefront',
  'NAFS Mobile',
  'Shopify',
  'WooCommerce',
  'Daraz',
  'Bangladesh'
]) {
  assert.equal(allPublicCopy.includes(required), true, `required visitor-facing language is missing: ${required}`)
}

// Home stays a concise platform story rather than another catalog or long product tour.
for (const catalogName of ['productEcosystem', 'useCases', 'pricingPlans', 'solutionCards']) {
  assert.equal(files.landing.includes(catalogName), false, `homepage must not dump ${catalogName}`)
}

assert.equal(files.landing.includes('SystemScrollStory'), false, 'homepage must not restore the long sticky multi-screen story')

for (const scene of ['CommercePulseScene', 'ProductMapScene', 'MigrationBoard', 'IntegrationLogoCloud', 'B2BPlatformScene', 'PartnerGrowthScene', 'VisibilityConsole', 'TechnologyRails']) {
  assert.match(files.landing, new RegExp(scene), `homepage missing ${scene}`)
}

// Retired motion scenes must not remain in the shared client module.
assert.equal(files.motion.includes('SystemScrollStory'), false, 'retired sticky story must not remain in the shared reveal bundle')
assert.equal(files.motion.includes('InfrastructureTelemetry'), false, 'retired telemetry must not remain in the shared reveal bundle')
assert.equal(files.motion.includes('useScroll'), false, 'shared reveal component must stay lightweight')
assert.match(files.motion, /useReducedMotion/)

// The visual system keeps real technology proof without making it the sales copy.
assert.match(files.visuals, /cdn\.simpleicons\.org/)
assert.match(files.visuals, /google\.com\/s2\/favicons/)
assert.match(files.visuals, /useReducedMotion/)
assert.match(files.visuals, /PostgreSQL/)
assert.match(files.visuals, /Nango/)
assert.match(files.visuals, /Flexprice/)
assert.match(files.visuals, /Valkey \/ Redis/)
assert.match(files.visuals, /Shopify/)
assert.match(files.visuals, /WooCommerce/)
assert.match(files.visuals, /900\+ supported apps & APIs/)

// Buyer-facing navigation is readable, active-aware and uses the commercial B2B category.
for (const route of ['/products', '/integrations', '/b2b', '/partners', '/solutions', '/pricing']) {
  assert.equal(files.header.includes(`href: '${route}'`), true, `header missing ${route}`)
}

assert.match(files.header, /label: 'B2B'/)
assert.equal(files.header.includes("label: 'White-label'"), false, 'white-label must not be the primary navigation category')
assert.match(files.header, /text-\[15px\]/)
assert.match(files.header, /usePathname/)
assert.match(files.header, /aria-current/)
assert.equal(files.header.includes('text-[12px] font-medium text-[#6f6f6b]'), false, 'desktop primary navigation must not regress to tiny copy')
assert.equal(files.header.includes('ModeToggle'), false, 'primary header should stay visually restrained')
assert.match(files.header, /NEXT_PUBLIC_APP_URL/)
assert.match(files.header, /auth\/sign-up/)
assert.match(files.header, /Start free trial/)
assert.match(files.landing, /NEXT_PUBLIC_APP_URL/)
assert.match(files.landing, /auth\/sign-up/)
assert.match(files.landing, /Start free trial/)
assert.equal(files.header.includes('Talk to us'), false, 'primary header CTA must open direct signup')
assert.match(files.footer, /href='\/b2b'/)
assert.match(files.pagesLayout, /site-skip-link/)

// Shared polish remains available to the public site.
assert.match(files.polish, /\.site-action/)
assert.match(files.polish, /\.site-card/)
assert.match(files.polish, /\.site-arrow-link/)
assert.match(files.polish, /overflow-x: clip/)

// Dedicated buyer paths remain first-class and visual.
assert.match(files.products, /ProductMapScene/)
assert.match(files.products, /TechnologyRails/)
assert.match(files.productDetail, /generateStaticParams/)
assert.match(files.productDetail, /EventTicker/)
assert.match(files.integrations, /IntegrationLogoCloud/)
assert.match(files.integrations, /MigrationBoard/)
assert.match(files.b2b, /B2BPlatformScene/)
assert.match(files.b2b, /TechnologyRails/)
assert.match(files.partners, /PartnerGrowthScene/)
assert.match(files.partners, /TechnologyRails/)
assert.match(files.solutions, /solutionCards\.map/)
assert.match(files.solutionDetail, /generateStaticParams/)
assert.match(files.solutionDetail, /EventTicker/)
assert.match(files.useCases, /useCases\.map/)
assert.match(files.useCaseDetail, /generateStaticParams/)
assert.match(files.useCaseDetail, /EventTicker/)
assert.match(files.pricing, /B2B/)
assert.match(files.pricing, /partners/i)
assert.match(files.blog, /NAFS JOURNAL/)
assert.match(files.blogDetail, /BlogPosting/)
assert.match(files.posts, /PUBLIC_POST_PREFIX = 'nafs-'/)

// Shared activity playback remains interactive and accessible.
assert.match(files.ticker, /aria-pressed/)
assert.match(files.ticker, /aria-live='polite'/)
assert.match(files.ticker, /onMouseEnter/)
assert.match(files.ticker, /Paused/)
assert.match(files.ticker, /Live activity/)

// Legacy URL remains safe but is not canonical marketing architecture.
assert.match(files.whiteLabelRedirect, /redirect\('\/b2b'\)/)
assert.equal(files.sitemap.includes("path: '/white-label'"), false, 'white-label compatibility URL must not stay canonical in sitemap')

for (const route of ['/integrations', '/b2b', '/partners']) {
  assert.equal(files.sitemap.includes(route), true, `sitemap missing ${route}`)
}

assert.match(files.sitemap, /productEcosystem/)
assert.match(files.sitemap, /solutionCards/)
assert.match(files.sitemap, /useCases/)
assert.match(files.manifest, /"name": "B2B"/)
assert.match(files.manifest, /"url": "\/b2b"/)

// Claim and conversion contracts remain grounded.
assert.match(files.content, /Pathao is currently available through NAFS Courier/)
assert.match(files.content, /RedX and Steadfast are not advertised as available/)
assert.match(files.form, /What would you most like to fix\?/)
assert.match(files.form, /api\/demo-request/)
assert.match(files.form, /aria-busy/)
assert.match(files.form, /text-base/)
assert.match(files.home, /SoftwareApplication/)
assert.match(files.home, /Branded B2B platforms/)
assert.match(files.rootLayout, /Geist/)
assert.match(files.rootLayout, /B2B commerce platform/)
assert.match(files.og, /Everything behind modern commerce/)
assert.match(read('.env.example'), /NEXT_PUBLIC_CONTACT_EMAIL=/)
assert.match(read('.env.example'), /NEXT_PUBLIC_APP_URL=https:\/\/app\.nafs\.tech/)
assert.match(read('.env.example'), /NAFS_LEAD_WEBHOOK_URL=/)

console.log('NAFS visitor language, positioning and mobile contract passed')
