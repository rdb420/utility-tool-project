// Ported from tests/test_calc_units.py.
import { describe, expect, it } from "vitest";

import { IncompatibleUnitsError, ValidationError } from "../errors";
import { convert, dimensionOf } from "../units";

describe("convert", () => {
  it("length conversions", () => {
    expect(convert(1, "in", "cm")).toBeCloseTo(2.54, 9);
    expect(convert(1, "ft", "in")).toBeCloseTo(12.0, 9);
    expect(convert(100, "cm", "m")).toBeCloseTo(1.0, 9);
  });

  it("weight conversions", () => {
    expect(convert(1, "lb", "kg")).toBeCloseTo(0.45359237, 9);
    expect(convert(1000, "g", "kg")).toBeCloseTo(1.0, 9);
  });

  it("volume conversions", () => {
    expect(convert(1, "m3", "cm3")).toBeCloseTo(1_000_000.0, 6);
    expect(Math.abs(convert(1, "ft3", "in3") - 1728.0)).toBeLessThanOrEqual(0.01);
  });

  it("same unit is identity", () => {
    expect(convert(42, "kg", "kg")).toBe(42);
  });

  it("rejects incompatible dimensions", () => {
    expect(() => convert(1, "kg", "cm")).toThrow(IncompatibleUnitsError);
    expect(() => convert(1, "kg", "cm")).toThrow("cannot convert kg (weight) to cm (length)");
  });

  it("rejects unknown units", () => {
    expect(() => convert(1, "furlong", "cm")).toThrow(ValidationError);
    expect(() => convert(1, "furlong", "cm")).toThrow("unknown unit: 'furlong'");
  });

  it("rejects negative values", () => {
    expect(() => convert(-1, "kg", "g")).toThrow(ValidationError);
  });
});

describe("dimensionOf", () => {
  it("dimension lookup", () => {
    expect(dimensionOf("in")).toBe("length");
    expect(dimensionOf("lb")).toBe("weight");
    expect(dimensionOf("m3")).toBe("volume");
  });

  it("rejects unknown units", () => {
    expect(() => dimensionOf("furlong")).toThrow(ValidationError);
  });
});
