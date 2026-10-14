import type { Metadata } from 'next'

import { IntegrationDirectory } from '@/components/marketing/integration-directory'
import { Actions, ClosingCTA, FeatureGrid, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import { integrations } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Integrations', description: 'Check the status of NAFS commerce and delivery connections before planning your rollout.', alternates: { canonical: '/integrations' }, openGraph: { url: absoluteUrl('/integrations') } }

export default function IntegrationsPage() {
  return <><PageHero label='Integrations' title='Keep the tools that work. Connect the work between them.' description='A connection is more than a logo. Know what is implemented, what needs configuration and what is still planned.'><Actions /></PageHero><Section tone='white'><IntegrationDirectory items={integrations} /><p className='m-commercial-note'>This directory describes connection readiness, not a live health dashboard or a count of Nango’s supported APIs.</p></Section><Section><SectionHeading label='Before data starts moving' title='Make the connection useful, not just authorized.' /><FeatureGrid items={[
    ['Agree the workflow', 'Choose the products, orders, stock or other information that should move between the systems.'],
    ['Authorize safely', 'Use the managed connection path where supported. Keep credentials out of public code and browser storage.'],
    ['Verify business mappings', 'Check identifiers, states, quantities and money against your actual operating process.'],
    ['Test failure and recovery', 'Review retries, uncertain outcomes and reconciliation before live operation.']
  ]} /></Section><ClosingCTA title='Have a connection in mind?' /></>
}
