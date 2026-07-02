# Project Brief

## Purpose

Create a search-driven operations utility website that helps warehouse, ecommerce, procurement, freight, and small-business operators solve practical planning problems quickly.

The project starts from three research documents under `docs/project/`:

- `docs/project/Research Design Report for Utility Website Opportunity Research.md`
- `docs/project/Utility Website Opportunity Research Report.md`
- `docs/project/Example_Development_and_Implementation_Plan.md`

Together, they show that generic utility sites can still generate traffic, but the stronger opportunity is a focused B2B operations cluster where useful tools, formulas, templates, and corpus-backed explanations create defensibility.

## Recommended Positioning

Build an operations calculator and planning toolkit, not a generic utility portfolio.

The first public version should feel like a practical warehouse and supply-chain workbench:

- Inventory planning calculators
- Logistics and dimensional weight calculators
- Packaging and pallet planning helpers
- Margin, landed cost, and operational cost calculators
- Templates and checklists for recurring workflows

## Audience

Primary users:

- Warehouse managers
- Ecommerce operators
- Procurement and inventory planners
- Freight coordinators
- 3PL and fulfillment teams
- Small-business owners managing stock and shipping decisions

Secondary users:

- Consultants and agencies serving operations clients
- Students or analysts learning inventory and logistics formulas
- Software buyers evaluating inventory, WMS, freight, ERP, or ecommerce tools

## Success Criteria

The project should be considered successful when it can:

- Ship a useful first calculator cluster with tested formulas.
- Explain every formula and assumption plainly.
- Support SEO pages with original examples and corpus-backed detail.
- Avoid regulated, misleading, or overconfident claims.
- Generate a repeatable pattern for adding new calculators and templates.
- Capture post-launch learning through Search Console, analytics, and tool usage events.

## Scope

In scope:

- Formula-based calculators.
- Structured corpus conversion, grounded in the hybrid-search knowledge base
  (see `docs/CORPUS_DESIGN.md`). "Corpus-backed" means every formula and
  explanation cites a retrieved source passage.
- Tool pages with supporting explanations and examples.
- Exportable results where useful.
- Legal and trust pages needed for public launch.
- SEO metadata, schema, sitemap, and internal linking.

Out of scope for the first version:

- Live freight quotes.
- Carrier-specific pricing guarantees.
- ERP, WMS, or ecommerce-platform integrations.
- User accounts.
- Payment handling.
- AI-generated operational advice without guardrails.
- Regulated compliance or financial advice.

## Strategic Choice

The strongest first wedge is the inventory replenishment suite. It has clear formulas, evergreen demand, business intent, low maintenance, and strong adjacency to the logistics corpus.

The knowledge base confirms this sequencing: the inventory and pricing formulas
are strongly grounded in the ingested source books, whereas the freight and
dimensional-weight formulas are only conceptually grounded and depend on external
carrier and NMFC reference data. Inventory ships first because it is ready;
freight follows once its reference tables are sourced.
