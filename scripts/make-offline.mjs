/**
 * Build a copy of the site that browses correctly from a folder on disk, with
 * no server and no URL, and zip it for a reviewer.
 *
 *   npm run offline   ->  isomlab-website-preview.zip
 *
 * Astro still emits its own asset links against the configured base, which
 * comes out as "/./_astro/..." in file mode -- absolute, so file:// resolves it
 * against the filesystem root. Every page lands at the top level, so rewriting
 * those to "./_astro/..." is correct for all of them.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const zip = join(root, 'isomlab-website-preview.zip');

rmSync(dist, { recursive: true, force: true });
rmSync(zip, { force: true });

execFileSync('npm', ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, FILE_BUILD: '1' },
});

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

let patched = 0;
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const before = readFileSync(file, 'utf8');
  const after = before.replaceAll('"/./', '"./');
  if (after !== before) {
    writeFileSync(file, after);
    patched++;
  }
}

// Nothing may point at the filesystem root, or it silently fails on the
// reviewer's machine in a way that looks like a broken site.
const offenders = [];
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    offenders.push(`${file.replace(dist, '')} -> ${m[1]}`);
  }
}
if (offenders.length) {
  console.error('\nAbsolute paths left in the offline build:');
  offenders.forEach((o) => console.error('  ' + o));
  process.exit(1);
}

execFileSync('zip', ['-qr', zip, '.'], { cwd: dist });
const kb = (statSync(zip).size / 1024).toFixed(0);
console.log(`\noffline build: ${patched} file(s) patched, no absolute paths remain`);
console.log(`wrote ${zip.replace(root + '/', '')} (${kb} KB)`);
