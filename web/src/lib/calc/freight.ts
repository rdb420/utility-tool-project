/**
 * Pure freight/dimensional-weight calculations (new in the TS port; consumed
 * by the CBM calculator page).
 *
 * Guards mirror the inventory library: dimensions and quantities must be
 * non-negative; divisors and container volumes must be positive. No rounding
 * inside — carrier-specific rounding belongs to the UI layer.
 */

import { requireNonNegative, requirePositive } from "./errors";

/** CBM (m^3) = L * W * H * Q / 1e6 for centimetre dimensions. */
export function cbmFromCm(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  quantity: number,
): number {
  const length = requireNonNegative("length_cm", lengthCm);
  const width = requireNonNegative("width_cm", widthCm);
  const height = requireNonNegative("height_cm", heightCm);
  const qty = requireNonNegative("quantity", quantity);
  return (length * width * height * qty) / 1_000_000;
}

/** Volumetric weight (kg) = volume (cm^3) / divisor (cm^3 per kg, e.g. 6000). */
export function volumetricWeightKg(volumeCm3: number, divisorCm3PerKg: number): number {
  const volume = requireNonNegative("volume_cm3", volumeCm3);
  const divisor = requirePositive("divisor_cm3_per_kg", divisorCm3PerKg);
  return volume / divisor;
}

/** Volumetric weight (lb) = volume (in^3) / divisor (in^3 per lb, e.g. 139). */
export function volumetricWeightLb(volumeIn3: number, divisorIn3PerLb: number): number {
  const volume = requireNonNegative("volume_in3", volumeIn3);
  const divisor = requirePositive("divisor_in3_per_lb", divisorIn3PerLb);
  return volume / divisor;
}

/** Chargeable weight = max(actual weight, volumetric weight). */
export function chargeableWeight(actualWeight: number, volumetricWeight: number): number {
  const actual = requireNonNegative("actual_weight", actualWeight);
  const volumetric = requireNonNegative("volumetric_weight", volumetricWeight);
  return Math.max(actual, volumetric);
}

/** Container fill (%) = total shipment volume / container volume * 100. */
export function containerFillPct(totalM3: number, containerM3: number): number {
  const total = requireNonNegative("total_m3", totalM3);
  const container = requirePositive("container_m3", containerM3);
  return (total / container) * 100;
}

/**
 * Cubic feet from inch dimensions: (L * W * H * Q) / 1728.
 * Volume side of `freight.density.pcf` (V output).
 */
export function cubicFeetFromInches(
  lengthIn: number,
  widthIn: number,
  heightIn: number,
  quantity: number,
): number {
  const length = requireNonNegative("length_in", lengthIn);
  const width = requireNonNegative("width_in", widthIn);
  const height = requireNonNegative("height_in", heightIn);
  const qty = requireNonNegative("quantity", quantity);
  return (length * width * height * qty) / 1728;
}

/**
 * Freight density (lb/ft^3) = actual weight / cubic feet.
 * PCF output of `freight.density.pcf`; volume must be strictly positive.
 */
export function densityPcf(actualWeightLb: number, cubicFt: number): number {
  const weight = requireNonNegative("actual_weight_lb", actualWeightLb);
  const volume = requirePositive("cubic_ft", cubicFt);
  return weight / volume;
}

export interface PalletLayerFit {
  cpl: number;
  nl: number;
  cases: number;
  utilPct: number;
}

/**
 * Layer-fit pallet load (`freight.pallet.layer_fit`): whole cases per layer
 * in a single orientation, whole layers, total cases, and volume utilisation.
 * Case dimensions must be strictly positive (floor-division guards).
 */
export function palletLayerFit(
  palletLengthIn: number,
  palletWidthIn: number,
  palletHeightIn: number,
  caseLengthIn: number,
  caseWidthIn: number,
  caseHeightIn: number,
): PalletLayerFit {
  const palletLength = requireNonNegative("pallet_length_in", palletLengthIn);
  const palletWidth = requireNonNegative("pallet_width_in", palletWidthIn);
  const palletHeight = requireNonNegative("pallet_height_in", palletHeightIn);
  const caseLength = requirePositive("case_length_in", caseLengthIn);
  const caseWidth = requirePositive("case_width_in", caseWidthIn);
  const caseHeight = requirePositive("case_height_in", caseHeightIn);

  const cpl = Math.floor(palletLength / caseLength) * Math.floor(palletWidth / caseWidth);
  const nl = Math.floor(palletHeight / caseHeight);
  const cases = cpl * nl;
  const palletVolume = palletLength * palletWidth * palletHeight;
  const caseVolume = caseLength * caseWidth * caseHeight;
  const utilPct = palletVolume > 0 ? (100 * cases * caseVolume) / palletVolume : 0;
  return { cpl, nl, cases, utilPct };
}

/**
 * Cube-method pallet ratio (`freight.pallet.cube_ratio`): usable pallet
 * volume / case volume — a theoretical upper bound, not a load plan.
 */
export function palletCubeRatio(
  palletLengthIn: number,
  palletWidthIn: number,
  palletHeightIn: number,
  caseLengthIn: number,
  caseWidthIn: number,
  caseHeightIn: number,
): number {
  const palletLength = requireNonNegative("pallet_length_in", palletLengthIn);
  const palletWidth = requireNonNegative("pallet_width_in", palletWidthIn);
  const palletHeight = requireNonNegative("pallet_height_in", palletHeightIn);
  const caseLength = requirePositive("case_length_in", caseLengthIn);
  const caseWidth = requirePositive("case_width_in", caseWidthIn);
  const caseHeight = requirePositive("case_height_in", caseHeightIn);
  return (palletLength * palletWidth * palletHeight) / (caseLength * caseWidth * caseHeight);
}

/**
 * Carton volume (m^3) from centimetre dimensions (`freight.carton_volume.basic`,
 * V_m3 output). Same math as `cbmFromCm`; litre/ft^3 outputs come from
 * `units.convert` in the registry.
 */
export function cartonVolumeM3(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  quantity: number,
): number {
  return cbmFromCm(lengthCm, widthCm, heightCm, quantity);
}

/** Girth (same unit as inputs) = 2 * (width + height). */
export function girth(width: number, height: number): number {
  const w = requireNonNegative("width", width);
  const h = requireNonNegative("height", height);
  return 2 * (w + h);
}

/**
 * Length plus girth (`freight.girth.length_plus_girth`, LG output):
 * longest side + 2 * (width + height).
 */
export function lengthPlusGirth(length: number, width: number, height: number): number {
  const l = requireNonNegative("length", length);
  return l + girth(width, height);
}
