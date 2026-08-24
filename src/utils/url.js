const FILE_BUILD = import.meta.env.PUBLIC_FILE_BUILD === '1';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the deploy base so preview and live both work. */
export function url(path = '/') {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;

  if (FILE_BUILD) {
    // Assets keep their extension; routes become sibling .html files, so the
    // whole thing browses correctly from a folder with no server involved.
    // Split the fragment off first -- "/research#ph-sensing" must become
    // "./research.html#ph-sensing", not "./research#ph-sensing.html".
    const [route, hash = ''] = clean.split('#');
    const frag = hash ? `#${hash}` : '';
    if (/\.[a-z0-9]+$/i.test(route)) return `.${route}${frag}`;
    return route === '/' ? `./index.html${frag}` : `.${route}.html${frag}`;
  }

  return `${BASE}${clean}` || '/';
}

/** True when `href` is the current page (or an ancestor of it). */
export function isActive(href, pathname) {
  if (FILE_BUILD) {
    const here = pathname.split('/').pop() || 'index.html';
    const there = url(href).split('/').pop();
    return here === there;
  }
  const cur = pathname.replace(/\/+$/, '') || '/';
  const target = `${BASE}${href.startsWith('/') ? href : `/${href}`}`.replace(/\/+$/, '') || '/';
  if (target === (BASE || '/')) return cur === (BASE || '/');
  return cur === target || cur.startsWith(target + '/');
}
