/**
 * Lab roster.
 *
 * `needsReview: true` marks an entry whose full name was inferred from the author
 * list of the Nature manuscript matched against the photo filenames on the current
 * Wix site. Titles and blurbs could not be inferred from any available source --
 * the existing People page carries photos only, with no text at all.
 *
 * Fill in `title` and `blurb`, correct any name, then delete the needsReview flag.
 * Entries with an empty title still render; they just show the name and photo.
 */
export const people = [
  {
    slug: 'daniel-isom',
    name: 'Daniel G. Isom, Ph.D.',
    title: 'Principal Investigator',
    role: 'pi',
    photo: 'dan.jpg',
    orcid: '0000-0001-5637-2370',
    blurb:
      '', // TODO: 2-3 sentences -- training, what drew you to pH sensing and the dark proteome.
    links: {
      scholar: null,
      github: 'https://github.com/dangerisom',
      twitter: 'https://twitter.com/danIsomLab',
    },
  },
  { slug: 'kyutae-lee',  name: 'Kyutae Lee',  title: '', role: 'member', photo: 'kyutae.jpg',   blurb: '', needsReview: true },
  { slug: 'sam-taylor',  name: 'Sam Taylor',  title: '', role: 'member', photo: 'sam.jpg',      blurb: '', needsReview: true },
  { slug: 'jennifer-arcuri', name: 'Jennifer Arcuri', title: '', role: 'member', photo: 'jen.jpg', blurb: '', needsReview: true },
  { slug: 'shraddha-chandthakuri', name: 'Shraddha Chandthakuri', title: '', role: 'member', photo: 'shraddha.jpg', blurb: '', needsReview: true },
  { slug: 'bruno-colon', name: 'Bruno Colon', title: '', role: 'member', photo: 'bruno.jpg',    blurb: '', needsReview: true },
  { slug: 'jacinda-pujols', name: 'Jacinda Pujols', title: '', role: 'member', photo: 'jacinda.jpg', blurb: '', needsReview: true },
];

export const alumni = [
  // { name: '', years: '', now: '' },
];
