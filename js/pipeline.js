// pipeline.js — renders current / ideal / delta views
import { DELTA } from '../data/pipeline.js';
import { buildCurrentSVG, buildIdealSVG } from './diagrams.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// ── SVG pipeline views ────────────────────────────────────────────────────────

function renderCurrentView() {
  const container = el('div', 'svg-view');
  container.id = 'current-view';
  container.innerHTML = buildCurrentSVG();
  return container;
}

function renderIdealView() {
  const container = el('div', 'svg-view');
  container.id = 'ideal-view';
  container.innerHTML = buildIdealSVG();
  return container;
}

// ── Delta view ────────────────────────────────────────────────────────────────

const DELTA_STATUS_LABELS = {
  missing:  'Not Built',
  refactor: 'Refactor',
  fix:      'Fix Needed',
  keep:     'Keep',
};

function renderDeltaView() {
  const container = el('div', '');
  container.id = 'delta-view';

  for (const d of DELTA) {
    const card = el('div', `delta-card status-${d.status}`);

    // Header
    const hdr = el('div', 'delta-header');
    const badge = el('span', 'delta-status', DELTA_STATUS_LABELS[d.status] || d.status);
    const pri = el('span', 'delta-priority', `${d.priority !== '—' ? d.priority : 'No change needed'}`);
    hdr.append(badge, pri);
    card.append(hdr);

    // Body: current → ideal
    const body = el('div', 'delta-body');

    // Current col
    const curr = el('div', 'delta-col');
    const currLabel = el('div', 'delta-col-label', 'Current State');
    curr.append(currLabel);
    if (d.current) {
      curr.append(el('div', 'delta-stage-name', d.current));
    } else {
      curr.append(el('div', 'delta-stage-name', '— Does not exist —'));
    }
    body.append(curr);

    // Ideal col
    const ideal = el('div', 'delta-col');
    const idealLabel = el('div', 'delta-col-label', 'PRD Ideal');
    ideal.append(idealLabel);
    ideal.append(el('div', 'delta-stage-name', d.ideal));

    if (d.what && d.what.length) {
      const list = el('div', 'delta-change-list');
      for (const w of d.what) {
        list.append(el('div', 'delta-change', w));
      }
      ideal.append(list);
    }
    body.append(ideal);

    card.append(body);
    container.append(card);
  }

  return container;
}

// ── Legend ─────────────────────────────────────────────────────────────────────

function buildLegend(items) {
  const legend = el('div', '');
  legend.id = 'legend';
  for (const item of items) {
    const li = el('div', 'legend-item');
    const sw = el('div', 'legend-swatch');
    sw.style.background = item.color;
    if (item.style) sw.style.cssText += ';' + item.style;
    li.append(sw, document.createTextNode(item.label));
    legend.append(li);
  }
  return legend;
}

function buildCurrentLegend() {
  return buildLegend([
    { color: 'rgba(96,165,250,0.7)',   label: 'Request / Response boundary' },
    { color: 'rgba(45,212,191,0.7)',   label: 'Claude Haiku — categorization' },
    { color: 'rgba(167,139,250,0.7)',  label: 'Claude Opus — content generation' },
    { color: 'rgba(107,114,128,0.7)',  label: 'No Claude — deterministic / scraping' },
    { color: 'rgba(248,113,113,0.7)',  label: 'Cascade coupling / structural gap' },
    { color: 'rgba(251,191,36,0.7)',   label: 'Not built — present in PRD Ideal' },
  ]);
}

function buildIdealLegend() {
  return buildLegend([
    { color: 'rgba(52,211,153,0.7)',   label: 'Signal / Performance layer (closed loop)' },
    { color: 'rgba(107,114,128,0.7)',  label: 'T1 — Automated (no human step)' },
    { color: 'rgba(45,212,191,0.7)',   label: 'T2 — App/Platform (direct channel dispatch)' },
    { color: 'rgba(167,139,250,0.7)',  label: 'T3 — API/Canonical (1 → 45+ assets)' },
    { color: 'rgba(96,165,250,0.7)',   label: 'T4 — National (editorial intensive)' },
    { color: 'rgba(251,191,36,0.7)',   label: 'T5 — Updates (freshness maintenance)' },
    { color: 'rgba(45,212,191,0.5)',   label: 'Quality Gates (shared, all tiers)' },
  ]);
}

function buildDeltaLegend() {
  return buildLegend([
    { color: 'rgba(52,211,153,0.7)',   label: 'Keep — minimal change' },
    { color: 'rgba(248,113,113,0.7)',  label: 'Fix needed — exists but broken/wrong' },
    { color: 'rgba(96,165,250,0.7)',   label: 'Refactor — needs architectural change' },
    { color: 'rgba(251,191,36,0.7)',   label: 'Missing — not yet built' },
  ]);
}

// ── Public init ───────────────────────────────────────────────────────────────

export function init() {
  const main    = document.getElementById('main');
  const buttons = document.querySelectorAll('.view-btn');

  // Build all three views upfront
  const views = {
    current: { el: renderCurrentView(), legend: buildCurrentLegend() },
    ideal:   { el: renderIdealView(),   legend: buildIdealLegend()   },
    delta:   { el: renderDeltaView(),   legend: buildDeltaLegend()   },
  };

  function showView(viewKey) {
    main.innerHTML = '';
    main.append(views[viewKey].legend, views[viewKey].el);
    buttons.forEach(b => b.classList.toggle('active', b.dataset.view === viewKey));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  showView('current');
}
