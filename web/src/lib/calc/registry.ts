/**
 * Bind formula record ids to calculation functions.
 *
 * This registry is the traceability contract between `data/formulas/` records
 * and `lib/calc`: each entry maps a record `id` to a `compute` function that
 * consumes the record's example `inputs` (keyed by input symbol) and returns
 * an object keyed by output symbol. Tests use it to run every record's worked
 * examples through the real library, so every published result traces to a
 * corpus example.
 *
 * `positiveInputs` is the machine-readable mirror of the library's `> 0`
 * guards (the symbols whose value must be strictly positive), consumed by UI
 * validation.
 *
 * TypeScript port of `src/calc/registry.py`.
 */

import { ValidationError } from "./errors";
import * as freight from "./freight";
import * as inventory from "./inventory";

export interface RegistryEntry {
  compute(inputs: Record<string, number>): Record<string, number>;
  positiveInputs: readonly string[];
}

/** Look up a required input symbol; throw a clear error when it is missing. */
function req(inputs: Record<string, number>, symbol: string): number {
  if (!Object.prototype.hasOwnProperty.call(inputs, symbol)) {
    throw new ValidationError(`missing required input symbol: ${symbol}`);
  }
  return inputs[symbol];
}

export const FORMULA_REGISTRY: Record<string, RegistryEntry> = {
  "inventory.reorder_point.basic": {
    compute: (i) => ({
      ROP: inventory.reorderPoint(req(i, "D"), req(i, "LT"), req(i, "SS")),
    }),
    positiveInputs: [],
  },
  "inventory.safety_stock.service_level": {
    compute: (i) => ({
      SS: inventory.safetyStockServiceLevel(req(i, "z"), req(i, "sigma_d"), req(i, "LT")),
    }),
    positiveInputs: [],
  },
  "inventory.eoq.basic": {
    compute: (i) => ({
      EOQ: inventory.economicOrderQuantity(req(i, "D"), req(i, "OC"), req(i, "k"), req(i, "UC")),
    }),
    positiveInputs: ["k", "UC"],
  },
  "inventory.turnover.cogs": {
    compute: (i) => ({
      turns: inventory.inventoryTurnover(req(i, "COGS"), req(i, "avg_inv")),
    }),
    positiveInputs: ["avg_inv"],
  },
  "inventory.days_of_cover.basic": {
    compute: (i) => ({
      days: inventory.daysOfCover(req(i, "stock"), req(i, "D")),
    }),
    positiveInputs: ["D"],
  },
  "inventory.carrying_cost.basic": {
    compute: (i) => ({
      carrying_cost: inventory.carryingCost(req(i, "rate"), req(i, "avg_inv")),
    }),
    positiveInputs: [],
  },
  "freight.cbm.basic": {
    compute: (i) => ({
      CBM: freight.cbmFromCm(req(i, "L"), req(i, "W"), req(i, "H"), req(i, "Q")),
    }),
    positiveInputs: [],
  },
  "freight.volumetric_weight.divisor": {
    // Record inputs are per-carton cm dimensions; the library function takes
    // total volume in cm^3, so the volume is assembled here.
    compute: (i) => ({
      VW: freight.volumetricWeightKg(
        req(i, "L") * req(i, "W") * req(i, "H") * req(i, "Q"),
        req(i, "divisor"),
      ),
    }),
    positiveInputs: ["divisor"],
  },
  "freight.chargeable_weight.basic": {
    compute: (i) => ({
      CW: freight.chargeableWeight(req(i, "AW"), req(i, "VW")),
    }),
    positiveInputs: [],
  },
};
