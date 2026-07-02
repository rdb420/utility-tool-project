# Tests

Run with `uv run pytest` (config in `pyproject.toml`: `testpaths=tests`,
`pythonpath=src`). Tests are network-free — the pipeline/retrieval tests exercise
pure helpers, not live Qdrant or the embeddings sidecar.

| File | Covers |
|---|---|
| `test_qdrant_ingest.py` | Chunking with overlap/offsets, payload metadata, deterministic point IDs, sidecar response parsing |
| `test_qdrant_search.py` | Hybrid prefetch construction and search-hit/citation parsing |
| `test_corpus_records.py` | Schema validity of all records; corpus worked examples reproduced by the calc library; corpus-grounded formulas carry citations; freight tables flagged `needs_sourcing` |
| `test_calculators.py` | MVP page specs present; calculator inputs cover formula inputs; results produced end-to-end by the calc library; related-tool cluster is connected |
| `test_calc_inventory.py` | The six inventory formula functions and their input-validation errors |
| `test_calc_units.py` | Unit conversions and incompatible-unit handling |
| `test_calc_formatting.py` | Result rounding and display formatting |

The key traceability guarantee: `test_corpus_records.py` and `test_calculators.py`
run each formula's cited worked example through the real `src/calc` library via
`calc.registry`, so every published result traces back to a cited corpus passage.
