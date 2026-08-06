export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://missalinaniculescu.tv';
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

export const ROUTES = {
  home: '/',
  about: '/despre',
  achievements: '/palmares',
  videos: '/video',
  gallery: '/galerie',
  press: '/presa',
  story: '/david-si-nihan',
  contact: '/contact',
  privacy: '/confidentialitate',
} as const;
