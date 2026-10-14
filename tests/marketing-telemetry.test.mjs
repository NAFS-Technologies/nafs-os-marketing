import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import ts from 'typescript'

const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/marketing-telemetry.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText

function fixture() {
  const storage = new Map()
  const events = []
  const window = { localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) }, dispatchEvent: event => events.push(event), dataLayer: [], location: { href: 'https://example.com/?utm_source=mail&email=private@example.com' } }
  const loaded = { exports: {} }
  const EventClass = class { constructor(type, options) { this.type = type; this.detail = options?.detail } }

  new Function('exports', 'module', 'window', 'Event', 'CustomEvent', compiled)(loaded.exports, loaded, window, EventClass, EventClass)

  return { api: loaded.exports, window, events }
}

test('no analytics or attribution before explicit consent, and revocation stops events', () => {
  const { api, window } = fixture()

  api.emitMarketingEvent('cta_click', 'header')
  assert.deepEqual(window.dataLayer, [])
  assert.deepEqual(api.currentCampaignContext(), {})
  api.setAnalyticsConsent(true)
  api.emitMarketingEvent('cta_click', 'header')
  assert.deepEqual(window.dataLayer, [{ event: 'nafs_cta_click', placement: 'header' }])
  api.setAnalyticsConsent(false)
  api.emitMarketingEvent('lead_submit_success', 'walkthrough')
  assert.equal(window.dataLayer.length, 1)
})

test('events contain only allowlisted fields and safe placement labels', () => {
  const { api, window } = fixture()

  api.setAnalyticsConsent(true)
  api.emitMarketingEvent('lead_started', 'person@example.com')
  api.emitMarketingEvent('not-a-real-event', 'header')
  assert.deepEqual(window.dataLayer, [{ event: 'nafs_lead_started', placement: 'website' }])
  assert.deepEqual(api.currentCampaignContext(), { utm_source: 'mail' })
})
