# Site personal Alexandra-Alina Niculescu

Site de prezentare construit cu **Vite + React 18 + TypeScript + Tailwind CSS**.
Tot conținutul stă într-un singur fișier de date, `src/data/site.json`, astfel încât
textele să poată fi modificate fără să umbli în componente.

---

## Pornire rapidă

```bash
npm install
npm run dev
```

Aplicația pornește pe <http://localhost:5173>.

| Comandă | Ce face |
| --- | --- |
| `npm run dev` | server de dezvoltare cu reîncărcare la salvare |
| `npm run build` | verifică tipurile și construiește în `dist/` |
| `npm run preview` | servește local rezultatul din `dist/` |
| `npm run lint` | rulează ESLint |

---

## Structura proiectului

```
public/          fișiere servite ca atare (imagini, clipuri, favicon, robots.txt)
  images/        fotografii și cadrele extrase din clipuri
  videos/        cele 20 de clipuri
  icons/         favicon, manifest
src/
  assets/        resurse importate din cod (fonturi locale, SVG-uri)
  components/
    ui/          piese mici, fără logică: Button, Arch, Container…
    layout/      Header, Footer, Section, PageHeader
    sections/    blocuri mari de pagină: Hero, VideoGrid, ContactForm…
    common/      piese reutilizate cu logică: Reveal, VideoCard, PressRow
  pages/         câte un fișier per rută
  data/site.json TOT conținutul editabil
  hooks/         useReveal, useMediaQuery, usePageMeta, useLockBodyScroll
  context/       LanguageContext (ro / en)
  layouts/       RootLayout, cadrul comun al paginilor
  lib/           constante, acces la conținut, utilitare SEO
  services/      trimiterea formularului de contact
  utils/         funcții mici, pure
  styles/        tokens.css (culori) + index.css (Tailwind + componente)
  types/         tipurile TypeScript ale conținutului
  i18n/          dicționare ro/en pentru textele de interfață
```

Aliasul `@/` trimite către `src/`, configurat atât în `vite.config.ts`, cât și în `tsconfig.json`.

---

## Cum modifici conținutul

Aproape tot se schimbă din `src/data/site.json`:

- **titluri și premii** → `achievements`
- **clipuri video** → `videos.tv`, `videos.studio` și `videos.stage`
- **articole de presă** → `press`
- **rețele sociale** → `social` (completează `url` și `handle`)
- **portretul din prima pagină** → `hero.portrait`

### Portretul principal

Câmpul `hero.portrait` este `null`, deci în locul fotografiei apare un chenar gol.
Pune fișierul în `public/images/` și schimbă valoarea:

```json
"portrait": "/images/portret.jpg"
```

Format recomandat: vertical 3:4, minimum 1200 × 1600 px.

---

## Direcția vizuală

Paleta „Pudră, aur și lila”, definită în `src/styles/tokens.css` și în `tailwind.config.js`:

| Rol | Cod |
| --- | --- |
| fundal | `#FBF6F1` |
| fundal secundar | `#F4E9E3` |
| roz pudrat | `#F3D2DC` |
| lila | `#CDBBDD` |
| auriu | `#A8813F` |
| prună (text secundar) | `#5B4463` |
| cerneală (titluri) | `#2E2429` |

Tipografie: **Bodoni Moda** pentru latura fermă („Alexandra”), **Cormorant Garamond**
cursiv pentru latura diafană („Alina”), **Jost** pentru text curent și etichete.
Fonturile se încarcă din Google Fonts în `index.html`.

---

## Înainte de lansare

- [ ] Adaugă portretul principal și restul fotografiilor
- [ ] Completează linkurile din `social`
- [ ] Leagă formularul: copiază `.env.example` în `.env` și pune `VITE_CONTACT_ENDPOINT`
- [ ] Completează politica de confidențialitate cu datele reale ale operatorului
- [ ] Înlocuiește clipurile cu variantele originale. Cele incluse sunt comprimate de WhatsApp (maximum 1024 × 576) și se văd moi pe ecran mare
- [ ] Generează `favicon.ico` și iconițele din `public/icons/`
- [ ] Adaugă `sitemap.xml`

---

## Publicare

Rulează `npm run build` și urcă folderul `dist/`.

Fiind o aplicație cu rutare pe client, serverul trebuie să trimită toate căile către
`index.html`. Pe Netlify sau Vercel se face automat. Pe un hosting clasic cu Apache,
adaugă în `dist/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Notă despre clipuri

`public/videos/` conține 31 de fișiere, aproximativ 119 MB. Pentru un site public,
varianta sănătoasă pe termen lung este mutarea lor pe un serviciu de streaming
(Vimeo pentru un player curat, YouTube pentru vizibilitate) și păstrarea în pagină
doar a cadrelor de previzualizare. Structura din `site.json` permite trecerea:
înlocuiește `src` cu adresa de embed și adaptează `VideoCard`.
