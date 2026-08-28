// Prose carried over from the current isomlab.com homepage, lightly tightened.
// Each area gets its own section on /research and a card on the homepage.
export const areas = [
  {
    id: 'ph-sensing',
    number: '01',
    title: 'How cells sense and adapt to tumor acidity',
    lede: "Proton binding as a signal and regulator — from individual proteins to cells and tumors.",
    body: [
      "Acidity is information. pH varies across tissues and within the compartments of every cell. Tumors, inflamed tissues, endosomes, and other acidic environments expose proteins to very different concentrations of protons. Proteins can read these differences through networks of charged amino acids whose ionization changes with their surroundings, allowing changes in acidity to alter protein structure and function.",
      "We study this process from the residue upward through electroinformatics — mapping charge networks and titratable surfaces across predicted and experimental protein structures to discover where proton binding can change what a protein does. Any protein with the right network of charged residues is a potential pH sensor. G protein-coupled receptors have provided an important proving ground for this idea, but they represent one example of a much broader principle: protons can act as biological signals.",
      "At the scale of the whole cell, we ask how cells sense, regulate, and ultimately adapt to acidity. This ability becomes particularly important in cancer, where cells must survive and function within an acidic tumor microenvironment. Using genetically encoded pH biosensors, we can follow these adaptations in living cells and investigate the molecular mechanisms that allow cancer cells to thrive under conditions that challenge normal cells.",
    ],
    keywords: ['proton sensing', 'electroinformatics', 'pH-dependent function', 'GPCR signaling', 'tumor microenvironment', 'pH biosensors'],
  },
  {
    id: 'dark-proteome',
    number: '02',
    title: 'The hidden world of dark proteins',
    lede: 'Roughly 30% of human proteins remain structurally and functionally uncharacterized.',
    body: [
      'A large share of the human proteome — about 30 percent — remains poorly understood. These are the dark proteins: we know little about their structure and less about what they do.',
      'We work to bring them into view, particularly those with hidden roles in cell biology, cancer, and other diseases. The most elusive we call "superdark" proteins: they adopt folds similar to known proteins while sharing almost no sequence identity, which makes them invisible to conventional homology tools. AI-based structure prediction has finally made them tractable, and we use it to ask how they contribute to health and disease.',
    ],
    keywords: ['dark proteome', 'superdark proteins', 'structure prediction', 'AlphaFold'],
  },
  {
    id: 'intercellular-exchange',
    number: '03',
    title: 'How cells connect, cooperate, and compete for materials',
    lede: 'The modalities of intercellular communication — direct bridges, secreted vesicles, and the cargo they move.',
    body: [
      'Cells move material between one another through several distinct modalities. Some connect directly, building bridges that carry cargo from cytoplasm to cytoplasm; others release extracellular vesicles — exosomes among them — that travel and are taken up at a distance. We recently identified a set of proteins that build such bridges and support the transfer of biological cargo, including vesicles and in some cases whole organelles.',
      'Whichever route the cargo takes, the exchange can cut both ways. The same machinery that lets cells cooperate, pooling resources and buffering one another against stress, could equally let them compete, with one cell drawing cargo from a neighbor at that neighbor\'s expense. Which behavior dominates, and what decides it, is an open question we are actively pursuing.',
      'These proteins are more active in certain cancers, which suggests tumors may exploit them to sustain growth or resist stress. The finding has opened a new direction for the lab and sharpened our picture of how cells communicate in both healthy and diseased tissue.',
    ],
    keywords: ['intercellular communication', 'extracellular vesicles', 'exosomes', 'tunneling nanotubes', 'organelle exchange', 'cryo-CLEM'],
  },
];

export const approaches = [
  {
    title: 'Computational tools',
    body: 'We build the analysis we need rather than adapting it: electroinformatics across predicted structures, CRISPR guide and chimera design across whole reading frames, quantitative measurement of vesicle transfer and cell–cell bridges in live-cell imaging, and literature-scale hypothesis mining. All of it is released as open-source software.',
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
