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

## The homepage banner

`public/media/intercellular-connection.{webm,mp4,jpg}` — a looping clip of an
intercellular connection, built from `src/assets/RICTOR-3D-connection-1.mp4`
(one of Jen's 3D reconstructions, 1554×930 at 8 fps). Rebuild with:

```bash
scripts/make-banner.sh
```

What that script does, and why:

1. **Paints out the burned-in timestamp and scale bar.** Both are printed into
   the pixels, and the timestamp sits directly on top of vesicles near the
   right-hand cell, so a black box would have erased real signal. The glyphs are
   masked and filled from their surroundings instead. **The vesicles that were
   under the text are reconstructed, not measured** — fine for a banner,
   not something to reuse in a figure.
2. **Re-pseudocolours the channels into the site palette** — TM184C from magenta
   to `--accent` orange and LysoTracker from yellow to `--green`. The third
   channel keeps the blue it was acquired in. The source is a flattened
   composite, but the mixing was additive
   and each channel had its own hue, so the three separate cleanly
   (`scripts/recolor-channels.py` explains the arithmetic, including the one
   correction needed where magenta and yellow overlap and the red channel
   clips). Pseudocolour is arbitrary by construction, so restating it is not a
   manipulation — which pixels are lit does not change. Orange and bluish-green
   were chosen to stay separable under the common colour-vision deficiencies,
   as magenta and yellow were. Edit the three constants at the top of that
   script to change them.
3. **Rotates by 23.66°**, the measured angle of the connection, so it runs level
   with the page. The angle came from a weighted principal-axis fit to the
   vesicle signal, not from eyeballing it.
4. **Crops to 1740×350 (~5:1)** — a wide strip centred on the connection,
   with one cell anchoring each end. Rotation padding is black and so is the
   background, so the seams do not show.
5. **Plays forward then backward** — 68 frames, 8.5 s — so the loop has no jump
   cut. The clip is only 35 frames long; a straight loop visibly snaps.

The right-hand cell is cut off along a diagonal. That is the edge of the
original field of view, not a cropping choice.

**If you want a better one**, re-export from Imaris with the overlays turned off
and at a higher resolution — 1554 px wide is under 1.4× for a 1180 px banner,
and nothing here can add detail that was not captured. Then rerun the script;
step 1 becomes a no-op on its own.

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
| Preview (default) | `https://isomlab.github.io` | `/isomlab-website` |
| Live on isomlab.com | `https://www.isomlab.com` | `/` |

### Cutting over to isomlab.com

1. Set the two variables above to the live values; push to rebuild.
2. Add `www.isomlab.com` under Settings → Pages → Custom domain. That commits a
   `CNAME` file to the repo.
3. At **GoDaddy**, point DNS at GitHub Pages:
   - `CNAME` record, host `www` → `isomlab.github.io`
   - four `A` records on the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
4. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.
5. Cancel the Wix plan only after the new site has served correctly for a few days.

Keep the Wix site until then — it costs one more billing cycle and it is the
rollback path.
