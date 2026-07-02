import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import {
  cbmFromCm,
  chargeableWeight,
  containerFillPct,
  volumetricWeightKg,
  volumetricWeightLb,
} from "../freight";

describe("freight formulas", () => {
  it("cbm from centimetre dimensions", () => {
    expect(cbmFromCm(120, 80, 100, 10)).toBeCloseTo(9.6, 9);
    expect(cbmFromCm(100, 100, 100, 1)).toBe(1);
    expect(cbmFromCm(0, 80, 100, 10)).toBe(0);
  });

  it("volumetric weight in kg (IATA-style divisor)", () => {
    expect(volumetricWeightKg(9_600_000, 6000)).toBeCloseTo(1600, 9);
    expect(volumetricWeightKg(0, 5000)).toBe(0);
  });

  it("volumetric weight in lb (in^3 divisor)", () => {
    expect(volumetricWeightLb(1728, 139)).toBeCloseTo(1728 / 139, 9);
  });

  it("chargeable weight is the max of actual and volumetric", () => {
    expect(chargeableWeight(1200, 1600)).toBe(1600);
    expect(chargeableWeight(2000, 1600)).toBe(2000);
    expect(chargeableWeight(5, 5)).toBe(5);
  });

  it("container fill percentage (can exceed 100)", () => {
    expect(containerFillPct(9.6, 33)).toBeCloseTo((9.6 / 33) * 100, 9);
    expect(containerFillPct(66, 33)).toBeCloseTo(200, 9);
    expect(containerFillPct(0, 33)).toBe(0);
  });
});

describe("freight input guards", () => {
  it("rejects negative dimensions and quantities", () => {
    expect(() => cbmFromCm(-1, 80, 100, 10)).toThrow(ValidationError);
    expect(() => cbmFromCm(120, -1, 100, 10)).toThrow(ValidationError);
    expect(() => cbmFromCm(120, 80, -1, 10)).toThrow(ValidationError);
    expect(() => cbmFromCm(120, 80, 100, -1)).toThrow(ValidationError);
  });

  it("rejects non-positive divisors", () => {
    expect(() => volumetricWeightKg(9_600_000, 0)).toThrow(ValidationError);
    expect(() => volumetricWeightKg(9_600_000, -6000)).toThrow(ValidationError);
    expect(() => volumetricWeightLb(1728, 0)).toThrow(ValidationError);
  });

  it("rejects negative weights", () => {
    expect(() => chargeableWeight(-1, 1600)).toThrow(ValidationError);
    expect(() => chargeableWeight(1200, -1)).toThrow(ValidationError);
  });

  it("rejects non-positive container volumes and negative totals", () => {
    expect(() => containerFillPct(9.6, 0)).toThrow(ValidationError);
    expect(() => containerFillPct(-1, 33)).toThrow(ValidationError);
  });

  it("rejects non-finite values", () => {
    expect(() => cbmFromCm(Number.NaN, 80, 100, 10)).toThrow(ValidationError);
    expect(() => volumetricWeightKg(Number.POSITIVE_INFINITY, 6000)).toThrow(ValidationError);
  });
});
