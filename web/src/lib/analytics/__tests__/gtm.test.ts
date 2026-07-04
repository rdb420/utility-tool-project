// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

const sendGTMEvent = vi.fn();
vi.mock("@next/third-parties/google", () => ({
  sendGTMEvent: (...args: unknown[]) => sendGTMEvent(...args),
}));

import type { AnalyticsEvent } from "@/lib/analytics/events";
import { gtmTransport } from "@/lib/analytics/gtm";

afterEach(() => sendGTMEvent.mockClear());

describe("gtmTransport", () => {
  it.each<[AnalyticsEvent, Record<string, unknown>]>([
    [
      { name: "calculator_result", toolId: "cbm", slug: "/cbm/" },
      { event: "calculator_result", toolId: "cbm", slug: "/cbm/" },
    ],
    [
      { name: "result_copy", toolId: "abc", slug: "/abc/", variant: "full" },
      { event: "result_copy", toolId: "abc", slug: "/abc/", variant: "full" },
    ],
    [
      { name: "related_tool_click", fromToolId: "a", toToolId: "b" },
      { event: "related_tool_click", fromToolId: "a", toToolId: "b" },
    ],
  ])("forwards the event name + typed fields to sendGTMEvent", (event, expected) => {
    gtmTransport(event);
    expect(sendGTMEvent).toHaveBeenCalledTimes(1);
    expect(sendGTMEvent).toHaveBeenCalledWith(expected);
  });

  it("forwards only the event's own keys — nothing extra", () => {
    gtmTransport({ name: "calculator_start", toolId: "cbm", slug: "/cbm/" });
    const arg = sendGTMEvent.mock.calls[0]![0] as Record<string, unknown>;
    expect(Object.keys(arg).sort()).toEqual(["event", "slug", "toolId"]);
  });
});
