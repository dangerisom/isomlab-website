/**
 * Refresh version strings in src/data/software.js from the GitHub API.
 *
 * Optional and never part of `npm run build` -- the committed data file is the
 * source of truth so builds work offline. Run it when you tag a release:
 *   npm run sync:software
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(root, 'src/data/software.js');
const src = readFileSync(file, 'utf8');

const { software } = await import(file);
let out = src;
let changed = 0;

for (const tool of software) {
  const res = await fetch(`https://api.github.com/repos/${tool.repo}/tags`, {
    headers: { accept: 'application/vnd.github+json' },
  });
  if (!res.ok) {
    console.warn(`  ${tool.repo}: ${res.status} ${res.statusText} — left as-is`);
    continue;
  }
  // Only release tags count. Repos also carry snapshot tags like
  // "pre-redraw-2026", which must never surface as a version badge.
  const SEMVER = /^v?\d+\.\d+\.\d+$/;
  const tags = await res.json();
  const latest = (Array.isArray(tags) ? tags : []).map((t) => t.name).find((n) => SEMVER.test(n)) ?? null;
  if (!latest || latest === tool.version) continue;

  // Rewrite only the version line inside this tool's own block.
  const block = new RegExp(
    `(repo: '${tool.repo.replace('/', '\\/')}',\\s*\\n\\s*version: )(null|'[^']*')`
  );
  if (block.test(out)) {
    out = out.replace(block, `$1'${latest}'`);
    console.log(`  ${tool.name}: ${tool.version ?? 'none'} -> ${latest}`);
    changed++;
  }
}

if (changed) {
  writeFileSync(file, out);
  console.log(`software: ${changed} version(s) updated`);
} else {
  console.log('software: all versions already current');
}
