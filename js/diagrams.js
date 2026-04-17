// diagrams.js — SVG flow diagram builder for current + ideal pipeline views
// Visual language: matches csa-dashboard (860px wide, step labels, inline annotations)

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const ARROW_DEFS = `
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="arr-red" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(248,113,113,0.7)"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(52,211,153,0.7)"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="arr-teal" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(45,212,191,0.7)"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>`;

// ── Node builder ──────────────────────────────────────────────────────────────
function nd(x, y, w, h, opts = {}) {
  const {
    fill      = 'rgba(96,165,250,0.08)',
    stroke    = 'rgba(96,165,250,0.3)',
    dashed    = false,
    title     = '',
    sub       = '',
    sub2      = '',
    sub3      = '',
    tag       = '',
    tagColor  = 'rgba(167,139,250,0.8)',
    tagBg     = 'rgba(167,139,250,0.12)',
    titleColor = '#f0f0f5',
    warnLine  = '',
    warnLine2 = '',
    notes     = [],   // [{text, color?}]
    notBuilt  = false,
    id        = '',
    rx        = 12,
  } = opts;

  const cx   = x + w / 2;
  const dash = dashed ? ' stroke-dasharray="5 3"' : '';
  const idAttr = id ? ` data-id="${id}"` : '';
  let lines = [];
  let yOff  = y + 28;

  if (notBuilt) {
    const bw = 66;
    lines.push(`<rect x="${x + 7}" y="${y + 7}" width="${bw}" height="17" rx="8"
      fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.35)" stroke-width="0.8"/>`);
    lines.push(`<text x="${x + 7 + bw / 2}" y="${y + 18.5}" text-anchor="middle"
      font-size="8.5" font-weight="700" fill="rgba(251,191,36,0.85)" font-family="${FONT}">NOT BUILT</text>`);
    yOff += 6;
  }

  if (tag) {
    const tagW = tag.length * 6.2 + 16;
    const tx = x + w - tagW - 6;
    const ty = y + 7;
    lines.push(`<rect x="${tx}" y="${ty}" width="${tagW}" height="18" rx="9"
      fill="${tagBg}" stroke="${tagColor}" stroke-width="0.8"/>`);
    lines.push(`<text x="${tx + tagW / 2}" y="${ty + 12.5}" text-anchor="middle"
      font-size="9.5" font-weight="700" fill="${tagColor}" font-family="${FONT}">${tag}</text>`);
  }

  lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
    font-size="13" font-weight="700" fill="${titleColor}" font-family="${FONT}">${title}</text>`);

  if (sub) {
    yOff += 17;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="11" fill="rgba(148,152,176,0.8)" font-family="${FONT}">${sub}</text>`);
  }
  if (sub2) {
    yOff += 14;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="10.5" fill="rgba(148,152,176,0.7)" font-family="${FONT}">${sub2}</text>`);
  }
  if (sub3) {
    yOff += 13;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="10" fill="rgba(148,152,176,0.6)" font-family="${FONT}">${sub3}</text>`);
  }
  for (const n of notes) {
    yOff += 13;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="10" fill="${n.color || 'rgba(148,152,176,0.55)'}" font-family="${FONT}">${n.text}</text>`);
  }
  if (warnLine) {
    yOff += 14;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="10" fill="rgba(248,113,113,0.85)" font-family="${FONT}">${warnLine}</text>`);
  }
  if (warnLine2) {
    yOff += 13;
    lines.push(`<text x="${cx}" y="${yOff}" text-anchor="middle"
      font-size="10" fill="rgba(248,113,113,0.75)" font-family="${FONT}">${warnLine2}</text>`);
  }

  return `
  <g class="nd"${idAttr}>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"
      fill="${fill}" stroke="${stroke}" stroke-width="1"${dash}/>
    ${lines.join('\n    ')}
  </g>`;
}

// ── Line helpers ──────────────────────────────────────────────────────────────
function arr(x1, y1, x2, y2, color = 'rgba(148,152,176,0.4)', dashed = false, marker = '#arr') {
  const dash = dashed ? ' stroke-dasharray="5 3"' : '';
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
    stroke="${color}" stroke-width="1.5"${dash} marker-end="url(${marker})"/>`;
}

function pth(d, color = 'rgba(148,152,176,0.4)', dashed = false, marker = '#arr') {
  const dash = dashed ? ' stroke-dasharray="5 3"' : '';
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"${dash} marker-end="url(${marker})"/>`;
}

// ── Region box ────────────────────────────────────────────────────────────────
function region(x, y, w, h, fill, stroke, label = '', labelColor = '#9498b0', rx = 16) {
  let lbl = '';
  if (label) {
    const lw = label.length * 7.0 + 20;
    lbl = `
  <rect x="${x + 12}" y="${y - 11}" width="${lw}" height="22" rx="11"
    fill="#1a1d27" stroke="${stroke}" stroke-width="1"/>
  <text x="${x + 12 + lw / 2}" y="${y + 4}" text-anchor="middle"
    font-size="11" font-weight="700" fill="${labelColor}" font-family="${FONT}"
    letter-spacing="0.06em">${label}</text>`;
  }
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"
    fill="${fill}" stroke="${stroke}" stroke-width="1" stroke-dasharray="6 4"/>${lbl}`;
}

// ── Step-section label (csa-dashboard style) ──────────────────────────────────
function sLabel(x, y, text, color = 'rgba(52,211,153,0.65)') {
  return `<text x="${x}" y="${y}" font-size="11" font-weight="700" fill="${color}"
    font-family="${FONT}" letter-spacing="0.05em">${text}</text>`;
}

// ── Inline annotation line (↳ style) ─────────────────────────────────────────
function iNote(x, y, text, color = 'rgba(148,152,176,0.55)') {
  return `<text x="${x}" y="${y}" font-size="10" fill="${color}" font-family="${FONT}">${text}</text>`;
}

// ── Lane divider (ideal view) ─────────────────────────────────────────────────
function laneDivider(x, y1, y2) {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"
    stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="4 4"/>`;
}

// ── Row label (ideal view) ─────────────────────────────────────────────────────
function rowLabel(x, y, text) {
  return `<text x="${x}" y="${y}" font-size="9.5" font-weight="700"
    fill="rgba(255,255,255,0.18)" font-family="${FONT}" letter-spacing="0.07em">${text}</text>`;
}


// =============================================================================
// CURRENT STATE DIAGRAM — all 9 steps + NOT BUILT layer
// viewBox: 0 0 860 1920
// Column layout matches csa-dashboard: center=430, main nodes 364px wide
// =============================================================================

export function buildCurrentSVG() {
  const CX  = 430;   // center x
  const MX  = 248;   // main-node left edge
  const MW  = 364;   // main-node width
  const SLX = 48;    // side-left left
  const SLW = 188;   // side-left width  (ends 236, gap 12 to MX)
  const SRX = 624;   // side-right left  (MX+MW+12)
  const SRW = 188;   // side-right width (ends 812)

  // color shortcuts
  const BL = 'rgba(96,165,250,';
  const TE = 'rgba(45,212,191,';
  const PU = 'rgba(167,139,250,';
  const GR = 'rgba(107,114,128,';
  const RE = 'rgba(248,113,113,';
  const AM = 'rgba(251,191,36,';

  return `<svg viewBox="0 0 860 1940" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:auto;display:block;">
  ${ARROW_DEFS}

  <!-- ════════════════════════════════════════════════════════════════════
       REGION: INTAKE & ANALYSIS
       ════════════════════════════════════════════════════════════════════ -->
  ${region(28, 18, 804, 376,
    'rgba(96,165,250,0.025)', 'rgba(96,165,250,0.2)', 'INTAKE &amp; ANALYSIS', '#60a5fa')}

  ${sLabel(48, 56, 'STEP 1 — REQUEST INTAKE', 'rgba(96,165,250,0.65)')}

  <!-- Node 1: Request Input -->
  ${nd(MX, 66, MW, 100, {
    fill: `${BL}0.09)`, stroke: `${BL}0.35)`,
    tag: 'No Claude', tagColor: '#9ca3af', tagBg: `${GR}0.14)`,
    title: 'Request Input', titleColor: '#93c5fd',
    sub:   'FastAPI  POST /generate',
    sub2:  'content · platforms[] · keywords[] · persona_config · output_mode',
    sub3:  'editorial_instructions (optional)  ·  url_input (optional)',
    warnLine: '⚠ no required brief schema — any field combination accepted as valid',
  })}

  <!-- Node 1b: URL Content Scraper (conditional, side-right) -->
  ${nd(SRX, 66, SRW, 100, {
    fill: `${GR}0.06)`, stroke: `${GR}0.22)`, dashed: true,
    tag: 'No Claude', tagColor: '#9ca3af', tagBg: `${GR}0.12)`,
    title: 'URL Content Scraper', titleColor: '#9ca3af',
    sub:   'only if url_input provided',
    sub2:  'McClatchy Feeds API → trafilatura',
    sub3:  'newspaper3k fallback → raw_text + metadata',
  })}
  ${arr(MX + MW, 100, SRX, 100, `${GR}0.3)`, true)}
  ${iNote(SRX, 176, '↳ no dedup check vs prior pulls', 'rgba(248,113,113,0.5)')}
  <!-- URL scraper merges into Input Analysis -->
  ${pth(`M${SRX + SRW / 2},166 L${SRX + SRW / 2},204 L${CX},204 L${CX},224`, `${GR}0.3)`)}

  ${sLabel(48, 192, 'STEP 2 — INPUT ANALYSIS', 'rgba(45,212,191,0.65)')}
  ${arr(CX, 166, CX, 224, `${BL}0.5)`)}

  <!-- Node 2: Input Analysis -->
  ${nd(MX, 224, MW, 110, {
    fill: `${TE}0.08)`, stroke: `${TE}0.28)`,
    tag: 'Claude Haiku', tagColor: 'rgba(45,212,191,0.9)', tagBg: `${TE}0.12)`,
    title: 'Input Analysis', titleColor: '#5eead4',
    sub:   'classifies content type and estimates completeness',
    sub2:  'output_mode: outline / notes / research_draft / complete / insufficient',
    sub3:  'fallback heuristics if Claude call fails:',
    notes: [{ text: '&lt;100w = insufficient  ·  &lt;300w = outline  ·  &lt;800w = notes  ·  &gt;800w = complete' }],
    warnLine: '⚠ classification is advisory — no downstream contract or schema enforcement',
  })}
  ${iNote(48, 346, '↳ ~200 input tokens · fast · runs on every request regardless of input length', 'rgba(148,152,176,0.45)')}


  <!-- ════════════════════════════════════════════════════════════════════
       REGION: GENERATION PIPELINE
       ════════════════════════════════════════════════════════════════════ -->
  ${region(28, 368, 804, 860,
    'rgba(167,139,250,0.025)', 'rgba(167,139,250,0.2)', 'GENERATION PIPELINE', '#a78bfa')}

  ${arr(CX, 334, CX, 404, `${PU}0.5)`)}
  ${sLabel(48, 392, 'STEP 3 — PERSONA DETERMINATION', 'rgba(167,139,250,0.65)')}

  <!-- Node 3: Persona Analysis -->
  ${nd(MX, 404, MW, 118, {
    fill: `${PU}0.09)`, stroke: `${PU}0.3)`,
    tag: 'Claude Opus', tagColor: 'rgba(167,139,250,0.9)', tagBg: `${PU}0.14)`,
    title: 'Persona Analysis', titleColor: '#c4b5fd',
    sub:   'audience_persona_analysis.yaml  (v1.4.0)',
    sub2:  'input: classified content + content_type + target_audience config',
    sub3:  'output: up to 3 PERSONA objects — {name, description, style, tone, format_preference}',
    notes: [{ text: 'parsed by splitting Claude response on "PERSONA N:" prefix — brittle if format varies' }],
    warnLine: '⚠ keywords[] NOT present in this call — first appear in Platform Formatting (Step 7)',
  })}
  ${iNote(48, 534, '↳ if only 1–2 personas returned: downstream variant count reduces accordingly', 'rgba(148,152,176,0.45)')}

  <!-- Fan-out: Persona Analysis → 3 parallel Persona Variant generation calls -->
  ${sLabel(48, 558, 'STEP 4 — CONTENT GENERATION  (up to 3 parallel Claude Opus calls)', 'rgba(167,139,250,0.65)')}
  <!-- branch point y=536+16=552, variant nodes top y=570 -->
  ${pth(`M${CX},522 L${CX},552 L153,552 L153,570`, `${PU}0.4)`)}
  ${arr(CX, 522, CX, 570, `${PU}0.4)`)}
  ${pth(`M${CX},522 L${CX},552 L707,552 L707,570`, `${PU}0.4)`)}

  <!-- Nodes 4a/4b/4c: Persona Variant Generation (side-by-side) -->
  ${nd(30, 570, 246, 118, {
    fill: `${PU}0.09)`, stroke: `${PU}0.28)`,
    tag: 'Opus', tagColor: 'rgba(167,139,250,0.85)', tagBg: `${PU}0.12)`,
    title: 'Persona Variant 1', titleColor: '#c4b5fd',
    sub:   'persona_optimized_variant.yaml  v1.4.0',
    sub2:  'input: persona_1 obj + original content',
    sub3:  'output: {content, headline*, word_count}',
    warnLine: '* headline extracted from body — not generated',
  })}
  ${nd(307, 570, 246, 118, {
    fill: `${PU}0.09)`, stroke: `${PU}0.28)`,
    tag: 'Opus', tagColor: 'rgba(167,139,250,0.85)', tagBg: `${PU}0.12)`,
    title: 'Persona Variant 2', titleColor: '#c4b5fd',
    sub:   'persona_optimized_variant.yaml  v1.4.0',
    sub2:  'input: persona_2 obj + original content',
    sub3:  'keywords[] field NOT in this prompt template',
    warnLine: '⚠ style_instructions: optional Jinja2 block — silently skipped if absent',
  })}
  ${nd(584, 570, 246, 118, {
    fill: `${PU}0.09)`, stroke: `${PU}0.28)`,
    tag: 'Opus', tagColor: 'rgba(167,139,250,0.85)', tagBg: `${PU}0.12)`,
    title: 'Persona Variant 3', titleColor: '#c4b5fd',
    sub:   'persona_optimized_variant.yaml  v1.4.0',
    sub2:  'input: persona_3 obj + original content',
    sub3:  'PGS-98: {% if style_instructions %} block',
    warnLine: '⚠ 8 compliance dims in 1 call ≈ 43% full-compliance rate',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       CASCADE COUPLING BAND
       ════════════════════════════════════════════════════════════════════ -->
  <!-- Convergence arrows into coupling band -->
  ${pth('M153,688 L153,710', `${RE}0.4)`)}
  ${arr(CX, 688, CX, 710, `${RE}0.4)`)}
  ${pth('M707,688 L707,710', `${RE}0.4)`)}

  <rect x="28" y="710" width="804" height="80" rx="8"
    fill="rgba(248,113,113,0.07)" stroke="rgba(248,113,113,0.35)" stroke-width="1.2"/>
  <text x="${CX}" y="733" text-anchor="middle" font-size="12" font-weight="700"
    fill="#f87171" font-family="${FONT}" letter-spacing="0.04em">⚠  CASCADE COUPLING POINT — structural failure mode</text>
  <text x="${CX}" y="752" text-anchor="middle" font-size="10.5" fill="rgba(252,165,165,0.75)"
    font-family="${FONT}">All 3 persona variant outputs are the raw input string to all 26 platform formatters.</text>
  <text x="${CX}" y="768" text-anchor="middle" font-size="10" fill="rgba(252,165,165,0.65)"
    font-family="${FONT}">Change any persona prompt → every downstream formatter affected → triage cascade across all 26 paths → each new feature ships fast but generates its own mountain of follow-on tickets.</text>
  <text x="${CX}" y="783" text-anchor="middle" font-size="10" fill="rgba(252,165,165,0.55)"
    font-family="${FONT}">No interface contract between stages. No schema. No isolation. Upstream change = downstream breakage at scale.</text>

  ${arr(CX, 790, CX, 820, `${RE}0.4)`)}

  ${sLabel(48, 808, 'STEP 5 — STYLE GUIDE LOADING (Claude Haiku · 1-hr LRU cache per Cloud Run instance)', 'rgba(45,212,191,0.6)')}

  <!-- Node 5: Style Guide Loader (side-left — sub-step feeding Platform Formatting) -->
  ${nd(SLX, 820, SLW, 118, {
    fill: `${TE}0.07)`, stroke: `${TE}0.22)`,
    tag: 'Claude Haiku', tagColor: 'rgba(45,212,191,0.85)', tagBg: `${TE}0.1)`,
    title: 'Style Guide Loader', titleColor: '#5eead4',
    sub:   '1 Haiku call per platform per cache miss',
    sub2:  '1-hr LRU cache per Cloud Run instance',
    sub3:  '5 platforms × cold start = 5 Haiku calls',
    notes: [{ text: 'style string passed as context to Opus formatter' },
            { text: 'no validation that style loaded correctly' }],
  })}
  <!-- connector: style guide feeds INTO platform formatting -->
  ${arr(SLX + SLW, 879, MX, 879, `${TE}0.3)`)}

  ${sLabel(48, 954, 'STEP 6 — PLATFORM FORMATTING  (1 Claude Opus call per platform)', 'rgba(167,139,250,0.65)')}

  <!-- Node 6: Platform Formatting × 26 -->
  ${nd(MX, 820, MW, 118, {
    fill: `${PU}0.09)`, stroke: `${PU}0.3)`,
    tag: 'Claude Opus × 26', tagColor: 'rgba(167,139,250,0.9)', tagBg: `${PU}0.15)`,
    title: 'Platform Formatting × 26', titleColor: '#c4b5fd',
    sub:   'one Opus call per platform — receives all persona variant outputs as raw input',
    sub2:  'editorial: mcclatchy_editorial · ksl · idahostatesmen · mercedsunstar · bellinghamherald…',
    sub3:  'syndication: smartnews · apple_news · newsbreak · yahoo_news · msn · taboola…',
    notes: [{ text: 'marketing: facebook_post · email_newsletter · push_notification · twitter_thread…' }],
    warnLine:  '⚠ PGS-104: keyword enforcement is natural language only — "place [keyword] in H1"',
    warnLine2: '⚠ no post-generation check: keyword placement, word count, format compliance unverified',
  })}
  ${iNote(48, 950, '↳ PGS-98: editorial_instructions reach formatter only if {% if style_instructions %} block present AND field non-empty', 'rgba(248,113,113,0.55)')}
  ${iNote(48, 964, '↳ 8 compliance dimensions × P(0.9 each) = ~43% full-compliance rate per response', 'rgba(248,113,113,0.5)')}
  ${iNote(48, 978, '↳ errors surface during editor review — not caught in pipeline', 'rgba(248,113,113,0.45)')}

  ${arr(CX, 938, CX, 1004, `${GR}0.45)`)}
  ${sLabel(48, 992, 'STEP 7 — DIFFERENTIATION CHECK  (No Claude · cosine similarity)', 'rgba(107,114,128,0.6)')}

  <!-- Node 7: Differentiation Check -->
  ${nd(MX, 1004, MW, 104, {
    fill: `${GR}0.07)`, stroke: `${GR}0.22)`,
    tag: 'No Claude', tagColor: '#9ca3af', tagBg: `${GR}0.14)`,
    title: 'Differentiation Check', titleColor: '#9ca3af',
    sub:   'cosine similarity against previously generated content (numpy)',
    sub2:  'PGS-82: similarity score surfaced to editor as a visible warning flag',
    sub3:  'PRD specification: this should be an INTERNAL hard gate → auto re-gen on fail',
    warnLine: '⚠ current: user-visible warning; editor decides — not a pipeline gate',
  })}
  ${iNote(48, 1118, '↳ no per-platform similarity tracking — same check regardless of destination channel', 'rgba(148,152,176,0.45)')}

  <!-- ════════════════════════════════════════════════════════════════════
       OUTSIDE GENERATION REGION: RESPONSE ASSEMBLY
       ════════════════════════════════════════════════════════════════════ -->
  ${arr(CX, 1108, CX, 1158, `${BL}0.4)`)}
  ${sLabel(48, 1146, 'STEP 8 — RESPONSE ASSEMBLY &amp; RETURN', 'rgba(96,165,250,0.65)')}

  <!-- Node 8: Response Assembly -->
  ${nd(MX, 1158, MW, 96, {
    fill: `${BL}0.07)`, stroke: `${BL}0.25)`,
    tag: 'No Claude', tagColor: '#9ca3af', tagBg: `${GR}0.14)`,
    title: 'Response Assembly', titleColor: '#93c5fd',
    sub:   'collects all platform outputs → structured response JSON',
    sub2:  'returns to API caller — editor manually pastes content into Cue / WP',
    warnLine: '✗ no CMS push  ·  ✗ no canonical ID  ·  ✗ no channel adapter  ·  ✗ no publish-to-Cue',
  })}
  ${iNote(48, 1264, '↳ no lineage tracking — no way to know which generated pieces were published or how they performed', 'rgba(248,113,113,0.5)')}
  ${iNote(48, 1278, '↳ editor receives a wall of text variants — no structured review package, no enrichment report', 'rgba(248,113,113,0.45)')}


  <!-- ════════════════════════════════════════════════════════════════════
       NOT BUILT — present in PRD Ideal, absent in current implementation
       ════════════════════════════════════════════════════════════════════ -->
  ${region(28, 1310, 804, 600,
    'rgba(251,191,36,0.025)', 'rgba(251,191,36,0.15)',
    'NOT BUILT — required by PRD Ideal', '#fbbf24')}

  ${sLabel(48, 1348, 'CAPABILITIES ABSENT FROM CURRENT IMPLEMENTATION', 'rgba(251,191,36,0.55)')}

  ${[
    [38,  1358, 184, 72, '✗ Brief / Inclination Engine',  'signal-driven topic selection',       'no data-informed initiation today'],
    [234, 1358, 184, 72, '✗ Author Profiles',             'per-author voice training data',      'voice applied at generation time'],
    [430, 1358, 184, 72, '✗ Dedicated Headline Gen',      'separate parallel Opus call',          'signal-optimal variants, not body extract'],
    [626, 1358, 184, 72, '✗ Publish-to-Cue / CMS Push',  'auto CMS population on approval',     'metadata pre-filled — no manual entry'],
    [38,  1442, 184, 72, '✗ Post-Gen Validation',         'keyword placement verified post-gen', 'word count + format checked'],
    [234, 1442, 184, 72, '✗ Citation Check',              'deterministic hard gate',              'flagged items → human verify queue'],
    [430, 1442, 184, 72, '✗ Plagiarism / Sim Gate',       'hard gate: near-verbatim = fail',     'auto re-gen — not user flag (PGS-82)'],
    [626, 1442, 184, 72, '✗ Brand-Fit Audit',             'AI judgment — probabilistic',          'human override for T3/T4'],
    [38,  1526, 184, 72, '✗ Canonical ID + Content Graph','lineage: brief → all variants',       'derivatives linked + attributed'],
    [234, 1526, 184, 72, '✗ Direct Channel Dispatch',     'T2: CSA → SmartNews direct',          'no CMS step — defining T2 advantage'],
    [430, 1526, 184, 72, '✗ Performance Feedback Loop',   'closed loop: data → signal layer',    'top patterns inform next gen cycle'],
    [626, 1526, 184, 72, '✗ Operations Layer',            'pipeline state · gate status',         'distribution view · coverage map'],
    [38,  1610, 184, 72, '✗ Format Compliance Gate',      'hard gate vs article template',        'not guidance — structural enforcement'],
    [234, 1610, 184, 72, '✗ Internal Link Suggestions',   'vector-indexed McClatchy library',     'surfaced in structured review package'],
    [430, 1610, 184, 72, '✗ Gary Kirwan Tool Nodes',      'claims validation · brand-fit',        'cross-pipeline layer — not integrated'],
    [626, 1610, 184, 72, '✗ SEO / Meta Optimization',     'title tag + meta per channel',         'keyword density verified post-gen'],
  ].map(([x, y, w, h, title, sub, sub2]) => nd(x, y, w, h, {
    fill: 'rgba(251,191,36,0.05)', stroke: 'rgba(251,191,36,0.18)', rx: 8,
    title, titleColor: '#fbbf24', sub, sub2,
  })).join('\n')}

</svg>`;
}


// =============================================================================
// PRD IDEAL DIAGRAM — 5-lane swimlane matrix
// viewBox: 0 0 1420 1500
// =============================================================================

export function buildIdealSVG() {

  // Lane configurations
  const L = [
    {
      lx: 28,   w: 250, cx: 153,
      color: 'rgba(107,114,128,', tc: '#9ca3af',
      tier: 'T1 — Fully Automated',
      type: 'Commodity: scores, weather,',
      char: 'templated reports — no humans',
    },
    {
      lx: 306,  w: 250, cx: 431,
      color: 'rgba(45,212,191,',  tc: '#5eead4',
      tier: 'T2 — App/Platform Direct',
      type: 'Channel-native: SmartNews,',
      char: 'Newsbreak — bypasses CMS entirely',
    },
    {
      lx: 584,  w: 250, cx: 709,
      color: 'rgba(167,139,250,', tc: '#c4b5fd',
      tier: 'T3 — API / Canonical',
      type: 'Long-form: 1 canonical article',
      char: '→ 45+ market/format derivatives',
    },
    {
      lx: 862,  w: 250, cx: 987,
      color: 'rgba(96,165,250,',  tc: '#93c5fd',
      tier: 'T4 — National Flagship',
      type: 'High-touch editorial:',
      char: 'multi-byline, national coverage',
    },
    {
      lx: 1140, w: 250, cx: 1265,
      color: 'rgba(251,191,36,',  tc: '#fcd34d',
      tier: 'T5 — Freshness &amp; Updates',
      type: 'Existing published content:',
      char: 'fact updates, link health, staleness',
    },
  ];

  // FULL_X=28, last lane ends at 1140+250=1390
  const FX  = 28;
  const FW  = 1362;   // 1390-28
  const FCX = 28 + 1362 / 2;   // 709

  // Inclination Engine spans T1-T4 (x=28 to x=862+250=1112, w=1084)
  const IX  = 28;
  const IW  = 1084;
  const ICX = 28 + 1084 / 2;   // 570

  // Row Y positions — 18px gap between row-bottom and next row-top
  const Y_SIG   = 150;  // h=100  bot=250
  const Y_INCL  = 268;  // h=100  bot=368
  const Y_BRIEF = 386;  // h=122  bot=508
  const Y_GEN   = 526;  // h=132  bot=658
  const Y_GATES = 676;  // h=294  bot=970
  const Y_ROUTE = 988;  // h=112  bot=1100
  const Y_DISP  = 1118; // h=112  bot=1230
  const Y_CGPH  = 1248; // h=66   bot=1314
  const Y_PERF  = 1332; // h=112  bot=1444

  // Quality gate sub-node columns and rows
  const GW  = 320;
  const GXS = [38, 370, 702, 1034];
  const GY1 = Y_GATES + 30;     // 706
  const GY2 = Y_GATES + 126;    // 802   (706+80+14→... 706+80=786, +16=802 ✓)

  function lArr(i, y1, y2) {
    return arr(L[i].cx, y1, L[i].cx, y2, `${L[i].color}0.45)`);
  }

  function lNd(i, y, h, opts = {}) {
    return nd(L[i].lx, y, L[i].w, h, {
      fill:       `${L[i].color}0.08)`,
      stroke:     `${L[i].color}0.28)`,
      titleColor: L[i].tc,
      ...opts,
    });
  }

  return `<svg viewBox="0 0 1420 1500" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:auto;display:block;">
  ${ARROW_DEFS}

  <!-- ── LANE DIVIDERS ────────────────────────────────────────────────── -->
  ${[292, 570, 848, 1126].map(x => laneDivider(x, 128, 1460)).join('\n  ')}

  <!-- ── LANE HEADERS ─────────────────────────────────────────────────── -->
  ${L.map(l => `
  <text x="${l.cx}" y="48" text-anchor="middle" font-size="12" font-weight="700"
    fill="${l.tc}" font-family="${FONT}" letter-spacing="0.04em">${l.tier}</text>
  <text x="${l.cx}" y="66" text-anchor="middle" font-size="10.5"
    fill="rgba(148,152,176,0.75)" font-family="${FONT}">${l.type}</text>
  <text x="${l.cx}" y="82" text-anchor="middle" font-size="10"
    fill="rgba(148,152,176,0.55)" font-family="${FONT}">${l.char}</text>`).join('\n')}

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 1: SIGNAL LAYER — shared across all tiers (NOT BUILT)
       ════════════════════════════════════════════════════════════════════ -->
  ${rowLabel(FX, Y_SIG - 10, 'SHARED SIGNAL INTELLIGENCE — ALL TIERS')}
  <rect x="${FX}" y="${Y_SIG}" width="${FW}" height="100" rx="14"
    fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.3)" stroke-width="1.2"/>
  <!-- NOT BUILT badge -->
  <rect x="${FX + 7}" y="${Y_SIG + 7}" width="66" height="17" rx="8"
    fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.35)" stroke-width="0.8"/>
  <text x="${FX + 40}" y="${Y_SIG + 18.5}" text-anchor="middle"
    font-size="8.5" font-weight="700" fill="rgba(251,191,36,0.85)" font-family="${FONT}">NOT BUILT</text>
  <!-- Label -->
  <rect x="${FX + 82}" y="${Y_SIG - 11}" width="178" height="22" rx="11"
    fill="#1a1d27" stroke="rgba(52,211,153,0.35)" stroke-width="1"/>
  <text x="${FX + 171}" y="${Y_SIG + 4}" text-anchor="middle"
    font-size="11" font-weight="700" fill="#34d399" font-family="${FONT}"
    letter-spacing="0.05em">SIGNAL LAYER</text>
  <text x="${FCX}" y="${Y_SIG + 28}" text-anchor="middle"
    font-size="13" font-weight="700" fill="#34d399" font-family="${FONT}">Multi-Horizon Performance Intelligence</text>
  <text x="${FCX}" y="${Y_SIG + 46}" text-anchor="middle"
    font-size="11" fill="rgba(52,211,153,0.7)" font-family="${FONT}">Near-term: trending now  ·  Medium-term: 2–4 week building patterns  ·  Long-term: 60–90 day performance baselines</text>
  <text x="${FCX}" y="${Y_SIG + 63}" text-anchor="middle"
    font-size="10.5" fill="rgba(52,211,153,0.6)" font-family="${FONT}">Sources: Amplitude · Gary API · Tarrow syndication data (AN/MSN/Yahoo/SN) · Snowflake  —  segmented: app-based captured (LTV=0) vs. web competitive (never commingled)</text>
  <text x="${FCX}" y="${Y_SIG + 79}" text-anchor="middle"
    font-size="10" fill="rgba(52,211,153,0.5)" font-family="${FONT}">Top-performing headline patterns, topics, and formats feed back automatically from Performance Tracking → inform next generation cycle</text>

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 2: INCLINATION ENGINE (T1–T4) + T5 UPDATE TRIGGERS
       ════════════════════════════════════════════════════════════════════ -->
  ${arr(ICX, Y_SIG + 100, ICX, Y_INCL, 'rgba(52,211,153,0.4)')}
  ${lArr(4, Y_SIG + 100, Y_INCL)}

  ${rowLabel(FX, Y_INCL - 10, 'INITIATION')}

  <!-- Inclination Engine spans T1-T4 -->
  <rect x="${IX}" y="${Y_INCL}" width="${IW}" height="100" rx="12"
    fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.25)" stroke-width="1"/>
  <rect x="${IX + 7}" y="${Y_INCL + 7}" width="66" height="17" rx="8"
    fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.35)" stroke-width="0.8"/>
  <text x="${IX + 40}" y="${Y_INCL + 18.5}" text-anchor="middle"
    font-size="8.5" font-weight="700" fill="rgba(251,191,36,0.85)" font-family="${FONT}">NOT BUILT</text>
  <rect x="${IX + 82}" y="${Y_INCL - 11}" width="188" height="22" rx="11"
    fill="#1a1d27" stroke="rgba(52,211,153,0.3)" stroke-width="1"/>
  <text x="${IX + 176}" y="${Y_INCL + 4}" text-anchor="middle"
    font-size="11" font-weight="700" fill="#34d399" font-family="${FONT}"
    letter-spacing="0.04em">INCLINATION ENGINE</text>
  <text x="${ICX}" y="${Y_INCL + 30}" text-anchor="middle"
    font-size="12" font-weight="700" fill="#34d399" font-family="${FONT}">Translates signal data into fully-specified briefs</text>
  <text x="${ICX}" y="${Y_INCL + 48}" text-anchor="middle"
    font-size="11" fill="rgba(52,211,153,0.65)" font-family="${FONT}">T1/T2: auto-generates briefs without human initiation — signal data decides topic, format, keyword cluster, target audience</text>
  <text x="${ICX}" y="${Y_INCL + 64}" text-anchor="middle"
    font-size="10.5" fill="rgba(52,211,153,0.5)" font-family="${FONT}">T3/T4: surfaces suggested parameters for editor validation before generation starts  ·  cluster ID assigned at brief creation</text>
  <text x="${ICX}" y="${Y_INCL + 80}" text-anchor="middle"
    font-size="10" fill="rgba(52,211,153,0.45)" font-family="${FONT}">All derivatives traceable to the originating brief  ·  no ad-hoc requests mid-pipeline</text>

  <!-- T5: Update Triggers -->
  ${lNd(4, Y_INCL, 100, {
    notBuilt: true,
    title: 'Update Triggers', titleColor: L[4].tc,
    sub:  'performance decay signals · fact-check flags',
    sub2: 'link health decay · staleness threshold crossed',
    sub3: 'page performance rank: highest-traffic pages updated first',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 3: BRIEF CREATION (per tier)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1].map(i => lArr(i, Y_INCL + 100, Y_BRIEF)).join('\n')}
  ${[2, 3].map(i => arr(L[i].cx, Y_INCL + 100, L[i].cx, Y_BRIEF, `${L[i].color}0.35)`)).join('\n')}
  ${lArr(4, Y_INCL + 100, Y_BRIEF)}

  ${rowLabel(FX, Y_BRIEF - 10, 'BRIEF')}

  ${lNd(0, Y_BRIEF, 122, {
    notBuilt: true,
    title: 'Auto Brief', titleColor: L[0].tc,
    sub:  'fully-specified · auto-generated — no human initiation',
    sub2: 'Inclination Engine decides topic, format, cluster ID',
    sub3: 'format template selected · all parameters bound at creation',
  })}
  ${lNd(1, Y_BRIEF, 122, {
    notBuilt: true,
    title: 'Auto Brief (Channel-Native)', titleColor: L[1].tc,
    sub:  'fully-specified · auto-generated',
    sub2: 'format: SmartNews / Newsbreak spec included in brief',
    sub3: 'target channel + author profile + keyword cluster bound upfront',
  })}
  ${lNd(2, Y_BRIEF, 122, {
    notBuilt: true,
    title: 'Editor Brief (Canonical Plan)', titleColor: L[2].tc,
    sub:  'editor validates suggested parameters from Inclination Engine',
    sub2: 'plan includes: canonical + full derivatives list upfront',
    sub3: 'markets · formats · adaptation rules · cluster ID all scoped now',
  })}
  ${lNd(3, Y_BRIEF, 122, {
    notBuilt: true,
    title: 'Editor Brief', titleColor: L[3].tc,
    sub:  'editor validates suggested params: keyword · persona · format',
    sub2: 'editorial angle · byline assignments · channel list defined upfront',
    sub3: 'brief drives generation — no ad-hoc parameter changes mid-run',
  })}
  ${lNd(4, Y_BRIEF, 122, {
    notBuilt: true,
    title: 'Update Brief', titleColor: L[4].tc,
    sub:  'auto-scoped from trigger signal',
    sub2: '&lt;30% change: auto-apply + surface diff report',
    sub3: '&gt;30% change: route to editorial queue with diff view',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 4: CONTENT GENERATION (per tier)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1, 2, 3, 4].map(i => lArr(i, Y_BRIEF + 122, Y_GEN)).join('\n')}

  ${rowLabel(FX, Y_GEN - 10, 'GENERATION')}

  ${lNd(0, Y_GEN, 132, {
    tag: 'Claude Opus', tagColor: `${L[0].color}0.85)`, tagBg: `${L[0].color}0.12)`,
    title: 'Automated Generation', titleColor: L[0].tc,
    sub:  'no author byline · fully template-driven',
    sub2: 'format-compliant from brief — zero deviation allowed',
    sub3: 'United Robots-style: deterministic structure, auto-dispatch',
  })}
  ${lNd(1, Y_GEN, 132, {
    tag: 'Claude Opus', tagColor: `${L[1].color}0.85)`, tagBg: `${L[1].color}0.12)`,
    notBuilt: true,
    title: 'Generation + Author Profile', titleColor: L[1].tc,
    sub:  'author voice applied at generation time (profile data)',
    sub2: 'channel-native format: SmartNews / Newsbreak spec from brief',
    sub3: 'headline variants generated in parallel · signal-optimal pre-selected',
  })}
  ${lNd(2, Y_GEN, 132, {
    tag: 'Claude Opus ×N', tagColor: `${L[2].color}0.85)`, tagBg: `${L[2].color}0.12)`,
    notBuilt: true,
    title: 'Canonical + Derivative Generation', titleColor: L[2].tc,
    sub:  'Step 1: generate canonical article with Author Profile',
    sub2: 'Step 2: derive format variants for 45+ markets from canonical',
    sub3: 'each derivative: market-localized · all linked by canonical ID · headline variants signal-ranked',
  })}
  ${lNd(3, Y_GEN, 132, {
    tag: 'Claude Opus ×5', tagColor: `${L[3].color}0.85)`, tagBg: `${L[3].color}0.12)`,
    notBuilt: true,
    title: 'Generation + Author Profiles', titleColor: L[3].tc,
    sub:  'up to 5 channel-optimized variants per national story',
    sub2: 'multi-byline: author voice profiles applied per variant',
    sub3: 'headline variants: editor selects / writes final · variants inform selection',
  })}
  ${lNd(4, Y_GEN, 132, {
    tag: 'Claude Opus', tagColor: `${L[4].color}0.85)`, tagBg: `${L[4].color}0.12)`,
    notBuilt: true,
    title: 'Update Generation', titleColor: L[4].tc,
    sub:  'targeted edit — not a full rewrite',
    sub2: '&lt;30%: auto-apply changes + surface diff report',
    sub3: 'preserves SEO equity · refreshes facts, links, freshness signals',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 5: QUALITY GATES — shared full-width (NOT BUILT)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1, 2, 3, 4].map(i => lArr(i, Y_GEN + 132, Y_GATES)).join('\n')}

  ${rowLabel(FX, Y_GATES - 10, 'QUALITY GATES  —  SHARED INFRASTRUCTURE, ALL TIERS')}
  <rect x="${FX}" y="${Y_GATES}" width="${FW}" height="294" rx="14"
    fill="rgba(45,212,191,0.04)" stroke="rgba(45,212,191,0.22)" stroke-width="1"/>
  <rect x="${FX + 7}" y="${Y_GATES + 7}" width="66" height="17" rx="8"
    fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.35)" stroke-width="0.8"/>
  <text x="${FX + 40}" y="${Y_GATES + 18.5}" text-anchor="middle"
    font-size="8.5" font-weight="700" fill="rgba(251,191,36,0.85)" font-family="${FONT}">NOT BUILT</text>
  <rect x="${FX + 82}" y="${Y_GATES - 11}" width="148" height="22" rx="11"
    fill="#1a1d27" stroke="rgba(45,212,191,0.35)" stroke-width="1"/>
  <text x="${FX + 156}" y="${Y_GATES + 4}" text-anchor="middle"
    font-size="11" font-weight="700" fill="#2dd4bf" font-family="${FONT}"
    letter-spacing="0.05em">QUALITY GATES</text>

  <!-- Gate row 1 -->
  ${nd(GXS[0], GY1, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Citation Check', titleColor: '#5eead4',
    sub:  'deterministic · hard gate',
    sub2: 'flagged items → human verify queue',
    sub3: 'unverifiable claims blocked from routing to publish',
  })}
  ${nd(GXS[1], GY1, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Plagiarism Check', titleColor: '#5eead4',
    sub:  'hard gate: near-verbatim → exception queue',
    sub2: 'soft flag: high similarity → structured review package',
    sub3: 'auto re-gen attempted before routing to exception queue',
  })}
  ${nd(GXS[2], GY1, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Brand-Fit Audit', titleColor: '#5eead4',
    sub:  'probabilistic · AI judgment',
    sub2: 'T1/T2: harder threshold → auto-reject on miss',
    sub3: 'T3/T4: surfaced in review package · human override available',
  })}
  ${nd(GXS[3], GY1, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Format Compliance', titleColor: '#5eead4',
    sub:  'hard gate vs. article template spec',
    sub2: 'total structural compliance required — not guidance',
    sub3: 'non-conforming output: auto re-gen, never flagged to editor',
  })}

  <!-- Gate row 2 -->
  ${nd(GXS[0], GY2, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'SEO / Meta Optimization', titleColor: '#5eead4',
    sub:  'title tag · meta description · per target channel',
    sub2: 'keyword placement + density verified post-gen (hard gate)',
    sub3: 'headline variants ranked by predicted CTR from signal data',
  })}
  ${nd(GXS[1], GY2, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Diff / Similarity Gate', titleColor: '#5eead4',
    sub:  'hard internal gate (contrast: PGS-82 currently surfaces to user)',
    sub2: 'cosine similarity: auto re-gen on fail — editor never sees it',
    sub3: 'per-platform tracking: different thresholds per destination channel',
  })}
  ${nd(GXS[2], GY2, GW, 82, { fill: 'rgba(45,212,191,0.07)', stroke: 'rgba(45,212,191,0.25)', rx: 8,
    title: 'Internal Link Suggestions', titleColor: '#5eead4',
    sub:  'vector-indexed McClatchy content library',
    sub2: 'T3/T4: surfaced in structured review package',
    sub3: 'T1/T2: top-ranked links auto-injected pre-dispatch',
  })}
  ${nd(GXS[3], GY2, GW, 82, { fill: 'rgba(251,191,36,0.07)', stroke: 'rgba(251,191,36,0.22)', rx: 8,
    title: 'Gary Kirwan Tool Nodes', titleColor: '#fcd34d',
    sub:  'claims validation · content audit · brand-fit enhancement',
    sub2: 'cross-pipeline layer: invoked at different stages per tier',
    sub3: 'T3/T4: most intensive  ·  T1/T2: lighter-weight subset',
  })}

  <text x="${FCX}" y="${Y_GATES + 280}" text-anchor="middle"
    font-size="10" fill="rgba(45,212,191,0.5)" font-family="${FONT}">Hard gate failures → auto re-gen (Format, Diff) or exception queue (Citation, Plagiarism)  ·  Soft flags → structured review package (T3/T4)  ·  All gates: deterministic where possible, AI judgment only where required</text>

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 6: ROUTING (per tier)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1, 2, 3, 4].map(i => lArr(i, Y_GATES + 294, Y_ROUTE)).join('\n')}

  ${rowLabel(FX, Y_ROUTE - 10, 'ROUTING')}

  ${lNd(0, Y_ROUTE, 112, {
    title: 'Auto Route', titleColor: L[0].tc,
    sub:  'all gates pass → CMS dispatch (fully automated)',
    sub2: 'hard gate failure → exception queue (no human in loop)',
    sub3: 'no manual decision point for T1 under any circumstances',
  })}
  ${lNd(1, Y_ROUTE, 112, {
    title: 'Auto Route (No CMS)', titleColor: L[1].tc,
    sub:  'all gates pass → direct channel API call',
    sub2: 'no Cue / WordPress step — T2 defining characteristic',
    sub3: 'hard gate failure → exception queue',
  })}
  ${lNd(2, Y_ROUTE, 112, {
    notBuilt: true,
    title: 'Editorial Review Package', titleColor: L[2].tc,
    sub:  'structured package: canonical + all derivatives + enrichment report',
    sub2: 'gate results · headline variants · internal link suggestions',
    sub3: 'editor reviews package holistically · element-level sign-off',
  })}
  ${lNd(3, Y_ROUTE, 112, {
    title: 'Editorial Review', titleColor: L[3].tc,
    sub:  'editor collaborates on draft with enrichment report alongside',
    sub2: 'enrichment report: recommendations, not additional gates',
    sub3: 'editor retains full override authority — enrichment informs, not forces',
  })}
  ${lNd(4, Y_ROUTE, 112, {
    notBuilt: true,
    title: '&lt;30% Auto  ·  &gt;30% Editor', titleColor: L[4].tc,
    sub:  '&lt;30% change: auto-apply, surface diff report to editor',
    sub2: '&gt;30% change: route to editorial queue with diff view presented',
    sub3: 'editor approves full-rewrite scope; auto-apply confirmed silently',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 7: CMS / CHANNEL DISPATCH (per tier)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1, 2, 3, 4].map(i => lArr(i, Y_ROUTE + 112, Y_DISP)).join('\n')}

  ${rowLabel(FX, Y_DISP - 10, 'DISPATCH')}

  ${lNd(0, Y_DISP, 112, {
    title: 'Auto CMS Dispatch', titleColor: L[0].tc,
    sub:  'T1 channels: United Robots-style, no human step',
    sub2: 'metadata pre-populated from brief at creation',
    sub3: 'fully automated end-to-end — zero manual entry',
  })}
  ${lNd(1, Y_DISP, 112, {
    notBuilt: true,
    title: 'Direct Channel Dispatch', titleColor: L[1].tc,
    sub:  'CSA → SmartNews API / Newsbreak API directly',
    sub2: 'no Cue / WordPress step — T2 defining advantage',
    sub3: 'faster time-to-channel · lower production cost per piece',
  })}
  ${lNd(2, Y_DISP, 112, {
    notBuilt: true,
    title: 'Publish-to-Cue / WP', titleColor: L[2].tc,
    sub:  'editor approval → Cue/WP receives pre-populated metadata',
    sub2: 'canonical ID links all derivatives — Content Graph tracks lineage',
    sub3: 'no manual CMS entry — defining editorial efficiency gain',
  })}
  ${lNd(3, Y_DISP, 112, {
    notBuilt: true,
    title: 'Publish-to-Cue / WP', titleColor: L[3].tc,
    sub:  'editor approves → Cue/WP receives draft + all metadata',
    sub2: 'canonical ID assigned · full versioning: brief → generation → publish',
    sub3: 'no manual entry step — same efficiency gain as T3',
  })}
  ${lNd(4, Y_DISP, 112, {
    notBuilt: true,
    title: 'Update Publish', titleColor: L[4].tc,
    sub:  'correction applied to existing published page (O&amp;O primary)',
    sub2: 'pages prioritized by current traffic and performance rank',
    sub3: 'SEO equity preserved · update timestamp + signals refreshed',
  })}

  <!-- ════════════════════════════════════════════════════════════════════
       CONTENT GRAPH (deferred)
       ════════════════════════════════════════════════════════════════════ -->
  <rect x="${FX}" y="${Y_CGPH}" width="${IW}" height="66" rx="10"
    fill="rgba(107,114,128,0.04)" stroke="rgba(107,114,128,0.16)"
    stroke-width="1" stroke-dasharray="5 3"/>
  <text x="${FX + 14}" y="${Y_CGPH + 20}" font-size="11" font-weight="600"
    fill="#6b7280" font-family="${FONT}">Content Graph — deferred (prerequisite: Publish-to-Cue active + performance data live)</text>
  <text x="${FX + 14}" y="${Y_CGPH + 37}" font-size="10"
    fill="rgba(107,114,128,0.6)" font-family="${FONT}">Canonical ID at brief creation · all derivatives linked with typed relationships · variant-level attribution · full lineage: generation → post-publish</text>
  <text x="${FX + 14}" y="${Y_CGPH + 53}" font-size="10"
    fill="rgba(107,114,128,0.5)" font-family="${FONT}">Enables: performance per variant · attribution to author profile · headline A/B outcomes · signal feedback with precision</text>

  <!-- ════════════════════════════════════════════════════════════════════
       ROW 9: PERFORMANCE TRACKING — shared full-width (NOT BUILT)
       ════════════════════════════════════════════════════════════════════ -->
  ${[0, 1, 2, 3, 4].map(i => lArr(i, Y_DISP + 112, Y_PERF)).join('\n')}

  ${rowLabel(FX, Y_PERF - 10, 'SHARED PERFORMANCE TRACKING &amp; OPERATIONS LAYER')}
  <rect x="${FX}" y="${Y_PERF}" width="${FW}" height="112" rx="14"
    fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.25)" stroke-width="1"/>
  <rect x="${FX + 7}" y="${Y_PERF + 7}" width="66" height="17" rx="8"
    fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.35)" stroke-width="0.8"/>
  <text x="${FX + 40}" y="${Y_PERF + 18.5}" text-anchor="middle"
    font-size="8.5" font-weight="700" fill="rgba(251,191,36,0.85)" font-family="${FONT}">NOT BUILT</text>
  <rect x="${FX + 82}" y="${Y_PERF - 11}" width="224" height="22" rx="11"
    fill="#1a1d27" stroke="rgba(52,211,153,0.35)" stroke-width="1"/>
  <text x="${FX + 194}" y="${Y_PERF + 4}" text-anchor="middle"
    font-size="11" font-weight="700" fill="#34d399" font-family="${FONT}"
    letter-spacing="0.05em">PERFORMANCE TRACKING</text>
  <text x="${FCX}" y="${Y_PERF + 32}" text-anchor="middle"
    font-size="13" font-weight="700" fill="#34d399" font-family="${FONT}">Unified Performance Data Layer + Operations Layer</text>
  <text x="${FCX}" y="${Y_PERF + 50}" text-anchor="middle"
    font-size="11" fill="rgba(52,211,153,0.65)" font-family="${FONT}">CPA Tracker (labor + compute cost per piece) · headline variant performance · author profile performance · segmented by distribution environment</text>
  <text x="${FCX}" y="${Y_PERF + 67}" text-anchor="middle"
    font-size="10.5" fill="rgba(52,211,153,0.55)" font-family="${FONT}">Operations Layer: Pipeline State · Gate Status · Distribution View · Topic Coverage Map · Signal Feed — always present, always informing</text>
  <text x="${FCX}" y="${Y_PERF + 84}" text-anchor="middle"
    font-size="11" font-weight="600" fill="rgba(52,211,153,0.75)" font-family="${FONT}">↑  Top-performing patterns feed back into Signal Layer automatically — closed performance loop  ↑</text>

  <!-- Feedback loop arrow: left side, Perf Tracking → Signal Layer -->
  <path d="M${FX - 2},${Y_PERF + 56} L${FX - 18},${Y_PERF + 56} L${FX - 18},${Y_SIG + 50} L${FX},${Y_SIG + 50}"
    fill="none" stroke="rgba(52,211,153,0.5)" stroke-width="1.5"
    marker-end="url(#arr-green)"/>
  <text x="${FX - 30}" y="${(Y_PERF + Y_SIG) / 2 + 4}" text-anchor="middle"
    font-size="9" fill="rgba(52,211,153,0.45)" font-family="${FONT}"
    transform="rotate(-90, ${FX - 30}, ${(Y_PERF + Y_SIG) / 2 + 4})">closed loop</text>

</svg>`;
}
