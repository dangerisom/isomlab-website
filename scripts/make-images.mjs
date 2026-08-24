/**
 * Generate the static images the site ships with:
 *   public/og-default.png   1200x630 social preview card
 *   public/favicon.svg      the lab mark
 *   public/people/*.jpg     neutral placeholder portraits (only if missing)
 *
 * Rerun with `npm run images` after changing the wordmark or palette. Real
 * portraits dropped into public/people/ are never overwritten.
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
mkdirSync(join(pub, 'people'), { recursive: true });

const INK = '#14110e';
const PAPER = '#fbfaf8';
const ACCENT = '#b34a12';
const GREEN = '#005030';

/* --- favicon ------------------------------------------------------------- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="g" cx="32%" cy="30%" r="78%">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="${GREEN}"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <circle cx="32" cy="32" r="17" fill="url(#g)"/>
</svg>
`;
writeFileSync(join(pub, 'favicon.svg'), favicon);

/* --- social card --------------------------------------------------------- */
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="84%" cy="12%" r="60%">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mark" cx="32%" cy="30%" r="78%">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="${GREEN}"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="9" fill="${ACCENT}"/>

  <circle cx="92" cy="92" r="22" fill="url(#mark)"/>
  <text x="130" y="101" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${INK}">Isom Lab</text>

  <text x="92" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="${INK}">How cells sense their</text>
  <text x="92" y="372" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="${INK}">environment, cooperate,</text>
  <text x="92" y="454" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#5c554d">and adapt</text>

  <text x="92" y="552" font-family="Helvetica, Arial, sans-serif" font-size="25" letter-spacing="1.6" fill="#8b8279">UNIVERSITY OF MIAMI  ·  SYLVESTER COMPREHENSIVE CANCER CENTER</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(join(pub, 'og-default.png'));

/* --- placeholder portraits ----------------------------------------------- */
const { people } = await import('../src/data/people.js');

function initials(name) {
  return name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

let made = 0;
for (const p of people) {
  const out = join(pub, 'people', p.photo);
  if (existsSync(out)) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#f2efea"/>
    <circle cx="400" cy="500" r="150" fill="#e2ddd5"/>
    <text x="400" y="548" text-anchor="middle" font-family="Georgia, serif" font-size="120" fill="#a49b91">${initials(p.name)}</text>
    <text x="400" y="760" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="2" fill="#b8b0a6">PHOTO TO COME</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
  made++;
}

console.log(`images: favicon.svg, og-default.png, ${made} placeholder portrait(s)`);
