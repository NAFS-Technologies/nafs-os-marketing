import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/site-config.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const loaded = { exports: {} }

new Function('exports', 'module', 'process', compiled)(loaded.exports, loaded, { env: {} })

const { resolveSiteConfig } = loaded.exports

test('marketing origin does not change ERP authentication', () => {
  const config = resolveSiteConfig({ siteUrl: 'https://marketing.example', legacyUrl: 'https://legacy.example' })

  assert.equal(config.siteUrl, 'https://marketing.example')
  assert.equal(config.signInUrl, 'https://app.nafs.tech/auth/sign-in')
  assert.equal(config.signUpUrl, 'https://app.nafs.tech/auth/sign-up')
  assert.equal(config.trialEnabled, false)
})

test('explicit ERP and sign-in overrides remain distinct', () => {
  const config = resolveSiteConfig({ erpUrl: 'https://erp.example/', signInUrl: 'https://login.example/start', indexable: '0', trialEnabled: '1' })

  assert.equal(config.signInUrl, 'https://login.example/start')
  assert.equal(config.signUpUrl, 'https://erp.example/auth/sign-up')
  assert.equal(config.indexable, false)
  assert.equal(config.trialEnabled, true)
})

test('legacy marketing origin is preserved without controlling ERP links', () => {
  const config = resolveSiteConfig({ siteUrl: '', legacyUrl: 'https://legacy.example/' })

  assert.equal(config.siteUrl, 'https://legacy.example')
  assert.equal(config.erpUrl, 'https://app.nafs.tech')
})

test('reject unsafe origins and malformed contact addresses', () => {
  for (const siteUrl of ['javascript:alert(1)', 'https://user:pass@example.com', 'https://example.com/path', 'https://example.com/?tracking=1', 'http://example.com']) {
    assert.throws(() => resolveSiteConfig({ siteUrl }))
  }

  assert.throws(() => resolveSiteConfig({ contactEmail: 'not-an-email' }))
  assert.equal(resolveSiteConfig({ siteUrl: 'http://localhost:3100' }).siteUrl, 'http://localhost:3100')
})
