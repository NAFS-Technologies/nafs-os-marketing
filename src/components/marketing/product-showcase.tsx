'use client'

import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

import Link from 'next/link'
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { demoScenes, filterDemoRows } from '@/content/demo-workspace'
import type { DemoKind } from '@/content/demo-workspace'
import { siteConfig } from '@/lib/site-config'

import '@/app/marketing-product.css'

const kinds: DemoKind[] = ['orders', 'inventory', 'fulfillment', 'settlements']

export function ProductShowcase({ initialKind = 'orders', mode = 'explorer' }: { initialKind?: DemoKind; mode?: 'explorer' | 'focused' }) {
  const id = useId()
  const [kind, setKind] = useState<DemoKind>(initialKind)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const scene = demoScenes[kind]
  const rows = filterDemoRows(kind, query)
  const selected = rows.find(row => row.id === selectedId)
  const selectScene = (next: DemoKind) => {
    setKind(next)
    setQuery('')
    setSelectedId(null)
  }
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % kinds.length : event.key === 'ArrowLeft' ? (index + kinds.length - 1) % kinds.length : event.key === 'Home' ? 0 : event.key === 'End' ? kinds.length - 1 : null

    if (next === null) return
    event.preventDefault()
    selectScene(kinds[next])
    tabsRef.current[next]?.focus()
  }

  return (
    <div className='m-product-proof' data-product-showcase>
      {mode === 'explorer' && <div className='m-preview-tabs' role='tablist' aria-label='Explore NAFS workflows'>{kinds.map((value, index) => <button key={value} ref={element => { tabsRef.current[index] = element }} type='button' role='tab' id={`${id}-tab-${value}`} aria-selected={kind === value} aria-controls={`${id}-panel-${value}`} tabIndex={kind === value ? 0 : -1} onClick={() => selectScene(value)} onKeyDown={event => onTabKeyDown(event, index)}>{demoScenes[value].label}</button>)}</div>}
      <div className='m-preview-window' role={mode === 'explorer' ? 'tabpanel' : 'region'} id={`${id}-panel-${kind}`} aria-labelledby={mode === 'explorer' ? `${id}-tab-${kind}` : `${id}-heading`} tabIndex={0}>
        <div className='m-preview-chrome'><span><strong>NAFS OS</strong><span className='m-preview-divider'>/</span>Demo workspace</span><span className='m-preview-demo'>Demo data</span></div>
        <div className='m-preview-body'>
          <aside className='m-preview-sidebar' aria-label='Example workspace context'><span className='m-preview-workspace'>N<span>Northstar demo<br /><small>Illustrative workspace</small></span></span><p>Operations</p>{kinds.map(value => <span key={value} className={kind === value ? 'is-active' : ''}>{demoScenes[value].label}</span>)}<div className='m-preview-sidebar-note'>Connected work.<br />One operating view.</div></aside>
          <div className='m-preview-main'>
            <div className='m-preview-title'><div><span className='m-preview-kicker'>{scene.label}</span><h2 id={`${id}-heading`}>{scene.title}</h2><p>{scene.description}</p></div><span className='m-preview-count'>{scene.rows.length}<small>sample records</small></span></div>
            <div className='m-preview-toolbar'><label className='m-preview-search' htmlFor={`${id}-search`}><SearchIcon size={16} aria-hidden='true' /><span className='sr-only'>Search sample records</span><input id={`${id}-search`} value={query} onChange={event => { setQuery(event.target.value); setSelectedId(null) }} placeholder='Search this preview…' autoComplete='off' /></label><span role='status' aria-live='polite'>{rows.length} of {scene.rows.length} records</span></div>
            {rows.length ? <>
              <div className='m-preview-table-wrap'><table className='m-preview-table'><caption className='sr-only'>{scene.label}: synthetic demonstration records</caption><thead><tr>{scene.columns.map(column => <th scope='col' key={column}>{column}</th>)}<th scope='col'><span className='sr-only'>Details</span></th></tr></thead><tbody>{rows.map(row => <tr key={row.id} data-selected={selectedId === row.id}><th scope='row'>{row.id}</th>{row.cells.map((cell, index) => <td key={scene.columns[index + 1]}>{cell}</td>)}<td><button type='button' className='m-preview-row-button' aria-label={`Review ${row.id}`} aria-pressed={selectedId === row.id} onClick={() => setSelectedId(selectedId === row.id ? null : row.id)}><ArrowRightIcon size={16} aria-hidden='true' /></button></td></tr>)}</tbody></table></div>
              <div className='m-preview-cards'>{rows.map(row => <article key={row.id}><div><strong>{row.id}</strong><button type='button' className='m-preview-row-button' aria-label={`Review ${row.id}`} aria-pressed={selectedId === row.id} onClick={() => setSelectedId(selectedId === row.id ? null : row.id)}><ArrowRightIcon size={16} aria-hidden='true' /></button></div><dl>{row.cells.map((cell, index) => <div key={scene.columns[index + 1]}><dt>{scene.columns[index + 1]}</dt><dd>{cell}</dd></div>)}</dl></article>)}</div>
            </> : <div className='m-preview-empty'><h3>No sample records match your search.</h3><p>Try an order number, product or status.</p><button type='button' className='m-button m-button-secondary' onClick={() => setQuery('')}>Clear search</button></div>}
            {selected && <div className='m-preview-detail' role='status'><div><strong>{selected.id} · How this works</strong><button type='button' aria-label='Close sample details' className='m-preview-row-button' onClick={() => setSelectedId(null)}><XIcon size={16} aria-hidden='true' /></button></div><p>{selected.note}</p></div>}
            <div className='m-preview-footnote'><span>Interactive illustration. No live records or actions.</span><Link href={siteConfig.signInUrl}>Open your workspace <ArrowRightIcon size={14} aria-hidden='true' /></Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}
