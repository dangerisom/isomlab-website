/**
 * Pull the publication database out of the CV project and normalize it for the site.
 *
 * Source of truth is unchanged: ORCID -> update_publications.py -> publications.json.
 * This script only reshapes that file; it never edits it. To refresh the site after a
 * paper lands, run the CV pipeline first, then `npm run build`:
 *
 *   cd ~/Documents/Claude/Projects/cv_repo/build && python3 update_publications.py
 *   cd ~/Documents/Claude/Projects/repos/isomlab-website && npm run build
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SOURCE =
  process.env.PUBLICATIONS_JSON ??
  resolve(root, '../../cv_repo/build/publications.json');
const OUT = join(root, 'src/data/publications.json');

// Papers under press embargo. Listed here by title substring, they are carried
// through the build but flagged `embargoed` and withheld from the rendered page.
// Delete the entry the day the paper goes live -- nothing else needs to change.
// (The TM184C Nature paper sat here from 2026-08 until it published on 2026-09-09.)
const EMBARGOED = (process.env.EMBARGOED_TITLES ?? '')
  .split('|')
  .map((s) => s.trim())
  .filter(Boolean);

const LAB_AUTHOR = /^Isom\s+D/;

function formatAuthors(authors = []) {
  return authors.map((name) => ({ name, isLab: LAB_AUTHOR.test(name) }));
}

function venue(rec) {
  if (rec.kind === 'accepted') return rec.accepted_journal || 'In press';
  return rec.journal || '';
}

function citationDetail(rec) {
  // "2026;7(3):104751" -- omit whatever the record does not have.
  const bits = [];
  if (rec.volume) bits.push(rec.volume);
  if (rec.issue) bits.push(`(${rec.issue})`);
  const head = bits.join('');
  if (head && rec.pages) return `${head}:${rec.pages}`;
  return head || rec.pages || '';
}

const PREPRINT_SERVER = /biorxiv|medrxiv|arxiv/i;

function links(rec) {
  const out = [];
  if (rec.doi) {
    // An accepted paper whose only DOI is still the preprint's must say so --
    // labelling a bioRxiv link "DOI" under a journal name reads as the journal version.
    const isPreprintDoi = PREPRINT_SERVER.test(rec.journal ?? '');
    out.push({
      label: isPreprintDoi ? 'Preprint' : 'DOI',
      href: `https://doi.org/${rec.doi}`,
    });
  }
  if (rec.pmid)
    out.push({ label: 'PubMed', href: `https://pubmed.ncbi.nlm.nih.gov/${rec.pmid}/` });
  if (rec.pmcid)
    out.push({
      label: 'PMC',
      href: `https://www.ncbi.nlm.nih.gov/pmc/articles/${rec.pmcid}/`,
    });
  return out;
}

if (!existsSync(SOURCE)) {
  console.error(
    `\n  publications.json not found at:\n    ${SOURCE}\n\n` +
      `  Set PUBLICATIONS_JSON to its path, or run the CV pipeline first.\n`
  );
  process.exit(1);
}

const db = JSON.parse(readFileSync(SOURCE, 'utf8'));
const records = db.records ?? [];

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

// A sortable YYYYMMDD from whatever date the record carries: the issue's
// month/day first, else the online (epub) date "2026 Sep 9", else the year alone.
// Newest first within a year, so today's paper leads the list without a pin.
function sortDate(rec) {
  const year = Number(rec.year) || 0;
  let month = MONTHS[String(rec.month ?? '').slice(0, 3).toLowerCase()] ?? 0;
  let day = Number(rec.day) || 0;
  if (!month && rec.epub) {
    const m = String(rec.epub).match(/^(\d{4})\s+([A-Za-z]{3})\w*\s*(\d{1,2})?/);
    if (m && Number(m[1]) === year) {
      month = MONTHS[m[2].toLowerCase()] ?? 0;
      day = Number(m[3]) || 0;
    }
  }
  return year * 10000 + month * 100 + day;
}

const items = records
  .map((rec) => {
    const embargoed = EMBARGOED.some((frag) => (rec.title ?? '').includes(frag));
    return {
      sortDate: sortDate(rec),
      title: (rec.title ?? '').replace(/\s+/g, ' ').trim(),
      authors: formatAuthors(rec.authors),
      venue: venue(rec),
      year: rec.year || '',
      detail: citationDetail(rec),
      kind: rec.kind || 'article',
      preprint: rec.kind === 'preprint',
      inPress: rec.kind === 'accepted',
      links: links(rec),
      embargoed,
    };
  })
  // Newest year first. Within a year: published work, then accepted/in-press,
  // then preprints -- so the peer-reviewed record leads and unreviewed work
  // does not sit above it. Within each of those, newest date first; sort is
  // stable, so ORCID's order breaks any remaining ties.
  .sort((a, b) => {
    if (a.year !== b.year) return Number(b.year) - Number(a.year);
    const rank = (p) => (p.preprint ? 2 : p.inPress ? 1 : 0);
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    return b.sortDate - a.sortDate;
  })
  .map(({ sortDate, ...p }) => p);

const visible = items.filter((p) => !p.embargoed);
const payload = {
  orcid: db.orcid ?? null,
  synced: db.synced ?? null,
  counts: { total: visible.length, withheld: items.length - visible.length },
  items,
};

writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
console.log(
  `publications: ${visible.length} shown, ${payload.counts.withheld} withheld (embargo), ` +
    `synced ${payload.synced ?? 'unknown'}`
);
