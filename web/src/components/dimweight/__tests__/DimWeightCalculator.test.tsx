// @vitest-environment jsdom
/**
 * Shared DIM-weight island, PARAMETERIZED over both calculator records:
 * the dimensional-weight page must come up imperial (in / US parcel / 139)
 * and the volumetric-weight page metric (cm / air / 6000), each showing its
 * record's worked-example figure live from the defaults; entering an actual
 * weight reveals the chargeable row + billed-on verdict; copy writes the
 * clipboard and shows the toast. Expected values are computed inline with
 * plain arithmetic (never via the island).
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BASE_URL } from "@/config/site";
import { CALCULATORS_BY_ID, FORMULAS_BY_ID } from "@/lib/records/records";
import DimWeightCalculator from "../DimWeightCalculator";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const CASES = [
  {
    id: "calculator.dimensional_weight",
    unit: "in",
    weightUnit: "lb",
    mode: "usparcel",
    divisor: "139",
    resultTestId: "result-DW",
    // 30 x 24 x 22 = 15,840 in³ / 139 = 113.96 lb -> "114" at 0dp display.
    headline: "114lb",
    volumeRow: "15,840 in³ (0.260 m³)",
    divisorRow: "÷139 in³/lb",
    // AW 50 lb < 113.96 lb -> billed on volumetric; 200 lb -> actual.
    awBelow: "50",
    chargeBelow: "114 lb",
    awAbove: "200",
    chargeAbove: "200 lb",
  },
  {
    id: "calculator.volumetric_weight",
    unit: "cm",
    weightUnit: "kg",
    mode: "air",
    divisor: "6000",
    resultTestId: "result-VW",
    // 120 x 80 x 100 x 10 = 9,600,000 cm³ / 6000 = 1,600 kg.
    headline: "1,600.0kg",
    volumeRow: "9,600,000 cm³ (9.600 m³)",
    divisorRow: "÷6,000 cm³/kg",
    // AW 900 kg < 1,600 kg -> billed on volumetric; 2,000 kg -> actual.
    awBelow: "900",
    chargeBelow: "1,600.0 kg",
    awAbove: "2000",
    chargeAbove: "2,000.0 kg",
  },
] as const;

function renderIsland(id: string) {
  const calculator = CALCULATORS_BY_ID[id];
  const formulas = calculator.formula_ids.map((fid) => FORMULAS_BY_ID[fid]!);
  return render(
    <DimWeightCalculator calculator={calculator} formulas={formulas} />,
  );
}

function openAdvanced() {
  fireEvent.click(screen.getByRole("button", { name: /advanced/i }));
}

function setActualWeight(value: string) {
  openAdvanced();
  fireEvent.change(screen.getByLabelText(/actual weight/i), {
    target: { value },
  });
}

describe.each(CASES)("DimWeightCalculator ($id)", (c) => {
  it("comes up in the record's unit system: unit, mode, and divisor defaults", () => {
    renderIsland(c.id);
    // Dimension unit toggle and readout weight toggle reflect the system.
    expect(
      screen.getByRole("button", { name: c.unit, pressed: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: c.weightUnit, pressed: true }),
    ).toBeTruthy();

    openAdvanced();
    expect(
      (screen.getByLabelText(/transport mode/i) as HTMLSelectElement).value,
    ).toBe(c.mode);
    expect((screen.getByLabelText(/divisor/i) as HTMLInputElement).value).toBe(
      c.divisor,
    );
  });

  it("shows the record's worked example live from the defaults (no crunch)", () => {
    renderIsland(c.id);
    expect(screen.getByTestId(c.resultTestId).textContent).toBe(c.headline);
    expect(screen.getByTestId("result-volume").textContent).toBe(c.volumeRow);
    expect(screen.getByTestId("result-divisor").textContent).toBe(c.divisorRow);
    // Optional AW absent: no actual/chargeable rows, no verdict.
    expect(screen.queryByTestId("result-AW")).toBeNull();
    expect(screen.queryByTestId("result-CW")).toBeNull();
    expect(screen.queryByTestId("result-billed-on")).toBeNull();
  });

  it("goes middot on invalid input, headline restored on fix", () => {
    renderIsland(c.id);
    const length = screen.getByLabelText(/length/i);
    fireEvent.change(length, { target: { value: "0" } });
    expect(screen.getByTestId(c.resultTestId).textContent).toBe(
      `·${c.weightUnit}`,
    );
    expect(screen.getByTestId("result-volume").textContent).toBe("·");
    // Quiet middots — no error shouting.
    expect(screen.queryByRole("alert")).toBeNull();

    fireEvent.change(length, {
      target: { value: c.id.endsWith("dimensional_weight") ? "30" : "120" },
    });
    expect(screen.getByTestId(c.resultTestId).textContent).toBe(c.headline);
  });

  it("entering an actual weight reveals chargeable + billed-on verdict", () => {
    renderIsland(c.id);
    setActualWeight(c.awBelow);
    // AW below volumetric: billed on the volumetric figure.
    expect(screen.getByTestId("result-AW").textContent).toContain(c.awBelow);
    expect(screen.getByTestId("result-CW").textContent).toBe(c.chargeBelow);
    expect(screen.getByTestId("result-billed-on").textContent).toBe(
      "Volumetric weight",
    );

    // AW above volumetric: billed on the actual figure.
    fireEvent.change(screen.getByLabelText(/actual weight/i), {
      target: { value: c.awAbove },
    });
    expect(screen.getByTestId("result-CW").textContent).toBe(c.chargeAbove);
    expect(screen.getByTestId("result-billed-on").textContent).toBe(
      "Actual weight",
    );

    // Clearing AW removes the comparison again.
    fireEvent.change(screen.getByLabelText(/actual weight/i), {
      target: { value: "" },
    });
    expect(screen.queryByTestId("result-CW")).toBeNull();
    expect(screen.queryByTestId("result-billed-on")).toBeNull();
  });

  it("copy result + copy full write the clipboard and show the toast", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    renderIsland(c.id);
    const calculator = CALCULATORS_BY_ID[c.id];

    fireEvent.click(screen.getByRole("button", { name: /copy result/i }));
    expect(await screen.findByText("Copied")).toBeTruthy();
    expect(writeText).toHaveBeenCalledTimes(1);
    const resultText = writeText.mock.calls[0]![0] as string;
    expect(resultText).toContain(calculator.result_cards[0].label);

    fireEvent.click(screen.getByRole("button", { name: /copy full/i }));
    expect(writeText).toHaveBeenCalledTimes(2);
    const fullText = writeText.mock.calls[1]![0] as string;
    expect(fullText).toContain(`${BASE_URL}/${calculator.slug}/`);
    expect(fullText).toContain(calculator.title);
  });
});
