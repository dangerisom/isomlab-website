# Getting HTTPS working without waiting on GitHub

**Why this exists.** The site went live on 2026-08-29 and GitHub Pages never
issued its TLS certificate. After 26 hours the Pages API still reported
`https_certificate: state = none`, while GitHub's own health check reported the
domain valid and HTTPS-eligible with no CAA error. The two standard remedies
(re-saving the custom domain, removing and re-adding it) were both tried. A
support ticket is not available: the personal account's plan shows "Technical
support not included" and the Continue button is disabled.

Meanwhile `https://www.isomlab.com` fails for every visitor, including anyone
arriving from a search result, a bookmark, or Safari upgrading the request
because Wix left a year-long HSTS header on the domain.

**The fix.** Put Cloudflare in front. Cloudflare issues its own certificate for
the domain, usually within minutes, so HTTPS stops depending on GitHub's queue.
Cloudflare is free for this and reversible.

---

## Before you start

Your complete current zone, captured 2026-08-30 from `ns39.domaincontrol.com`.
Everything below must exist at Cloudflare before the nameservers move.

| Type | Name | Value | TTL | Proxy |
|---|---|---|---|---|
| A | @ | 185.199.108.153 | Auto | **Proxied** |
| A | @ | 185.199.109.153 | Auto | **Proxied** |
| A | @ | 185.199.110.153 | Auto | **Proxied** |
| A | @ | 185.199.111.153 | Auto | **Proxied** |
| AAAA | @ | 2606:50c0:8000::153 | Auto | **Proxied** |
| AAAA | @ | 2606:50c0:8001::153 | Auto | **Proxied** |
| AAAA | @ | 2606:50c0:8002::153 | Auto | **Proxied** |
| AAAA | @ | 2606:50c0:8003::153 | Auto | **Proxied** |
| CNAME | www | dangerisom.github.io | Auto | **Proxied** |
| MX | @ | webmail.isomlab.com (priority 0) | Auto | **DNS only** |
| A | webmail | 107.180.47.6 | Auto | **DNS only** |

**The two mail rows must be DNS only, not proxied.** Cloudflare cannot proxy
mail, and proxying `webmail` would break delivery. This is the one mistake in
this procedure that would actually hurt.

`_domainconnect` is GoDaddy plumbing and is not needed at Cloudflare.

---

## Steps

1. Create a free Cloudflare account and **Add a site**, `isomlab.com`. Choose
   the Free plan.
2. Cloudflare scans the existing zone. **Check its import against the table
   above, row by row.** It usually finds everything but does not always mark the
   proxy state the way you want.
3. Set the proxy state: orange cloud (Proxied) on the four A, four AAAA and the
   `www` CNAME. Grey cloud (DNS only) on `MX` and `webmail`.
4. **SSL/TLS → Overview → set the mode to "Flexible".** Cloudflare then serves
   HTTPS to visitors and talks to GitHub over HTTP, which works because GitHub
   has no certificate for this name yet. Do not use Full (strict): it would fail
   for exactly that reason.
5. Cloudflare gives you two nameservers. Enter them at GoDaddy under
   **Domain → Nameservers → Change → I'll use my own**, replacing
   `ns39`/`ns40.domaincontrol.com`.
6. Wait for propagation, usually well under an hour.
7. Tell me, and I will verify every record, confirm mail still resolves, and
   confirm HTTPS serves your site rather than a warning.

## Afterwards

- Once GitHub eventually issues its certificate, switch SSL/TLS mode from
  Flexible to **Full**. Nothing else changes.
- Leave GitHub's "Enforce HTTPS" **off** while in Flexible mode.
- Cloudflare also lets you turn on "Always Use HTTPS", which makes the Wix HSTS
  leftover harmless instead of a problem.

## Reverting

Point the nameservers back to `ns39`/`ns40.domaincontrol.com` at GoDaddy. The
GoDaddy zone still holds every record listed above, so the site and mail return
to their current state.
