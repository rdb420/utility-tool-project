# Data Directory

Two kinds of data live here: **committed source records** (hand-authored, cited)
and **gitignored generated/working data**.

```text
data/
├── formulas/           # Committed: KB-grounded formula records (validated)
│   └── inventory/
├── reference_tables/   # Committed: lookup tables (z-factors, freight sourcing)
│   └── freight/
├── units/              # Committed: unit definitions (as needed)
├── calculators/        # Committed: public tool/page definitions (Phase 3)
├── raw/                # Gitignored: original source/keyword exports
├── interim/            # Gitignored: normalized intermediate data
├── processed/          # Gitignored: validated artifacts consumed by the app
└── exports/            # Gitignored: generated public artifacts
```

The `raw/`, `interim/`, `processed/`, and `exports/` subtrees are gitignored
(generated or large/licensed). The record subtrees (`formulas/`,
`reference_tables/`, `units/`, `calculators/`) are the committed corpus source of
truth, validated against [`../schemas`](../schemas):

```bash
uv run python scripts/validate_corpus.py
```

Every formula/reference record with `grounding: corpus` cites the knowledge-base
passages it was derived from (`source_file` + `chunk_index`); see
[../docs/CORPUS_DESIGN.md](../docs/CORPUS_DESIGN.md).
