import type { Metadata } from 'next'

import { Actions, CardLink, ClosingCTA, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import { solutions, useCases } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Solutions', description: 'Explore connected workflows for orders, inventory, purchasing, COD, reporting and team access.', alternates: { canonical: '/solutions' }, openGraph: { url: absoluteUrl('/solutions') } }

export default function SolutionsPage() {
  return <><PageHero label='Solutions' title='Start with the work that needs to get better.' description='You do not need every product at once. Find the handoff, decision or workflow creating the most friction.'><Actions /></PageHero><Section tone='white'><div className='m-grid'>{solutions.map(solution => <CardLink key={solution.id} href={`/solutions/${solution.id}`} title={solution.title} description={solution.outcome} label={solution.modules.slice(0, 2).join(' / ')} />)}</div></Section><Section><SectionHeading label='Your business context' title='Different businesses. Familiar operating problems.' /><div className='m-grid'>{useCases.map(useCase => <CardLink key={useCase.slug} href={`/use-cases/${useCase.slug}`} title={useCase.title} description={useCase.lead} />)}</div></Section><ClosingCTA /></>
}
