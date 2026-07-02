# Google Connections

## Current Project Values

| Item | Value |
|---|---|
| Google Cloud project number | `1013958608225` |
| Google Cloud project ID | `utility-tool-project` |
| Shared Drive ID | `0AFWlDykaPfbUUk9PVA` |
| Shared Drive URL | <https://drive.google.com/drive/u/0/folders/0AFWlDykaPfbUUk9PVA> |
| Formula workbook ID | `1w_QQkCT0gEZdbZNL0PwBSMyfQX_6sIekovJ7X1BCIOQ` |
| Formula workbook URL | <https://docs.google.com/spreadsheets/d/1w_QQkCT0gEZdbZNL0PwBSMyfQX_6sIekovJ7X1BCIOQ/edit?gid=0#gid=0> |

## Local Credentials

The OAuth client JSON files are stored under `secrets/`, which is ignored by git. Do not commit or paste their contents.

Local values are written to `.env.local`, also ignored by git. A safe template is available at `.env.example`.

## Connectivity Check

Run:

```bash
uv sync
uv run python scripts/check_google_workspace.py
```

The first run opens a browser OAuth consent flow and writes the token cache to `secrets/google_workspace_token.json`. If scopes change, the script deletes the stale token cache and asks for consent again.

Expected successful output includes:

- Google Cloud project ID and number.
- Shared Drive name and ID.
- Count of visible Shared Drive files.
- Spreadsheet title and tab IDs.

## Local Verification Status

Status: working.

The local OAuth verification script successfully confirmed:

- Google Cloud project: `utility-tool-project` / `1013958608225`.
- Shared Drive: `utility-drive-tool` / `0AFWlDykaPfbUUk9PVA`.
- Shared Drive visible items: `10`.
- Spreadsheet: `utility-tool-logistics-formulars` / `1w_QQkCT0gEZdbZNL0PwBSMyfQX_6sIekovJ7X1BCIOQ`.
- Spreadsheet tab: `Sheet1` / `0`.

The script requests `https://www.googleapis.com/auth/drive.readonly` and `https://www.googleapis.com/auth/spreadsheets.readonly`. If scopes change again, it deletes the stale local token cache and asks for consent again.

Visible Shared Drive items from the successful check:

| Name | Type | ID |
|---|---|---|
| `utility-tool-logistics-formulars` | Google Sheet | `1w_QQkCT0gEZdbZNL0PwBSMyfQX_6sIekovJ7X1BCIOQ` |
| `corpus-logistics-markdown` | Folder | `1BFsfr-wDx82-CtwHHsgnA55ptoPP44Pp` |
| `corpus-logistics-pdfs` | Folder | `1USzbBWz6Qx_sG_Xl7nXwcdZD1XGQeNIy` |
| `640215849-Inventory-Optimization-Dinesh-K-Sharma-Madhu-Jain-Data-Analytics-and-Artificial-Intelligence-for-Inventory-and-Supply-Chain-Management-Springer.md` | Markdown | `1Bncrm-MSNtWAgpm41co-otFBrWawMYgV` |
| `600883366-Logistics-and-Supply-Chain-Management.md` | Markdown | `1kL3nyDaDJCZR2cxItcXJtLXdYavTorox` |
| `509390811-Supply-Chain-Manager-s-Handbook-JSI.md` | Markdown | `19-h3z1Ir0RKY9fx7NNek_MC4Cnd4srNj` |
| `497915534-Supply-Chain-Optimization-Through-Segmentation-and-Analytics-PDFDrive.md` | Markdown | `1gRyULGjtWiQWYknIbs9BMw7faXz9upuW` |
| `479665818-Total-SupplyChain-Man-pdf.md` | Markdown | `1CY4JA6eKjYgr0TlR3SH3lk2OdA2GGi8_` |
| `474669327-Foundations-of-Inventory-Management.md` | Markdown | `1EG-nQ3W3d9vGTgs_2XQcrpU7WBt2usrD` |
| `470379145-LEAN-Supply-Chain-Planning-The-New-Supply-Chain-Management-Paradigm-for-Process-Industries-to-Master-Today-s-VUCA-World-pdf.md` | Markdown | `1mPctO2ZtncjS7-0zX3OafHiH9cGttqg7` |

## Connector Verification Status

The Codex Google Drive connector account is separate from the local OAuth flow. Earlier connector checks could not read the spreadsheet until it was shared with that connector account. Prefer the local OAuth script for project setup validation unless connector-based editing is needed.

## Knowledge Base Connection (Qdrant + Embeddings)

The logistics knowledge base is a separate, non-Google connection. It is
configured entirely through `.env.local` (see `.env.example`) and is not tied to
the Google OAuth flow.

| Item | Value |
|---|---|
| Qdrant collection | `logistics_supply_chain_hybrid_v1` |
| Vectors | `dense` (384-dim), `multi` (ColBERT, 128-dim), `sparse` (SPLADE) |
| Embeddings sidecar | `EMBEDDINGS_URL` (Hugging Face Space, FastAPI + fastembed) |
| Qdrant URL / key | `QDRANT_URL`, `QDRANT_API_KEY` (in `.env.local` only) |

Connectivity check:

```bash
uv run python scripts/search_corpus.py "reorder point formula" --limit 3
```

Local verification status: working. The collection holds ~5,056 chunks and the
sidecar `/health` endpoint reports the three models loaded (MiniLM dense,
ColBERTv2 late-interaction, SPLADE sparse). Hybrid search returns cited passages.

Do not expose the Qdrant key or the sidecar to the public website; the knowledge
base holds licensed source-book text and is a build-time/authoring tool only.
