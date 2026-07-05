"use client";

/**
 * Shared dimensional/volumetric weight island — ONE component registered for
 * BOTH calculator.dimensional_weight and calculator.volumetric_weight in
 * toolRegistry.ts. The record passed in configures the defaults (divisor 139
 * -> inches/pounds, 6000 -> centimetres/kilograms) and the headline label
 * (DW "Dimensional weight" / VW "Volumetric weight" — same math, two unit
 * conventions).
 *
 * Like the CBM island it recalculates live on every change; the Crunch
 * button replays the readout flash. calculator_result is throttled to
 * changes of the headline number (crunching the same figure twice emits
 * once). State/math live in useDimWeight.ts.
 */

import { useRef, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AdvancedPanel from "../tool/AdvancedPanel";
import type { CalculatorToolProps } from "../tool/CalculatorTool";
import ClearButton from "../tool/ClearButton";
import CopyRow from "../tool/CopyRow";
import CrunchButton from "../tool/CrunchButton";
import DerivedRow, { DerivedRows } from "../tool/DerivedRow";
import InputField from "../tool/InputField";
import Readout from "../tool/Readout";
import Toast from "../tool/Toast";
import ToolShell from "../tool/ToolShell";
import UnitToggle from "../tool/UnitToggle";
import { useClipboard } from "../tool/useClipboard";
import { MODES } from "../cbm/freightModes";
import styles from "./DimWeightCalculator.module.css";
import {
  DIM_MODE_KEYS,
  useDimWeight,
  type DimModeKey,
  type DimUnit,
  type WeightFigure,
  type WeightUnit,
} from "./useDimWeight";

const DIM_UNITS: readonly DimUnit[] = ["cm", "in"];
const MIDDOT = "·";

const HINT =
  "Carrier-published divisors, checked July 2026. Your rate card may " +
  "differ — confirm with your carrier. Chargeable weight is the greater " +
  "of actual and volumetric.";

/**
 * Grouped number display, matching the CBM island: en-US thousands grouping
 * with FIXED decimals per quantity (kg 1dp, lb 0dp, volumes 0dp, m³ 3dp) so
 * the live readout keeps stable digit widths.
 */
function formatGrouped(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatWeight(figure: WeightFigure): string {
  return `${formatGrouped(figure.value, figure.unit === "kg" ? 1 : 0)} ${figure.unit}`;
}

export default function DimWeightCalculator({
  calculator,
}: CalculatorToolProps) {
  const dim = useDimWeight(calculator);
  const { snapshot, computed } = dim;
  const { toast, copy } = useClipboard();
  const lastResultRef = useRef<string | null>(null);

  const primaryCard =
    calculator.result_cards.find((card) => card.primary) ??
    calculator.result_cards[0];
  const shipmentLabel = calculator.input_groups[0]?.label ?? "Shipment";
  const qtyLabel =
    calculator.input_groups
      .flatMap((group) => group.inputs)
      .find((input) => input.symbol === "Q")?.label ?? "Pieces";

  const isImperial = computed.system === "imperial";
  const volumeUnit = isImperial ? "in³" : "cm³";
  const divisorText = `÷${formatGrouped(computed.divisor, 0)} ${
    isImperial ? "in³/lb" : "cm³/kg"
  }`;
  const displayUnit: WeightUnit =
    computed.volumetric?.unit ??
    (snapshot.manualWeightUnit
      ? snapshot.weightUnit
      : isImperial
        ? "lb"
        : "kg");
  const headline = computed.volumetric ? formatWeight(computed.volumetric) : null;
  const billedOnText =
    computed.billedOn === null
      ? null
      : computed.billedOn === "volumetric"
        ? "Volumetric weight"
        : "Actual weight";

  function markStart() {
    if (dim.markStart()) {
      track({
        name: "calculator_start",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    }
  }

  /** Every control change funnels through here: live recalc + start event. */
  function changed(apply: () => void) {
    markStart();
    apply();
  }

  function crunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dim.crunch();
    if (!computed.valid) {
      track({
        name: "calculator_validation_error",
        toolId: calculator.id,
        slug: calculator.slug,
      });
      return;
    }
    // Throttle calculator_result to changes of the headline number:
    // re-crunching the same figure only replays the flash.
    if (headline !== null && headline !== lastResultRef.current) {
      lastResultRef.current = headline;
      track({
        name: "calculator_result",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    }
  }

  /**
   * Clear inputs: back to the record defaults, with the result throttle
   * cleared so a later crunch reports fresh. Fires no analytics.
   */
  function clearInputs() {
    dim.reset();
    lastResultRef.current = null;
  }

  function copyText(variant: "result" | "full") {
    if (!computed.valid || !computed.volumetric) return;
    track({
      name: "result_copy",
      toolId: calculator.id,
      slug: calculator.slug,
      variant,
    });
    if (variant === "result") {
      let text = `${primaryCard.label} ${formatWeight(computed.volumetric)} (${computed.modeName})`;
      if (computed.chargeable) {
        text += ` | Chargeable ${formatWeight(computed.chargeable)}`;
        if (billedOnText) text += ` (billed on ${billedOnText.toLowerCase()})`;
      }
      void copy(text);
      return;
    }
    const lines = [
      `${SITE_NAME} - ${calculator.title}`,
      `${shipmentLabel}: ${snapshot.length} × ${snapshot.width} × ${snapshot.height} ${snapshot.unit}  x  ${snapshot.qty} ${qtyLabel.toLowerCase()}`,
      `Mode: ${computed.modeName}`,
      `Divisor: ${divisorText}`,
      `Total volume: ${formatGrouped(computed.volumeNative, 0)} ${volumeUnit} (${formatGrouped(computed.volumeM3, 3)} m³)`,
      `${primaryCard.label}: ${formatWeight(computed.volumetric)}`,
    ];
    if (computed.actual) {
      lines.push(`Actual weight: ${formatWeight(computed.actual)}`);
    }
    if (computed.chargeable && billedOnText) {
      lines.push(
        `Chargeable weight: ${formatWeight(computed.chargeable)} (billed on ${billedOnText.toLowerCase()})`,
      );
    }
    lines.push(`${BASE_URL}/${calculator.slug}/`);
    void copy(lines.join("\n"));
  }

  return (
    <form onSubmit={crunch} noValidate>
      <ToolShell
        inputs={
          <>
            <span className={styles.groupLbl}>{shipmentLabel}</span>
            <div className={styles.dims}>
              {(["length", "width", "height"] as const).map((d) => (
                <InputField
                  key={d}
                  id={`${calculator.slug}-${d}`}
                  label={d.charAt(0).toUpperCase() + d.slice(1)}
                  unit={snapshot.unit}
                  value={snapshot[d]}
                  onChange={(value) => changed(() => dim.setDim(d, value))}
                />
              ))}
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <span
                  className={styles.fieldLabel}
                  id={`${calculator.slug}-unit-label`}
                >
                  Unit
                </span>
                <UnitToggle
                  label="Dimension unit"
                  options={DIM_UNITS.map((unit) => ({
                    value: unit,
                    label: unit,
                  }))}
                  value={snapshot.unit}
                  onChange={(unit) => changed(() => dim.setUnit(unit as DimUnit))}
                />
              </div>
              <InputField
                id={`${calculator.slug}-Q`}
                label={qtyLabel}
                value={snapshot.qty}
                onChange={(value) => changed(() => dim.setQty(value))}
              />
            </div>
            <CrunchButton />
            <ClearButton onClear={clearInputs} />
            <AdvancedPanel>
              <span className={styles.groupLbl}>Carrier &amp; mode</span>
              <div className={styles.field}>
                <label
                  className={styles.fieldLabel}
                  htmlFor={`${calculator.slug}-mode`}
                >
                  Transport mode
                </label>
                <select
                  id={`${calculator.slug}-mode`}
                  className={styles.select}
                  value={snapshot.mode}
                  onChange={(event) =>
                    changed(() => dim.setMode(event.target.value as DimModeKey))
                  }
                >
                  {DIM_MODE_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {MODES[key].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor={`${calculator.slug}-divisor`}
                  >
                    Divisor
                  </label>
                  <input
                    id={`${calculator.slug}-divisor`}
                    className={styles.input}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={snapshot.divisorText}
                    onChange={(event) =>
                      changed(() => dim.setDivisorText(event.target.value))
                    }
                    aria-describedby={`${calculator.slug}-divisor-help`}
                  />
                  <p
                    id={`${calculator.slug}-divisor-help`}
                    className={styles.help}
                  >
                    Carrier-published preset, checked July 2026 — your rate
                    card may differ. Editing switches to a custom divisor.
                  </p>
                </div>
                <InputField
                  id={`${calculator.slug}-AW`}
                  label="Actual weight"
                  unit={snapshot.actualWeightUnit}
                  value={snapshot.actualWeight}
                  onChange={(value) => changed(() => dim.setActualWeight(value))}
                  help="Optional — adds the chargeable-weight comparison."
                />
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor={`${calculator.slug}-aw-unit`}
                  >
                    Weight unit (actual)
                  </label>
                  <select
                    id={`${calculator.slug}-aw-unit`}
                    className={styles.select}
                    value={snapshot.actualWeightUnit}
                    onChange={(event) =>
                      changed(() =>
                        dim.setActualWeightUnit(event.target.value as WeightUnit),
                      )
                    }
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={snapshot.carrierRounding}
                  onChange={(event) =>
                    changed(() => dim.setCarrierRounding(event.target.checked))
                  }
                />
                Apply carrier rounding (whole-inch round-up; billable weight up
                to the next lb / 0.5 kg)
              </label>
            </AdvancedPanel>
          </>
        }
        readout={
          <Readout
            key={dim.crunchCount}
            tag={primaryCard.label}
            right={
              <div
                className={styles.wtoggle}
                role="group"
                aria-label="Weight unit"
              >
                {(["kg", "lb"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    aria-pressed={displayUnit === unit}
                    onClick={() => changed(() => dim.setWeightUnit(unit))}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            }
            value={
              computed.volumetric
                ? formatGrouped(
                    computed.volumetric.value,
                    computed.volumetric.unit === "kg" ? 1 : 0,
                  )
                : null
            }
            unit={displayUnit}
            valueTestId={`result-${primaryCard.symbol}`}
            flash={dim.crunchCount > 0}
            hint={HINT}
          >
            <DerivedRows>
              <DerivedRow
                label="Total volume"
                value={
                  computed.valid
                    ? `${formatGrouped(computed.volumeNative, 0)} ${volumeUnit} (${formatGrouped(computed.volumeM3, 3)} m³)`
                    : MIDDOT
                }
                valueTestId="result-volume"
              />
              <DerivedRow
                label="Divisor in use"
                value={divisorText}
                valueTestId="result-divisor"
              />
              {computed.actual ? (
                <DerivedRow
                  label="Actual weight"
                  value={formatWeight(computed.actual)}
                  valueTestId="result-AW"
                />
              ) : null}
              {computed.chargeable ? (
                <DerivedRow
                  label="Chargeable weight"
                  value={formatWeight(computed.chargeable)}
                  charge
                  valueTestId="result-CW"
                />
              ) : null}
              {billedOnText ? (
                <DerivedRow
                  label="Billed on"
                  value={billedOnText}
                  valueTestId="result-billed-on"
                />
              ) : null}
            </DerivedRows>
            <CopyRow
              onCopyResult={() => copyText("result")}
              onCopyFull={() => copyText("full")}
              disabled={!computed.valid}
            />
          </Readout>
        }
      />
      <Toast message={toast ?? ""} show={toast !== null} />
    </form>
  );
}
