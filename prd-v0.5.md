# McClatchy Content Pipeline—End-to-End Vision PRD

> **Version:** V0.5 (delivered 2026-04-10)
> **Google Doc (live/canonical):** https://docs.google.com/document/d/1CTaFEkZaFWJuO8YIo_jKMdlXxPq3wYha/edit
> **Status:** Delivered. Google Doc is the authoritative version. This file is the verbatim markdown copy.

---

## Table of Contents
1. Overview
2. Ideal End State
3. Universal Pipeline Principles
4. The Pipelines
5. The CSA: Core Platform Vision
6. System Requirements
   - Request Intake & Triage
   - Signal & Brief Creation
   - Content Generation
   - Quality Enrichment & Verification
   - Editorial Review & Approval
   - CMS Delivery & Channel Distribution
   - Performance Tracking
   - Testing Module
   - Content Graph
   - Operations Layer: The Control Room
7. Open Questions

---

## Overview

This document maps the ideal end state of McClatchy's AI-assisted content pipeline: from the moment a performance signal identifies a content opportunity, through generation, enrichment, editorial, publishing, and distribution, and back to the performance data that informs the next cycle. Its purpose is to give the development team a clear, complete picture of the system they're building toward, so that individual features can be evaluated as steps toward a defined goal rather than isolated improvements. For every incremental step or scoped decision the product team brings forward, this document is the goalpost: does it move us closer to the ultimate vision?

Each pipeline in this system is purpose-driven: the automation level, editorial profile, distribution targets, and success metrics all follow from the specific business objective that pipeline serves. The CSA is the operational core of this system—a pipeline container and orchestration layer, not a standalone tool. Understanding it as the former, not the latter, is the frame that makes the rest of this document coherent. This document also includes a vision for what the CSA itself ultimately looks like and does—a section that's been absent from prior PRD iterations and is needed to give the dev team a complete picture of the tool at the center of the pipeline.

This is a pipeline map, not a prioritization document. Priorities will be determined collaboratively based on economic impact and complexity.

---

## Ideal End State

McClatchy's content pipeline operates as a closed, instrumented loop across parallel content pipelines:

```
signal in →
brief generated →
content created →
enriched →
verified →
greenlighted or auto-routed →
published →
distributed →
performance feeds back in →
next signal
```

### Key properties

**Closed loop**
Performance data from distributed content directly informs what gets generated next. No manual handoffs break the loop.

**Modular quality gates**
Each pipeline element—citations, keywords, brand/author voice, internal links, SEO metadata, cluster assignment, persona match, format compliance, and perhaps more—has a discrete, verifiable quality gate surfaced as a green check or red flag. The editor's job is to fix what failed, not to retry the check. When a module flags a problem, the editor addresses it in the content; the system re-checks automatically when the content is saved or submitted. This prevents checkbox theater: a module that can be re-run without changing anything will eventually pass on the same flawed content, and the gate means nothing.

**Efficiency-tracked**
Cost Per Asset is a key metric for evaluating how efficiently the pipeline operates. Every pipeline improvement should reduce CPA or improve quality and distribution at the same cost. CPA is a cost-center signal—it informs decisions and surfaces inefficiency. The goal is quality content that serves audiences and drives engagement; CPA measures the efficiency with which we produce it. Each pipeline has its own efficiency profile; what drives CPA at T1 differs fundamentally from what drives it at T3 or T4.

**Parallel pipelines**
The system runs distinct content pipelines simultaneously, each with its own purpose, automation level, editorial profile, channel targets, and success metrics. Scaling the system means scaling all, not optimizing one. Foundational elements—article format templates, publish to CMS—are required by all and are therefore the highest-leverage investments. Author profiles apply to T2, T3, and T4; T1 automated content will not carry a named author byline.

The pipelines described here represent current business priorities, not a fixed ceiling. The architecture is designed to accommodate additional pipeline types as new distribution channels, content formats, or automation capabilities emerge without requiring structural changes to the foundational layer.

**Automation spectrum**
The pipelines range from fully automated (United Robots-style, bottom) to most editorially intensive (National, top). Human involvement scales with editorial complexity; the highest-volume content requires very limited, targeted per-piece human action. All run simultaneously; content is routed to the appropriate pipeline at brief creation.

**Syndication as PV increment**
Every article distributed to a syndication platform also lives on O&O. Syndication content has a Lifetime Value of zero—no subscriber conversion, no retargeting, no downstream revenue relationship. The value of every syndication slot is the incremental page views it produces on top of organic O&O performance. Syndication strategy is evaluated entirely on PV delta per platform. This framing applies across all pipelines and shapes how performance data from syndication channels is interpreted: it's an increment, not a destination.

**Syndication ecosystem boundaries**
Three analytically distinct distribution environments operate under different rules and must never be commingled in performance analysis.

- **App-based captured environments** (Apple News, SmartNews, Newsbreak): users stay in-app, no subscriber conversion is possible, LTV is zero. The only value content produces in these environments is incremental page views above what an article generates organically on O&O—and every optimization decision follows from that.
- **Web-based competitive environments** (Yahoo, O&O): users land on a real page, discovery dynamics apply, and standard CTR/PV and engagement metrics apply. A headline formula that dominates in a captured environment may perform poorly in a competitive one.
- **Direct partner distribution** (licensed syndication, B2B content feeds): content is delivered to a named partner under contractual terms. Value is determined by deal economics (revenue share, licensing fees, volume, commitments) independent of PV or LTV dynamics. Optimization in this environment is contract-driven, not performance-driven. As direct partner sub-workstreams are added, each changes the equation on how value and priority are assigned to that content track.

The pipeline tracks and optimizes these three environments separately. Additional distribution environments may emerge as business needs evolve; each will require its own value framework before performance analysis can begin.

**Test, learn, apply**
The national/L&E team is a fast test-and-learn environment. Everything we build and validate here is designed to apply to the news department and broader McClatchy groups. Build for us, apply to them.

---

## Universal Pipeline Principles

The following apply across all pipelines regardless of automation level, distribution channel, or editorial intensity.

**Editorial reputation is always at stake.**
McClatchy's editorial standards do not diminish as automation increases—they manifest differently. A pipeline with minimal human touchpoints is not a pipeline with lower editorial accountability. Every asset produced under this system carries McClatchy's reputation, whether or not it carries a byline.

**The CSA works alongside editors, not instead of them.**
Across all pipelines, the CSA automates the repeatable per-article tasks—brief population, variant generation, quality checks, metadata—so that editor time is concentrated on judgment: story selection, angle validation, and final approval. The degree of human involvement varies by pipeline; the principle does not.

**Each pipeline is purpose-driven with distinct success metrics.**
Each pipeline has an explicit purpose—acquisition, engagement, revenue generation, content maintenance, or some combination—and success is measured against that purpose. Purpose can vary at the asset level within a pipeline: a core Trend Hunter asset may be optimized to drive app clickthroughs, while a bottom-tier variant from the same brief serves new reader acquisition. OKRs are defined per pipeline and per asset tier within a pipeline. CPA is a cost-center efficiency signal; it informs how well the pipeline is running, not what the pipeline is for.

**The pipeline architecture is designed to expand.**
Initial spec pipelines are defined here. Additional pipelines will emerge as business needs evolve. Each new pipeline will require its own value framework, editorial profile, and performance metrics before it can be tracked and optimized—but the foundational infrastructure (format templates, CMS integration, CSA configuration) is shared and already built for extensibility.

**Author profiles are a high-leverage configuration investment.**
Author profiles encode individual editorial voice, style preferences, and audience calibration into the CSA's generation process. When author profiles are functioning correctly, they improve output quality, reduce revision cycles, and reduce per-piece editorial labor across T2, T3, and T4. The impact compounds: a well-maintained author profile library means editorial review concentrates on judgment—angle, accuracy, selection—rather than style repair. At T3 scale, where one canonical generates 45+ derivatives, a well-calibrated author profile reduces the revision burden across every downstream asset, not just the source piece. Author profile quality is among the highest-leverage configuration investments in the system—outranked only by the foundational infrastructure every pipeline requires.

---

## The Pipelines

The pipeline isn't a single workflow; it's parallel workflows running simultaneously, differentiated by purpose, content type, automation level, editorial involvement, and channel target. All require the same foundational infrastructure (article format templates, keywords, publish to CMS) to function.

*Note: this is not in priority order.*

### T1 — Automated

**Purpose:** High-volume, low-cost content fulfillment. Acquisition at scale for base user needs; the floor of consistent coverage that higher-touch pipelines build on.

**What it is:** Fully automated inbound and outbound content. The United Robots pipeline, for example, brings in automated wire-style content; this tier is also where outbound content that requires little or no per-piece human judgment lives. Content flows like a ticker.

**Human role:** None per piece. Humans define the rules, templates, and thresholds; the system executes. Exception handling routes to an operator queue, not an inbox.

**Channel targets:** Examples include Weather Alerts, Traffic Alerts, United Robots content. TBD based on UR partnership scope.

**Key characteristic:** Volume and velocity. The economics are fundamentally different from every other tier—CPA at this tier is dominated by compute cost, not labor.

**Value:** High volume, low lift content that is reliable. Base level user needs.

---

### T2 — App-Based / Platform

**Purpose:** Incremental PV generation through app platform distribution. Content optimized for captured environments where LTV is zero and every optimization decision is PV-delta-driven.

**What it is:** Content generated by the CSA and sent directly to app-based distribution partners—SmartNews, Newsbreak, and equivalents—without going through McClatchy's CMS and without requiring publication on a McClatchy property first. This is a potential architectural advantage (pending confirmation of contract terms with distribution partners): because these platforms don't require a McClatchy publish first, content goes CSA → channel, bypassing CMS entirely.

**Human role:** Minimal. Configuration-level oversight. Because content in app-based captured environments operates outside Google's indexing and ranking system, SEO penalty risk is reduced, which creates room to test formats, pacing, and content types more aggressively than on O&O properties. Editorial reputation is always at stake regardless of platform; the reduced risk here is algorithmic, not reputational.

T2 has two distinct paths to success:
1. Adaptation of existing stories for platform distribution with minimal editorial touch
2. A dedicated workstream of content conceived and produced specifically for these platforms by a team focused on app-based revenue generation.

Both paths operate under the same app-based captured value framework (PV increment, LTV zero) but carry different cost structures and editorial profiles.

**Channel targets:** SmartNews, Newsbreak; potentially others with similar no-site-publish requirements.

**Key characteristic:** The CSA-to-channel direct path. No CMS step. T2 platforms are app-based captured environments: users stay in-app, LTV is zero, and the optimization target is purely incremental revenue delta above what articles generate organically on O&O. The no-CMS-step architecture enables the rapid iteration this environment warrants. This tier is where the most aggressive automation testing happens. Author attribution is less of a constraint here; content may not carry a named byline.

---

### T3 — API / Canonical ("Repackaging")

**Purpose:** Volume from systematic derivation. Maximize asset output from high-quality canonical investment; drive O&O and syndication coverage across markets.

**What it is:** A single high-touch canonical asset—a white paper, a guide, a definitive reference piece (e.g., a retirement guide, a home-buying explainer)—is created with significant editorial investment. From that canonical, 8–10 format variants are derived (explainer, listicle, FAQ, etc.). Each variant is then adapted for location-specific markets (Miami, Kansas City, Sacramento, etc.), producing potentially 45 or more primary assets from one canonical. Those primary assets can then be versioned further for distribution partners.

**Human role:** High at the canonical creation stage; increasingly automated for format variants and location adaptations. The pipeline is bimodal: editorial-intensive at the top of the funnel, mechanical downstream.

**Channel targets:** O&O sites, distribution partners, syndication.

**Key characteristic:** Volume from systematic derivation. One carefully crafted canonical generates a large asset tree. The economics improve dramatically with each derivation layer.

**Sub-pipelines:** T3 is likely to eventually operate as several distinct sub-pipelines, each corresponding to a content vertical—financial services, fashion, tech, and others to be defined. Each sub-pipeline shares the same canonical-to-derivative architecture but carries its own editorial profile, format templates, author pool, and channel targets appropriate to that vertical. The sub-pipeline structure is what makes T3 manageable at scale: rather than a single undifferentiated derivation factory, each vertical is a configured track with its own quality benchmarks and optimization targets.

Author mana is a real constraint here; 18+ versions under one author's name isn't sustainable, and this pipeline requires a strategy for author attribution at scale.

---

### T4 — National

**Purpose:** Audience engagement and batting average optimization. Story selection that works across multiple channel-optimized adaptations; building CSA quality signal through per-piece editorial judgment.

**What it is:** A trending or newsworthy story is discovered, evaluated, and adapted for the optimal channel with factual corrections, stylistic adjustments, and persona-appropriate framing. This is the most editorially intensive pipeline—the "batting average" workflow Sara's team runs daily. One story becomes up to ~5 channel-optimized versions. The content is more newsy, more time-sensitive, and requires the most human judgment about angle, framing, and persona.

**Human role:** High editorial involvement. An editor identifies the story, validates the brief, reviews the generated output, approves the enrichment report element by element, and selects the headline variant. The editor is in the loop throughout.

**Channel targets:** O&O sites (primary), Discover, Apple News, SmartNews, MSN; channel selection is a per-piece editorial decision.

**Key characteristic:** Story choice and adaptation across distribution channels (50%) is the key. This is where the CSA's focus accuracy matters most; the keyword feature is expected to address current focus issues. Performance data must be segmented by distribution environment, not averaged across it.

**Value:** Value is created through story selection that works across multiple adaptations and increasing of batting average—optimization by story, category, channel, author, keyword and other metrics. As opposed to spray and pray: focused stories in focused channels on focused sites where the audience is better served, increasing revenue.

---

### T5 — Updates

**Purpose:** Content freshness and longtail performance maintenance. Protecting the value of the existing content library; systematic interlinking and evergreen page performance.

**What it is:** A continuous background workstream that monitors and maintains published content across the CMS. Update triggers come from two sources:
- CSA-produced content that requires revision as facts change, links decay, or related content is published
- External signals (court records, death dates, regulatory changes, performance shifts) that indicate a page needs attention.

Updates include internal and external link optimization, copy adjustments, factual corrections, and removals. The 30% threshold governs escalation: updates below 30% are applied automatically and surfaced in a review report; updates of 30% or more route to editorial. (For escalation rules and input signal architecture, see Content Updates and Maintenance Logic.)

**Human role:** Review of automated update reports. Direct editorial involvement for substantial revisions (date of death corrections, court record updates, material factual changes).

**Channel targets:** O&O sites (primary)

**Key characteristics:** % of valid information (factually correct content + links to relevant, action-driven content) on high-performing and evergreen pages. Value is created through systematic interlinking and content freshness, not new asset production.

---

### Pipelines Under Investigation

Two additional pipeline types are under active consideration. Neither is fully scoped; each will require its own value framework, editorial profile, and success metrics before implementation begins.

**Infographics Pipeline:** Trend and signal data drives production of a branded visual asset (e.g., HSA contribution rate increases → Trend Hunter-style branded graphic). Distribution targets include the Trend Hunter app and O&O. This pipeline would add a format type that existing pipelines don't cover and extends the asset tree available from a single signal.

**Licensed Partner Content Pipeline:** Licensed external content (e.g., influencer video or transcript with distribution rights) is ingested into the CSA, which generates multiple article derivatives and tangential content. Output distributes to the Trend Hunter app and Pier 1 sites. This pipeline introduces a new input type—licensed external source rather than original or signal-driven content—and requires its own legal and attribution framework.

Both are referenced here to establish them as part of the architecture's scope. Detailed specs will be developed in a subsequent revision.

---

### News and L&E Pipelines (forthcoming)

News and L&E teams will each have defined pipeline workflows under this same architecture. Both are confirmed; they are not afterthoughts or extensions of the National model, but parallel implementations with their own editorial profiles, automation levels, and channel targets.

Pipeline definitions for each will be developed in a subsequent revision once the National team implementation is operationally proven and the foundational layer is validated at scale.

---

## The CSA: Core Platform Vision

The CSA in its ideal form isn't a standalone writing tool—it's the operational core of McClatchy's content production platform and the container through which all pipelines run. This distinction matters: editors and stakeholders who approach the CSA as a magic all-in-one tool will be consistently disappointed; those who understand it as a pipeline orchestration layer—where each pipeline is configured with purpose, parameters, and quality gates—will use it correctly and evaluate it accurately. Every pipeline phase touches the CSA. It sits above the CMSs, within the editorial layer, and at the center of the signal-to-distribution loop.

### What the CSA does (ideal state)

**Operates from continuous, multi-horizon performance intelligence**
Every operational decision—what to brief, which pipeline, which formats and personas, which topic areas need coverage—is grounded in near-term signals (what is performing right now), medium-term signals (what is building audience over weeks), and long-term signals (which content types, subject categories, personas, and formats consistently pull the right audiences over months). A reactive pipeline responds to what just went out. This pipeline operates from all three horizons simultaneously. All the capabilities below exist in service of that principle.

**Accepts structured briefs**
The CSA receives a fully-specified brief: keywords, target persona, article format template, outlet parameters, distribution channel, pipeline tier, and cluster assignment (if applicable). For T1 and T2, briefs are auto-generated by the Inclination Engine from the signal layer without human initiation—the Inclination Engine is the named component that translates performance signals and trend data into complete brief parameters, triggering generation automatically.

For T3 and T4, the Inclination Engine surfaces suggested parameters that an editor validates and launches. Without a complete brief, generation doesn't start.

**Generates focused, format-compliant content**
Given a complete brief, the CSA generates an article that is on-topic (the keyword field determines whether the article is about Alan Richson the person or the movie about him), format-compliant (against the article format template for the given type and outlet), and persona-matched.

**Decouples the headline from the article body**
The headline is a separately generated, separately tracked, separately selectable element. It's not embedded in the article; it's a parallel output with multiple variants. Headline variants are generated from the same keyword and focus parameters as the article body—the brief's keyword field anchors both. Each variant is tracked for performance attribution. The editor selects from the variants or writes a new one. The headline that goes to each channel is recorded.

**Applies author profiles (T2/T3/T4)**
Author profiles—voice training based on a writer's existing body of work, blended with publication-level brand guidelines—are applied at generation time, not retrofitted by a human editor. When it works correctly, the editor isn't correcting voice but confirming it. A well-calibrated author profile library is among the highest-leverage configuration investments in the system: it reduces per-piece revision cycles, concentrates editorial attention on judgment rather than style repair, and at T3 scale compounds across every derivative of a canonical. This may be the single biggest per-piece time-saving opportunity for Sara's team right now, outside of manual metadata entry.

**Routes through quality gates**
After generation, output passes through a modular quality verification layer. Each gate (citation check, plagiarism check, diff/similarity check, brand-fit, internal links, meta optimization, content structure, format compliance) runs automatically and produces a green check or red flag. The result is a structured enrichment report, not a monolithic pass/fail.

**Integrates cross-pipeline tools as nodes**
Certain capabilities—Gary Kirwan's tool nodes being the current primary example—are not pipeline-specific quality modules but cross-pipeline nodes: tools that every pipeline potentially touches, at different stages and for different purposes. A claims validation check in T4 editorial review and a content freshness audit in T5 updates may both run through the same tool node. The Kirwan toolkit is the first instance of this pattern; the architecture should accommodate additional nodes as the tool ecosystem expands. (See also: Quality Enrichment & Verification.)

**Surfaces to editors as a structured package (T3/T4)**
The editor doesn't open a raw draft. They open a package: article draft + enrichment report + headline variants + brief metadata for confirmation. Sign-off is element-by-element. The editor confirms what passed; they address what failed. High-confidence pieces can be greenlighted in seconds.

**Routes directly to channel (T1/T2)**
For automated tiers, the CSA output goes directly to the channel; for T2, this means SmartNews or Newsbreak without a CMS step. No human in the loop per piece.

**Publishes to Cue (or WordPress)**
For T3/T4, approved content is pushed directly into the appropriate CMS without manual entry. The editor approves; Cue or WordPress receives it. Publish-to-Cue is one of the two most urgent pipeline capabilities; without it, the time savings from generation are absorbed by manual CMS entry. For T1—automatically happens.

**Tracks every output**
Every generated asset is assigned a canonical ID at brief creation. All derivatives, variants, and versions are linked to it. The data layer captures the full lineage for performance attribution.

**Surfaces performance intelligence continuously**
The multi-horizon view isn't a report operators pull on demand; it's always present and always informing what happens next.

### The editorial experience (ideal state)

The ideal state is that Sara's team spends their time on editorial judgment and factual validation—deciding what to cover, validating angles, confirming accuracy, selecting from prepared options. These are the top priorities. The system handles the repeatable work; the editor handles what requires human judgment: not reformatting, not rephrasing for voice, not manually entering content into CMS, not generating variations by hand.

---

## System Requirements

What the ideal end state looks like for each capability area, along with the priors required and a relative CPA impact signal. This isn't a sequenced roadmap; implementation order is determined collaboratively based on economic impact and complexity.

### Request Intake & Triage

**Ideal state:** All inbound requests—content, bugs, and feature asks—enter a single intake queue regardless of origination channel (email, Slack, verbal, form). Each request is captured with requester, request type, priority, and deadline at intake. Requests are triaged into two streams before any further action is taken.

- **Stream 1:** Content requests (from sales, marketing, editorial stakeholders, or external partners) are triaged against pipeline capacity and strategic fit, converted into briefs, and routed to the appropriate pipeline tier. Fulfilled requests are linked to the generated assets for accountability and downstream performance attribution.
- **Stream 2:** Bugs and feature requests (system failures, capability gaps, product improvement asks) are routed to management review and prioritization before any development action is taken. These are not converted into briefs; they are evaluated against strategic priorities and queued for the development team on a separate track.

Both streams are visible in the Operations Layer; neither is tracked outside it. Request status is not tracked separately from the queue.

**Priors:** Operations Layer (intake queue surfaces in the control room); agreed SLA thresholds by request type and content tier; brief schema (so accepted content requests convert to well-formed briefs rather than vague handoffs); management prioritization cadence for bugs and feature requests.

**CPA impact:** Medium. Request coordination overhead is currently fragmented across email, Slack, and Airtable; each handoff is invisible to the pipeline and adds latency. Unified intake reduces per-request coordination cost across both streams and enables load-balancing that improves throughput without headcount increases.

---

### Signal & Brief Creation

**Ideal state:** A unified signal layer continuously aggregates performance data from all active distribution channels, segmented by distribution environment—app-based captured (Apple News, SmartNews, Newsbreak) and web-based competitive (Yahoo, O&O)—and never aggregated across them; the optimization target differs by environment.

For T1/T2, the Inclination Engine translates this signal data into fully-specified brief parameters and triggers generation without human initiation. The Inclination Engine is the named component responsible for this translation: it monitors signal inputs continuously, identifies content opportunities, and produces complete briefs that the CSA can execute against immediately. The specific signals it draws on—trending topics, performance patterns, coverage gaps, scheduled triggers—will expand over time as new data sources prove their value; the architecture accommodates additional inputs without requiring structural changes. For T3/T4, the Inclination Engine surfaces suggested parameters that an editor validates and launches.

Every brief is fully specified before generation begins: keywords, target persona, article format template, outlet parameters, distribution channel, pipeline tier, cluster assignment, and headline direction. Headline is a separately specified parameter, not an afterthought.

Subject category and cluster assignment happen at brief creation, not retroactively at publish. For T3, the brief includes the full downstream derivation plan (format variants × markets) so the asset tree is defined upfront, not improvised.

**Priors:** Article format templates (required before any brief can be auto-populated meaningfully); content taxonomy (agreed subject category system and cluster/sibling ID format); author profile library (T2/T3/T4); Inclination Engine architecture decision.

**CPA impact:** High. Auto-brief generation at T1/T2 removes per-piece human labor from origination entirely; reducing manual brief-building time at T3/T4 directly reduces per-piece cost.

---

### Content Generation

**Ideal state:** The CSA generates content from a complete brief. T1 and T2 generation is fully automated with no human initiation or monitoring per piece. T3 and T4 involve editorial validation but generation itself is automated. Across T2, T3, and T4, author profiles are applied at generation time, not retrofitted post-generation.

Multiple headline variants are generated as a parallel output alongside the article body; the signal-optimal variant is pre-selected.

For T3, the canonical-to-derivative pipeline generates format variants (explainer, listicle, FAQ, etc.) and location-specific versions systematically from the approved canonical, with author mana managed at the canonical level so derivatives can carry alternate attribution.

Focus accuracy—the article being about what the brief specifies—is enforced through keyword parameters. Generation failures at T1/T2 route to an exception queue, not a human inbox.

**Swarm testing (Phase 2/3):** When a piece performs above the cluster batting average threshold, the system detects the performance signal and recommends a follow-up cluster—the next article or group of articles to write while the topic is hot. Writers execute; cluster performance feeds back into the signal layer to refine future recommendations. The manual version already exists in the content testing tracker; automating it is a formal product requirement for this pipeline. Prerequisite: cluster ID infrastructure (in progress) and Amplitude/Sigma performance signal detection.

**Priors:** Signal & Brief Creation layer; article format templates (the single highest-leverage foundational investment; without them none of the four pipelines can scale); author profile library (T2/T3/T4).

**CPA impact:** High. The core labor-reduction mechanism across all four pipelines.

---

### Quality Enrichment & Verification

**Ideal state:** After generation, every piece passes through a modular verification and enrichment layer. Each module runs automatically and returns a machine-readable pass/fail/flag result. For T1/T2, gate results drive automated routing; pieces that pass proceed, and pieces that fail a hard gate route to an exception queue. For T3/T4, results surface as a structured enrichment report in the editorial interface.

**Modules:**

- **Citation and fact validation:** verifies claims and external links against credible sources. Deterministic; flagged items require human verification.
- **Plagiarism check:** scans generated content against external sources and McClatchy's own content library to flag passages too similar to existing published material. Hard gate for near-verbatim matches; soft flag for high-similarity passages requiring editorial review.
- **Brand-fit audit:** aligns output to publication voice and guidelines; for multi-site syndication applies tiered guidelines (national + per-publication local). Probabilistic; AI judgment acceptable with human override.
- **Internal link suggestions:** recommends links based on content relevance; requires McClatchy content library indexed in a vector database. A specific high-value use case: flagging existing published articles that should link back to a high-performing evergreen piece to build longtail traffic consistently. Tracking lift across a defined URL set before and after adding backlinks is the measurable form of this use case.
- **Meta optimization:** generates SEO title and meta description for the target channel. Probabilistic.
- **Content structure audit:** validates heading hierarchy, skimmability, and compliance against the article format template.
- **Format compliance check:** confirms output matches the specified format template. Hard gate; total format compliance isn't a suggestion.
- **Variant differentiation (diff check):** ensures that variants generated from the same brief are sufficiently differentiated from one another for independent publication. This is an internal hard gate—it never surfaces to the editor as a flag to resolve. If variants fail the differentiation threshold, the CSA re-generates within the session's parameters until the threshold is met. Editors receive only variants that have already cleared it.
- **Cross-pipeline tool nodes:** Certain verification and enrichment capabilities are best understood as nodes—tools that apply across multiple pipelines and multiple stages, rather than residing within a single quality gate. Gary Kirwan's toolkit is the primary current instance: it provides enhanced claims validation today, but its range of capabilities (content audit, meta optimization, internal link suggestions, brand-fit analysis, unanswered questions detection) means it functions as a set of nodes that different pipelines can invoke at different points.

The integration architecture should reflect this: Kirwan's tools are a parallel layer, not a single module. When the tool flags an issue, the editor can correct it or override it (overrides are rare and treated as a signal of miscalibration, not editorial preference). The integration tracks corrections and overrides by article, author, and content type; overrides generate a report routed to admin. Source trustworthiness—which sources the tool checks against—is a managed list that's updated over time. API key and endpoint documentation received; integration spec in review.

**Priors:** Content generation layer; enrichment and verification API; McClatchy content library indexed; brand guidelines stored and versioned; standard enrichment report schema consumed identically by the editorial interface and the automated routing layer.

**CPA impact:** High (T1/T2): removes human review entirely for automated tiers. Medium (T3/T4): reduces editorial time per piece; editor acts on a structured report rather than evaluating a raw draft holistically.

---

### Editorial Review & Approval

*Applies to T3 and T4 only. T1/T2 have no per-piece editorial review; verification gate results determine routing automatically.*

**Ideal state:** The editor receives a structured package: article draft, enrichment report with per-module results, headline variants with the signal-optimal pre-selected, and brief metadata for confirmation. Sign-off is element-by-element: the editor approves what passed and addresses what failed.

Clean enrichment reports at high signal confidence can be greenlighted in seconds. For T3, routing logic determines whether a piece goes to confirm-only status or requires targeted fixes. For T4, the editor is a collaborator—they may substantially revise the draft; the enrichment report informs rather than gates.

**Priors:** Quality enrichment layer; editorial interface built with element-by-element sign-off UI; auto-greenlight thresholds defined.

**CPA impact:** Medium. Accelerates T3/T4 editorial work but can't eliminate the human-in-the-loop requirement at these tiers.

---

### CMS Delivery & Channel Distribution

**Ideal state:** For T3/T4, approved content is pushed directly into Cue or WordPress with all metadata pre-populated: format template, cluster ID, subject category, persona, distribution channels, selected headline variant, author attribution, pipeline tier. The editor reviews the staged item and publishes; they don't manually enter the article. Publish-to-Cue is the most urgent pipeline capability; without it, the time saved in generation is absorbed by manual CMS entry.

For T2, content dispatches directly to the channel adapter without a CMS step—the defining architectural advantage of T2. For T1, content dispatches directly to configured channels. All publish and dispatch events are written to the data layer linked to the canonical ID. Channel-specific formatting is applied by adapters; two-tier brand guidelines (national + per-publication) apply for multi-site syndication.

**Distribution channels in scope:** O&O sites, Trend Hunter app, Syndication platforms (Apple News, SmartNews, Newsbreak, Yahoo, MSN), and TBTV (future). Each distribution channel has a different value calculation and requires its own adapter and optimization framework. The channel list will expand as new distribution relationships develop.

**Priors:** Pipeline data layer (sits above both CMSs, handles routing and metadata write); CMS API access for Cue and WordPress; T2 channel adapter; metadata schema completion (requires content taxonomy); channel-specific format adapters; two-tier brand guidelines decision.

**CPA impact:** High. Manual CMS entry is one of the largest remaining per-piece labor costs at T3/T4.

---

### Performance Tracking

**Ideal state:** Performance data from all active channels flows automatically into a unified data layer, which surfaces: cost efficiency per asset across pipelines (labor and compute costs tracked separately); content velocity by pipeline and channel; performance by pattern across all three time horizons; headline variant performance by channel and content type; and author profile performance (T2/T3/T4) feeding voice model refinement.

Performance data is always segmented by distribution environment—captured vs. competitive—and never averaged across them; headline and format patterns that hold in one environment don't generalize to the other. Top-performing patterns feed back into the signal layer automatically. Pipeline stages are machine-readable states with defined transitions; every stage transition is a capturable event.

**Priors:** CMS delivery and distribution layers instrumented; Amplitude/Sigma integration; agreed CPA formula; pipeline stage state machine defined.

**CPA impact:** Critical. The tracking infrastructure itself doesn't reduce CPA, but it's what makes the Operations Layer possible, and the Operations Layer is what makes optimization decisions data-driven rather than intuitive.

---

### Content Update and Maintenance Logic

**Content update escalation threshold:** automated updates below 30% content change are applied and surfaced in a review report for editorial acknowledgement. Updates requiring 30% or greater content change route to editorial queue for human review and rewrite before publication.

**Input signal architecture:** The update pipeline monitors signal sources continuously. Current sources include: performance signals (pages crossing defined PV or engagement thresholds trigger a freshness and link audit); fact-check flags (claims flagged as outdated on published content trigger a targeted copy review); link health monitoring (decayed internal and external links surface for replacement, prioritized by the performance of the page they appear on); and publication date staleness (evergreen content beyond a defined age threshold is queued for a structured review). Additional signal sources will be added as they prove value.

Priority across all signal types is weighted by page performance. High-performing and evergreen pages move to the front of the update queue regardless of signal source.

---

### Testing Module

**Ideal state:** A standalone testing module that sits outside the CSA but is continuously fed by it. Approximately 20% of content output is allocated to experimental tests—headline formula experiments, format A/B tests, content type comparisons, swarm cluster results—specifically to hunt for category-level outperformers.

Test cycle data accumulates in a separate data store across sessions and feeds back into the CSA to improve brief defaults, headline generation, and signal layer recommendations over time. Without a separate module, test results are confined to the session that produced them and can't compound into playbook-level rules.

The module maintains three types of records: directional findings strong enough to experiment on but not yet statistically confirmed; confirmed results that have graduated to playbook rules; and swarm cluster results that inform future swarm recommendations. The loop: analysis surfaces a signal → testing module logs the candidate experiment → CSA runs the test → result returns to the module → confirmed patterns shape future brief defaults.

**The strategic logic:** a content category that outperforms by 100% dwarfs incremental gains across the rest of the pipeline. Finding one moonshot winner is worth the 20% allocation many times over. The testing module is the infrastructure that makes that discovery systematic rather than accidental.

**Priors:** Performance Tracking layer; Amplitude/Sigma integration (event data is the raw material for test analysis); cluster ID infrastructure (required for swarm test tracking).

**CPA impact:** Critical. Doesn't reduce per-piece cost directly, but it's the compounding infrastructure that makes each optimization cycle faster and more precise—and the discovery engine for category-level outperformers that can dwarf the rest of the pipeline's output combined.

---

### Content Graph

*Implementation status: deferred per Chris Palo's guidance; we're not driving this, but McClatchy must be at the table when the dev team builds it. The ideal state below is our position for that conversation.*

Without the Content Graph, performance data answers the question: "how is our content doing?" With it, the question becomes: "when we produce a listicle variant from a home-buying canonical targeting Midwest markets on Apple News, how does it perform versus the explainer variant from the same canonical—and does that pattern hold across subject categories?" The difference between those two questions is the difference between aggregate reporting and actionable intelligence. The Content Graph is the data infrastructure that makes variant-level attribution possible.

**The canonical ID as spine:** Every content asset is assigned a canonical ID at brief creation—not at generation, not at publish, but at the moment the brief is specified. This is the critical architectural decision: the canonical ID is the session key that binds all outputs from a single brief across their entire lifecycle. Everything else hangs from it. A canonical ID assigned at publish is already too late; the production history that happened before publish is lost.

**The lineage model:** A single T3 brief might produce: one canonical → 8–10 format variants → each adapted to 45+ markets = 360–450+ primary assets, each potentially producing multiple headline variants per channel. The Content Graph tracks every node and every relationship. For T4, a single brief produces up to five channel-optimized siblings; the graph records which headline went to which channel and how each performed. The relationship types that must be defined: format variant, location version, editorial revision, headline variant, distribution version. These aren't interchangeable; a format variant is a different kind of derivative than a location adaptation.

**What gets versioned:**
- Generation output: the first draft from the brief
- Enriched draft: post-quality modules, pre-editorial
- Editorial revision: the approved version after editorial sign-off
- Published: first published state, with full metadata captured
- Post-publish edits: corrections, updates, and any re-distribution events

**What the Content Graph enables:**
- Variant-level performance attribution: which format, persona, headline, and channel combination produced the best outcome for a given content type; this is what makes T3 derivation planning data-driven rather than intuitive
- Author mana tracking: across all derivatives of a canonical and across the current publishing period, how many times has a given author's name been used; without the graph, it isn't trackable at scale
- Sibling group performance (feeds directly into the Operations Layer): how are the variants from a given cluster performing relative to each other; which won, and on what dimensions

**The asks are specific:**
- Canonical IDs assigned at brief creation, not at publish
- All variants linked to canonical with typed relationship definitions
- Performance attributed per variant, per headline, per channel—not aggregated to the canonical level
- Full versioning schema capturing every state transition from generation through post-publish
- Query API so the Operations Layer can pull Content Graph data without bespoke engineering on each request

**Trigger for prioritization:** Publish-to-Cue and the performance tracking data layer must be live and generating meaningful attribution data before the Content Graph's value justifies the infrastructure investment. The cluster ID at brief creation—already in scope under Signal & Brief Creation—is the prerequisite that must be in place first.

**CPA impact:** Low near-term; High long-term. Variant-level attribution is what makes precision optimization of the T3 derivation pipeline possible at scale, and T3 at scale is one of the highest-volume, lowest-marginal-cost pipelines in the system.

---

### Operations Layer: The Control Room

The Operations Layer is the control room: a unified, real-time dashboard covering the entire pipeline's state, health, and performance. It surfaces both the operational (what needs attention now) and the strategic (are we building the right things and are they working).

Every panel exists to support a specific decision. Near-term decisions use real-time data. Medium-term decisions use weekly patterns. Strategic decisions use monthly trends. The dashboard holds all three simultaneously so operators are never reacting only to what just went out.

Requires the Performance Tracking data layer to be fully instrumented. Panels are described here as an ideal-state spec.

#### Pipeline State View

Every piece of content in the system has a defined machine-readable stage: Brief → Generating → Verifying → Review → Staged → Dispatched → Live. Stage transitions are events in the data layer, not editorial categories. The Pipeline State View surfaces the full queue across all pipelines simultaneously.

**What operators see:**
- Volume in each stage, by pipeline and channel, in real time
- Time-in-stage per piece; alerts for content stuck beyond per-tier thresholds (T3/T4 editorial review has different acceptable latency than T1/T2 automated verification)
- Exception queue status for T1/T2: volume, failure types, time in queue; operators manage stage health, not individual pieces; an unusual exception queue spike signals an upstream problem, not just unlucky individual articles
- Author mana warnings: when a given author's name approaches the overuse threshold across a cluster's derivatives

**Operator actions available:**
Re-route (change pipeline tier), escalate to senior editorial, flag for manual review, approve bypass (with reason logged), re-generate (T3/T4 only).

#### Gate Status

Aggregate enrichment report intelligence. Not "did this piece pass" but "what is failing, on what content types, at what rate, and what does that imply?"

**What operators see:**
- Pass/fail rates by gate type and pipeline, trending over time
- Deterministic vs. probabilistic failure breakdown, never aggregated; they require different responses.
  - Citation failures (deterministic) signal content quality degradation
  - Persistent brand-fit failures (probabilistic) signal threshold miscalibration, not bad content
  - Format compliance failures (hard gate) signal a content or template problem

#### Distribution View

What's gone out, to where, and how it's performing: the retrospective and the active in one view.

**What operators see:**
- Content published and dispatched in the last 24h/7d, by channel and pipeline
- Channel coverage gaps as active alerts—a channel that hasn't received content within expected cadence surfaces immediately, not just as a historical gap
- Near-term performance at 24h/48h/7d by channel and content type; this feeds directly into the Signal Feed
- Sibling group performance: for any cluster, how are the variants performing relative to each other? Which format and channel combination is winning, and by how much? This is the direct input to T3 canonical planning: "every time we produce a listicle variant from a home-buying canonical, it outperforms the explainer on Apple News by 2x" is a T3 investment decision, not just an interesting observation

#### CPA Tracker

Cost Per Asset is what the entire pipeline optimizes for; the CPA Tracker makes that optimization visible and attributable over time.

**What operators see:**
- Current CPA across the pipeline, trending over time; this is the top-of-dashboard number
- CPA broken into labor and compute components.
  - Labor costs: time in brief creation, editorial review, CMS entry (Publish-to-Cue is the single biggest lever on this line item; when it ships, the CMS entry labor component drops to near zero for T3/T4).
  - Compute costs: generation, enrichment modules, storage, distribution. Both tracked so the crossover point is visible as T1/T2 volume scales.
- CPA by pipeline:
  - T1's efficiency should improve as volume increases.
  - T3's CPA should decrease as the canonical-to-derivative pipeline matures (higher investment at canonical creation, lower cost per derivative).
  - T4's CPA is relatively fixed by editorial intensity; the lever is throughput, not automation.
- CPA by format, subject category, and persona: where is the system most and least efficient, and why?
- The labor cost waterfall: as each pipeline capability comes online, the labor component of CPA should produce a visible step-down. Article format templates, author profiles, Publish-to-Cue, keyword field—each is a measurable reduction. The tracker makes the before/after legible and justifies continued investment.

#### Topic Coverage Map

Coverage of subject areas relative to what signal demand actually looks like—not a static content inventory, but a live alignment check.

**What operators see:**
- Which subject areas have recent content at which pipeline tiers; which are undercovered
- Coverage vs. signal alignment: the system is producing X% of content in a given topic area, but Y% of signal demand is there; misalignment in either direction (over-covered and underperforming, or signal demand outpacing coverage) surfaces as a flag
- Performance density by subject area: some areas may be well-covered but producing poor engagement—that's a quality, persona, or format mismatch signal, not a coverage gap; these require different responses
- Recommended brief inputs derived from coverage gaps, fed to the Signal Feed

#### Author Profile Performance

How author profiles are performing across tiers and channels. Applies to T2, T3, and T4.

**What operators see:**
- Engagement outcomes by author profile, segmented by pipeline, format, channel, and subject category: which profiles are working for which combinations
- Author mana status: usage tracking across the current period, both within a given cluster's derivatives and across canonicals; it's the operational input to author attribution decisions at brief creation; operators should never be guessing how much mana remains
- Profile refinement signals: profiles that consistently underperform against similar content from other profiles are flagged as candidates for voice model refinement
- For T3 at scale: which author attribution strategy (named author vs. alternate attribution vs. no byline) is producing the best outcomes per channel and content type

#### Strategic Pipeline Elements

The accountability view. This is how the content team holds the dev team to the six-month pipeline vision. Strategic features are tracked here, separately from bugs and routine backlog items; bugs don't consume strategic roadmap bandwidth.

**What operators see:**
- Current status of each foundational pipeline element—article format templates, author profiles (T2/T3/T4), Publish-to-Cue, keyword input field, headline variant generation, performance tracking integration, Kirwan tool nodes, Inclination Engine, Content Graph—against the ideal end state defined in this document.
- CPA impact tier for each element (High/Medium/Low, derived from the System Requirements section): this is the prioritization vocabulary for conversations with the dev team
- Which pipelines are blocked or degraded without each element—makes the dependency cost of delay legible
- Completion trend: are strategic elements moving, stalling, or regressing?

#### Signal Feed

The live intelligence stream. The Signal Feed is what makes the Operations Layer more than a reporting tool; it's where past performance becomes forward action.

**What operators see:**
- Near-term signals: what's performing right now, by channel and format; feeds T4 brief creation directly
- Medium-term signals: what is building audience and engagement over the past 2–4 weeks; informs T3 canonical planning and persona prioritization for the next cycle
- Long-term signals: which subject categories, formats, and persona combinations consistently produce the best outcomes over 60–90 days; these are the structural patterns that should shape pipeline investment decisions, not reactive adjustments to last week's numbers
- Pipeline health alerts: CPA spike, gate failure rate above threshold, topic undercoverage, author mana approaching limit, channel coverage gap; each alert surfaces with the specific data behind it, not just a flag
- Recommended brief inputs: the system synthesizes signal data into concrete starting points for T3/T4 editors; not raw data to interpret, but draft brief parameters derived from what's working across all three time horizons

---

## Open Questions

Decisions regarding the following open issues will most significantly shape implementation.

1. **CPA formula.** Agreed definition of Cost Per Asset—what counts as cost? Labor time only, or also compute and storage? What is the revenue or engagement proxy when direct attribution isn't available? (Chris confirmed CPA measurement has started; the formula needs to be codified.)
2. **Content Graph timing.** What milestone triggers this becoming a priority?
3. **Two-tier brand guidelines.** How does national vs. per-publication application work for multi-site syndication? What is the conflict resolution mechanism?
4. **Editorial interface design.** Is element-by-element sign-off a product team deliverable or an editorial workflow design? Who owns the spec, and who builds it?
5. **Control room ownership.** Is the Operations Layer a net-new tool or an extension of the CSA interface? Who on the dev team owns it?
6. **Auto-greenlight thresholds.** What criteria—enrichment gate scores, signal confidence level, format compliance—qualify a T3 piece for confirm-only status? Who sets and adjusts these thresholds?
7. **T1 scope.** What exactly is the United Robots-replacement automated stream? What content types, channels, and volume? What does "fully automated" mean within McClatchy's editorial standards?
8. **T3 author attribution at scale.** How is author mana managed when one canonical generates 45+ derivatives? What are the rules for author attribution on downstream assets?
9. **Inclination Engine architecture.** What is the first implementation of the Inclination Engine? Which signals does it monitor in the initial build, and what is the acceptance criteria for a brief it generates to be considered production-ready?
10. **New pipeline scoping.** When do the Infographics Pipeline and Licensed Partner Content Pipeline move from "under investigation" to active spec? Who owns the value framework definition for each?
