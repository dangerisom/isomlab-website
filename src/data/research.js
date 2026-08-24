// Prose carried over from the current isomlab.com homepage, lightly tightened.
// Each area gets its own section on /research and a card on the homepage.
export const areas = [
  {
    id: 'ph-sensing',
    number: '01',
    title: 'How cells sense and respond to acidity',
    lede: 'Proton binding as a signal — in proteins, in cells, and in acidic tissue.',
    body: [
      'Acidity is information. pH varies widely across tissues and across compartments within a single cell — inflamed tissue, tumors, endosomes — and proteins read those differences through networks of ionizable residues whose charge shifts with the surrounding proton concentration.',
      'We study this from the residue upward. Our structural work maps ionizable networks and titratable surfaces across predicted and experimental structures, locating the sites where proton binding is positioned to change what a protein does. Any protein carrying a charged network in the right place is a candidate; G protein-coupled receptors have been a productive proving ground, since many function only within a narrow pH range, but they are one case of a general principle rather than the boundary of the question.',
      'At the scale of the whole cell, we ask how acidity is sensed, buffered, and adapted to over time — an adaptation that is essential for survival in environments like the tumor microenvironment, and one we track with genetically encoded pH biosensors.',
    ],
    keywords: ['proton sensing', 'ionizable networks', 'pH-dependent function', 'GPCR signaling', 'tumor microenvironment', 'pH biosensors'],
  },
  {
    id: 'dark-proteome',
    number: '02',
    title: 'The hidden world of dark proteins',
    lede: 'Roughly 30% of human proteins remain structurally and functionally uncharacterized.',
    body: [
      'A large share of the human proteome — about 30 percent — remains poorly understood. These are the dark proteins: we know little about their structure and less about what they do.',
      'We work to bring them into view, particularly those with hidden roles in cancer. The most elusive we call "superdark" proteins: they adopt folds similar to known proteins while sharing almost no sequence identity, which makes them invisible to conventional homology tools. AI-based structure prediction has finally made them tractable, and we use it to ask how they contribute to health and disease.',
    ],
    keywords: ['dark proteome', 'superdark proteins', 'structure prediction', 'AlphaFold'],
  },
  {
    id: 'intercellular-exchange',
    number: '03',
    title: 'How cells connect, cooperate, and compete for materials',
    lede: 'Cellular bridges that carry vesicles — and even organelles — between cells, in cooperation and in competition.',
    body: [
      'We study how cells physically connect to move material between one another. We recently identified a set of proteins that build cellular bridges and support the transfer of biological cargo — vesicles, and in some cases whole organelles — from cell to cell.',
      'Those connections can cut both ways. The same machinery that lets cells cooperate, pooling resources and buffering one another against stress, could equally let them compete, with one cell drawing cargo from a neighbor at that neighbor\'s expense. Which behavior dominates, and what decides it, is an open question we are actively pursuing.',
      'These proteins are more active in certain cancers, which suggests tumors may exploit them to sustain growth or resist stress. The finding has opened a new direction for the lab and sharpened our picture of how cells communicate in both healthy and diseased tissue.',
    ],
    keywords: ['intercellular transfer', 'tunneling nanotubes', 'organelle exchange', 'resource competition', 'cryo-CLEM'],
  },
];

export const approaches = [
  {
    title: 'Computational tools',
    body: 'We build the analysis we need rather than adapting it: ionizable-residue and surface analysis of predicted structures, CRISPR guide and chimera design across whole reading frames, quantitative measurement of vesicle transfer and cell–cell bridges in live-cell imaging, and literature-scale hypothesis mining. All of it is released as open-source software.',
  },
  {
    title: 'Laboratory experiments',
    body: 'Pharmacology, cell biology, and physics applied to signaling: synthetic biology to reprogram cells, genetic screens to find what matters, advanced light microscopy to watch it happen, and mass spectrometry to measure what cells make. We are adding cryo-electron microscopy and tomography to resolve these structures in place.',
  },
  {
    title: 'Model systems',
    body: 'Patient-derived cancer cells, established human lines, budding yeast, and the nematode C. elegans. Each exposes a different face of the same biology — yeast for fast genetics, worms for whole-animal context, human cells for what is most likely to translate — and together they tell us which findings hold.',
  },
];
