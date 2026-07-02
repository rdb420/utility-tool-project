// @vitest-environment jsdom
/**
 * Record-driven island tests: for EVERY calculator record, render the
 * generic island, fill the first formula's first worked example, crunch,
 * and assert each result card displays the library's raw chained value
 * formatted via formatResult (with the record's example checked against
 * its tolerance). Then the validation paths: a negative value in a min:0
 * field and a zero in a positiveInputs field must show an inline error and
 * clear any previous result.
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FORMULA_REGISTRY, formatResult } from "@/lib/calc";
import { CALCULATORS, FORMULAS_BY_ID } from "@/lib/records/records";
import type { CalculatorRecord, Input } from "@/lib/records/types.gen";
import CalculatorTool, { MESSAGES } from "../CalculatorTool";
import { toolFor } from "../toolRegistry";

afterEach(cleanup);

/**
 * Only the calculators that actually render through the generic island;
 * custom islands (calculator.cbm -> CbmCalculator) have their own suites.
 */
const GENERIC_CALCULATORS = CALCULATORS.filter(
  (calculator) => toolFor(calculator.id) === CalculatorTool,
);

function flatInputs(calculator: CalculatorRecord): Input[] {
  return calculator.input_groups.flatMap((group) => group.inputs);
}

function positiveSymbols(calculator: CalculatorRecord): Set<string> {
  const set = new Set<string>();
  for (const id of calculator.formula_ids) {
    for (const symbol of FORMULA_REGISTRY[id].positiveInputs) set.add(symbol);
  }
  return set;
}

function renderTool(calculator: CalculatorRecord) {
  const formulas = calculator.formula_ids.map((id) => {
    const formula = FORMULAS_BY_ID[id];
    if (!formula) throw new Error(`missing formula record: ${id}`);
    return formula;
  });
  return render(<CalculatorTool calculator={calculator} formulas={formulas} />);
}

/** The first worked example's value for each input (default as fallback). */
function exampleValues(calculator: CalculatorRecord): Record<string, number> {
  const example = FORMULAS_BY_ID[calculator.formula_ids[0]]!.examples[0];
  const resolved: Record<string, number> = {};
  for (const input of flatInputs(calculator)) {
    const value = example.inputs[input.symbol] ?? input.default;
    if (value === undefined) {
      throw new Error(
        `no example value or default for ${calculator.id}:${input.symbol}`,
      );
    }
    resolved[input.symbol] = value;
  }
  return resolved;
}

function fillInputs(
  calculator: CalculatorRecord,
  values: Record<string, string | number>,
) {
  for (const input of flatInputs(calculator)) {
    if (!(input.symbol in values)) continue;
    const field = screen.getByLabelText(input.label, { exact: false });
    fireEvent.change(field, {
      target: { value: String(values[input.symbol]) },
    });
  }
}

function crunch() {
  fireEvent.click(screen.getByRole("button", { name: /crunch it/i }));
}

/** Raw chained outputs, exactly as the island computes them. */
function computeOutputs(
  calculator: CalculatorRecord,
  inputs: Record<string, number>,
): Record<string, number> {
  const pool: Record<string, number> = { ...inputs };
  for (const id of calculator.formula_ids) {
    Object.assign(pool, FORMULA_REGISTRY[id].compute(pool));
  }
  return pool;
}

for (const calculator of GENERIC_CALCULATORS) {
  describe(`CalculatorTool: ${calculator.slug}`, () => {
    it("crunches the first worked example to every result card", () => {
      const inputs = exampleValues(calculator);
      renderTool(calculator);
      fillInputs(calculator, inputs);
      crunch();

      const outputs = computeOutputs(calculator, inputs);
      const example = FORMULAS_BY_ID[calculator.formula_ids[0]]!.examples[0];
      const tolerance = example.tolerance ?? 1e-6;
      for (const [symbol, expected] of Object.entries(example.expected)) {
        expect(Math.abs(outputs[symbol] - expected)).toBeLessThanOrEqual(
          tolerance,
        );
      }

      const primary =
        calculator.result_cards.find((card) => card.primary) ??
        calculator.result_cards[0];
      for (const card of calculator.result_cards) {
        const element = screen.getByTestId(`result-${card.symbol}`);
        const expectedText =
          card === primary
            ? `${formatResult(outputs[card.symbol])}${card.unit}`
            : formatResult(outputs[card.symbol], card.unit);
        expect(element.textContent).toBe(expectedText);
      }
    });

    it("rejects a negative value in a min:0 field and clears the result", () => {
      const inputs = exampleValues(calculator);
      const positives = positiveSymbols(calculator);
      const target = flatInputs(calculator).find(
        (input) => input.min === 0 && !positives.has(input.symbol),
      );
      if (!target) throw new Error(`${calculator.id} has no plain min:0 input`);

      renderTool(calculator);
      fillInputs(calculator, inputs);
      crunch(); // valid crunch first, so we prove the stale result is cleared

      const primary =
        calculator.result_cards.find((card) => card.primary) ??
        calculator.result_cards[0];
      const readoutValue = screen.getByTestId(`result-${primary.symbol}`);
      expect(readoutValue.textContent).not.toContain("·");

      fillInputs(calculator, { [target.symbol]: "-5" });
      crunch();

      const error = screen.getByRole("alert");
      expect(error.textContent).toBe(MESSAGES.negative);
      const field = screen.getByLabelText(target.label, { exact: false });
      expect(field.getAttribute("aria-describedby")).toContain(error.id);
      expect(
        screen.getByTestId(`result-${primary.symbol}`).textContent,
      ).toContain("·");
    });

    const positives = [...positiveSymbols(calculator)].filter((symbol) =>
      flatInputs(calculator).some((input) => input.symbol === symbol),
    );
    it.runIf(positives.length > 0)(
      "rejects zero in a strictly-positive field",
      () => {
        const inputs = exampleValues(calculator);
        const symbol = positives[0];
        const target = flatInputs(calculator).find(
          (input) => input.symbol === symbol,
        )!;

        renderTool(calculator);
        fillInputs(calculator, { ...inputs, [symbol]: "0" });
        crunch();

        const error = screen.getByRole("alert");
        expect(error.textContent).toBe(MESSAGES.notPositive);
        const field = screen.getByLabelText(target.label, { exact: false });
        expect(field.getAttribute("aria-invalid")).toBe("true");
        const primary =
          calculator.result_cards.find((card) => card.primary) ??
          calculator.result_cards[0];
        expect(
          screen.getByTestId(`result-${primary.symbol}`).textContent,
        ).toContain("·");
      },
    );
  });
}
