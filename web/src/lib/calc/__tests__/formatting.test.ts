// Ported from tests/test_calc_formatting.py, plus rounding-tie pins verified
// against Python:
//   uv run python -c "print(round(0.5), round(1.5), round(2.5), round(0.125,2),
//                            round(2.675,2), round(836.827,2), round(-2.5))"
//   -> 0 2 2 0.12 2.67 836.83 -2
import { describe, expect, it } from "vitest";

import { CalculationError, ValidationError } from "../errors";
import { formatResult, roundResult } from "../formatting";

describe("roundResult", () => {
  it("rounds to the given precision", () => {
    expect(roundResult(836.827, 2)).toBe(836.83);
    expect(roundResult(5.0, 2)).toBe(5.0);
  });

  it("normalises negative zero", () => {
    expect(roundResult(-0.0001, 2)).toBe(0.0);
    expect(Object.is(roundResult(-0.0001, 2), 0)).toBe(true);
    expect(Object.is(roundResult(-0.0001, 2), -0)).toBe(false);
    expect(Object.is(roundResult(-0.0), 0)).toBe(true);
    expect(Object.is(roundResult(-0.0), -0)).toBe(false);
  });

  it("matches Python round() half-to-even ties (verified pins)", () => {
    expect(roundResult(0.5, 0)).toBe(0);
    expect(roundResult(1.5, 0)).toBe(2);
    expect(roundResult(2.5, 0)).toBe(2);
    expect(roundResult(0.125, 2)).toBe(0.12);
    // Python round(2.675, 2) == 2.67 — the double 2.675 is 2.67499999...
    expect(roundResult(2.675, 2)).toBe(2.67);
    expect(roundResult(836.827, 2)).toBe(836.83);
    expect(roundResult(-2.5, 0)).toBe(-2);
  });

  it("defaults to two decimals", () => {
    expect(roundResult(1.005)).toBe(1.0); // double 1.005 is 1.00499999...
    expect(roundResult(1.2345)).toBe(1.23);
  });

  it("throws a plain Error (not ValidationError) on negative precision", () => {
    expect(() => roundResult(1.0, -1)).toThrow("precision must be >= 0");
    try {
      roundResult(1.0, -1);
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).not.toBeInstanceOf(CalculationError);
    }
  });

  it("guards the value through requireNumber", () => {
    expect(() => roundResult(Number.NaN, 2)).toThrow(ValidationError);
    expect(() => roundResult(Number.POSITIVE_INFINITY, 2)).toThrow(ValidationError);
  });
});

describe("formatResult", () => {
  it("trims trailing zeros", () => {
    expect(formatResult(40.0, "units")).toBe("40 units");
    expect(formatResult(836.827, "units", 2)).toBe("836.83 units");
    expect(formatResult(5.5, "days", 2)).toBe("5.5 days");
  });

  it("works without a unit", () => {
    expect(formatResult(6.0)).toBe("6");
  });

  it("handles zero precision", () => {
    expect(formatResult(836.827, "units", 0)).toBe("837 units");
  });
});
