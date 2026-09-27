import type { ReactNode } from 'react'

import {
  BarChart3Icon,
  BoxesIcon,
  CheckIcon,
  FileTextIcon,
  PackageCheckIcon,
  PackageSearchIcon,
  SearchIcon,
  Settings2Icon,
  ShoppingBagIcon,
  TruckIcon,
  UsersIcon
} from 'lucide-react'

const sidebarItems = [
  { label: 'Dashboard', icon: BarChart3Icon },
  { label: 'Orders', icon: ShoppingBagIcon },
  { label: 'Products', icon: BoxesIcon },
  { label: 'Customers', icon: UsersIcon },
  { label: 'Inventory', icon: PackageSearchIcon },
  { label: 'Fulfillment', icon: PackageCheckIcon },
  { label: 'Returns', icon: TruckIcon },
  { label: 'Purchasing', icon: FileTextIcon },
  { label: 'Analytics', icon: BarChart3Icon },
  { label: 'Settings', icon: Settings2Icon }
] as const

const previewRows = [
  { order: '#10482', customer: 'Nusrat Jahan', status: 'Allocated', warehouse: 'Dhaka Central', total: '৳ 4,820', date: '29 Aug' },
  { order: '#10481', customer: 'Raisa Ahmed', status: 'Picking', warehouse: 'Dhaka Central', total: '৳ 2,350', date: '29 Aug' },
  { order: '#10479', customer: 'Tahmina Noor', status: 'Packed', warehouse: 'Gulshan', total: '৳ 6,140', date: '29 Aug' },
  { order: '#10477', customer: 'Farzana Akter', status: 'Exception', warehouse: 'Not selected', total: '৳ 1,980', date: '28 Aug' }
] as const

function BrowserBar({ title }: { title: string }) {
  return (
    <div className='flex h-11 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-white/10 dark:bg-slate-950'>
      <div className='flex gap-1.5' aria-hidden='true'>
        <span className='size-2.5 rounded-full bg-slate-300 dark:bg-white/20' />
        <span className='size-2.5 rounded-full bg-slate-300 dark:bg-white/20' />
        <span className='size-2.5 rounded-full bg-slate-300 dark:bg-white/20' />
      </div>
      <div className='mx-auto flex h-7 w-full max-w-sm items-center justify-center rounded-md bg-slate-100 px-3 text-[10px] font-medium text-slate-500 dark:bg-white/7 dark:text-slate-400'>
        {title}
      </div>
      <span className='size-5' aria-hidden='true' />
    </div>
  )
}

function AppSidebar({ active }: { active: string }) {
  return (
    <aside className='hidden w-44 shrink-0 border-r border-slate-200 bg-slate-50/80 p-3 lg:block dark:border-white/10 dark:bg-white/[0.025]'>
      <div className='mb-4 flex items-center gap-2 px-2 py-1.5'>
        <span className='grid size-7 place-items-center rounded-lg bg-violet-600 text-[10px] font-bold text-white'>N</span>
        <span className='text-xs font-semibold tracking-tight text-slate-900 dark:text-white'>NAFS OS</span>
      </div>
      <nav className='space-y-0.5' aria-label='Product preview navigation'>
        {sidebarItems.map(item => {
          const Icon = item.icon
          const isActive = item.label === active

          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-md px-2 py-2 text-[10px] font-medium ${
                isActive
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className='size-3.5' />
              {item.label}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export function ProductFrame({
  title,
  active,
  children,
  className = ''
}: {
  title: string
  active: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950 ${className}`}>
      <BrowserBar title={title} />
      <div className='flex min-h-[430px]'>
        <AppSidebar active={active} />
        <div className='min-w-0 flex-1 bg-white dark:bg-slate-950'>{children}</div>
      </div>
    </div>
  )
}

function Status({ value }: { value: string }) {
  const tone =
    value === 'Packed'
      ? 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20'
      : value === 'Exception'
        ? 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20'
        : 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20'

  return <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-semibold ring-1 ring-inset ${tone}`}>{value}</span>
}

export function FulfillmentPreview() {
  return (
    <ProductFrame title='Fulfillment · NAFS OS' active='Fulfillment'>
      <div className='p-4 sm:p-5'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Fulfillment</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Allocate, pick, pack and dispatch confirmed orders.</p>
          </div>
          <div className='flex gap-2'>
            <button type='button' className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200'>Print pick slip</button>
            <button type='button' className='rounded-md bg-violet-600 px-3 py-2 text-[9px] font-semibold text-white'>Dispatch selected</button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {[
            ['Queue', '56'],
            ['Allocated', '24'],
            ['Packed', '11'],
            ['Exceptions', '3']
          ].map(([label, value]) => (
            <div key={label} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] text-slate-500 dark:text-slate-400'>{label}</p>
              <p className='mt-1 text-lg font-semibold text-slate-950 dark:text-white'>{value}</p>
            </div>
          ))}
        </div>

        <div className='mt-4 flex gap-1 overflow-x-auto border-b border-slate-200 pb-2 dark:border-white/10'>
          {['All 56', 'Pending 18', 'Allocated 24', 'Packed 11', 'Exceptions 3'].map((item, index) => (
            <span key={item} className={`shrink-0 rounded-md px-2.5 py-1.5 text-[9px] font-semibold ${index === 2 ? 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}>{item}</span>
          ))}
        </div>

        <div className='mt-3 flex items-center gap-2'>
          <div className='flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 text-[9px] text-slate-400 dark:border-white/10'>
            <SearchIcon className='size-3' />
            Search order, customer, or SKU…
          </div>
          <span className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300'>Filters</span>
        </div>

        <div className='mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
          <div className='grid grid-cols-[0.85fr_1.2fr_0.9fr_1fr_0.75fr] gap-2 bg-slate-50 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.035] dark:text-slate-400'>
            <span>Order</span><span>Customer</span><span>Fulfillment</span><span>Warehouse</span><span className='text-right'>Total</span>
          </div>
          {previewRows.map(row => (
            <div key={row.order} className='grid grid-cols-[0.85fr_1.2fr_0.9fr_1fr_0.75fr] items-center gap-2 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600 dark:border-white/7 dark:text-slate-300'>
              <span className='font-semibold text-slate-950 dark:text-white'>{row.order}</span>
              <span className='truncate'>{row.customer}</span>
              <Status value={row.status} />
              <span className='truncate'>{row.warehouse}</span>
              <span className='text-right font-semibold tabular-nums text-slate-950 dark:text-white'>{row.total}</span>
            </div>
          ))}
        </div>

        <div className='mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-950 px-3 py-2.5 text-white dark:bg-white dark:text-slate-950'>
          <span className='text-[9px] font-semibold'>3 fulfillment rows selected</span>
          <div className='flex gap-1.5'>
            {['Export', 'Pick', 'Pack'].map(action => <span key={action} className='rounded-md bg-white/10 px-2.5 py-1.5 text-[8px] font-semibold dark:bg-slate-950/10'>{action}</span>)}
          </div>
        </div>
      </div>
    </ProductFrame>
  )
}

export function InventoryPreview() {
  const rows = [
    ['Zodiac Brush Set · 6 Piece', 'prod-2042', '3', '1', '1', '0', 'Synced'],
    ['Niacinamide Facial Cream · 55ml', 'prod-1487', '16', '16', '1', '15', 'Synced'],
    ['Longwear Brow Gel · Espresso', 'prod-1359', '4', '3', '1', '3', 'Missing mapping'],
    ['Hyaluronic Acid Serum · 30ml', 'prod-1122', '28', '27', '1', '27', 'Synced'],
    ['Vitamin C Brightening Toner', 'prod-1098', '8', '7', '1', '7', 'Low stock']
  ] as const

  return (
    <ProductFrame title='Inventory · NAFS OS' active='Inventory'>
      <div className='p-4 sm:p-5'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Inventory</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Review stock across locations and variants, then take action.</p>
          </div>
          <div className='flex gap-2'>
            <button type='button' className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200'>Import</button>
            <button type='button' className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200'>Export</button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {[
            ['Total products', '1,248'],
            ['Variants in stock', '3,842'],
            ['Low stock', '86'],
            ['Sync issues', '24']
          ].map(([label, value]) => (
            <div key={label} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] text-slate-500 dark:text-slate-400'>{label}</p>
              <p className='mt-1 text-lg font-semibold text-slate-950 dark:text-white'>{value}</p>
            </div>
          ))}
        </div>

        <div className='mt-4 flex items-center gap-2'>
          <span className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300'>All locations</span>
          <div className='flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 text-[9px] text-slate-400 dark:border-white/10'><SearchIcon className='size-3' />Search products, SKUs or barcodes…</div>
          <span className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300'>Filters</span>
        </div>

        <div className='mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
          <div className='grid grid-cols-[1.35fr_0.8fr_0.5fr_0.55fr_0.65fr_0.75fr_0.85fr] gap-2 bg-slate-50 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.035] dark:text-slate-400'>
            <span>Product</span><span>SKU</span><span>On hand</span><span>Available</span><span>Committed</span><span>Channel</span><span>Sync</span>
          </div>
          {rows.map(row => (
            <div key={row[0]} className='grid grid-cols-[1.35fr_0.8fr_0.5fr_0.55fr_0.65fr_0.75fr_0.85fr] items-center gap-2 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600 dark:border-white/7 dark:text-slate-300'>
              <div className='flex min-w-0 items-center gap-2'>
                <span className='grid size-7 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400 dark:bg-white/7'><BoxesIcon className='size-3.5' /></span>
                <span className='truncate font-semibold text-slate-950 dark:text-white'>{row[0]}</span>
              </div>
              <span className='truncate font-mono text-[8px]'>{row[1]}</span>
              <span className='tabular-nums'>{row[2]}</span>
              <span className='tabular-nums'>{row[3]}</span>
              <span className='tabular-nums'>{row[4]}</span>
              <span className='tabular-nums'>{row[5]}</span>
              <span className={`w-fit rounded-full px-2 py-1 text-[8px] font-semibold ${row[6] === 'Synced' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300'}`}>{row[6]}</span>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-2 sm:grid-cols-3'>
          {[
            ['Locations', '3 active locations'],
            ['Transfers', '5 in progress'],
            ['Stock movements', '120 today']
          ].map(([title, value]) => (
            <div key={title} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] font-semibold text-slate-950 dark:text-white'>{title}</p>
              <p className='mt-1 text-[8px] text-slate-500 dark:text-slate-400'>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  )
}

export function ReplenishmentPreview() {
  const rows = [
    ['Vitamin C Brightening Toner', 'Dhaka Central', '7', '24', 'Glow Supply Co.', 'Review'],
    ['Liquid Lipstick · Cherry Kiss', 'Gulshan', '11', '36', 'Beauty Imports Ltd.', 'Recommended'],
    ['Niacinamide Facial Cream', 'Dhaka Central', '16', '48', 'Careline Trading', 'Recommended'],
    ['Hyaluronic Acid Serum', 'Online', '27', '30', 'The Ordinary BD', 'Covered']
  ] as const

  return (
    <ProductFrame title='Replenishment · NAFS OS' active='Purchasing'>
      <div className='p-4 sm:p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Replenishment</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Review supplier terms, policies and generated recommendations.</p>
          </div>
          <button type='button' className='rounded-md bg-violet-600 px-3 py-2 text-[9px] font-semibold text-white'>Generate recommendations</button>
        </div>

        <div className='mt-4 grid gap-2 sm:grid-cols-3'>
          {[
            ['Supplier terms', '18'],
            ['Active policies', '42'],
            ['Suggested units', '1,284']
          ].map(([label, value]) => (
            <div key={label} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] text-slate-500 dark:text-slate-400'>{label}</p>
              <p className='mt-1 text-lg font-semibold text-slate-950 dark:text-white'>{value}</p>
            </div>
          ))}
        </div>

        <div className='mt-4 flex gap-1 border-b border-slate-200 pb-2 dark:border-white/10'>
          {['Recommendations', 'Policies', 'Supplier terms'].map((item, index) => <span key={item} className={`rounded-md px-2.5 py-1.5 text-[9px] font-semibold ${index === 0 ? 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}>{item}</span>)}
        </div>

        <div className='mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
          <div className='grid grid-cols-[1.45fr_1fr_0.55fr_0.65fr_1.05fr_0.8fr] gap-2 bg-slate-50 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.035] dark:text-slate-400'>
            <span>Variant</span><span>Warehouse</span><span>Available</span><span>Suggested</span><span>Supplier</span><span>Status</span>
          </div>
          {rows.map(row => (
            <div key={row[0]} className='grid grid-cols-[1.45fr_1fr_0.55fr_0.65fr_1.05fr_0.8fr] items-center gap-2 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600 dark:border-white/7 dark:text-slate-300'>
              <span className='truncate font-semibold text-slate-950 dark:text-white'>{row[0]}</span>
              <span className='truncate'>{row[1]}</span>
              <span className='tabular-nums'>{row[2]}</span>
              <span className='font-semibold tabular-nums text-slate-950 dark:text-white'>{row[3]}</span>
              <span className='truncate'>{row[4]}</span>
              <span className={`w-fit rounded-full px-2 py-1 text-[8px] font-semibold ${row[5] === 'Covered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300'}`}>{row[5]}</span>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
            <p className='text-[9px] font-semibold text-slate-950 dark:text-white'>Policy: Min / max</p>
            <div className='mt-3 grid grid-cols-3 gap-2 text-[8px] text-slate-500 dark:text-slate-400'>
              <span>Reorder point<br /><strong className='text-slate-950 dark:text-white'>12</strong></span>
              <span>Safety stock<br /><strong className='text-slate-950 dark:text-white'>8</strong></span>
              <span>Target stock<br /><strong className='text-slate-950 dark:text-white'>48</strong></span>
            </div>
          </div>
          <div className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
            <p className='text-[9px] font-semibold text-slate-950 dark:text-white'>Preferred supplier</p>
            <p className='mt-2 text-[9px] text-slate-500 dark:text-slate-400'>MOQ 12 · Pack size 6 · Lead time 14 days</p>
            <p className='mt-2 text-[10px] font-semibold text-slate-950 dark:text-white'>Unit cost ৳ 740.00</p>
          </div>
        </div>
      </div>
    </ProductFrame>
  )
}

export function CommercePreview() {
  const items = [
    ['Liquid Lipstick', '6 variants', 'Active', 'Online store, POS'],
    ['Niacinamide Facial Cream', '2 variants', 'Active', 'Online store'],
    ['Hyaluronic Acid Serum', '1 variant', 'Draft', 'Not published'],
    ['Brush Set · 6 Piece', '3 variants', 'Active', 'Online store, POS']
  ] as const

  return (
    <ProductFrame title='Products · NAFS OS' active='Products'>
      <div className='p-4 sm:p-5'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Products</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Catalog, variants, collections, categories, brands and channel publishing.</p>
          </div>
          <button type='button' className='rounded-md bg-violet-600 px-3 py-2 text-[9px] font-semibold text-white'>Add product</button>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {[
            ['Products', '1,248'],
            ['Variants', '3,842'],
            ['Collections', '36'],
            ['Reviews', '284']
          ].map(([label, value]) => (
            <div key={label} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] text-slate-500 dark:text-slate-400'>{label}</p>
              <p className='mt-1 text-lg font-semibold text-slate-950 dark:text-white'>{value}</p>
            </div>
          ))}
        </div>

        <div className='mt-4 flex items-center gap-2'>
          <div className='flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 text-[9px] text-slate-400 dark:border-white/10'><SearchIcon className='size-3' />Search products, SKU or barcode…</div>
          <span className='rounded-md border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300'>Filters</span>
        </div>

        <div className='mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
          <div className='grid grid-cols-[1.35fr_0.75fr_0.65fr_1fr] gap-2 bg-slate-50 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.035] dark:text-slate-400'>
            <span>Product</span><span>Variants</span><span>Status</span><span>Channels</span>
          </div>
          {items.map(row => (
            <div key={row[0]} className='grid grid-cols-[1.35fr_0.75fr_0.65fr_1fr] items-center gap-2 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600 dark:border-white/7 dark:text-slate-300'>
              <div className='flex min-w-0 items-center gap-2'>
                <span className='grid size-8 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400 dark:bg-white/7'><ShoppingBagIcon className='size-3.5' /></span>
                <span className='truncate font-semibold text-slate-950 dark:text-white'>{row[0]}</span>
              </div>
              <span>{row[1]}</span>
              <span className={`w-fit rounded-full px-2 py-1 text-[8px] font-semibold ${row[2] === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>{row[2]}</span>
              <span className='truncate'>{row[3]}</span>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-2 sm:grid-cols-3'>
          {[
            ['Sales channels', 'Website, POS and connected channels'],
            ['Customers', 'Profiles, orders, addresses and preferences'],
            ['Online store', 'Theme, home, pages, menus and content']
          ].map(([title, description]) => (
            <div key={title} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] font-semibold text-slate-950 dark:text-white'>{title}</p>
              <p className='mt-1 text-[8px] leading-4 text-slate-500 dark:text-slate-400'>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  )
}

export function AnalyticsPreview() {
  const bars = [42, 55, 48, 66, 58, 72, 68, 78, 71, 82, 76, 91, 84, 98]

  return (
    <ProductFrame title='Analytics · NAFS OS' active='Analytics'>
      <div className='p-4 sm:p-5'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Analytics</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Traffic data from the configured analytics provider.</p>
          </div>
          <div className='flex gap-1'>
            {['7 days', '30 days', 'This month'].map((period, index) => <span key={period} className={`rounded-md px-2.5 py-1.5 text-[8px] font-semibold ${index === 1 ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400'}`}>{period}</span>)}
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {[
            ['Visitors', '42.8K'],
            ['Pageviews', '76.3K'],
            ['Bounce rate', '41.2%'],
            ['Visit duration', '2m 18s']
          ].map(([label, value]) => (
            <div key={label} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] text-slate-500 dark:text-slate-400'>{label}</p>
              <p className='mt-1 text-lg font-semibold text-slate-950 dark:text-white'>{value}</p>
            </div>
          ))}
        </div>

        <div className='mt-4 rounded-lg border border-slate-200 p-3 dark:border-white/10'>
          <div className='flex items-center justify-between text-[9px]'>
            <span className='font-semibold text-slate-950 dark:text-white'>Visitors and pageviews</span>
            <span className='text-slate-400'>30-day range</span>
          </div>
          <div className='mt-4 flex h-32 items-end gap-1.5'>
            {bars.map((height, index) => (
              <div key={index} className='flex flex-1 items-end gap-0.5'>
                <span className='w-1/2 rounded-t bg-violet-500/35' style={{ height: `${height}%` }} />
                <span className='w-1/2 rounded-t bg-orange-400/45' style={{ height: `${Math.max(20, height - 12)}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
          {[
            ['Top sources', ['Google · 18.2K', 'Direct · 12.4K', 'Facebook · 6.8K']],
            ['Top pages', ['/collections/skincare', '/products/sunscreen', '/collections/makeup']]
          ].map(([title, rows]) => (
            <div key={String(title)} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <p className='text-[9px] font-semibold text-slate-950 dark:text-white'>{title}</p>
              <div className='mt-2 space-y-2'>
                {(rows as string[]).map((row, index) => (
                  <div key={row} className='flex items-center justify-between text-[8px] text-slate-500 dark:text-slate-400'>
                    <span className='truncate'>{row}</span>
                    <span className='ml-3 font-semibold text-slate-950 dark:text-white'>{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  )
}

export function AccessPreview() {
  const rows = [
    ['Operations manager', 'Orders, inventory, fulfillment, returns', '8 staff'],
    ['Warehouse operator', 'Inventory, fulfillment, printing', '14 staff'],
    ['Customer care', 'Orders, customers, returns, payments', '20 staff'],
    ['Finance reviewer', 'Payments, COD settlements, reports', '4 staff']
  ] as const

  return (
    <ProductFrame title='Roles & permissions · NAFS OS' active='Settings'>
      <div className='p-4 sm:p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-slate-950 dark:text-white'>Roles & permissions</p>
            <p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>Give each team access to the work it owns.</p>
          </div>
          <button type='button' className='rounded-md bg-violet-600 px-3 py-2 text-[9px] font-semibold text-white'>Create role</button>
        </div>

        <div className='mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
          <div className='grid grid-cols-[1fr_1.7fr_0.65fr] gap-2 bg-slate-50 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.035] dark:text-slate-400'>
            <span>Role</span><span>Access</span><span>Members</span>
          </div>
          {rows.map(row => (
            <div key={row[0]} className='grid grid-cols-[1fr_1.7fr_0.65fr] items-center gap-2 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600 dark:border-white/7 dark:text-slate-300'>
              <span className='font-semibold text-slate-950 dark:text-white'>{row[0]}</span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-3 sm:grid-cols-3'>
          {[
            ['Workspaces', 'Separate business and team contexts'],
            ['Audit', 'Review access and operational changes'],
            ['Settings', 'Configure providers and product behaviour']
          ].map(([title, description]) => (
            <div key={title} className='rounded-lg border border-slate-200 p-3 dark:border-white/10'>
              <span className='grid size-7 place-items-center rounded-md bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300'><CheckIcon className='size-3.5' /></span>
              <p className='mt-3 text-[9px] font-semibold text-slate-950 dark:text-white'>{title}</p>
              <p className='mt-1 text-[8px] leading-4 text-slate-500 dark:text-slate-400'>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  )
}
