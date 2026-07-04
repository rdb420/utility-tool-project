"""Read-only audit of the GA4 property config (Admin API).

Finds the property behind measurement id G-7XG10CD70E and reports its custom
dimensions, custom metrics, key events, and data streams — then checks them
against what runbook §6b and the analytics event contract expect (toolId/slug
custom dimensions, calculator_result key event, no custom metrics).

    uv run python scripts/check_ga4.py

First run re-prompts Google consent (adds the analytics.readonly scope).
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _google_admin_auth import get_credentials  # noqa: E402
from googleapiclient.discovery import build  # noqa: E402

GA4_MEASUREMENT_ID = "G-7XG10CD70E"
EXPECTED_DIMENSIONS = {"toolId", "slug", "field", "variant", "fromToolId", "toToolId"}
EXPECTED_KEY_EVENTS = {"calculator_result"}


def find_property(svc) -> tuple[str | None, str | None]:
    """Return (property resource name, display name) for the measurement id."""
    summaries = svc.accountSummaries().list().execute().get("accountSummaries", [])
    for acc in summaries:
        for prop in acc.get("propertySummaries", []):
            name = prop["property"]  # "properties/123456789"
            streams = (
                svc.properties()
                .dataStreams()
                .list(parent=name)
                .execute()
                .get("dataStreams", [])
            )
            for s in streams:
                mid = s.get("webStreamData", {}).get("measurementId")
                if mid == GA4_MEASUREMENT_ID:
                    return name, prop.get("displayName")
    return None, None


def main() -> None:
    creds = get_credentials()
    svc = build("analyticsadmin", "v1beta", credentials=creds, cache_discovery=False)

    prop, display = find_property(svc)
    if not prop:
        print(f"No property found for measurement id {GA4_MEASUREMENT_ID}.")
        sys.exit(1)
    print(f"Property: {display}  ({prop})  measurementId={GA4_MEASUREMENT_ID}\n")

    dims = (
        svc.properties().customDimensions().list(parent=prop).execute()
    ).get("customDimensions", [])
    metrics = (
        svc.properties().customMetrics().list(parent=prop).execute()
    ).get("customMetrics", [])
    key_events = (
        svc.properties().keyEvents().list(parent=prop).execute()
    ).get("keyEvents", [])
    streams = (
        svc.properties().dataStreams().list(parent=prop).execute()
    ).get("dataStreams", [])

    print("=== Custom dimensions ===")
    dim_params = {d.get("parameterName") for d in dims}
    for d in dims:
        print(f"  - {d.get('displayName')}  param={d.get('parameterName')}  scope={d.get('scope')}")

    print("\n=== Custom metrics ===")
    for m in metrics:
        print(f"  - {m.get('displayName')}  param={m.get('parameterName')}")
    if not metrics:
        print("  (none — expected; the taxonomy has no numeric params)")

    print("\n=== Key events ===")
    key_names = {k.get("eventName") for k in key_events}
    for k in key_events:
        print(f"  - {k.get('eventName')}")
    if not key_events:
        print("  (none)")

    print("\n=== Data streams ===")
    for s in streams:
        wsd = s.get("webStreamData", {})
        print(
            f"  - {s.get('displayName')}  "
            f"measurementId={wsd.get('measurementId')}  uri={wsd.get('defaultUri')}"
        )

    # Checks
    def mark(ok: bool) -> str:
        return "OK " if ok else "MISSING"

    print("\n=== Checks ===")
    missing_dims = EXPECTED_DIMENSIONS - dim_params
    has_core = "toolId" in dim_params and "slug" in dim_params
    print(f"  [{mark(has_core)}] toolId + slug registered as custom dimensions")
    if missing_dims:
        print(f"      not yet registered: {', '.join(sorted(missing_dims))}")
    print(f"  [{mark(EXPECTED_KEY_EVENTS <= key_names)}] calculator_result is a key event")
    print(f"  [{'OK ' if not metrics else 'NOTE'}] no custom metrics (expected)")


if __name__ == "__main__":
    main()
