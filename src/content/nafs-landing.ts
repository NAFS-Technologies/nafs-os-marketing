export const siteNavigation = [
  { label: 'Platform', href: '/products' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'B2B', href: '/b2b' },
  { label: 'Partners', href: '/partners' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' }
] as const

export const productEcosystem = [
  {
    slug: 'os',
    name: 'NAFS OS',
    role: 'Run your commerce operation',
    status: 'Available now',
    description: 'Manage products, orders, customers, stock, fulfillment, purchasing, payments and reporting from one connected workspace.',
    capabilities: ['Orders', 'Inventory', 'Fulfillment', 'Purchasing', 'Payments', 'Analytics'],
    href: '/products/os'
  },
  {
    slug: 'storefront',
    name: 'NAFS Storefront',
    role: 'Sell through your own website',
    status: 'Available now',
    description: 'Give customers a fast shopping experience with catalog, search, cart, checkout, accounts and content connected directly to NAFS.',
    capabilities: ['Catalog', 'Search', 'Checkout', 'Accounts'],
    href: '/products/storefront'
  },
  {
    slug: 'flow',
    name: 'NAFS Flow',
    role: 'Automate repetitive work',
    status: 'In development',
    description: 'Build repeatable automations across NAFS and connected tools, with approvals and a clear history of every run.',
    capabilities: ['Workflows', 'Connections', 'Approvals', 'Run history'],
    href: '/products/flow'
  },
  {
    slug: 'mobile',
    name: 'NAFS Mobile',
    role: 'Keep teams moving from anywhere',
    status: 'In development',
    description: 'Put picking, scanning, receiving, returns, approvals and the day’s most important tasks in your team’s hands.',
    capabilities: ['Task queues', 'Scanning', 'Receiving', 'Approvals'],
    href: '/products/mobile'
  },
  {
    slug: 'shopping',
    name: 'NAFS Shopping',
    role: 'Launch your branded shopping app',
    status: 'In development',
    description: 'Offer customers a native mobile shopping experience under your brand without rebuilding products, checkout and accounts.',
    capabilities: ['Mobile shopping', 'Checkout', 'Your branding', 'Accounts'],
    href: '/products/shopping'
  },
  {
    slug: 'courier',
    name: 'NAFS Courier',
    role: 'Manage delivery in one place',
    status: 'Pathao available',
    description: 'Get delivery quotes, book parcels and follow shipment updates without moving between separate courier dashboards.',
    capabilities: ['Quotes', 'Booking', 'Tracking', 'Delivery updates'],
    href: '/products/courier'
  },
  {
    slug: 'partners',
    name: 'NAFS Partners',
    role: 'Grow through referrals and partners',
    status: 'In development',
    description: 'Run referral links, partner programs, attribution and commissions from a dedicated partner workspace.',
    capabilities: ['Referral links', 'Attribution', 'Programs', 'Commissions'],
    href: '/products/partners'
  },
  {
    slug: 'platform',
    name: 'NAFS Platform',
    role: 'Build a commerce software business',
    status: 'In development',
    description: 'Launch NAFS under your brand, create plans, onboard client businesses, connect custom domains and manage subscriptions.',
    capabilities: ['Client businesses', 'Plans', 'Branding', 'Domains'],
    href: '/products/platform'
  }
] as const

export const capabilityGroups = [
  {
    title: 'Sell',
    description: 'Everything customers need to discover products and place an order.',
    capabilities: ['Catalog', 'Pricing', 'Discounts', 'Checkout', 'POS', 'Storefront', 'Customers', 'Payments']
  },
  {
    title: 'Operate',
    description: 'Everything your team needs to move orders, stock and money.',
    capabilities: ['Orders', 'Inventory', 'Warehouses', 'Fulfillment', 'Returns', 'Purchasing', 'Suppliers', 'Replenishment']
  },
  {
    title: 'Grow',
    description: 'Understand performance, reach customers and recover missed sales.',
    capabilities: ['Analytics', 'Reports', 'Reviews', 'Messaging', 'Boosting', 'Abandoned checkout', 'AI Studio', 'Sales Agent']
  },
  {
    title: 'Stay in control',
    description: 'Give every team the right access, responsibilities and visibility.',
    capabilities: ['Organizations', 'Workspaces', 'Staff', 'Roles', 'Permissions', 'Activity history', 'Bulk operations', 'Settings']
  }
] as const

export const ecosystemJourney = [
  {
    step: '01',
    event: 'A customer places an order',
    action: 'Your website, shopping app and assisted sales channels can feed one commerce operation instead of creating separate back offices.',
    surfaces: ['Storefront', 'Shopping', 'POS']
  },
  {
    step: '02',
    event: 'The sale reaches NAFS',
    action: 'The customer, products, price, payment and delivery details stay together from the start.',
    surfaces: ['Orders', 'Customers', 'Payments']
  },
  {
    step: '03',
    event: 'The next task becomes clear',
    action: 'Inventory and fulfillment views show what can move, what is blocked and what needs attention.',
    surfaces: ['Inventory', 'Warehouses', 'Fulfillment']
  },
  {
    step: '04',
    event: 'The team works from anywhere',
    action: 'NAFS Mobile brings picking, scanning, receiving, approvals and urgent tasks to the people doing the work.',
    surfaces: ['NAFS Mobile']
  },
  {
    step: '05',
    event: 'The parcel goes out for delivery',
    action: 'NAFS Courier keeps quotes, booking, tracking and delivery updates together. Pathao is the currently available provider.',
    surfaces: ['NAFS Courier']
  },
  {
    step: '06',
    event: 'Automation handles the follow-up',
    action: 'NAFS Flow can turn important business events into repeatable actions, approvals and notifications.',
    surfaces: ['NAFS Flow']
  },
  {
    step: '07',
    event: 'Management sees the result',
    action: 'Reports bring sales, delivery, returns, payments and activity together without manually combining exports.',
    surfaces: ['Analytics', 'Reports', 'Activity history']
  }
] as const

export const painPoints = [
  {
    question: 'Do you check three places before you know whether an order can ship?',
    detail: 'Orders, stock, warehouse work and delivery should not depend on someone reconciling tabs by hand.'
  },
  {
    question: 'Does your stock number change depending on who you ask?',
    detail: 'Keep every movement, transfer, adjustment and count connected to the product and location it changed.'
  },
  {
    question: 'Are courier follow-ups and COD settlements living in spreadsheets?',
    detail: 'Keep delivery, payments and COD follow-up visible beside the order instead of hiding the work in notes and sheets.'
  },
  {
    question: 'Are you buying inventory too late—or buying too much?',
    detail: 'Use current stock, supplier terms and lead times to make better purchasing decisions before a shortage becomes urgent.'
  }
] as const

export const connectedJourney = [
  {
    step: '01',
    event: 'A customer places an order',
    action: 'Customer, product, payment and delivery details arrive together.',
    modules: ['Orders', 'Customers']
  },
  {
    step: '02',
    event: 'The order needs stock',
    action: 'The team can see what is available and which location should fulfill it.',
    modules: ['Inventory', 'Warehouses']
  },
  {
    step: '03',
    event: 'The warehouse gets clear work',
    action: 'Ready orders move through allocation, picking and packing with the information already attached.',
    modules: ['Fulfillment', 'Inventory']
  },
  {
    step: '04',
    event: 'The parcel is ready to leave',
    action: 'Booking and shipment updates stay connected to the order instead of moving into another spreadsheet.',
    modules: ['Fulfillment', 'Shipments']
  },
  {
    step: '05',
    event: 'The money still needs to close',
    action: 'Payments and COD settlements remain visible after delivery until the expected amount is matched.',
    modules: ['Payments', 'COD settlements']
  },
  {
    step: '06',
    event: 'Management needs an answer',
    action: 'Sales, delivery, returns and settlement reports provide a current view without manually combining files.',
    modules: ['Analytics', 'Reports']
  }
] as const

export const solutionCards = [
  {
    id: 'orders',
    title: 'Move every order from confirmation to delivery',
    problem: 'Orders arrive, but the next step depends on chats, calls or one person remembering what to do.',
    outcome: 'Give operations and warehouse teams one clear path from confirmed order to shipment.',
    modules: ['Orders', 'Fulfillment', 'Shipments', 'Returns']
  },
  {
    id: 'inventory',
    title: 'Make stock trustworthy again',
    problem: 'Website stock, warehouse stock and spreadsheet stock do not agree.',
    outcome: 'See what is available, what is committed and exactly why the quantity changed.',
    modules: ['Products', 'Inventory', 'Warehouses', 'Stock counts']
  },
  {
    id: 'purchasing',
    title: 'Buy before a shortage becomes urgent',
    problem: 'Purchasing starts after a stockout—or too much cash gets locked in slow inventory.',
    outcome: 'Bring stock, supplier terms and lead times together so buyers can act earlier and with more confidence.',
    modules: ['Purchasing', 'Suppliers', 'Replenishment', 'Inventory']
  },
  {
    id: 'money',
    title: 'Know what has been paid, collected and settled',
    problem: 'COD and payment follow-up becomes a second operation outside the order system.',
    outcome: 'Keep payments, courier collections and settlements connected to the original sale.',
    modules: ['Payments', 'COD settlements', 'Orders', 'Reports']
  },
  {
    id: 'management',
    title: 'See where the business needs attention',
    problem: 'Management gets yesterday’s answer after someone exports and combines several reports.',
    outcome: 'See sales, delivery, returns, payments and exceptions from the same current information.',
    modules: ['Analytics', 'Reports', 'Activity history']
  },
  {
    id: 'team',
    title: 'Make the process work without one person knowing everything',
    problem: 'Daily work depends on specific staff members knowing every workaround.',
    outcome: 'Give teams clear responsibilities, access and next steps so work stays consistent as the business changes.',
    modules: ['Workspaces', 'Staff', 'Roles', 'Permissions']
  }
] as const

export const useCases = [
  {
    slug: 'multi-brand-retail',
    title: 'Multi-brand retail',
    lead: 'For businesses managing thousands of products, variants and suppliers.',
    painPoints: ['Large catalogs', 'Frequent stock movement', 'Multiple suppliers', 'Returns and exchanges', 'Several teams touching the same order'],
    solution: 'NAFS connects products, stock, purchasing, fulfillment and customer history so every team works from the same information.',
    modules: ['Products', 'Inventory', 'Warehouses', 'Purchasing', 'Fulfillment', 'Customers']
  },
  {
    slug: 'd2c-commerce',
    title: 'D2C commerce',
    lead: 'For growing brands that need to handle more orders without multiplying admin work.',
    painPoints: ['Fast order growth', 'Campaign spikes', 'Returns', 'Customer follow-up', 'Management visibility'],
    solution: 'Keep orders, stock, fulfillment, returns, payments and reporting connected so growth does not require the same growth in manual coordination.',
    modules: ['Orders', 'Inventory', 'Fulfillment', 'Returns', 'Payments', 'Analytics']
  },
  {
    slug: 'social-plus-website',
    title: 'Website and social sales',
    lead: 'For teams selling through several channels while fulfilling from the same stock.',
    painPoints: ['Orders from different sources', 'Duplicate customer details', 'Manual stock checks', 'Staff coordination', 'Inconsistent fulfillment'],
    solution: 'Bring orders, customers, stock and fulfillment into one operation instead of running a separate back office for every sales source.',
    modules: ['Orders', 'Sales channels', 'Customers', 'Inventory', 'Fulfillment']
  },
  {
    slug: 'cod-heavy-business',
    title: 'COD-heavy ecommerce',
    lead: 'For businesses where delivery is only half the job and settlement closes later.',
    painPoints: ['Courier handoff', 'COD collection tracking', 'Settlement reconciliation', 'Returns and failed deliveries', 'Cash visibility'],
    solution: 'Keep delivery, payment and settlement work separate enough to manage clearly, but connected to the same order and reports.',
    modules: ['Fulfillment', 'Shipments', 'Payments', 'COD settlements', 'Reports']
  },
  {
    slug: 'multi-location',
    title: 'Multi-location inventory',
    lead: 'For businesses holding stock across warehouses, stores or other operating locations.',
    painPoints: ['Stock by location', 'Transfers', 'Adjustments', 'Counts', 'Allocation decisions'],
    solution: 'See where stock is, how it moved and which location should fulfill each order.',
    modules: ['Inventory', 'Warehouses', 'Transfers', 'Adjustments', 'Stock counts']
  }
] as const

export const pricingPlans = [
  {
    name: 'Start with one workflow',
    price: 'Talk to sales',
    period: '',
    description: 'Fix one high-impact part of the operation first, with a clear scope and success measure.',
    onboarding: 'We confirm the scope after a product walkthrough.',
    highlighted: false,
    features: ['Choose the workflow causing the most friction', 'Review the data and teams involved', 'Agree the rollout before implementation starts']
  },
  {
    name: 'Connect the core operation',
    price: 'Talk to sales',
    period: '',
    description: 'Bring several connected areas—such as orders, inventory, fulfillment and payments—into one operating flow.',
    onboarding: 'We confirm the scope after a product walkthrough.',
    highlighted: true,
    features: ['Orders and customers', 'Products and inventory', 'Fulfillment, payments and purchasing', 'Reporting, roles and permissions']
  },
  {
    name: 'Plan a broader rollout',
    price: 'Talk to sales',
    period: '',
    description: 'Design a wider NAFS rollout for multiple locations, channels, teams or business units.',
    onboarding: 'We review migration and third-party connection needs before pricing.',
    highlighted: false,
    features: ['Agree the priority workflows', 'Review migration needs', 'Confirm available channel and provider connections', 'Plan delivery in sensible phases']
  }
] as const

export const faqItems = [
  {
    question: 'Is NAFS one product or several separate tools?',
    answer: 'NAFS OS runs the core operation. Storefront, Mobile, Shopping, Flow, Courier, Partners and Platform add focused capabilities around it. You can start with only what your business needs.'
  },
  {
    question: 'Do we have to replace everything at once?',
    answer: 'No. You can begin with the problem costing the most time today—often inventory, fulfillment or COD—and expand after that part is working well.'
  },
  {
    question: 'Can NAFS work for a business that sells through more than one channel?',
    answer: 'Yes. Connected channels can feed the same products, customers, orders and stock instead of becoming separate operations.'
  },
  {
    question: 'How does NAFS help with COD?',
    answer: 'NAFS keeps delivery, payment and settlement connected to the same sale. Your team can see what was delivered, what should be collected and what is still waiting to be settled.'
  },
  {
    question: 'Which courier providers are available?',
    answer: 'Pathao is currently available through NAFS Courier. RedX and Steadfast are not advertised as available until their complete booking, update and recovery flows are ready.'
  },
  {
    question: 'Is AI required to use NAFS?',
    answer: 'No. NAFS delivers value through connected commerce operations. AI Studio and Sales Agent are optional, and NAFS Flow can automate routine work without requiring AI.'
  },
  {
    question: 'What determines the price?',
    answer: 'Pricing depends on the workflows, data, locations, channels and third-party connections involved. We provide a written scope after a product walkthrough.'
  }
] as const

export const footerGroups = [
  {
    title: 'Platform',
    links: [
      { label: 'Platform overview', href: '/products' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'B2B', href: '/b2b' },
      { label: 'Partners', href: '/partners' }
    ]
  },
  {
    title: 'Products',
    links: [
      { label: 'NAFS OS', href: '/products/os' },
      { label: 'NAFS Flow', href: '/products/flow' },
      { label: 'NAFS Mobile', href: '/products/mobile' },
      { label: 'NAFS Courier', href: '/products/courier' }
    ]
  },
  {
    title: 'Explore',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Use cases', href: '/use-cases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Request a walkthrough', href: '/#contact' }
    ]
  }
] as const

export const navigationItems = siteNavigation
export const siteConfig = {
  demoHref: process.env.NEXT_PUBLIC_DEMO_URL ?? '/#contact',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@nafsos.com'
} as const
