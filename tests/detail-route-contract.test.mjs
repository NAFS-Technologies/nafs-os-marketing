import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('all catalogue detail routes preserve static paths and real not-found handling', () => {
  for (const family of ['products', 'solutions', 'use-cases']) {
    const source = read(`src/app/(pages)/${family}/[slug]/page.tsx`)

    for (const contract of ['generateStaticParams', 'generateMetadata', 'notFound()', 'absoluteUrl', 'params: Promise', 'dynamicParams = false']) assert.ok(source.includes(contract), `${family}: ${contract}`)
  }
})

test('development products never reuse a working-product demonstration by default', () => {
  const source = read('src/components/marketing/product-detail.tsx')

  assert.match(source, /product.preview &&/)
  assert.match(source, /product.availability/)
  assert.match(source, /Discuss the roadmap/)
  assert.match(source, /Readiness status=\{product.status\}/)
})
