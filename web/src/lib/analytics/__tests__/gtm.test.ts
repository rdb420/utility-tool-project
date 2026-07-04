// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { gtmTransport } from "@/lib/analytics/gtm";

afterEach(() => {
  delete window.dataLayer;
});

describe("gtmTransport", () => {
  const cases: Array<{
    event: AnalyticsEvent;
    pushed: Record<string, string>;
  }> = [
    {
      event: { name: "calculator_start", toolId: "cbm", slug: "/cbm/" },
      pushed: { event: "calculator_start", toolId: "cbm", slug: "/cbm/" },
    },
    {
      event: { name: "calculator_result", toolId: "eoq", slug: "/eoq/" },
      pushed: { event: "calculator_result", toolId: "eoq", slug: "/eoq/" },
    },
    {
      event: {
        name: "calculator_validation_error",
        toolId: "abc",
        slug: "/abc/",
        field: "annualUsage",
      },
      pushed: {
        event: "calculator_validation_error",
        toolId: "abc",
        slug: "/abc/",
        field: "annualUsage",
      },
    },
    {
      event: {
        name: "result_copy",
        toolId: "dim",
        slug: "/dim/",
        variant: "full",
      },
      pushed: {
        event: "result_copy",
        toolId: "dim",
        slug: "/dim/",
        variant: "full",
      },
    },
    {
      event: { name: "related_tool_click", fromToolId: "cbm", toToolId: "dim" },
      pushed: {
        event: "related_tool_click",
        fromToolId: "cbm",
        toToolId: "dim",
      },
    },
  ];

  it.each(cases)(
    "pushes $event.name to dataLayer with event name + exactly the typed fields",
    ({ event, pushed }) => {
      window.dataLayer = [];
      gtmTransport(event);
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual(pushed);
    },
  );

  it("never forwards keys outside the typed payload contract", () => {
    window.dataLayer = [];
    gtmTransport({
      name: "calculator_result",
      toolId: "eoq",
      slug: "/eoq/",
      annualDemandUnits: 120000,
      note: "secret",
    } as unknown as AnalyticsEvent);
    expect(window.dataLayer[0]).toEqual({
      event: "calculator_result",
      toolId: "eoq",
      slug: "/eoq/",
    });
  });

  it("is a no-op when the dataLayer is missing", () => {
    expect(() =>
      gtmTransport({ name: "calculator_start", toolId: "cbm", slug: "/cbm/" }),
    ).not.toThrow();
  });
});
