# Reference Tables

Lookup data validated against [`schemas/reference_table.schema.json`](../../schemas/reference_table.schema.json).

| File | Grounding | Status |
|---|---|---|
| `service_level_z_factors.json` | corpus | verified |
| `freight/dimensional_weight_divisors.json` | external | verified (2026-07-02) |
| `freight/nmfc_freight_classes.json` | external | verified (13-sub FCDC scale, effective 2025-07-19) |
| `freight/parcel_girth_limits.json` | external | needs_sourcing (UPS + AusPost rows verified) |
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

`nmfc_freight_classes.json` was **re-sourced to the 13-subprovision FCDC
density scale** (NMFC Docket 2025-1, effective 2025-07-19) from the two NMFTA
sources in the same pack and is `status: verified`. `parcel_girth_limits.json`
has verified UPS (108 in / 165 in) and Australia Post (105 cm / 140 cm girth)
rows but stays `needs_sourcing` until FedEx and USPS are confirmed.
`container_volumes.json` remains a scaffold with **candidate** values marked
`verified: false`; its numbers must stay labelled nominal estimates.

For each freight table:

1. Pull the current values from the authoritative source named in `source`
   (carrier service guides for DIM divisors and girth limits; NMFTA / NMFC for
   freight classes).
2. Replace candidate rows, set each row `verified: true`.
3. Set `effective_date` (ISO), confirm `review_frequency`, set `status: verified`.
4. Update the corresponding freight formula record's `sources` if the
   authoritative reference changed.
5. Re-run `cd web && npm run validate`.

The CBM, dimensional-weight, and volumetric-weight calculators label divisor
presets **carrier-published figures (checked July 2026)** with a
confirm-with-your-carrier caveat; container volumes remain labelled nominal
estimates. The freight-class calculator renders the 13-row density chart with
its effective date and an NMFTA ClassIT+ confirmation caveat — see
`docs/DEVELOPMENT_PLAN.md` Phase 6.

## Disclaimer posture

Freight class and carrier divisors are commercially sensitive and change often.
Present computed results as **estimates**, show the divisor/class used and its
effective date, and tell users to confirm with their carrier or broker.
