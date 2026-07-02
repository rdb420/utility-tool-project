/**
 * Result rounding and display formatting for calculator outputs.
 *
 * TypeScript port of `src/calc/formatting.py`. `roundResult` reproduces
 * Python's built-in `round()` semantics: round-half-to-even evaluated on the
 * double's true decimal value (so `roundResult(2.675, 2) === 2.67`, because
 * the IEEE-754 double 2.675 is actually 2.67499999...).
 */

import { requireNumber } from "./errors";

/**
 * Half-to-even rounding on the decimal expansion of `value`.
 *
 * Strategy: take a long, correctly-rounded decimal expansion of |value| via
 * toFixed(precision + 30) (toFixed caps at 100 fraction digits), inspect the
 * digits after the target position — greater than "5000..." rounds up, less
 * rounds down, an exact tie rounds the target digit to even — then reassemble
 * with the sign. A double deviates from an exact decimal tie within ~17
 * significant digits, so 30 guard digits are ample.
 */
function roundHalfToEven(value: number, precision: number): number {
  const abs = Math.abs(value);
  // toFixed switches to exponential notation at 1e21; rounding to >= 0
  // decimals is the identity there anyway (matches Python round()).
  if (abs >= 1e21) {
    return value;
  }
  const digitsAfter = Math.min(precision + 30, 100);
  if (digitsAfter < precision) {
    // precision > 100: beyond double resolution for any in-domain value.
    return value;
  }
  const [intPart, fracPart = ""] = abs.toFixed(digitsAfter).split(".");
  const kept = fracPart.slice(0, precision);
  const tail = fracPart.slice(precision);
  let digits = intPart + kept; // digit string; numeric value = digits * 10^-precision

  let roundUp = false;
  if (tail.length > 0 && !/^0+$/.test(tail)) {
    const half = "5".padEnd(tail.length, "0");
    if (tail > half) {
      roundUp = true;
    } else if (tail < half) {
      roundUp = false;
    } else {
      // Exact tie: round the last kept digit to even.
      roundUp = (digits.charCodeAt(digits.length - 1) - 48) % 2 === 1;
    }
  }

  if (roundUp) {
    const chars = digits.split("");
    let i = chars.length - 1;
    while (i >= 0 && chars[i] === "9") {
      chars[i] = "0";
      i -= 1;
    }
    if (i >= 0) {
      chars[i] = String(Number(chars[i]) + 1);
    } else {
      chars.unshift("1");
    }
    digits = chars.join("");
  }

  const intLen = digits.length - precision;
  const text = precision === 0 ? digits : `${digits.slice(0, intLen)}.${digits.slice(intLen)}`;
  return value < 0 ? -Number(text) : Number(text);
}

/** Round to `precision` decimals (Python round() semantics); normalise -0 to 0. */
export function roundResult(value: number, precision = 2): number {
  const number = requireNumber("value", value);
  if (precision < 0) {
    throw new Error("precision must be >= 0");
  }
  const result = roundHalfToEven(number, precision);
  return Object.is(result, -0) ? 0 : result;
}

/**
 * Format a numeric result for display, trimming trailing zeros.
 *
 *   formatResult(40.0, "units")      === "40 units"
 *   formatResult(836.827, "units", 2) === "836.83 units"
 */
export function formatResult(value: number, unit?: string, precision = 2): string {
  const rounded = roundResult(value, precision);
  const text =
    precision > 0
      ? rounded
          .toFixed(precision)
          .replace(/0+$/, "")
          .replace(/\.$/, "")
      : String(Math.trunc(rounded));
  return unit ? `${text} ${unit}` : text;
}
