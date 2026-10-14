import { ProductShowcase } from '@/components/marketing/product-showcase'
import { Actions, ClosingCTA, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import type { solutions } from '@/content/product-catalog'

type Solution = (typeof solutions)[number]

export function SolutionDetail({ solution }: { solution: Solution }) {
  return (
    <>
      <PageHero label={solution.title} title={solution.headline} description={solution.outcome} breadcrumb={{ label: 'Solutions', href: '/solutions' }}><Actions /></PageHero>
      <Section tone='white'><div className='m-split'><SectionHeading label='The problem' title={solution.problem} description='Make the handoff part of the process, rather than another message someone has to remember.' /><div><span className='m-eyebrow'>A connected workflow</span><ol className='m-steps'>{solution.steps.map(step => <li key={step}>{step}</li>)}</ol></div></div></Section>
      <Section><SectionHeading label='Inside the workflow' title='Explore the relevant operating view.' description='An interactive illustration with synthetic records. Your rollout confirms the exact screens, data and available actions.' /><ProductShowcase key={solution.id} initialKind={solution.preview} mode='focused' /></Section>
      <Section tone='white'><div className='m-split'><div><SectionHeading label='Connected capabilities' title='The right modules. The same operational context.' /><ul className='m-chips'>{solution.modules.map(module => <li key={module}>{module}</li>)}</ul></div><aside className='m-note'><strong>Rollout is a working process, not just an account.</strong>We review your data, permissions, business rules and relevant providers before confirming readiness. No guaranteed savings or instant implementation is assumed.</aside></div></Section>
      <ClosingCTA title={`Start with ${solution.title.toLowerCase()}.`} />
    </>
  )
}
