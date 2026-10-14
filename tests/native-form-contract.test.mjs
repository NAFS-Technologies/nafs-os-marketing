import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

test('native form fallback does not disclose inquiry fields in query strings', () => {
  const source = readFileSync(new URL('../src/components/landing/demo-request-form.tsx', import.meta.url), 'utf8')
  const form = source.match(/<form\s[^>]*>/s)?.[0]

  assert.ok(form, 'the inquiry form must exist')
  assert.match(form, /method='post'/)
  assert.match(form, /action='\/api\/demo-request'/)
  assert.match(source, /Online submission requires JavaScript/)
})
