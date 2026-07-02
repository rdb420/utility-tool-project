"""Validate structured corpus records against the JSON Schemas in ``schemas/``.

Checks performed:

- Each record validates against its schema (formula / reference_table / unit / calculator).
- Record ``id`` values are unique across the corpus.
- Every citation ``source_file`` names a real file in ``corpus-logistics-supply-chain/``.

Run via ``scripts/validate_corpus.py``.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

REPO_ROOT = Path(__file__).resolve().parents[2]
SCHEMA_DIR = REPO_ROOT / "schemas"
DATA_DIR = REPO_ROOT / "data"
CORPUS_DIR = REPO_ROOT / "corpus-logistics-supply-chain"

# glob under data/ -> schema file name
RECORD_KINDS: dict[str, str] = {
    "formulas/**/*.json": "formula.schema.json",
    "reference_tables/**/*.json": "reference_table.schema.json",
    "units/*.json": "unit.schema.json",
    "calculators/*.json": "calculator.schema.json",
}


@dataclass
class ValidationReport:
    errors: list[str] = field(default_factory=list)
    checked: int = 0

    @property
    def ok(self) -> bool:
        return not self.errors


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def _validator(schema_name: str) -> Draft202012Validator:
    schema = load_json(SCHEMA_DIR / schema_name)
    return Draft202012Validator(schema)


def _corpus_files() -> set[str]:
    if not CORPUS_DIR.exists():
        return set()
    return {path.name for path in CORPUS_DIR.glob("*.md")}


def _iter_citations(record: dict[str, Any]) -> list[dict[str, Any]]:
    citations = list(record.get("citations") or [])
    for example in record.get("examples") or []:
        if isinstance(example, dict) and example.get("citation"):
            citations.append(example["citation"])
    return citations


def _input_symbols(record: dict[str, Any]) -> set[str]:
    return {inp.get("symbol") for inp in record.get("inputs", []) if inp.get("symbol")}


def _output_symbols(record: dict[str, Any]) -> set[str]:
    return {out.get("symbol") for out in record.get("outputs", []) if out.get("symbol")}


def _calculator_input_symbols(record: dict[str, Any]) -> set[str]:
    symbols: set[str] = set()
    for group in record.get("input_groups", []):
        for inp in group.get("inputs", []):
            if inp.get("symbol"):
                symbols.add(inp["symbol"])
    return symbols


def _check_calculator_integrity(
    rel: Path,
    calculator: dict[str, Any],
    formulas_by_id: dict[str, dict[str, Any]],
    calculator_ids: set[str],
    report: ValidationReport,
) -> None:
    referenced_inputs: set[str] = set()
    referenced_outputs: set[str] = set()
    for formula_id in calculator.get("formula_ids", []):
        formula = formulas_by_id.get(formula_id)
        if formula is None:
            report.errors.append(f"{rel}: formula_id not found: {formula_id}")
            continue
        referenced_inputs |= _input_symbols(formula)
        referenced_outputs |= _output_symbols(formula)

    calc_inputs = _calculator_input_symbols(calculator)
    missing_inputs = referenced_inputs - calc_inputs
    if missing_inputs:
        report.errors.append(
            f"{rel}: inputs missing for referenced formula(s): {sorted(missing_inputs)}"
        )

    for card in calculator.get("result_cards", []):
        symbol = card.get("symbol")
        if symbol and referenced_outputs and symbol not in referenced_outputs:
            report.errors.append(
                f"{rel}: result_card symbol '{symbol}' is not a referenced-formula output"
            )

    for related in calculator.get("related_tools", []):
        if related not in calculator_ids:
            report.errors.append(f"{rel}: related_tools references unknown calculator: {related}")


def validate_corpus(*, check_citation_files: bool = True) -> ValidationReport:
    report = ValidationReport()
    corpus_files = _corpus_files() if check_citation_files else set()
    seen_ids: dict[str, Path] = {}
    formulas_by_id: dict[str, dict[str, Any]] = {}
    calculators: list[tuple[Path, dict[str, Any]]] = []

    for pattern, schema_name in RECORD_KINDS.items():
        validator = _validator(schema_name)
        for path in sorted(DATA_DIR.glob(pattern)):
            report.checked += 1
            rel = path.relative_to(REPO_ROOT)
            try:
                record = load_json(path)
            except json.JSONDecodeError as exc:
                report.errors.append(f"{rel}: invalid JSON: {exc}")
                continue

            for error in sorted(validator.iter_errors(record), key=str):
                location = "/".join(str(part) for part in error.path) or "(root)"
                report.errors.append(f"{rel}: {location}: {error.message}")

            record_id = record.get("id")
            if isinstance(record_id, str):
                if record_id in seen_ids:
                    report.errors.append(
                        f"{rel}: duplicate id '{record_id}' (also in {seen_ids[record_id]})"
                    )
                else:
                    seen_ids[record_id] = rel

            if schema_name == "formula.schema.json" and isinstance(record_id, str):
                formulas_by_id[record_id] = record
            if schema_name == "calculator.schema.json":
                calculators.append((rel, record))

            if check_citation_files and corpus_files:
                for citation in _iter_citations(record):
                    source_file = citation.get("source_file")
                    if source_file and source_file not in corpus_files:
                        report.errors.append(
                            f"{rel}: citation source_file not found in corpus: {source_file}"
                        )

    calculator_ids = {
        record.get("id") for _, record in calculators if isinstance(record.get("id"), str)
    }
    for rel, calculator in calculators:
        _check_calculator_integrity(rel, calculator, formulas_by_id, calculator_ids, report)

    return report


def main() -> int:
    report = validate_corpus()
    if report.ok:
        print(f"OK: {report.checked} corpus record(s) valid.")
        return 0
    print(f"FAILED: {len(report.errors)} problem(s) across {report.checked} record(s):")
    for error in report.errors:
        print(f"  - {error}")
    return 1
