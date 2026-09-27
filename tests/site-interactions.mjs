import assert from 'node:assert/strict'

import { chromium, expect } from '@playwright/test'

const baseUrl = process.env.SITE_BASE_URL ?? 'http://127.0.0.1:3100'
const widths = [360, 390, 412, 768, 1024, 1440, 1920]
const browser = await chromium.launch({ headless: true })

const assertNoOverflow = async page => {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }))

  assert.ok(dimensions.document <= dimensions.viewport + 1, `document overflow at ${dimensions.viewport}px`)
  assert.ok(dimensions.body <= dimensions.viewport + 1, `body overflow at ${dimensions.viewport}px`)
}

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const pageErrors = []
    let mode = 'unavailable'
    let requests = 0
    let releaseDelivery
    const deliveryGate = new Promise(resolve => { releaseDelivery = resolve })

    page.on('pageerror', error => pageErrors.push(error.message))

    // Never send test leads to a real delivery provider, even when SITE_BASE_URL is a preview deployment.
    await context.route('**/api/demo-request', async route => {
      requests += 1
      assert.equal(route.request().method(), 'POST')
      assert.equal(route.request().postDataJSON().name, 'Example Operator')

      if (mode === 'success') await deliveryGate

      const response = mode === 'unavailable'
        ? { status: 503, body: { message: 'Online requests are temporarily unavailable. Please contact us by email.' } }
        : mode === 'validation'
          ? { status: 400, body: { message: 'Please check the highlighted fields.', errors: { phone: 'Please enter a valid phone number.' } } }
          : mode === 'unconfirmed'
            ? { status: 200, body: { message: 'Thanks. This is not a confirmed acceptance.' } }
            : { status: 202, body: { accepted: true, message: 'Thanks. Your walkthrough request has been received.' } }

      await route.fulfill({ status: response.status, contentType: 'application/json', body: JSON.stringify(response.body) })
    })

    try {
      await page.goto(baseUrl, { waitUntil: 'networkidle' })
      await assertNoOverflow(page)
      await expect(page.locator('#home').getByRole('link', { name: 'Start free trial' })).toHaveAttribute('href', /\/auth\/sign-up$/)
      await expect(page.locator('#home').getByRole('link', { name: 'Connect your existing tools' })).toHaveAttribute('href', '/integrations')

      if (width < 1280) {
        const openMenu = page.getByRole('button', { name: 'Open navigation', exact: true })
        const menu = page.getByRole('dialog', { name: 'Mobile navigation', exact: true })

        await openMenu.click()
        await expect(menu).toBeVisible()
        await expect.poll(() => page.locator('main').evaluate(element => element.inert)).toBe(true)
        await expect(menu.getByRole('button', { name: 'Close navigation' })).toBeFocused()
        await page.keyboard.press('Shift+Tab')
        await expect(menu.getByRole('link', { name: 'Plan a walkthrough' })).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(menu.getByRole('button', { name: 'Close navigation' })).toBeFocused()
        await assertNoOverflow(page)
        await page.keyboard.press('Escape')
        await expect(menu).toHaveCount(0)
        await expect(openMenu).toBeFocused()
        await expect.poll(() => page.locator('main').evaluate(element => element.inert)).toBe(false)

        await openMenu.click()
        await page.setViewportSize({ width: 1440, height: 900 })
        await expect(menu).toHaveCount(0)
        await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
        await expect.poll(() => page.locator('main').evaluate(element => element.inert)).toBe(false)
        await expect(page.locator('header').getByRole('link', { name: 'NAFS homepage' })).toBeFocused()
        await page.setViewportSize({ width, height: 900 })
        await expect(menu).toHaveCount(0)

        await openMenu.click()
        await menu.getByRole('link', { name: 'Platform', exact: true }).click()
        await expect(page).toHaveURL(/\/products$/)
        await expect(menu).toHaveCount(0)
        await openMenu.click()
        await expect(menu.getByRole('link', { name: 'Platform', exact: true })).toHaveAttribute('aria-current', 'page')
        await menu.getByRole('link', { name: 'Platform', exact: true }).click()
        await expect(menu).toHaveCount(0)
        await expect(openMenu).toBeFocused()
        await openMenu.click()
        await page.goBack()
        await expect(menu).toHaveCount(0)
        await expect(page.locator('#home')).toBeVisible()
        await expect.poll(() => page.locator('main').evaluate(element => element.inert)).toBe(false)
      }

      await page.locator('#home').getByRole('link', { name: 'Plan a walkthrough' }).click()
      await expect(page.locator('#contact')).toBeInViewport()

      const form = page.locator('#contact form')
      const submit = form.locator('button[type="submit"]')
      const name = form.locator('input[name="name"]')
      const phone = form.locator('input[name="phone"]')

      await name.fill('Example Operator')
      await form.locator('input[name="businessName"]').fill('Example Commerce')
      await form.locator('input[name="email"]').fill('operator@example.com')
      await phone.fill('+880 1712345678')
      await form.locator('select[name="monthlyOrders"]').selectOption('500-2000')
      await form.locator('select[name="interest"]').selectOption('orders-delivery')
      await form.locator('textarea[name="message"]').fill('Help with order handoffs.')
      await submit.click()
      await expect(form.getByRole('status')).toContainText('temporarily unavailable')
      await expect(form.getByRole('status')).toBeFocused()
      await expect(name).toHaveValue('Example Operator')
      await expect(submit).toBeEnabled()
      await expect(form.locator('a[href^="mailto:"]')).toBeVisible()

      mode = 'validation'
      await submit.click()
      await expect(phone).toHaveAttribute('aria-invalid', 'true')
      await expect(phone).toBeFocused()

      const errorId = await phone.getAttribute('aria-describedby')

      assert.ok(errorId)
      assert.equal(await page.evaluate(id => document.getElementById(id)?.textContent, errorId), 'Please enter a valid phone number.')
      await expect(name).toHaveValue('Example Operator')
      await assertNoOverflow(page)

      mode = 'unconfirmed'
      await submit.click()
      await expect(form.getByRole('status')).toContainText('could not confirm delivery')
      await expect(name).toHaveValue('Example Operator')
      await expect(submit).toBeEnabled()

      mode = 'success'
      await form.evaluate(element => {
        element.requestSubmit()
        element.requestSubmit()
      })
      await expect(submit).toBeDisabled()
      await expect(submit).toContainText('Sending')
      await expect(name).toBeDisabled()
      await expect.poll(() => requests).toBe(4)
      releaseDelivery()
      await expect(form.getByRole('status')).toContainText('has been received')
      await expect(form.getByRole('status')).toBeFocused()
      await expect(submit).toContainText('Request received')
      await expect(submit).toBeDisabled()
      await expect(name).toHaveValue('')
      await assertNoOverflow(page)
      assert.deepEqual(pageErrors, [], `browser errors at ${width}px`)
      console.log(`Site navigation and demo conversion passed at ${width}px`)
    } finally {
      releaseDelivery()
      await context.close()
    }
  }
} finally {
  await browser.close()
}
