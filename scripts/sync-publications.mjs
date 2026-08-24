/**
 * Pull the publication database out of the CV project and normalize it for the site.
 *
 * Source of truth is unchanged: ORCID -> update_publications.py -> publications.json.
 * This script only reshapes that file; it never edits it. To refresh the site after a
 * paper lands, run the CV pipeline first, then `npm run build`:
 *
 *   cd ~/Documents/Claude/Projects/cv/build && python3 update_publications.py
 *   cd ~/Documents/Claude/Projects/repos/isomlab-website && npm run build
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SOURCE =
  process.env.PUBLICATIONS_JSON ??
  resolve(root, '../../cv/build/publications.json');
const OUT = join(root, 'src/data/publications.json');

// Papers under press embargo. Listed here by title substring, they are carried
// through the build but flagged `embargoed` and withheld from the rendered page.
// Delete the entry the day the paper goes live -- nothing else needs to change.
const EMBARGOED = (process.env.EMBARGOED_TITLES ?? 'TM184C is a GPCR-like regulator')
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

const items = records
  .map((rec) => {
    const embargoed = EMBARGOED.some((frag) => (rec.title ?? '').includes(frag));
    return {
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
  // does not sit above it. Sort is stable, so ORCID's order breaks ties.
  .sort((a, b) => {
    if (a.year !== b.year) return Number(b.year) - Number(a.year);
    const rank = (p) => (p.preprint ? 2 : p.inPress ? 1 : 0);
    return rank(a) - rank(b);
  });

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
