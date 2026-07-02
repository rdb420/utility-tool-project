"""Pure inventory-planning calculations.

Each function implements one grounded formula record in
``data/formulas/inventory/`` and reproduces that record's worked examples. The
functions are pure (no I/O, no globals) and validate their inputs, raising
``ValidationError`` on missing, negative, or incompatible values.
"""

from __future__ import annotations

import math

from .errors import require_non_negative, require_positive


def reorder_point(
    avg_daily_demand: float, lead_time_days: float, safety_stock: float = 0.0
) -> float:
    """ROP = (D * LT) + SS. See inventory.reorder_point.basic."""
    demand = require_non_negative("avg_daily_demand", avg_daily_demand)
    lead_time = require_non_negative("lead_time_days", lead_time_days)
    buffer = require_non_negative("safety_stock", safety_stock)
    return demand * lead_time + buffer


def safety_stock_service_level(
    z_factor: float, demand_std_dev: float, lead_time_days: float
) -> float:
    """SS = z * sigma_d * sqrt(LT). See inventory.safety_stock.service_level."""
    z = require_non_negative("z_factor", z_factor)
    sigma = require_non_negative("demand_std_dev", demand_std_dev)
    lead_time = require_non_negative("lead_time_days", lead_time_days)
    return z * sigma * math.sqrt(lead_time)


def economic_order_quantity(
    annual_demand: float, order_cost: float, carrying_rate: float, unit_cost: float
) -> float:
    """EOQ = sqrt((2 * D * OC) / (k * UC)). See inventory.eoq.basic."""
    demand = require_non_negative("annual_demand", annual_demand)
    ordering = require_non_negative("order_cost", order_cost)
    rate = require_positive("carrying_rate", carrying_rate)
    unit = require_positive("unit_cost", unit_cost)
    return math.sqrt((2 * demand * ordering) / (rate * unit))


def inventory_turnover(cogs: float, average_inventory_value: float) -> float:
    """turns = COGS / average inventory value. See inventory.turnover.cogs."""
    cost_of_goods = require_non_negative("cogs", cogs)
    average = require_positive("average_inventory_value", average_inventory_value)
    return cost_of_goods / average


def days_of_cover(available_stock: float, avg_daily_demand: float) -> float:
    """days = available stock / average daily demand. See inventory.days_of_cover.basic."""
    stock = require_non_negative("available_stock", available_stock)
    demand = require_positive("avg_daily_demand", avg_daily_demand)
    return stock / demand


def carrying_cost(carrying_rate: float, average_inventory_value: float) -> float:
    """carrying cost = rate * average inventory value. See inventory.carrying_cost.basic."""
    rate = require_non_negative("carrying_rate", carrying_rate)
    average = require_non_negative("average_inventory_value", average_inventory_value)
    return rate * average
