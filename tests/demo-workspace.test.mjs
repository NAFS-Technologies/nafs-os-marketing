import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import ts from 'typescript'

const code = ts.transpileModule(readFileSync(new URL('../src/content/demo-workspace.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const loaded = { exports: {} }

new Function('exports', 'module', code)(loaded.exports, loaded)

const { demoScenes, filterDemoRows } = loaded.exports

test('every demonstration table has complete, uniquely identified rows', () => {
  for (const scene of Object.values(demoScenes)) {
    assert.equal(new Set(scene.rows.map(row => row.id)).size, scene.rows.length)

    for (const row of scene.rows) {
      assert.equal(row.cells.length + 1, scene.columns.length)
      assert.ok(row.note.length > 50)
    }
  }
})

test('search supports identifiers, words, whitespace and empty recovery', () => {
  assert.equal(filterDemoRows('orders', '  SAMPLE customer A  ').length, 1)
  assert.equal(filterDemoRows('orders', '#10482')[0].id, '#10482')
  assert.equal(filterDemoRows('inventory', 'no-such-sku').length, 0)
  assert.equal(filterDemoRows('inventory', '').length, 3)
  assert.equal(filterDemoRows('fulfillment', 'To pack').length, 1)
})

test('missing settlement money is unknown, not zero', () => {
  const pending = demoScenes.settlements.rows.find(row => row.id === 'COD-023')

  assert.equal(pending.cells[1], 'Not reported')
  assert.equal(pending.cells[2], 'Unknown')
})

test('showcase identifies itself as synthetic and exposes actual controls', () => {
  const source = readFileSync(new URL('../src/components/marketing/product-showcase.tsx', import.meta.url), 'utf8')

  for (const required of ['Demo data', 'No live records or actions', 'aria-selected', 'aria-controls', 'onTabKeyDown', 'onChange', 'Clear search']) assert.ok(source.includes(required))
  assert.equal(source.includes('dispatch('), false)
})
