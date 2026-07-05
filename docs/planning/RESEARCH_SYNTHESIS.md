# Research Synthesis

## Source Review

The source reports under `docs/project/` contain three useful layers:

- The research design report defines how to evaluate utility-tool opportunities.
- The opportunity report ranks concrete tool clusters and recommends inventory first, logistics second.
- The implementation plan defines a repeatable utility-site launch model, but its initial word-unscrambler recommendation conflicts with the later B2B operations research.

Given the current corpus focus on logistics, planning, weight, dimensions, and inventory, this project should follow the B2B operations direction.

## Key Decisions

### 1. Build a Cluster, Not a Single Tool

The research repeatedly favors topical clusters. One calculator is useful, but a connected set of tools is more defensible for SEO, internal linking, user retention, and monetization.

Recommended first cluster:

- Reorder point
- Safety stock
- EOQ
- Inventory turnover
- Inventory days
- Carrying cost
- Stockout cost

Recommended second cluster:

- Dimensional weight
- Volumetric weight
- CBM
- Freight density
- Chargeable weight
- Pallet utilization
- Carton volume

### 2. Prioritize Operational Usefulness

The opportunity report warns against thin commodity tools. Each calculator should include:

- Inputs that match real operational workflows.
- Immediate answer output.
- Formula transparency.
- Worked examples.
- Clear assumptions.
- Export or copy-friendly results.
- Related calculators and templates.

### 3. Treat AdSense as Secondary

The older implementation plan emphasizes AdSense. The newer research is more practical: B2B lead value, affiliate fit, templates, and premium exports may matter more than display ads.

Initial monetization should be designed conservatively:

- Display ads only after the tool experience remains clean.
- Affiliate links only where relevant to the calculator's job.
- Lead capture only after trust and traffic exist.
- Premium exports or templates after repeat usage is visible.

### 4. Avoid Risky Claims

The logistics cluster has commercial sensitivity. Freight class, carrier divisors, landed cost, and compliance-adjacent content must be framed as estimates or planning aids.

Required copy pattern:

- State the formula.
- State assumptions.
- State regional limitations.
- Tell users when to confirm with their carrier, accountant, broker, or internal policy.

### 5. Ground Everything in the Knowledge Base

The source books are now ingested into a hybrid-search knowledge base (see
`docs/architecture/CORPUS_DESIGN.md`). Every formula, explanation, and worked example should be
grounded in and cited from a retrieved passage rather than invented. This is what
makes the "corpus-backed" positioning defensible.

A coverage check of the backlog against the knowledge base found an important
asymmetry that reinforces the cluster order:

- Inventory and pricing formulas are strongly grounded (explicit expressions,
  worked examples, and safety-factor tables are in the corpus).
- Freight and dimensional-weight formulas are only conceptually grounded — the
  corpus defines the concepts but not the modern carrier divisors, NMFC classes,
  metric-CBM conventions, or parcel girth limits. Those must be sourced externally.

Implication: inventory can be built directly from the corpus now; freight needs a
parallel external-sourcing effort before its calculators are trustworthy.

## Opportunity Priority

| Priority | Cluster | Reason |
|---:|---|---|
| 1 | Inventory replenishment | Best mix of useful formulas, evergreen intent, B2B monetization, and strong corpus grounding |
| 2 | Freight and dimensional weight | High commercial intent; corpus grounds the concepts but carrier constants need external sourcing |
| 3 | Margin, markup, and landed cost | Useful adjacency after inventory and freight exist |
| 4 | Training, SOP, and shift handover | Defensible B2B content and templates |
| 5 | Developer/data cleaning tools | Useful portfolio option, but less aligned with current corpus |
| 6 | Word and game tools | High traffic, high competition, and lower fit with current project direction |

## Product Rule

Every new page should answer this before development:

> What exact operational decision does this tool help the user make?

If the answer is vague, the tool should wait.
