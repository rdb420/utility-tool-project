"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Consent scaffold for the ad/analytics stack.
 *
 * The choice lives in localStorage under `oc-consent`; hook instances read it
 * through `useSyncExternalStore`. Cross-component sync happens two ways:
 *   - a custom window event for other hook instances in the same tab, and
 *   - the native `storage` event for other tabs.
 *
 * SSR guard: the server snapshot always reports `unset` with `ready` false;
 * after hydration the store re-reads, so server HTML and the hydration pass
 * never disagree.
 */

export type ConsentState = "unset" | "granted" | "denied";
export type ConsentChoice = Exclude<ConsentState, "unset">;

export const CONSENT_STORAGE_KEY = "oc-consent";

/** Same-tab sync channel (the `storage` event only fires in *other* tabs). */
const CONSENT_CHANGE_EVENT = "oc-consent-change";

function readStoredConsent(): ConsentState {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : "unset";
  } catch {
    // Storage blocked (private mode, enterprise policy) — treat as unset.
    return "unset";
  }
}

function subscribeToConsent(onStoreChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const serverConsentSnapshot = (): ConsentState => "unset";
const noopSubscribe = () => () => {};

export function useConsent(): {
  consent: ConsentState;
  /** False on the server and during hydration (SSR guard for the banner). */
  ready: boolean;
  setConsent: (next: ConsentChoice) => void;
} {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readStoredConsent,
    serverConsentSnapshot,
  );
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const setConsent = useCallback((next: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch {
      // Persisting failed; without storage the banner reappears next visit.
    }
    // Wakes every subscribed hook instance (including this one) to re-read.
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }, []);

  return { consent, ready, setConsent };
}
