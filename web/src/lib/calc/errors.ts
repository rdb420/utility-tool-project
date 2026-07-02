/**
 * Error types and input guards for the calculation library.
 *
 * TypeScript port of `src/calc/errors.py` — behavioral parity, not
 * Python-repr-identical. Message templates match the Python source:
 *   "{name} must be a number, got {value}"
 *   "{name} must be finite, got {value}"
 *   "{name} must be >= 0, got {number}"
 *   "{name} must be > 0, got {number}"
 * Value rendering: strings are single-quoted (Python-repr style); everything
 * else uses JavaScript's String() (so `true`, `NaN`, `undefined`, `-1`).
 */

/** Base class for all calculation-library errors. */
export class CalculationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CalculationError";
    Object.setPrototypeOf(this, CalculationError.prototype);
  }
}

/** Raised when an input is missing, out of range, or incompatible. */
export class ValidationError extends CalculationError {
  constructor(message?: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/** Raised when a conversion is attempted between different dimensions. */
export class IncompatibleUnitsError extends ValidationError {
  constructor(message?: string) {
    super(message);
    this.name = "IncompatibleUnitsError";
    Object.setPrototypeOf(this, IncompatibleUnitsError.prototype);
  }
}

/** Render a value for error messages: strings quoted, everything else plain. */
export function repr(value: unknown): string {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
}

export function requireNumber(name: string, value: unknown): number {
  if (typeof value === "boolean" || typeof value !== "number") {
    throw new ValidationError(`${name} must be a number, got ${repr(value)}`);
  }
  if (!Number.isFinite(value)) {
    throw new ValidationError(`${name} must be finite, got ${repr(value)}`);
  }
  return value;
}

export function requireNonNegative(name: string, value: unknown): number {
  const number = requireNumber(name, value);
  if (number < 0) {
    throw new ValidationError(`${name} must be >= 0, got ${number}`);
  }
  return number;
}

export function requirePositive(name: string, value: unknown): number {
  const number = requireNumber(name, value);
  if (number <= 0) {
    throw new ValidationError(`${name} must be > 0, got ${number}`);
  }
  return number;
}
