# Ranking for "Daniel Isom"

**Why this exists.** The TM184C coverage in September 2026 created an attention
window, and links earned during one compound afterwards. This is the worklist
for using it. Written 2026-09-15.

## Where things actually stood on 2026-09-15

Searching **"Daniel Isom" University of Miami pharmacology** returned, in order:
a UNC seminar announcement, an InventUM story about the Pap Corps chair, the
Miller School faculty page, a second InventUM story, the ResearchGate profile,
the Pharmacology department faculty page, an ASPET election bio, the Dr GPCR
podcast episode, and a ResearchGate lab page.

**isomlab.com did not appear at all.**

That is the whole problem in one line. Nine results about Dan, none of them his.
Google had no reason to rank isomlab.com for his name, because almost nothing
authoritative linked to it and nothing on it declared that the site and the
person are the same entity.

## What has been done already

| date | change |
|---|---|
| 2026-09-15 | `/superdark` published. The first page on the site that is actually about TM184C rather than citing it |
| 2026-09-15 | Google Scholar profile added to `site.js`, the footer and the contact page. It had been `scholar: null` |
| 2026-09-15 | The PI in the site's structured data now carries a `sameAs` list covering ORCID, Scholar, LinkedIn and X |

The `sameAs` list is the important one and the least visible. It is the
machine-readable claim that those four profiles and this website are one person.
Without it, Google sees five unconnected things.

## 2026-09-15, later the same day: isomlab.com reached position four

The name query now returns the Miller School faculty page, the Esploro scholarship profile,
the UHealth lab page, **isomlab.com**, LinkedIn, the Miller School faculty directory,
ResearchGate, and a second UHealth lab page. So the site went from absent to fourth within a
day of the `/superdark` page, the Scholar link and the `sameAs` set going up.

Do not read too much into the speed. The TM184C coverage was driving traffic and links on its
own, and a day is fast for Google to reflect structured data. The honest reading is that the
site became eligible and something pushed it in.

### Half of page one is currently broken

Measured 2026-09-15 12:42 UTC. **`med.miami.edu` and `umiamihealth.org` both refuse
connections**, on TCP 80 and 443, from two independent network paths. They share the Azure
address `4.255.74.232`. `pharmacology.med.miami.edu` is down too on a different address, and
`sylvester.org` redirects into the dead host.

| page-one result | state |
|---|---|
| med.miami.edu faculty profile | **down** |
| scholarship.miami.edu Esploro profile | up |
| umiamihealth.org lab page | **down** |
| isomlab.com | up |
| LinkedIn | up |
| med.miami.edu faculty directory | **down** |
| ResearchGate | up |
| umiamihealth.org Isom Lab | **down** |

`news.med.miami.edu`, which is InventUM, is on a different host and is fine, as are
`welcome.miami.edu`, `scholarship.miami.edu` and `www.miami.edu`. So this is the Miller
School and UHealth web platform specifically, not UM as a whole.

**What it means for this worklist.** If it is a short outage, nothing. If it persists for
weeks, Google will start dropping those pages, which would lift isomlab.com by subtraction
rather than by merit. Either way the med.miami.edu backlink, which is item 1 below and the
most valuable thing on the list, cannot be pursued until the platform is back.

**Resolved.** On 2026-09-19 `med.miami.edu` and the Sylvester lab page on `umiamihealth.org`
both answer normally. The outage lasted at most four days, which is short enough that Google
will not have dropped anything, so the page-one picture from 2026-09-15 still stands.

## What to do next, highest value first

### 1. Get the authoritative pages to link isomlab.com

This is worth more than everything else on this list combined, and none of it is
a code change. **The drafted requests are kept out of this repo**, in a local
`institutional_profiles/` folder, one per page. This repo is public and an unsent
request to somebody's web team does not belong on it.

- **The Miller School faculty page**, `med.miami.edu/faculty/daniel-isom-phd`.
  It already outranks isomlab.com. A link from a `med.miami.edu` page is the
  strongest single signal available here. **A thirteen item edit list was drafted
  2026-09-19 and is ready for Dan to send.** The useful discovery: the page turned
  out to have a "Research/Lab Website" link already, pointing at the Sylvester page
  on `umiamihealth.org` rather than at isomlab.com, so the ask is to repoint it
  rather than to add one. **Check that before assuming any other profile simply
  lacks a link.** The same request asks for three links to isomlab.com in all, and
  each one asks explicitly for a real hyperlink rather than a printed address,
  because a plain-text URL passes almost nothing.
- **InventUM**, `news.med.miami.edu`. They have covered Dan twice and both
  stories rank. Ask UM communications for a piece on the Nature paper, and ask
  specifically that it link `isomlab.com/superdark`, not only the faculty page.
  Offer them the layman definition of superdark, which is already written and is
  exactly what a press office wants.
- **The Pharmacology department faculty listing** and the **ASPET bio**. Both
  rank, both are editable by request.
- **Google Scholar**, in the profile settings, has a **Homepage** field. Set it
  to `https://www.isomlab.com`.
- **ORCID** `0000-0001-5637-2370`. Add the website under Websites and make it
  public, and check that the employment record says Associate Professor.

### 2. Fix ResearchGate

The profile renders the position as "Professor (Assistant)" and puts him in
Coral Gables. It is a top five result on his own name and it is wrong on both
counts. It should read **Associate Professor with Tenure**, Department of
Molecular and Cellular Pharmacology, University of Miami Miller School of
Medicine, Miami, since 2023.

Needs his login, so it is his to do. Two minutes.

### 3. Use one spelling of the name, everywhere

Google treats "Daniel Isom", "Daniel G. Isom", "DG Isom" and ResearchGate's
"Daniel ISOM" as evidence about one entity only when something ties them
together. Publications will always use the initial form. Every profile and page
that can be edited should say **Daniel G. Isom**.

### 4. Give him his own page on the site

There is no page whose subject is Dan. `people.astro` is one page listing nine
people, which is a weak target for a name query. A dedicated page at
`/people/daniel-isom`, carrying `Person` structured data with the same `sameAs`
list, a real biography, and the training history, is the standard and effective
answer to a name search. It is also the page that press and seminar hosts will
link to instead of a faculty directory.

### 5. Wikidata, not Wikipedia

**Do not write a Wikipedia article about yourself.** Conflict of interest
editing gets reverted and the attempt is visible forever.

**Wikidata is different** and is the better target anyway, because it feeds
Google's Knowledge Graph, which is what produces the panel on the right of a
search result. Items for researchers are routinely created from ORCID and
publication data, and the notability bar is a matter of being a cited author
rather than of fame. Check for an existing item first, through Scholia or by
searching Wikidata for the ORCID. If one exists, make sure it carries the
employer, the ORCID, the Google Scholar ID, and the official website. If a
Wikipedia article ever appears, written by someone else, it will outrank nearly
everything, and the legitimate route is a talk page suggestion with the
affiliation disclosed.

### 6. Let the coined term do the work

"TMEM184C" cannot be won. Page one is GeneCards, the Human Protein Atlas, NCBI
Gene, OMIM, MGI, the Rat Genome Database and antibody vendors, and those domains
have twenty years of authority.

**"Superdark" can be won outright**, because it is Dan's coinage and almost
nobody else uses it. Use the word consistently in talks, abstracts, press and
slide titles. The AACR abstract already uses "superdark transmembrane protein
184C", which is exactly right. Every use of the term by someone else is a link
or a mention pointing back at the person who coined it.

## What not to bother with

Buying SEO services. Keyword stuffing the site. Chasing the bare gene symbol.
None of these move the results above.

## What to expect

Slow. Google takes weeks to reflect new links and structured data, and the
`sameAs` and Scholar changes from 2026-09-15 will not show for a while. The
right measure is whether isomlab.com appears at all for the name query, not what
position it holds. Re-check in a month.
