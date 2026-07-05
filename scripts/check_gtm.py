"""Read-only audit of the GTM container against the GTM_SETUP.md contract.

Verifies whether the live (published) container actually has the GA4 config +
event tags and the consentmanager vendor-consent trigger — i.e. whether GA4 will
fire on the site. Also reports the draft workspace so you can see work that is
built but not yet published.

    uv run python scripts/check_gtm.py

First run re-prompts Google consent (adds the tagmanager.readonly scope).
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _google_admin_auth import get_credentials  # noqa: E402
from googleapiclient.discovery import build  # noqa: E402
from googleapiclient.errors import HttpError  # noqa: E402

GTM_PUBLIC_ID = "GTM-NRM7V3BN"
GA4_MEASUREMENT_ID = "G-7XG10CD70E"
# The Google Analytics vendor id in consentmanager the GA4 tag should gate on.
GA_CONSENT_VENDOR = ",s26,"


def find_container(svc):
    for account in svc.accounts().list().execute().get("account", []):
        containers = (
            svc.accounts()
            .containers()
            .list(parent=account["path"])
            .execute()
            .get("container", [])
        )
        for container in containers:
            if container.get("publicId") == GTM_PUBLIC_ID:
                return account, container
    return None, None


def summarise(entities: list[dict], kind: str) -> None:
    print(f"  {kind}: {len(entities)}")
    for e in entities:
        extra = ""
        if kind == "tags":
            extra = f"  type={e.get('type')}  firingTriggerId={e.get('firingTriggerId')}"
        elif kind == "triggers":
            filt = e.get("filter") or e.get("customEventFilter") or []
            conds = [
                "".join(p.get("value", "") for p in f.get("parameter", []))
                for f in filt
            ]
            extra = f"  type={e.get('type')}  conditions~={conds}"
        elif kind == "variables":
            extra = f"  type={e.get('type')}"
        print(f"    - {e.get('name')}{extra}")


def main() -> None:
    creds = get_credentials()
    svc = build("tagmanager", "v2", credentials=creds, cache_discovery=False)

    account, container = find_container(svc)
    if not container:
        print(f"Container {GTM_PUBLIC_ID} not found for this Google account.")
        sys.exit(1)
    print(f"Account : {account['name']}  ({account['accountId']})")
    print(f"Container: {container['name']}  ({GTM_PUBLIC_ID})\n")
    cpath = container["path"]

    # Live (published) version — what the site actually runs.
    try:
        live = svc.accounts().containers().versions().live(parent=cpath).execute()
    except HttpError as err:
        print("No LIVE (published) version yet:", err._get_reason())
        live = {}

    tags = live.get("tag", [])
    triggers = live.get("trigger", [])
    variables = live.get("variable", [])
    print(f"=== LIVE / published version: {live.get('name', '(none published)')} ===")
    summarise(tags, "tags")
    summarise(triggers, "triggers")
    summarise(variables, "variables")

    # Draft workspace(s) — built but not yet published.
    print("\n=== Draft workspaces (unpublished) ===")
    for ws in (
        svc.accounts()
        .containers()
        .workspaces()
        .list(parent=cpath)
        .execute()
        .get("workspace", [])
    ):
        wt = (
            svc.accounts()
            .containers()
            .workspaces()
            .tags()
            .list(parent=ws["path"])
            .execute()
            .get("tag", [])
        )
        print(f"  '{ws['name']}': {len(wt)} tag(s) in draft")

    # Contract checks (against the LIVE version).
    print("\n=== Checks (live/published) ===")
    blob = str(live)
    checks = {
        f"GA4 config references {GA4_MEASUREMENT_ID}": GA4_MEASUREMENT_ID in blob,
        f"a trigger gates on {GA_CONSENT_VENDOR} (GA vendor consent)": GA_CONSENT_VENDOR
        in blob,
        "at least one GA4 event tag (gaawe)": any(
            t.get("type") == "gaawe" for t in tags
        ),
        "at least one GA4 config tag (googtag/gaawc)": any(
            t.get("type") in ("googtag", "gaawc") for t in tags
        ),
    }
    for label, ok in checks.items():
        print(f"  [{'OK ' if ok else 'MISSING'}] {label}")
    if not any(checks.values()):
        print(
            "\n  -> The published container has no GA4 tags — GA4 will NOT fire on"
            "\n     the site yet. Build + publish per docs/launch/GTM_SETUP.md."
        )


if __name__ == "__main__":
    main()
