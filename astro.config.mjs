// @ts-check
import { defineConfig } from 'astro/config';

// Two deployment targets, switched by env so the DNS cutover is a one-line change:
//   preview  -> https://dangerisom.github.io/isomlab-website  (SITE_BASE=/isomlab-website)
//   live     -> https://www.isomlab.com                       (SITE_BASE=/)
const site = process.env.SITE_URL ?? 'https://dangerisom.github.io';
const base = process.env.SITE_BASE ?? '/isomlab-website';

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
