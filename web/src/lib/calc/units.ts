/**
 * Unit conversion helpers.
 *
 * Convert between units of the same dimension via a base unit (length -> cm,
 * weight -> kg, volume -> cm^3). Formulas should convert inputs to a
 * consistent unit before executing. Conversions across dimensions throw
 * IncompatibleUnitsError.
 *
 * TypeScript port of `src/calc/units.py` — the factor map is copied verbatim.
 */

import { IncompatibleUnitsError, ValidationError, repr, requireNonNegative } from "./errors";

export type Dimension = "length" | "weight" | "volume";

// symbol -> [dimension, factor to base unit]
const UNITS: Record<string, readonly [Dimension, number]> = {
  // length, base = cm
  mm: ["length", 0.1],
  cm: ["length", 1.0],
  m: ["length", 100.0],
  in: ["length", 2.54],
  ft: ["length", 30.48],
  // weight, base = kg
  g: ["weight", 0.001],
  kg: ["weight", 1.0],
  lb: ["weight", 0.45359237],
  oz: ["weight", 0.028349523125],
  // volume, base = cm^3
  cm3: ["volume", 1.0],
  l: ["volume", 1000.0],
  m3: ["volume", 1_000_000.0],
  in3: ["volume", 16.387064],
  ft3: ["volume", 28316.846592],
};

function dimensionAndFactor(unit: string): readonly [Dimension, number] {
  const entry = Object.prototype.hasOwnProperty.call(UNITS, unit) ? UNITS[unit] : undefined;
  if (entry === undefined) {
    throw new ValidationError(`unknown unit: ${repr(unit)}`);
  }
  return entry;
}

export function dimensionOf(unit: string): Dimension {
  return dimensionAndFactor(unit)[0];
}

/** Convert `value` from `fromUnit` to `toUnit` within one dimension. */
export function convert(value: number, fromUnit: string, toUnit: string): number {
  const number = requireNonNegative("value", value);
  const [fromDim, fromFactor] = dimensionAndFactor(fromUnit);
  const [toDim, toFactor] = dimensionAndFactor(toUnit);
  if (fromDim !== toDim) {
    throw new IncompatibleUnitsError(
      `cannot convert ${fromUnit} (${fromDim}) to ${toUnit} (${toDim})`,
    );
  }
  return (number * fromFactor) / toFactor;
}
