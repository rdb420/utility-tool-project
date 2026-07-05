"use client";

/**
 * Generic record-driven calculator island.
 *
 * String state per input symbol; validation mirrors the calc library's
 * guards exactly (docs/planning/MVP_PAGE_SPECS.md "Input validation behavior");
 * crunch runs every formula in `formula_ids` through FORMULA_REGISTRY in
 * order, chaining RAW outputs into the input pool (never rounding between
 * formulas); display goes through formatResult. Analytics events carry ids,
 * slugs, and field names only — never input values.
 */

import { useMemo, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { FORMULA_REGISTRY, ValidationError, formatResult } from "@/lib/calc";
import type {
  CalculatorRecord,
  FormulaRecord,
  Input,
} from "@/lib/records/types.gen";
import { BASE_URL, SITE_NAME } from "@/config/site";
import styles from "./CalculatorTool.module.css";
import ClearButton from "./ClearButton";
import CopyRow from "./CopyRow";
import CrunchButton from "./CrunchButton";
import DerivedRow, { DerivedRows } from "./DerivedRow";
import InputField from "./InputField";
import Readout from "./Readout";
import Toast from "./Toast";
import ToolShell from "./ToolShell";
import { useClipboard } from "./useClipboard";

export interface CalculatorToolProps {
  calculator: CalculatorRecord;
  /** The records behind `calculator.formula_ids`, in the same order. */
  formulas: FormulaRecord[];
}

/** Inline validation messages (kept in lockstep with the component tests). */
export const MESSAGES = {
  required: "Enter a value.",
  notANumber: "Enter a number.",
  negative: "Must be zero or more.",
  notPositive: "Must be greater than zero.",
} as const;

interface LastRun {
  /** Resolved numeric inputs (defaults applied), raw. */
  inputs: Record<string, number>;
  /** Inputs plus every chained formula output, raw. */
  outputs: Record<string, number>;
}

function initialValues(inputs: readonly Input[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const input of inputs) {
    values[input.symbol] =
      input.default !== undefined ? String(input.default) : "";
  }
  return values;
}

export default function CalculatorTool({
  calculator,
  formulas,
}: CalculatorToolProps) {
  const allInputs = useMemo(
    () => calculator.input_groups.flatMap((group) => group.inputs),
    [calculator],
  );

  /** Union of the registry's strictly-positive symbols for these formulas. */
  const positiveSymbols = useMemo(() => {
    const set = new Set<string>();
    for (const id of calculator.formula_ids) {
      for (const symbol of FORMULA_REGISTRY[id]?.positiveInputs ?? []) {
        set.add(symbol);
      }
    }
    return set;
  }, [calculator]);

  const [values, setValues] = useState<Record<string, string>>(() =>
    initialValues(allInputs),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [crunchCount, setCrunchCount] = useState(0);
  const startedRef = useRef(false);
  const { toast, copy } = useClipboard();

  const cards = calculator.result_cards;
  const primaryCard = cards.find((card) => card.primary) ?? cards[0];
  const secondaryCards = cards.filter((card) => card !== primaryCard);

  function markStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track({
      name: "calculator_start",
      toolId: calculator.id,
      slug: calculator.slug,
    });
  }

  function handleChange(symbol: string, value: string) {
    markStart();
    setValues((current) => ({ ...current, [symbol]: value }));
    setErrors((current) => {
      if (!(symbol in current)) return current;
      const next = { ...current };
      delete next[symbol];
      return next;
    });
  }

  function emitValidationError(field?: string) {
    track({
      name: "calculator_validation_error",
      toolId: calculator.id,
      slug: calculator.slug,
      field,
    });
  }

  /**
   * Backstop mapping from a library ValidationError message to the input it
   * concerns (pre-validation catches everything in practice). Matches the
   * message's leading token against input symbols, then labels.
   */
  function fieldForMessage(message: string): string | undefined {
    const subject = message.split(" must ")[0]?.trim().toLowerCase();
    if (!subject) return undefined;
    const bySymbol = allInputs.find(
      (input) => input.symbol.toLowerCase() === subject,
    );
    if (bySymbol) return bySymbol.symbol;
    const normalized = subject.replace(/_/g, " ");
    const byLabel = allInputs.find(
      (input) => input.label.toLowerCase() === normalized,
    );
    if (byLabel) return byLabel.symbol;
    for (const formula of formulas) {
      const byName = formula.inputs.find(
        (input) => input.name.toLowerCase() === normalized,
      );
      if (byName) return byName.symbol;
    }
    return undefined;
  }

  function crunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const pool: Record<string, number> = {};

    for (const input of allInputs) {
      const raw = (values[input.symbol] ?? "").trim();
      if (raw === "") {
        if (input.default !== undefined) {
          pool[input.symbol] = input.default;
          continue;
        }
        nextErrors[input.symbol] = MESSAGES.required;
        continue;
      }
      const value = Number(raw);
      if (!Number.isFinite(value)) {
        nextErrors[input.symbol] = MESSAGES.notANumber;
        continue;
      }
      if (positiveSymbols.has(input.symbol) && value <= 0) {
        nextErrors[input.symbol] = MESSAGES.notPositive;
        continue;
      }
      if (input.min === 0 && value < 0) {
        nextErrors[input.symbol] = MESSAGES.negative;
        continue;
      }
      pool[input.symbol] = value;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormError(null);
      setLastRun(null); // never show a stale result next to an error
      for (const field of Object.keys(nextErrors)) emitValidationError(field);
      return;
    }

    const resolvedInputs = { ...pool };
    try {
      for (const id of calculator.formula_ids) {
        const entry = FORMULA_REGISTRY[id];
        if (!entry) {
          throw new ValidationError(`no registry entry for formula: ${id}`);
        }
        // Chain raw outputs into the pool so later formulas can consume them.
        Object.assign(pool, entry.compute(pool));
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const field = fieldForMessage(error.message);
        if (field) {
          setErrors({ [field]: error.message });
          setFormError(null);
        } else {
          setErrors({});
          setFormError(error.message);
        }
        setLastRun(null);
        emitValidationError(field);
        return;
      }
      throw error;
    }

    setErrors({});
    setFormError(null);
    setLastRun({ inputs: resolvedInputs, outputs: pool });
    setCrunchCount((count) => count + 1);
    track({
      name: "calculator_result",
      toolId: calculator.id,
      slug: calculator.slug,
    });
  }

  /**
   * Reset the island to its initial state: defaults back in the fields, no
   * errors, empty readout. Leaves startedRef alone (the session already
   * started) and deliberately emits no analytics event.
   */
  function clearInputs() {
    setValues(initialValues(allInputs));
    setErrors({});
    setFormError(null);
    setLastRun(null);
    setCrunchCount(0);
  }

  function copyText(variant: "result" | "full") {
    if (!lastRun) return;
    track({
      name: "result_copy",
      toolId: calculator.id,
      slug: calculator.slug,
      variant,
    });
    if (variant === "result") {
      void copy(
        `${primaryCard.label}: ${formatResult(
          lastRun.outputs[primaryCard.symbol],
          primaryCard.unit,
        )}`,
      );
      return;
    }
    const lines = [`${SITE_NAME} - ${calculator.title}`];
    for (const input of allInputs) {
      lines.push(
        `${input.label}: ${lastRun.inputs[input.symbol]} ${input.unit}`,
      );
    }
    for (const card of cards) {
      lines.push(
        `${card.label}: ${formatResult(lastRun.outputs[card.symbol], card.unit)}`,
      );
    }
    lines.push(`${BASE_URL}/${calculator.slug}/`);
    void copy(lines.join("\n"));
  }

  const primaryValue = lastRun
    ? formatResult(lastRun.outputs[primaryCard.symbol])
    : null;

  return (
    <form onSubmit={crunch} noValidate>
      <ToolShell
        inputs={
          <>
            {calculator.input_groups.map((group) => (
              <div key={group.label}>
                <span className={styles.groupLbl}>{group.label}</span>
                {group.inputs.map((input) => (
                  <InputField
                    key={input.symbol}
                    id={`${calculator.slug}-${input.symbol}`}
                    label={input.label}
                    unit={input.unit}
                    value={values[input.symbol] ?? ""}
                    onChange={(value) => handleChange(input.symbol, value)}
                    error={errors[input.symbol]}
                    help={input.help}
                  />
                ))}
              </div>
            ))}
            <CrunchButton />
            <ClearButton onClear={clearInputs} />
            {formError ? (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            ) : null}
          </>
        }
        readout={
          <Readout
            key={crunchCount}
            tag={primaryCard.label}
            value={primaryValue}
            unit={primaryCard.unit}
            valueTestId={`result-${primaryCard.symbol}`}
            flash={crunchCount > 0}
            hint={primaryCard.description}
          >
            {secondaryCards.length > 0 ? (
              <DerivedRows>
                {secondaryCards.map((card) => (
                  <DerivedRow
                    key={card.symbol}
                    label={card.label}
                    value={
                      lastRun
                        ? formatResult(lastRun.outputs[card.symbol], card.unit)
                        : "·"
                    }
                    valueTestId={`result-${card.symbol}`}
                  />
                ))}
              </DerivedRows>
            ) : null}
            <CopyRow
              onCopyResult={() => copyText("result")}
              onCopyFull={() => copyText("full")}
              disabled={!lastRun}
            />
          </Readout>
        }
      />
      <Toast message={toast ?? ""} show={toast !== null} />
    </form>
  );
}
