/* eslint-disable */
/**
 * generated — do not edit; run `npm run typegen` to regenerate.
 *
 * Source: schemas/*.json (JSON Schema Draft 2020-12), compiled by
 * web/scripts/generate-record-types.ts via json-schema-to-typescript.
 *
 * Conditional (if/then) constraints are stripped before type generation —
 * they narrow values, not shapes — and are enforced at runtime by the corpus
 * validator (web/src/lib/corpus/validate.ts).
 */

/**
 * Public tool/page definition binding formula records to a page spec (MVP inventory cluster).
 */
export interface CalculatorRecord {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
  primary_keyword: string;
  secondary_keywords?: string[];
  /**
   * @minItems 1
   */
  formula_ids: [string, ...string[]];
  /**
   * @minItems 1
   */
  input_groups: [
    {
      label: string;
      /**
       * @minItems 1
       */
      inputs: [Input, ...Input[]];
    },
    ...{
      label: string;
      /**
       * @minItems 1
       */
      inputs: [Input, ...Input[]];
    }[]
  ];
  /**
   * @minItems 1
   */
  result_cards: [ResultCard, ...ResultCard[]];
  copy_blocks: {
    intro: string;
    how_it_works?: string;
    formula_explanation?: string;
    worked_example?: string;
    /**
     * @minItems 1
     */
    faq: [
      {
        q: string;
        a: string;
      },
      ...{
        q: string;
        a: string;
      }[]
    ];
  };
  related_tools: string[];
  disclaimer_level?: "none" | "estimate" | "regional" | "professional_review";
  /**
   * @minItems 1
   */
  schema_types: [
    "WebApplication" | "FAQPage" | "BreadcrumbList" | "Organization",
    ...("WebApplication" | "FAQPage" | "BreadcrumbList" | "Organization")[]
  ];
}
export interface Input {
  symbol: string;
  label: string;
  unit: string;
  type?: "number" | "integer";
  min?: number;
  max?: number;
  required?: boolean;
  default?: number;
  help?: string;
}
export interface ResultCard {
  symbol: string;
  label: string;
  unit: string;
  primary?: boolean;
  description?: string;
}

/**
 * A reusable calculation record grounded in the knowledge base (see docs/CORPUS_DESIGN.md).
 */
export interface FormulaRecord {
  /**
   * Stable dotted identifier, e.g. inventory.reorder_point.basic
   */
  id: string;
  name: string;
  category: "inventory" | "freight" | "packaging" | "pricing" | "workforce" | "safety";
  description: string;
  /**
   * @minItems 1
   */
  inputs: [
    {
      name: string;
      symbol: string;
      type: "number" | "integer";
      unit: string;
      required?: boolean;
      min?: number;
      max?: number;
      description?: string;
    },
    ...{
      name: string;
      symbol: string;
      type: "number" | "integer";
      unit: string;
      required?: boolean;
      min?: number;
      max?: number;
      description?: string;
    }[]
  ];
  /**
   * @minItems 1
   */
  outputs: [
    {
      name: string;
      symbol: string;
      unit: string;
      description?: string;
    },
    ...{
      name: string;
      symbol: string;
      unit: string;
      description?: string;
    }[]
  ];
  /**
   * Canonical human-readable expression.
   */
  expression: string;
  assumptions: string[];
  limitations: string[];
  /**
   * Worked examples; prefer values lifted from a cited KB passage.
   *
   * @minItems 1
   */
  examples: [
    {
      inputs: {
        [k: string]: number;
      };
      expected: {
        [k: string]: number;
      };
      tolerance?: number;
      note?: string;
      citation?: Citation;
    },
    ...{
      inputs: {
        [k: string]: number;
      };
      expected: {
        [k: string]: number;
      };
      tolerance?: number;
      note?: string;
      citation?: Citation;
    }[]
  ];
  sources?: string[];
  /**
   * corpus = formula in KB; concept = KB defines idea not constants; external = sourced elsewhere
   */
  grounding: "corpus" | "concept" | "external";
  citations: Citation[];
  disclaimer_level: "none" | "estimate" | "regional" | "professional_review";
}
export interface Citation {
  source_file: string;
  chunk_index: number;
  quote?: string;
}

/**
 * Lookup-style data (z-factors, carrier divisors, freight classes, pallet sizes).
 */
export interface ReferenceTableRecord {
  id: string;
  name: string;
  description?: string;
  region: string;
  /**
   * ISO date the values apply from, or null if not yet sourced.
   */
  effective_date?: string | null;
  review_frequency?: string;
  grounding: "corpus" | "concept" | "external";
  /**
   * needs_sourcing means rows are placeholders pending an authoritative source.
   */
  status: "verified" | "needs_sourcing";
  source_type: "official_standard" | "carrier_published" | "public_reference" | "internal_assumption";
  source?: string;
  sourcing_notes?: string;
  columns?: string[];
  rows: {}[];
  citations?: {
    source_file: string;
    chunk_index: number;
    quote?: string;
  }[];
}

/**
 * A unit of measure with conversion to a base unit for internal calculation.
 */
export interface UnitRecord {
  /**
   * e.g. unit.length.cm
   */
  id: string;
  name: string;
  symbol: string;
  dimension: "length" | "weight" | "volume" | "time" | "currency" | "count" | "ratio";
  base_unit: string;
  /**
   * Multiply a value in this unit by this factor to get the base unit.
   */
  conversion_factor: number;
  precision?: number;
}
