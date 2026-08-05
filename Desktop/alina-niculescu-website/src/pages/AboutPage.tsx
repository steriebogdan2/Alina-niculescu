import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { DualityPair } from '@/components/sections/DualityPair';
import { Reveal } from '@/components/common/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { about } from '@/lib/content';
import { ROUTES } from '@/lib/constants';

export default function AboutPage() {
  usePageMeta(
    'Despre · Alexandra-Alina Niculescu',
    'Din Constanța până în competițiile europene: balet, drept, literatură și diplomație culturală.',
    ROUTES.about,
  );

  return (
    <>
      <PageHeader
        label="Despre"
        lead="Din Constanța,"
        accent="până în Europa"
        text="Balerină, scriitoare, absolventă de Drept. Dincolo de scenă mă interesează diplomația culturală și dreptul internațional."
      />

      <Section>
        <div className="spread">
          <Reveal>
            {about.intro.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={90}>
            {about.path.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" narrow>
        <div className="spread spread-tight">
          <SectionLabel>Cu propriile cuvinte</SectionLabel>
          <Reveal>
            <blockquote className="pull">„Adevărata coroană este cea a demnității.”</blockquote>
            <p className="measure" style={{ marginTop: 26 }}>
              {about.quote.text}
            </p>
            <p className="pull-src mono">{about.quote.source}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionLabel>Dincolo de scenă</SectionLabel>
        <DualityPair cards={about.beyond} />
        <p style={{ marginTop: 40 }}>
          <Button to={ROUTES.achievements} arrow>
            Vezi palmaresul
          </Button>
        </p>
      </Section>
    </>
  );
}
