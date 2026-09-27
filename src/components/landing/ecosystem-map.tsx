const ChannelNode = ({ title, detail }: { title: string; detail: string }) => (
  <div className='relative rounded-lg border border-slate-200 bg-white/95 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/90'>
    <div className='flex items-center gap-2'>
      <span className='size-1.5 rounded-full bg-violet-500' aria-hidden='true' />
      <p className='text-sm font-semibold text-slate-950 dark:text-white'>{title}</p>
    </div>
    <p className='mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400'>{detail}</p>
  </div>
)

const ProductNode = ({
  title,
  detail,
  accent = false
}: {
  title: string
  detail: string
  accent?: boolean
}) => (
  <div
    className={
      accent
        ? 'relative rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3.5 text-white'
        : 'relative rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-white'
    }
  >
    <div className='flex items-center justify-between gap-3'>
      <p className='text-sm font-semibold'>{title}</p>
      <span className={accent ? 'size-2 rounded-full bg-violet-300' : 'size-2 rounded-full bg-emerald-300'} aria-hidden='true' />
    </div>
    <p className='mt-1 text-[11px] leading-5 text-slate-400'>{detail}</p>
  </div>
)

export const EcosystemMap = () => (
  <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-violet-950/10 sm:p-5 dark:border-white/10 dark:bg-slate-900'>
    <div className='site-grid pointer-events-none absolute inset-0 opacity-60' aria-hidden='true' />
    <div className='relative'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300'>One connected commerce system</p>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>Customer channels feed the operating core. Specialized products extend the work.</p>
        </div>
        <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400'>
          <span className='size-2 rounded-full bg-emerald-400 motion-safe:animate-pulse' aria-hidden='true' />
          Event flow
        </div>
      </div>

      <div className='grid gap-2 sm:grid-cols-3'>
        <ChannelNode title='Storefront' detail='Web catalog · checkout · accounts' />
        <ChannelNode title='Shopping' detail='Tenant-branded native commerce' />
        <ChannelNode title='POS & assisted sales' detail='Store and operator-created orders' />
      </div>

      <div className='relative h-10' aria-hidden='true'>
        <span className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-400 to-violet-600/30' />
        <span className='motion-safe:animate-pulse absolute left-1/2 top-1 size-2 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,.7)]' />
      </div>

      <div className='relative overflow-hidden rounded-2xl bg-slate-950 p-4 text-white shadow-xl sm:p-5'>
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent' aria-hidden='true' />
        <div className='grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='rounded-md border border-violet-400/30 bg-violet-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-200'>Operating core</span>
              <span className='text-[10px] text-slate-500'>NAFS OS</span>
            </div>
            <h3 className='mt-3 text-2xl font-semibold tracking-[-0.04em]'>Commerce and operations stay connected after the sale.</h3>
            <p className='mt-3 max-w-xl text-sm leading-6 text-slate-400'>Catalog, orders, customers, inventory, fulfillment, purchasing, payments, settlements and reporting work around the same business context.</p>
          </div>
          <div className='grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            {['Orders', 'Inventory', 'Fulfillment', 'Payments', 'Purchasing', 'Returns', 'Analytics', 'Audit'].map(item => (
              <div key={item} className='rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-slate-300'>{item}</div>
            ))}
          </div>
        </div>

        <div className='my-5 h-px bg-white/10' />

        <div className='grid gap-2 sm:grid-cols-3'>
          <ProductNode title='NAFS Flow' detail='Automate and orchestrate' accent />
          <ProductNode title='NAFS Mobile' detail='Operate from the phone' />
          <ProductNode title='NAFS Courier' detail='Quote · book · track' />
        </div>
      </div>

      <div className='relative h-10' aria-hidden='true'>
        <span className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-600/30 to-slate-300 dark:to-white/15' />
      </div>

      <div className='grid gap-2 sm:grid-cols-2'>
        <ChannelNode title='NAFS Partners' detail='Attribution · programs · commissions' />
        <ChannelNode title='NAFS Platform' detail='Partners · tenants · plans · branding · domains' />
      </div>
    </div>
  </div>
)
