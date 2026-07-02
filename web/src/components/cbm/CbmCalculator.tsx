"use client";

/**
 * CBM calculator island — the one custom tool (calculator.cbm), a typed
 * port of docs/mockups/opscrunch_cbm_calculator_v0.2.html over the shared
 * calc library. Registered for "calculator.cbm" in toolRegistry.ts.
 *
 * Unlike the generic CalculatorTool this island recalculates live on every
 * change; the Crunch button just replays the readout flash (and emits the
 * result/validation analytics events). Invalid input (any dimension <= 0 or
 * carton count < 1) renders middot placeholders with no error shouting,
 * exactly like the prototype.
 *
 * State/math live in useCbm.ts; mode/container presets in freightModes.ts.
 */

import type { FormEvent } from "react";
import { track } from "@/lib/analytics";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AdvancedPanel from "../tool/AdvancedPanel";
import type { CalculatorToolProps } from "../tool/CalculatorTool";
import CopyRow from "../tool/CopyRow";
import CrunchButton from "../tool/CrunchButton";
import DerivedRow, { DerivedRows } from "../tool/DerivedRow";
import InputField from "../tool/InputField";
import Readout from "../tool/Readout";
import Toast from "../tool/Toast";
import ToolShell from "../tool/ToolShell";
import UnitToggle from "../tool/UnitToggle";
import { useClipboard } from "../tool/useClipboard";
import styles from "./CbmCalculator.module.css";
import {
  CONTAINERS,
  CONTAINER_KEYS,
  MODES,
  MODE_KEYS,
  type ContainerKey,
  type ModeKey,
} from "./freightModes";
import {
  useCbm,
  type CbmComputed,
  type DimUnit,
  type WeightFigure,
  type WeightUnit,
} from "./useCbm";

const DIM_UNITS: readonly DimUnit[] = ["mm", "cm", "in"];
const MIDDOT = "·";

/**
 * Grouped number display for the live readout: en-US thousands grouping
 * with FIXED decimals per quantity (m³ 3dp, kg 1dp, lb 0dp, % 1dp), matching
 * the prototype. This deliberately differs from lib formatResult, which
 * half-to-even rounds and strips trailing zeros for the record-driven tools:
 * a live dashboard-style readout needs stable digit widths ("9.600", not
 * "9.6") and grouping ("1,600.0"), so the formatting is local to this island.
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

function containerFillText(container: NonNullable<CbmComputed["container"]>): string {
  return container.unitsNeeded !== null
    ? `${container.unitsNeeded} units (${formatGrouped(container.fillPct, 0)} %)`
    : `${formatGrouped(container.fillPct, 1)} %`;
}

export default function CbmCalculator({ calculator }: CalculatorToolProps) {
  const cbm = useCbm();
  const { snapshot, computed } = cbm;
  const { toast, copy } = useClipboard();
  const isSea = MODES[snapshot.mode].system === "sea";

  function markStart() {
    if (cbm.markStart()) {
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
    cbm.crunch();
    if (computed.valid) {
      track({
        name: "calculator_result",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    } else {
      track({
        name: "calculator_validation_error",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    }
  }

  const volumetricLabel = isSea
    ? "Revenue tonnes (per CBM or tonne)"
    : `Volumetric weight (${computed.modeName})`;
  const volumetricText = !computed.valid
    ? MIDDOT
    : isSea
      ? `${formatGrouped(computed.revenueTonnes ?? 0, 3)} RT`
      : computed.volumetric
        ? formatWeight(computed.volumetric)
        : MIDDOT;

  function copyText(variant: "result" | "full") {
    if (!computed.valid) return;
    track({
      name: "result_copy",
      toolId: calculator.id,
      slug: calculator.slug,
      variant,
    });
    if (variant === "result") {
      let text = `CBM ${formatGrouped(computed.totalM3, 3)} m³`;
      text += ` | ${isSea ? "Revenue tonnes" : "Volumetric"} ${volumetricText}`;
      if (!isSea) text += ` (${computed.modeName})`;
      if (computed.chargeable) {
        text += ` | Chargeable ${formatWeight(computed.chargeable)}`;
      }
      void copy(text);
      return;
    }
    const lines = [
      `${SITE_NAME} - ${calculator.title}`,
      `Carton: ${snapshot.length} × ${snapshot.width} × ${snapshot.height} ${snapshot.unit}  x  ${snapshot.qty} cartons`,
      `Transport: ${computed.modeName}`,
      `CBM total: ${formatGrouped(computed.totalM3, 3)} m³`,
      `CBM per carton: ${formatGrouped(computed.perCartonM3, 3)} m³`,
    ];
    if (isSea && computed.revenueTonnes !== null) {
      lines.push(`Revenue tonnes: ${formatGrouped(computed.revenueTonnes, 3)} RT`);
    }
    if (computed.volumetric) {
      lines.push(`Volumetric weight: ${formatWeight(computed.volumetric)}`);
    }
    if (computed.actual) {
      lines.push(`Actual gross weight: ${formatWeight(computed.actual)}`);
    }
    if (computed.chargeable) {
      lines.push(`Chargeable weight: ${formatWeight(computed.chargeable)}`);
    }
    if (computed.container) {
      lines.push(
        `Container: ${computed.container.name} ${containerFillText(computed.container)}`,
      );
    }
    lines.push(`${BASE_URL}/${calculator.slug}/`);
    void copy(lines.join("\n"));
  }

  const hint = isSea
    ? "Sea / LCL freight is rated per revenue tonne — the greater of the " +
      "shipment's cubic metres and its weight in tonnes. Rates and minimums " +
      "vary by forwarder, so confirm before booking."
    : `Volumetric weight uses the ${computed.modeName} divisor` +
      (computed.valid ? ` of ${formatGrouped(computed.divisor, 0)}` : "") +
      ". Divisor presets are carrier-published figures, checked July 2026. " +
      "Your rate card may differ — confirm with your carrier. Chargeable " +
      "weight is the greater of actual and volumetric.";

  return (
    <form onSubmit={crunch} noValidate>
      <ToolShell
        inputs={
          <>
            <span className={styles.groupLbl}>Shipment</span>
            <div className={styles.dims}>
              {(["length", "width", "height"] as const).map((dim) => (
                <InputField
                  key={dim}
                  id={`${calculator.slug}-${dim}`}
                  label={dim.charAt(0).toUpperCase() + dim.slice(1)}
                  unit={snapshot.unit}
                  value={snapshot[dim]}
                  onChange={(value) => changed(() => cbm.setDim(dim, value))}
                />
              ))}
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <span className={styles.fieldLabel} id={`${calculator.slug}-unit-label`}>
                  Unit
                </span>
                <UnitToggle
                  label="Dimension unit"
                  options={DIM_UNITS.map((unit) => ({ value: unit, label: unit }))}
                  value={snapshot.unit}
                  onChange={(unit) => changed(() => cbm.setUnit(unit as DimUnit))}
                />
              </div>
              <InputField
                id={`${calculator.slug}-Q`}
                label="Cartons"
                value={snapshot.qty}
                onChange={(value) => changed(() => cbm.setQty(value))}
              />
            </div>
            <CrunchButton />
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
                    changed(() => cbm.setMode(event.target.value as ModeKey))
                  }
                >
                  {MODE_KEYS.map((key) => (
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
                    disabled={isSea}
                    onChange={(event) =>
                      changed(() => cbm.setDivisorText(event.target.value))
                    }
                    aria-describedby={`${calculator.slug}-divisor-help`}
                  />
                  <p id={`${calculator.slug}-divisor-help`} className={styles.help}>
                    Carrier-published preset, checked July 2026 — your rate
                    card may differ. Editing switches to a custom divisor.
                  </p>
                </div>
                <InputField
                  id={`${calculator.slug}-AW`}
                  label="Actual gross weight"
                  unit={snapshot.actualWeightUnit}
                  value={snapshot.actualWeight}
                  onChange={(value) => changed(() => cbm.setActualWeight(value))}
                  help="Optional"
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
                        cbm.setActualWeightUnit(event.target.value as WeightUnit),
                      )
                    }
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor={`${calculator.slug}-container`}
                  >
                    Container fit
                  </label>
                  <select
                    id={`${calculator.slug}-container`}
                    className={styles.select}
                    value={snapshot.container}
                    onChange={(event) =>
                      changed(() =>
                        cbm.setContainer(
                          event.target.value as ContainerKey | "none",
                        ),
                      )
                    }
                  >
                    <option value="none">None</option>
                    {CONTAINER_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {CONTAINERS[key].name} ({CONTAINERS[key].volumeM3} m³)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={snapshot.carrierRounding}
                  onChange={(event) =>
                    changed(() => cbm.setCarrierRounding(event.target.checked))
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
            key={cbm.crunchCount}
            tag="Total volume"
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
                    aria-pressed={snapshot.weightUnit === unit}
                    onClick={() => changed(() => cbm.setWeightUnit(unit))}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            }
            value={computed.valid ? formatGrouped(computed.totalM3, 3) : null}
            unit="m³"
            valueTestId="result-CBM"
            flash={cbm.crunchCount > 0}
            hint={hint}
          >
            <DerivedRows>
              <DerivedRow
                label="Per carton"
                value={
                  computed.valid
                    ? `${formatGrouped(computed.perCartonM3, 3)} m³`
                    : MIDDOT
                }
                valueTestId="result-per-carton"
              />
              <DerivedRow
                label={volumetricLabel}
                value={volumetricText}
                valueTestId="result-VW"
              />
              {computed.actual ? (
                <DerivedRow
                  label="Actual gross weight"
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
              {computed.container ? (
                <DerivedRow
                  label={`Fill of ${computed.container.name}`}
                  value={containerFillText(computed.container)}
                  valueTestId="result-container-fill"
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
