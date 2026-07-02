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
import * as pricing from "./pricing";
import { convert } from "./units";

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
  "freight.density.pcf": {
    // V (ft^3) is derived from the inch dimensions first; the density guard
    // (volume must be > 0) is what makes L/W/H/Q strictly positive.
    compute: (i) => {
      const V = freight.cubicFeetFromInches(req(i, "L"), req(i, "W"), req(i, "H"), req(i, "Q"));
      return { V, PCF: freight.densityPcf(req(i, "AW"), V) };
    },
    positiveInputs: ["L", "W", "H", "Q"],
  },
  "freight.dim_weight.imperial": {
    // Record inputs are per-carton inch dimensions; the library function takes
    // total volume in in^3, so the volume is assembled here (CBM precedent).
    compute: (i) => ({
      DW: freight.volumetricWeightLb(
        req(i, "L") * req(i, "W") * req(i, "H") * req(i, "Q"),
        req(i, "divisor"),
      ),
    }),
    positiveInputs: ["divisor"],
  },
  "freight.pallet.layer_fit": {
    compute: (i) => {
      const fit = freight.palletLayerFit(
        req(i, "PL"),
        req(i, "PW"),
        req(i, "PH"),
        req(i, "CL"),
        req(i, "CW"),
        req(i, "CH"),
      );
      return { CPL: fit.cpl, NL: fit.nl, cases: fit.cases, util_pct: fit.utilPct };
    },
    positiveInputs: ["CL", "CW", "CH"],
  },
  "freight.pallet.cube_ratio": {
    compute: (i) => ({
      cube_cases: freight.palletCubeRatio(
        req(i, "PL"),
        req(i, "PW"),
        req(i, "PH"),
        req(i, "CL"),
        req(i, "CW"),
        req(i, "CH"),
      ),
    }),
    positiveInputs: ["CL", "CW", "CH"],
  },
  "freight.carton_volume.basic": {
    compute: (i) => {
      const vM3 = freight.cartonVolumeM3(req(i, "L"), req(i, "W"), req(i, "H"), req(i, "Q"));
      return {
        V_m3: vM3,
        V_l: convert(vM3, "m3", "l"),
        V_ft3: convert(vM3, "m3", "ft3"),
      };
    },
    positiveInputs: [],
  },
  "freight.girth.length_plus_girth": {
    compute: (i) => ({
      G: freight.girth(req(i, "W"), req(i, "H")),
      LG: freight.lengthPlusGirth(req(i, "L"), req(i, "W"), req(i, "H")),
    }),
    positiveInputs: [],
  },
  "pricing.margin.basic": {
    compute: (i) => {
      const result = pricing.marginBasic(req(i, "P"), req(i, "C"));
      return { profit: result.profit, margin_pct: result.marginPct };
    },
    positiveInputs: ["P"],
  },
  "pricing.markup.basic": {
    compute: (i) => {
      const result = pricing.markupBasic(req(i, "C"), req(i, "markup_pct"));
      return { price: result.price, profit: result.profit, margin_pct: result.marginPct };
    },
    positiveInputs: [],
  },
  "pricing.break_even.units": {
    // The contribution-margin guard (P - VC must be > 0) means P can never be
    // zero, so P is surfaced to UI validation as strictly positive.
    compute: (i) => {
      const result = pricing.breakEvenUnits(req(i, "FC"), req(i, "P"), req(i, "VC"));
      return {
        CM: result.contributionMargin,
        BE_units: result.breakEvenUnits,
        BE_revenue: result.breakEvenRevenue,
      };
    },
    positiveInputs: ["P"],
  },
  "pricing.discount.impact": {
    // The discounted-profit guard (P_d must exceed C) means P can never be
    // zero, so P is surfaced to UI validation as strictly positive.
    compute: (i) => {
      const result = pricing.discountImpact(req(i, "P"), req(i, "C"), req(i, "disc_pct"));
      return {
        P_d: result.discountedPrice,
        new_margin_pct: result.newMarginPct,
        uplift_pct: result.upliftPct,
      };
    },
    positiveInputs: ["P"],
  },
  "pricing.landed_cost.per_unit": {
    compute: (i) => {
      const result = pricing.landedCostPerUnit(
        req(i, "goods"),
        req(i, "freight"),
        req(i, "insurance"),
        req(i, "duty_pct"),
        req(i, "other"),
        req(i, "units"),
      );
      return { duty: result.duty, LC: result.landedCost, LC_unit: result.landedCostPerUnit };
    },
    positiveInputs: ["units"],
  },
  "inventory.stockout_cost.basic": {
    compute: (i) => {
      const result = inventory.stockoutCost(
        req(i, "units_short"),
        req(i, "GM_unit"),
        req(i, "penalty"),
      );
      return { lost_margin: result.lostMargin, stockout_cost: result.stockoutCost };
    },
    positiveInputs: [],
  },
  "inventory.safety_stock.lead_time_variability": {
    compute: (i) => {
      const result = inventory.safetyStockLeadTimeVariability(
        req(i, "z"),
        req(i, "D"),
        req(i, "sigma_d"),
        req(i, "LT"),
        req(i, "sigma_LT"),
      );
      return { sigma_L: result.sigmaL, SS: result.ss };
    },
    positiveInputs: [],
  },
  "inventory.periodic_review.order_up_to": {
    compute: (i) => {
      const result = inventory.periodicReviewOrderUpTo(
        req(i, "D"),
        req(i, "LT"),
        req(i, "T"),
        req(i, "z"),
        req(i, "sigma_d"),
      );
      return { SS: result.ss, TI: result.ti };
    },
    positiveInputs: [],
  },
  "inventory.abc.share": {
    compute: (i) => ({
      share_pct: inventory.abcShare(req(i, "V_i"), req(i, "V_total")),
    }),
    positiveInputs: ["V_total"],
  },
};
