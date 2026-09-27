import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export type Post = { metadata: PostMetadata; content: string }
export type PostMetadata = {
  slug: string
  title?: string
  description?: string
  category?: string
  publishedAt?: string
  author?: { name: string; picture: string }
  image?: string
  readTime?: string
  keywords?: string[]
}

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'blog')
const PUBLIC_POST_PREFIX = 'nafs-'

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug.startsWith(PUBLIC_POST_PREFIX)) return null

  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)

    return { metadata: { ...data, slug }, content }
  } catch {
    return null
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  try {
    const files = fs
      .readdirSync(rootDirectory)
      .filter(file => file.startsWith(PUBLIC_POST_PREFIX) && file.endsWith('.mdx'))

    const posts = await Promise.all(files.map(file => getPostMetadata(file)))
    const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt ?? '').getTime() - new Date(a.publishedAt ?? '').getTime())

    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  } catch (error) {
    console.error('Error fetching posts:', error)

    return []
  }
}

export async function getPostMetadata(filepath: string): Promise<PostMetadata> {
  try {
    const slug = filepath.replace(/\.mdx$/, '')
    const filePath = path.join(rootDirectory, filepath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data } = matter(fileContent)

    return { ...data, slug }
  } catch (error) {
    console.error(`Error fetching metadata for ${filepath}:`, error)

    return { slug: filepath.replace(/\.mdx$/, '') }
  }
}
