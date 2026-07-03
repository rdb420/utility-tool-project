// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentBanner from "@/components/ads/ConsentBanner";
import { setAnalyticsTransport } from "@/lib/analytics";
import AnalyticsLoader from "@/lib/analytics/AnalyticsLoader";
import { resetGa4ForTests } from "@/lib/analytics/ga4";

const MEASUREMENT_ID = "G-TEST12345";

// Same scaffolding as AnalyticsLoader.test.tsx: a mutable GA4_ID mock and a
// pathname stub so the loader can mount alongside the banner.
const siteMock = vi.hoisted(() => ({ GA4_ID: "G-TEST12345" }));
vi.mock("@/config/site", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  get GA4_ID() {
    return siteMock.GA4_ID;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
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

function consentUpdates(): unknown[][] {
  return dataLayerCalls().filter(
    (call) => call[0] === "consent" && call[1] === "update",
  );
}

function injectedScripts(): HTMLScriptElement[] {
  return Array.from(
    document.head.querySelectorAll("script[src*='googletagmanager.com']"),
  );
}

/** Banner + loader together: the real path a banner click takes to gtag. */
function renderBannerWithLoader() {
  const view = render(
    <>
      <AnalyticsLoader />
      <ConsentBanner />
    </>,
  );
  flushIdle();
  return view;
}

beforeEach(() => {
  siteMock.GA4_ID = MEASUREMENT_ID;
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

describe("ConsentBanner", () => {
  it("shows the honest analytics-cookie copy with Accept and Decline", () => {
    renderBannerWithLoader();

    const banner = screen.getByRole("region", { name: "Cookie consent" });
    expect(banner.textContent).toContain("one analytics cookie");
    expect(banner.textContent).toContain(
      "decline it and we still count, just without the cookie",
    );
    expect(banner.textContent).toContain(
      "Your calculator numbers never leave the page",
    );
    // The pre-region-defaults promise ("anonymous either way") is gone.
    expect(banner.textContent).not.toContain("anonymous");
    expect(screen.getByRole("button", { name: "Accept" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Decline" })).toBeTruthy();
  });

  it("Accept emits a granted analytics_storage update and hides the banner", () => {
    renderBannerWithLoader();
    expect(consentUpdates()).toHaveLength(0); // unset: defaults apply

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(consentUpdates()).toEqual([
      ["consent", "update", { analytics_storage: "granted" }],
    ]);
    expect(screen.queryByRole("region", { name: "Cookie consent" })).toBeNull();
  });

  it("Decline emits an explicit denied analytics_storage update and hides the banner", () => {
    renderBannerWithLoader();

    fireEvent.click(screen.getByRole("button", { name: "Decline" }));

    // The denied update must be pushed (not skipped) so the visitor's choice
    // overrides the global granted default outside the EEA/UK/CH.
    expect(consentUpdates()).toEqual([
      ["consent", "update", { analytics_storage: "denied" }],
    ]);
    expect(screen.queryByRole("region", { name: "Cookie consent" })).toBeNull();
  });

  it("never grants any ad signal on either choice", () => {
    renderBannerWithLoader();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    for (const update of consentUpdates()) {
      const params = update[2] as Record<string, string>;
      expect(params.ad_storage).toBeUndefined();
      expect(params.ad_user_data).toBeUndefined();
      expect(params.ad_personalization).toBeUndefined();
    }
  });
});
