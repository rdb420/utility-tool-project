# Reference Tables

Lookup data validated against [`schemas/reference_table.schema.json`](../../schemas/reference_table.schema.json).

| File | Grounding | Status |
|---|---|---|
| `service_level_z_factors.json` | corpus | verified |
| `freight/dimensional_weight_divisors.json` | external | needs_sourcing |
| `freight/nmfc_freight_classes.json` | external | needs_sourcing |
| `freight/parcel_girth_limits.json` | external | needs_sourcing |
| `freight/container_volumes.json` | external | needs_sourcing |

## Freight sourcing task (open)

The knowledge base defines freight *concepts* (dimensional weight, density,
chargeable weight) but contains no carrier constants. The tables under `freight/`
are scaffolds with **candidate** values marked `verified: false` and
`status: needs_sourcing`. They must not be shipped to users until confirmed.

For each freight table:

1. Pull the current values from the authoritative source named in `source`
   (carrier service guides for DIM divisors and girth limits; NMFTA / NMFC for
   freight classes).
2. Replace candidate rows, set each row `verified: true`.
3. Set `effective_date` (ISO), confirm `review_frequency`, set `status: verified`.
4. Update the corresponding freight formula record's `sources` if the
   authoritative reference changed.
5. Re-run `cd web && npm run validate`.

The CBM calculator (`/cbm-calculator/`) shipped ahead of this sign-off with its
divisors and container volumes labelled **unverified estimates**; the remaining
freight calculators (dimensional weight standalone, freight class) stay blocked
until verification — see `docs/DEVELOPMENT_PLAN.md` Phase 1b task 4.

## Disclaimer posture

Freight class and carrier divisors are commercially sensitive and change often.
Present computed results as **estimates**, show the divisor/class used and its
effective date, and tell users to confirm with their carrier or broker.
