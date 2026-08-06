import { SITE_URL } from './constants';

interface Meta {
  title: string;
  description: string;
  path?: string;
  /** Cale absolută sau relativă la imaginea de partajare. */
  image?: string;
  /** Tipul Open Graph. Profilul rămâne implicit pentru paginile despre persoană. */
  type?: 'profile' | 'article' | 'website';
}

const JSONLD_ID = 'jsonld-pagina';

/** Scrie titlul, descrierea, canonical și etichetele Open Graph în <head>. */
export function applyMeta({ title, description, path = '/', image, type = 'profile' }: Meta): void {
  document.title = title;

  const url = `${SITE_URL}${path}`;

  setTag('meta[name="description"]', 'meta', { name: 'description', content: description });
  setTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
  setTag('meta[property="og:description"]', 'meta', {
    property: 'og:description',
    content: description,
  });
  setTag('meta[property="og:type"]', 'meta', { property: 'og:type', content: type });
  setTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: url });
  setTag('meta[property="og:locale"]', 'meta', { property: 'og:locale', content: 'ro_RO' });
  setTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });

  const card = image ? 'summary_large_image' : 'summary';
  setTag('meta[name="twitter:card"]', 'meta', { name: 'twitter:card', content: card });
  setTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: title });
  setTag('meta[name="twitter:description"]', 'meta', {
    name: 'twitter:description',
    content: description,
  });

  if (image) {
    const abs = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    setTag('meta[property="og:image"]', 'meta', { property: 'og:image', content: abs });
    setTag('meta[property="og:image:width"]', 'meta', { property: 'og:image:width', content: '1200' });
    setTag('meta[property="og:image:height"]', 'meta', { property: 'og:image:height', content: '630' });
    setTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: abs });
  }
}

/** Injectează un bloc JSON-LD unic pe pagină. Îl curăță la ieșire. */
export function applyJsonLd(data: unknown): () => void {
  removeJsonLd();
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = JSONLD_ID;
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
  return removeJsonLd;
}

function removeJsonLd(): void {
  document.getElementById(JSONLD_ID)?.remove();
}

function setTag(selector: string, tag: 'meta' | 'link', attrs: Record<string, string>): void {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}
