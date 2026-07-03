// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AnalyticsLoader from "@/lib/analytics/AnalyticsLoader";
import { setAnalyticsTransport, track } from "@/lib/analytics";
import { EEA_UK_CH, resetGa4ForTests } from "@/lib/analytics/ga4";
import { CONSENT_STORAGE_KEY } from "@/lib/consent/useConsent";

const MEASUREMENT_ID = "G-TEST12345";

// Mutable mocks: tests flip GA4_ID / pathname per case.
const siteMock = vi.hoisted(() => ({ GA4_ID: "G-TEST12345" }));
vi.mock("@/config/site", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  get GA4_ID() {
    return siteMock.GA4_ID;
  },
}));

const navMock = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({
  usePathname: () => navMock.pathname,
}));

// Node >=22 filters jsdom's localStorage off the test global; bridge it back
// (same workaround as useConsent.test.tsx).
const jsdomWindow = (globalThis as unknown as { jsdom: { window: Window } })
  .jsdom.window;
Object.defineProperty(globalThis, "localStorage", {
  get: () => jsdomWindow.localStorage,
  configurable: true,
});

/** Controllable requestIdleCallback so tests decide when "idle" happens. */
let idleCallbacks: IdleRequestCallback[] = [];

function flushIdle() {
  act(() => {
    const pending = idleCallbacks.splice(0);
    for (const cb of pending) cb({} as IdleDeadline);
  });
}

function dataLayerCalls(): unknown[][] {
  return (window.dataLayer ?? []).map((entry) =>
    Array.from(entry as ArrayLike<unknown>),
  );
}

function injectedScripts(): HTMLScriptElement[] {
  return Array.from(
    document.head.querySelectorAll("script[src*='googletagmanager.com']"),
  );
}

beforeEach(() => {
  siteMock.GA4_ID = MEASUREMENT_ID;
  navMock.pathname = "/";
  idleCallbacks = [];
  window.requestIdleCallback = (cb: IdleRequestCallback) => {
    idleCallbacks.push(cb);
    return idleCallbacks.length;
  };
  window.cancelIdleCallback = () => {};
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  resetGa4ForTests();
  setAnalyticsTransport(() => {});
  for (const script of injectedScripts()) script.remove();
  delete window.dataLayer;
  delete window.gtag;
});

describe("AnalyticsLoader with empty GA4_ID", () => {
  it("renders nothing, injects nothing, and leaves the transport untouched", () => {
    siteMock.GA4_ID = "";
    const sentinel = vi.fn();
    setAnalyticsTransport(sentinel);

    const { container } = render(<AnalyticsLoader />);
    flushIdle();

    expect(container.innerHTML).toBe("");
    expect(idleCallbacks).toHaveLength(0);
    expect(injectedScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();

    // Whatever transport was installed before (dev console) still receives
    // events — the loader must not have replaced it.
    track({ name: "calculator_start", toolId: "cbm", slug: "/cbm/" });
    expect(sentinel).toHaveBeenCalledTimes(1);
  });
});

describe("AnalyticsLoader with a GA4 id", () => {
  it("renders nothing and defers gtag.js until idle", () => {
    const { container } = render(<AnalyticsLoader />);

    // Tool-first rule: nothing injected during render/hydration.
    expect(container.innerHTML).toBe("");
    expect(injectedScripts()).toHaveLength(0);

    flushIdle();
    expect(injectedScripts()).toHaveLength(1);
  });

  it("sets both consent defaults (global + EEA/UK/CH) before the config hit", () => {
    render(<AnalyticsLoader />);
    flushIdle();

    const calls = dataLayerCalls();
    const defaults = calls.filter(
      (call) => call[0] === "consent" && call[1] === "default",
    );
    const configIndex = calls.findIndex((call) => call[0] === "config");
    const lastDefaultIndex = calls.reduce(
      (last, call, index) =>
        call[0] === "consent" && call[1] === "default" ? index : last,
      -1,
    );
    expect(defaults).toHaveLength(2);
    expect(lastDefaultIndex).toBeLessThan(configIndex);
    // Global default: ads denied, analytics granted outside consent regions.
    expect(defaults[0][2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    // Region-scoped default: everything denied in the EEA/UK/CH (exact list
    // is pinned in ga4.test.ts).
    expect(defaults[1][2]).toMatchObject({
      analytics_storage: "denied",
      region: [...EEA_UK_CH],
    });
  });

  it("installs the GA4 transport once gtag is live", () => {
    render(<AnalyticsLoader />);
    flushIdle();

    act(() => {
      track({ name: "calculator_result", toolId: "eoq", slug: "/eoq/" });
    });

    expect(dataLayerCalls()).toContainEqual([
      "event",
      "calculator_result",
      { toolId: "eoq", slug: "/eoq/" },
    ]);
  });

  it("replays a stored granted choice as a consent update on load", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<AnalyticsLoader />);
    flushIdle();

    expect(dataLayerCalls()).toContainEqual([
      "consent",
      "update",
      { analytics_storage: "granted" },
    ]);
  });

  it("replays a stored denied choice as a consent update, and events still flow", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    render(<AnalyticsLoader />);
    flushIdle();

    const calls = dataLayerCalls();
    // No granted signal anywhere...
    expect(calls).not.toContainEqual([
      "consent",
      "update",
      { analytics_storage: "granted" },
    ]);
    // ...and the decline is explicit, so it overrides the global granted
    // default outside the EEA/UK/CH too.
    expect(calls).toContainEqual([
      "consent",
      "update",
      { analytics_storage: "denied" },
    ]);
    // gtag is loaded and events still flow (cookieless pings).
    expect(injectedScripts()).toHaveLength(1);
    act(() => {
      track({ name: "calculator_start", toolId: "cbm", slug: "/cbm/" });
    });
    expect(dataLayerCalls()).toContainEqual([
      "event",
      "calculator_start",
      { toolId: "cbm", slug: "/cbm/" },
    ]);
  });

  it("pushes no consent update while the choice is unset (defaults apply)", () => {
    render(<AnalyticsLoader />);
    flushIdle();

    const updates = dataLayerCalls().filter(
      (call) => call[0] === "consent" && call[1] === "update",
    );
    expect(updates).toHaveLength(0);
  });

  it("sends page_view on route change but not for the initial render", () => {
    const { rerender } = render(<AnalyticsLoader />);
    flushIdle();

    const pageViews = () =>
      dataLayerCalls().filter(
        (call) => call[0] === "event" && call[1] === "page_view",
      );

    // The gtag config call covers the landing page — no manual page_view yet.
    expect(pageViews()).toHaveLength(0);

    navMock.pathname = "/cbm-calculator/";
    rerender(<AnalyticsLoader />);

    expect(pageViews()).toHaveLength(1);
    const params = pageViews()[0][2] as { page_path: string };
    expect(params).toEqual({ page_path: "/cbm-calculator/" });
    // Privacy: no query strings, ever.
    expect(params.page_path).not.toContain("?");
  });
});
