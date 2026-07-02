import { describe, expect, it } from "vitest";

import {
  CalculationError,
  IncompatibleUnitsError,
  ValidationError,
  requireNonNegative,
  requireNumber,
  requirePositive,
} from "../errors";

describe("error hierarchy", () => {
  it("mirrors the Python exception hierarchy with working instanceof", () => {
    const validation = new ValidationError("boom");
    expect(validation).toBeInstanceOf(ValidationError);
    expect(validation).toBeInstanceOf(CalculationError);
    expect(validation).toBeInstanceOf(Error);

    const incompatible = new IncompatibleUnitsError("boom");
    expect(incompatible).toBeInstanceOf(IncompatibleUnitsError);
    expect(incompatible).toBeInstanceOf(ValidationError);
    expect(incompatible).toBeInstanceOf(CalculationError);
    expect(incompatible).toBeInstanceOf(Error);

    const calculation = new CalculationError("boom");
    expect(calculation).toBeInstanceOf(CalculationError);
    expect(calculation).not.toBeInstanceOf(ValidationError);
  });

  it("sets name for readable stack traces", () => {
    expect(new CalculationError("x").name).toBe("CalculationError");
    expect(new ValidationError("x").name).toBe("ValidationError");
    expect(new IncompatibleUnitsError("x").name).toBe("IncompatibleUnitsError");
  });
});

describe("requireNumber", () => {
  it("returns finite numbers unchanged", () => {
    expect(requireNumber("x", 42)).toBe(42);
    expect(requireNumber("x", -0.5)).toBe(-0.5);
    expect(requireNumber("x", 0)).toBe(0);
  });

  it("rejects booleans explicitly (Python: bool is not a number here)", () => {
    expect(() => requireNumber("x", true)).toThrow(ValidationError);
    expect(() => requireNumber("x", true)).toThrow("x must be a number, got true");
    expect(() => requireNumber("x", false)).toThrow(ValidationError);
  });

  it("rejects non-numbers with the pinned message (strings quoted)", () => {
    expect(() => requireNumber("x", "lots")).toThrow(ValidationError);
    expect(() => requireNumber("x", "lots")).toThrow("x must be a number, got 'lots'");
    expect(() => requireNumber("x", null)).toThrow("x must be a number, got null");
    expect(() => requireNumber("x", undefined)).toThrow("x must be a number, got undefined");
    expect(() => requireNumber("x", {})).toThrow(ValidationError);
  });

  it("rejects NaN and infinities with the finite message", () => {
    expect(() => requireNumber("x", Number.NaN)).toThrow(ValidationError);
    expect(() => requireNumber("x", Number.NaN)).toThrow("x must be finite, got NaN");
    expect(() => requireNumber("x", Number.POSITIVE_INFINITY)).toThrow(
      "x must be finite, got Infinity",
    );
    expect(() => requireNumber("x", Number.NEGATIVE_INFINITY)).toThrow(
      "x must be finite, got -Infinity",
    );
  });
});

describe("requireNonNegative / requirePositive", () => {
  it("accepts boundary values", () => {
    expect(requireNonNegative("x", 0)).toBe(0);
    expect(requireNonNegative("x", 3.5)).toBe(3.5);
    expect(requirePositive("x", 0.001)).toBe(0.001);
  });

  it("rejects out-of-range values with pinned messages", () => {
    expect(() => requireNonNegative("x", -1)).toThrow(ValidationError);
    expect(() => requireNonNegative("x", -1)).toThrow("x must be >= 0, got -1");
    expect(() => requirePositive("x", 0)).toThrow(ValidationError);
    expect(() => requirePositive("x", 0)).toThrow("x must be > 0, got 0");
    expect(() => requirePositive("x", -2)).toThrow("x must be > 0, got -2");
  });
});
