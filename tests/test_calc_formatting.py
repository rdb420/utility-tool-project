from __future__ import annotations

from calc.formatting import format_result, round_result


def test_round_result() -> None:
    assert round_result(836.827, 2) == 836.83
    assert round_result(5.0, 2) == 5.0


def test_round_result_normalises_negative_zero() -> None:
    assert round_result(-0.0001, 2) == 0.0


def test_format_result_trims_trailing_zeros() -> None:
    assert format_result(40.0, "units") == "40 units"
    assert format_result(836.827, "units", 2) == "836.83 units"
    assert format_result(5.5, "days", 2) == "5.5 days"


def test_format_result_without_unit() -> None:
    assert format_result(6.0) == "6"


def test_format_result_zero_precision() -> None:
    assert format_result(836.827, "units", 0) == "837 units"
