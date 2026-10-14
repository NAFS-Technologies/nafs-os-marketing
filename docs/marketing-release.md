# Marketing release checklist

## Review the complete stack

PRs 1–6 are stacked. Merge in order, retargeting subsequent PRs as predecessors
land. The final branch contains the integrated site. Do not deploy an intermediate
phase simply because its isolated source checks pass. No PR is an instruction to
merge, deploy, change DNS or restart ERP/CMS services.

## Automated acceptance

The existing Site PR workflow runs on an isolated GitHub-hosted runner, for
same-repository PRs only, with read-only contents permission and pinned actions.
It requires frozen installation, article validation, unit/route regression tests,
TypeScript, lint, a production build and browser acceptance. Diagnostic steps use
continue-on-error only to collect all failures; the final gate rejects any failed
or skipped required check. Lint correction patches are diagnostic artifacts, not
changes silently accepted as the reviewed commit.

Browser checks cover every rebuilt product/solution/use-case route and the main
commercial/resource journeys at seven widths. They exercise native modal focus,
Escape, breakpoint cleanup, preview keyboard/search/details, integration filters,
resource recovery, consent boundaries and the actual Next route delivering to a
local synthetic receiver. No real lead destination or personal data is used.

## Visual and performance evidence

Inspect desktop/mobile screenshot artifacts for hierarchy, spacing, wrapping,
contrast, sticky-header behavior and long content. Screenshot generation does not
approve a baseline. Add reviewed, environment-pinned baselines only after design
acceptance; never bless a changed image just to make a test green.

Measure the deployed site's loading and responsiveness on representative mobile
hardware/network conditions before publishing performance claims. Suggested
release targets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, but these are targets, not
measurements achieved by this PR. Lab browser timings are not field Core Web Vitals.
Verify reduced motion, keyboard access and 200% text manually as well as through
automated checks. Record exceptions explicitly.

## Before production cutover

- Confirm the approved marketing origin, ERP URLs and contact identity.
- Build preview/staging with indexing disabled; rebuild production with approved canonicals.
- Configure the lead receiver, optional authorization, durable acknowledgement,
  idempotency retention and trusted reverse-proxy rate limits.
- Send a synthetic production smoke inquiry with permission and verify receipt
  at the real destination; do not claim this from the local fixture test.
- Approve public product status, prices/trial wording, branding and commercial terms.
- Use only approved product captures with synthetic seed, route/revision, viewport,
  capture date and redaction review. Current previews remain labeled illustrations.
- Confirm the operator's privacy/legal wording before introducing a new policy
  page or analytics provider. A consent toggle is not a legal opinion.
- Preserve the previous image and reverse-proxy target for rollback.

Record exact commit/image, checks, screenshot review, limitations, public health
and rollback target in release evidence. A passing build is not production
acceptance; no deployment is performed by this rebuild.
