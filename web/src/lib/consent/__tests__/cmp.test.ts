// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  GOOGLE_ANALYTICS_VENDOR,
  getCmpData,
  hasAnalyticsConsent,
  hasVendorConsent,
  isCmpReady,
  onConsentEvent,
  openCookieList,
  openPreferences,
} from "@/lib/consent/cmp";

afterEach(() => {
  delete (window as { __cmp?: unknown }).__cmp;
  vi.restoreAllMocks();
});

describe("consentmanager JS API wrapper", () => {
  it("is a safe no-op before the CMP loads", () => {
    expect(isCmpReady()).toBe(false);
    expect(getCmpData()).toBeNull();
    expect(hasVendorConsent("s26")).toBe(false);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(() => openPreferences()).not.toThrow();
    expect(onConsentEvent(() => {})).toBeTypeOf("function");
  });

  it("reads vendor consent from getCMPData", () => {
    window.__cmp = vi.fn((cmd: string) =>
      cmd === "getCMPData"
        ? {
            vendorConsents: { s26: true, s99: false },
            purposeConsents: {},
            gdprApplies: true,
            regulation: 1,
            tcfcompliant: true,
          }
        : undefined,
    ) as never;
    expect(GOOGLE_ANALYTICS_VENDOR).toBe("s26");
    expect(hasVendorConsent("s26")).toBe(true);
    expect(hasVendorConsent("s99")).toBe(false);
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it("registers and removes a consent event listener", () => {
    const cmp = vi.fn();
    window.__cmp = cmp as never;
    const handler = () => {};
    const off = onConsentEvent(handler);
    expect(cmp).toHaveBeenCalledWith(
      "addEventListener",
      ["consent", handler, false],
      null,
    );
    off();
    expect(cmp).toHaveBeenCalledWith(
      "removeEventListener",
      ["consent", handler, false],
      null,
    );
  });

  it("opens the preference manager and cookie list via __cmp", () => {
    const cmp = vi.fn();
    window.__cmp = cmp as never;
    openPreferences();
    expect(cmp).toHaveBeenCalledWith("showScreenAdvanced");
    openCookieList();
    expect(cmp).toHaveBeenCalledWith("showCookies");
  });
});
