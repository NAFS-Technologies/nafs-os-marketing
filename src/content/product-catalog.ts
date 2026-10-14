export type ProductStatus = 'Guided rollout' | 'In development'
export type PreviewKind = 'orders' | 'inventory' | 'fulfillment' | 'settlements'

export type Product = {
  slug: string
  name: string
  role: string
  headline: string
  description: string
  status: ProductStatus
  availability: string
  capabilities: readonly string[]
  outcomes: readonly [string, string][]
  preview?: PreviewKind
}

export const products: readonly Product[] = [
  {
    slug: 'os', name: 'NAFS OS', role: 'Commerce operations',
    headline: 'Run the business behind every sale.',
    description: 'Keep orders, products, stock, fulfillment, purchasing and payments connected. Give every team the context to finish the job.',
    status: 'Guided rollout',
    availability: 'Core workflows are implemented. We verify your data, permissions, providers and operating process before a production rollout.',
    capabilities: ['Orders', 'Inventory', 'Fulfillment', 'Purchasing', 'Returns & exchanges', 'Payments & COD', 'Reporting', 'POS'],
    outcomes: [['One order, one history', 'Keep the customer, items, shipment and financial history together.'], ['Stock you can explain', 'Separate available, committed and received quantities, with a history of changes.'], ['Clear warehouse work', 'Work through To pick, To pack, To ship, Shipped and Exceptions.'], ['Close the money loop', 'Compare expected collections with reported settlements and investigate differences.']],
    preview: 'orders'
  },
  {
    slug: 'storefront', name: 'NAFS Storefront', role: 'Your customer experience',
    headline: 'A storefront connected to the work behind it.',
    description: 'Bring product discovery, cart, checkout and customer accounts together with your commerce operation.',
    status: 'Guided rollout', availability: 'The shopper application is independently deployed. Your catalog, checkout, content and payment configuration need rollout verification.',
    capabilities: ['Catalog', 'Search', 'Cart & checkout', 'Customer accounts', 'Published content'],
    outcomes: [['Connected catalog', 'Manage the products, prices and inventory that power shopping.'], ['Your content', 'Keep editorial publishing separate from orders and money.'], ['One customer journey', 'Connect discovery, checkout and account history.']]
  },
  {
    slug: 'courier', name: 'NAFS Courier', role: 'Delivery operations',
    headline: 'Dispatch the parcel. Keep the context.',
    description: 'Keep courier booking, shipment updates and delivery follow-up beside the original order.',
    status: 'Guided rollout', availability: 'Pathao is the implemented provider. Credentials, pickup location and live booking/recovery must be verified for each business. Other couriers are not advertised as live.',
    capabilities: ['Pathao booking', 'Shipment updates', 'Dispatch review', 'Booking recovery'],
    outcomes: [['Review before dispatch', 'Check address and package details before committing a booking.'], ['Handle uncertainty', 'Review an unknown booking result before trying again.'], ['Follow the shipment', 'Keep delivery updates linked to the order.']], preview: 'fulfillment'
  },
  {
    slug: 'flow', name: 'NAFS Flow', role: 'Workflow automation',
    headline: 'Repeat the process. Not the manual work.',
    description: 'A planned workspace for repeatable business workflows, approvals and a clear run history.',
    status: 'In development', availability: 'This product is in development, not a generally available automation service. Discuss a specific workflow before committing to a rollout.',
    capabilities: ['Workflow design', 'Approvals', 'Connection actions', 'Run history'],
    outcomes: [['Make work repeatable', 'Define the event, decision and next action for a recurring process.'], ['Keep people involved', 'Plan approvals where the business needs a decision.'], ['Understand each run', 'Design for visible progress and recovery.']]
  },
  {
    slug: 'mobile', name: 'NAFS Mobile', role: 'Work on the move',
    headline: 'The next task, wherever the work happens.',
    description: 'An in-development mobile experience for warehouse tasks, scanning, receiving and approvals.',
    status: 'In development', availability: 'Mobile delivery, device support and offline behavior are not release commitments. Confirm the roadmap with us.',
    capabilities: ['Task queues', 'Scanning', 'Receiving', 'Approvals'],
    outcomes: [['Task-first design', 'Focus on the item and action in front of the operator.'], ['Connected work', 'Plan mobile tasks around the same commerce records.'], ['Purposeful access', 'Keep each person within the work they are allowed to do.']]
  },
  {
    slug: 'shopping', name: 'NAFS Shopping', role: 'Branded shopping app',
    headline: 'Your brand. A connected shopping app.',
    description: 'A planned native shopping channel connected to your products, checkout and customer accounts.',
    status: 'In development', availability: 'Native app delivery and app-store availability are not yet promised. Branding and launch scope require a separate agreement.',
    capabilities: ['Branded experience', 'Product discovery', 'Checkout', 'Customer accounts'],
    outcomes: [['Keep your identity', 'Plan the shopping experience around your brand.'], ['Shared commerce', 'Avoid a separate back office for the app.'], ['Connected accounts', 'Design customer history around the same operation.']]
  },
  {
    slug: 'platform', name: 'NAFS Platform', role: 'For agencies and resellers',
    headline: 'Build a commerce offering for your clients.',
    description: 'Explore branded client onboarding, plans, domains and subscriptions around NAFS.',
    status: 'In development', availability: 'The partner platform has a separate release boundary. Branding rights, domain support, subscriptions and commercial terms must be agreed before launch.',
    capabilities: ['Client businesses', 'Branding', 'Plans', 'Domains', 'Subscriptions'],
    outcomes: [['Organize clients', 'Keep client businesses and responsibilities distinct.'], ['Define your offer', 'Agree software, implementation and service scope.'], ['Plan recurring work', 'Design onboarding and support around an approved commercial agreement.']]
  },
  {
    slug: 'partners', name: 'NAFS Partners', role: 'Partner growth',
    headline: 'Grow through the value you help create.',
    description: 'Explore referral, implementation and reseller relationships with NAFS.',
    status: 'In development', availability: 'Partner tracking and commission products are in development. No universal commission, guaranteed income or reseller margin is advertised.',
    capabilities: ['Referrals', 'Programs', 'Attribution', 'Commissions'],
    outcomes: [['Find the right fit', 'Introduce businesses with a clear operational need.'], ['Deliver services', 'Discuss migration, implementation and training work.'], ['Agree the terms', 'Define eligibility, responsibilities and payment terms in writing.']]
  }
]

export const solutions = [
  { id: 'orders', title: 'Orders & fulfillment', headline: 'From confirmed order to a parcel ready to leave.', problem: 'Orders arrive from several places. The next step lives in someone’s memory.', outcome: 'Give operations and warehouse teams a shared path through picking, packing, dispatch and exceptions.', modules: ['Orders', 'Fulfillment', 'Shipments', 'Returns'], preview: 'fulfillment' as PreviewKind, steps: ['Review the order and its current state.', 'Pick available stock and record actual quantities.', 'Pack, review the delivery details and book the parcel.', 'Follow shipment updates and resolve exceptions.'] },
  { id: 'inventory', title: 'Inventory control', headline: 'Know what is available. Understand what changed.', problem: 'Website stock, warehouse stock and spreadsheets tell different stories.', outcome: 'Bring location-level stock, movements and operational context into one place.', modules: ['Products', 'Inventory', 'Warehouses', 'Stock counts'], preview: 'inventory' as PreviewKind, steps: ['Find the product and warehouse.', 'Review available and committed stock separately.', 'Record transfers, adjustments and counts.', 'Use the history to explain a quantity change.'] },
  { id: 'purchasing', title: 'Purchasing & replenishment', headline: 'Buy with context, not just urgency.', problem: 'Buying starts after a stockout, or too much cash is tied up in the wrong items.', outcome: 'Use supplier terms, lead times and stock policies to prepare the next purchase.', modules: ['Purchasing', 'Suppliers', 'Replenishment', 'Inventory'], preview: 'inventory' as PreviewKind, steps: ['Review supplier costs, pack sizes and lead times.', 'Review replenishment recommendations.', 'Create and approve the purchase order.', 'Receive actual quantities into the right location.'] },
  { id: 'money', title: 'Payments & COD', headline: 'Delivery is not the end. Settlement closes the loop.', problem: 'Courier collections and payment follow-up become a second operation in spreadsheets.', outcome: 'Keep expected collections, reported money and unresolved differences connected to the sale.', modules: ['Payments', 'COD settlements', 'Orders', 'Reports'], preview: 'settlements' as PreviewKind, steps: ['Review expected collections.', 'Compare reported settlement amounts.', 'Investigate differences with order context.', 'Finalize only after the relevant checks.'] },
  { id: 'management', title: 'Reporting & visibility', headline: 'Find the work that needs a decision.', problem: 'Management waits for someone to combine exports before understanding the day.', outcome: 'Read operational reports with their filters, scope and freshness visible.', modules: ['Analytics', 'Reports', 'Paid media', 'Activity history'], preview: 'orders' as PreviewKind, steps: ['Choose the reporting scope.', 'Review trends and operational exceptions.', 'Open the underlying records.', 'Export the complete filtered result when needed.'] },
  { id: 'team', title: 'Teams & access', headline: 'A consistent process, without one person knowing everything.', problem: 'Work depends on a few people remembering every exception and workaround.', outcome: 'Give people clear roles, permissions and records of important changes.', modules: ['Workspaces', 'Staff', 'Roles', 'Permissions'], preview: 'orders' as PreviewKind, steps: ['Set up the business and its teams.', 'Grant the permissions each role needs.', 'Keep work and decisions in their proper context.', 'Review important changes through activity history.'] }
] as const

export const useCases = [
  { slug: 'multi-brand-retail', title: 'Multi-brand retail', lead: 'For teams handling large catalogs, variants and many suppliers.', painPoints: ['Catalog complexity', 'Supplier coordination', 'Stock movement'], solution: 'Connect the product catalog to buying, stock, fulfillment and customer history.', modules: ['Products', 'Purchasing', 'Inventory'], solutionId: 'inventory' },
  { slug: 'd2c-commerce', title: 'D2C commerce', lead: 'For growing brands that need the operation to keep up with sales.', painPoints: ['Campaign spikes', 'Warehouse handoffs', 'Returns'], solution: 'Keep orders, stock, fulfillment and returns in the same operating flow.', modules: ['Orders', 'Fulfillment', 'Returns'], solutionId: 'orders' },
  { slug: 'social-plus-website', title: 'Website & social sales', lead: 'For businesses selling through different channels from shared stock.', painPoints: ['Separate order sources', 'Repeated customer checks', 'Stock uncertainty'], solution: 'Plan assisted sales and verified channel connections around one commerce operation.', modules: ['Orders', 'Customers', 'Sales channels'], solutionId: 'orders' },
  { slug: 'cod-heavy-business', title: 'COD-heavy ecommerce', lead: 'For businesses where the parcel arrives before the money is settled.', painPoints: ['Courier follow-up', 'Unsettled collections', 'Failed deliveries'], solution: 'Keep delivery, expected collections and settlement review connected.', modules: ['Fulfillment', 'Payments', 'COD settlements'], solutionId: 'money' },
  { slug: 'multi-location', title: 'Multi-location inventory', lead: 'For businesses holding stock across warehouses or stores.', painPoints: ['Stock by location', 'Transfers', 'Allocation decisions'], solution: 'See where stock is held, how it moved and which location can fulfill an order.', modules: ['Inventory', 'Warehouses', 'Transfers'], solutionId: 'inventory' }
] as const

export const integrations = [
  { name: 'Pathao', category: 'Delivery', status: 'Guided setup', detail: 'Implemented courier provider. Verify credentials, pickup, booking, updates and recovery for your business.' },
  { name: 'WooCommerce', category: 'Commerce', status: 'Guided setup', detail: 'Managed approval path without copying API keys. Mappings and live order flows need store-specific verification.' },
  { name: 'Shopify', category: 'Commerce', status: 'Guided setup', detail: 'Connection path exists. Configure and verify the required business mappings before moving live data.' },
  { name: 'Daraz', category: 'Commerce', status: 'Planned', detail: 'Not advertised as live. Orders, returns and recovery need complete acceptance first.' },
  { name: 'RedX', category: 'Delivery', status: 'Planned', detail: 'Not currently advertised as an implemented courier provider.' },
  { name: 'Steadfast', category: 'Delivery', status: 'Planned', detail: 'Not currently advertised as an implemented courier provider.' },
  { name: 'Other business tools', category: 'Business tools', status: 'Scope review', detail: 'Nango manages external authorization. Access to its API catalog does not mean NAFS has implemented every business mapping.' }
] as const

export const navigation = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/blog' },
  { label: 'Partners', href: '/partners' }
] as const

export const getProduct = (slug: string) => products.find(product => product.slug === slug)
export const getSolution = (slug: string) => solutions.find(solution => solution.id === slug)
