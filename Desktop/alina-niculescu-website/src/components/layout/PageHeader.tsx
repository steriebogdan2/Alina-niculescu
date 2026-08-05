import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/common/Reveal';

interface Props {
  label: string;
  lead: string;
  accent: string;
  text: string;
}

/** Antetul paginilor interioare: etichetă, titlu în două voci, rezumat. */
export function PageHeader({ label, lead, accent, text }: Props) {
  return (
    <Section className="!pb-[clamp(28px,4vw,56px)] !pt-[clamp(128px,14vw,190px)]">
      <SectionLabel>{label}</SectionLabel>
      <div className="spread">
        <Reveal>
          <h1 className="display h2" style={{ margin: 0 }}>
            {lead}
            <br />
            <em>{accent}</em>
          </h1>
        </Reveal>
        <Reveal delay={80} className="self-end">
          <p className="lede measure" style={{ margin: 0 }}>
            {text}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
