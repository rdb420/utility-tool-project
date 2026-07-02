// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONSENT_STORAGE_KEY, useConsent } from "@/lib/consent/useConsent";

// Node >=22 ships its own global `localStorage` (undefined unless the
// --localstorage-file flag is set), so vitest's jsdom environment filters the
// real jsdom implementation off the test global. Bridge it back from the raw
// jsdom window the environment exposes as `globalThis.jsdom`.
const jsdomWindow = (globalThis as unknown as { jsdom: { window: Window } })
  .jsdom.window;
Object.defineProperty(globalThis, "localStorage", {
  get: () => jsdomWindow.localStorage,
  configurable: true,
});

describe("useConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("defaults to unset (and becomes ready after mount)", () => {
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBe("unset");
    expect(result.current.ready).toBe(true);
  });

  it("accept persists to localStorage and state", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.setConsent("granted"));
    expect(result.current.consent).toBe("granted");
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("granted");
  });

  it("decline persists to localStorage and state", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.setConsent("denied"));
    expect(result.current.consent).toBe("denied");
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
  });

  it("reads an existing stored choice on mount", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBe("denied");
  });

  it("treats junk stored values as unset", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "banana");
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBe("unset");
  });

  it("syncs across hook instances in the same tab", () => {
    const first = renderHook(() => useConsent());
    const second = renderHook(() => useConsent());
    act(() => first.result.current.setConsent("granted"));
    expect(second.result.current.consent).toBe("granted");
  });

  it("syncs from the storage event (another tab)", () => {
    const { result } = renderHook(() => useConsent());
    act(() => {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: CONSENT_STORAGE_KEY,
          newValue: "granted",
        }),
      );
    });
    expect(result.current.consent).toBe("granted");
  });
});
