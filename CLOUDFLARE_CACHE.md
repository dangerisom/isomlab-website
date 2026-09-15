# Making a deploy show up immediately

**Why this exists.** On 2026-09-15 a nav item was added, the Superdark page.
Straight after the deploy the new page showed the six item nav and the older
pages still showed the old five item nav, so the Superdark link looked like it
was appearing and disappearing depending on which page you were on.

Nothing was broken. The live HTML was correct on every page the whole time.

**The cause.** GitHub Pages serves HTML with `cache-control: max-age=600`, so a
visitor's own browser holds each page for ten minutes. A brand new URL has never
been in that cache, so it loads fresh. A page the visitor already had is served
from their disk until the ten minutes are up. Any change to shared chrome, the
nav, the header, the footer, is therefore half applied for ten minutes after
every deploy.

Cloudflare is not the culprit here. It does not cache HTML by default, and
`cf-cache-status` on a page request reads `DYNAMIC`, meaning it passed straight
through. The ten minutes are the browser's, and the header comes from GitHub.

## What is actually served, measured 2026-09-15

| request | cache-control | from |
|---|---|---|
| `/research/` | `max-age=600` | GitHub Pages |
| `/_astro/Base.CPS2oTqd.css` | `max-age=14400` | GitHub Pages |

Two things follow. HTML is cached for longer than it should be, because it
changes on every deploy. And the hashed assets are cached for **far too short**
a time, because their filenames contain a content hash and therefore never
change meaning. Those two want opposite treatment, and GitHub gives them nearly
the same.

## The fix, two Cloudflare cache rules

Cloudflare's Cache Rules can override the browser TTL per request, which is
exactly the knob needed. Go to the isomlab.com zone, then **Caching** then
**Cache Rules** then **Create rule**. Order matters, so create the asset rule
first and leave it above the HTML rule.

### Rule 1, immutable assets

**Name:** `Hashed assets, cache for a year`

**Expression.** Use the expression builder, or paste this into the editor:

    starts_with(http.request.uri.path, "/_astro/")

**Settings**

| setting | value |
|---|---|
| Cache eligibility | Eligible for cache |
| Edge TTL | Override origin, 1 month |
| Browser TTL | Override origin, 1 year |

Safe because every file under `/_astro/` carries a content hash in its name. A
changed file is a different URL, so a stale copy can never be served.

### Rule 2, HTML always revalidates

**Name:** `HTML, always revalidate`

**Expression.** Every page request lands on a path ending in a slash, because
GitHub Pages 301s `/research` to `/research/`. Verified on 2026-09-15.

    ends_with(http.request.uri.path, "/")

**Settings**

| setting | value |
|---|---|
| Cache eligibility | Eligible for cache |
| Edge TTL | Override origin, 2 hours |
| Browser TTL | Override origin, **0 seconds** |

Browser TTL 0 does not mean no caching. It means the browser must check with
Cloudflare before reusing the page, and Cloudflare answers `304 Not Modified`
when nothing changed, which costs a few hundred bytes. Edge TTL of 2 hours then
serves most of those checks from Cloudflare rather than GitHub.

The one thing to remember: **purge the cache after a deploy**, or wait out the
edge TTL. Caching then Configuration then Purge Everything. Alternatively raise
the edge TTL only once you are happy to purge as part of deploying.

## Why not the global Browser Cache TTL setting

Caching then Configuration has a single **Browser Cache TTL** dropdown. It is
tempting and it is the wrong tool twice over. Its shortest option is well above
zero, so it cannot make HTML revalidate, and it applies to everything, so it
cannot give the hashed assets the long life they deserve. The two rules above
are what separate the two cases.

## How to confirm it worked

    curl -sI https://www.isomlab.com/research/ | grep -i cache-control
    curl -sI https://www.isomlab.com/_astro/<the-current-css> | grep -i cache-control

Expect `max-age=0` on the page and `max-age=31536000` on the asset. Get the
current asset filename with:

    curl -s https://www.isomlab.com/ | grep -oE '/_astro/[^"]+\.css' | head -1

## If you change nothing

This is a real but small annoyance, and it only bites when shared chrome
changes. A hard reload, Cmd+Shift+R, fixes it for whoever is looking, and it
clears itself in ten minutes for everyone else.
