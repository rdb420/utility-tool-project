"""Unit conversion helpers.

Convert between units of the same dimension via a base unit (length -> cm,
weight -> kg, volume -> cm^3). Formulas should convert inputs to a consistent
unit before executing. Conversions across dimensions raise IncompatibleUnitsError.
"""

from __future__ import annotations

from .errors import IncompatibleUnitsError, ValidationError, require_non_negative

# symbol -> (dimension, factor to base unit)
_UNITS: dict[str, tuple[str, float]] = {
    # length, base = cm
    "mm": ("length", 0.1),
    "cm": ("length", 1.0),
    "m": ("length", 100.0),
    "in": ("length", 2.54),
    "ft": ("length", 30.48),
    # weight, base = kg
    "g": ("weight", 0.001),
    "kg": ("weight", 1.0),
    "lb": ("weight", 0.45359237),
    "oz": ("weight", 0.028349523125),
    # volume, base = cm^3
    "cm3": ("volume", 1.0),
    "l": ("volume", 1000.0),
    "m3": ("volume", 1_000_000.0),
    "in3": ("volume", 16.387064),
    "ft3": ("volume", 28316.846592),
}


def dimension_of(unit: str) -> str:
    if unit not in _UNITS:
        raise ValidationError(f"unknown unit: {unit!r}")
    return _UNITS[unit][0]


def convert(value: float, from_unit: str, to_unit: str) -> float:
    """Convert ``value`` from ``from_unit`` to ``to_unit`` within one dimension."""
    number = require_non_negative("value", value)
    from_dim, from_factor = _dimension_and_factor(from_unit)
    to_dim, to_factor = _dimension_and_factor(to_unit)
    if from_dim != to_dim:
        raise IncompatibleUnitsError(
            f"cannot convert {from_unit} ({from_dim}) to {to_unit} ({to_dim})"
        )
    return number * from_factor / to_factor


def _dimension_and_factor(unit: str) -> tuple[str, float]:
    if unit not in _UNITS:
        raise ValidationError(f"unknown unit: {unit!r}")
    return _UNITS[unit]
