'use client'

import { useId, useState } from 'react'

import Link from 'next/link'

import type { PostMetadata } from '@/lib/posts'

import '@/app/marketing-resources.css'

export function ResourceLibrary({ posts }: { posts: readonly PostMetadata[] }) {
  const id = useId()
  const [query, setQuery] = useState('')
  const filtered = posts.filter(post => `${post.title ?? ''} ${post.description ?? ''} ${post.category ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()))

  return <div data-resource-library><div className='m-directory-toolbar'><label htmlFor={id}>Find a resource<input id={id} type='search' value={query} onChange={event => setQuery(event.target.value)} placeholder='Search guides and articles' /></label></div><div className='m-directory-summary'><p role='status' aria-live='polite'>{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p></div>{filtered.length ? <div className='m-grid'>{filtered.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className='m-card'><span className='m-card-number'>{post.category ?? 'NAFS Journal'}</span><h3>{post.title ?? post.slug}</h3>{post.description && <p>{post.description}</p>}<span className='m-text-link'>Read article →</span></Link>)}</div> : <div className='m-directory-empty'><h3>{posts.length ? 'No articles match your search.' : 'New resources are being prepared.'}</h3>{posts.length ? <button type='button' className='m-button m-button-secondary' onClick={() => setQuery('')}>Clear search</button> : <Link href='/products/os' className='m-text-link'>Explore NAFS OS instead →</Link>}</div>}</div>
}
