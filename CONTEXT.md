# csa-prd — Working Context

**Phase:** Post-delivery / Maintenance
**Status:** V0.5 complete and delivered. Living document — updates as pipeline evolves.
**Last session:** 2026-04-14

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **PRD V0.5 complete (2026-04-10 evening).** All 10 Chris Palo revision items implemented. Pasted into Google Docs — Google Doc is the live version.
- **This repo** stores the PRD verbatim + context, status, gaps, and action items. The Google Doc is the canonical delivery artifact; this repo is the working record.
- **P9 in ops-hub: CLOSED.** PRD is no longer tracked as an active project dependency. P15, P16, P11 dependencies satisfied.
- PRD was initially built from Pierce's strategic assessment ("CSA Pipeline Structural Concerns: First Two Weeks") + Chris Palo direction (2026-04-10 meeting).

## What the PRD Covers

**Title:** Content Graph & Operations Layer V3 Breakout

**Two primary systems:**
1. **Content Graph** — asset lineage, versioning, and performance tracking. Connects content created through CSA back to source, variant history, and downstream performance signals.
2. **Operations Layer** — air traffic control dashboard. Visibility into pipeline state, queue, throughput, and exceptions.

**Pipeline types documented:**
- T1 (high-touch, national team): Audience Variants, Google Discover Explainer
- T2 (medium-touch): format-only runs, United Robots inbound
- T3 (~10 sub-pipes by content vertical): infographics, licensed partner content, etc.
- Future: fully automated (Inclination Engine → brief → generate → publish)

**Key named concept — Inclination Engine:**
- Sole future input for automated signals and T1/T2 brief generation
- Feeds pipeline without human initiation
- Explicitly named and defined in PRD (Signal & Brief Creation section, CSA section, Strategic Pipeline Elements, Open Questions)

**Universal Principles (apply across all pipelines):**
- Author profiles as compounding-value infrastructure
- Gary tools as cross-pipeline "nodes" (not pipeline-specific)
- Purpose-driven framing: each pipeline has explicit OKR; CPA = cost-center signal, not the goal
- Distribution channels: O&O, Trend Hunter app, Syndication, TBTV (future)
- Data loop left open-ended — signal sources described as expanding, no hard spec

## What the PRD Does NOT Cover

- **A section on what the CSA itself should ultimately be and do** — this was identified as a gap during V0.5. Pierce + Claude were drafting it. Status: not yet added to Google Doc.
- Specific cost formulas (CPA/breakeven) — intentionally left directional, not prescriptive.
- Automated middle-tier pipeline decision logic — Chris acknowledged this is his call; verbal alignment reached but not fully specified in doc.

## Known Gaps / Open Items

- [ ] **Missing CSA-vision section** — What should the CSA ultimately be and do? Needs to be drafted and added to the Google Doc. This is the most significant structural gap in V0.5.
- [ ] **Gary tool roster per pipeline** — Pierce emailed Gary 2026-04-10 (CC Chris) requesting full tool roster. Gary = "unreliable" per Chris C&P Weekly 2026-04-13 (undocumented confidence score, vibe-coded validation). Gary integration as QA gate suspended. V1 roadmap: internal source ranking library. Need to update Gary's role in PRD once Chris's V1 scope is clearer.
- [ ] **Infographics pipeline** — flagged by Chris (2026-04-10) as under investigation. Not fully specced. Add when scope firms up.
- [ ] **Licensed partner content pipeline** — flagged by Chris (2026-04-10). Licensed influencer video/transcript → CSA → multiple articles. Not fully specced.
- [ ] **Inclination Engine detail** — Currently defined at concept level. Full spec TBD as Trend Hunter app pipeline matures (automated signal layer is future state).
- [ ] **TBTV** — Future distribution channel. No scope definition yet. Watch for Chris direction.
- [ ] **Spanish CSA pipeline** — Not in PRD. Chris + Rajiv considering it. Julia Tortoriello willing to test. Add when direction confirmed.

## What's Next

1. [ ] **Store PRD verbatim** — paste V0.5 text into `prd-v0.5.md` in this repo as the canonical markdown copy
2. [ ] **Draft missing CSA-vision section** — what the CSA ultimately should be and do; add to Google Doc + mirror here
3. [ ] **Update Gary section** once Chris's V1 source-ranking library scope is defined
4. [ ] **Add infographics + licensed partner pipelines** when specced by Chris
5. [ ] **Monitor Inclination Engine development** — update PRD as Trend Hunter app pipeline takes shape

---

*This file follows the Tiered Context Architecture. Budget: ≤150 lines.*
