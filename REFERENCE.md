# csa-prd — Reference

Stable facts for this project. Updated in place when facts change.

---

## Document

| Item | Value |
|------|-------|
| **Title** | Content Graph & Operations Layer V3 Breakout |
| **Current version** | V0.5 (delivered 2026-04-10) |
| **Google Doc (live)** | https://docs.google.com/document/d/1CTaFEkZaFWJuO8YIo_jKMdlXxPq3wYha/edit |
| **Google Doc (strategic assessment)** | https://docs.google.com/document/d/105XK60PgJnLUo7tHZ_jdRb_R11J-OsutFXvs8o8K_XY — "CSA Pipeline Structural Concerns: First Two Weeks" (Pierce, April 2026) |
| **Verbatim markdown copy** | `prd-v0.5.md` (this repo) — matches Google Doc as of 2026-04-14 |
| **Status** | Google Doc is the live/canonical version. `prd-v0.5.md` is the point-in-time markdown record. |
| **Predecessor** | V0.3 (exported via Pandoc); V0.4 (Sarah Price feedback incorporated). After V0.4: do NOT re-export from markdown — Google Doc is authoritative. |

## Version History

| Version | Date | Notes |
|---------|------|-------|
| V0.3 | ~2026-04-01 | Dash normalization complete; Module 7 (Variant Differentiation) added. Exported to Google Docs via Pandoc. |
| V0.4 | ~2026-04-07 | Sarah Price feedback incorporated. Chris had not yet reviewed as of 2026-04-07 meeting. |
| V0.5 | 2026-04-10 | All 10 Chris Palo items + T3 sub-pipes. Final revision pass. Pasted into Google Docs. |

## What Was Changed in V0.5

All 10 Chris Palo revision items:
1. CSA reframed as pipeline container, not magic tool (Overview + CSA intro)
2. Inclination Engine named and defined (Signal & Brief Creation, CSA, Strategic Pipeline Elements, Open Questions)
3. Purpose-driven pipeline framing + per-pipeline OKR distinction (Universal Principles + each pipeline)
4. Author profiles elevated to full Universal Principle with compounding-value framing
5. Gary tools reframed as cross-pipeline nodes (CSA section, Quality Enrichment, Strategic Pipeline Elements)
6. TBTV added to distribution channel lists (CMS Delivery)
7. CPA/cost language loosened — directional frameworks, not pre-specified formulas
8. Monetization reframed as avenue; syndication de-centered
9. Automated pipeline future state scoped conservatively (Inclination Engine = future)
10. Data loop opened up — signal sources described as expanding, no hard spec
- T3 sub-pipes (~10 by content vertical) added

## Key Architectural Decisions (from Chris Palo, 2026-04-10)

- **CSA = pipeline container**, not magic tool. Pipes categorized by touch level (high/low/medium).
- **Inclination Engine** = sole future input for automated brief generation. Feeds T1/T2 without human initiation.
- **Gary tools = "nodes"** — cross-pipeline tools every pipeline touches; specify per-pipeline impact.
- **Purpose-driven pipelines** — each has explicit purpose (engagement, revenue, acquisition). OKRs differ per pipeline.
- **Monetization = avenue, not focus.** Each distribution channel has different value calculation (RPM vs RPS vs deal economics).
- **Data loop = leave open-ended.** Do not over-specify signal sources.
- **Author persona confirmed + retained** — Inclination Engine is automation layer; author persona shapes output.
- **$85 CPA / 6,156 PV breakeven** — ECPM reference data point from Chris. Do NOT specify in PRD. Stored here only.

## Team

| Name | Role | Notes |
|------|------|-------|
| Pierce Williams | Author; pipeline strategy lead | — |
| Chris Palo | Content team lead; primary PRD stakeholder | Provided all V0.5 revision items |
| Sarah Price | Co-analyst; reviewed V0.4 | — |
| Susannah Locke | Product manager (CSA); implementation lead | — |
| Rajiv Pant | Lead PM/engineer (Maktachi/CSA dev team) | — |

## Related Documents

| Document | Location / Notes |
|----------|-----------------|
| Strategic assessment (13 concerns) | docs.google.com/document/d/105XK60PgJnLUo7tHZ_jdRb_R11J-OsutFXvs8o8K_XY |
| RECIPE.md | `ops-hub/RECIPE.md` — Creator × Format × Topic × Market → Return; cluster definition; how P14 (keywords), CSA, Inclination Engine, Snowflake/Sigma fit together |
| Gary tools API docs | `gary-tools/docs/api-reference.md` |
| CSA Content Standards | https://csa-content-standards.netlify.app |
