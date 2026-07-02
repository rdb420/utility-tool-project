from __future__ import annotations

import pytest

from calc.errors import IncompatibleUnitsError, ValidationError
from calc.units import convert, dimension_of


def test_length_conversions() -> None:
    assert convert(1, "in", "cm") == pytest.approx(2.54)
    assert convert(1, "ft", "in") == pytest.approx(12.0)
    assert convert(100, "cm", "m") == pytest.approx(1.0)


def test_weight_conversions() -> None:
    assert convert(1, "lb", "kg") == pytest.approx(0.45359237)
    assert convert(1000, "g", "kg") == pytest.approx(1.0)


def test_volume_conversions() -> None:
    assert convert(1, "m3", "cm3") == pytest.approx(1_000_000.0)
    assert convert(1, "ft3", "in3") == pytest.approx(1728.0, abs=0.01)


def test_same_unit_is_identity() -> None:
    assert convert(42, "kg", "kg") == 42


def test_incompatible_dimensions_rejected() -> None:
    with pytest.raises(IncompatibleUnitsError):
        convert(1, "kg", "cm")


def test_unknown_unit_rejected() -> None:
    with pytest.raises(ValidationError):
        convert(1, "furlong", "cm")


def test_dimension_lookup() -> None:
    assert dimension_of("in") == "length"
    assert dimension_of("lb") == "weight"
    assert dimension_of("m3") == "volume"
