import raw from '@/data/site.json';
import type { SiteContent } from '@/types';

/** Punct unic de acces la conținut. Editează src/data/site.json, nu componentele. */
export const site = raw as unknown as SiteContent;

export const {
  person,
  nav,
  hero,
  pressBand,
  about,
  achievements,
  videos,
  press,
  printClipping,
  social,
} = site;
