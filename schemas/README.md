# Schemas

JSON Schema (draft 2020-12) definitions for the structured corpus records
described in [../docs/architecture/CORPUS_DESIGN.md](../docs/architecture/CORPUS_DESIGN.md).

| Schema | Validates | Records live in |
|---|---|---|
| `formula.schema.json` | Reusable calculation records | `data/formulas/**/*.json` |
| `reference_table.schema.json` | Lookup tables (z-factors, freight divisors, classes) | `data/reference_tables/**/*.json` |
| `unit.schema.json` | Units of measure with base-unit conversion | `data/units/*.json` |
| `calculator.schema.json` | Public tool/page definitions (authored in Phase 3) | `data/calculators/*.json` |

Grounding contract enforced by the schemas:

- A `formula` or `reference_table` with `grounding: corpus` must carry at least
  one `citation` (`source_file` + `chunk_index`) into the knowledge base.
- A record with `grounding: external` must name its `source(s)`.
- A `reference_table` with `status: verified` must have an `effective_date` and
  at least one row; `status: needs_sourcing` marks placeholder tables.

Validate everything with the TypeScript validator (also run automatically before
every `web` production build):

```bash
cd web && npm run validate
```

TypeScript types for these schemas are generated into
`web/src/lib/records/types.gen.ts` via `cd web && npm run typegen` (committed;
regenerate after any schema change).
