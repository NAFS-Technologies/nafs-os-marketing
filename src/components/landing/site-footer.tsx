import Link from 'next/link'

import { siteConfig } from '@/lib/site-config'

const groups = [
  { title: 'Products', links: [['NAFS OS', '/products/os'], ['Storefront', '/products/storefront'], ['Courier', '/products/courier'], ['Product roadmap', '/products']] },
  { title: 'Explore', links: [['Solutions', '/solutions'], ['Use cases', '/use-cases'], ['Integrations', '/integrations'], ['Pricing', '/pricing']] },
  { title: 'Work with NAFS', links: [['Resources', '/blog'], ['Partners', '/partners'], ['B2B platform', '/b2b'], ['Book a walkthrough', '/#contact']] }
] as const

export function SiteFooter() {
  return (
    <footer className='m-footer'><div className='m-container'>
      <div className='m-footer-grid'>
        <div className='m-footer-brand'><Link href='/' className='m-wordmark' aria-label='NAFS homepage'>NAFS</Link><p className='m-footer-copy'>Everything behind modern commerce.<br />Built around the work after a sale.</p><a href={`mailto:${siteConfig.contactEmail}`} className='m-text-link'>{siteConfig.contactEmail}</a></div>
        {groups.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>)}
      </div>
      <div className='m-footer-bottom'><span>© {new Date().getFullYear()} NAFS.</span><span>Product availability and rollout scope are confirmed for each business.</span><Link href={siteConfig.signInUrl}>Operator sign in</Link></div>
    </div></footer>
  )
}
