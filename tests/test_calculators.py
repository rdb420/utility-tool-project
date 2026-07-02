from __future__ import annotations

from calc.registry import FORMULA_REGISTRY
from corpus.validation import DATA_DIR, load_json

EXPECTED_CALCULATORS = {
    "calculator.reorder_point": "reorder-point-calculator",
    "calculator.safety_stock": "safety-stock-calculator",
    "calculator.eoq": "eoq-calculator",
    "calculator.inventory_turnover": "inventory-turnover-calculator",
    "calculator.days_of_cover": "days-of-inventory-calculator",
    "calculator.carrying_cost": "inventory-carrying-cost-calculator",
}


def _load_calculators() -> dict[str, dict]:
    records = {}
    for path in (DATA_DIR / "calculators").glob("*.json"):
        record = load_json(path)
        records[record["id"]] = record
    return records


def _formulas() -> dict[str, dict]:
    records = {}
    for path in (DATA_DIR / "formulas").rglob("*.json"):
        record = load_json(path)
        records[record["id"]] = record
    return records


def test_expected_mvp_calculators_present() -> None:
    calculators = _load_calculators()
    for calc_id, slug in EXPECTED_CALCULATORS.items():
        assert calc_id in calculators, f"missing calculator {calc_id}"
        assert calculators[calc_id]["slug"] == slug


def test_calculator_slugs_are_unique() -> None:
    slugs = [c["slug"] for c in _load_calculators().values()]
    assert len(slugs) == len(set(slugs))


def test_calculator_inputs_cover_referenced_formula_inputs() -> None:
    formulas = _formulas()
    for calc in _load_calculators().values():
        calc_symbols = {
            inp["symbol"] for group in calc["input_groups"] for inp in group["inputs"]
        }
        for formula_id in calc["formula_ids"]:
            formula = formulas[formula_id]
            needed = {inp["symbol"] for inp in formula["inputs"]}
            assert needed <= calc_symbols, (
                f"{calc['id']} missing inputs {needed - calc_symbols} for {formula_id}"
            )


def test_calculator_results_are_produced_by_the_calc_library() -> None:
    """End-to-end: a calculator's formula example runs through the library and yields
    a value for every result card the page promises to show."""
    formulas = _formulas()
    for calc in _load_calculators().values():
        formula_id = calc["formula_ids"][0]
        func = FORMULA_REGISTRY[formula_id]
        example_inputs = formulas[formula_id]["examples"][0]["inputs"]
        computed = func(example_inputs)
        for card in calc["result_cards"]:
            assert card["symbol"] in computed, (
                f"{calc['id']} result_card '{card['symbol']}' not produced by {formula_id}"
            )


def test_related_tools_form_a_connected_cluster() -> None:
    calculators = _load_calculators()
    ids = set(calculators)
    for calc in calculators.values():
        assert calc["related_tools"], f"{calc['id']} has no related tools"
        for related in calc["related_tools"]:
            assert related in ids, f"{calc['id']} links unknown tool {related}"
            assert related != calc["id"], f"{calc['id']} links to itself"
