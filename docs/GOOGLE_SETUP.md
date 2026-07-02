# Google Setup Checklist

## Purpose

This project will use several Google products, but they should not all be connected at the same time. Set up the minimum needed for corpus work and launch readiness now, then defer advertising and monetization integrations until a public site exists.

## Setup Priority

| Priority | Product | Needed Now | Purpose |
|---:|---|---|---|
| 1 | Google Cloud project | Yes | Central project for Workspace APIs, credentials, quotas, and service access |
| 2 | Google Drive | Yes, if source corpus lives in Drive | Store source corpus, research files, sheets, screenshots, and exports |
| 3 | Google Sheets API | Yes, if corpus/scoring lives in Sheets | Read or write keyword matrices, formula tables, scoring models, and QA sheets |
| 4 | Google Drive API | Yes, if automating corpus ingestion | Fetch source files and manage generated research artifacts |
| 5 | OAuth consent and credentials | Yes, before API automation | Local scripts need secure access to Drive and Sheets |
| 6 | Google Search Console | At domain setup | Verify domain ownership, submit sitemap, monitor indexing and organic queries |
| 7 | Google Analytics 4 | At website build | Track page views, calculator starts, successful calculations, exports, and outbound clicks |
| 8 | Google Tag Manager | Optional at website build | Manage GA4, consent mode, and future ad/affiliate tags without code changes |
| 9 | Google Ads / Keyword Planner | Research stage | Validate search volume, keyword ideas, bid ranges, and market intent |
| 10 | Google AdSense | After MVP content exists | Monetization review and ad serving |
| 11 | Looker Studio | After data exists | Reporting dashboard for Search Console, GA4, revenue, and content performance |
| 12 | BigQuery | Later | Larger analytics export, corpus warehouse, or query-heavy reporting |

## Current Configuration

The active project and Workspace artifact IDs are documented in `docs/GOOGLE_CONNECTIONS.md`. Local credential paths and token cache paths are stored in `.env.local`, which is ignored by git.

## Google Cloud Project

Create one dedicated Google Cloud project for this product. Use a clear project name and project ID because the project ID cannot be changed after creation.

Recommended naming:

- Project name: `Operations Utility Toolkit`
- Project ID pattern: `operations-utility-toolkit`

Document these values outside git or in a non-secret deployment note:

- Google Cloud project ID
- Billing account status
- Project owners
- Enabled APIs
- OAuth app name
- Credential locations

Official reference: <https://developers.google.com/workspace/guides/create-project>

## APIs to Enable

Enable only the APIs needed for current work:

- Google Drive API
- Google Sheets API

Later APIs:

- Google Analytics Data API, if reporting will be automated.
- Search Console API, if indexing or query reports will be pulled into internal dashboards.
- Google Ads API, only if automating keyword or campaign workflows. Manual Keyword Planner research does not require app integration.

## Credentials and OAuth

For local corpus tooling, start with OAuth client credentials for a desktop or local development flow. Use the narrowest scopes that support the task. For Shared Drive metadata checks, the local script uses `drive.readonly`; `drive.metadata.readonly` was not sufficient for the Shared Drive check in this project.

Do not commit:

- OAuth client secret JSON files.
- Access tokens.
- Refresh tokens.
- Service account keys.
- Downloaded credentials.

Store local credentials under ignored paths such as:

```text
secrets/
.env
.env.local
```

Official references:

- OAuth consent: <https://developers.google.com/workspace/guides/configure-oauth-consent>
- Credentials: <https://developers.google.com/workspace/guides/create-credentials>

## Drive and Sheets Corpus Workflow

Use Drive and Sheets for collaboration, but keep the application contract file-based.

Recommended workflow:

1. Store raw corpus and research source files in a controlled Drive folder.
2. Use Sheets for formula inventories, lookup tables, keyword matrices, and scoring worksheets.
3. Export or sync validated records into `data/processed/`.
4. Run schema validation locally before generated artifacts are used by the website.

Document for each shared file:

- File name
- Google Drive file ID
- Owner
- Access level
- Purpose
- Whether it is source, interim, or generated data

Do not hard-code Drive file IDs in public code until access and ownership are stable.

## Search Console

Status (2026-07-03): **next action** — the domain (`opscrunch.com`) and website
build now exist. Follow `docs/LAUNCH_RUNBOOK.md` section 5 (property creation,
sitemap submission, indexing requests). The site emits an env-driven
verification meta tag (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) for the
URL-prefix/HTML-tag method.

Set up Search Console when the domain is chosen.

Recommended configuration:

- Use a Domain property where possible so all protocols and subdomains are grouped.
- Verify with DNS.
- Add URL-prefix properties only when a subpath or subdomain needs separate reporting.
- Submit the sitemap after the website is live.

Track:

- Indexed pages
- Impressions
- Clicks
- Click-through rate
- Average position
- Query/page pairs
- Coverage and crawl issues

Official reference: <https://support.google.com/webmasters/answer/34592>

## Google Analytics 4

Status (2026-07-03): **created**. The GA4 property and web data stream exist;
measurement ID `G-7XG10CD70E` is on file in `docs/google-analytics/` and wired
into the site via `NEXT_PUBLIC_GA4_ID` (consent-gated transport in
`web/src/lib/analytics/`). Remaining: the post-deploy Realtime sanity check —
`docs/LAUNCH_RUNBOOK.md` section 6.

Set up GA4 during website implementation, not during corpus work.

Recommended events:

| Event | Meaning |
|---|---|
| `calculator_start` | User entered or changed a calculator input |
| `calculator_result` | Calculator produced a valid result |
| `calculator_validation_error` | User hit an input validation issue |
| `result_copy` | User copied a result |
| `result_export` | User exported CSV, PDF, or another artifact |
| `related_tool_click` | User clicked to another calculator |
| `affiliate_click` | User clicked a monetized outbound link |

Avoid sending sensitive operational values to analytics. For example, record that a dimensional weight calculation completed, not the user's exact shipment dimensions or costs.

Official reference: <https://developers.google.com/analytics/devguides/collection/protocol/ga4>

## Google Ads and Keyword Planner

Use Keyword Planner for research validation, not as an application dependency.

Document exports under `data/raw/keyword-research/` or a Drive folder, then summarize conclusions in docs or Sheets.

For each keyword batch, record:

- Export date
- Target country
- Language
- Seed keywords
- Monthly search range
- Competition level
- Bid range
- Notes on SERP intent

Official reference: <https://support.google.com/google-ads/answer/7337243>

## AdSense

Status (2026-07-03): **next action, deliberately last** — apply only after the
site is live on `opscrunch.com` and Search Console shows pages indexed with
real traffic. Follow `docs/LAUNCH_RUNBOOK.md` section 7 (verification code is
on file at `docs/google-adsense/verication-code.txt`, gitignored; ads stay
disabled until a certified IAB TCF v2.2 CMP replaces the consent banner).

Do not apply for AdSense until the MVP site has useful public content and trust pages.

Before applying, confirm:

- Original calculator pages are live.
- Privacy policy is live.
- Terms of use are live.
- Contact page is live.
- About page is live.
- Navigation works.
- No placeholder pages are public.
- Ads will not interfere with calculator usability.

Official reference: <https://support.google.com/adsense/answer/9724>

## Local Environment Variables

Use environment variables for IDs and paths that differ across machines:

```text
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_OAUTH_CLIENT_SECRET_PATH=
GOOGLE_TOKEN_CACHE_PATH=
GOOGLE_DRIVE_CORPUS_FOLDER_ID=
GOOGLE_SHEETS_FORMULA_WORKBOOK_ID=
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
SEARCH_CONSOLE_SITE_URL=
# Knowledge base (non-Google) — see docs/GOOGLE_CONNECTIONS.md
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=
EMBEDDINGS_URL=
```

A committed `.env.example` exists at the repo root and holds placeholder values
only; real IDs and secrets live in `.env.local`, which is gitignored. Keep it that
way: never put real IDs or secrets in `.env.example`.

## Current Action List

1. Create the Google Cloud project.
2. Enable Drive API and Sheets API.
3. Configure OAuth consent for internal/testing use.
4. Create local OAuth client credentials.
5. Create a Drive folder for the corpus and research artifacts.
6. Create or identify the Sheets workbook for formula and keyword matrices.
7. Record non-secret IDs in a private setup note.
8. Add local secrets to ignored files only.
9. Build a small local script later to prove Drive/Sheets read access.
10. ~~Defer Search Console, GA4, Tag Manager, and AdSense until a domain and website build exist.~~ Done deferring: the domain and website build now exist. GA4 is created and wired; Search Console and AdSense are sequenced in `docs/LAUNCH_RUNBOOK.md` (sections 5 and 7). Tag Manager remains optional/deferred.
