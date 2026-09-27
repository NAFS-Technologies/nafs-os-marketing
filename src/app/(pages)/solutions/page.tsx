import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BadgeDollarSignIcon, BarChart3Icon, BoxesIcon, PackageCheckIcon, ShoppingCartIcon, UsersRoundIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { solutionCards } from '@/content/nafs-landing'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Fix order handoffs, stock accuracy, purchasing, COD, reporting and team ownership with NAFS.',
  alternates: { canonical: '/solutions' }
}

const icons = [PackageCheckIcon, BoxesIcon, ShoppingCartIcon, BadgeDollarSignIcon, BarChart3Icon, UsersRoundIcon] as const

const salesLines = [
  'Get confirmed orders into the right warehouse queue without chats and repeated follow-up.',
  'Know what is on hand, what is already promised and exactly why the number changed.',
  'Use current stock and supplier information to buy before a shortage becomes urgent.',
  'Keep delivery, payment and COD settlement connected to the sale instead of another spreadsheet.',
  'See the current business picture without waiting for someone to combine exports.',
  'Make responsibilities and next steps clear enough that work continues through staff changes.'
] as const

export default function SolutionsPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>SOLUTIONS</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Fix the problems that cost time, cash and customer trust.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Start with the problem your team feels every day—not a module list. NAFS brings the information, responsibility and next steps together around it.</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-4 md:grid-cols-2'>
            {solutionCards.map((solution, index) => {
              const Icon = icons[index] ?? PackageCheckIcon

              return (
                <PageReveal key={solution.id} delay={Math.min(index * .035, .12)}>
                  <Link href={`/solutions/${solution.id}`} className='group site-card flex h-full flex-col rounded-[22px] border border-[#e4e4e0] bg-white p-5 sm:rounded-[24px] sm:p-6'>
                    <div className='flex items-start justify-between gap-4'>
                      <span className='grid size-12 place-items-center rounded-2xl bg-[#fafaf8] text-violet-700 ring-1 ring-black/5'><Icon className='size-5' /></span>
                      <span className='font-mono text-xs font-semibold text-[#aaa]'>0{index + 1}</span>
                    </div>
                    <h2 className='mt-7 text-2xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-3xl'>{solution.title}</h2>
                    <p className='mt-4 text-base leading-7 text-[#6f6f6a]'>{salesLines[index] ?? solution.outcome}</p>
                    <div className='mt-6 rounded-2xl bg-[#fafaf8] p-4'>
                      <p className='text-sm font-semibold text-[#333]'>What improves</p>
                      <p className='mt-2 text-sm leading-6 text-[#777773]'>{solution.outcome}</p>
                    </div>
                    <span className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>See how it works <ArrowRightIcon className='size-4 transition group-hover:translate-x-1' /></span>
                  </Link>
                </PageReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>HOW NAFS FIXES THE HANDOFF</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>The next action should come from the system—not from someone remembering the process.</h2>
            </div>
          </PageReveal>
          <div className='relative mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3 sm:mt-12'>
            <div className='pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-[#d9d9d5] md:block' />
            {[
              ['01', 'Something changes', 'An order arrives, stock moves, a delivery update comes in or money changes status.'],
              ['02', 'NAFS keeps everything connected', 'The customer, product, location and responsible team stay attached to the same work.'],
              ['03', 'The next step becomes clear', 'A person, queue or automation receives the action with the information already included.']
            ].map(([index, title, detail]) => (
              <div key={index} className='relative rounded-2xl border border-[#e4e4e0] bg-[#fafaf8] p-6'>
                <span className='relative z-10 grid size-12 place-items-center rounded-full bg-[#111] font-mono text-sm font-semibold text-white'>{index}</span>
                <h3 className='mt-6 text-xl font-semibold text-[#222]'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-[#71716c]'>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
