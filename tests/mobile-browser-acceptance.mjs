import assert from 'node:assert/strict'

import { chromium } from '@playwright/test'

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:3100'

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 }
]

const routes = [
  '/',
  '/products',
  '/products/os',
  '/integrations',
  '/b2b',
  '/partners',
  '/solutions',
  '/solutions/orders',
  '/use-cases',
  '/use-cases/cod-heavy-business',
  '/pricing',
  '/blog',
  '/blog/nafs-commerce-does-not-stop-at-checkout',
  '/missing-page-for-mobile-check'
]

const ignoredConsoleFragments = [
  'Failed to load resource',
  'favicon.ico'
]

const mobileNavigationLabels = ['Platform', 'Integrations', 'B2B', 'Partners', 'Solutions', 'Pricing']
const failures = []
const browser = await chromium.launch({ headless: true })

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: 'reduce',
      colorScheme: 'light',
      locale: 'en-BD'
    })

    const page = await context.newPage()

    let consoleErrors = []
    let pageErrors = []

    page.on('console', message => {
      if (message.type() !== 'error') return
      if (ignoredConsoleFragments.some(fragment => message.text().includes(fragment))) return

      consoleErrors.push(message.text())
    })
    page.on('pageerror', error => pageErrors.push(error.message))

    for (const route of routes) {
      consoleErrors = []
      pageErrors = []

      try {
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 30_000 })

        await page.waitForSelector('body', { state: 'visible', timeout: 10_000 })
        await page.waitForTimeout(100)

        const diagnostics = await page.evaluate(() => {
          const heading = document.querySelector('h1')
          const headingRect = heading?.getBoundingClientRect()
          const headingStyle = heading ? window.getComputedStyle(heading) : null
          const overlay = document.querySelector('[data-nextjs-dialog], nextjs-portal')

          return {
            viewportWidth: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            bodyTextLength: document.body.innerText.trim().length,
            headingVisible: Boolean(heading && headingRect && headingRect.width > 0 && headingRect.height > 0),
            headingFontSize: headingStyle ? Number.parseFloat(headingStyle.fontSize) : 0,
            hasErrorOverlay: Boolean(overlay)
          }
        })

        assert.ok(response, 'route returned no response')
        assert.ok(response.status() < 500, `route returned ${response.status()}`)
        assert.ok(diagnostics.bodyTextLength > 80, 'page rendered too little visible content')
        assert.equal(diagnostics.headingVisible, true, 'page has no visible primary heading')
        assert.ok(diagnostics.headingFontSize >= 36, `primary heading is only ${diagnostics.headingFontSize}px`)
        assert.ok(diagnostics.documentWidth <= diagnostics.viewportWidth + 1, `document overflows by ${diagnostics.documentWidth - diagnostics.viewportWidth}px`)
        assert.ok(diagnostics.bodyWidth <= diagnostics.viewportWidth + 1, `body overflows by ${diagnostics.bodyWidth - diagnostics.viewportWidth}px`)
        assert.equal(diagnostics.hasErrorOverlay, false, 'Next.js error overlay is visible')
        assert.deepEqual(pageErrors, [], `page errors: ${pageErrors.join(' | ')}`)
        assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`)

        if (route === '/' && viewport.width <= 412) {
          const menuButton = page.getByRole('button', { name: 'Open navigation' })

          await menuButton.click()

          const menu = page.locator('#mobile-navigation')

          await menu.waitFor({ state: 'visible', timeout: 5_000 })

          for (const label of mobileNavigationLabels) {
            await menu.getByRole('link', { name: label, exact: true }).waitFor({ state: 'visible', timeout: 5_000 })
          }

          const menuWidth = await page.evaluate(() => ({
            viewport: window.innerWidth,
            document: document.documentElement.scrollWidth
          }))

          assert.ok(menuWidth.document <= menuWidth.viewport + 1, `open menu overflows by ${menuWidth.document - menuWidth.viewport}px`)

          await menu.getByRole('button', { name: 'Close navigation' }).click()
          await page.locator('#mobile-navigation').waitFor({ state: 'detached' })
          await menuButton.waitFor({ state: 'visible' })
        }
      } catch (error) {
        failures.push(`${viewport.width}x${viewport.height} ${route}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    await context.close()
  }
} finally {
  await browser.close()
}

assert.deepEqual(failures, [], `Responsive browser acceptance failed:\n${failures.join('\n')}`)
console.log(`NAFS responsive browser acceptance passed across ${viewports.length} viewports and ${routes.length} routes`)
