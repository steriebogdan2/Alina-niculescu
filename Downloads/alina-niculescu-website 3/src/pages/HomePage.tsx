import { Cover } from '@/components/sections/Cover';
import { OutletMarquee } from '@/components/sections/OutletMarquee';
import { DualityPair } from '@/components/sections/DualityPair';
import { AchievementsList } from '@/components/sections/AchievementsList';
import { VideoReel } from '@/components/sections/VideoReel';
import { PressList } from '@/components/sections/PressList';
import { CallToAction } from '@/components/sections/CallToAction';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/common/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { about, achievements, press, videos } from '@/lib/content';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  usePageMeta(
    'Alexandra-Alina Niculescu · Miss Peace Europe 2026',
    'Balerină, scriitoare și absolventă de Drept. Palmares, arhivă filmată și dosar de presă.',
    ROUTES.home,
  );

  return (
    <>
      <Cover />
      <OutletMarquee />

      <Section>
        <SectionLabel>{about.eyebrow}</SectionLabel>
        <div className="spread">
          <Reveal>
            <h2 className="display h2">
              {about.titleLead}
              <br />
              <em>{about.titleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            {about.welcome.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
            <p style={{ marginTop: 34 }}>
              <Button to={ROUTES.about} arrow>
                Povestea completă
              </Button>
            </p>
          </Reveal>
        </div>
        <DualityPair cards={about.duality} />
      </Section>

      <Section tone="tint" narrow>
        <div className="spread spread-tight">
          <SectionLabel>Cu propriile cuvinte</SectionLabel>
          <Reveal>
            <blockquote className="pull">„{about.pull.text}”</blockquote>
            <p className="pull-src mono">{about.pull.source}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionLabel>Palmares · 2021 › 2026</SectionLabel>
        <div className="spread" style={{ marginBottom: 'clamp(34px,5vw,64px)' }}>
          <Reveal>
            <h2 className="display h2" style={{ margin: 0 }}>
              Cincisprezece titluri,
              <br />
              <em>șase ani</em>
            </h2>
          </Reveal>
          <Reveal delay={80} className="self-end">
            <p className="lede measure" style={{ margin: 0 }}>
              Fiecare rând poartă organizatorul care a acordat premiul.
            </p>
          </Reveal>
        </div>
        <AchievementsList items={achievements.slice(0, 5)} />
        <p style={{ marginTop: 40 }}>
          <Button to={ROUTES.achievements} arrow>
            Toate cele {achievements.length} titluri
          </Button>
        </p>
      </Section>

      <Section tone="theatre">
        <SectionLabel className="!text-blush">Arhivă filmată · 31 de clipuri</SectionLabel>
        <div className="spread" style={{ marginBottom: 'clamp(38px,5vw,68px)' }}>
          <Reveal>
            <h2 className="display h2" style={{ margin: 0 }}>
              La televizor
              <br />
              <em>și pe scenă</em>
            </h2>
          </Reveal>
          <Reveal delay={80} className="self-end">
            <p className="lede measure" style={{ margin: 0 }}>
              Clipurile pornesc doar la cerere, ca pagina să rămână ușoară.
            </p>
          </Reveal>
        </div>
        <VideoReel items={videos.tv.slice(0, 4)} />
        <p style={{ marginTop: 40 }}>
          <Button to={ROUTES.videos} variant="light" arrow>
            Toată arhiva
          </Button>
        </p>
      </Section>

      <Section>
        <SectionLabel>Dosar de presă</SectionLabel>
        <div className="spread" style={{ marginBottom: 'clamp(34px,5vw,60px)' }}>
          <Reveal>
            <h2 className="display h2" style={{ margin: 0 }}>
              Ce s-a scris
              <br />
              <em>despre mine</em>
            </h2>
          </Reveal>
          <Reveal delay={80} className="self-end">
            <p className="lede measure" style={{ margin: 0 }}>
              România, Turcia, Italia și Peru, într-un singur loc.
            </p>
          </Reveal>
        </div>
        <PressList items={press.slice(0, 4)} />
        <p style={{ marginTop: 40 }}>
          <Button to={ROUTES.press} arrow>
            Dosarul complet
          </Button>
        </p>
      </Section>

      <CallToAction
        eyebrow="Colaborări · Evenimente · Interviuri"
        lead="Scrie-mi"
        accent="direct"
        text="Răspund personal fiecărui mesaj, de la branduri și organizatori până la jurnaliști."
        cta={{ label: 'Deschide formularul', path: ROUTES.contact }}
      />
    </>
  );
}
