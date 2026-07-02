/**
 * Island dispatch: calculator record id -> tool island component.
 *
 * Most tools are fully record-driven and use the generic CalculatorTool;
 * a calculator that needs custom behaviour registers an override here.
 */

import type { ComponentType } from "react";
import CbmCalculator from "../cbm/CbmCalculator";
import CalculatorTool, { type CalculatorToolProps } from "./CalculatorTool";

const TOOL_OVERRIDES: Record<string, ComponentType<CalculatorToolProps>> = {
  "calculator.cbm": CbmCalculator,
};

export function toolFor(
  calculatorId: string,
): ComponentType<CalculatorToolProps> {
  return TOOL_OVERRIDES[calculatorId] ?? CalculatorTool;
}
