# Contributing

## Development Principles

- Keep formulas transparent and testable.
- Treat corpus entries as source data, not prose blobs.
- Ground every formula and reference record in the knowledge base: cite the
  `source_file` and `chunk_index` you derived it from, or mark it `external` and
  name the source. Use `scripts/search_corpus.py` to find grounding.
- Separate calculation logic from UI and content rendering.
- Add examples for every formula and verify them with tests.
- Avoid regulated claims, freight-rate guarantees, or definitive compliance advice.
- Prefer small, useful tools over broad pages with shallow content.

## Website Workflow

The site, the calculation library, and the corpus validator are TypeScript under
`web/` (Node >= 20.19):

```bash
cd web
npm install
npm run test       # vitest: calc, record-driven, validator, and component tests
npm run validate   # validate data/ records vs schemas/
npm run lint
npm run typecheck
```

## Python Workflow

Python covers the knowledge-base tooling (ingestion, retrieval, Google checks).
Use `uv` for environment and tool execution:

```bash
uv sync
uv run pytest
uv run ruff check .
```

## Adding a Formula or Calculator

The pieces must stay in lockstep (enforced by tests and the validator):

1. Author the formula record in `data/formulas/` with citations and a worked
   example (see `docs/CORPUS_DESIGN.md` for fields).
2. Implement the pure function in `web/src/lib/calc/` and register it in
   `web/src/lib/calc/registry.ts` (id -> function). The record-driven Vitest
   suite then runs the record's worked examples through the real library
   automatically.
3. For a public page, add a calculator record in `data/calculators/` following
   `docs/MVP_PAGE_SPECS.md`; its inputs must cover the formula's inputs (an input
   satisfied by another referenced formula's output counts as covered).
4. Run `cd web && npm run validate && npm run test`.

## Documentation Workflow

When adding a new calculator or data category, update:

1. `docs/CORPUS_DESIGN.md` with any new corpus fields.
2. `docs/TECHNICAL_ARCHITECTURE.md` if the data flow changes.
3. `docs/DEVELOPMENT_PLAN.md` if scope or priority changes.
4. `docs/MVP_PAGE_SPECS.md` if page standards or the MVP set change.
5. Tests or examples for the formulas involved.

## Source Material

The original research markdown files under `docs/project/` are treated as source
documents. New documentation should cite or summarize them, not overwrite them.
