import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PressList } from '@/components/sections/PressList';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/common/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { press, printClipping } from '@/lib/content';
import { ROUTES } from '@/lib/constants';

export default function PressPage() {
  usePageMeta(
    'Presă · Alexandra-Alina Niculescu',
    'Dosar de presă: articole și interviuri din România, Turcia, Italia și Peru.',
    ROUTES.press,
  );

  return (
    <>
      <PageHeader
        label="Dosar de presă"
        lead="Ce s-a scris"
        accent="despre mine"
        text="Pentru redacții: bio oficial și fotografii de presă la rezoluție mare, trimise în aceeași zi."
      />

      <Section>
        <PressList items={press} />
      </Section>

      <Section tone="tint">
        <div className="spread spread-tight">
          <Reveal>
            <SectionLabel>Presă tipărită</SectionLabel>
            <h2 className="display h3">
              {printClipping.outlet}
              <br />
              <em>Turcia, 2025</em>
            </h2>
            <p className="measure-tight">{printClipping.text}</p>
          </Reveal>
          <Reveal variant="wipe" as="figure" className="clipping">
            <img src={printClipping.image} alt={printClipping.caption} loading="lazy" />
            <figcaption className="mono">{printClipping.caption}</figcaption>
          </Reveal>
        </div>
      </Section>

      <CallToAction
        eyebrow="Pentru redacții"
        lead="Aveți nevoie de"
        accent="materiale?"
        text="Trimit bio oficial, fotografii la rezoluție mare și confirmarea titlurilor."
        cta={{ label: 'Cere materialele', path: ROUTES.contact }}
      />
    </>
  );
}
