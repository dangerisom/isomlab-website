# Cutting over isomlab.com to GitHub Pages

Written 2026-08-29, from the live DNS rather than from memory. **The README's old
cutover section was wrong on one important point** and is replaced by this file.

## What is actually true today

| | |
|---|---|
| Registrar | GoDaddy |
| **DNS is served by** | **Wix** (`ns14.wixdns.net`, `ns15.wixdns.net`) |
| Website | Wix, serving `https://www.isomlab.com` and redirecting the apex |
| New site | Live at https://dangerisom.github.io/isomlab-website/ |

**The README said to change DNS at GoDaddy. That would have done nothing.** GoDaddy
is only the registrar. Wix's nameservers are authoritative, so records edited at
GoDaddy are inert until the nameservers change.

## The records currently in the zone

Everything Wix is serving. Anything not recreated will stop working.

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | @ | 185.230.63.171, .107, .186 | Wix website. **Replaced.** |
| A / CNAME | www | Wix CDN | Wix website. **Replaced.** |
| **MX** | **@** | **0 webmail.isomlab.com** | **Email. Must survive.** |
| **A** | **webmail** | **107.180.47.6** (GoDaddy) | **Mail host. Must survive.** |

No SPF, no DMARC, no other TXT, no other subdomains.

**There is live email on this domain.** The MX points at GoDaddy's mail hosting. If
the nameservers move and these two records are not recreated, mail stops. This is
the single most likely way to break something that has nothing to do with the
website.

**DNSSEC is not a problem.** The zone is signed by Wix, but there is no DS record
at the `.com` parent, so it is not in the chain of trust and changing nameservers
will not black-hole the domain. Checked 2026-08-29.

## Which route

**Move DNS to GoDaddy.** Do not simply edit the records inside Wix. The plan is to
cancel Wix, and if Wix is still serving DNS when the plan lapses, the domain loses
name resolution entirely, website and email together. Moving DNS to the registrar
removes Wix from the critical path before it is cancelled.

## Order of operations

The order below keeps the Wix site serving until the moment DNS flips, so there is
no window where isomlab.com is down.

Note that step 1 **breaks the preview URL**, because the site is rebuilt to live at
the root of a domain rather than under `/isomlab-website`. That is expected and
temporary. Do not interpret it as a failed deploy.

### 1. Rebuild the site for the live domain

GitHub → repo **Settings → Secrets and variables → Actions → Variables**:

| Variable | Value |
|---|---|
| `SITE_URL` | `https://www.isomlab.com` |
| `SITE_BASE` | `/` |

Then run the **Build and deploy** workflow (Actions tab, Run workflow) so the build
picks them up.

### 2. Claim the domain in GitHub, before DNS points at it

**Settings → Pages → Custom domain** → `www.isomlab.com` → Save.

This writes a `CNAME` file into the repo. GitHub will report the DNS check as
failing, which is correct at this point and is why this step comes first: when DNS
does arrive, GitHub is already expecting it.

Leave **Enforce HTTPS** unticked for now. The certificate cannot be issued until
DNS resolves here.

### 3. Move the nameservers to GoDaddy

GoDaddy → **My Products → Domains → isomlab.com → Nameservers → Change** → choose
GoDaddy's default nameservers.

Propagation is typically under an hour but the registry can take up to 48. Until it
completes, Wix is still answering and the site keeps working.

### 4. Create the records at GoDaddy

GoDaddy → **isomlab.com → DNS → Manage Zones**. Create exactly these:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | dangerisom.github.io | 600 |
| **MX** | **@** | **webmail.isomlab.com**, priority 0 | 3600 |
| **A** | **webmail** | **107.180.47.6** | 3600 |

The four apex A records are GitHub's published Pages addresses. The last two rows
are the email records carried over from Wix. Use a short TTL of 600 on the website
records so a mistake can be corrected quickly, and raise it later once it is stable.

Delete any Wix A or CNAME records GoDaddy pre-populates for `@` and `www`.

### 5. Verify before trusting it

    dig +short A isomlab.com          # expect the four 185.199.x.x addresses
    dig +short CNAME www.isomlab.com  # expect dangerisom.github.io.
    dig +short MX isomlab.com         # expect 0 webmail.isomlab.com.
    dig +short NS isomlab.com         # expect GoDaddy nameservers
    curl -sI https://www.isomlab.com | head -1

**Send yourself an email at the domain and confirm it arrives.** DNS tools will not
tell you that mail is broken.

### 6. Enforce HTTPS

Once `https://www.isomlab.com` serves the new site, return to **Settings → Pages**
and tick **Enforce HTTPS**. The certificate is issued automatically and can take
up to an hour after DNS resolves.

### 7. Only then, cancel Wix

Leave the Wix plan running for at least a few days after the new site is serving
correctly. It costs one more billing cycle and it is the rollback path.

## Rollback

Before step 3, rollback is instant: undo the GitHub variables and remove the custom
domain.

After step 3, rollback means pointing the apex and www records back at Wix's
addresses, listed in the table at the top of this file. This is why those values are
recorded here rather than left to be recovered from a cached screenshot.
