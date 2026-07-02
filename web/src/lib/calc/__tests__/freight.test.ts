import { describe, expect, it } from "vitest";

import { ValidationError } from "../errors";
import {
  cartonVolumeM3,
  cbmFromCm,
  chargeableWeight,
  containerFillPct,
  cubicFeetFromInches,
  densityPcf,
  girth,
  lengthPlusGirth,
  palletCubeRatio,
  palletLayerFit,
  volumetricWeightKg,
  volumetricWeightLb,
} from "../freight";
import { convert } from "../units";

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

  it("cubic feet from inch dimensions (freight.density.pcf V example)", () => {
    // 48 x 40 x 48 in pallet: 92,160 in^3 / 1728 = 53.33 ft^3.
    expect(cubicFeetFromInches(48, 40, 48, 1)).toBeCloseTo(53.33, 2);
    expect(cubicFeetFromInches(12, 12, 12, 1)).toBe(1);
    expect(cubicFeetFromInches(48, 40, 48, 0)).toBe(0);
  });

  it("density in lb/ft^3 (freight.density.pcf PCF example)", () => {
    expect(densityPcf(500, cubicFeetFromInches(48, 40, 48, 1))).toBeCloseTo(9.375, 2);
    expect(densityPcf(0, 53.33)).toBe(0);
  });

  it("imperial DIM weight via volumetricWeightLb (freight.dim_weight.imperial example)", () => {
    // 30 x 24 x 22 in at divisor 139: 15,840 / 139 = 113.96 lb.
    expect(volumetricWeightLb(30 * 24 * 22 * 1, 139)).toBeCloseTo(113.96, 2);
  });

  it("pallet layer fit (freight.pallet.layer_fit example)", () => {
    const result = palletLayerFit(48, 40, 60, 16, 12, 10);
    expect(result.cpl).toBe(9);
    expect(result.nl).toBe(6);
    expect(result.cases).toBe(54);
    expect(result.utilPct).toBeCloseTo(90, 9);
  });

  it("pallet layer fit floors partial cases (47.9 / 16 -> 2 per row)", () => {
    const result = palletLayerFit(47.9, 40, 60, 16, 12, 10);
    expect(result.cpl).toBe(2 * 3);
    expect(result.nl).toBe(6);
    expect(result.cases).toBe(36);
  });

  it("pallet layer fit handles a zero-size pallet without NaN", () => {
    const result = palletLayerFit(0, 0, 0, 16, 12, 10);
    expect(result.cases).toBe(0);
    expect(result.utilPct).toBe(0);
  });

  it("pallet cube ratio (freight.pallet.cube_ratio example)", () => {
    expect(palletCubeRatio(48, 40, 60, 16, 12, 10)).toBeCloseTo(60, 9);
    expect(palletCubeRatio(0, 40, 60, 16, 12, 10)).toBe(0);
  });

  it("carton volume in m^3, litres, and ft^3 (freight.carton_volume.basic example)", () => {
    const v = cartonVolumeM3(60, 40, 30, 1);
    expect(v).toBeCloseTo(0.072, 9);
    expect(convert(v, "m3", "l")).toBeCloseTo(72, 9);
    expect(convert(v, "m3", "ft3")).toBeCloseTo(2.5425, 3);
  });

  it("carton ft^3 conversion agrees with the units.ts cm^3-per-ft^3 constant", () => {
    // 1 ft^3 = 28,316.846592 cm^3 (units.ts factor map); the direct division
    // and the convert() chain must give the same result.
    const cm3 = 60 * 40 * 30;
    expect(convert(cartonVolumeM3(60, 40, 30, 1), "m3", "ft3")).toBeCloseTo(
      cm3 / 28_316.846592,
      9,
    );
  });

  it("carton volume matches cbmFromCm for the same inputs", () => {
    expect(cartonVolumeM3(120, 80, 100, 10)).toBe(cbmFromCm(120, 80, 100, 10));
  });

  it("girth and length plus girth (freight.girth.length_plus_girth example)", () => {
    expect(girth(30, 20)).toBe(100);
    expect(lengthPlusGirth(40, 30, 20)).toBe(140);
    expect(lengthPlusGirth(0, 0, 0)).toBe(0);
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

  it("rejects negative density inputs and non-positive volumes", () => {
    expect(() => cubicFeetFromInches(-1, 40, 48, 1)).toThrow(ValidationError);
    expect(() => cubicFeetFromInches(48, 40, 48, -1)).toThrow(ValidationError);
    expect(() => densityPcf(-1, 53.33)).toThrow(ValidationError);
    expect(() => densityPcf(500, 0)).toThrow(ValidationError);
    expect(() => densityPcf(500, -1)).toThrow(ValidationError);
  });

  it("rejects non-positive case dimensions for pallet fits", () => {
    expect(() => palletLayerFit(48, 40, 60, 0, 12, 10)).toThrow(ValidationError);
    expect(() => palletLayerFit(48, 40, 60, 16, 0, 10)).toThrow(ValidationError);
    expect(() => palletLayerFit(48, 40, 60, 16, 12, 0)).toThrow(ValidationError);
    expect(() => palletCubeRatio(48, 40, 60, 0, 12, 10)).toThrow(ValidationError);
    expect(() => palletCubeRatio(48, 40, 60, 16, 12, -1)).toThrow(ValidationError);
  });

  it("rejects negative pallet and carton dimensions", () => {
    expect(() => palletLayerFit(-1, 40, 60, 16, 12, 10)).toThrow(ValidationError);
    expect(() => palletCubeRatio(48, -1, 60, 16, 12, 10)).toThrow(ValidationError);
    expect(() => cartonVolumeM3(-1, 40, 30, 1)).toThrow(ValidationError);
    expect(() => cartonVolumeM3(60, 40, 30, -1)).toThrow(ValidationError);
  });

  it("rejects negative girth dimensions", () => {
    expect(() => girth(-1, 20)).toThrow(ValidationError);
    expect(() => girth(30, -1)).toThrow(ValidationError);
    expect(() => lengthPlusGirth(-1, 30, 20)).toThrow(ValidationError);
  });
});
