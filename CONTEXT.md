# csa-prd — Working Context

**Phase:** Visualization / Active
**Status:** V0.5 distributed. GitHub Pages visualization site built (local). 3-view toggle complete (Current State / PRD Ideal / Delta). Push + Pages enable pending.
**Last session:** 2026-04-17

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **PRD V0.5 complete (2026-04-10 evening).** All 10 Chris Palo revision items implemented. Pasted into Google Docs — Google Doc is the live version.
- **Distributed at CSA Weekly 2026-04-14.** Chris framed as "goalpost" document: every feature request should trace back to it. Also described as "archive" — snapshot in time, not a live roadmap. Chris's architectural framing: vertical "pipes" (T1–T5) + horizontal cross-cutting elements (publish-to-queue, tool nodes like Gary).
- **Visualizations needed.** Chris explicitly requested Pierce produce diagrams for eng team clarity. Task logged in ops-hub (#2 pipeline architecture visuals).
- **This repo** stores the PRD verbatim + context, status, gaps, and action items. The Google Doc is the canonical delivery artifact; this repo is the working record.
- **P9 in ops-hub: CLOSED.** PRD is no longer tracked as an active project dependency. P15, P16, P11 dependencies satisfied.
- **Diagnostic document created (2026-04-17):** `data-keywords/reports/csa_pipeline_diagnostic_2026-04-17.docx` — 8-part analysis using Sully AI context engineering as primary audit lens. Covers: "agents" misnomer, cascade coupling failure mode, specific bug traces (PGS-98/104/82), PRD gap table, Sully AI 5-principle mapping, incremental path forward.
- **GitHub Pages visualization site built (2026-04-17):** 3-view toggle — Current State (8-step flow with cascade coupling band + NOT BUILT grid), PRD Ideal (5-lane swimlane T1–T5 with shared Signal Layer / Quality Gates / Performance Tracking), Delta (12-item card analysis). Local server running; push to GitHub + enable Pages not yet done.

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

- [x] ~~**Missing CSA-vision section**~~ — ADDED IN V0.5. The CSA Core Platform Vision section is now in the PRD. Distributed at CSA Weekly 2026-04-14.
- [ ] **Gary tool roster per pipeline** — Pierce emailed Gary 2026-04-10 (CC Chris) requesting full tool roster. Gary = "unreliable" per Chris C&P Weekly 2026-04-13 (undocumented confidence score, vibe-coded validation). Gary integration as QA gate suspended. V1 roadmap: internal source ranking library. Need to update Gary's role in PRD once Chris's V1 scope is clearer.
- [ ] **Infographics pipeline** — flagged by Chris (2026-04-10) as under investigation. Not fully specced. Add when scope firms up.
- [ ] **Licensed partner content pipeline** — flagged by Chris (2026-04-10). Licensed influencer video/transcript → CSA → multiple articles. Not fully specced.
- [ ] **Inclination Engine detail** — Currently defined at concept level. Full spec TBD as Trend Hunter app pipeline matures (automated signal layer is future state).
- [ ] **TBTV** — Future distribution channel. No scope definition yet. Watch for Chris direction.
- [ ] **Spanish CSA pipeline** — Not in PRD. Chris + Rajiv considering it. Julia Tortoriello willing to test. Add when direction confirmed.

## What's Next

1. [x] ~~**Store PRD verbatim**~~ — DONE. `prd-v0.5.md` in this repo.
2. [x] ~~**Draft missing CSA-vision section**~~ — DONE IN V0.5. CSA Core Platform Vision section added.
3. [x] ~~**Write pipeline diagnostic document**~~ — DONE 2026-04-17. `data-keywords/reports/csa_pipeline_diagnostic_2026-04-17.docx`.
4. [x] ~~**Build pipeline architecture visualizations (v1)**~~ — DONE 2026-04-17. GitHub Pages site, 3-view toggle, csa-prd repo. Local only — push + Pages enable still needed.
5. [ ] **Push csa-prd to GitHub and enable Pages** — `piercewilliams/csa-prd`, main branch root → `piercewilliams.github.io/csa-prd`
6. [ ] **Update Gary section** once Chris's V1 source-ranking library scope + IP/contract resolution defined
7. [ ] **Add infographics + licensed partner pipelines** when specced by Chris
8. [ ] **Monitor Inclination Engine development** — update PRD as Trend Hunter app pipeline takes shape

---

*This file follows the Tiered Context Architecture. Budget: ≤150 lines.*
