// Ported from tests/test_calc_inventory.py.
import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import {
  carryingCost,
  daysOfCover,
  economicOrderQuantity,
  inventoryTurnover,
  reorderPoint,
  safetyStockServiceLevel,
} from "../inventory";

describe("inventory formulas", () => {
  it("reorder point basic", () => {
    expect(reorderPoint(10, 4, 0)).toBe(40);
    expect(reorderPoint(10, 15, 19)).toBe(169);
  });

  it("reorder point defaults safety stock to zero", () => {
    expect(reorderPoint(10, 4)).toBe(40);
  });

  it("safety stock at a service level", () => {
    const result = safetyStockServiceLevel(1.64, 3, 15);
    expect(result).toBeCloseTo(1.64 * 3 * Math.sqrt(15), 9);
    expect(Math.round(result)).toBe(19);
  });

  it("economic order quantity", () => {
    const result = economicOrderQuantity(20000, 125, 0.21, 34);
    expect(Math.abs(result - 836.83)).toBeLessThanOrEqual(0.01);
  });

  it("inventory turnover", () => {
    expect(inventoryTurnover(150_000_000, 30_000_000)).toBe(5);
  });

  it("days of cover", () => {
    expect(daysOfCover(600, 100)).toBe(6);
  });

  it("carrying cost", () => {
    expect(carryingCost(0.26, 2_000_000)).toBe(520_000);
  });
});

describe("input guards", () => {
  it("rejects negative inputs", () => {
    expect(() => reorderPoint(-1, 4, 0)).toThrow(ValidationError);
  });

  it("rejects non-numeric inputs", () => {
    expect(() => inventoryTurnover("lots" as unknown as number, 30)).toThrow(ValidationError);
  });

  it("rejects booleans as numbers", () => {
    expect(() => carryingCost(true as unknown as number, 2_000_000)).toThrow(ValidationError);
  });

  it("rejects zero divisors", () => {
    expect(() => inventoryTurnover(100, 0)).toThrow(ValidationError);
    expect(() => daysOfCover(100, 0)).toThrow(ValidationError);
    expect(() => economicOrderQuantity(100, 10, 0, 5)).toThrow(ValidationError);
  });

  it("rejects infinite inputs", () => {
    expect(() => carryingCost(0.2, Number.POSITIVE_INFINITY)).toThrow(ValidationError);
  });
});
