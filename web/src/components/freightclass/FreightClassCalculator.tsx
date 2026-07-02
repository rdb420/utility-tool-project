"use client";

/**
 * Freight-class calculator island (calculator.freight_class) — the custom
 * tool behind /freight-class-calculator/. Same props contract as the generic
 * CalculatorTool; registered in toolRegistry.ts.
 *
 * CBM-island pattern: live recalculation on every change (the Crunch button
 * just replays the readout flash); invalid input renders middot placeholders
 * with no error shouting. Two input modes — dimensions + weight, or a
 * density (PCF) figure entered directly. The math lives in useFreightClass /
 * nmfcClasses; nothing here touches window at render time, so the island
 * SSRs cleanly and the 13-row density table below the tool lands in the
 * static HTML.
 *
 * Analytics carry ids/slugs only, never input values. calculator_result is
 * throttled: it fires only when the computed class CHANGES (not per
 * keystroke), and only after the first interaction.
 */

import { useEffect, useRef, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { BASE_URL, SITE_NAME } from "@/config/site";
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
import styles from "./FreightClassCalculator.module.css";
import { EFFECTIVE_DATE, NMFC_CLASSES, type NmfcClassRow } from "./nmfcClasses";
import { useFreightClass, type InputMode } from "./useFreightClass";

const MIDDOT = "·";

const HINT =
  "Density estimate only — many commodities carry fixed NMFC classes. " +
  "Confirm with NMFTA ClassIT+ or your carrier.";

/** Fixed-decimal grouped display, matching the CBM island's readout style. */
function formatGrouped(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Density band text, e.g. "8–<10 lb/ft³"; the top band is open ("50+"). */
function bandText(band: NmfcClassRow): string {
  return band.maxDensityPcf === null
    ? `${band.minDensityPcf}+ lb/ft³`
    : `${band.minDensityPcf}–<${band.maxDensityPcf} lb/ft³`;
}

export default function FreightClassCalculator({
  calculator,
}: CalculatorToolProps) {
  const fc = useFreightClass();
  const { snapshot, computed } = fc;
  const { toast, copy } = useClipboard();
  const startedRef = useRef(false);
  const lastTrackedClassRef = useRef<number | null>(null);

  function markStart() {
    if (fc.markStart()) {
      startedRef.current = true;
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

  /**
   * calculator_result throttle: fire only when the computed class changes.
   * The initial mount records the default-state class without emitting, so
   * page loads (and keystrokes within the same band) stay silent.
   */
  useEffect(() => {
    const cls = computed?.cls ?? null;
    if (cls === null || cls === lastTrackedClassRef.current) return;
    const first = lastTrackedClassRef.current === null && !startedRef.current;
    lastTrackedClassRef.current = cls;
    if (first) return; // default state on mount — not a user result
    track({
      name: "calculator_result",
      toolId: calculator.id,
      slug: calculator.slug,
    });
  }, [computed, calculator.id, calculator.slug]);

  function crunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fc.crunch();
  }

  const classText = computed ? `Class ${computed.cls}` : null;
  const densityText = computed
    ? `${formatGrouped(computed.pcf, 3)} lb/ft³`
    : MIDDOT;
  const volumeText =
    computed && computed.v !== null
      ? `${formatGrouped(computed.v, 2)} ft³`
      : MIDDOT;

  function copyText(variant: "result" | "full") {
    if (!computed) return;
    track({
      name: "result_copy",
      toolId: calculator.id,
      slug: calculator.slug,
      variant,
    });
    if (variant === "result") {
      void copy(
        `Estimated freight class: Class ${computed.cls} (density ${formatGrouped(
          computed.pcf,
          3,
        )} lb/ft³)`,
      );
      return;
    }
    const lines = [`${SITE_NAME} - ${calculator.title}`];
    if (snapshot.mode === "dims") {
      lines.push(
        `Handling unit: ${snapshot.length} × ${snapshot.width} × ${snapshot.height} in  x  ${snapshot.qty} pieces`,
        `Actual weight: ${snapshot.actualWeight} lb`,
        `Total volume: ${volumeText}`,
      );
    } else {
      lines.push(`Density (entered): ${snapshot.directPcf} lb/ft³`);
    }
    lines.push(
      `Density: ${densityText}`,
      `Density band: ${bandText(computed.band)}`,
      `Estimated freight class: Class ${computed.cls} (density estimate only)`,
      `${BASE_URL}/${calculator.slug}/`,
    );
    void copy(lines.join("\n"));
  }

  return (
    <form onSubmit={crunch} noValidate>
      <ToolShell
        inputs={
          <>
            <span className={styles.groupLbl}>Shipment</span>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Input mode</span>
              <UnitToggle
                label="Input mode"
                options={[
                  { value: "dims", label: "Dimensions + weight" },
                  { value: "pcf", label: "Density (PCF)" },
                ]}
                value={snapshot.mode}
                onChange={(mode) =>
                  changed(() => fc.setMode(mode as InputMode))
                }
              />
            </div>
            {snapshot.mode === "dims" ? (
              <>
                <div className={styles.dims}>
                  {(["length", "width", "height"] as const).map((dim) => (
                    <InputField
                      key={dim}
                      id={`${calculator.slug}-${dim}`}
                      label={dim.charAt(0).toUpperCase() + dim.slice(1)}
                      unit="in"
                      value={snapshot[dim]}
                      onChange={(value) => changed(() => fc.setField(dim, value))}
                    />
                  ))}
                </div>
                <div className={styles.row2}>
                  <InputField
                    id={`${calculator.slug}-Q`}
                    label="Pieces"
                    value={snapshot.qty}
                    onChange={(value) => changed(() => fc.setField("qty", value))}
                    help="Number of identical handling units."
                  />
                  <InputField
                    id={`${calculator.slug}-AW`}
                    label="Actual weight"
                    unit="lb"
                    value={snapshot.actualWeight}
                    onChange={(value) =>
                      changed(() => fc.setField("actualWeight", value))
                    }
                    help="Total scale weight including packaging and pallet."
                  />
                </div>
              </>
            ) : (
              <InputField
                id={`${calculator.slug}-PCF`}
                label="Density"
                unit="lb/ft³"
                value={snapshot.directPcf}
                onChange={(value) =>
                  changed(() => fc.setField("directPcf", value))
                }
                help="Pounds per cubic foot — total weight divided by total cubic feet."
              />
            )}
            <CrunchButton />
          </>
        }
        readout={
          <Readout
            key={fc.crunchCount}
            tag="Estimated freight class"
            value={classText}
            unit="estimated"
            valueTestId="result-class"
            flash={fc.crunchCount > 0}
            hint={HINT}
          >
            <DerivedRows>
              <DerivedRow
                label="Density"
                value={densityText}
                valueTestId="result-PCF"
              />
              <DerivedRow
                label="Total cubic feet"
                value={volumeText}
                valueTestId="result-V"
              />
              <DerivedRow
                label="Density band"
                value={computed ? bandText(computed.band) : MIDDOT}
                valueTestId="result-band"
              />
            </DerivedRows>
            <CopyRow
              onCopyResult={() => copyText("result")}
              onCopyFull={() => copyText("full")}
              disabled={!computed}
            />
          </Readout>
        }
      />
      <section className={styles.scaleBlock}>
        <div className={styles.scaleWrap}>
          <table className={styles.scale}>
            <caption>
              NMFC freight-class density chart (13-subprovision scale),
              effective {EFFECTIVE_DATE}
            </caption>
            <thead>
              <tr>
                <th scope="col">Sub</th>
                <th scope="col">Density (lb/ft³)</th>
                <th scope="col">Class</th>
              </tr>
            </thead>
            <tbody>
              {NMFC_CLASSES.map((row) => (
                <tr
                  key={row.sub}
                  className={
                    computed && computed.band.sub === row.sub
                      ? styles.active
                      : undefined
                  }
                >
                  <td>{row.sub}</td>
                  <td>{bandText(row)}</td>
                  <td>Class {row.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.scaleNote}>
          Density subprovisions do not govern all commodities: many items
          carry fixed NMFC classes, and handling, stowability, and liability
          can override a density-implied class. ClassIT+ is the official
          lookup path.
        </p>
      </section>
      <Toast message={toast ?? ""} show={toast !== null} />
    </form>
  );
}
