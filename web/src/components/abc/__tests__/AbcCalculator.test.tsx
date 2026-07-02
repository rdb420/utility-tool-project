// @vitest-environment jsdom
/**
 * ABC island through the real DOM with the real record: ranked table
 * classes, add/remove row limits, threshold reclassification and inline
 * errors, and copy + toast — expected values hand-computed inline.
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FORMULAS_BY_ID, calculatorBySlug } from "@/lib/records/records";
import AbcCalculator from "../AbcCalculator";

afterEach(cleanup);

const calculator = calculatorBySlug("abc-analysis-calculator")!;

function renderAbc() {
  const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);
  return render(
    <AbcCalculator calculator={calculator} formulas={formulas} />,
  );
}

function setField(label: string | RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label, { exact: false }), {
    target: { value },
  });
}

/** Fill the corpus-style 54/41/5 example into the first three rows. */
function fillCorpusExample() {
  setField("SKU 1 name", "alpha");
  setField("SKU 1 annual usage value", "54000");
  setField("SKU 2 name", "bravo");
  setField("SKU 2 annual usage value", "41000");
  setField("SKU 3 name", "charlie");
  setField("SKU 3 annual usage value", "5000");
}

describe("AbcCalculator", () => {
  beforeEach(() => {
    renderAbc();
  });

  it("shows quiet middots and the rows hint until two valid rows exist", () => {
    expect(screen.getByTestId("result-A-count").textContent).toBe(
      "·A-class SKUs",
    );
    expect(screen.getByTestId("result-class-A").textContent).toBe("·");
    expect(
      screen.getByText("Add at least two SKUs with values."),
    ).toBeTruthy();
    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("ranks and classifies the corpus example live (no crunch needed)", () => {
    fillCorpusExample();

    // Shares 54/41/5, cumulative 54/95/100 -> A/B/C with 80/95 cutoffs.
    expect(screen.getByTestId("result-A-count").textContent).toBe(
      "1A-class SKUs",
    );
    expect(screen.getByTestId("result-class-A").textContent).toBe(
      "1 item · 54.0% of value",
    );
    expect(screen.getByTestId("result-class-B").textContent).toBe(
      "1 item · 41.0% of value",
    );
    expect(screen.getByTestId("result-class-C").textContent).toBe(
      "1 item · 5.0% of value",
    );
    expect(screen.getByTestId("result-total").textContent).toBe("100,000");

    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByTestId("abc-name-1").textContent).toBe("alpha");
    expect(screen.getByTestId("abc-name-2").textContent).toBe("bravo");
    expect(screen.getByTestId("abc-name-3").textContent).toBe("charlie");
    expect(screen.getByTestId("abc-class-1").textContent).toBe("A");
    expect(screen.getByTestId("abc-class-2").textContent).toBe("B");
    expect(screen.getByTestId("abc-class-3").textContent).toBe("C");
  });

  it("re-ranks: the largest value is rank 1 regardless of entry order", () => {
    setField("SKU 1 name", "small");
    setField("SKU 1 annual usage value", "10");
    setField("SKU 2 name", "large");
    setField("SKU 2 annual usage value", "90");

    expect(screen.getByTestId("abc-name-1").textContent).toBe("large");
    expect(screen.getByTestId("abc-name-2").textContent).toBe("small");
    // First item is always A even though its share (90%) exceeds the cutoff.
    expect(screen.getByTestId("abc-class-1").textContent).toBe("A");
  });

  it("adds rows up to 15 (then disables) and removes down to 2 (then disables)", () => {
    const addButton = () => screen.getByRole("button", { name: /add row/i });
    expect(screen.getAllByLabelText(/name$/)).toHaveLength(5);

    for (let i = 5; i < 15; i += 1) fireEvent.click(addButton());
    expect(screen.getAllByLabelText(/name$/)).toHaveLength(15);
    expect((addButton() as HTMLButtonElement).disabled).toBe(true);

    const removeFirst = () =>
      fireEvent.click(screen.getAllByRole("button", { name: /remove sku/i })[0]);
    for (let i = 15; i > 2; i -= 1) removeFirst();
    expect(screen.getAllByLabelText(/name$/)).toHaveLength(2);
    for (const button of screen.getAllByRole("button", {
      name: /remove sku/i,
    })) {
      expect((button as HTMLButtonElement).disabled).toBe(true);
    }
  });

  it("reclassifies when thresholds change", () => {
    fillCorpusExample();
    expect(screen.getByTestId("abc-class-2").textContent).toBe("B");

    // A cutoff 96 pulls the second item (cumulative 95) into A;
    // B cutoff 99 leaves the third (cumulative 100) as C.
    setField("A cutoff", "96");
    setField("B cutoff", "99");
    expect(screen.getByTestId("result-A-count").textContent).toBe(
      "2A-class SKUs",
    );
    expect(screen.getByTestId("abc-class-2").textContent).toBe("A");
    expect(screen.getByTestId("abc-class-3").textContent).toBe("C");
  });

  it("shows an inline threshold error and drops the table on bad cutoffs", () => {
    fillCorpusExample();
    expect(screen.getByRole("table")).toBeTruthy();

    setField("A cutoff", "97"); // A (97) >= B (95)
    expect(screen.getByRole("alert").textContent).toContain(
      "0 < A < B ≤ 100",
    );
    expect(screen.queryByRole("table")).toBeNull(); // no stale table
    expect(screen.getByTestId("result-A-count").textContent).toBe(
      "·A-class SKUs",
    );

    setField("A cutoff", "80");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("table")).toBeTruthy();
  });

  it("keeps copy disabled while invalid", () => {
    const copyButton = screen.getByRole("button", {
      name: "Copy result",
    }) as HTMLButtonElement;
    expect(copyButton.disabled).toBe(true);
    fillCorpusExample();
    expect(copyButton.disabled).toBe(false);
  });

  it("copies the one-line summary and the full ranked table, with a toast", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    fillCorpusExample();
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    expect(await screen.findByText("Copied")).toBeTruthy();
    expect(writeText).toHaveBeenCalledWith(
      "ABC analysis: A 1 (54.0%), B 1 (41.0%), C 1 (5.0%) of 100,000 total value",
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy full" }));
    const full = writeText.mock.calls[1][0] as string;
    expect(full).toContain(`${calculator.title}`);
    expect(full).toContain("Thresholds: A ≤ 80% cumulative value, B ≤ 95%");
    expect(full).toContain(
      "Rank | SKU | Annual value | Share % | Cumulative % | Class",
    );
    expect(full).toContain("1 | alpha | 54,000 | 54.0 | 54.0 | A");
    expect(full).toContain("2 | bravo | 41,000 | 41.0 | 95.0 | B");
    expect(full).toContain("3 | charlie | 5,000 | 5.0 | 100.0 | C");
    expect(full).toContain("Total annual usage value: 100,000");
    expect(full).toContain("/abc-analysis-calculator/");
  });
});
