import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import { FORMULA_REGISTRY } from "../registry";

/** Required input symbols per registry entry (mirrors src/calc/registry.py). */
const REQUIRED_SYMBOLS: Record<string, readonly string[]> = {
  "inventory.reorder_point.basic": ["D", "LT", "SS"],
  "inventory.safety_stock.service_level": ["z", "sigma_d", "LT"],
  "inventory.eoq.basic": ["D", "OC", "k", "UC"],
  "inventory.turnover.cogs": ["COGS", "avg_inv"],
  "inventory.days_of_cover.basic": ["stock", "D"],
  "inventory.carrying_cost.basic": ["rate", "avg_inv"],
};

function inputsWith(symbols: readonly string[], overrides: Record<string, number>) {
  const inputs: Record<string, number> = {};
  for (const symbol of symbols) {
    inputs[symbol] = 1;
  }
  return { ...inputs, ...overrides };
}

describe("FORMULA_REGISTRY", () => {
  it("has exactly the six inventory entries", () => {
    expect(Object.keys(FORMULA_REGISTRY).sort()).toEqual(Object.keys(REQUIRED_SYMBOLS).sort());
  });

  it("declares the expected positiveInputs per entry", () => {
    expect(FORMULA_REGISTRY["inventory.reorder_point.basic"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.safety_stock.service_level"].positiveInputs).toEqual([]);
    expect(FORMULA_REGISTRY["inventory.eoq.basic"].positiveInputs).toEqual(["k", "UC"]);
    expect(FORMULA_REGISTRY["inventory.turnover.cogs"].positiveInputs).toEqual(["avg_inv"]);
    expect(FORMULA_REGISTRY["inventory.days_of_cover.basic"].positiveInputs).toEqual(["D"]);
    expect(FORMULA_REGISTRY["inventory.carrying_cost.basic"].positiveInputs).toEqual([]);
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
