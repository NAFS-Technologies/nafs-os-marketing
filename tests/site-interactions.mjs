import assert from 'node:assert/strict'

import { chromium, expect } from '@playwright/test'

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:3100'
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 390, height: 900 }, locale: 'en-GB', timezoneId: 'Asia/Dhaka', reducedMotion: 'reduce' })
const page = await context.newPage()

try {
  await page.goto(baseUrl)
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toBeFocused()

  for (let i = 0; i < 12; i += 1) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), true, 'focus must stay inside modal')
  }

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.locator('.m-header .m-brand')).toBeFocused()

  const showcase = page.locator('[data-product-showcase]').first()

  await showcase.getByRole('tab', { name: 'Orders', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(showcase.getByRole('tab', { name: 'Inventory', exact: true })).toHaveAttribute('aria-selected', 'true')
  await showcase.getByRole('textbox', { name: 'Search sample records' }).fill('not-a-real-sku')
  await expect(showcase.getByText('No sample records match your search.')).toBeVisible()
  await showcase.getByRole('button', { name: 'Clear search' }).click()
  await showcase.getByRole('button', { name: 'Review DEMO-001' }).filter({ visible: true }).click()
  await expect(showcase.getByText('DEMO-001 · How this works')).toBeVisible()
  await showcase.getByRole('button', { name: 'Close sample details' }).click()
  await expect(showcase.getByText('DEMO-001 · How this works')).not.toBeVisible()

  await page.goto(`${baseUrl}/integrations`)
  await page.getByLabel('Find a connection').fill('Daraz')
  await expect(page.locator('[data-integration-directory] .m-card')).toHaveCount(1)
  await expect(page.locator('[data-integration-directory] .m-status')).toHaveText('Planned')
  await page.getByLabel('Readiness').selectOption('Guided setup')
  await expect(page.getByText('No connections match these filters.')).toBeVisible()
  await page.getByRole('button', { name: 'Show all connections' }).click()
  await expect(page.locator('[data-integration-directory] .m-card')).toHaveCount(7)

  await page.goto(`${baseUrl}/blog`)
  await page.getByLabel('Find a resource').fill('no-matching-resource')
  await expect(page.getByText('No articles match your search.')).toBeVisible()
  await page.getByRole('button', { name: 'Clear search' }).click()
  assert.ok(await page.locator('[data-resource-library] .m-card').count() >= 5)

  await page.goto(`${baseUrl}/?utm_source=browser-test`, { waitUntil: 'networkidle' })
  await page.evaluate(() => { window.dataLayer = [] })
  // Use a real cancelable click so Next can own navigation. A synthetic,
  // non-cancelable anchor event reloads the document and destroys the test context.
  await page.locator('[data-cta-name="header"]').click()
  await expect(page).toHaveURL(`${baseUrl}/#contact`)
  await page.waitForLoadState('networkidle')
  assert.equal(await page.evaluate(() => window.dataLayer.length), 0)
  await page.getByText('Analytics preferences', { exact: true }).click()
  await page.getByLabel('Allow optional analytics').check()

  const form = page.locator('.m-lead-form')

  await form.getByLabel('Your name', { exact: true }).fill('Browser Fixture')
  await form.getByLabel('Business name', { exact: true }).fill('Webhook failure fixture')
  await form.getByLabel('Work email', { exact: true }).fill('browser-fixture@example.com')
  await form.getByLabel('Phone or WhatsApp', { exact: true }).fill('+8801712345678')
  await form.getByLabel('Approximate monthly orders').selectOption('under-500')
  await form.getByLabel('What would you most like to fix?').selectOption('orders-delivery')

  if (process.env.TEST_LEAD_SINK_URL) {
    await form.getByRole('button', { name: 'Plan my walkthrough' }).click()
    await expect(form.getByRole('status')).toContainText('could not confirm delivery')
    await expect(form.getByLabel('Your name', { exact: true })).toHaveValue('Browser Fixture')
    await expect(form.getByLabel('Business name', { exact: true })).toHaveValue('Webhook failure fixture')
    await form.getByLabel('Business name', { exact: true }).fill('Successful browser fixture')
    await form.getByRole('button', { name: 'Plan my walkthrough' }).click()
    await expect(form.getByRole('status')).toContainText('Your request was delivered')
    await expect(form.getByRole('button', { name: 'Request received' })).toBeDisabled()

    const stats = await (await fetch(`${process.env.TEST_LEAD_SINK_URL}/stats`)).json()

    assert.equal(stats.count, 1)
    assert.equal(await page.evaluate(() => window.dataLayer.filter(item => item.event === 'nafs_lead_submit_success').length), 1)
    assert.equal(await page.evaluate(() => JSON.stringify(window.dataLayer).includes('browser-fixture@example.com')), false)
  }

  await page.getByLabel('Allow optional analytics').uncheck()

  const before = await page.evaluate(() => window.dataLayer.length)

  await page.locator('[data-cta-name="header"]').click()
  assert.equal(await page.evaluate(() => window.dataLayer.length), before)

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')

  assert.ok(canonical?.startsWith(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://app.nafs.tech'))
  assert.ok((await page.locator('.m-header-signin').getAttribute('href')).startsWith(process.env.NEXT_PUBLIC_ERP_URL || 'https://app.nafs.tech'))
  console.log('Navigation, preview controls, directory recovery, consent, actual API delivery and metadata checks passed.')
} finally {
  await context.close()
  await browser.close()
}
