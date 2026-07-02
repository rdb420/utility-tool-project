/**
 * Island dispatch: calculator record id -> tool island component.
 *
 * Most tools are fully record-driven and use the generic CalculatorTool;
 * a calculator that needs custom behaviour registers an override here.
 */

import type { ComponentType } from "react";
import AbcCalculator from "../abc/AbcCalculator";
import CbmCalculator from "../cbm/CbmCalculator";
import DimWeightCalculator from "../dimweight/DimWeightCalculator";
import FreightClassCalculator from "../freightclass/FreightClassCalculator";
import CalculatorTool, { type CalculatorToolProps } from "./CalculatorTool";

const TOOL_OVERRIDES: Record<string, ComponentType<CalculatorToolProps>> = {
  "calculator.abc_analysis": AbcCalculator,
  "calculator.cbm": CbmCalculator,
  "calculator.dimensional_weight": DimWeightCalculator,
  "calculator.freight_class": FreightClassCalculator,
  "calculator.volumetric_weight": DimWeightCalculator,
};

export function toolFor(
  calculatorId: string,
): ComponentType<CalculatorToolProps> {
  return TOOL_OVERRIDES[calculatorId] ?? CalculatorTool;
}
