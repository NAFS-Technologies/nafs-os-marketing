export type DemoKind = 'orders' | 'inventory' | 'fulfillment' | 'settlements'
export type DemoRow = { id: string; cells: readonly string[]; note: string }
export type DemoScene = { label: string; title: string; description: string; columns: readonly string[]; rows: readonly DemoRow[] }

// Synthetic examples only. Never substitute production customer records here.
export const demoScenes: Record<DemoKind, DemoScene> = {
  orders: {
    label: 'Orders', title: 'Every order. Its next step.',
    description: 'Review the customer, order state and next action together.',
    columns: ['Order', 'Customer', 'Items', 'State', 'Order total'],
    rows: [
      { id: '#10482', cells: ['Sample customer A', '2 items', 'Confirmed', '৳2,480'], note: 'This confirmed sample order has available stock. The next warehouse task is picking; stock is reserved when the pick is recorded.' },
      { id: '#10483', cells: ['Sample customer B', '3 items', 'On hold', '৳3,960'], note: 'An auditable hold pauses downstream fulfillment. An operator reviews the reason before resuming this sample order.' },
      { id: '#10484', cells: ['Sample customer C', '1 item', 'Confirmed', '৳1,740'], note: 'Order, payment and shipment states remain separate. A confirmed order alone does not mean a parcel has shipped or money has settled.' }
    ]
  },
  inventory: {
    label: 'Inventory', title: 'Stock, with the context.',
    description: 'Keep location, available quantity and committed units distinct.',
    columns: ['SKU', 'Product', 'Location', 'Available', 'Committed'],
    rows: [
      { id: 'DEMO-001', cells: ['Everyday serum', 'Demo warehouse', '42', '8'], note: 'Available and committed quantities represent different facts. Review movements before making an adjustment.' },
      { id: 'DEMO-002', cells: ['Daily cleanser', 'Demo warehouse', '18', '4'], note: 'Supplier terms and replenishment policies give purchasing context beyond a single stock number.' },
      { id: 'DEMO-003', cells: ['Travel set', 'Demo store', '0', '2'], note: 'A stock shortage is an exception, not a completed task. Replenishment can change which orders are ready to pick.' }
    ]
  },
  fulfillment: {
    label: 'Fulfillment', title: 'A clear queue for the warehouse.',
    description: 'To pick → To pack → To ship → Shipped, with exceptions kept visible.',
    columns: ['Order', 'Warehouse', 'Items', 'Work view', 'Delivery'],
    rows: [
      { id: '#10482', cells: ['Demo warehouse', '2 items', 'To pick', 'Not booked'], note: 'Available stock places the confirmed order in To pick. Picking records actual quantities and reserves stock together.' },
      { id: '#10485', cells: ['Demo warehouse', '1 item', 'To pack', 'Not booked'], note: 'A fully picked order is ready for packing. The package still needs its own completed work before dispatch review.' },
      { id: '#10486', cells: ['Demo warehouse', '4 items', 'To ship', 'Review required'], note: 'To ship is not proof of courier readiness. Address, package scope, pickup configuration and provider credentials need review before booking.' }
    ]
  },
  settlements: {
    label: 'COD settlements', title: 'Know what still needs to close.',
    description: 'Compare expected collections, reported money and unresolved differences.',
    columns: ['Statement', 'Expected', 'Reported', 'Difference', 'Review'],
    rows: [
      { id: 'COD-021', cells: ['৳12,400', '৳12,400', '৳0', 'Matched'], note: 'The sample amounts match. Finalization remains a separate reviewed action, not something this demonstration performs.' },
      { id: 'COD-022', cells: ['৳8,200', '৳7,950', '৳250', 'Needs review'], note: 'The ৳250 difference needs an explanation. Review the relevant orders and settlement evidence before making a decision.' },
      { id: 'COD-023', cells: ['৳5,100', 'Not reported', 'Unknown', 'Awaiting report'], note: 'Missing reported money is unknown, not zero. This example deliberately avoids calculating a misleading difference.' }
    ]
  }
}

export function filterDemoRows(kind: DemoKind, query: string) {
  const search = query.trim().toLocaleLowerCase('en')

  return demoScenes[kind].rows.filter(row => !search || [row.id, ...row.cells].join(' ').toLocaleLowerCase('en').includes(search))
}
