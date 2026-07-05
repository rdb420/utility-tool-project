// @vitest-environment jsdom
/**
 * Analytics privacy contract for the ABC island: interact with everything —
 * SKU names, values, thresholds, add/remove rows, crunch, copy — then prove
 * that track() never saw any entered string, that payloads carry only the
 * typed fields (toolId, slug, field, variant), and that only the expected
 * event names fire, with calculator_result throttled to partition changes.
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { track } from "@/lib/analytics";
import { FORMULAS_BY_ID, calculatorBySlug } from "@/lib/records/records";
import AbcCalculator from "../AbcCalculator";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.mocked(track).mockClear();
});

const calculator = calculatorBySlug("abc-analysis-calculator")!;

const ALLOWED_EVENTS = new Set([
  "calculator_start",
  "calculator_result",
  "calculator_validation_error",
  "result_copy",
]);
const ALLOWED_KEYS = new Set(["name", "toolId", "slug", "field", "variant"]);

/** Every string the "user" types below — none may reach an event payload. */
const ENTERED = [
  "SECRET-SKU-9",
  "OMEGA-CONFIDENTIAL",
  "ZETA-PRIVATE",
  "987654",
  "876543",
  "13579",
  "987655",
  "150",
];

function setField(label: string | RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label, { exact: false }), {
    target: { value },
  });
}

function crunch() {
  fireEvent.click(screen.getByRole("button", { name: /crunch/i }));
}

describe("ABC analytics privacy", () => {
  it("never leaks entered names, values, thresholds, or extra fields", async () => {
    const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);
    render(<AbcCalculator calculator={calculator} formulas={formulas} />);

    // Crunch on the empty form: validation_error for the rows.
    crunch();

    // Full interaction with distinctive strings.
    setField("SKU 1 name", "SECRET-SKU-9");
    setField("SKU 1 annual usage value", "987654");
    setField("SKU 2 name", "OMEGA-CONFIDENTIAL");
    setField("SKU 2 annual usage value", "876543");
    setField("SKU 3 name", "ZETA-PRIVATE");
    setField("SKU 3 annual usage value", "13579");

    // Bad threshold + crunch: validation_error for the thresholds.
    setField("B cutoff", "150");
    crunch();
    setField("B cutoff", "95");

    // Row management and a valid crunch.
    fireEvent.click(screen.getByRole("button", { name: /add row/i }));
    fireEvent.click(
      screen.getAllByRole("button", { name: /remove sku/i })[3],
    );
    crunch();

    // Both copy variants.
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy full" }));
    await screen.findAllByText(/Copied|Copy failed/);

    // Clearing inputs is analytics-silent (privacy contract): no track()
    // call of any kind, no result event from the state snapping back.
    const before = vi.mocked(track).mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: /clear inputs/i }));
    expect(vi.mocked(track).mock.calls.length).toBe(before);

    const calls = vi.mocked(track).mock.calls.map(([event]) => event);
    expect(calls.length).toBeGreaterThan(0);

    for (const event of calls) {
      // Only the expected event names.
      expect(ALLOWED_EVENTS.has(event.name)).toBe(true);
      // Only the typed payload fields — nothing extra smuggled in.
      for (const key of Object.keys(event)) {
        expect(ALLOWED_KEYS.has(key)).toBe(true);
      }
      // No entered string anywhere in any payload.
      const serialized = JSON.stringify(event);
      for (const secret of ENTERED) {
        expect(serialized).not.toContain(secret);
      }
      // Field values are drawn from closed sets.
      expect((event as { toolId?: string }).toolId).toBe(calculator.id);
      expect((event as { slug?: string }).slug).toBe(calculator.slug);
      if ("field" in event) {
        expect(["thresholds", "rows"]).toContain(event.field);
      }
      if ("variant" in event) {
        expect(["result", "full"]).toContain(event.variant);
      }
    }

    // The interaction produced each expected event kind.
    const names = calls.map((event) => event.name);
    expect(names.filter((n) => n === "calculator_start")).toHaveLength(1);
    expect(names).toContain("calculator_result");
    expect(names).toContain("calculator_validation_error");
    expect(names.filter((n) => n === "result_copy")).toHaveLength(2);
    const errorFields = calls
      .filter((event) => event.name === "calculator_validation_error")
      .map((event) => (event as { field?: string }).field);
    expect(errorFields).toEqual(["rows", "thresholds"]);
  });

  it("throttles calculator_result to A/B/C partition changes, not keystrokes", () => {
    const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);
    render(<AbcCalculator calculator={calculator} formulas={formulas} />);

    setField("SKU 1 annual usage value", "987654");
    setField("SKU 2 annual usage value", "876543");
    setField("SKU 3 annual usage value", "13579");

    const resultCount = () =>
      vi
        .mocked(track)
        .mock.calls.filter(([event]) => event.name === "calculator_result")
        .length;
    const before = resultCount();
    expect(before).toBeGreaterThan(0);

    // Value edits that keep the same partition fire nothing new.
    setField("SKU 1 annual usage value", "987655");
    setField("SKU 1 annual usage value", "987656");
    expect(resultCount()).toBe(before);

    // A threshold edit that reclassifies fires exactly one more.
    setField("B cutoff", "100");
    expect(resultCount()).toBe(before + 1);
  });
});
