/**
 * Released lab software. Blurbs are curated here; `version` is refreshed from the
 * GitHub API by `npm run sync:software` so the page cannot silently go stale.
 */
export const software = [
  {
    name: 'pam_scanning',
    repo: 'isomlab/pam_scanning',
    version: 'v1.0.1',
    blurb:
      'Design CRISPR/Cas9 guide RNAs and chimera-insertion primers across an entire ORF, with synonymous PAM silencing and BLAST+ off-target screening.',
    tags: ['CRISPR', 'guide design', 'yeast'],
    conda: 'bioconda',
  },
  {
    name: 'bioleads',
    repo: 'isomlab/bioleads',
    version: 'v0.2.0',
    blurb:
      'Mine the biomedical literature for enriched terms, co-occurrence networks, and Swanson-style hypothesis leads.',
    tags: ['literature mining', 'hypothesis generation'],
    conda: 'bioconda',
  },
  {
    name: 'litlog',
    repo: 'isomlab/litlog',
    version: 'v0.1.1',
    blurb:
      'A local-first tracker for the papers you read and how they interconnect, written as LLM-trainable tagged text.',
    tags: ['reading', 'knowledge graph'],
    conda: 'bioconda',
  },
  {
    name: 'pHinder',
    repo: 'isomlab/pHinder',
    version: null,
    blurb:
      'Ionizable-residue network and surface analysis for protein structures — the lab’s long-running tool for locating and characterizing titratable networks.',
    tags: ['structure analysis', 'electrostatics'],
    conda: null,
  },
  {
    name: 'vesicle_colocalization_quantifier',
    repo: 'isomlab/vesicle_colocalization_quantifier',
    version: null,
    blurb: 'Interactive two-channel vesicle co-localization quantification for microscopy images.',
    tags: ['imaging', 'colocalization'],
    conda: null,
  },
  {
    name: 'bpp_identifier',
    repo: 'isomlab/bpp_identifier',
    version: null,
    blurb: 'Quantify bridges, projections, and protrusions at cell–cell boundaries in microscopy overlays.',
    tags: ['imaging', 'intercellular bridges'],
    conda: null,
  },
  {
    name: 'vesicle_triangulator',
    repo: 'isomlab/vesicle_triangulator',
    version: null,
    blurb: 'Reconstruct the topology of vesicle-transfer events by Delaunay triangulation of 2D coordinates.',
    tags: ['imaging', 'geometry'],
    conda: null,
  },
  {
    name: 'isomlab',
    repo: 'isomlab/isomlab',
    version: null,
    blurb:
      'The shared computational-geometry and PDB/mmCIF core underneath the tools above. Each released tool vendors its own copy, so you never need this to install one — it is the upstream where fixes are made.',
    tags: ['core library'],
    conda: null,
    isCore: true,
  },
];

export const guides = [
  {
    title: 'Setting up your computer',
    href: 'https://dangerisom.github.io/Isom-Lab/setup/',
    blurb: 'One-time, no-typing setup for Mac or Windows.',
  },
  {
    title: 'Getting started with a lab tool',
    href: 'https://dangerisom.github.io/Isom-Lab/getting-started/',
    blurb: 'Downloading, launching, updating, and troubleshooting any of the tools.',
  },
];

/**
 * Legacy: code that predates the released tools above and is kept as it was
 * published, with its own explanatory pages rather than a packaged install.
 * Deliberately last on the page.
 */
export const legacy = [
  {
    title: 'superdarks',
    href: 'https://dangerisom.github.io/Isom-Lab/github_website/projects/superdarks/',
    blurb:
      'The structural-homology pipeline behind the TM184C paper: a TM-align sweep of a query structure against the AlphaFold Database on up to 1,000 compute nodes, then four stages of hit filtering, enrichment and networking. Presented as annotated, downloadable scripts with a page per stage.',
    links: [
      { label: 'The paper in Nature (2026)', href: 'https://doi.org/10.1038/s41586-026-10993-8' },
      { label: 'Code on Zenodo (MIT)', href: 'https://doi.org/10.5281/zenodo.21175708' },
      { label: 'Datasets S1–S4 on Zenodo (CC BY 4.0)', href: 'https://doi.org/10.5281/zenodo.21178101' },
    ],
  },
];
