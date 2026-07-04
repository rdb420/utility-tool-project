"""Shared OAuth for the read-only GTM + GA4 config checks.

Reuses the same installed-app flow and token cache as
`check_google_workspace.py`, but requests the UNION of scopes (Workspace read +
Tag Manager read + Analytics read) so a single consent/token serves every
script. The first run after this file is added will re-prompt consent because
the cached token lacks the new scopes; after that all scripts run non-interactively.

Read-only scopes only — these scripts never mutate GTM or GA4.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

REPO_ROOT = Path(__file__).resolve().parents[1]

SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/tagmanager.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
]


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


def required_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _token_scopes(token_path: Path) -> list[str]:
    data = json.loads(token_path.read_text(encoding="utf-8"))
    scopes = data.get("scopes", [])
    return scopes.split() if isinstance(scopes, str) else list(scopes)


def get_credentials() -> Credentials:
    """Load cached creds (refreshing/consenting as needed) for all SCOPES."""
    load_env(REPO_ROOT / ".env.local")
    client_secret = REPO_ROOT / required_env("GOOGLE_OAUTH_CLIENT_SECRET_PATH")
    token_path = REPO_ROOT / required_env("GOOGLE_TOKEN_CACHE_PATH")

    creds: Credentials | None = None
    if token_path.exists():
        if set(SCOPES).issubset(set(_token_scopes(token_path))):
            creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
        else:
            print(
                "Token cache is missing the Tag Manager / Analytics scopes — "
                f"re-consent required. Replacing {token_path}"
            )
            token_path.unlink()

    if creds and creds.valid:
        return creds
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(str(client_secret), SCOPES)
        creds = flow.run_local_server(port=0)

    token_path.parent.mkdir(parents=True, exist_ok=True)
    token_path.write_text(creds.to_json(), encoding="utf-8")
    return creds
