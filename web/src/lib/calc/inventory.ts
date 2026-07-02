/**
 * Pure inventory-planning calculations.
 *
 * Each function implements one grounded formula record in
 * `data/formulas/inventory/` and reproduces that record's worked examples.
 * The functions are pure (no I/O, no globals) and validate their inputs,
 * throwing `ValidationError` on missing, negative, or incompatible values.
 *
 * TypeScript port of `src/calc/inventory.py` — no rounding inside; display
 * rounding belongs to `formatting.ts`.
 */

import { requireNonNegative, requirePositive } from "./errors";

/** ROP = (D * LT) + SS. See inventory.reorder_point.basic. */
export function reorderPoint(
  avgDailyDemand: number,
  leadTimeDays: number,
  safetyStock = 0,
): number {
  const demand = requireNonNegative("avg_daily_demand", avgDailyDemand);
  const leadTime = requireNonNegative("lead_time_days", leadTimeDays);
  const buffer = requireNonNegative("safety_stock", safetyStock);
  return demand * leadTime + buffer;
}

/** SS = z * sigma_d * sqrt(LT). See inventory.safety_stock.service_level. */
export function safetyStockServiceLevel(
  zFactor: number,
  demandStdDev: number,
  leadTimeDays: number,
): number {
  const z = requireNonNegative("z_factor", zFactor);
  const sigma = requireNonNegative("demand_std_dev", demandStdDev);
  const leadTime = requireNonNegative("lead_time_days", leadTimeDays);
  return z * sigma * Math.sqrt(leadTime);
}

/** EOQ = sqrt((2 * D * OC) / (k * UC)). See inventory.eoq.basic. */
export function economicOrderQuantity(
  annualDemand: number,
  orderCost: number,
  carryingRate: number,
  unitCost: number,
): number {
  const demand = requireNonNegative("annual_demand", annualDemand);
  const ordering = requireNonNegative("order_cost", orderCost);
  const rate = requirePositive("carrying_rate", carryingRate);
  const unit = requirePositive("unit_cost", unitCost);
  return Math.sqrt((2 * demand * ordering) / (rate * unit));
}

/** turns = COGS / average inventory value. See inventory.turnover.cogs. */
export function inventoryTurnover(cogs: number, averageInventoryValue: number): number {
  const costOfGoods = requireNonNegative("cogs", cogs);
  const average = requirePositive("average_inventory_value", averageInventoryValue);
  return costOfGoods / average;
}

/** days = available stock / average daily demand. See inventory.days_of_cover.basic. */
export function daysOfCover(availableStock: number, avgDailyDemand: number): number {
  const stock = requireNonNegative("available_stock", availableStock);
  const demand = requirePositive("avg_daily_demand", avgDailyDemand);
  return stock / demand;
}

/** carrying cost = rate * average inventory value. See inventory.carrying_cost.basic. */
export function carryingCost(carryingRate: number, averageInventoryValue: number): number {
  const rate = requireNonNegative("carrying_rate", carryingRate);
  const average = requireNonNegative("average_inventory_value", averageInventoryValue);
  return rate * average;
}
