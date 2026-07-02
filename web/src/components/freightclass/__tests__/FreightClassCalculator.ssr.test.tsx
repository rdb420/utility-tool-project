/**
 * Prerender guard: client islands are SSR'd, so the freight-class island
 * must render to static markup in a plain Node environment (NO jsdom — this
 * file deliberately runs without the jsdom pragma, so any window/document
 * access at render time throws) and the full 13-row NMFC scale table plus
 * the default result must land in the static HTML.
 */

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FORMULAS_BY_ID, calculatorBySlug } from "@/lib/records/records";
import FreightClassCalculator from "../FreightClassCalculator";

describe("FreightClassCalculator SSR", () => {
  it("renders to static markup in Node with the table and default result", () => {
    const calculator = calculatorBySlug("freight-class-calculator")!;
    expect(calculator).toBeDefined();
    const formulas = calculator.formula_ids.map((id) => FORMULAS_BY_ID[id]!);

    const html = renderToStaticMarkup(
      <FreightClassCalculator calculator={calculator} formulas={formulas} />,
    );

    // Default record inputs compute at render time: Class 100.
    expect(html).toContain("Class 100");
    expect(html).toContain("9.375 lb/ft³");
    // The 13-row scale table is part of the static HTML.
    expect(html).toContain(
      "NMFC freight-class density chart (13-subprovision scale)",
    );
    expect(html).toContain("2025-07-19");
    expect((html.match(/<tr/g) ?? []).length).toBe(14); // header + 13 bands
    expect(html).toContain("Class 92.5");
    expect(html).toContain("50+ lb/ft³");
  });
});
