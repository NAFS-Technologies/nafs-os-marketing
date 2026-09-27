import Link from 'next/link'

import { ArrowLeftIcon, CompassIcon } from 'lucide-react'

import Logo from '@/components/logo'

const NotFound = () => (
  <main className='relative grid min-h-screen place-items-center overflow-hidden bg-[#fafaf8] px-4 py-16'>
    <div className='landing-grid absolute inset-0 opacity-55' />
    <div className='absolute left-1/2 top-[-14rem] size-[34rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[110px]' />
    <div className='relative max-w-xl text-center'>
      <Logo className='mx-auto w-fit' />
      <span className='mx-auto mt-10 grid size-16 place-items-center rounded-[22px] border border-violet-500/20 bg-violet-500/[0.08] text-violet-700 shadow-sm'>
        <CompassIcon className='size-7' />
      </span>
      <p className='mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700'>404 · PAGE NOT FOUND</p>
      <h1 className='mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl'>We could not find that page.</h1>
      <p className='mt-5 text-base leading-8 text-[#71716c]'>The link may be old, or the page may have moved. Return to the NAFS homepage to continue.</p>
      <Link href='/' className='site-action mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#111] px-6 text-sm font-semibold text-white'>
        <ArrowLeftIcon className='size-4' />
        Return to NAFS
      </Link>
    </div>
  </main>
)

export default NotFound
