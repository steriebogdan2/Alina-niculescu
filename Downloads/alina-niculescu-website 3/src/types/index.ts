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
  /** Variantele JPEG, pentru browserele fără WebP. */
  jpgSet: string;
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
  /** Adresa folosită de pictograma de e-mail din copertă. */
  email: string;
}

export interface DualityCard {
  name: string;
  voice: 'strong' | 'soft';
  text: string;
}

export interface AboutEntry {
  name: string;
  text: string;
  kicker?: string;
}

export interface AboutChapter {
  label: string;
  title: string;
  intro?: string;
  body?: string[];
  items?: AboutEntry[];
  /** Identificatorul unei imagini din galerie, afișată între capitole. */
  image?: string;
}

export interface About {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  welcome: string[];
  /** Dipticul de pe pagina principală. */
  duality: DualityCard[];
  /** Citatul evidențiat de pe pagina principală. */
  pull: { text: string; source: string };
  beauty: AboutChapter;
  awards: AboutChapter;
  academic: AboutChapter;
  ambassador: AboutChapter;
}

export interface GalleryImage {
  /** Cheie stabilă, folosită la randare și la deep-link în lightbox. */
  id: string;
  src: string;
  srcSet: string;
  /** Variante pentru <source type="image/webp">. */
  webpSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Punctul de interes al cadrului, ex. "50% 24%". */
  position?: string;
  /** Substitut minuscul, afișat neclar până sosește imaginea reală. */
  lqip?: string;
  /** Autorul fotografiei, afișat discret în lightbox. */
  credit?: string;
  /** Cheia categoriei din care face parte, folosită la filtrare. */
  category?: string;
}

export interface StoryChapter {
  label: string;
  title: string;
  paragraphs: string[];
  accents?: string[];
}

export interface StoryVideo {
  label: string;
  title: string;
  youtubeId: string;
  caption: string;
}

export interface TurkishPress {
  label: string;
  title: string;
  images: string[];
}

export interface Story {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  metaLine: string;
  seo: { title: string; description: string; ogImage: string };
  cover: GalleryImage;
  paragraphs: string[];
  chapter2: StoryChapter;
  video: StoryVideo;
  /** Subșiruri exacte din paragrafe, evidențiate tipografic la randare. */
  accents?: string[];
  gallery: GalleryImage[];
}

export interface Achievement {
  year: string;
  title: string;
  org: string;
  rank: string;
  /** Identificatorul unei imagini din galerie, dacă există una potrivită. */
  image?: string;
  location?: string;
  /** Locuri pregătite pentru fotografii. Șirul gol lasă locul liber. */
  gallery?: string[];
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface Gallery {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lede: string;
  seo: { title: string; description: string; ogImage: string };
  categories: GalleryCategory[];
  images: GalleryImage[];
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
  /** Numele pictogramei. Fără el, rubrica apare doar pe pagina de contact. */
  icon?: 'instagram' | 'tiktok' | 'facebook';
}

export interface Credit {
  prefix: string;
  name: string;
  url: string;
  instagram: string;
}

export interface SiteContent {
  person: Person;
  nav: NavItem[];
  hero: Hero;
  pressBand: string[];
  about: About;
  story: Story;
  gallery: Gallery;
  achievements: Achievement[];
  videos: { tv: VideoItem[]; studio: VideoItem[]; stage: VideoItem[] };
  press: PressItem[];
  printClipping: PrintClipping;
  social: SocialItem[];
  credit: Credit;
  turkishPress: TurkishPress;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
