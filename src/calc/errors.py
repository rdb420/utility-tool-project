"""Error types and input guards for the calculation library."""

from __future__ import annotations


class CalculationError(Exception):
    """Base class for all calculation-library errors."""


class ValidationError(CalculationError):
    """Raised when an input is missing, out of range, or incompatible."""


class IncompatibleUnitsError(ValidationError):
    """Raised when a conversion is attempted between different dimensions."""


def require_number(name: str, value: object) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValidationError(f"{name} must be a number, got {value!r}")
    result = float(value)
    if result != result or result in (float("inf"), float("-inf")):
        raise ValidationError(f"{name} must be finite, got {value!r}")
    return result


def require_non_negative(name: str, value: object) -> float:
    number = require_number(name, value)
    if number < 0:
        raise ValidationError(f"{name} must be >= 0, got {number}")
    return number


def require_positive(name: str, value: object) -> float:
    number = require_number(name, value)
    if number <= 0:
        raise ValidationError(f"{name} must be > 0, got {number}")
    return number
