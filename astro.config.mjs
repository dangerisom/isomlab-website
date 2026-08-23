// @ts-check
import { defineConfig } from 'astro/config';

// Two deployment targets, switched by env so the DNS cutover is a one-line change:
//   preview  -> https://dangerisom.github.io/isomlab-website  (SITE_BASE=/isomlab-website)
//   live     -> https://www.isomlab.com                       (SITE_BASE=/)
const site = process.env.SITE_URL ?? 'https://dangerisom.github.io';
const base = process.env.SITE_BASE ?? '/isomlab-website';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
