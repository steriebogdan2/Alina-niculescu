export interface NavItem {
  label: string;
  path: string;
}

export interface Cta {
  label: string;
  path: string;
}

export interface Person {
  fullName: string;
  firstName: string;
  secondName: string;
  surname: string;
  roles: string[];
  currentTitle: string;
  hometown: string;
  basedIn: string;
  email: string;
  siteUrl: string;
}

export interface Portrait {
  src: string;
  /** Variante de lățime, ca browserul să aleagă mărimea potrivită ecranului. */
  srcSet: string;
  alt: string;
  /** Punctul de interes al cadrului, ex. "50% 18%". */
  position: string;
}

export interface CoverLine {
  key: string;
  value: string;
}

export interface Hero {
  folioLeft: string;
  folioRight: string;
  /** Textul de pe eșarfa care traversează portretul. */
  sash: string;
  portraitSlot: string;
  portrait: Portrait | null;
  coverlines: CoverLine[];
  lede: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}

export interface DualityCard {
  name: string;
  voice: 'strong' | 'soft';
  text: string;
}

export interface About {
  eyebrow: string;
  headingA: string;
  headingB: string;
  intro: string[];
  path: string[];
  quote: { text: string; source: string };
  duality: DualityCard[];
  beyond: DualityCard[];
}

export interface Achievement {
  year: string;
  title: string;
  org: string;
  rank: string;
}

export type Orientation = 'landscape' | 'portrait';

export interface VideoItem {
  id: string;
  title: string;
  note: string;
  orientation: Orientation;
  duration: string;
  src: string;
  poster: string;
}

export interface PressItem {
  outlet: string;
  headline: string;
  url: string;
}

export interface PrintClipping {
  image: string;
  outlet: string;
  caption: string;
  text: string;
}

export interface SocialItem {
  label: string;
  url: string;
  handle: string;
}

export interface SiteContent {
  person: Person;
  nav: NavItem[];
  hero: Hero;
  pressBand: string[];
  about: About;
  achievements: Achievement[];
  videos: { tv: VideoItem[]; studio: VideoItem[]; stage: VideoItem[] };
  press: PressItem[];
  printClipping: PrintClipping;
  social: SocialItem[];
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
