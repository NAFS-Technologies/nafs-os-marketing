# Editing the marketing site

## Ownership

Product names, readiness, outcomes, integrations and navigation live in
`src/content/product-catalog.ts`. Shared components own presentation. Edit data,
not a second set of hand-written page cards. Product claims require the current
NAFS OS contract and release/configuration evidence before availability changes.

Articles live in `src/content/blog/nafs-*.mdx`. Only that prefix is public. Keep
legacy personal-finance template articles excluded. A public article requires a
safe lowercase slug, title, description and a real YYYY-MM-DD publication date.
Optional `draft: true` and future publication dates are excluded from directories,
direct detail routes and the sitemap. Rebuild after a scheduled date to publish;
there is no hidden scheduler. Invalid metadata fails validation instead of
silently publishing an empty article.

Run `bun run test:content`, `bun run test`, `bun run typecheck` and `bun run lint`
before proposing editorial changes. MDX is trusted repository code: review it as
code. Never compile arbitrary visitor-supplied or unauthenticated remote MDX.

## CMS / Studio

The existing vendored Studio SDK, preview and revalidation integration remain
available and separately owned. This rebuild does not invent a Payload collection,
change the separate CMS service, forward visitor credentials to a new endpoint,
or enable Studio delivery by default. A visual publishing integration needs an
approved collection/document contract, author permissions, draft preview,
publishing/revalidation behavior and failure acceptance first. Until then,
repository content is the explicit publishing source. This is not a claim that a
new drag-and-drop CMS has been implemented.

## Contact and measurement

Configure the approved contact email and marketing/ERP origins at build time.
Set `NAFS_LEAD_WEBHOOK_URL` on the server. An optional server-only
`NAFS_LEAD_WEBHOOK_TOKEN` adds a Bearer authorization header. The receiver must
acknowledge only durable receipt and honor `Idempotency-Key` to deduplicate retries.
The website does not claim exactly-once delivery across webhook failures.

The form keeps input when delivery cannot be confirmed. It sends no automatic
retry and does not announce success before a successful destination response.
Apply rate limits and abuse controls at the deployment's trusted reverse proxy;
a per-process memory map would not protect a multi-instance deployment.
Do not log inquiry bodies, authorization headers or provider error bodies.

Optional analytics are off until an explicit, revocable visitor preference.
Only event name and a fixed placement label are emitted. Form contents, record
IDs, raw URLs and query strings are not analytics properties. Campaign labels
are allowlisted and included in the submitted inquiry only after opt-in. No
third-party analytics script is installed by this work; any dataLayer consumer
must also honor the consent boundary. This is an engineering boundary, not a
claim of legal compliance or an approved privacy policy.
