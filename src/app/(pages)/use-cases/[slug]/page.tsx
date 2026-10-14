import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductShowcase } from '@/components/marketing/product-showcase'
import { ActionLink, Actions, ClosingCTA, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import { getSolution, useCases } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return useCases.map(useCase => ({ slug: useCase.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const useCase = useCases.find(item => item.slug === slug)

  if (!useCase) return {}

  return { title: useCase.title, description: useCase.lead, alternates: { canonical: `/use-cases/${slug}` }, openGraph: { url: absoluteUrl(`/use-cases/${slug}`) } }
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params
  const useCase = useCases.find(item => item.slug === slug)

  if (!useCase) notFound()

  const solution = getSolution(useCase.solutionId)

  if (!solution) notFound()

  return <><PageHero label='Use case' title={`${useCase.title}. Connected operations.`} description={useCase.lead} breadcrumb={{ label: 'Use cases', href: '/use-cases' }}><Actions /></PageHero><Section tone='white'><div className='m-split'><SectionHeading label='The daily reality' title='Make the handoffs part of the process.' description={useCase.solution} /><div><ul className='m-pain-list'>{useCase.painPoints.map(point => <li key={point}><h3>{point}</h3></li>)}</ul><ul className='m-chips'>{useCase.modules.map(module => <li key={module}>{module}</li>)}</ul></div></div></Section><Section><SectionHeading label='A useful place to start' title={solution.headline} description='This is a synthetic demonstration. The walkthrough confirms the actual product and setup for your business.' /><ProductShowcase key={slug} initialKind={solution.preview} mode='focused' /><div className='m-actions'><ActionLink href={`/solutions/${solution.id}`} secondary>Explore {solution.title.toLowerCase()}</ActionLink></div></Section><ClosingCTA /></>
}
