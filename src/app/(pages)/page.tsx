import type { Metadata } from 'next'

import { NafsLandingPage } from '@/components/landing/nafs-landing-page'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'NAFS — Run your commerce from one place',
  description: 'Connect orders, inventory, fulfillment, delivery and payments with NAFS OS. Explore the product and plan a guided rollout.',
  alternates: { canonical: '/' },
  openGraph: { url: absoluteUrl('/') }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'NAFS', url: siteConfig.siteUrl, email: siteConfig.contactEmail },
    { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: 'NAFS', url: siteConfig.siteUrl },
    { '@type': 'SoftwareApplication', name: 'NAFS OS', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: absoluteUrl('/products/os'), description: 'A commerce operations workspace for orders, inventory, fulfillment, payments and reporting.' }
  ]
}

export default function Home() {
  return <><script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /><NafsLandingPage /></>
}
