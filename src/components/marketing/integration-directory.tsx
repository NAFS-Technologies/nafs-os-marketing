'use client'

import { useId, useState } from 'react'

import Link from 'next/link'

import type { integrations } from '@/content/product-catalog'

import '@/app/marketing-resources.css'

type Integration = (typeof integrations)[number]

export function IntegrationDirectory({ items }: { items: readonly Integration[] }) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const categories = ['All', ...new Set(items.map(item => item.category))]
  const filtered = items.filter(item => (category === 'All' || item.category === category) && (status === 'All' || item.status === status) && `${item.name} ${item.detail}`.toLowerCase().includes(query.trim().toLowerCase()))

  const reset = () => {
    setQuery('')
    setCategory('All')
    setStatus('All')
  }

  return <div data-integration-directory>
    <div className='m-directory-toolbar'><label htmlFor={`${id}-query`}>Find a connection<input id={`${id}-query`} type='search' value={query} onChange={event => setQuery(event.target.value)} placeholder='Search by tool or workflow' /></label><label htmlFor={`${id}-status`}>Readiness<select id={`${id}-status`} value={status} onChange={event => setStatus(event.target.value)}><option value='All'>All readiness</option>{[...new Set(items.map(item => item.status))].map(value => <option key={value}>{value}</option>)}</select></label></div>
    <div className='m-filter-pills' role='group' aria-label='Connection category'>{categories.map(value => <button key={value} type='button' aria-pressed={value === category} onClick={() => setCategory(value)}>{value}</button>)}</div>
    <div className='m-directory-summary'><p role='status' aria-live='polite'>{filtered.length} connection {filtered.length === 1 ? 'entry' : 'entries'}</p>{(query || category !== 'All' || status !== 'All') && <button type='button' onClick={reset}>Reset filters</button>}</div>
    {filtered.length ? <div className='m-grid'>{filtered.map(item => <article className='m-card' key={item.name}><span className='m-status' data-status={item.status}>{item.status}</span><h3>{item.name}</h3><p>{item.detail}</p><Link href='/#contact' className='m-text-link'>{item.status === 'Planned' ? 'Discuss the roadmap' : 'Discuss configuration'} →</Link></article>)}</div> : <div className='m-directory-empty'><h3>No connections match these filters.</h3><p>Reset the filters or talk to us about the tool you need.</p><button type='button' className='m-button m-button-secondary' onClick={reset}>Show all connections</button></div>}
  </div>
}
