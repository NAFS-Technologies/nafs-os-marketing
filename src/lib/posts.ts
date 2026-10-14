import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'

import { isPublicPostSlug, isPublishedPost, parsePostMetadata, PUBLIC_POST_PREFIX } from '@/lib/editorial'
import type { PostMetadata } from '@/lib/editorial'

export type { PostMetadata } from '@/lib/editorial'
export type Post = { metadata: PostMetadata; content: string }

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

async function readPost(slug: string): Promise<Post | null> {
  if (!isPublicPostSlug(slug)) return null

  let source: string

  try {
    source = await readFile(path.join(rootDirectory, `${slug}.mdx`), 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }

  const { data, content } = matter(source)

  return { metadata: parsePostMetadata(slug, data), content }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await readPost(slug)

  return post && isPublishedPost(post.metadata) ? post : null
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  const names = await readdir(rootDirectory)
  const posts = await Promise.all(names.filter(name => name.startsWith(PUBLIC_POST_PREFIX) && name.endsWith('.mdx')).map(name => readPost(name.slice(0, -4))))
  const published = posts.filter((post): post is Post => post !== null && isPublishedPost(post.metadata)).map(post => post.metadata).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug))

  return limit === undefined ? published : published.slice(0, Math.max(0, Math.floor(limit)))
}

export async function getPostMetadata(filepath: string): Promise<PostMetadata> {
  if (!filepath.endsWith('.mdx')) throw new Error('Article metadata requires an MDX filename')

  const post = await readPost(filepath.slice(0, -4))

  if (!post) throw new Error(`Article not found: ${filepath}`)

  return post.metadata
}
