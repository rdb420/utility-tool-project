from __future__ import annotations

import math

import pytest

from calc import inventory
from calc.errors import ValidationError


def test_reorder_point_basic() -> None:
    assert inventory.reorder_point(10, 4, 0) == 40
    assert inventory.reorder_point(10, 15, 19) == 169


def test_reorder_point_defaults_safety_stock_to_zero() -> None:
    assert inventory.reorder_point(10, 4) == 40


def test_safety_stock_service_level() -> None:
    result = inventory.safety_stock_service_level(1.64, 3, 15)
    assert result == pytest.approx(1.64 * 3 * math.sqrt(15))
    assert round(result) == 19


def test_economic_order_quantity() -> None:
    result = inventory.economic_order_quantity(20000, 125, 0.21, 34)
    assert result == pytest.approx(836.83, abs=0.01)


def test_inventory_turnover() -> None:
    assert inventory.inventory_turnover(150_000_000, 30_000_000) == 5


def test_days_of_cover() -> None:
    assert inventory.days_of_cover(600, 100) == 6


def test_carrying_cost() -> None:
    assert inventory.carrying_cost(0.26, 2_000_000) == 520_000


def test_negative_input_rejected() -> None:
    with pytest.raises(ValidationError):
        inventory.reorder_point(-1, 4, 0)


def test_non_numeric_input_rejected() -> None:
    with pytest.raises(ValidationError):
        inventory.inventory_turnover("lots", 30)  # type: ignore[arg-type]


def test_boolean_is_not_a_valid_number() -> None:
    with pytest.raises(ValidationError):
        inventory.carrying_cost(True, 2_000_000)  # type: ignore[arg-type]


def test_zero_divisor_rejected() -> None:
    with pytest.raises(ValidationError):
        inventory.inventory_turnover(100, 0)
    with pytest.raises(ValidationError):
        inventory.days_of_cover(100, 0)
    with pytest.raises(ValidationError):
        inventory.economic_order_quantity(100, 10, 0, 5)


def test_infinite_input_rejected() -> None:
    with pytest.raises(ValidationError):
        inventory.carrying_cost(0.2, float("inf"))
