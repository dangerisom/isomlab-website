/**
 * Lab roster.
 *
 * Titles, programs, and bios carried over from the Wix People page, where they
 * were present in the DOM but rendered on hover. Photo filenames map to
 * public/people/.
 */
export const people = [
  {
    slug: 'daniel-isom',
    name: 'Daniel Gerard Isom, PhD',
    title: 'Principal Investigator',
    role: 'pi',
    photo: 'dan.jpg',
    orcid: '0000-0001-5637-2370',
    appointments: [
      'Pap Corps Champions for Cancer Research Endowed Chair',
      'Associate Professor of Molecular and Cellular Pharmacology',
      'Sylvester Comprehensive Cancer Center',
    ],
    training: [
      'Undergrad: Case Western Reserve University',
      'Grad: Johns Hopkins, Molecular Biophysics',
      'Postdocs: Duke and UNC',
    ],
    blurb: '',
    links: {
      github: 'https://github.com/dangerisom',
      twitter: 'https://twitter.com/danIsomLab',
    },
  },
  {
    slug: 'bruno-colon',
    name: 'Bruno Colon',
    title: 'Graduate Student',
    program: 'Molecular and Cellular Pharmacology Program',
    role: 'member',
    photo: 'bruno.jpg',
    blurb:
      'I’m PhD student in the Isom Lab from Tampa, Fl. I earned a BS in Cell and Molecular Biology from the University of South Florida and an MS in Biomedicine from the University of Miami. I am currently pursuing a PhD in Molecular and Cellular Pharmacology. Outside the lab, I enjoy weightlifting, grilling at the beach, and checking out local breweries.',
  },
  {
    slug: 'shraddha-chandthakuri',
    name: 'Shraddha Chandthakuri',
    title: 'Graduate Student',
    program: 'Cancer Biology Program',
    role: 'member',
    photo: 'shraddha.jpg',
    blurb:
      "I'm a PhD Candidate in the Isom Lab from Kathmandu, Nepal. I earned my BS in Biomedical Sciences from Troy University and am currently working on understanding vesicle-associated functions of dark proteins. Outside the lab, I enjoy baking and learning new hobbies (currently into air clay modeling).",
  },
  {
    slug: 'jennifer-arcuri',
    name: 'Jennifer Arcuri, PhD',
    title: 'Senior Scientist',
    program: 'Director of exploratory mass spectrometry and confocal microscopy',
    role: 'member',
    photo: 'jen.jpg',
    // Carried over verbatim from Wix -- see the note in the README about this one.
    blurb:
      'I was born and raised in Europe by a nomadic band of gypsies that trained me in the dark art of confocal microscopy. I soon developed an interest in how heavy small things are and bartered a trade to a druid colony where I received additional training in mass spectroscopy. My friends will often hear me say, "If you can do mass spec in a cave, you can do it at UM."',
  },
];

/**
 * Former lab members. `years` and `now` are blank until Dan fills them in;
 * both are optional and simply omitted from the page when empty.
 */
export const alumni = [
  {
    name: 'Kyutae Lee',
    title: 'MD/PhD Student',
    program: 'Molecular and Cellular Pharmacology Program',
    years: '',
    now: '',
  },
  {
    name: 'Sam Taylor',
    title: 'Graduate Student',
    program: 'Cancer Biology Program',
    years: '',
    now: '',
  },
  {
    name: 'Jacinda Pujols',
    title: 'Graduate Student',
    program: 'Molecular and Cellular Pharmacology',
    years: '',
    now: '',
  },
];
