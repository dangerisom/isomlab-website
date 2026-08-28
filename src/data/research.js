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
    title: "How cells connect, cooperate, and compete",
    lede: "Cells share resources. Cancer cells may exploit these hidden networks to survive.",
    body: [
      "Cells do not live in isolation. They exchange materials, resources, and information with their neighbors in ways we are only beginning to understand. Some release tiny packages called extracellular vesicles that can travel to other cells. Others form direct physical bridges, creating cellular highways through which biological cargo can move from one cell to another — including proteins, vesicles, and even entire organelles.",
      "Our lab recently discovered proteins that help cells build these connections and transfer material between them. The discovery revealed an unexpected system of intercellular communication and raised a fundamental question: Why are cells sharing their resources?",
      "The answer may depend on context. Cells under stress could cooperate, sharing materials that help their neighbors survive. But the same machinery could enable competition, allowing one cell to acquire valuable resources at another cell's expense. We want to understand what determines who gives, who receives, and how these exchanges change the behavior of both cells.",
      "This question takes on particular importance in cancer. These newly discovered proteins are elevated in certain cancers, raising the possibility that tumor cells exploit intercellular exchange to acquire resources, adapt to hostile environments, or survive stresses that would otherwise limit their growth.",
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
