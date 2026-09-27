import type { Metadata } from 'next'

import { NafsLandingPage } from '@/components/landing/nafs-landing-page'

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${appUrl}/#organization`,
      name: 'NAFS Technologies',
      url: appUrl,
      areaServed: { '@type': 'Country', name: 'Bangladesh' }
    },
    {
      '@type': 'WebSite',
      '@id': `${appUrl}/#website`,
      name: 'NAFS',
      description: 'A commerce platform for running operations, connecting business tools, automating work and growing through B2B and partner programs.',
      url: appUrl,
      inLanguage: 'en',
      publisher: { '@id': `${appUrl}/#organization` }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${appUrl}/#software`,
      name: 'NAFS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Run products, orders, customers, inventory, fulfillment, delivery, payments and reporting in one place. Connect existing tools, automate routine work, launch branded client platforms and manage partner growth.',
      featureList: [
        'Products, pricing, discounts and checkout',
        'Orders, customers and sales channels',
        'Inventory and warehouse operations',
        'Fulfillment, returns and delivery management',
        'Payments and COD settlement follow-up',
        'Purchasing, suppliers and replenishment',
        'Analytics, reports and activity history',
        'NAFS Flow business automation',
        'NAFS Mobile for operational tasks',
        'NAFS Storefront and Shopping customer channels',
        'Connections to external apps and APIs through Nango',
        'Branded B2B platforms with plans, subscriptions and custom domains',
        'Referral links, partner programs, attribution and commissions'
      ],
      areaServed: { '@type': 'Country', name: 'Bangladesh' },
      provider: { '@id': `${appUrl}/#organization` }
    }
  ]
}

const Home = () => (
  <>
    <NafsLandingPage />
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  </>
)

export default Home
