// Ported from tests/test_calc_inventory.py.
import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import {
  abcShare,
  carryingCost,
  daysOfCover,
  economicOrderQuantity,
  inventoryTurnover,
  periodicReviewOrderUpTo,
  reorderPoint,
  safetyStockLeadTimeVariability,
  safetyStockServiceLevel,
  stockoutCost,
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

  it("safety stock with lead-time variability (Exercise 8.5)", () => {
    const { sigmaL, ss } = safetyStockLeadTimeVariability(1.65, 250, 85, 9, 5);
    expect(sigmaL).toBeCloseTo(Math.sqrt(9 * 85 ** 2 + 250 ** 2 * 5 ** 2), 9);
    expect(Math.abs(sigmaL - 1275.74)).toBeLessThanOrEqual(1);
    expect(Math.abs(ss - 2105)).toBeLessThanOrEqual(1);
  });

  it("lead-time variability form reduces to the service-level form when sigma_LT is 0", () => {
    const { sigmaL, ss } = safetyStockLeadTimeVariability(1.64, 20, 3, 15, 0);
    expect(sigmaL).toBeCloseTo(3 * Math.sqrt(15), 9);
    expect(ss).toBeCloseTo(safetyStockServiceLevel(1.64, 3, 15), 9);
  });

  it("stockout cost", () => {
    expect(stockoutCost(120, 18, 500)).toEqual({ lostMargin: 2160, stockoutCost: 2660 });
  });

  it("stockout cost defaults penalty to zero", () => {
    expect(stockoutCost(120, 18)).toEqual({ lostMargin: 2160, stockoutCost: 2160 });
  });

  it("periodic review order-up-to level", () => {
    const { ss, ti } = periodicReviewOrderUpTo(20, 5, 10, 1.64, 4);
    expect(ss).toBeCloseTo(1.64 * 4 * Math.sqrt(15), 9);
    expect(Math.abs(ss - 25.4)).toBeLessThanOrEqual(0.1);
    expect(Math.abs(ti - 325.4)).toBeLessThanOrEqual(0.1);
  });

  it("abc share of total usage value", () => {
    expect(abcShare(54_000, 100_000)).toBe(54);
  });
});

describe("input guards", () => {
  it("rejects negative inputs", () => {
    expect(() => reorderPoint(-1, 4, 0)).toThrow(ValidationError);
    expect(() => safetyStockLeadTimeVariability(-1.65, 250, 85, 9, 5)).toThrow(ValidationError);
    expect(() => stockoutCost(120, 18, -1)).toThrow(ValidationError);
    expect(() => periodicReviewOrderUpTo(20, 5, 10, -1.64, 4)).toThrow(ValidationError);
    expect(() => abcShare(-1, 100)).toThrow(ValidationError);
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
    expect(() => abcShare(54_000, 0)).toThrow(ValidationError);
  });

  it("rejects infinite inputs", () => {
    expect(() => carryingCost(0.2, Number.POSITIVE_INFINITY)).toThrow(ValidationError);
  });
});
