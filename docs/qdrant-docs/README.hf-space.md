---
title: Research Agent Embeddings
emoji: 🔍
colorFrom: indigo
colorTo: violet
sdk: docker
app_port: 7860
pinned: false
---

# Embeddings sidecar for the Research Agent

FastAPI service exposing dense + ColBERT late-interaction embeddings via `fastembed`.

Endpoints:

- `POST /embed/dense` — `sentence-transformers/all-MiniLM-L6-v2` (384-dim)
- `POST /embed/colbert` — `colbert-ir/colbertv2.0` (per-token multi-vector)
- `POST /embed/colbert/query` — query-side ColBERT
- `GET /health`

Set `EMBEDDINGS_URL=https://cng420-embedding.hf.space` in the parent app.
