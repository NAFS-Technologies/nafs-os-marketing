import {
  ArrowDownIcon,
  ArrowRightIcon,
  BoxesIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  Clock3Icon,
  Code2Icon,
  PackageCheckIcon,
  ScanLineIcon,
  ShoppingBagIcon,
  StoreIcon,
  TruckIcon,
  WebhookIcon,
  WorkflowIcon
} from 'lucide-react'

import { FulfillmentPreview, InventoryPreview } from '@/components/landing/product-screens'

const orderRows = [
  ['#10482', 'Nusrat Jahan', 'Allocated', '৳ 4,820'],
  ['#10481', 'Raisa Ahmed', 'Picking', '৳ 2,350'],
  ['#10479', 'Tahmina Noor', 'Packed', '৳ 6,140']
] as const

const miniMetric = (label: string, value: string) => (
  <div className='min-w-0 border-l border-slate-200 pl-3 dark:border-white/10'>
    <p className='truncate text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400'>{label}</p>
    <p className='mt-1 text-sm font-semibold tabular-nums text-slate-950 dark:text-white'>{value}</p>
  </div>
)

export function HeroSystemScene() {
  return (
    <div className='relative mx-auto w-full max-w-6xl pb-16 pt-6 sm:pb-20 lg:pb-24'>
      <div className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-300/60 to-transparent dark:via-violet-400/20' aria-hidden='true' />
      <div className='absolute left-1/2 top-12 size-44 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl' aria-hidden='true' />

      <div className='relative mx-auto max-w-4xl overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_32px_100px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#0d0f13]'>
        <div className='flex h-11 items-center border-b border-slate-200 px-4 dark:border-white/10'>
          <div className='flex gap-1.5' aria-hidden='true'>
            <span className='size-2.5 rounded-full bg-slate-200 dark:bg-white/10' />
            <span className='size-2.5 rounded-full bg-slate-200 dark:bg-white/10' />
            <span className='size-2.5 rounded-full bg-slate-200 dark:bg-white/10' />
          </div>
          <span className='mx-auto text-[10px] font-medium text-slate-400'>Today · NAFS OS</span>
          <span className='w-10' />
        </div>

        <div className='grid min-h-[410px] lg:grid-cols-[180px_1fr]'>
          <aside className='hidden border-r border-slate-200 bg-slate-50/70 p-4 lg:block dark:border-white/10 dark:bg-white/[0.025]'>
            <div className='flex items-center gap-2 px-2'>
              <span className='grid size-7 place-items-center rounded-md bg-slate-950 text-[10px] font-bold text-white dark:bg-white dark:text-slate-950'>N</span>
              <span className='text-xs font-semibold text-slate-900 dark:text-white'>NAFS OS</span>
            </div>
            <div className='mt-6 space-y-1 text-[10px] font-medium text-slate-500 dark:text-slate-400'>
              {['Dashboard', 'Orders', 'Products', 'Inventory', 'Fulfillment', 'Purchasing', 'Payments', 'Analytics'].map(item => (
                <div key={item} className={item === 'Orders' ? 'rounded-md bg-slate-950 px-2.5 py-2 text-white dark:bg-white dark:text-slate-950' : 'px-2.5 py-2'}>{item}</div>
              ))}
            </div>
          </aside>

          <div className='min-w-0 p-4 sm:p-6'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-medium text-slate-400'>Operating overview</p>
                <h3 className='mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white'>What needs attention now</h3>
              </div>
              <span className='rounded-md border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:text-slate-300'>Dhaka · All channels</span>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4'>
              {miniMetric('Orders', '1,248')}
              {miniMetric('Revenue', '৳14.2M')}
              {miniMetric('Units', '38,402')}
              {miniMetric('Exceptions', '17')}
            </div>

            <div className='mt-7 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10'>
              <div className='grid grid-cols-[0.7fr_1.1fr_0.9fr_0.8fr] bg-slate-50 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:bg-white/[0.035]'>
                <span>Order</span><span>Customer</span><span>State</span><span className='text-right'>Total</span>
              </div>
              {orderRows.map(([order, customer, state, total]) => (
                <div key={order} className='grid grid-cols-[0.7fr_1.1fr_0.9fr_0.8fr] items-center border-t border-slate-100 px-4 py-3 text-[10px] text-slate-500 dark:border-white/[0.06] dark:text-slate-300'>
                  <span className='font-semibold text-slate-950 dark:text-white'>{order}</span>
                  <span className='truncate'>{customer}</span>
                  <span className='w-fit rounded-full bg-violet-50 px-2 py-1 font-semibold text-violet-700 dark:bg-violet-400/10 dark:text-violet-300'>{state}</span>
                  <span className='text-right font-semibold tabular-nums text-slate-950 dark:text-white'>{total}</span>
                </div>
              ))}
            </div>

            <div className='mt-5 grid gap-3 sm:grid-cols-3'>
              <div className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
                <div className='flex items-center justify-between'><span className='text-[10px] font-semibold text-slate-500 dark:text-slate-300'>Inventory</span><BoxesIcon className='size-3.5 text-slate-400' /></div>
                <p className='mt-2 text-lg font-semibold text-slate-950 dark:text-white'>86 low stock</p>
                <p className='mt-1 text-[9px] text-slate-400'>12 need buying review</p>
              </div>
              <div className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
                <div className='flex items-center justify-between'><span className='text-[10px] font-semibold text-slate-500 dark:text-slate-300'>Courier</span><TruckIcon className='size-3.5 text-slate-400' /></div>
                <p className='mt-2 text-lg font-semibold text-slate-950 dark:text-white'>142 in transit</p>
                <p className='mt-1 text-[9px] text-slate-400'>Pathao execution boundary</p>
              </div>
              <div className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
                <div className='flex items-center justify-between'><span className='text-[10px] font-semibold text-slate-500 dark:text-slate-300'>Settlement</span><CircleDollarSignIcon className='size-3.5 text-slate-400' /></div>
                <p className='mt-2 text-lg font-semibold text-slate-950 dark:text-white'>৳1.8M open</p>
                <p className='mt-1 text-[9px] text-slate-400'>COD work awaiting review</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute -left-1 bottom-3 hidden w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_20px_55px_rgba(15,23,42,0.12)] md:block dark:border-white/10 dark:bg-[#0d0f13]'>
        <div className='flex items-center justify-between'><span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>Storefront</span><StoreIcon className='size-4 text-violet-500' /></div>
        <p className='mt-3 text-sm font-semibold text-slate-950 dark:text-white'>Order #10482 created</p>
        <p className='mt-1 text-[10px] leading-5 text-slate-400'>Customer, pricing and checkout context arrived together.</p>
      </div>

      <div className='absolute -right-1 bottom-7 hidden w-60 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_20px_55px_rgba(15,23,42,0.12)] md:block dark:border-white/10 dark:bg-[#0d0f13]'>
        <div className='flex items-center justify-between'><span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>NAFS Flow</span><WorkflowIcon className='size-4 text-violet-500' /></div>
        <div className='mt-3 flex items-center gap-2 text-[10px] font-medium text-slate-500 dark:text-slate-300'>
          <span className='enterprise-live-dot size-2 rounded-full bg-emerald-500' />
          Delivered order automation running
        </div>
        <p className='mt-2 font-mono text-[9px] text-slate-400'>orders.delivered → settlements.create</p>
      </div>
    </div>
  )
}

export function OperationsScene() {
  return (
    <div className='relative mx-auto max-w-6xl pb-14 pt-4'>
      <div className='relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8f8f7] p-3 sm:p-5 lg:p-7 dark:border-white/10 dark:bg-white/[0.025]'>
        <div className='relative z-10 lg:pr-28'>
          <FulfillmentPreview />
        </div>

        <div className='absolute bottom-4 right-4 z-20 hidden w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.14)] lg:block dark:border-white/10 dark:bg-[#111318]'>
          <div className='flex items-center justify-between'>
            <span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>Shipment</span>
            <span className='rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'>Booked</span>
          </div>
          <div className='mt-4 flex items-center gap-3'>
            <span className='grid size-9 place-items-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950'><TruckIcon className='size-4' /></span>
            <div>
              <p className='text-sm font-semibold text-slate-950 dark:text-white'>Pathao · C-284903</p>
              <p className='mt-1 text-[10px] text-slate-400'>Dhaka Central → Banani</p>
            </div>
          </div>
          <div className='mt-4 border-t border-slate-100 pt-3 dark:border-white/10'>
            <div className='flex items-center justify-between text-[10px]'><span className='text-slate-400'>COD amount</span><strong className='text-slate-950 dark:text-white'>৳ 4,820</strong></div>
            <div className='mt-2 flex items-center justify-between text-[10px]'><span className='text-slate-400'>Callback</span><strong className='text-emerald-600 dark:text-emerald-300'>Verified</strong></div>
          </div>
        </div>

        <div className='absolute right-10 top-8 z-20 hidden w-52 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] xl:block dark:border-white/10 dark:bg-[#111318]'>
          <div className='flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-300'><Clock3Icon className='size-3.5 text-violet-500' />Next queue</div>
          <p className='mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white'>18</p>
          <p className='mt-1 text-[10px] leading-5 text-slate-400'>orders ready for allocation after stock checks</p>
        </div>
      </div>
    </div>
  )
}

export function InventoryScene() {
  return (
    <div className='relative mx-auto max-w-6xl pb-14 pt-4'>
      <div className='relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8f8f7] p-3 sm:p-5 lg:p-7 dark:border-white/10 dark:bg-white/[0.025]'>
        <div className='relative z-10 lg:pl-28'>
          <InventoryPreview />
        </div>

        <div className='absolute bottom-7 left-5 z-20 hidden w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.13)] lg:block dark:border-white/10 dark:bg-[#111318]'>
          <div className='flex items-center justify-between'>
            <span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>Replenishment review</span>
            <span className='rounded-full bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300'>Needs approval</span>
          </div>
          <p className='mt-4 text-sm font-semibold text-slate-950 dark:text-white'>Niacinamide Facial Cream · 55ml</p>
          <div className='mt-4 grid grid-cols-3 gap-3'>
            {miniMetric('Available', '16')}
            {miniMetric('Lead time', '18d')}
            {miniMetric('Suggested', '72')}
          </div>
          <button type='button' className='mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-slate-950 text-[10px] font-semibold text-white dark:bg-white dark:text-slate-950'>Review purchase <ArrowRightIcon className='size-3.5' /></button>
        </div>
      </div>
    </div>
  )
}

const flowSteps = [
  ['Trigger', 'Order delivered', 'orders.delivered'],
  ['Check', 'Verify payment state', 'payments.lookup'],
  ['Create', 'Open settlement work', 'settlements.create'],
  ['Decide', 'Inventory threshold', 'inventory.evaluate'],
  ['Notify', 'Operations owner', 'messaging.send']
] as const

export function FlowScene() {
  return (
    <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0d10] p-4 shadow-[0_36px_120px_rgba(0,0,0,0.28)] sm:p-6 lg:p-8'>
      <div className='enterprise-dark-grid absolute inset-0 opacity-60' aria-hidden='true' />
      <div className='absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl' aria-hidden='true' />

      <div className='relative'>
        <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300'>NAFS Flow</p>
            <h3 className='mt-2 text-xl font-semibold tracking-tight text-white'>Delivered order follow-through</h3>
          </div>
          <div className='flex items-center gap-3 text-[10px] text-slate-400'>
            <span className='flex items-center gap-2'><span className='enterprise-live-dot size-2 rounded-full bg-emerald-400' /> Running</span>
            <span className='rounded-md border border-white/10 px-2.5 py-1.5'>v12</span>
          </div>
        </div>

        <div className='relative mt-8 grid gap-5 lg:grid-cols-[1fr_220px]'>
          <div className='relative flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center'>
            {flowSteps.map(([kind, title, action], index) => (
              <div key={title} className='relative flex-1'>
                {index < flowSteps.length - 1 ? <div className='absolute left-full top-1/2 hidden h-px w-5 bg-violet-400/35 lg:block'><span className='enterprise-flow-dot absolute -top-1 left-0 size-2 rounded-full bg-violet-300' /></div> : null}
                <div className='min-h-32 rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300'>{kind}</span>
                    <span className='size-1.5 rounded-full bg-emerald-400/80' />
                  </div>
                  <p className='mt-5 text-sm font-semibold text-white'>{title}</p>
                  <p className='mt-2 break-all font-mono text-[9px] leading-4 text-slate-500'>{action}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className='rounded-xl border border-white/10 bg-white/[0.035] p-4'>
            <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Run detail</p>
            <div className='mt-4 space-y-3 text-[10px]'>
              <div className='flex items-center justify-between'><span className='text-slate-500'>Run ID</span><span className='font-mono text-slate-300'>run_8f42</span></div>
              <div className='flex items-center justify-between'><span className='text-slate-500'>Tenant</span><span className='text-slate-300'>lavishta-bd</span></div>
              <div className='flex items-center justify-between'><span className='text-slate-500'>Duration</span><span className='text-slate-300'>1.84s</span></div>
              <div className='flex items-center justify-between'><span className='text-slate-500'>Audit</span><span className='text-emerald-300'>Recorded</span></div>
            </div>
            <div className='mt-5 border-t border-white/10 pt-4'>
              <p className='font-mono text-[9px] leading-5 text-slate-500'>09:41:22 trigger accepted<br />09:41:22 payment verified<br />09:41:23 settlement queued<br />09:41:24 notification sent</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function StorefrontPanel() {
  return (
    <div className='overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-[#101216]'>
      <div className='flex h-10 items-center border-b border-slate-200 px-4 dark:border-white/10'>
        <span className='text-[10px] font-semibold tracking-tight text-slate-900 dark:text-white'>Lavishta</span>
        <div className='mx-auto flex gap-5 text-[9px] text-slate-400'><span>New</span><span>Makeup</span><span>Skincare</span><span>Brands</span></div>
        <ShoppingBagIcon className='size-3.5 text-slate-400' />
      </div>
      <div className='p-4 sm:p-5'>
        <div className='flex items-end justify-between gap-4'>
          <div><p className='text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-600 dark:text-violet-300'>This week</p><h3 className='mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white'>Beauty, better chosen.</h3></div>
          <span className='text-[9px] font-semibold text-slate-400'>View all</span>
        </div>
        <div className='mt-5 grid grid-cols-3 gap-3'>
          {[
            ['Tinted SPF', '৳ 2,450'],
            ['Barrier Cream', '৳ 2,100'],
            ['Soft Matte Base', '৳ 3,250']
          ].map(([name, price], index) => (
            <div key={name}>
              <div className='aspect-[4/5] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 p-3 dark:from-white/5 dark:to-white/10'>
                <div className={`mx-auto h-full w-1/2 rounded-md ${index === 0 ? 'bg-rose-200/80' : index === 1 ? 'bg-sky-100/90' : 'bg-amber-100/90'} shadow-sm`} />
              </div>
              <p className='mt-2 truncate text-[10px] font-medium text-slate-900 dark:text-white'>{name}</p>
              <p className='mt-1 text-[9px] text-slate-400'>{price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShoppingPhone() {
  return (
    <div className='mx-auto w-[230px] rounded-[32px] border-[7px] border-slate-950 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.2)] dark:border-black dark:bg-[#111318]'>
      <div className='mx-auto mb-2 h-1.5 w-16 rounded-full bg-slate-900 dark:bg-black' />
      <div className='rounded-[22px] bg-[#f7f2ea] p-3 text-[#1a1017]'>
        <div className='flex items-center justify-between text-[9px] font-semibold'><span>lavishta</span><ShoppingBagIcon className='size-3.5' /></div>
        <p className='mt-5 text-[9px] uppercase tracking-[0.12em] text-[#e6006e]'>For you</p>
        <p className='mt-1 text-lg font-semibold tracking-tight'>Your routine, edited.</p>
        <div className='mt-4 aspect-square rounded-xl bg-white p-3'>
          <div className='mx-auto h-full w-2/5 rounded-lg bg-[#d9deff]' />
        </div>
        <p className='mt-3 text-[10px] font-semibold'>Barrier support set</p>
        <p className='mt-1 text-[9px] leading-4 text-black/50'>Lightweight routine for humid days.</p>
        <button type='button' className='mt-4 h-8 w-full rounded-md bg-[#e6006e] text-[9px] font-semibold text-white'>Add to bag · ৳ 4,550</button>
      </div>
    </div>
  )
}

function OperatorPhone() {
  return (
    <div className='mx-auto w-[215px] rounded-[30px] border-[7px] border-slate-950 bg-white p-2 shadow-[0_28px_70px_rgba(15,23,42,0.18)] dark:border-black dark:bg-[#111318]'>
      <div className='mx-auto mb-2 h-1.5 w-14 rounded-full bg-slate-900 dark:bg-black' />
      <div className='rounded-[20px] bg-slate-50 p-3 dark:bg-white/[0.035]'>
        <div className='flex items-center justify-between'><div><p className='text-[8px] text-slate-400'>Good morning</p><p className='text-[10px] font-semibold text-slate-950 dark:text-white'>Operations</p></div><span className='grid size-7 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300'>N</span></div>
        <div className='mt-4 rounded-xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950'>
          <p className='text-[8px] opacity-60'>Attention queue</p><p className='mt-1 text-2xl font-semibold'>17</p><p className='mt-1 text-[8px] opacity-60'>items need action</p>
        </div>
        <div className='mt-3 space-y-2'>
          {[
            [ScanLineIcon, 'Scan receiving', '8 PO lines'],
            [PackageCheckIcon, 'Pick & pack', '18 orders'],
            [CheckCircle2Icon, 'Approvals', '3 waiting']
          ].map(([Icon, title, note]) => {
            const PhoneIcon = Icon as typeof ScanLineIcon

            return <div key={String(title)} className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/[0.03]'><span className='grid size-7 place-items-center rounded-md bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300'><PhoneIcon className='size-3.5' /></span><div><p className='text-[9px] font-semibold text-slate-900 dark:text-white'>{title as string}</p><p className='mt-0.5 text-[8px] text-slate-400'>{note as string}</p></div></div>
          })}
        </div>
      </div>
    </div>
  )
}

export function CommerceScene() {
  return (
    <div className='relative mx-auto max-w-6xl pb-16 pt-4'>
      <div className='relative min-h-[560px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8f8f7] p-5 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-white/[0.025]'>
        <div className='absolute inset-x-10 top-10 lg:right-[310px]'>
          <StorefrontPanel />
        </div>
        <div className='absolute bottom-6 right-8 hidden sm:block lg:right-12'>
          <ShoppingPhone />
        </div>
        <div className='absolute bottom-5 left-8 hidden md:block lg:left-auto lg:right-[260px]'>
          <OperatorPhone />
        </div>
        <div className='absolute bottom-10 left-8 hidden w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] lg:block dark:border-white/10 dark:bg-[#111318]'>
          <div className='flex items-center justify-between'><span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>Same order</span><ArrowDownIcon className='size-3.5 text-violet-500' /></div>
          <p className='mt-3 text-sm font-semibold text-slate-950 dark:text-white'>Storefront → NAFS OS</p>
          <p className='mt-1 text-[10px] leading-5 text-slate-400'>Customer channel changes. The commerce record underneath does not.</p>
        </div>
      </div>
    </div>
  )
}

export function InfrastructureScene() {
  const payload = `{
  "event": "orders.delivered",
  "tenant": "org_28f1",
  "order": "10482",
  "idempotency_key": "evt_8f42"
}`

  return (
    <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#090b0e] shadow-[0_36px_120px_rgba(0,0,0,0.28)]'>
      <div className='enterprise-dark-grid absolute inset-0 opacity-40' aria-hidden='true' />
      <div className='relative grid lg:grid-cols-[0.82fr_1.18fr]'>
        <div className='border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300'>Platform boundary</p>
          <h3 className='mt-3 text-2xl font-semibold tracking-tight text-white'>The system is explicit about who owns what.</h3>
          <div className='mt-8 space-y-3'>
            {[
              [Code2Icon, 'NAFS OS', 'commerce and operational truth'],
              [StoreIcon, 'Storefront', 'customer composition boundary'],
              [WorkflowIcon, 'Flow', 'workflow definition and execution'],
              [WebhookIcon, 'Providers', 'replaceable external adapters']
            ].map(([Icon, title, note]) => {
              const RowIcon = Icon as typeof Code2Icon

              return <div key={String(title)} className='grid grid-cols-[36px_100px_1fr] items-center gap-3 border-t border-white/10 py-3'><span className='grid size-8 place-items-center rounded-md bg-white/[0.05] text-violet-300'><RowIcon className='size-4' /></span><span className='text-[11px] font-semibold text-white'>{title as string}</span><span className='text-[10px] leading-5 text-slate-500'>{note as string}</span></div>
            })}
          </div>
        </div>

        <div className='p-6 sm:p-8'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-xl border border-white/10 bg-white/[0.035] p-4'>
              <div className='flex items-center justify-between'><span className='text-[10px] font-semibold text-slate-300'>Webhook event</span><span className='rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-300'>2xx</span></div>
              <pre className='mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-[9px] leading-5 text-slate-500'>{payload}</pre>
            </div>
            <div className='rounded-xl border border-white/10 bg-white/[0.035] p-4'>
              <p className='text-[10px] font-semibold text-slate-300'>Trust boundaries</p>
              <div className='mt-4 space-y-3 text-[10px]'>
                <div className='flex items-center justify-between'><span className='text-slate-500'>Tenant context</span><span className='text-slate-300'>Signed claims</span></div>
                <div className='flex items-center justify-between'><span className='text-slate-500'>Business access</span><span className='text-slate-300'>ERP permissions</span></div>
                <div className='flex items-center justify-between'><span className='text-slate-500'>Durable work</span><span className='text-slate-300'>PostgreSQL worker</span></div>
                <div className='flex items-center justify-between'><span className='text-slate-500'>Audit</span><span className='text-slate-300'>Recorded</span></div>
              </div>
            </div>
          </div>

          <div className='mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-4'>
            <div className='flex items-center justify-between gap-4'><span className='text-[10px] font-semibold text-slate-300'>Platform topology</span><span className='text-[9px] text-slate-500'>NAFS → Partner / Reseller → Client Tenant → Staff</span></div>
            <div className='mt-5 flex flex-wrap items-center gap-2 text-[9px] font-semibold text-slate-300'>
              {['NAFS', 'Partner / Reseller', 'Client Tenant', 'Tenant Staff'].map((item, index) => (
                <div key={item} className='flex items-center gap-2'><span className={index === 0 ? 'rounded-md bg-white px-2.5 py-2 text-slate-950' : 'rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2'}>{item}</span>{index < 3 ? <ArrowRightIcon className='size-3 text-slate-600' /> : null}</div>
              ))}
            </div>
          </div>

          <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {[
              ['API', 'Versioned'],
              ['Webhooks', 'Signed'],
              ['RLS', 'Tenant-safe'],
              ['Jobs', 'Durable']
            ].map(([label, value]) => <div key={label} className='border-l border-white/10 pl-3'><p className='text-[9px] uppercase tracking-[0.12em] text-slate-600'>{label}</p><p className='mt-1 text-[11px] font-semibold text-slate-300'>{value}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
