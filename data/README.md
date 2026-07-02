# Data Directory

Two kinds of data live here: **committed source records** (hand-authored, cited)
and **gitignored generated/working data**.

```text
data/
├── formulas/           # Committed: formula records (validated)
│   ├── inventory/      #   KB-grounded (grounding: corpus)
│   └── freight/        #   externally sourced (grounding: external)
├── reference_tables/   # Committed: lookup tables (z-factors, freight sourcing)
│   └── freight/
├── calculators/        # Committed: public tool/page definitions (one per page)
├── raw/                # Gitignored: original source/keyword exports
├── interim/            # Gitignored: normalized intermediate data
├── processed/          # Gitignored: generated artifacts
└── exports/            # Gitignored: generated public artifacts
```

The `raw/`, `interim/`, `processed/`, and `exports/` subtrees are gitignored
(generated or large/licensed). The record subtrees (`formulas/`,
`reference_tables/`, `calculators/`) are the committed corpus source of
truth, validated against [`../schemas`](../schemas) by the TypeScript validator:

```bash
cd web && npm run validate
```

Every formula/reference record with `grounding: corpus` cites the knowledge-base
passages it was derived from (`source_file` + `chunk_index`); see
[../docs/CORPUS_DESIGN.md](../docs/CORPUS_DESIGN.md).
