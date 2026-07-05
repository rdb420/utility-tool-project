## 1. Core formulas to add

| Concept                                 |                                             Formula / rule | Suggested KB status               |
| --------------------------------------- | ---------------------------------------------------------: | --------------------------------- |
| **Parcel dimensional weight, imperial** | `DIM weight lb = ceil((L in × W in × H in) ÷ DIM divisor)` | Store as formula + divisor lookup |
| **Parcel volumetric weight, metric**    | `Volumetric kg = ceil((L cm × W cm × H cm) ÷ DIM divisor)` | Store as formula + divisor lookup |
| **Chargeable weight**                   |      `max(actual weight, dimensional / volumetric weight)` | Store as universal rule           |
| **CBM**                                 |                         `CBM = L m × W m × H m × quantity` | Store as base logistics formula   |
| **CBM from centimetres**                |        `CBM = (L cm × W cm × H cm × quantity) ÷ 1,000,000` | Store as conversion formula       |
| **Cubic feet**                          |                     `Cu ft = (L in × W in × H in) ÷ 1,728` | Store as LTL density formula      |
| **LTL density**                         |                             `PCF = weight lb ÷ cubic feet` | Store as formula                  |
| **Parcel length + girth**               |   `length + girth = longest side + 2 × width + 2 × height` | Store as parcel-size formula      |

FedEx and UPS both describe chargeable/billable weight as the greater of actual weight and dimensional weight; FedEx states DIM weight is calculated by multiplying L × W × H and dividing by 139 for U.S., Puerto Rico and international shipments, while UPS states its divisor varies by rate type: 139 for Daily Rates and 166 for Retail Rates. ([FedEx][1]) ([UPS][2])

## 2. Carrier DIM / volumetric divisor reference table

Use this as a starter dated table. Treat it as **reference data**, not immutable truth.

| Carrier / context                          | Unit system | Divisor / conversion factor | Formula                 | Source priority                    |
| ------------------------------------------ | ----------: | --------------------------: | ----------------------- | ---------------------------------- |
| **UPS U.S. Daily Rates**                   | inches / lb |                     **139** | `(L×W×H) ÷ 139`         | Official UPS                       |
| **UPS U.S. Retail Rates**                  | inches / lb |                     **166** | `(L×W×H) ÷ 166`         | Official UPS                       |
| **FedEx U.S., Puerto Rico, international** | inches / lb |                     **139** | `(L×W×H) ÷ 139`         | Official FedEx                     |
| **DHL eCommerce U.S.**                     | inches / lb |                     **166** | `(L×W×H) ÷ 166`         | Official DHL eCommerce             |
| **DHL eCommerce U.S.**                     |     cm / kg |                   **6,000** | `(L×W×H cm) ÷ 6000`     | Official DHL eCommerce             |
| **FedEx / common international example**   |     cm / kg |                   **5,000** | `(L×W×H cm) ÷ 5000`     | Official FedEx UK explanatory page |
| **Australia Post**                         | metres / kg |             **250 kg / m³** | `L m × W m × H m × 250` | Official Australia Post            |
| **Australia Post equivalent**              |     cm / kg |                   **4,000** | `(L×W×H cm) ÷ 4000`     | Derived from 250 kg/m³             |
| **TNT / FedEx Australia domestic express** |     cm / kg |                   **4,000** | `(L×W×H cm) ÷ 4000`     | Official TNT Australia             |

UPS explicitly says dimensional weight is `(L × W × H) ÷ divisor`, with 139 for Daily Rates and 166 for Retail Rates, and that fractions of a pound are increased to the next whole pound. ([UPS][2]) FedEx’s U.S. page says to round measurements to the nearest whole inch and divide cubic inches by 139. ([FedEx][1]) DHL eCommerce U.S. states dimensional weight is calculated by dividing cubic size by 166 if measured in inches or by 6,000 if measured in centimetres, then comparing to actual weight. ([DHL][3]) FedEx UK gives 5,000 metric and 139 imperial as common examples, while also warning the divisor varies by carrier. ([FedEx][4])

For the Australian leg of your corpus, Australia Post says cubic weight is calculated by multiplying parcel length, height and width in metres and then multiplying by **250 kg per cubic metre**; it typically charges on the greater of cubic or actual weight. ([Australia Post][5]) TNT Australia states domestic volumetric weight is based on **250 kg/m³**, equivalent to `(L cm × W cm × H cm) ÷ 4,000`, and charges the higher of actual or volumetric weight. ([TNT][6])

## 3. Parcel girth and size rules

| Rule                               |                              Formula / value | Source                     |
| ---------------------------------- | -------------------------------------------: | -------------------------- |
| **Length**                         |                  Longest side of the package | UPS / FedEx                |
| **Girth**                          |                     `2 × width + 2 × height` | UPS / FedEx                |
| **Length + girth**                 |                     `longest side + 2W + 2H` | UPS / FedEx                |
| **UPS U.S. max package length**    |                                       108 in | UPS                        |
| **UPS U.S. max length + girth**    |                                       165 in | UPS                        |
| **FedEx Ground/Home Delivery max** | 150 lb, 108 in length, 165 in length + girth | FedEx packaging guidelines |

UPS states packages can be up to 165 inches in length and girth combined, with girth calculated as `2 × width + 2 × height`, then adding the longest side. ([UPS][2]) FedEx packaging guidance similarly describes length plus girth as length plus twice width plus twice height. ([FedEx][7])

## 4. NMFC / LTL freight class data

This is the tricky bit. The official NMFC system is managed by NMFTA and ClassIT+, and full commodity-level lookup is not fully open. Your KB should separate:

1. **Open formula data**: density, cubic feet, PCF.
2. **Open structural data**: class range, classification factors.
3. **Controlled / licensed data**: official commodity NMFC item numbers and final class outcomes.
4. **Estimated density tables**: useful, but should be labelled as “estimator / non-authoritative”.

NMFTA says freight class ranges from **50 to 500** and is based on four transportation characteristics: **density, handling, stowability, and liability**. ([NMFTA][8]) NMFTA also confirms the 2025 changes expanded the Freight Classification Development Center density scale from 11 to **13 subprovisions**, adding density breaks for 30–35 pcf at class 60, 35–50 pcf at class 55, and 50+ pcf at class 50. ([NMFTA Help Center][9])

### LTL density calculation

| Step         | Formula                        |
| ------------ | ------------------------------ |
| Cubic inches | `L in × W in × H in`           |
| Cubic feet   | `(L in × W in × H in) ÷ 1,728` |
| Density      | `weight lb ÷ cubic feet`       |

NMFTA’s own FAQ example calculates pallet cubage by multiplying the greatest straight-line dimensions in inches, dividing by 1,728 to get cubic feet, then dividing weight by cubic feet to get pounds per cubic foot.

### Public estimator table to store with caution

The commonly published legacy 18-class density estimator is useful for quoting and education, but should be marked as **non-authoritative unless confirmed against ClassIT+ / carrier tariff**:

| Density, lb/ft³ | Estimated freight class |
| --------------: | ----------------------: |
|            ≥ 50 |                      50 |
|      35 to < 50 |                      55 |
|      30 to < 35 |                      60 |
|    22.5 to < 30 |                      65 |
|    15 to < 22.5 |                      70 |
|    13.5 to < 15 |                    77.5 |
|    12 to < 13.5 |                      85 |
|    10.5 to < 12 |                    92.5 |
|     9 to < 10.5 |                     100 |
|        8 to < 9 |                     110 |
|        7 to < 8 |                     125 |
|        6 to < 7 |                     150 |
|        5 to < 6 |                     175 |
|        4 to < 5 |                     200 |
|        3 to < 4 |                     250 |
|        2 to < 3 |                     300 |
|        1 to < 2 |                     400 |
|             < 1 |                     500 |

This exact 18-class table is widely reproduced by LTL tools such as FreightRun, but it should be treated as an estimator because NMFTA’s current framework now includes the 13-sub density progression and commodity-specific handling/stowability/liability exceptions. ([FreightRun.com][10])

## 5. Recommended KB table structure

### `freight_formula_reference`

| field                | example                                                 |
| -------------------- | ------------------------------------------------------- |
| `formula_id`         | `DIM_WEIGHT_IMPERIAL`                                   |
| `formula_name`       | `Dimensional weight, inches to pounds`                  |
| `formula_expression` | `ceil((length_in * width_in * height_in) / divisor)`    |
| `unit_input`         | `in, lb`                                                |
| `unit_output`        | `lb`                                                    |
| `rounding_rule`      | `ceil final weight; carrier may round dimensions first` |
| `effective_from`     | `2026-01-01`                                            |
| `source_url`         | official source                                         |
| `source_type`        | `carrier_official`                                      |
| `confidence`         | `high`                                                  |

### `carrier_dim_divisor_reference`

| field                   | example                                   |
| ----------------------- | ----------------------------------------- |
| `carrier`               | `UPS`                                     |
| `country_region`        | `US`                                      |
| `service_family`        | `Daily Rates`                             |
| `unit_system`           | `imperial`                                |
| `divisor`               | `139`                                     |
| `formula_id`            | `DIM_WEIGHT_IMPERIAL`                     |
| `round_dimensions_rule` | `nearest whole number / carrier-specific` |
| `round_weight_rule`     | `ceil to next whole lb`                   |
| `effective_from`        | date known                                |
| `effective_to`          | null                                      |
| `source_url`            | UPS page                                  |
| `last_verified_at`      | current verification date                 |

### `ltl_density_class_reference`

| field             | example                                                |
| ----------------- | ------------------------------------------------------ |
| `system`          | `NMFC`                                                 |
| `table_type`      | `density_estimator` or `official_13_sub_density_scale` |
| `density_min_pcf` | `35`                                                   |
| `density_max_pcf` | `50`                                                   |
| `freight_class`   | `55`                                                   |
| `effective_from`  | `2025-07-19`                                           |
| `authority`       | `NMFTA / public estimator / carrier tariff`            |
| `notes`           | `Commodity-specific exceptions apply`                  |

## 6. Best source hierarchy

Use this order when populating the KB:

1. **Carrier official pages / service guides**: UPS, FedEx, DHL, Australia Post, TNT/FedEx Australia.
2. **NMFTA / NMFC / ClassIT+** for freight class rules and official commodity classification.
3. **Carrier tariffs / negotiated contract schedules** where your business has actual account terms.
4. **3PL calculators and public freight tools** only as secondary estimator sources.
5. **Blogs/calculators** only where they cite primary sources or are used for examples, never as the authority of record.

## 7. Immediate KB remediation checklist

Add these now:

* DIM weight formulas: imperial and metric.
* Chargeable weight rule: actual vs dimensional, greatest wins.
* Carrier divisor lookup table with effective dates.
* CBM and cubic-foot conversion formulas.
* Length + girth formula.
* LTL density formula.
* NMFC source note: official commodity classifications require NMFTA/ClassIT+ or carrier confirmation.
* NMFC 2025 note: 13-sub density structure effective from the 2025 Docket 2025-1 cycle.
* A “last verified” field on all carrier constants.

The clean design principle: **formulas are durable; divisors and class tables are volatile**. Store the maths separately from the carrier constants so your KB does not go stale every time a carrier decides to make accountants cry.

[1]: https://www.fedex.com/en-us/shipping/packaging/what-is-dimensional-weight.html "What is Dimensional Weight? | FedEx"
[2]: https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight "Shipping Dimensions and Weight | UPS - United States"
[3]: https://www.dhl.com/us-en/home/ecommerce/business-help-center/chargeable-weight.html "Chargeable Shipping Weight and Cost - DHL eCommerce - United States of America"
[4]: https://www.fedex.com/en-gb/how-to/calculate-costs/dimensional-weight.html "Understand dimensional weight to calculate costs | FedEx United Kingdom"
[5]: https://auspost.com.au/business/business-ideas/ecommerce-jargon-busters/what-is-cubic-weight "How to calculate cubic weight - Australia Post"
[6]: https://www.tnt.com/express/en_au/site/how-to/calculate-size-and-weight.html "Calculating Size & Weight | Packaging Your Shipment | TNT Australia"
[7]: https://www.fedex.com/content/dam/fedex/apac-asia-pacific/downloads/fedex-comprehensive-packing-guide-en-ph.pdf?utm_source=chatgpt.com "General Packaging Guidelines - FedEx"
[8]: https://nmfta.org/standards/classification/nmfc/?utm_source=chatgpt.com "The Standard That Keeps Freight Moving - National Motor Freight ..."
[9]: https://help.nmfta.org/hc/en-us/articles/38932132157979-NMFC-Changes-FAQ-Can-you-share-with-us-the-density-and-class-breaks-for-the-new-13-sub-structure "NMFC Changes FAQ: Can you share with us the density and class breaks for the new 13 sub-structure? – NMFTA Help Center"
[10]: https://www.freightrun.com/tools/nmfc-code-lookup " Free NMFC Code Lookup Tool (2026 Freight Class Chart)"
