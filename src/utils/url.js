const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the deploy base so preview and live both work. */
export function url(path = '/') {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}` || '/';
}

/** True when `href` is the current page (or an ancestor of it). */
export function isActive(href, pathname) {
  const here = pathname.replace(/\/+$/, '') || '/';
  const there = url(href).replace(/\/+$/, '') || '/';
  if (there === (BASE || '/')) return here === (BASE || '/');
  return here === there || here.startsWith(there + '/');
}
