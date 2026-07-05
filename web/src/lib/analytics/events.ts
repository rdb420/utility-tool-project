/**
 * Typed analytics events (docs/launch/GOOGLE_SETUP.md + docs/planning/MVP_PAGE_SPECS.md).
 *
 * Payloads carry tool ids, slugs, and field names only — never user input
 * values. Keep it that way: the union below is the privacy contract.
 */
export type AnalyticsEvent =
  | { name: "calculator_start"; toolId: string; slug: string }
  | { name: "calculator_result"; toolId: string; slug: string }
  | {
      name: "calculator_validation_error";
      toolId: string;
      slug: string;
      field?: string;
    }
  | {
      name: "result_copy";
      toolId: string;
      slug: string;
      variant: "result" | "full";
    }
  | { name: "result_export"; toolId: string; slug: string }
  | { name: "related_tool_click"; fromToolId: string; toToolId: string };
