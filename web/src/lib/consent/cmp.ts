/**
 * Typed wrapper around the consentmanager (consentmanager.net) JavaScript API.
 *
 * Only the public `__cmp(...)` function is used — never the internal
 * `window.cmpmngr` object (per consentmanager guidance). Every call is guarded
 * so it is a safe no-op on the server, before hydration, and before the CMP
 * script (loaded `afterInteractive`) is ready.
 *
 * Docs: https://help.consentmanager.net/books/cmp/page/javascript-api
 */

/** consentmanager vendor id for Google Analytics (stable global id). */
export const GOOGLE_ANALYTICS_VENDOR = "s26";

/** Subset of the `getCMPData` object we rely on. */
export interface CmpData {
  gdprApplies: boolean;
  /** 0 none / 1 GDPR / 2 CCPA. */
  regulation: number;
  tcfcompliant: boolean;
  purposeConsents: Record<string, boolean>;
  vendorConsents: Record<string, boolean>;
  googleVendorConsents?: Record<string, boolean>;
  consentstring?: string;
}

type CmpCallback = (result: unknown, success: boolean) => void;
type CmpFn = (
  command: string,
  parameter?: unknown,
  callback?: CmpCallback | null,
  async?: boolean,
) => unknown;

declare global {
  interface Window {
    __cmp?: CmpFn;
  }
}

/** True once the consentmanager API is loaded and callable. */
export function isCmpReady(): boolean {
  return typeof window !== "undefined" && typeof window.__cmp === "function";
}

/**
 * Synchronous `getCMPData`. Returns null if the CMP has not loaded yet — read it
 * from inside an {@link onConsentEvent} handler when you need it guaranteed-ready.
 */
export function getCmpData(): CmpData | null {
  if (!isCmpReady()) return null;
  try {
    // async=false → __cmp returns the result directly (consentmanager extension).
    const data = window.__cmp!("getCMPData", null, null, false);
    return data && typeof data === "object" ? (data as CmpData) : null;
  } catch {
    return null;
  }
}

/** Has the visitor consented to a specific consentmanager vendor id? */
export function hasVendorConsent(vendorId: string): boolean {
  return Boolean(getCmpData()?.vendorConsents?.[vendorId]);
}

/** Has the visitor consented to Google Analytics (vendor `s26`)? */
export function hasAnalyticsConsent(): boolean {
  return hasVendorConsent(GOOGLE_ANALYTICS_VENDOR);
}

/**
 * Register a handler for a consentmanager event (default `"consent"` — fired
 * when consent is gathered or a stored choice is found). Returns a cleanup fn.
 */
export function onConsentEvent(
  handler: () => void,
  eventName = "consent",
): () => void {
  if (!isCmpReady()) return () => {};
  try {
    window.__cmp!("addEventListener", [eventName, handler, false], null);
  } catch {
    /* ignore */
  }
  return () => {
    if (!isCmpReady()) return;
    try {
      window.__cmp!("removeEventListener", [eventName, handler, false], null);
    } catch {
      /* ignore */
    }
  };
}

/** Open the consentmanager preference manager (to change/withdraw consent). */
export function openPreferences(): void {
  if (!isCmpReady()) return;
  try {
    window.__cmp!("showScreenAdvanced");
  } catch {
    /* ignore */
  }
}

/** Open the consentmanager cookie table. */
export function openCookieList(): void {
  if (!isCmpReady()) return;
  try {
    window.__cmp!("showCookies");
  } catch {
    /* ignore */
  }
}
