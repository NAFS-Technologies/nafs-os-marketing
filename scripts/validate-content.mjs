import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import ts from 'typescript'

function load(file) {
  const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
  const result = { exports: {} }

  new Function('exports', 'module', code)(result.exports, result)

  return result.exports
}

const { parsePostMetadata, isPublishedPost } = load('src/lib/editorial.ts')
const { products, solutions, useCases } = load('src/content/product-catalog.ts')
const root = 'src/content/blog'
const posts = readdirSync(root).filter(name => name.startsWith('nafs-') && name.endsWith('.mdx')).map(name => {
  const { data, content } = matter(readFileSync(path.join(root, name), 'utf8'))
  const metadata = parsePostMetadata(name.slice(0, -4), data)

  assert.ok(content.trim().length > 100, `${name}: article body is too short`)

  return { metadata, content }
})
const known = new Set(['/', '/products', '/solutions', '/use-cases', '/integrations', '/pricing', '/b2b', '/partners', '/blog', ...products.map(item => `/products/${item.slug}`), ...solutions.map(item => `/solutions/${item.id}`), ...useCases.map(item => `/use-cases/${item.slug}`), ...posts.filter(post => isPublishedPost(post.metadata)).map(post => `/blog/${post.metadata.slug}`)])

for (const post of posts.filter(item => isPublishedPost(item.metadata))) {
  for (const match of post.content.matchAll(/\]\((\/[^\s)]*)\)/g)) {
    const url = new URL(match[1], 'https://marketing.example')

    assert.ok(url.origin === 'https://marketing.example' && known.has(url.pathname), `${post.metadata.slug}: broken internal link ${match[1]}`)
  }
}

console.log(`Validated ${products.length} products, ${solutions.length} solutions, ${useCases.length} use cases and ${posts.length} public-prefix articles.`)
