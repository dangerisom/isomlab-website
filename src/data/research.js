// Prose carried over from the current isomlab.com homepage, lightly tightened.
// Each area gets its own section on /research and a card on the homepage.
export const areas = [
  {
    id: 'ph-sensing',
    number: '01',
    title: 'How cells sense and respond to acidity',
    lede: 'Proton-sensing GPCRs, and how cells adapt to acidic environments.',
    body: [
      'We study how cells detect and respond to changes in acidity — a signal that matters throughout the body, and especially in inflamed tissue, tumors, and internal compartments such as endosomes.',
      'Our focus is on G protein-coupled receptors (GPCRs), the proteins cells use to read their surroundings. We have found that many of these receptors only function properly within a narrow pH range, meaning acidity itself gates their activity. We also study how cells adjust to acidic conditions over time — an adaptation that is essential for survival in environments like the tumor microenvironment.',
    ],
    keywords: ['GPCR signaling', 'proton sensing', 'tumor microenvironment', 'pH biosensors'],
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
    body: 'AI-based structure prediction, molecular docking, and quantitative image analysis of living cells — used to find patterns that are not visible experimentally and to make testable predictions about protein function.',
  },
  {
    title: 'Laboratory experiments',
    body: 'Pharmacology, cell biology, and physics applied to signaling: synthetic biology to reprogram cells, genetic screens, advanced light microscopy, mass spectrometry, and — increasingly — cryo-electron microscopy and cryo-electron tomography.',
  },
  {
    title: 'Model systems',
    body: 'Patient-derived cancer cells, established human cell lines, budding yeast, and the nematode C. elegans. Each exposes a different face of the same biology and helps us judge what will translate.',
  },
];
