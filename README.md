# isomlab-website

The Isom Lab website — a static Astro site, replacing the Wix build of isomlab.com.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321/isomlab-website
```

`npm run dev` and `npm run build` both re-run the publications sync first, so the
site can never build against a stale citation list.

## Where the content lives

| What | File |
|---|---|
| Lab name, nav, email, funders | `src/data/site.js` |
| The three research areas and the methods blurbs | `src/data/research.js` |
| Roster, titles, bios | `src/data/people.js` |
| Released tools | `src/data/software.js` |
| Publications | **generated** — see below |

Portraits go in `public/people/` under the filename each person's entry names.
Placeholder images are generated for anyone missing one; a real file dropped in
is never overwritten.

## Publications are generated, not written

The source of truth is unchanged: ORCID → `cv/build/update_publications.py` →
`publications.json`. This site reads that file and reshapes it.

```bash
cd ~/Documents/Claude/Projects/cv/build && python3 update_publications.py
cd ~/Documents/Claude/Projects/repos/isomlab-website && npm run build
```

Never hand-edit `src/data/publications.json` — it is overwritten on every build.

### Embargoed papers

`scripts/sync-publications.mjs` has an `EMBARGOED` list at the top, matched on a
title substring. Anything matching is carried through the build but withheld from
the rendered page, so a paper in production cannot leak before its press embargo
lifts.

The **Nature paper is currently listed there**. Delete that line the day it goes
live and rebuild — the paper then appears everywhere automatically.

## Images

```bash
npm run images        # favicon, og-default.png, any missing placeholder portraits
```

The social card (`public/og-default.png`, 1200×630) is what X, LinkedIn, and Slack
show when someone shares the site. Regenerate it if the wordmark or palette changes.

## Software versions

```bash
npm run sync:software   # refresh version badges from the GitHub API
```

Optional, and deliberately not part of `npm run build` — the committed data file is
authoritative so builds work offline. Only semver tags are accepted, so snapshot
tags never surface as a version badge.

## Deploying

GitHub Actions builds and deploys on every push to `main`.

Two targets, switched by repository variables (Settings → Secrets and variables →
Actions → Variables):

| Target | `SITE_URL` | `SITE_BASE` |
|---|---|---|
| Preview (default) | `https://dangerisom.github.io` | `/isomlab-website` |
| Live on isomlab.com | `https://www.isomlab.com` | `/` |

### Cutting over to isomlab.com

1. Set the two variables above to the live values; push to rebuild.
2. Add `www.isomlab.com` under Settings → Pages → Custom domain. That commits a
   `CNAME` file to the repo.
3. At **GoDaddy**, point DNS at GitHub Pages:
   - `CNAME` record, host `www` → `dangerisom.github.io`
   - four `A` records on the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
4. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.
5. Cancel the Wix plan only after the new site has served correctly for a few days.

Keep the Wix site until then — it costs one more billing cycle and it is the
rollback path.
