"""Bind formula record ids to calculation functions.

This registry is the traceability contract between ``data/formulas/`` records and
``src/calc``: each entry maps a record ``id`` to a function that consumes the
record's example ``inputs`` (keyed by input symbol) and returns a dict keyed by
output symbol. Tests use it to run every record's worked examples through the
real library, so every published result traces to a corpus example.
"""

from __future__ import annotations

from collections.abc import Callable, Mapping

from . import inventory

FormulaFunc = Callable[[Mapping[str, float]], dict[str, float]]

FORMULA_REGISTRY: dict[str, FormulaFunc] = {
    "inventory.reorder_point.basic": lambda i: {
        "ROP": inventory.reorder_point(i["D"], i["LT"], i["SS"])
    },
    "inventory.safety_stock.service_level": lambda i: {
        "SS": inventory.safety_stock_service_level(i["z"], i["sigma_d"], i["LT"])
    },
    "inventory.eoq.basic": lambda i: {
        "EOQ": inventory.economic_order_quantity(i["D"], i["OC"], i["k"], i["UC"])
    },
    "inventory.turnover.cogs": lambda i: {
        "turns": inventory.inventory_turnover(i["COGS"], i["avg_inv"])
    },
    "inventory.days_of_cover.basic": lambda i: {
        "days": inventory.days_of_cover(i["stock"], i["D"])
    },
    "inventory.carrying_cost.basic": lambda i: {
        "carrying_cost": inventory.carrying_cost(i["rate"], i["avg_inv"])
    },
}
