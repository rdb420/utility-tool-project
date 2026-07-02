# Reference Tables

Lookup data validated against [`schemas/reference_table.schema.json`](../../schemas/reference_table.schema.json).

| File | Grounding | Status |
|---|---|---|
| `service_level_z_factors.json` | corpus | verified |
| `freight/dimensional_weight_divisors.json` | external | verified (2026-07-02) |
| `freight/nmfc_freight_classes.json` | external | needs_sourcing |
| `freight/parcel_girth_limits.json` | external | needs_sourcing |
| `freight/container_volumes.json` | external | needs_sourcing |

## Freight sourcing task (partially complete)

The knowledge base defines freight *concepts* (dimensional weight, density,
chargeable weight) but contains no carrier constants.

`dimensional_weight_divisors.json` was **verified 2026-07-02** against the dated
sourcing pack (`corpus-logistics-supply-chain/sourced-reference-data-2026-07-02.md`):
FedEx, UPS, and DHL Express official pages plus USPS Postal Explorer and the
Federal Register final rule. The USPS 166 row needs re-verification on
**2026-07-12** when the divisor changes to 139; the IATA 6000 air figure remains
a convention (`verified: false` at row level) pending a dated IATA capture.

The remaining tables under `freight/` are scaffolds with **candidate** values
marked `verified: false` and `status: needs_sourcing`. They must not be shipped
to users until confirmed.

For each freight table:

1. Pull the current values from the authoritative source named in `source`
   (carrier service guides for DIM divisors and girth limits; NMFTA / NMFC for
   freight classes).
2. Replace candidate rows, set each row `verified: true`.
3. Set `effective_date` (ISO), confirm `review_frequency`, set `status: verified`.
4. Update the corresponding freight formula record's `sources` if the
   authoritative reference changed.
5. Re-run `cd web && npm run validate`.

The CBM calculator (`/cbm-calculator/`) now labels its divisor presets
**carrier-published figures (checked July 2026)** with a confirm-with-your-carrier
caveat; its container volumes remain labelled nominal estimates. The remaining
freight calculators (dimensional weight standalone, freight class) stay blocked
until their tables are verified — see `docs/DEVELOPMENT_PLAN.md` Phase 1b task 4.

## Disclaimer posture

Freight class and carrier divisors are commercially sensitive and change often.
Present computed results as **estimates**, show the divisor/class used and its
effective date, and tell users to confirm with their carrier or broker.
