// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import {
  applyConsentToGa4,
  ga4Transport,
  loadGa4,
  resetGa4ForTests,
  sendGa4PageView,
} from "@/lib/analytics/ga4";

const MEASUREMENT_ID = "G-TEST12345";

/** dataLayer entries are `arguments` objects; normalize to plain arrays. */
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

afterEach(() => {
  resetGa4ForTests();
  for (const script of injectedScripts()) script.remove();
  delete window.dataLayer;
  delete window.gtag;
  vi.restoreAllMocks();
});

describe("loadGa4", () => {
  it("pushes the all-denied Consent Mode default before the config command", () => {
    loadGa4(MEASUREMENT_ID);

    const calls = dataLayerCalls();
    const consentIndex = calls.findIndex(
      (call) => call[0] === "consent" && call[1] === "default",
    );
    const configIndex = calls.findIndex((call) => call[0] === "config");

    expect(consentIndex).toBeGreaterThanOrEqual(0);
    expect(configIndex).toBeGreaterThanOrEqual(0);
    expect(consentIndex).toBeLessThan(configIndex);
    expect(calls[consentIndex][2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    expect(calls[configIndex][1]).toBe(MEASUREMENT_ID);
  });

  it("sets the consent default before the gtag.js script tag exists", () => {
    // appendChild is the injection point: assert the denial is already
    // queued on the dataLayer at the moment the script element arrives.
    const originalAppend = document.head.appendChild.bind(document.head);
    let consentEntriesAtInjection = -1;
    const spy = vi
      .spyOn(document.head, "appendChild")
      .mockImplementation((node) => {
        if (node instanceof HTMLScriptElement) {
          consentEntriesAtInjection = dataLayerCalls().filter(
            (call) => call[0] === "consent" && call[1] === "default",
          ).length;
        }
        return originalAppend(node);
      });

    loadGa4(MEASUREMENT_ID);
    spy.mockRestore();

    expect(consentEntriesAtInjection).toBe(1);
  });

  it("injects one async script tag keyed by the measurement id", () => {
    loadGa4(MEASUREMENT_ID);

    const scripts = injectedScripts();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`,
    );
    expect(scripts[0].async).toBe(true);
  });

  it("is idempotent: a second call adds no script and no dataLayer entries", () => {
    loadGa4(MEASUREMENT_ID);
    const entryCount = window.dataLayer?.length;

    loadGa4(MEASUREMENT_ID);

    expect(injectedScripts()).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(entryCount as number);
  });

  it("does nothing when the measurement id is empty", () => {
    loadGa4("");
    expect(injectedScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
  });
});

describe("applyConsentToGa4", () => {
  it("upgrades analytics_storage only on granted", () => {
    loadGa4(MEASUREMENT_ID);
    applyConsentToGa4("granted");

    const updates = dataLayerCalls().filter(
      (call) => call[0] === "consent" && call[1] === "update",
    );
    expect(updates).toHaveLength(1);
    // analytics_storage only — ad signals must not appear (they stay denied
    // from the default; no ads are served yet).
    expect(updates[0][2]).toEqual({ analytics_storage: "granted" });
  });

  it("keeps analytics_storage denied on denied", () => {
    loadGa4(MEASUREMENT_ID);
    applyConsentToGa4("denied");

    const updates = dataLayerCalls().filter(
      (call) => call[0] === "consent" && call[1] === "update",
    );
    expect(updates).toHaveLength(1);
    expect(updates[0][2]).toEqual({ analytics_storage: "denied" });
  });

  it("pushes nothing while consent is unset (defaults already deny)", () => {
    loadGa4(MEASUREMENT_ID);
    applyConsentToGa4("unset");

    const updates = dataLayerCalls().filter(
      (call) => call[0] === "consent" && call[1] === "update",
    );
    expect(updates).toHaveLength(0);
  });

  it("is a no-op before gtag exists", () => {
    expect(() => applyConsentToGa4("granted")).not.toThrow();
    expect(window.dataLayer).toBeUndefined();
  });
});

describe("ga4Transport", () => {
  const cases: Array<{
    event: AnalyticsEvent;
    params: Record<string, string>;
  }> = [
    {
      event: { name: "calculator_start", toolId: "cbm", slug: "/cbm/" },
      params: { toolId: "cbm", slug: "/cbm/" },
    },
    {
      event: { name: "calculator_result", toolId: "eoq", slug: "/eoq/" },
      params: { toolId: "eoq", slug: "/eoq/" },
    },
    {
      event: {
        name: "calculator_validation_error",
        toolId: "abc",
        slug: "/abc-analysis/",
        field: "annualUsage",
      },
      params: { toolId: "abc", slug: "/abc-analysis/", field: "annualUsage" },
    },
    {
      event: {
        name: "result_copy",
        toolId: "dim",
        slug: "/dim-weight/",
        variant: "full",
      },
      params: { toolId: "dim", slug: "/dim-weight/", variant: "full" },
    },
    {
      event: { name: "result_export", toolId: "rop", slug: "/reorder-point/" },
      params: { toolId: "rop", slug: "/reorder-point/" },
    },
    {
      event: {
        name: "related_tool_click",
        fromToolId: "cbm",
        toToolId: "dim",
      },
      params: { fromToolId: "cbm", toToolId: "dim" },
    },
  ];

  it.each(cases)(
    "maps $event.name to gtag with exactly the typed fields",
    ({ event, params }) => {
      const gtag = vi.fn();
      window.gtag = gtag;

      ga4Transport(event);

      expect(gtag).toHaveBeenCalledTimes(1);
      expect(gtag).toHaveBeenCalledWith("event", event.name, params);
    },
  );

  it("never forwards keys outside the typed payload contract", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    // Simulate a rogue caller smuggling an operational value past the types.
    ga4Transport({
      name: "calculator_result",
      toolId: "eoq",
      slug: "/eoq/",
      annualDemandUnits: 120000,
      note: "secret",
    } as unknown as AnalyticsEvent);

    const params = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(params).toEqual({ toolId: "eoq", slug: "/eoq/" });
  });

  it("is a no-op when gtag is missing", () => {
    expect(() =>
      ga4Transport({ name: "calculator_start", toolId: "cbm", slug: "/cbm/" }),
    ).not.toThrow();
  });
});

describe("sendGa4PageView", () => {
  it("sends page_view with page_path only", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    sendGa4PageView("/freight-class/");

    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/freight-class/",
    });
  });

  it("is a no-op when gtag is missing", () => {
    expect(() => sendGa4PageView("/cbm/")).not.toThrow();
  });
});
