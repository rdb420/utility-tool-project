from __future__ import annotations

import json
from pathlib import Path

from calc.registry import FORMULA_REGISTRY
from corpus.validation import DATA_DIR, load_json, validate_corpus

EXPECTED_INVENTORY_FORMULAS = {
    "inventory.reorder_point.basic",
    "inventory.safety_stock.service_level",
    "inventory.eoq.basic",
    "inventory.turnover.cogs",
    "inventory.days_of_cover.basic",
    "inventory.carrying_cost.basic",
}


def _load_formulas() -> dict[str, dict]:
    records = {}
    for path in (DATA_DIR / "formulas").rglob("*.json"):
        record = load_json(path)
        records[record["id"]] = record
    return records


def test_corpus_records_are_schema_valid() -> None:
    report = validate_corpus()
    assert report.ok, "corpus validation errors:\n" + "\n".join(report.errors)
    assert report.checked >= 7  # 6 formulas + z-factor + freight stubs


def test_expected_inventory_formulas_present() -> None:
    formulas = _load_formulas()
    missing = EXPECTED_INVENTORY_FORMULAS - set(formulas)
    assert not missing, f"missing formula records: {missing}"


def test_every_corpus_grounded_formula_has_citations() -> None:
    for record in _load_formulas().values():
        if record["grounding"] == "corpus":
            assert record["citations"], f"{record['id']} is corpus-grounded but has no citations"


def test_worked_examples_reproduced_by_calc_library() -> None:
    """Every corpus worked example must be reproduced by the real calc library."""
    for record_id, record in _load_formulas().items():
        func = FORMULA_REGISTRY.get(record_id)
        assert func is not None, f"no calc function registered for {record_id}"
        for example in record["examples"]:
            computed = func(example["inputs"])
            tolerance = example.get("tolerance", 1e-6)
            for symbol, expected in example["expected"].items():
                actual = computed[symbol]
                assert abs(actual - expected) <= tolerance, (
                    f"{record_id} example {example['inputs']}: "
                    f"{symbol} computed {actual}, record says {expected}"
                )


def test_freight_reference_tables_are_flagged_needs_sourcing() -> None:
    freight_dir = DATA_DIR / "reference_tables" / "freight"
    files = list(freight_dir.glob("*.json"))
    assert files, "expected freight reference-table stubs"
    for path in files:
        table = json.loads(Path(path).read_text(encoding="utf-8"))
        assert table["status"] == "needs_sourcing", f"{path.name} should be needs_sourcing"
        assert table["grounding"] == "external"
        assert table.get("source") and table.get("sourcing_notes")
