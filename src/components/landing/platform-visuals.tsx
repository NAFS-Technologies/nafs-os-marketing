'use client'

import { useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const simpleIcon = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color.replace('#', '')}` : ''}`

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

type Brand = { name: string; logo: string }

const coreBrands: Brand[] = [
  { name: 'PostgreSQL', logo: simpleIcon('postgresql', '#4169E1') },
  { name: 'FastAPI', logo: simpleIcon('fastapi', '#009688') },
  { name: 'Next.js', logo: simpleIcon('nextdotjs', '#111111') },
  { name: 'Logto', logo: favicon('logto.io') },
  { name: 'Payload', logo: simpleIcon('payloadcms', '#111111') },
  { name: 'MinIO / S3', logo: simpleIcon('minio', '#C72E49') },
  { name: 'Nango', logo: favicon('nango.dev') },
  { name: 'Flexprice', logo: favicon('flexprice.io') },
  { name: 'Cloudflare', logo: simpleIcon('cloudflare', '#F38020') }
]

const specialistBrands: Brand[] = [
  { name: 'ClickHouse', logo: simpleIcon('clickhouse', '#FFCC01') },
  { name: 'MySQL', logo: simpleIcon('mysql', '#4479A1') },
  { name: 'Valkey / Redis', logo: simpleIcon('redis', '#DC382D') },
  { name: 'BullMQ', logo: favicon('bullmq.io') }
]

const integrationBrands: Brand[] = [
  { name: 'Shopify', logo: simpleIcon('shopify', '#7AB55C') },
  { name: 'WooCommerce', logo: simpleIcon('woocommerce', '#96588A') },
  { name: 'Stripe', logo: simpleIcon('stripe', '#635BFF') },
  { name: 'HubSpot', logo: simpleIcon('hubspot', '#FF7A59') },
  { name: 'Salesforce', logo: simpleIcon('salesforce', '#00A1E0') },
  { name: 'Slack', logo: simpleIcon('slack') },
  { name: 'Google Drive', logo: simpleIcon('googledrive') },
  { name: 'Gmail', logo: simpleIcon('gmail') },
  { name: 'Google Calendar', logo: simpleIcon('googlecalendar') },
  { name: 'GitHub', logo: simpleIcon('github', '#111111') },
  { name: 'Linear', logo: simpleIcon('linear', '#5E6AD2') },
  { name: 'Notion', logo: simpleIcon('notion', '#111111') },
  { name: 'Jira', logo: simpleIcon('jira', '#0052CC') },
  { name: 'Intercom', logo: simpleIcon('intercom', '#111111') },
  { name: 'Zendesk', logo: simpleIcon('zendesk', '#03363D') },
  { name: 'QuickBooks', logo: simpleIcon('quickbooks', '#2CA01C') },
  { name: 'Xero', logo: simpleIcon('xero', '#13B5EA') },
  { name: 'SAP', logo: simpleIcon('sap', '#0FAAFF') },
  { name: 'Microsoft Teams', logo: simpleIcon('microsoftteams', '#6264A7') },
  { name: 'Airtable', logo: simpleIcon('airtable') }
]

const pulseStages = [
  {
    key: 'order',
    label: 'Order confirmed',
    description: 'The customer, products, price, payment and delivery details arrive together.',
    event: 'order.confirmed',
    metrics: [['Order', '#10482'], ['Channel', 'Storefront'], ['Payment', 'COD']]
  },
  {
    key: 'stock',
    label: 'Stock reserved',
    description: 'The right items are reserved and the warehouse receives the next task.',
    event: 'inventory.reserved',
    metrics: [['Product', 'FNT-230'], ['Quantity', '2'], ['Location', 'Dhaka Central']]
  },
  {
    key: 'delivery',
    label: 'Parcel booked',
    description: 'The shipment is booked with Pathao and delivery updates stay connected to the order.',
    event: 'shipment.booked',
    metrics: [['Courier', 'Pathao'], ['COD', '৳4,820'], ['Status', 'Booked']]
  },
  {
    key: 'automation',
    label: 'Follow-up started',
    description: 'NAFS Flow can notify the team, check stock or request approval automatically.',
    event: 'flow.run.started',
    metrics: [['Automation', 'Delivered order'], ['Step', '1 of 4'], ['Status', 'Running']]
  }
] as const

const migrationSteps = [
  ['Connect', 'Authorize your store', 'Connect WooCommerce without copying API keys. Shopify connections are reviewed and configured for your store before launch.'],
  ['Choose data', 'Move what you need first', 'Bring products, customers and orders into NAFS in a controlled sequence instead of attempting one risky cutover.'],
  ['Run', 'Move daily work into NAFS', 'Keep the storefront live while inventory, fulfillment, payments, purchasing and reporting move into one workspace.']
] as const

const b2bStages = [
  ['Brand', 'Make the platform yours', 'Add your logo, colors, support details and customer-facing identity.'],
  ['Plans', 'Create offers for your market', 'Choose the NAFS capabilities, limits and approved pricing that fit each client plan.'],
  ['Clients', 'Onboard client businesses', 'Give every client a separate, secure workspace while you manage the commercial relationship.'],
  ['Domains', 'Use your own web addresses', 'Connect branded domains and follow each one from verification to launch.'],
  ['Billing', 'Manage recurring revenue', 'Track subscriptions, invoices and plan access from one partner dashboard.']
] as const

const partnerEvents = [
  ['Share', 'Referral link created', 'Campaign · Beauty consultants'],
  ['Refer', 'New business introduced', 'Lead · Northstar Retail'],
  ['Convert', 'Client starts NAFS', 'Plan · Connected operations'],
  ['Revenue', 'Invoice paid', 'Client · Northstar Retail'],
  ['Commission', 'Commission recorded', 'Status · Pending review']
] as const

const visibilityEvents = [
  ['08:07:12', 'Orders', 'New order accepted', 'Ready', '118ms'],
  ['08:07:12', 'Inventory', '2 units reserved', 'Saved', '24ms'],
  ['08:07:13', 'Fulfillment', 'Warehouse task created', 'Running', '11ms'],
  ['08:07:13', 'Delivery', 'Pathao booking confirmed', 'Booked', '96ms'],
  ['08:07:14', 'Payments', 'COD follow-up opened', 'Open', '13ms'],
  ['08:07:14', 'Automation', 'Customer update started', 'Running', '18ms']
] as const

function BrandLogo({ brand, compact = false }: { brand: Brand; compact?: boolean }) {
  return (
    <div className={compact ? 'flex shrink-0 items-center gap-2.5' : 'flex shrink-0 items-center gap-3.5'}>
      <span className={compact ? 'grid size-8 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-black/5' : 'grid size-10 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5'}>
        <img src={brand.logo} alt={`${brand.name} logo`} className={compact ? 'size-5 object-contain' : 'size-6 object-contain'} loading='lazy' />
      </span>
      <span className={compact ? 'whitespace-nowrap text-sm font-medium text-[#3d3d39]' : 'whitespace-nowrap text-base font-medium tracking-[-0.02em] text-[#2f2f2b]'}>{brand.name}</span>
    </div>
  )
}

export function TechnologyRails() {
  const reduceMotion = useReducedMotion()
  const first = [...coreBrands, ...coreBrands]
  const second = [...specialistBrands, ...specialistBrands, ...specialistBrands]

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e5e5e1] bg-white shadow-[0_26px_80px_rgba(20,20,20,.055)]'>
      <div className='grid border-b border-[#ecece8] lg:grid-cols-[230px_1fr]'>
        <div className='flex flex-col justify-center px-5 py-5 sm:px-6'>
          <p className='text-sm font-semibold text-[#222]'>Built on proven technology</p>
          <p className='mt-1 text-sm leading-6 text-[#8a8a85]'>The foundation behind the NAFS platform.</p>
        </div>
        <div className='site-logo-fade overflow-hidden border-t border-[#ecece8] lg:border-l lg:border-t-0'>
          <motion.div className='flex w-max items-center gap-8 px-7 py-5 sm:gap-9' animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}>
            {first.map((brand, index) => <BrandLogo key={`${brand.name}-${index}`} brand={brand} />)}
          </motion.div>
        </div>
      </div>
      <div className='grid lg:grid-cols-[230px_1fr]'>
        <div className='flex flex-col justify-center px-5 py-5 sm:px-6'>
          <p className='text-sm font-semibold text-[#222]'>Specialist services</p>
          <p className='mt-1 text-sm leading-6 text-[#8a8a85]'>Used where analytics, speed or background processing needs extra power.</p>
        </div>
        <div className='site-logo-fade overflow-hidden border-t border-[#ecece8] lg:border-l lg:border-t-0'>
          <motion.div className='flex w-max items-center gap-8 px-7 py-5 sm:gap-9' animate={reduceMotion ? undefined : { x: ['-8%', '-42%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {second.map((brand, index) => <BrandLogo key={`${brand.name}-${index}`} brand={brand} />)}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function CommercePulseScene() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => setActive(value => (value + 1) % pulseStages.length), 2800)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const stage = pulseStages[active]

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e2e2de] bg-white shadow-[0_34px_110px_rgba(20,20,20,.08)] sm:rounded-[28px]'>
      <div className='flex flex-col justify-between gap-2 border-b border-[#ecece8] px-5 py-4 sm:flex-row sm:items-center sm:px-7'>
        <div className='flex items-center gap-3'>
          <span className='size-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.08)]' />
          <span className='text-sm font-semibold text-[#454540]'>Order #10482 is moving</span>
        </div>
        <span className='text-sm text-[#999994]'>one order · every team updated</span>
      </div>

      <div className='grid lg:grid-cols-[1.2fr_.8fr]'>
        <div className='border-b border-[#ecece8] p-4 sm:p-7 lg:border-b-0 lg:border-r'>
          <div className='site-scrollbar-hidden -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0'>
            {pulseStages.map((item, index) => (
              <button
                key={item.key}
                type='button'
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={index === active ? 'min-w-[168px] snap-start rounded-2xl border border-[#111] bg-[#111] p-4 text-left text-white sm:min-w-0' : 'min-w-[168px] snap-start rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-4 text-left text-[#888883] transition hover:border-[#cfcfca] sm:min-w-0'}
              >
                <span className='font-mono text-[11px]'>0{index + 1}</span>
                <span className='mt-5 block text-sm font-semibold sm:mt-6'>{item.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div key={stage.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .36, ease: [0.22, 1, 0.36, 1] }} className='mt-6 rounded-2xl bg-[#fafaf8] p-5 sm:mt-8 sm:p-7'>
              <p className='font-mono text-[11px] font-medium text-violet-700 sm:text-[12px]'>{stage.event}</p>
              <h3 className='mt-4 text-3xl font-medium tracking-[-0.04em] text-[#171717] sm:text-4xl'>{stage.label}</h3>
              <p className='mt-4 max-w-2xl text-base leading-7 text-[#6f6f6a]'>{stage.description}</p>
              <div className='mt-6 grid gap-px overflow-hidden rounded-xl border border-[#e7e7e3] bg-[#e7e7e3] sm:mt-7 sm:grid-cols-3'>
                {stage.metrics.map(([label, value]) => (
                  <div key={label} className='bg-white p-4'>
                    <p className='text-xs font-medium uppercase tracking-[.08em] text-[#a0a09a]'>{label}</p>
                    <p className='mt-2 text-base font-semibold text-[#222]'>{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='bg-[#0d0e11] p-5 text-white sm:p-7'>
          <p className='text-base font-semibold text-white'>What NAFS handled automatically</p>
          <p className='mt-2 text-sm leading-6 text-white/62'>The customer sees one order. Your team gets every update and next step behind it.</p>
          <div className='mt-7 space-y-3'>
            {[
              ['API', 'Order accepted', '118ms'],
              ['PostgreSQL', 'Order and stock saved', '21ms'],
              ['Queue', 'Update shared with the team', '14ms'],
              ['Worker', active >= 1 ? 'Task completed' : 'Ready for work', 'healthy'],
              ['Courier', active >= 2 ? 'Delivery confirmed' : 'Ready to book', 'signed'],
              ['Flow', active >= 3 ? 'Automation started' : 'Waiting for the event', active >= 3 ? 'running' : 'ready']
            ].map(([service, state, meta], index) => (
              <motion.div key={service} animate={{ opacity: index <= active + 2 ? 1 : .45 }} className='grid grid-cols-[88px_1fr_auto] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 sm:grid-cols-[104px_1fr_auto] sm:gap-3 sm:px-4'>
                <span className='font-mono text-[10px] text-violet-300 sm:text-[11px]'>{service}</span>
                <span className='text-sm text-white/76'>{state}</span>
                <span className='font-mono text-[9px] text-white/38 sm:text-[10px]'>{meta}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function IntegrationLogoCloud() {
  const reduceMotion = useReducedMotion()
  const rows = useMemo(() => [integrationBrands.slice(0, 7), integrationBrands.slice(7, 14), integrationBrands.slice(14)], [])

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e3e3df] bg-white p-5 shadow-[0_28px_90px_rgba(20,20,20,.065)] sm:rounded-[28px] sm:p-7'>
      <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
        <div>
          <p className='text-xl font-semibold tracking-[-0.025em] text-[#20201d]'>Connect the tools your business already uses.</p>
          <p className='mt-2 max-w-2xl text-base leading-7 text-[#7f7f7a]'>Nango gives NAFS access to more than 900 supported apps and APIs. We configure only the information and actions your rollout actually needs.</p>
        </div>
        <span className='shrink-0 rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-800'>900+ supported apps & APIs</span>
      </div>

      <div className='site-logo-fade mt-8 space-y-3'>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className='overflow-hidden'>
            <motion.div className='flex w-max gap-3' animate={reduceMotion ? undefined : { x: rowIndex % 2 === 0 ? ['0%', '-22%'] : ['-20%', '0%'] }} transition={{ duration: 20 + rowIndex * 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
              {[...row, ...row].map((brand, index) => (
                <div key={`${brand.name}-${index}`} className='flex min-w-[164px] items-center gap-3 rounded-2xl border border-[#ecece8] bg-[#fafaf8] px-4 py-3.5 sm:min-w-[172px]'>
                  <BrandLogo brand={brand} compact />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MigrationBoard() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => setActive(value => (value + 1) % migrationSteps.length), 2700)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e3e3df] bg-white shadow-[0_28px_90px_rgba(20,20,20,.06)] sm:rounded-[28px]'>
      <div className='grid md:grid-cols-[.85fr_1.15fr]'>
        <div className='border-b border-[#ecece8] bg-[#fafaf8] p-5 sm:p-8 md:border-b-0 md:border-r'>
          <p className='text-sm font-semibold text-[#222]'>Keep selling while you move</p>
          <h3 className='mt-4 text-3xl font-medium tracking-[-0.04em] text-[#171717] sm:text-4xl'>Move to NAFS without rebuilding everything at once.</h3>
          <p className='mt-4 text-base leading-7 text-[#71716c]'>Start with the store you already run, then move products, orders and daily work in sensible phases.</p>
          <div className='mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4'>
            <BrandLogo brand={integrationBrands[0]} compact />
            <span className='text-lg text-[#c1c1bc]'>+</span>
            <BrandLogo brand={integrationBrands[1]} compact />
            <span className='text-lg text-[#c1c1bc]'>→</span>
            <div className='rounded-xl bg-[#111] px-4 py-3 text-sm font-semibold text-white'>NAFS</div>
          </div>
        </div>
        <div className='p-5 sm:p-8'>
          <div className='site-scrollbar-hidden flex snap-x gap-2 overflow-x-auto pb-2'>
            {migrationSteps.map((step, index) => (
              <button key={step[0]} type='button' aria-pressed={index === active} onClick={() => setActive(index)} className={index === active ? 'min-w-max snap-start rounded-full bg-[#111] px-4 py-2.5 text-sm font-medium text-white' : 'min-w-max snap-start rounded-full bg-[#f3f3f0] px-4 py-2.5 text-sm font-medium text-[#6f6f6a]'}>{step[0]}</button>
            ))}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className='mt-7 sm:mt-9'>
              <p className='text-sm font-semibold text-violet-700'>Step {active + 1} of {migrationSteps.length}</p>
              <h4 className='mt-3 text-3xl font-medium tracking-[-0.04em] text-[#171717]'>{migrationSteps[active][1]}</h4>
              <p className='mt-4 max-w-2xl text-base leading-7 text-[#70706b]'>{migrationSteps[active][2]}</p>
            </motion.div>
          </AnimatePresence>
          <div className='mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3'>
            {['Keep selling', 'Move in phases', 'Confirm each connection'].map((item, index) => <div key={item} className={index <= active ? 'rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-900' : 'rounded-xl border border-[#ecece8] p-4 text-sm text-[#8f8f8a]'}>{item}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function B2BPlatformScene() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => setActive(value => (value + 1) % b2bStages.length), 2900)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e3e3df] bg-white shadow-[0_30px_100px_rgba(20,20,20,.07)] sm:rounded-[28px]'>
      <div className='grid lg:grid-cols-[.72fr_1.28fr]'>
        <div className='border-b border-[#ecece8] bg-[#121318] p-5 text-white sm:p-8 lg:border-b-0 lg:border-r'>
          <p className='text-base font-semibold text-white'>Your partner dashboard</p>
          <div className='mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:mt-8 sm:p-5'>
            <div className='flex items-center gap-3'>
              <div className='grid size-11 place-items-center rounded-xl bg-white text-lg font-bold text-black'>N</div>
              <div className='min-w-0'><p className='truncate text-base font-semibold'>Northstar Commerce</p><p className='mt-1 text-sm text-white/52'>Your brand · powered by NAFS</p></div>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-3 sm:mt-7'>
              {[
                ['Clients', '18'],
                ['Subscriptions', '16'],
                ['Domains', '12'],
                ['Plans', '4']
              ].map(([label, value]) => <div key={label} className='rounded-xl bg-white/[0.055] p-4'><p className='text-xs uppercase tracking-[.08em] text-white/42'>{label}</p><p className='mt-2 text-2xl font-semibold'>{value}</p></div>)}
            </div>
          </div>
          <p className='mt-6 text-sm leading-6 text-white/62'>You lead the brand and client relationship. NAFS provides the software and business management behind it.</p>
        </div>
        <div className='p-5 sm:p-8'>
          <div className='site-scrollbar-hidden flex snap-x gap-2 overflow-x-auto pb-2'>
            {b2bStages.map(([label], index) => <button key={label} type='button' aria-pressed={index === active} onClick={() => setActive(index)} className={index === active ? 'min-w-max snap-start rounded-full bg-[#111] px-4 py-2.5 text-sm font-medium text-white' : 'min-w-max snap-start rounded-full bg-[#f3f3f0] px-4 py-2.5 text-sm font-medium text-[#6f6f6a]'}>{label}</button>)}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className='mt-7 sm:mt-10'>
              <p className='text-sm font-semibold text-violet-700'>Build your B2B offer · Step {active + 1}</p>
              <h4 className='mt-3 text-3xl font-medium tracking-[-0.045em] text-[#171717] sm:text-4xl'>{b2bStages[active][1]}</h4>
              <p className='mt-4 max-w-2xl text-base leading-7 text-[#70706b]'>{b2bStages[active][2]}</p>
            </motion.div>
          </AnimatePresence>
          <div className='mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3'>
            {[
              ['Subscriptions', 'recurring software revenue'],
              ['Services', 'migration, setup and training'],
              ['Add-ons', 'integrations and managed support']
            ].map(([title, note]) => <div key={title} className='rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-4'><p className='text-sm font-semibold text-[#222]'>{title}</p><p className='mt-2 text-sm leading-6 text-[#7d7d78]'>{note}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PartnerGrowthScene() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => setActive(value => (value + 1) % partnerEvents.length), 2200)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className='overflow-hidden rounded-[24px] border border-[#e3e3df] bg-white shadow-[0_30px_100px_rgba(20,20,20,.065)] sm:rounded-[28px]'>
      <div className='grid lg:grid-cols-[1.15fr_.85fr]'>
        <div className='border-b border-[#ecece8] p-5 sm:p-8 lg:border-b-0 lg:border-r'>
          <div className='site-scrollbar-hidden relative flex snap-x items-start gap-2 overflow-x-auto pb-5'>
            <div className='absolute left-8 right-8 top-[22px] h-px bg-[#e4e4df]' />
            {partnerEvents.map(([label], index) => (
              <button key={label} type='button' aria-pressed={index === active} onClick={() => setActive(index)} className='relative z-10 flex min-w-[92px] snap-start flex-col items-center gap-3'>
                <motion.span animate={{ scale: index === active ? 1.2 : 1, backgroundColor: index <= active ? '#111111' : '#ffffff' }} className='size-4 rounded-full border border-[#bdbdb8]' />
                <span className={index === active ? 'text-sm font-semibold text-[#171717]' : 'text-sm text-[#8f8f8a]'}>{label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className='mt-6 rounded-2xl bg-[#fafaf8] p-5 sm:mt-8 sm:p-6'>
              <p className='text-sm font-semibold text-violet-700'>Step {active + 1} of {partnerEvents.length}</p>
              <h4 className='mt-3 text-3xl font-medium tracking-[-0.04em] text-[#171717]'>{partnerEvents[active][1]}</h4>
              <p className='mt-3 text-base text-[#777773]'>{partnerEvents[active][2]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='bg-[#101116] p-5 text-white sm:p-8'>
          <p className='text-xl font-semibold'>Choose how you work with NAFS</p>
          <div className='mt-6 space-y-3'>
            {[
              ['Creators', 'Introduce the right businesses through tracked referrals.'],
              ['Agencies', 'Deliver setup, migration, training and ongoing services.'],
              ['Technology partners', 'Build integrations and specialist solutions.'],
              ['Resellers', 'Package NAFS for your own client market.']
            ].map(([name, role]) => <div key={name} className='rounded-xl border border-white/10 bg-white/[0.04] p-4'><p className='text-sm font-semibold'>{name}</p><p className='mt-1 text-sm leading-6 text-white/58'>{role}</p></div>)}
          </div>
          <p className='mt-6 text-sm leading-6 text-white/56'>Rates, eligibility and payment timing vary by program. We confirm the terms before you join.</p>
        </div>
      </div>
    </div>
  )
}

export function ProductMapScene() {
  const reduceMotion = useReducedMotion()

  const satellites = [
    ['Storefront', 'Sell online'], ['Shopping', 'Branded app'], ['Mobile', 'Team tasks'], ['Flow', 'Automation'],
    ['Courier', 'Delivery'], ['B2B', 'Your platform'], ['Partners', 'Referral growth'], ['Platform', 'Plans & clients']
  ] as const

  return (
    <div className='relative overflow-hidden rounded-[24px] border border-[#e2e2de] bg-[#0d0e12] p-5 text-white shadow-[0_35px_120px_rgba(0,0,0,.16)] sm:rounded-[30px] sm:p-10'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,.18),transparent_36%),linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]' />

      <div className='relative md:hidden'>
        <motion.div animate={reduceMotion ? undefined : { boxShadow: ['0 0 0 0 rgba(139,92,246,.18)', '0 0 0 18px rgba(139,92,246,0)'] }} transition={{ duration: 2.6, repeat: Infinity }} className='mx-auto flex w-full max-w-[230px] flex-col items-center justify-center rounded-2xl border border-white/15 bg-white px-5 py-6 text-center text-black shadow-[0_24px_70px_rgba(0,0,0,.3)]'>
          <span className='text-2xl font-semibold tracking-[-0.045em]'>NAFS OS</span>
          <span className='mt-2 text-sm text-black/55'>Runs the core business</span>
        </motion.div>
        <div className='mt-5 grid grid-cols-2 gap-3'>
          {satellites.map(([name, role]) => (
            <div key={name} className='rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm'>
              <p className='text-base font-semibold'>{name}</p>
              <p className='mt-1 text-sm leading-5 text-white/58'>{role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='relative mx-auto hidden min-h-[520px] max-w-5xl md:block'>
        <motion.div animate={reduceMotion ? undefined : { boxShadow: ['0 0 0 0 rgba(139,92,246,.18)', '0 0 0 26px rgba(139,92,246,0)'] }} transition={{ duration: 2.6, repeat: Infinity }} className='absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28px] border border-white/15 bg-white text-center text-black shadow-[0_24px_70px_rgba(0,0,0,.3)]'>
          <span className='text-3xl font-semibold tracking-[-0.05em]'>NAFS OS</span>
          <span className='mt-2 text-sm text-black/55'>Runs the core business</span>
        </motion.div>
        <span className='absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10' />
        <span className='absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]' />
        <div className='relative z-10 grid min-h-[520px] grid-cols-4 content-between gap-4'>
          {satellites.map(([name, role], index) => (
            <motion.div key={name} animate={reduceMotion ? undefined : { y: index % 2 === 0 ? [0, -8, 0] : [0, 8, 0] }} transition={{ duration: 5 + index * .22, repeat: Infinity, ease: 'easeInOut' }} className='self-auto rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm md:max-w-[180px]'>
              <p className='text-base font-semibold'>{name}</p>
              <p className='mt-1 text-sm text-white/52'>{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function VisibilityConsole() {
  const reduceMotion = useReducedMotion()
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => setCursor(value => (value + 1) % visibilityEvents.length), 1500)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className='overflow-hidden rounded-[24px] border border-white/12 bg-[#101116] shadow-[0_36px_120px_rgba(0,0,0,.32)] sm:rounded-[28px]'>
      <div className='flex flex-col justify-between gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:px-7'>
        <div className='flex items-center gap-3'><span className='size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.75)]' /><span className='text-sm font-medium text-white/82'>Live activity across the operation</span></div>
        <span className='break-words text-sm text-white/42'>Order #10482 · Dhaka Central</span>
      </div>
      <div className='grid lg:grid-cols-[1.25fr_.75fr]'>
        <div className='border-b border-white/10 lg:border-b-0 lg:border-r'>
          <div className='hidden grid-cols-[90px_110px_1fr_90px_70px] border-b border-white/10 px-6 py-3 text-xs font-medium uppercase tracking-[.08em] text-white/34 sm:grid'>
            <span>Time</span><span>Area</span><span>Activity</span><span>Result</span><span>Speed</span>
          </div>
          <div className='p-4 sm:p-0'>
            {visibilityEvents.map((row, index) => (
              <motion.div key={`${row[0]}-${row[1]}`} animate={{ backgroundColor: index === cursor ? 'rgba(139,92,246,.11)' : 'rgba(255,255,255,0)' }} className='mb-2 rounded-xl border border-white/10 p-4 sm:mb-0 sm:grid sm:grid-cols-[90px_110px_1fr_90px_70px] sm:items-center sm:rounded-none sm:border-x-0 sm:border-t-0 sm:px-6 sm:py-4'>
                <div className='flex items-center justify-between gap-4 sm:contents'>
                  <span className='font-mono text-[11px] text-white/38'>{row[0]}</span>
                  <span className='font-mono text-[11px] font-medium text-violet-300'>{row[1]}</span>
                </div>
                <span className='mt-3 block text-sm text-white/78 sm:mt-0'>{row[2]}</span>
                <div className='mt-3 flex items-center justify-between gap-4 sm:contents'>
                  <span className='text-sm font-medium text-emerald-300/88'>{row[3]}</span>
                  <span className='font-mono text-[11px] text-white/38'>{row[4]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='p-5 sm:p-8'>
          <p className='text-xl font-semibold text-white'>What your team gets</p>
          <div className='mt-6 space-y-5'>
            {[
              ['Clear ownership', 'See which team or person owns the next step.'],
              ['Work that keeps running', 'Important tasks continue even when a browser closes or a connection briefly fails.'],
              ['Trusted updates', 'Delivery and payment updates are checked before they change an order.'],
              ['Complete history', 'See what changed, who changed it and when it happened.']
            ].map(([title, detail]) => <div key={title} className='border-b border-white/10 pb-5 last:border-b-0'><p className='text-sm font-semibold text-white/88'>{title}</p><p className='mt-2 text-sm leading-6 text-white/58'>{detail}</p></div>)}
          </div>
          <div className='mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5'>
            {['API', 'PostgreSQL', 'Workers', 'Pathao', 'NAFS Flow'].map(item => <span key={item} className='rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/48'>{item}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}
