/**
 * Pure pricing calculations (margin, markup, break-even, discount impact,
 * landed cost).
 *
 * Each function implements one grounded formula record in
 * `data/formulas/pricing/` and reproduces that record's worked examples.
 * Guards mirror the inventory/freight libraries: monetary inputs must be
 * non-negative; denominators must be positive, with `ValidationError` thrown
 * on zero/negative contribution margins and loss-making discounts. No
 * rounding inside — display rounding belongs to `formatting.ts`.
 */

import { requireNonNegative, requirePositive, ValidationError } from "./errors";

/** profit = P - C; margin_pct = 100 * (P - C) / P. See pricing.margin.basic. */
export function marginBasic(
  sellingPrice: number,
  unitCost: number,
): { profit: number; marginPct: number } {
  const price = requirePositive("selling_price", sellingPrice);
  const cost = requireNonNegative("unit_cost", unitCost);
  const profit = price - cost;
  return { profit, marginPct: (100 * profit) / price };
}

/**
 * price = C * (1 + markup/100); profit = C * markup/100;
 * margin_pct = 100 * markup / (100 + markup). See pricing.markup.basic.
 *
 * Note the markup/margin asymmetry: a 25% markup on cost is a 20% margin on
 * price.
 */
export function markupBasic(
  unitCost: number,
  markupPct: number,
): { price: number; profit: number; marginPct: number } {
  const cost = requireNonNegative("unit_cost", unitCost);
  const markup = requireNonNegative("markup_pct", markupPct);
  const profit = (cost * markup) / 100;
  return {
    price: cost + profit,
    profit,
    marginPct: (100 * markup) / (100 + markup),
  };
}

/**
 * CM = P - VC; BE_units = FC / CM; BE_revenue = BE_units * P.
 * See pricing.break_even.units.
 */
export function breakEvenUnits(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number,
): { contributionMargin: number; breakEvenUnits: number; breakEvenRevenue: number } {
  const fixed = requireNonNegative("fixed_costs", fixedCosts);
  const price = requireNonNegative("price_per_unit", pricePerUnit);
  const variable = requireNonNegative("variable_cost_per_unit", variableCostPerUnit);
  const contributionMargin = price - variable;
  if (contributionMargin <= 0) {
    throw new ValidationError(
      `price must exceed variable cost per unit, got contribution margin ${contributionMargin}`,
    );
  }
  const units = fixed / contributionMargin;
  return {
    contributionMargin,
    breakEvenUnits: units,
    breakEvenRevenue: units * price,
  };
}

/**
 * P_d = P * (1 - disc/100); new_margin_pct = 100 * (P_d - C) / P_d;
 * uplift_pct = 100 * ((P - C) / (P_d - C) - 1). See pricing.discount.impact.
 *
 * `upliftPct` is the extra volume (in %) needed at the discounted price to
 * keep the same gross profit as before the discount.
 */
export function discountImpact(
  sellingPrice: number,
  unitCost: number,
  discountPct: number,
): { discountedPrice: number; newMarginPct: number; upliftPct: number } {
  const price = requireNonNegative("selling_price", sellingPrice);
  const cost = requireNonNegative("unit_cost", unitCost);
  const discount = requireNonNegative("discount_pct", discountPct);
  if (discount > 100) {
    throw new ValidationError(`discount_pct must be <= 100, got ${discount}`);
  }
  const discountedPrice = price * (1 - discount / 100);
  const discountedProfit = discountedPrice - cost;
  if (discountedProfit <= 0) {
    throw new ValidationError(
      `discounted price must exceed unit cost, got per-unit profit ${discountedProfit}`,
    );
  }
  return {
    discountedPrice,
    newMarginPct: (100 * discountedProfit) / discountedPrice,
    upliftPct: 100 * ((price - cost) / discountedProfit - 1),
  };
}

/**
 * duty = goods * duty_pct/100; LC = goods + freight + insurance + duty +
 * other; LC_unit = LC / units. See pricing.landed_cost.per_unit.
 */
export function landedCostPerUnit(
  goodsValue: number,
  freightCost: number,
  insuranceCost: number,
  dutyPct: number,
  otherCost: number,
  units: number,
): { duty: number; landedCost: number; landedCostPerUnit: number } {
  const goods = requireNonNegative("goods_value", goodsValue);
  const freight = requireNonNegative("freight_cost", freightCost);
  const insurance = requireNonNegative("insurance_cost", insuranceCost);
  const dutyRate = requireNonNegative("duty_pct", dutyPct);
  const other = requireNonNegative("other_cost", otherCost);
  const unitCount = requirePositive("units", units);
  const duty = (goods * dutyRate) / 100;
  const landedCost = goods + freight + insurance + duty + other;
  return { duty, landedCost, landedCostPerUnit: landedCost / unitCount };
}
