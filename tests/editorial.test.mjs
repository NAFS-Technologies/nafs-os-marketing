import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import ts from 'typescript'

const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/editorial.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const loaded = { exports: {} }

new Function('exports', 'module', compiled)(loaded.exports, loaded)

const { isPublicPostSlug, parsePostMetadata, isPublishedPost } = loaded.exports
const valid = { title: 'A useful guide', description: 'How to plan a complete operational workflow.', publishedAt: '2026-10-14' }

test('public slugs exclude traversal, legacy template articles and malformed names', () => {
  for (const slug of ['../secrets', 'nafs-../../secrets', 'nafs-a/b', 'nafs-', 'nafs--double', 'money-habits', 'NAFS-title', 'nafs-a%2fb']) assert.equal(isPublicPostSlug(slug), false)
  assert.equal(isPublicPostSlug('nafs-understanding-product-readiness'), true)
})

test('metadata requires a title, description and a real date', () => {
  for (const value of [{ ...valid, title: '' }, { ...valid, description: null }, { ...valid, publishedAt: '2026-02-30' }, { ...valid, publishedAt: 'invalid' }, { ...valid, draft: 'false' }]) assert.throws(() => parsePostMetadata('nafs-test', value))
  assert.equal(parsePostMetadata('nafs-test', valid).title, valid.title)
})

test('drafts and future dates are not published', () => {
  assert.equal(isPublishedPost(parsePostMetadata('nafs-test', valid), '2026-10-14'), true)
  assert.equal(isPublishedPost(parsePostMetadata('nafs-test', { ...valid, draft: true }), '2026-10-14'), false)
  assert.equal(isPublishedPost(parsePostMetadata('nafs-test', valid), '2026-10-13'), false)
})
