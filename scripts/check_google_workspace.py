from __future__ import annotations

import json
import os
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
]


def has_required_scopes(scopes: list[str] | None) -> bool:
    granted_scopes = set(scopes or [])
    return set(SCOPES).issubset(granted_scopes)


def token_scopes(token_path: Path) -> list[str]:
    token_data = json.loads(token_path.read_text(encoding="utf-8"))
    scopes = token_data.get("scopes", [])
    if isinstance(scopes, str):
        return scopes.split()
    return list(scopes)


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


def get_credentials(client_secret_path: Path, token_path: Path) -> Credentials:
    creds = None
    if token_path.exists():
        saved_scopes = token_scopes(token_path)
        if not has_required_scopes(saved_scopes):
            granted = ", ".join(saved_scopes or ["none"])
            required = ", ".join(SCOPES)
            print("Saved Google token does not include the current required scopes.")
            print(f"Granted scopes: {granted}")
            print(f"Required scopes: {required}")
            print(f"Refreshing consent by replacing token cache: {token_path}")
            token_path.unlink()
        else:
            creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(str(client_secret_path), SCOPES)
        creds = flow.run_local_server(port=0)

    token_path.parent.mkdir(parents=True, exist_ok=True)
    token_path.write_text(creds.to_json(), encoding="utf-8")
    return creds


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    load_env(repo_root / ".env.local")

    project_id = required_env("GOOGLE_CLOUD_PROJECT_ID")
    project_number = required_env("GOOGLE_CLOUD_PROJECT_NUMBER")
    drive_id = os.environ.get("GOOGLE_DRIVE_CORPUS_SHARED_DRIVE_ID") or required_env(
        "GOOGLE_DRIVE_CORPUS_FOLDER_ID"
    )
    spreadsheet_id = required_env("GOOGLE_SHEETS_FORMULA_WORKBOOK_ID")
    client_secret_path = repo_root / required_env("GOOGLE_OAUTH_CLIENT_SECRET_PATH")
    token_path = repo_root / required_env("GOOGLE_TOKEN_CACHE_PATH")

    if not client_secret_path.exists():
        raise FileNotFoundError(f"OAuth desktop client file not found: {client_secret_path}")

    creds = get_credentials(client_secret_path, token_path)
    drive = build("drive", "v3", credentials=creds)
    sheets = build("sheets", "v4", credentials=creds)

    print(f"Google Cloud project: {project_id} ({project_number})")

    try:
        shared_drive = drive.drives().get(driveId=drive_id, fields="id,name").execute()
        print(f"Shared Drive: {shared_drive['name']} ({shared_drive['id']})")
        files = (
            drive.files()
            .list(
                corpora="drive",
                driveId=drive_id,
                includeItemsFromAllDrives=True,
                supportsAllDrives=True,
                pageSize=10,
                fields="files(id,name,mimeType),nextPageToken",
            )
            .execute()
            .get("files", [])
        )
        print(f"Shared Drive visible items: {len(files)}")
        for item in files:
            print(f"- {item['name']} [{item['mimeType']}] {item['id']}")
    except HttpError as exc:
        print(f"Shared Drive check failed: {exc.resp.status} {exc.reason}")
        if exc.resp.status == 403:
            print(
                "If the reason is insufficient authentication scopes, re-run this script and "
                "complete the browser consent flow. The script now requests drive.readonly."
            )
            print(
                "If it still fails, confirm the authenticated Google account is a member "
                "of the Shared Drive."
            )

    try:
        spreadsheet = (
            sheets.spreadsheets()
            .get(
                spreadsheetId=spreadsheet_id,
                fields="spreadsheetId,spreadsheetUrl,properties(title,locale,timeZone),sheets(properties(sheetId,title,index,gridProperties))",
            )
            .execute()
        )
        props = spreadsheet["properties"]
        print(f"Spreadsheet: {props['title']} ({spreadsheet['spreadsheetId']})")
        for sheet in spreadsheet.get("sheets", []):
            sheet_props = sheet["properties"]
            print(f"- Tab: {sheet_props['title']} ({sheet_props['sheetId']})")
    except HttpError as exc:
        print(f"Spreadsheet check failed: {exc.resp.status} {exc.reason}")


if __name__ == "__main__":
    main()
