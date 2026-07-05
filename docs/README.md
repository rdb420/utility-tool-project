# docs/ — Index

Project documentation for OpsCrunch, grouped by purpose. One line per entry:
what it is and when to read it.

## architecture/ — how the system is built

- `architecture/TECHNICAL_ARCHITECTURE.md` — end-to-end system design (website, calc library, KB pipeline); read before changing structure or adding components.
- `architecture/CORPUS_DESIGN.md` — the two-layer corpus model (Qdrant grounding layer vs. hand-authored records) and the grounding contract; read before touching `data/` or `schemas/`.
- `architecture/corpus-docs/` — sourcing notes and source maps for the freight dimensional-weight records.
- `architecture/qdrant-docs/` — reference material for the KB stack (fastembed, hybrid search, ColBERT multivectors) plus the embeddings sidecar README (`Embeddings-Sidecar-huggingface-spaces-README.md`).

## planning/ — why and in what order

- `planning/PROJECT_BRIEF.md` — what the project is and its goals; the starting point for new contributors.
- `planning/RESEARCH_SYNTHESIS.md` — decisions extracted from the source research reports under `project/`.
- `planning/DEVELOPMENT_PLAN.md` — phased build plan with status; read to see what is done and what is next.
- `planning/MVP_PAGE_SPECS.md` — cross-cutting calculator page standards (layout, validation, disclaimers, SEO/schema); read before changing page UI or records.
- `planning/superpowers/specs/` — dated design specs (historical snapshots; do not update paths inside them retroactively beyond link fixes).

## launch/ — going and staying live

- `launch/LAUNCH_RUNBOOK.md` — the ordered launch checklist (domain, DNS, Vercel, GA4, Search Console, AdSense); the operational source of truth for Phase 5.
- `launch/GOOGLE_SETUP.md` — Google Cloud/Workspace/measurement setup narrative and status.
- `launch/GOOGLE_CONNECTIONS.md` — verified Google project and Workspace artifact IDs used by the Python connectivity check.
- `launch/GTM_SETUP.md` — the published GTM container (v11) and consent architecture: GA4 hard-gated on consentmanager vendor consent (`s26`), plus the API audit scripts and post-fix verification steps.

## integrations/ — vendor reference material

- `integrations/consentmanager/` — consentmanager.net CMP docs, exported CMP config/scripts, and the privacy-policy generator assets (`privacy-policy-gen/`).
- `integrations/google-analytics/` — GA4 Admin/Data REST API notes and the site's Google tag snippet.
- `integrations/google-tag-manager/` — GTM install snippets, REST API notes, and a Next.js App Router GTM tutorial.
- `integrations/vercel/` — non-secret Vercel project notes.

## Source material (do not modify)

- `project/` — the three original research markdown reports; source material only: cite or summarize, never overwrite or rename.
- `mockups/` — HTML mockups and brand/calculator kits; the visual source of truth for the design system, plus the logo.

## Business

- `business-model/` — business plan (HTML) and financial model (XLSX).

## Sensitive (gitignored credentials — do not read, print, or commit)

- `cloudflare/` — Cloudflare notes; contains gitignored API-token and account files. Only `domain.txt` is tracked.
- `google-adsense/` — contains the gitignored AdSense verification code.

## Scratch

- `debug/` — gitignored debug artifacts (Tag Assistant exports, HAR captures, downloaded page sources); may contain session data, never commit.
- `archive/` — parking lot for superseded documents.
