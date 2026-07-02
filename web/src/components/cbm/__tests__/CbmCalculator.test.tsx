// @vitest-environment jsdom
/**
 * CBM island: live recalculation, unit/mode/weight coupling through the real
 * DOM, sea revenue tonnes, container fill, and carrier rounding — expected
 * values computed inline with plain arithmetic (never via the island).
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CALCULATORS_BY_ID, FORMULAS_BY_ID } from "@/lib/records/records";
import CbmCalculator from "../CbmCalculator";

afterEach(cleanup);

const calculator = CALCULATORS_BY_ID["calculator.cbm"];

function renderCbm() {
  const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);
  return render(<CbmCalculator calculator={calculator} formulas={formulas} />);
}

function setField(label: string | RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label, { exact: false }), {
    target: { value },
  });
}

function openAdvanced() {
  fireEvent.click(screen.getByRole("button", { name: /advanced/i }));
}

describe("CbmCalculator", () => {
  beforeEach(() => {
    renderCbm();
  });

  it("shows the worked example live from the record defaults (no crunch needed)", () => {
    // 120 x 80 x 100 cm x 10 cartons = 9.6 m³; / 6000 = 1,600 kg.
    expect(screen.getByTestId("result-CBM").textContent).toBe("9.600m³");
    expect(screen.getByTestId("result-per-carton").textContent).toBe("0.960 m³");
    expect(screen.getByTestId("result-VW").textContent).toBe("1,600.0 kg");
    // No actual weight yet: no actual/chargeable/container rows.
    expect(screen.queryByTestId("result-CW")).toBeNull();
    expect(screen.queryByTestId("result-AW")).toBeNull();
    expect(screen.queryByTestId("result-container-fill")).toBeNull();
  });

  it("recalculates live on input change and goes middot on invalid input", () => {
    setField("Length", "60");
    // 60 x 80 x 100 cm x 10 = 4.8 m³.
    expect(screen.getByTestId("result-CBM").textContent).toBe("4.800m³");

    setField("Length", "0");
    expect(screen.getByTestId("result-CBM").textContent).toBe("·m³");
    expect(screen.getByTestId("result-VW").textContent).toBe("·");
    // Quiet middots — no error message shouting.
    expect(screen.queryByRole("alert")).toBeNull();

    setField("Length", "120");
    setField("Cartons", "0");
    expect(screen.getByTestId("result-CBM").textContent).toBe("·m³");
  });

  it("switching dims to inches auto-selects US parcel mode and pounds", () => {
    openAdvanced();
    fireEvent.click(screen.getByRole("button", { name: "in" }));

    const modeSelect = screen.getByLabelText(/transport mode/i);
    expect((modeSelect as HTMLSelectElement).value).toBe("usparcel");
    expect((screen.getByLabelText(/divisor/i) as HTMLInputElement).value).toBe(
      "139",
    );
    // 120 x 80 x 100 in x 10 cartons = 9,600,000 in³ / 139 lb.
    const expectedLb = (120 * 80 * 100 * 10) / 139;
    expect(screen.getByTestId("result-VW").textContent).toBe(
      `${Math.round(expectedLb).toLocaleString("en-US")} lb`,
    );
  });

  it("a manually selected mode survives a unit switch (manual override)", () => {
    openAdvanced();
    fireEvent.change(screen.getByLabelText(/transport mode/i), {
      target: { value: "express" },
    });
    fireEvent.click(screen.getByRole("button", { name: "in" }));
    expect(
      (screen.getByLabelText(/transport mode/i) as HTMLSelectElement).value,
    ).toBe("express");
  });

  it("entering an actual weight reveals chargeable = max(actual, volumetric)", () => {
    openAdvanced();
    setField("Actual gross weight", "900");
    expect(screen.getByTestId("result-AW").textContent).toBe("900.0 kg");
    // max(900, 1600) = 1,600 kg (billed on volume).
    expect(screen.getByTestId("result-CW").textContent).toBe("1,600.0 kg");

    setField("Actual gross weight", "2000");
    expect(screen.getByTestId("result-CW").textContent).toBe("2,000.0 kg");
  });

  it("selecting a 40ft container shows the fill percentage", () => {
    openAdvanced();
    fireEvent.change(screen.getByLabelText(/container fit/i), {
      target: { value: "c40" },
    });
    // 9.6 / 67 x 100 = 14.328...% -> 1dp.
    const expected = ((9.6 / 67) * 100).toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    expect(screen.getByTestId("result-container-fill").textContent).toBe(
      `${expected} %`,
    );
  });

  it("sea mode shows revenue tonnes = max(CBM, tonnes)", () => {
    openAdvanced();
    fireEvent.change(screen.getByLabelText(/transport mode/i), {
      target: { value: "sea" },
    });
    expect(screen.getByTestId("result-VW").textContent).toBe("9.600 RT");
    expect(
      (screen.getByLabelText(/divisor/i) as HTMLInputElement).disabled,
    ).toBe(true);

    // 12 t > 9.6 m³ -> billed on weight.
    setField("Actual gross weight", "12000");
    expect(screen.getByTestId("result-VW").textContent).toBe("12.000 RT");
  });

  it("carrier rounding changes the imperial result (inch ceil + next-lb)", () => {
    openAdvanced();
    fireEvent.click(screen.getByRole("button", { name: "in" }));
    setField("Length", "10.2");
    setField("Width", "10.2");
    setField("Height", "10.2");
    setField("Cartons", "1");

    // Without rounding: 10.2³ / 139 = 7.634... -> "8 lb" at 0dp display.
    const raw = (10.2 * 10.2 * 10.2) / 139;
    expect(screen.getByTestId("result-VW").textContent).toBe(
      `${Math.round(raw)} lb`,
    );

    fireEvent.click(screen.getByLabelText(/apply carrier rounding/i));
    // With rounding: dims ceil to 11 in; 11³ = 1,331 in³ / 139 = 9.57...
    // -> billable rounds UP to 10 lb.
    expect(Math.ceil((11 * 11 * 11) / 139)).toBe(10);
    expect(screen.getByTestId("result-VW").textContent).toBe("10 lb");
  });

  it("kg/lb readout toggle converts the displayed weights", () => {
    fireEvent.click(screen.getByRole("button", { name: "lb" }));
    // 1,600 kg / 0.45359237 = 3,527.39... lb -> 0dp display.
    const expectedLb = Math.round(1600 / 0.45359237).toLocaleString("en-US");
    expect(screen.getByTestId("result-VW").textContent).toBe(`${expectedLb} lb`);
  });

  it("crunch replays the flash without altering the live result", () => {
    fireEvent.click(screen.getByRole("button", { name: /crunch it/i }));
    expect(screen.getByTestId("result-CBM").textContent).toBe("9.600m³");
  });
});
