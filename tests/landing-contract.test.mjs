import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'

import ts from 'typescript'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const compiled = ts.transpileModule(read('src/content/product-catalog.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const catalogue = { exports: {} }

new Function('exports', 'module', compiled)(catalogue.exports, catalogue)

const { products, solutions, useCases, integrations, navigation } = catalogue.exports

test('catalogue preserves every existing detail URL without duplicates', () => {
  assert.deepEqual(products.map(item => item.slug).sort(), ['courier', 'flow', 'mobile', 'os', 'partners', 'platform', 'shopping', 'storefront'])
  assert.equal(new Set(solutions.map(item => item.id)).size, 6)
  assert.equal(new Set(useCases.map(item => item.slug)).size, 5)

  for (const item of useCases) assert.ok(solutions.some(solution => solution.id === item.solutionId))
  for (const item of navigation) assert.ok(existsSync(new URL(`../src/app/(pages)${item.href}/page.tsx`, import.meta.url)))
})

test('every product carries explanatory readiness and meaningful outcomes', () => {
  for (const product of products) {
    assert.ok(['Guided rollout', 'In development'].includes(product.status))
    assert.ok(product.availability.length > 60)
    assert.ok(product.outcomes.length >= 3)
    assert.ok(product.capabilities.length >= 4)
  }

  for (const slug of ['flow', 'mobile', 'shopping', 'platform', 'partners']) {
    assert.equal(products.find(item => item.slug === slug).status, 'In development')
  }
})

test('integration catalog does not conflate authorization with business mappings', () => {
  for (const name of ['Daraz', 'RedX', 'Steadfast']) assert.equal(integrations.find(item => item.name === name).status, 'Planned')
  assert.match(integrations.find(item => item.name === 'Other business tools').detail, /does not mean/)
})

test('unapproved claims are not introduced through the new catalogue', () => {
  const copy = JSON.stringify(catalogue.exports).toLowerCase()

  for (const claim of ['900+', 'guaranteed income.', 'all couriers are supported', 'fully integrated daraz', '৳19,900', '৳39,900']) assert.equal(copy.includes(claim), false)
  assert.match(read('src/app/(pages)/white-label/page.tsx'), /redirect\('\/b2b'\)/)
  assert.match(read('src/app/sitemap.ts'), /absoluteUrl/)
})
