const orders = [
  { id: '#10482', customer: 'Nusrat Jahan', stock: 'Reserved', progress: 'Picking', delivery: 'Waiting', payment: 'COD', active: true },
  { id: '#10481', customer: 'Raisa Ahmed', stock: 'Reserved', progress: 'Packed', delivery: 'Pathao', payment: 'COD', active: false },
  { id: '#10479', customer: 'Tahmina Noor', stock: 'Reserved', progress: 'Dispatched', delivery: 'In transit', payment: 'Paid', active: false },
  { id: '#10477', customer: 'Farzana Akter', stock: 'Review', progress: 'Needs attention', delivery: '—', payment: 'COD', active: false }
] as const

const liveActivity = [
  ['10:42', 'New order confirmed', true],
  ['10:42', '2 units reserved', false],
  ['10:43', 'Picking task assigned', false],
  ['10:44', 'Courier quote ready', false],
  ['10:44', 'COD follow-up opened', false]
] as const

function Dot({ active = false }: { active?: boolean }) {
  return <span className={active ? 'pristine-live size-1.5 rounded-full bg-violet-500' : 'size-1.5 rounded-full bg-[#cfcfcd]'} />
}

export function PristineHeroScene() {
  return (
    <div className='relative mx-auto mt-12 max-w-[1320px] overflow-hidden rounded-t-[24px] border-x border-t border-[#e7e7e4] bg-white shadow-[0_-16px_80px_rgba(0,0,0,0.04)] sm:mt-16 sm:rounded-t-[28px]'>
      <div className='grid lg:grid-cols-[190px_1fr_280px]'>
        <aside className='hidden border-r border-[#ececea] px-5 py-6 lg:block'>
          <div className='text-[11px] font-semibold tracking-[-0.02em] text-[#171717]'>NAFS / OPERATIONS</div>
          <div className='mt-8 space-y-0.5 text-[11px] text-[#888884]'>
            {['Overview', 'Orders', 'Inventory', 'Fulfillment', 'Purchasing', 'Payments', 'Analytics'].map((item, index) => (
              <div key={item} className={index === 1 ? 'border-l border-[#171717] py-2 pl-3 text-[#171717]' : 'border-l border-transparent py-2 pl-3'}>{item}</div>
            ))}
          </div>
          <div className='mt-16 border-t border-[#ececea] pt-4 text-[10px] leading-5 text-[#9a9a96]'>
            Dhaka Central<br />All sales channels<br />Live operation
          </div>
        </aside>

        <div className='min-w-0 px-4 py-6 sm:px-7 sm:py-8 lg:px-9'>
          <div className='border-b border-[#ececea] pb-6'>
            <p className='text-[11px] text-[#999995]'>Today</p>
            <div className='mt-1 flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
              <h3 className='text-2xl font-medium tracking-[-0.04em] text-[#111]'>Your operation at a glance</h3>
              <div className='grid grid-cols-3 gap-4 text-left sm:flex sm:gap-10 sm:text-right'>
                <div><p className='text-[10px] uppercase tracking-[0.12em] text-[#aaa]'>Orders</p><p className='mt-1 text-base font-medium tabular-nums'>1,248</p></div>
                <div><p className='text-[10px] uppercase tracking-[0.12em] text-[#aaa]'>Revenue</p><p className='mt-1 text-base font-medium tabular-nums'>৳14.2M</p></div>
                <div><p className='text-[10px] uppercase tracking-[0.12em] text-[#aaa]'>Attention</p><p className='mt-1 text-base font-medium tabular-nums'>17</p></div>
              </div>
            </div>
          </div>

          <div className='mt-6 space-y-3 sm:hidden'>
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className={order.active ? 'rounded-2xl border border-violet-200 bg-violet-50/45 p-4' : 'rounded-2xl border border-[#e8e8e4] bg-[#fafaf8] p-4'}>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold text-[#171717]'>{order.id}</p>
                    <p className='mt-1 text-sm text-[#71716c]'>{order.customer}</p>
                  </div>
                  <span className={order.active ? 'rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800' : 'rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#71716c] ring-1 ring-black/5'}>{order.progress}</span>
                </div>
                <div className='mt-4 grid grid-cols-3 gap-3 border-t border-[#e7e7e3] pt-3 text-xs'>
                  <div><p className='text-[#999995]'>Stock</p><p className='mt-1 font-medium text-[#44443f]'>{order.stock}</p></div>
                  <div><p className='text-[#999995]'>Delivery</p><p className='mt-1 font-medium text-[#44443f]'>{order.delivery}</p></div>
                  <div><p className='text-[#999995]'>Payment</p><p className='mt-1 font-medium text-[#44443f]'>{order.payment}</p></div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-7 hidden sm:block'>
            <div className='grid grid-cols-[0.75fr_1.2fr_0.85fr_1fr_0.95fr_0.65fr] border-b border-[#ececea] pb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#aaa]'>
              <span>Order</span><span>Customer</span><span>Stock</span><span>Fulfillment</span><span>Delivery</span><span>Payment</span>
            </div>
            {orders.map((order, index) => (
              <div key={order.id} className='grid grid-cols-[0.75fr_1.2fr_0.85fr_1fr_0.95fr_0.65fr] items-center border-b border-[#f0f0ee] py-4 text-xs text-[#686864] lg:text-[13px]'>
                <span className='font-medium text-[#171717]'>{order.id}</span>
                <span>{order.customer}</span>
                <span className={index === 3 ? 'text-amber-700' : ''}>{order.stock}</span>
                <span className={index === 0 ? 'font-medium text-violet-700' : index === 3 ? 'text-amber-700' : ''}>{order.progress}</span>
                <span>{order.delivery}</span>
                <span>{order.payment}</span>
              </div>
            ))}
          </div>

          <div className='mt-8 grid border-y border-[#ececea] sm:mt-10 sm:grid-cols-3'>
            {[
              ['Inventory', '38,402 units', '86 products running low'],
              ['Delivery', '142 in transit', 'Pathao connected'],
              ['COD', '৳1.8M open', 'Waiting to be matched']
            ].map(([label, value, note], index) => (
              <div key={label} className={index < 2 ? 'border-b border-[#ececea] px-1 py-5 sm:border-b-0 sm:border-r sm:px-5' : 'px-1 py-5 sm:px-5'}>
                <p className='text-[10px] uppercase tracking-[0.1em] text-[#aaa]'>{label}</p>
                <p className='mt-2 text-base font-medium tracking-[-0.02em] text-[#171717]'>{value}</p>
                <p className='mt-1 text-xs text-[#999995]'>{note}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className='hidden border-l border-[#ececea] px-6 py-7 lg:block'>
          <p className='text-[10px] uppercase tracking-[0.1em] text-[#aaa]'>Live activity</p>
          <div className='mt-5'>
            {liveActivity.map(([time, event, active]) => (
              <div key={`${time}-${event}`} className='grid grid-cols-[46px_10px_1fr] items-center border-b border-[#f0f0ee] py-3 text-[11px]'>
                <span className='font-mono text-[#b0b0ac]'>{time}</span><Dot active={Boolean(active)} /><span className='truncate text-[#6f6f6b]'>{event}</span>
              </div>
            ))}
          </div>
          <div className='mt-12 border-t border-[#ececea] pt-4'>
            <p className='text-[10px] uppercase tracking-[0.1em] text-[#aaa]'>Next action</p>
            <p className='mt-2 text-sm font-medium text-[#171717]'>18 orders ready for picking</p>
            <p className='mt-2 text-xs leading-5 text-[#999995]'>Stock is reserved and the warehouse can start.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
