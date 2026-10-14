import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

import { chromium } from '@playwright/test'

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:3100'
const browser = await chromium.launch({ headless: true })
const widths = [360, 390, 412, 768, 1024, 1440, 1920]
const paths = ['/', '/products', '/products/os', '/products/storefront', '/products/courier', '/products/flow', '/products/mobile', '/products/shopping', '/products/platform', '/products/partners', '/solutions', '/solutions/orders', '/solutions/inventory', '/solutions/purchasing', '/solutions/money', '/solutions/management', '/solutions/team', '/use-cases', '/use-cases/multi-brand-retail', '/use-cases/d2c-commerce', '/use-cases/social-plus-website', '/use-cases/cod-heavy-business', '/use-cases/multi-location', '/integrations', '/pricing', '/b2b', '/partners', '/blog', '/blog/nafs-planning-your-first-rollout', '/blog/nafs-understanding-product-readiness']
const results = []
const failures = []

await mkdir('test-results/screenshots', { recursive: true })

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', locale: 'en-GB', timezoneId: 'Asia/Dhaka', colorScheme: 'light' })
    const page = await context.newPage()
    let errors = []

    page.on('pageerror', error => errors.push(error.message))

    for (const path of paths) {
      errors = []

      try {
        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })

        assert.equal(response.status(), 200)
        await page.locator('h1').waitFor()
        await page.evaluate(() => document.fonts.ready)
        assert.equal(await page.locator('h1').count(), 1, 'exactly one page heading')

        const geometry = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }))

        assert.ok(geometry.document <= geometry.viewport + 1, `document overflow: ${JSON.stringify(geometry)}`)
        assert.ok(geometry.body <= geometry.viewport + 1, `body overflow: ${JSON.stringify(geometry)}`)
        assert.deepEqual(errors, [], 'no browser exceptions')

        if ([390, 1440].includes(width) && ['/', '/products/os', '/integrations', '/pricing', '/blog'].includes(path)) await page.screenshot({ path: `test-results/screenshots/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}-${width}.png`, fullPage: true, animations: 'disabled' })

        results.push({ width, path, passed: true })
      } catch (error) {
        failures.push({ width, path, message: String(error) })
        await page.screenshot({ path: `test-results/screenshots/failure-${width}-${path.replaceAll('/', '_')}.png`, fullPage: true }).catch(() => undefined)
      }
    }

    await context.close()
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' })
  const page = await context.newPage()

  for (const path of ['/products/not-real', '/blog/nafs-not-real', '/missing-page']) {
    const response = await page.goto(`${baseUrl}${path}`)

    assert.equal(response.status(), 404)
    assert.equal(await page.locator('h1').count(), 1)
  }

  await page.goto(`${baseUrl}/white-label`)
  assert.ok(page.url().endsWith('/b2b'))
  await context.close()
} finally {
  await browser.close()
  await writeFile('test-results/layout-results.json', JSON.stringify({ results, failures }, null, 2))
}

assert.deepEqual(failures, [], 'responsive route checks failed')
console.log(`${results.length} responsive route checks passed; screenshots are unapproved review candidates.`)
