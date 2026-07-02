import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import { FORMULA_REGISTRY } from "../registry";

/** Required input symbols per registry entry (ten inventory + nine freight + five pricing). */
const REQUIRED_SYMBOLS: Record<string, readonly string[]> = {
  "inventory.reorder_point.basic": ["D", "LT", "SS"],
  "inventory.safety_stock.service_level": ["z", "sigma_d", "LT"],
  "inventory.eoq.basic": ["D", "OC", "k", "UC"],
  "inventory.turnover.cogs": ["COGS", "avg_inv"],
  "inventory.days_of_cover.basic": ["stock", "D"],
  "inventory.carrying_cost.basic": ["rate", "avg_inv"],
  "inventory.stockout_cost.basic": ["units_short", "GM_unit", "penalty"],
  "inventory.safety_stock.lead_time_variability": ["z", "D", "sigma_d", "LT", "sigma_LT"],
  "inventory.periodic_review.order_up_to": ["D", "LT", "T", "z", "sigma_d"],
  "inventory.abc.share": ["V_i", "V_total"],
  "freight.cbm.basic": ["L", "W", "H", "Q"],
  "freight.volumetric_weight.divisor": ["L", "W", "H", "Q", "divisor"],
  "freight.chargeable_weight.basic": ["VW", "AW"],
  "freight.density.pcf": ["L", "W", "H", "Q", "AW"],
  "freight.dim_weight.imperial": ["L", "W", "H", "Q", "divisor"],
  "freight.pallet.layer_fit": ["PL", "PW", "PH", "CL", "CW", "CH"],
  "freight.pallet.cube_ratio": ["PL", "PW", "PH", "CL", "CW", "CH"],
  "freight.carton_volume.basic": ["L", "W", "H", "Q"],
  "freight.girth.length_plus_girth": ["L", "W", "H"],
  "pricing.margin.basic": ["P", "C"],
  "pricing.markup.basic": ["C", "markup_pct"],
  "pricing.break_even.units": ["FC", "P", "VC"],
  "pricing.discount.impact": ["P", "C", "disc_pct"],
  "pricing.landed_cost.per_unit": ["goods", "freight", "insurance", "duty_pct", "other", "units"],
};

function inputsWith(symbols: readonly string[], overrides: Record<string, number>) {
  const inputs: Record<string, number> = {};
  for (const symbol of symbols) {
    inputs[symbol] = 1;
  }
  return { ...inputs, ...overrides };
}

describe("FORMULA_REGISTRY", () => {
  it("has exactly the ten inventory + nine freight + five pricing entries", () => {
    expect(Object.keys(FORMULA_REGISTRY).sort()).toEqual(Object.keys(REQUIRED_SYMBOLS).sort());
  });

  it("declares the expected positiveInputs per entry", () => {
    expect(FORMULA_REGISTRY["inventory.reorder_point.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.safety_stock.service_level"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.eoq.basic"].positiveInputs).toEqual(["k", "UC"]);
    expect(FORMULA_REGISTRY["inventory.turnover.cogs"].positiveInputs).toEqual(["avg_inv"]);
    expect(FORMULA_REGISTRY["inventory.days_of_cover.basic"].positiveInputs).toEqual(["D"]);
    expect(FORMULA_REGISTRY["inventory.carrying_cost.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.stockout_cost.basic"].positiveInputs).toEqual([]);
    expect(
      FORMULA_REGISTRY["inventory.safety_stock.lead_time_variability"].positiveInputs,
    ).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.periodic_review.order_up_to"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.abc.share"].positiveInputs).toEqual(["V_total"]);
    expect(FORMULA_REGISTRY["freight.cbm.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["freight.volumetric_weight.divisor"].positiveInputs).toEqual([
      "divisor",
    ]);
    expect(FORMULA_REGISTRY["freight.chargeable_weight.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["freight.density.pcf"].positiveInputs).toEqual(["L", "W", "H", "Q"]);
    expect(FORMULA_REGISTRY["freight.dim_weight.imperial"].positiveInputs).toEqual(["divisor"]);
    expect(FORMULA_REGISTRY["freight.pallet.layer_fit"].positiveInputs).toEqual([
      "CL",
      "CW",
      "CH",
    ]);
    expect(FORMULA_REGISTRY["freight.pallet.cube_ratio"].positiveInputs).toEqual([
      "CL",
      "CW",
      "CH",
    ]);
    expect(FORMULA_REGISTRY["freight.carton_volume.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["freight.girth.length_plus_girth"].positiveInputs).toEqual([]);
    // Break-even and discount expose P as strictly positive: their compute
    // guards (CM > 0, discounted profit > 0) can never pass with P = 0.
    expect(FORMULA_REGISTRY["pricing.margin.basic"].positiveInputs).toEqual(["P"]);
    expect(FORMULA_REGISTRY["pricing.markup.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["pricing.break_even.units"].positiveInputs).toEqual(["P"]);
    expect(FORMULA_REGISTRY["pricing.discount.impact"].positiveInputs).toEqual(["P"]);
    expect(FORMULA_REGISTRY["pricing.landed_cost.per_unit"].positiveInputs).toEqual(["units"]);
  });

  for (const [id, symbols] of Object.entries(REQUIRED_SYMBOLS)) {
    const entry = FORMULA_REGISTRY[id];

    it(`${id}: zero throws ValidationError for each positiveInputs symbol`, () => {
      for (const symbol of entry.positiveInputs) {
        expect(symbols).toContain(symbol);
        expect(() => entry.compute(inputsWith(symbols, { [symbol]: 0 }))).toThrow(
          ValidationError,
        );
      }
    });

    it(`${id}: zero is accepted for every non-positive-only symbol`, () => {
      const zeros: Record<string, number> = {};
      for (const symbol of symbols) {
        zeros[symbol] = entry.positiveInputs.includes(symbol) ? 1 : 0;
      }
      expect(() => entry.compute(zeros)).not.toThrow();
    });

    it(`${id}: a missing required symbol throws with a clear message`, () => {
      for (const symbol of symbols) {
        const inputs = inputsWith(symbols, {});
        delete inputs[symbol];
        expect(() => entry.compute(inputs)).toThrow(ValidationError);
        expect(() => entry.compute(inputs)).toThrow(
          `missing required input symbol: ${symbol}`,
        );
      }
    });
  }
});
