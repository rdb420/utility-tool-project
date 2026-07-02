/**
 * Static registry of the committed corpus records under ../data.
 *
 * Records are imported explicitly (not read via fs) so Next.js can bundle
 * them; adding a record file means adding an import here (the records test
 * globs data/ on disk and fails if a file is missing from this registry).
 */

import type {
  CalculatorRecord,
  FormulaRecord,
  ReferenceTableRecord,
} from "./types.gen";

import calculatorAbcAnalysis from "@data/calculators/abc_analysis.json";
import calculatorBreakEven from "@data/calculators/break_even.json";
import calculatorCarryingCost from "@data/calculators/carrying_cost.json";
import calculatorCartonVolume from "@data/calculators/carton_volume.json";
import calculatorCbm from "@data/calculators/cbm.json";
import calculatorChargeableWeight from "@data/calculators/chargeable_weight.json";
import calculatorDaysOfCover from "@data/calculators/days_of_cover.json";
import calculatorDimensionalWeight from "@data/calculators/dimensional_weight.json";
import calculatorDiscount from "@data/calculators/discount.json";
import calculatorEoq from "@data/calculators/eoq.json";
import calculatorFreightClass from "@data/calculators/freight_class.json";
import calculatorFreightDensity from "@data/calculators/freight_density.json";
import calculatorInventoryTurnover from "@data/calculators/inventory_turnover.json";
import calculatorLandedCost from "@data/calculators/landed_cost.json";
import calculatorLengthGirth from "@data/calculators/length_girth.json";
import calculatorMargin from "@data/calculators/margin.json";
import calculatorMarkup from "@data/calculators/markup.json";
import calculatorPallet from "@data/calculators/pallet.json";
import calculatorPeriodicReview from "@data/calculators/periodic_review.json";
import calculatorReorderPoint from "@data/calculators/reorder_point.json";
import calculatorSafetyStock from "@data/calculators/safety_stock.json";
import calculatorSafetyStockLtv from "@data/calculators/safety_stock_ltv.json";
import calculatorStockoutCost from "@data/calculators/stockout_cost.json";
import calculatorVolumetricWeight from "@data/calculators/volumetric_weight.json";

import formulaCartonVolumeBasic from "@data/formulas/freight/carton_volume_basic.json";
import formulaCbmBasic from "@data/formulas/freight/cbm_basic.json";
import formulaChargeableWeightBasic from "@data/formulas/freight/chargeable_weight_basic.json";
import formulaDensityPcf from "@data/formulas/freight/density_pcf.json";
import formulaDimWeightImperial from "@data/formulas/freight/dim_weight_imperial.json";
import formulaGirthLengthPlusGirth from "@data/formulas/freight/girth_length_plus_girth.json";
import formulaPalletCubeRatio from "@data/formulas/freight/pallet_cube_ratio.json";
import formulaPalletLayerFit from "@data/formulas/freight/pallet_layer_fit.json";
import formulaVolumetricWeightDivisor from "@data/formulas/freight/volumetric_weight_divisor.json";
import formulaAbcShare from "@data/formulas/inventory/abc_share.json";
import formulaCarryingCostBasic from "@data/formulas/inventory/carrying_cost_basic.json";
import formulaDaysOfCoverBasic from "@data/formulas/inventory/days_of_cover_basic.json";
import formulaEoqBasic from "@data/formulas/inventory/eoq_basic.json";
import formulaInventoryTurnoverCogs from "@data/formulas/inventory/inventory_turnover_cogs.json";
import formulaPeriodicReviewOrderUpTo from "@data/formulas/inventory/periodic_review_order_up_to.json";
import formulaReorderPointBasic from "@data/formulas/inventory/reorder_point_basic.json";
import formulaSafetyStockLeadTimeVariability from "@data/formulas/inventory/safety_stock_lead_time_variability.json";
import formulaSafetyStockServiceLevel from "@data/formulas/inventory/safety_stock_service_level.json";
import formulaStockoutCostBasic from "@data/formulas/inventory/stockout_cost_basic.json";
import formulaBreakEvenUnits from "@data/formulas/pricing/break_even_units.json";
import formulaDiscountImpact from "@data/formulas/pricing/discount_impact.json";
import formulaLandedCostPerUnit from "@data/formulas/pricing/landed_cost_per_unit.json";
import formulaMarginBasic from "@data/formulas/pricing/margin_basic.json";
import formulaMarkupBasic from "@data/formulas/pricing/markup_basic.json";

import referenceServiceLevelZFactors from "@data/reference_tables/service_level_z_factors.json";
import referenceContainerVolumes from "@data/reference_tables/freight/container_volumes.json";
import referenceDimDivisors from "@data/reference_tables/freight/dimensional_weight_divisors.json";
import referenceNmfcClasses from "@data/reference_tables/freight/nmfc_freight_classes.json";
import referenceParcelGirthLimits from "@data/reference_tables/freight/parcel_girth_limits.json";

/**
 * Single central cast point: JSON module imports are typed by TypeScript as
 * wide literal shapes, so we cast through `unknown` to the schema-generated
 * record types here (and only here). Runtime validity of every record is
 * guaranteed by the corpus validator (`npm run validate`, wired into
 * prebuild) plus the record-driven tests.
 */
const asRecord = <T>(record: unknown): T => record as T;

export const CALCULATORS: readonly CalculatorRecord[] = Object.freeze([
  asRecord<CalculatorRecord>(calculatorAbcAnalysis),
  asRecord<CalculatorRecord>(calculatorBreakEven),
  asRecord<CalculatorRecord>(calculatorCarryingCost),
  asRecord<CalculatorRecord>(calculatorCartonVolume),
  asRecord<CalculatorRecord>(calculatorCbm),
  asRecord<CalculatorRecord>(calculatorChargeableWeight),
  asRecord<CalculatorRecord>(calculatorDaysOfCover),
  asRecord<CalculatorRecord>(calculatorDimensionalWeight),
  asRecord<CalculatorRecord>(calculatorDiscount),
  asRecord<CalculatorRecord>(calculatorEoq),
  asRecord<CalculatorRecord>(calculatorFreightClass),
  asRecord<CalculatorRecord>(calculatorFreightDensity),
  asRecord<CalculatorRecord>(calculatorInventoryTurnover),
  asRecord<CalculatorRecord>(calculatorLandedCost),
  asRecord<CalculatorRecord>(calculatorLengthGirth),
  asRecord<CalculatorRecord>(calculatorMargin),
  asRecord<CalculatorRecord>(calculatorMarkup),
  asRecord<CalculatorRecord>(calculatorPallet),
  asRecord<CalculatorRecord>(calculatorPeriodicReview),
  asRecord<CalculatorRecord>(calculatorReorderPoint),
  asRecord<CalculatorRecord>(calculatorSafetyStock),
  asRecord<CalculatorRecord>(calculatorSafetyStockLtv),
  asRecord<CalculatorRecord>(calculatorStockoutCost),
  asRecord<CalculatorRecord>(calculatorVolumetricWeight),
]);

export const FORMULAS: readonly FormulaRecord[] = Object.freeze([
  asRecord<FormulaRecord>(formulaCartonVolumeBasic),
  asRecord<FormulaRecord>(formulaCbmBasic),
  asRecord<FormulaRecord>(formulaChargeableWeightBasic),
  asRecord<FormulaRecord>(formulaDensityPcf),
  asRecord<FormulaRecord>(formulaDimWeightImperial),
  asRecord<FormulaRecord>(formulaGirthLengthPlusGirth),
  asRecord<FormulaRecord>(formulaPalletCubeRatio),
  asRecord<FormulaRecord>(formulaPalletLayerFit),
  asRecord<FormulaRecord>(formulaVolumetricWeightDivisor),
  asRecord<FormulaRecord>(formulaAbcShare),
  asRecord<FormulaRecord>(formulaCarryingCostBasic),
  asRecord<FormulaRecord>(formulaDaysOfCoverBasic),
  asRecord<FormulaRecord>(formulaEoqBasic),
  asRecord<FormulaRecord>(formulaInventoryTurnoverCogs),
  asRecord<FormulaRecord>(formulaPeriodicReviewOrderUpTo),
  asRecord<FormulaRecord>(formulaReorderPointBasic),
  asRecord<FormulaRecord>(formulaSafetyStockLeadTimeVariability),
  asRecord<FormulaRecord>(formulaSafetyStockServiceLevel),
  asRecord<FormulaRecord>(formulaStockoutCostBasic),
  asRecord<FormulaRecord>(formulaBreakEvenUnits),
  asRecord<FormulaRecord>(formulaDiscountImpact),
  asRecord<FormulaRecord>(formulaLandedCostPerUnit),
  asRecord<FormulaRecord>(formulaMarginBasic),
  asRecord<FormulaRecord>(formulaMarkupBasic),
]);

/** Service-level z-factor lookup table (verified, corpus-grounded). */
export const Z_FACTORS: ReferenceTableRecord = asRecord<ReferenceTableRecord>(
  referenceServiceLevelZFactors,
);

/**
 * Freight reference tables. dimensional_weight_divisors is
 * `status: "verified"` against carrier sources (effective 2026-07-02); the
 * rest are `status: "needs_sourcing"` stubs — do not treat their row values
 * as verified.
 */
export const FREIGHT_REFERENCE_TABLES: readonly ReferenceTableRecord[] =
  Object.freeze([
    asRecord<ReferenceTableRecord>(referenceContainerVolumes),
    asRecord<ReferenceTableRecord>(referenceDimDivisors),
    asRecord<ReferenceTableRecord>(referenceNmfcClasses),
    asRecord<ReferenceTableRecord>(referenceParcelGirthLimits),
  ]);

function byId<T extends { id: string }>(
  records: readonly T[],
): Readonly<Record<string, T>> {
  return Object.freeze(
    Object.fromEntries(records.map((record) => [record.id, record])),
  );
}

export const FORMULAS_BY_ID: Readonly<Record<string, FormulaRecord>> =
  byId(FORMULAS);

export const CALCULATORS_BY_ID: Readonly<Record<string, CalculatorRecord>> =
  byId(CALCULATORS);

export type Cluster = "inventory" | "freight" | "pricing";

/** Formula-id prefix → cluster. Unknown prefixes fall back to inventory. */
const CLUSTER_BY_PREFIX: Readonly<Record<string, Cluster>> = Object.freeze({
  inventory: "inventory",
  freight: "freight",
  pricing: "pricing",
});

/** Look a calculator up by its public URL slug. */
export function calculatorBySlug(slug: string): CalculatorRecord | undefined {
  return CALCULATORS.find((calculator) => calculator.slug === slug);
}

/**
 * Cluster (hub) a calculator belongs to, derived from the prefix of its first
 * referenced formula id (plan decision D5 — not stored on the record).
 */
export function clusterOf(calculator: CalculatorRecord): Cluster {
  const prefix = calculator.formula_ids[0].split(".")[0];
  return CLUSTER_BY_PREFIX[prefix] ?? "inventory";
}

/**
 * Resolve `related_tools` ids to calculator records, preserving the order
 * they appear in the record. Unknown ids are dropped (the corpus validator
 * rejects them, so this cannot silently hide bad data in practice).
 */
export function relatedTools(calculator: CalculatorRecord): CalculatorRecord[] {
  return calculator.related_tools
    .map((id) => CALCULATORS_BY_ID[id])
    .filter((record): record is CalculatorRecord => record !== undefined);
}
