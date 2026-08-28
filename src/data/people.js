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
    name: 'Daniel G. Isom, PhD',
    title: 'Principal Investigator',
    role: 'pi',
    photo: 'dan.jpg',
    orcid: '0000-0001-5637-2370',
    appointments: [
      'Pap Corps Champions for Cancer Research Endowed Chair',
      'Associate Professor of Molecular and Cellular Pharmacology',
      'Sylvester Comprehensive Cancer Center',
      'Frost Institute for Data Science and Computing',
    ],
    training: [
      'Undergrad: Case Western Reserve University',
      'Grad: Johns Hopkins, Molecular Biophysics',
      'Postdocs: Duke and UNC Chapel Hill',
    ],
    blurb: '',
    links: {
      github: 'https://github.com/dangerisom',
      twitter: 'https://twitter.com/danIsomLab',
    },
  },
  {
    slug: 'auristela-rivera',
    name: 'Auristela Rivera',
    title: 'Lab Manager',
    program: '',
    role: 'member',
    photo: 'auristela.jpg',
    blurb: 'I bring order to the Isom Lab’s disordered world.',
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
  {
    slug: 'saahit-adabala',
    name: 'Saahit Adabala',
    title: 'Medical Student',
    program: 'DREAM Scholar',
    role: 'member',
    photo: 'saahit.jpg',
    blurb:
      "I come from Tennessee, where I spent high school arguing competitively with strangers and college studying neuroscience and music composition. Somewhere in there I spent an unreasonable stretch of my twenties teaching a machine to write Bach chorales and compose jazz music. I'm now an MD/MPH student at UM and DREAM Scholar in the Isom Lab, and what I want out of all of it is to move medicine and therapeutics forward. Outside the lab, I play an indefensible amount of golf, make music, and write code."
  },
  {
    slug: 'robin-pyait',
    name: 'Robin Pyait',
    title: 'Masters Student',
    program: '',
    role: 'member',
    photo: 'robin.jpg',
    blurb:
      'I was born and raised in Myanmar, where Burmese pythons were occasionally part of the neighborhood scenery and milk tea at the nearest tea shop was a regular part of life. I came to the Isom Lab with two things I carry everywhere: a background in chemistry and a lot of questions. I graduated from the University of Miami with a B.S. in Chemistry, and my curiosity about how and why things work continues to drive my interest in science. Currently, I am studying compartment-specific pH regulation in glioblastoma (GBM) cells and exploring how these intracellular environments differ from normal cells. Outside the lab, I enjoy trying new restaurants, bar hopping, shopping, and traveling.',
  },
];

/**
 * Former lab members, generated from `formerLab` in the CV project's cv_data.js
 * (~/Documents/Claude/Projects/cv/build/cv_data.js), which is the authoritative
 * list. `now` is blank until filled in and is simply omitted when empty.
 */
export const alumni = [
  { name: 'Jacinda Pujols, PhD', title: 'Graduate Student', program: 'Molecular and Cellular Pharmacology', years: '2023–2026', now: '' },
  { name: 'Kyutae Lee, PhD', title: 'MD/PhD Student', program: 'Molecular and Cellular Pharmacology Program', years: '2021–2026', now: '' },
  { name: 'Sam Taylor, PhD', title: 'Graduate Student', program: 'Cancer Biology Program', years: '2022–2026', now: '' },
  { name: 'Blake Goldberg', title: 'University of Miami', years: '2022–2025', now: '' },
  { name: 'Danielle Bitter', title: 'SURF student', program: 'Florida State University', years: '2025', now: '' },
  { name: 'Frederik Hansson, PhD', title: 'Visiting student', program: 'Technical University of Denmark', years: '2024', now: '' },
  { name: 'Taveion Neasman', title: 'DICR student', program: 'University of Miami', years: '2024', now: '' },
  { name: 'Alex Weber', title: 'Medical Student', program: 'Pharmacology and Drug Development Pathway', years: '2022–2023', now: '' },
  { name: 'Dario D’Urso', title: 'University of Miami', years: '2022–2023', now: '' },
  { name: 'Mason Thornton', title: 'Medical Student', years: '2021–2023', now: '' },
  { name: 'Sharleen Cineas', title: 'Graduate Student (Masters)', years: '2022–2023', now: '' },
  { name: 'Sophie Bilik', title: 'Graduate Student (Masters)', years: '2022–2023', now: '' },
  { name: 'Gorav Surana', title: 'SURF student', program: 'University of Miami', years: '2021–2022', now: '' },
  { name: 'Jacob Rowe, PhD', title: 'Graduate Student (PhD)', program: 'Molecular and Cellular Pharmacology', years: '2018–2022', now: '' },
  { name: 'Douglas Obenrader', title: 'SURF student', program: 'University of Michigan', years: '2021', now: '' },
  { name: 'Geoffrey Taghon, PhD', title: 'Graduate Student (PhD)', program: 'Molecular and Cellular Pharmacology', years: '2017–2021', now: '' },
  { name: 'Nicholas Kapolka, PhD', title: 'Graduate Student (PhD)', program: 'Molecular and Cellular Pharmacology', years: '2017–2021', now: '' },
  { name: 'Santiago Vilar, PhD', title: 'Research Associate', years: '2020–2021', now: '' },
  { name: 'Yoland Victor', title: 'SURF student', program: 'University of Miami', years: '2021', now: '' },
  { name: 'Sofia Perez', title: 'SURF student', years: '2020', now: '' },
  { name: 'William Morgan', title: 'Research Associate', years: '2018–2020', now: '' },
  { name: 'Amrita Nalathambi, PhD', title: 'SURF student', years: '2019', now: '' },
];
