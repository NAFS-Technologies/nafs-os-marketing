import type { ReactNode } from 'react'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { siteConfig } from '@/lib/site-config'

export function Section({ children, id, tone = 'paper' }: { children: ReactNode; id?: string; tone?: 'paper' | 'white' | 'dark' }) {
  return <section id={id} className={`m-section ${tone === 'paper' ? '' : `m-${tone}`}`}><div className='m-container'>{children}</div></section>
}

export function SectionHeading({ label, title, description, centered = false }: { label: string; title: string; description?: string; centered?: boolean }) {
  return <div className={`m-section-heading ${centered ? 'm-center' : ''}`}><span className='m-eyebrow'>{label}</span><h2 className='m-heading'>{title}</h2>{description && <p className='m-lead'>{description}</p>}</div>
}

export function ActionLink({ href, children, secondary = false, name = 'explore' }: { href: string; children: ReactNode; secondary?: boolean; name?: string }) {
  return <Link href={href} className={`m-button ${secondary ? 'm-button-secondary' : ''}`} data-marketing-event='cta_click' data-cta-name={name}>{children}<ArrowRightIcon className='m-arrow' aria-hidden='true' /></Link>
}

export function Actions({ exploreHref = '/products/os', exploreLabel = 'Explore NAFS OS' }: { exploreHref?: string; exploreLabel?: string }) {
  return <div className='m-actions'><ActionLink href={siteConfig.contactHref} name='walkthrough'>Book a walkthrough</ActionLink><ActionLink href={exploreHref} secondary name='product'>{exploreLabel}</ActionLink></div>
}

export function PageHero({ label, title, description, breadcrumb, children }: { label: string; title: string; description: string; breadcrumb?: { href: string; label: string }; children?: ReactNode }) {
  return (
    <section className='m-page-hero'><div className='m-container'>
      {breadcrumb && <nav aria-label='Breadcrumb'><ol className='m-breadcrumbs'><li><Link href='/'>Home</Link></li><li><Link href={breadcrumb.href}>{breadcrumb.label}</Link></li><li aria-current='page'>{label}</li></ol></nav>}
      <span className='m-eyebrow'>{label}</span><h1>{title}</h1><p className='m-lead'>{description}</p>{children}
    </div></section>
  )
}

export function ClosingCTA({ title = 'Let’s look at the way your business works.', description = 'Start with the workflow causing the most friction. We’ll walk through the product, data and setup together.' }: { title?: string; description?: string }) {
  return <Section tone='dark'><div className='m-split'><div><span className='m-eyebrow'>Your next step</span><h2 className='m-heading'>{title}</h2><p className='m-lead'>{description}</p></div><div><ActionLink href={siteConfig.contactHref} name='walkthrough_footer'>Book a walkthrough</ActionLink><p className='m-muted' style={{ marginTop: 20 }}>Prefer email? <a href={`mailto:${siteConfig.contactEmail}`} className='m-text-link'>{siteConfig.contactEmail}</a></p></div></div></Section>
}

export function Readiness({ status }: { status: string }) {
  return <span className='m-status' data-status={status}>{status}</span>
}

export function FeatureGrid({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className='m-grid m-grid-two'>{items.map(([title, detail], index) => <article className='m-card' key={title}><span className='m-card-number'>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
}

export function CardLink({ href, title, description, label, status }: { href: string; title: string; description: string; label?: string; status?: string }) {
  return <Link href={href} className='m-card'>{status ? <Readiness status={status} /> : label ? <span className='m-card-number'>{label}</span> : null}<h3>{title}</h3><p>{description}</p><span className='m-text-link'>Explore <ArrowRightIcon className='m-arrow' aria-hidden='true' /></span></Link>
}

export function FAQ({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className='m-faq'>{items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
}
