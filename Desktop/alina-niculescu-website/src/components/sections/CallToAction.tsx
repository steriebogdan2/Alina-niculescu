import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/common/Reveal';

interface Props {
  eyebrow: string;
  lead: string;
  accent: string;
  text: string;
  cta: { label: string; path: string };
}

export function CallToAction({ eyebrow, lead, accent, text, cta }: Props) {
  return (
    <section className="band">
      <Container narrow>
        <p className="mono" style={{ color: 'var(--wine)', marginBottom: 26 }}>
          {eyebrow}
        </p>
        <Reveal>
          <h2 className="display h2" style={{ marginBottom: 26 }}>
            {lead} <em>{accent}</em>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lede measure-tight" style={{ marginInline: 'auto', marginBottom: 38 }}>
            {text}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <Button to={cta.path} variant="solid" arrow>
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
