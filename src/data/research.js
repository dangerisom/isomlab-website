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
    keywords: ["proton sensing", "electroinformatics", "tumor acidity", "acid adaptivity"],
  },
  {
    id: 'dark-proteome',
    number: '02',
    title: 'The hidden world of dark proteins',
    lede: "Some of the next important targets in cancer may be proteins we barely understand.",
    body: [
      "Despite decades of biomedical research, a large part of the human proteome remains poorly understood. These dark proteins represent an enormous unexplored landscape of human biology. Among them may be dark cancer targets: proteins that contribute to tumor growth, survival, adaptation, or communication but have remained largely outside the reach of conventional cancer research.",
      "Our lab develops new ways to bring this hidden biology into view. We are particularly interested in the most elusive proteins, which we call “superdark” proteins. Their amino acid sequences can look almost nothing like proteins we already understand, allowing them to escape conventional methods of discovery even when their three-dimensional structures reveal remarkable similarities to well-known protein families.",
      "Artificial intelligence is changing what is possible. By combining AI-based protein structure prediction, large-scale computation, and experiments in living cells, we can systematically search the dark proteome, uncover what these proteins do, and determine whether they reveal previously unknown mechanisms of cancer and other diseases.",
    ],
    keywords: ["superdark proteins", "dark cancer targets", "high-risk high reward", "therapeutic potential"],
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
    keywords: ["intercellular communication", "intercellular cooperation", "intercellular competition", "intercellular exploitation"],
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
