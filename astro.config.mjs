// @ts-check
import { defineConfig } from 'astro/config';

// The site went live on its own domain in the 2026-08-29 cutover, so the
// defaults are the live target and `npm run dev` mirrors what ships.
//   live     -> https://www.isomlab.com                       (SITE_BASE=/)
//   preview  -> https://dangerisom.github.io/isomlab-website  (SITE_BASE=/isomlab-website)
// The deploy workflow sets both explicitly from repo variables, so changing
// these defaults cannot move production on its own.
const site = process.env.SITE_URL ?? 'https://www.isomlab.com';
const base = process.env.SITE_BASE ?? '/';

// FILE_BUILD=1 produces a copy that works when opened straight off disk
// (file://), for sending to a reviewer who should not need a server or a URL.
// Every page lands at the top level as <name>.html and every link is relative.
const fileBuild = process.env.FILE_BUILD === '1';

export default defineConfig({
  site,
  base: fileBuild ? './' : base,
  trailingSlash: 'ignore',
  build: { format: fileBuild ? 'file' : 'directory' },
  vite: {
    define: {
      'import.meta.env.PUBLIC_FILE_BUILD': JSON.stringify(fileBuild ? '1' : ''),
    },
  },
});
