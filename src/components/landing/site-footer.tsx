import Link from 'next/link'

import Logo from '@/components/logo'

const footerLinkClassName = 'block rounded-sm text-[#666661] transition-colors duration-200 hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf8]'

export const SiteFooter = () => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@nafsos.com'

  return (
    <footer className='border-t border-[#e3e3df] bg-[linear-gradient(180deg,#fafaf8_0%,#f7f7f4_100%)]'>
      <div className='mx-auto max-w-[1380px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12'>
          <div>
            <Link href='/' aria-label='NAFS homepage' className='inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8]'>
              <Logo className='gap-2.5 [&_svg]:size-8 [&_span]:text-lg' />
            </Link>
            <p className='mt-5 max-w-md text-base leading-7 text-[#71716c]'>Run commerce, connect your existing tools, automate routine work and create new revenue through B2B and partner programs.</p>
            <div className='mt-7 flex items-center gap-2 text-sm font-medium text-[#777773]'>
              <span className='size-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,.08)]' />
              Built for growing commerce teams
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-8 gap-y-9 text-sm sm:grid-cols-4 lg:gap-x-14'>
            <div>
              <p className='font-semibold text-[#222]'>Platform</p>
              <div className='mt-4 space-y-3.5'>
                <Link href='/products' className={footerLinkClassName}>Platform overview</Link>
                <Link href='/integrations' className={footerLinkClassName}>Integrations</Link>
                <Link href='/b2b' className={footerLinkClassName}>B2B</Link>
                <Link href='/partners' className={footerLinkClassName}>Partners</Link>
              </div>
            </div>
            <div>
              <p className='font-semibold text-[#222]'>Products</p>
              <div className='mt-4 space-y-3.5'>
                <Link href='/products/os' className={footerLinkClassName}>NAFS OS</Link>
                <Link href='/products/flow' className={footerLinkClassName}>NAFS Flow</Link>
                <Link href='/products/mobile' className={footerLinkClassName}>NAFS Mobile</Link>
                <Link href='/products/courier' className={footerLinkClassName}>NAFS Courier</Link>
              </div>
            </div>
            <div>
              <p className='font-semibold text-[#222]'>Explore</p>
              <div className='mt-4 space-y-3.5'>
                <Link href='/solutions' className={footerLinkClassName}>Solutions</Link>
                <Link href='/use-cases' className={footerLinkClassName}>Use cases</Link>
                <Link href='/pricing' className={footerLinkClassName}>Pricing</Link>
                <Link href='/blog' className={footerLinkClassName}>Journal</Link>
              </div>
            </div>
            <div>
              <p className='font-semibold text-[#222]'>Contact</p>
              <div className='mt-4 space-y-3.5'>
                <Link href='/#contact' className={footerLinkClassName}>Plan a walkthrough</Link>
                <a href={`mailto:${contactEmail}`} className={`${footerLinkClassName} break-all`}>{contactEmail}</a>
                <p className='text-[#888883]'>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col gap-3 border-t border-[#dfdfdb] pt-6 text-xs leading-5 text-[#8f8f8a] sm:mt-14 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} NAFS Technologies</p>
          <p className='max-w-2xl sm:text-right'>We confirm product and integration availability before every rollout.</p>
        </div>
      </div>
    </footer>
  )
}
