import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SolutionDetail } from '@/components/marketing/solution-detail'
import { getSolution, solutions } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return solutions.map(solution => ({ slug: solution.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)

  if (!solution) return {}

  return { title: solution.title, description: solution.outcome, alternates: { canonical: `/solutions/${slug}` }, openGraph: { url: absoluteUrl(`/solutions/${slug}`) } }
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params
  const solution = getSolution(slug)

  if (!solution) notFound()

  return <SolutionDetail solution={solution} />
}
