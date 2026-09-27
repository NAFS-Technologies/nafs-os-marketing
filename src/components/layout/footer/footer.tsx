import Link from 'next/link'
import { ArrowUpRightIcon, MailIcon, MapPinIcon } from 'lucide-react'

import Logo from '@/components/logo'
import { siteConfig } from '@/content/nafs-landing'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='relative overflow-hidden border-t bg-muted/35'>
      <div className='nafs-dot-grid absolute inset-0 -z-10 opacity-30' />
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='grid gap-10 border-b pb-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]'>
          <div className='max-w-md'>
            <Link href='/#home' aria-label='NAFS OS home' className='inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
              <Logo />
            </Link>
            <p className='mt-5 text-sm leading-6 text-muted-foreground'>
              A modular commerce operating system connecting transactions, operations, content, integrations, automation and intelligence for growing ecommerce businesses.
            </p>
            <div className='mt-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-[10px] font-medium text-muted-foreground shadow-sm'>
              <span className='nafs-live-dot size-1.5 rounded-full bg-emerald-500' />
              Building from Bangladesh for modern commerce
            </div>
          </div>

          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground'>Platform</h3>
            <div className='mt-4 grid gap-3 text-sm'>
              {[
                ['Overview', '/#platform'],
                ['Modules', '/#modules'],
                ['Workflows', '/#workflows'],
                ['Integrations', '/#integrations']
              ].map(([label, href]) => (
                <Link key={href} href={href} className='w-fit transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground'>Solutions</h3>
            <div className='mt-4 grid gap-3 text-sm'>
              {['Multi-brand retail', 'D2C commerce', 'Marketplace operations', 'Commerce agencies'].map(label => (
                <Link key={label} href='/#bangladesh' className='w-fit transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground'>Contact</h3>
            <div className='mt-4 grid gap-3 text-sm'>
              <Link href={siteConfig.demoHref} className='group inline-flex w-fit items-center gap-1.5 font-medium transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
                Book a demo <ArrowUpRightIcon className='size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </Link>
              <a href={`mailto:${siteConfig.contactEmail}`} className='inline-flex w-fit items-center gap-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
                <MailIcon className='size-3.5' /> {siteConfig.contactEmail}
              </a>
              <span className='inline-flex items-center gap-2 text-muted-foreground'>
                <MapPinIcon className='size-3.5' /> Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-between gap-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center'>
          <p>© {year} NAFS Technologies. All rights reserved.</p>
          <div className='flex flex-wrap gap-x-5 gap-y-2'>
            <span>Product preview data is illustrative.</span>
            <Link href='/#faq' className='transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>FAQ</Link>
            <Link href='/#home' className='transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>Back to top ↑</Link>
          </div>
        </div>

        <div className='pointer-events-none mt-10 overflow-hidden text-center text-[clamp(4rem,16vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.035] dark:text-white/[0.035]' aria-hidden='true'>
          NAFS OS
        </div>
      </div>
    </footer>
  )
}

export default Footer
