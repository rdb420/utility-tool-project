"""Result rounding and display formatting for calculator outputs."""

from __future__ import annotations

from .errors import require_number


def round_result(value: float, precision: int = 2) -> float:
    """Round to ``precision`` decimals; normalise -0.0 to 0.0."""
    number = require_number("value", value)
    if precision < 0:
        raise ValueError("precision must be >= 0")
    result = round(number, precision)
    return result + 0.0


def format_result(value: float, unit: str | None = None, precision: int = 2) -> str:
    """Format a numeric result for display, trimming trailing zeros.

    >>> format_result(40.0, "units")
    '40 units'
    >>> format_result(836.827, "units", 2)
    '836.83 units'
    """
    rounded = round_result(value, precision)
    text = f"{rounded:.{precision}f}".rstrip("0").rstrip(".") if precision else f"{int(rounded)}"
    return f"{text} {unit}" if unit else text
