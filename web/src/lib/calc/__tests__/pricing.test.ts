import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import {
  breakEvenUnits,
  discountImpact,
  landedCostPerUnit,
  marginBasic,
  markupBasic,
} from "../pricing";

describe("pricing formulas", () => {
  it("gross margin from price and cost (record example)", () => {
    // pricing.margin.basic: inverts the corpus 25-cost/10%-margin example.
    const result = marginBasic(27.78, 25);
    expect(result.profit).toBeCloseTo(2.78, 9);
    expect(result.marginPct).toBeCloseTo(10.01, 2);
  });

  it("margin is zero at cost and 100% at zero cost", () => {
    expect(marginBasic(50, 50).marginPct).toBe(0);
    expect(marginBasic(50, 0).marginPct).toBe(100);
  });

  it("cost-plus markup (record example)", () => {
    // pricing.markup.basic: 25% markup on a 100 cost.
    const result = markupBasic(100, 25);
    expect(result.price).toBe(125);
    expect(result.profit).toBe(25);
    expect(result.marginPct).toBe(20);
  });

  it("markup and margin are different: 25% markup = 20% margin", () => {
    const viaMarkup = markupBasic(100, 25);
    const viaMargin = marginBasic(viaMarkup.price, 100);
    expect(viaMarkup.marginPct).toBeCloseTo(20, 9);
    expect(viaMargin.marginPct).toBeCloseTo(20, 9);
    expect(viaMargin.profit).toBeCloseTo(viaMarkup.profit, 9);
  });

  it("break-even point in units and revenue (record example)", () => {
    // pricing.break_even.units: 50,000 fixed, 25 price, 15 variable.
    const result = breakEvenUnits(50000, 25, 15);
    expect(result.contributionMargin).toBe(10);
    expect(result.breakEvenUnits).toBe(5000);
    expect(result.breakEvenRevenue).toBe(125000);
  });

  it("break-even is zero units with zero fixed costs", () => {
    const result = breakEvenUnits(0, 25, 15);
    expect(result.breakEvenUnits).toBe(0);
    expect(result.breakEvenRevenue).toBe(0);
  });

  it("discount impact on price, margin, and required uplift (record example)", () => {
    // pricing.discount.impact: 10% off a 100 price / 60 cost item.
    const result = discountImpact(100, 60, 10);
    expect(result.discountedPrice).toBeCloseTo(90, 9);
    expect(result.newMarginPct).toBeCloseTo(33.33, 2);
    expect(result.upliftPct).toBeCloseTo(33.33, 2);
  });

  it("zero discount leaves margin unchanged and needs no uplift", () => {
    const result = discountImpact(100, 60, 0);
    expect(result.discountedPrice).toBe(100);
    expect(result.newMarginPct).toBeCloseTo(40, 9);
    expect(result.upliftPct).toBeCloseTo(0, 9);
  });

  it("landed cost per unit (record example)", () => {
    // pricing.landed_cost.per_unit: 10,000 goods + 1,200 freight + 100
    // insurance + 5% duty + 200 other across 500 units.
    const result = landedCostPerUnit(10000, 1200, 100, 5, 200, 500);
    expect(result.duty).toBe(500);
    expect(result.landedCost).toBe(12000);
    expect(result.landedCostPerUnit).toBe(24);
  });

  it("landed cost with all optional components at zero is goods / units", () => {
    const result = landedCostPerUnit(10000, 0, 0, 0, 0, 500);
    expect(result.duty).toBe(0);
    expect(result.landedCost).toBe(10000);
    expect(result.landedCostPerUnit).toBe(20);
  });
});

describe("pricing input guards", () => {
  it("margin rejects a zero or negative selling price (division guard)", () => {
    expect(() => marginBasic(0, 25)).toThrow(ValidationError);
    expect(() => marginBasic(-1, 25)).toThrow(ValidationError);
    expect(() => marginBasic(0, 25)).toThrow(/selling_price must be > 0/);
  });

  it("margin and markup reject negative costs and markups", () => {
    expect(() => marginBasic(27.78, -1)).toThrow(ValidationError);
    expect(() => markupBasic(-1, 25)).toThrow(ValidationError);
    expect(() => markupBasic(100, -5)).toThrow(ValidationError);
  });

  it("break-even rejects zero or negative contribution margin", () => {
    expect(() => breakEvenUnits(50000, 15, 15)).toThrow(ValidationError);
    expect(() => breakEvenUnits(50000, 10, 15)).toThrow(ValidationError);
    expect(() => breakEvenUnits(50000, 15, 15)).toThrow(
      /price must exceed variable cost per unit/,
    );
  });

  it("break-even rejects negative inputs", () => {
    expect(() => breakEvenUnits(-1, 25, 15)).toThrow(ValidationError);
    expect(() => breakEvenUnits(50000, -1, 15)).toThrow(ValidationError);
    expect(() => breakEvenUnits(50000, 25, -1)).toThrow(ValidationError);
  });

  it("discount rejects discounts over 100% and negative inputs", () => {
    expect(() => discountImpact(100, 60, 101)).toThrow(ValidationError);
    expect(() => discountImpact(100, 60, 101)).toThrow(/discount_pct must be <= 100/);
    expect(() => discountImpact(-1, 60, 10)).toThrow(ValidationError);
    expect(() => discountImpact(100, -1, 10)).toThrow(ValidationError);
    expect(() => discountImpact(100, 60, -1)).toThrow(ValidationError);
  });

  it("discount rejects discounts at or beyond the margin (loss-making)", () => {
    // 40% off a 100 price / 60 cost item prices exactly at cost.
    expect(() => discountImpact(100, 60, 40)).toThrow(ValidationError);
    expect(() => discountImpact(100, 60, 50)).toThrow(ValidationError);
    expect(() => discountImpact(100, 60, 40)).toThrow(
      /discounted price must exceed unit cost/,
    );
  });

  it("landed cost rejects zero units and negative components", () => {
    expect(() => landedCostPerUnit(10000, 1200, 100, 5, 200, 0)).toThrow(ValidationError);
    expect(() => landedCostPerUnit(10000, 1200, 100, 5, 200, 0)).toThrow(/units must be > 0/);
    expect(() => landedCostPerUnit(-1, 1200, 100, 5, 200, 500)).toThrow(ValidationError);
    expect(() => landedCostPerUnit(10000, -1, 100, 5, 200, 500)).toThrow(ValidationError);
    expect(() => landedCostPerUnit(10000, 1200, -1, 5, 200, 500)).toThrow(ValidationError);
    expect(() => landedCostPerUnit(10000, 1200, 100, -1, 200, 500)).toThrow(ValidationError);
    expect(() => landedCostPerUnit(10000, 1200, 100, 5, -1, 500)).toThrow(ValidationError);
  });

  it("guard failures are ValidationError instances (instanceof contract)", () => {
    try {
      breakEvenUnits(50000, 10, 15);
      expect.unreachable("breakEvenUnits should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
    try {
      discountImpact(100, 60, 50);
      expect.unreachable("discountImpact should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  it("rejects non-finite values", () => {
    expect(() => marginBasic(Number.NaN, 25)).toThrow(ValidationError);
    expect(() => breakEvenUnits(Number.POSITIVE_INFINITY, 25, 15)).toThrow(ValidationError);
  });
});
