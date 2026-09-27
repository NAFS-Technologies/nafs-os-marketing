# Public site regression checks

Run from the repository root after `bun install --frozen-lockfile`:

```bash
bun run test
bun run typecheck
bun run lint
bun run build
```

`demo-request-route.test.mjs` uses Node's test runner and the existing TypeScript
dev dependency to compile and execute the actual route with Web Request/Response
objects. Only the outbound webhook and its timeout are mocked. It covers missing
configuration, invalid JSON and UTF-8, streamed byte limits, field errors, every
visible selection, normalization, honeypot handling and delivery failure/success.
The other `*.test.mjs` files are source contracts, not browser-rendering evidence.

With the site running locally, run the browser checks in another terminal:

```bash
SITE_BASE_URL=http://127.0.0.1:3100 bun run test:browser
```

These require this repository's Playwright dependency and installed Chromium.
`mobile-browser-acceptance.mjs` checks the public route inventory;
`site-interactions.mjs` checks the homepage and conversion flow at 360, 390, 412,
768, 1024, 1440 and 1920px. It exercises keyboard focus, background isolation,
desktop resize, browser history, active navigation, contact anchors, field errors,
retained input, unconfirmed responses and duplicate-submit protection. Demo API
requests are intercepted so synthetic leads never reach a real webhook.

## Lead-delivery contract

A valid human submission is acknowledged only after the server-only
`NAFS_LEAD_WEBHOOK_URL` returns a successful HTTP response. An unset/blank URL
returns 503, delivery failures/timeouts return 502, invalid fields return 400 with
field errors, invalid media types return 415 and oversized bodies return 413.
The honeypot intentionally returns a neutral acknowledgement without forwarding.

The client requires `accepted: true` before clearing the form. It preserves input
on failure, does not retry automatically and offers the same configured
`NEXT_PUBLIC_CONTACT_EMAIL` contact used by the footer. Confirm that address and
webhook in the deployment environment; tests do not establish provider readiness
or prove that an email address is monitored. Do not log lead payloads or publish
webhook credentials.
