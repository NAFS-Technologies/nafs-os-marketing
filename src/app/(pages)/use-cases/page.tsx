import type { Metadata } from 'next'

import { Actions, CardLink, ClosingCTA, PageHero, Section } from '@/components/marketing/primitives'
import { useCases } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Use cases', description: 'NAFS operating workflows for retail, D2C, multichannel, COD-heavy and multi-location businesses.', alternates: { canonical: '/use-cases' }, openGraph: { url: absoluteUrl('/use-cases') } }

export default function UseCasesPage() {
  return <><PageHero label='Use cases' title='Built around how your business operates.' description='Explore the operational context closest to yours, then choose the workflow that deserves attention first.'><Actions /></PageHero><Section tone='white'><div className='m-grid'>{useCases.map(useCase => <CardLink key={useCase.slug} href={`/use-cases/${useCase.slug}`} title={useCase.title} description={useCase.lead} />)}</div></Section><ClosingCTA /></>
}
