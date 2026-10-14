export type PostMetadata = {
  slug: string
  title: string
  description: string
  category?: string
  publishedAt: string
  author?: { name: string; picture: string }
  image?: string
  readTime?: string
  keywords?: string[]
  draft?: boolean
}

export const PUBLIC_POST_PREFIX = 'nafs-'

export function isPublicPostSlug(slug: string) {
  return /^nafs-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 160
}

export function parsePostMetadata(slug: string, value: unknown): PostMetadata {
  if (!isPublicPostSlug(slug)) throw new Error(`Invalid public post slug: ${slug}`)
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid metadata: ${slug}`)

  const data = value as Record<string, unknown>

  const text = (key: string, maximum: number, required = false) => {
    const input = data[key]

    if (input === undefined && !required) return undefined
    if (typeof input !== 'string' || !input.trim() || input.length > maximum) throw new Error(`Invalid ${key}: ${slug}`)

    return input.trim()
  }

  const title = text('title', 180, true)!
  const description = text('description', 400, true)!
  const publishedAt = text('publishedAt', 10, true)!

  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) || !Number.isFinite(Date.parse(publishedAt)) || new Date(publishedAt).toISOString().slice(0, 10) !== publishedAt) {
    throw new Error(`Invalid publication date: ${slug}`)
  }

  if (data.draft !== undefined && typeof data.draft !== 'boolean') throw new Error(`Invalid draft flag: ${slug}`)

  let author: PostMetadata['author']

  if (data.author !== undefined) {
    if (!data.author || typeof data.author !== 'object' || Array.isArray(data.author)) throw new Error(`Invalid author: ${slug}`)

    const input = data.author as Record<string, unknown>

    if (typeof input.name !== 'string' || !input.name.trim() || input.name.length > 100) throw new Error(`Invalid author name: ${slug}`)
    author = { name: input.name.trim(), picture: typeof input.picture === 'string' ? input.picture : '' }
  }

  if (data.keywords !== undefined && (!Array.isArray(data.keywords) || data.keywords.some(item => typeof item !== 'string' || item.length > 80))) throw new Error(`Invalid keywords: ${slug}`)

  return { slug, title, description, publishedAt, category: text('category', 80), readTime: text('readTime', 30), image: text('image', 500), author, keywords: data.keywords as string[] | undefined, draft: data.draft === true }
}

export function isPublishedPost(post: PostMetadata, today = new Date().toISOString().slice(0, 10)) {
  return !post.draft && post.publishedAt <= today
}
