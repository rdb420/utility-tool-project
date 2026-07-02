// @vitest-environment jsdom
/**
 * Freight-class island through the real DOM with the real record
 * (calculator.freight_class): live default result, both input modes, the
 * 13-row NMFC scale table, copy + toast, and the analytics contract
 * (calculator_result throttled to class CHANGES; payloads never carry
 * input values).
 */

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { setAnalyticsTransport, type AnalyticsEvent } from "@/lib/analytics";
import { FORMULAS_BY_ID, calculatorBySlug } from "@/lib/records/records";
import FreightClassCalculator from "../FreightClassCalculator";

const calculator = calculatorBySlug("freight-class-calculator")!;

const events: AnalyticsEvent[] = [];
const copiedTexts: string[] = [];
const writeText = vi.fn((text: string) => {
  copiedTexts.push(text);
  return Promise.resolve();
});

beforeEach(() => {
  events.length = 0;
  copiedTexts.length = 0;
  setAnalyticsTransport((event) => events.push(event));
  writeText.mockClear();
  Object.defineProperty(window.navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  setAnalyticsTransport(() => {});
  cleanup();
});

function renderIsland() {
  expect(calculator).toBeDefined();
  const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);
  return render(
    <FreightClassCalculator calculator={calculator} formulas={formulas} />,
  );
}

function setField(label: string | RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label, { exact: false }), {
    target: { value },
  });
}

describe("FreightClassCalculator", () => {
  it("shows the record example live from the defaults (48x40x48, 500 lb -> Class 100)", () => {
    renderIsland();
    expect(screen.getByTestId("result-class").textContent).toContain("Class 100");
    expect(screen.getByTestId("result-class").textContent).toContain("estimated");
    expect(screen.getByTestId("result-PCF").textContent).toBe("9.375 lb/ft³");
    expect(screen.getByTestId("result-V").textContent).toBe("53.33 ft³");
    expect(screen.getByTestId("result-band").textContent).toBe("8–<10 lb/ft³");
    // No analytics on a mere page load.
    expect(events).toHaveLength(0);
  });

  it("typing the example values keeps Class 100; weight changes move the class live", () => {
    renderIsland();
    setField("Length", "48");
    setField("Width", "40");
    setField("Height", "48");
    setField("Pieces", "1");
    setField("Actual weight", "500");
    expect(screen.getByTestId("result-class").textContent).toContain("Class 100");

    // 1000 lb / 53.33 ft³ = 18.75 PCF -> 15-<22.5 band -> Class 70.
    setField("Actual weight", "1000");
    expect(screen.getByTestId("result-class").textContent).toContain("Class 70");
    expect(screen.getByTestId("result-PCF").textContent).toBe("18.750 lb/ft³");
    expect(screen.getByTestId("result-band").textContent).toBe("15–<22.5 lb/ft³");
  });

  it("goes middot on invalid input with no error shouting", () => {
    renderIsland();
    setField("Length", "0");
    expect(screen.getByTestId("result-class").textContent).toContain("·");
    expect(screen.getByTestId("result-PCF").textContent).toBe("·");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("mode switch to Density (PCF): direct 9.375 gives the same class, no volume", () => {
    renderIsland();
    const pcfButton = screen.getByRole("button", { name: "Density (PCF)" });
    expect(pcfButton.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(pcfButton);
    expect(pcfButton.getAttribute("aria-pressed")).toBe("true");

    // Dims fields are gone; density field is empty -> middot state.
    expect(screen.queryByLabelText(/actual weight/i)).toBeNull();
    expect(screen.getByTestId("result-class").textContent).toContain("·");

    setField("Density", "9.375");
    expect(screen.getByTestId("result-class").textContent).toContain("Class 100");
    expect(screen.getByTestId("result-PCF").textContent).toBe("9.375 lb/ft³");
    expect(screen.getByTestId("result-V").textContent).toBe("·");
  });

  it("renders the full 13-row NMFC scale table with the effective-date caption", () => {
    renderIsland();
    const table = screen.getByRole("table", {
      name: /NMFC freight-class density chart \(13-subprovision scale\), effective 2025-07-19/i,
    });
    const body = table.querySelector("tbody")!;
    expect(body.querySelectorAll("tr")).toHaveLength(13);
    // Spot-check bands, the 92.5 class, and the open-ended top band.
    expect(within(table).getByText("8–<10 lb/ft³")).toBeDefined();
    expect(within(table).getByText("Class 92.5")).toBeDefined();
    expect(within(table).getByText("50+ lb/ft³")).toBeDefined();
    expect(within(table).getByText("Class 400")).toBeDefined();
  });

  it("copy result writes the class + density line and shows the toast", async () => {
    renderIsland();
    fireEvent.click(screen.getByRole("button", { name: /copy result/i }));
    expect(await screen.findByText("Copied")).toBeDefined();
    expect(writeText).toHaveBeenCalledWith(
      "Estimated freight class: Class 100 (density 9.375 lb/ft³)",
    );
    expect(events.some((event) => event.name === "result_copy")).toBe(true);
  });

  it("copy full includes labelled inputs, outputs, and the canonical URL", async () => {
    renderIsland();
    fireEvent.click(screen.getByRole("button", { name: /copy full/i }));
    expect(await screen.findByText("Copied")).toBeDefined();
    const text = copiedTexts[0];
    expect(text).toContain(`${calculator.title}`);
    expect(text).toContain("Handling unit: 48 × 40 × 48 in  x  1 pieces");
    expect(text).toContain("Actual weight: 500 lb");
    expect(text).toContain("Density: 9.375 lb/ft³");
    expect(text).toContain("Density band: 8–<10 lb/ft³");
    expect(text).toContain("Estimated freight class: Class 100");
    expect(text).toContain("/freight-class-calculator/");
  });

  it("emits calculator_start once and throttles calculator_result to class changes", () => {
    renderIsland();
    // 18.75 PCF -> Class 70: start + one result.
    setField("Actual weight", "1000");
    // 20.625 PCF -> still Class 70: NO new result (same class, new keystroke).
    setField("Actual weight", "1100");
    // 9 PCF -> Class 100: one more result.
    setField("Actual weight", "480");

    expect(events.filter((event) => event.name === "calculator_start")).toHaveLength(1);
    const results = events.filter((event) => event.name === "calculator_result");
    expect(results).toHaveLength(2);
    expect(events[0].name).toBe("calculator_start");

    // Privacy contract: ids/slugs only, never input values.
    for (const event of events) {
      expect(Object.keys(event).sort()).toEqual(["name", "slug", "toolId"]);
      expect(JSON.stringify(event)).not.toMatch(/1000|1100|480|18\.75/);
      if ("toolId" in event) {
        expect(event.toolId).toBe(calculator.id);
        expect(event.slug).toBe(calculator.slug);
      }
    }
  });
});
