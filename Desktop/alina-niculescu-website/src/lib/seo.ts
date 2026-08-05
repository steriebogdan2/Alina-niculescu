import { SITE_URL } from './constants';

interface Meta {
  title: string;
  description: string;
  path?: string;
}

/** Scrie titlul, descrierea, canonical și etichetele Open Graph în <head>. */
export function applyMeta({ title, description, path = '/' }: Meta): void {
  document.title = title;

  setTag('meta[name="description"]', 'meta', { name: 'description', content: description });
  setTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
  setTag('meta[property="og:description"]', 'meta', {
    property: 'og:description',
    content: description,
  });
  setTag('meta[property="og:type"]', 'meta', { property: 'og:type', content: 'profile' });
  setTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: `${SITE_URL}${path}` });
}

function setTag(selector: string, tag: 'meta' | 'link', attrs: Record<string, string>): void {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}
