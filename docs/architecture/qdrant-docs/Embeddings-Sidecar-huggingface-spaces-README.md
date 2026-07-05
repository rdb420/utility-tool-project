---
title: Embeddings sidecar
emoji: 🔍
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
short_description: FastEmbed API — MiniLM dense, ColBERTv2, SPLADE sparse
models:
  - sentence-transformers/all-MiniLM-L6-v2
  - colbert-ir/colbertv2.0
  - prithivida/Splade_PP_en_v1
tags:
  - embeddings
  - fastapi
  - sentence-transformers
  - colbert
  - splade
  - fastembed
suggested_hardware: cpu-upgrade
pinned: false
---

# Embeddings sidecar

Tiny FastAPI service that wraps `fastembed` and exposes:

- `POST /embed/dense` — dense vectors via `sentence-transformers/all-MiniLM-L6-v2` (384-dim)
- `POST /embed/colbert` — late-interaction multi-vectors via `colbert-ir/colbertv2.0` (per-token, 128-dim)
- `POST /embed/colbert/query` — query-side ColBERT embeddings
- `POST /embed/sparse` — SPLADE learned-sparse vectors via `prithivida/Splade_PP_en_v1` (`{indices,values}`)
- `POST /embed/sparse/query` — query-side SPLADE embeddings
- `GET /health`

The Next.js app calls this service over HTTP. It exists because Node's
`fastembed-js` has spotty coverage for ColBERT/late-interaction; Python
`fastembed` handles both models cleanly.

## Run

```bash
cd embeddings
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 7860
```

First request will download the model weights (cached under `~/.cache/fastembed`).

## Smoke test

```bash
curl -X POST localhost:7860/embed/dense \
  -H 'content-type: application/json' \
  -d '{"texts":["hello world"]}' | jq '.vectors[0] | length'   # -> 384
```
