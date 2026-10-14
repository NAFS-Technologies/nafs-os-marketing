import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

import { chromium, expect } from '@playwright/test'

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:3100'
const browser = await chromium.launch({ headless: true })
const results = []

await mkdir('test-results/screenshots', { recursive: true })

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce', locale: 'en-GB', timezoneId: 'Asia/Dhaka' })
  const page = await context.newPage()

  await page.goto(baseUrl)
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Create an account', exact: true })).toBeFocused()
  await page.getByRole('dialog').getByRole('link', { name: 'Book a walkthrough', exact: true }).click()
  await expect(page.locator('#contact')).toBeFocused()
  await expect(page.getByRole('dialog')).not.toBeVisible()

  for (const route of ['/', '/pricing', '/integrations']) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      const sizes = Array.from(document.querySelectorAll('body *')).filter(element => element instanceof HTMLElement).map(element => [element, Number.parseFloat(getComputedStyle(element).fontSize)])

      for (const [element, size] of sizes) element.style.fontSize = `${size * 2}px`
    })

    const metrics = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }))

    assert.ok(metrics.document <= metrics.width + 1, `200% text overflow on ${route}: ${JSON.stringify(metrics)}`)
    assert.ok(metrics.body <= metrics.width + 1, `200% body overflow on ${route}`)
    await page.screenshot({ path: `test-results/screenshots/text-200-${route === '/' ? 'home' : route.slice(1)}.png`, fullPage: true })
    results.push({ route, textScale: 2, passed: true })
  }

  await context.close()

  const noScript = await browser.newContext({ viewport: { width: 390, height: 900 }, javaScriptEnabled: false })
  const staticPage = await noScript.newPage()

  await staticPage.goto(baseUrl)
  await expect(staticPage.getByRole('navigation', { name: 'Navigation without JavaScript' })).toBeVisible()
  await expect(staticPage.getByRole('heading', { level: 1 })).toBeVisible()
  await noScript.close()

  const performanceContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const performancePage = await performanceContext.newPage()
  const sourceBytes = []
  const responses = []

  performancePage.on('response', response => {
    if (response.request().resourceType() === 'script') responses.push(response.body().then(body => sourceBytes.push(body.byteLength)))
  })

  await performancePage.goto(baseUrl, { waitUntil: 'networkidle' })
  await Promise.all(responses)

  const totalScriptBytes = sourceBytes.reduce((sum, size) => sum + size, 0)
  const navigation = await performancePage.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0]

    return { responseStartMs: entry.responseStart, domContentLoadedMs: entry.domContentLoadedEventEnd, loadMs: entry.loadEventEnd }
  })

  assert.ok(totalScriptBytes > 0 && totalScriptBytes < 1_500_000, `initial decoded script budget exceeded: ${totalScriptBytes}`)
  await writeFile('test-results/performance-lab.json', JSON.stringify({ context: 'Unthrottled local production build, not field Core Web Vitals', totalDecodedScriptBytes: totalScriptBytes, budgetBytes: 1_500_000, navigation }, null, 2))
  await performanceContext.close()

  console.log(`Anchor focus, reverse tab wrap, 200% text, no-JavaScript navigation and script-size budget passed (${totalScriptBytes} decoded bytes).`)
} finally {
  await browser.close()
  await writeFile('test-results/experience-results.json', JSON.stringify(results, null, 2))
}
