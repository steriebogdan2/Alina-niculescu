import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { BlurImage } from '@/components/common/BlurImage';
import { Reveal } from '@/components/common/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { about, gallery } from '@/lib/content';
import { ROUTES } from '@/lib/constants';
import type { AboutChapter } from '@/types';

const PLATE_SIZES = '(max-width: 760px) 92vw, (max-width: 1180px) 60vw, 900px';

/** Planșă lată între capitole, ca ochiul să se odihnească între blocurile de text. */
function Plate({ id }: { id?: string }) {
  const image = id ? gallery.images.find((i) => i.id === id) : undefined;
  if (!image) return null;

  return (
    <Reveal>
      <figure className="about-plate">
        <BlurImage image={image} sizes={PLATE_SIZES} />
        <figcaption className="mono">{image.caption}</figcaption>
      </figure>
    </Reveal>
  );
}

function ChapterHead({ chapter }: { chapter: AboutChapter }) {
  return (
    <>
      <SectionLabel>{chapter.label}</SectionLabel>
      <Reveal>
        <h2 className="display about-h2">{chapter.title}</h2>
      </Reveal>
    </>
  );
}

export default function AboutPage() {
  usePageMeta('Despre · Alexandra-Alina Niculescu', about.subtitle, ROUTES.about, {
    type: 'profile',
  });

  return (
    <>
      <PageHeader
        label={about.eyebrow}
        lead={about.titleLead}
        accent={about.titleAccent}
        text={about.subtitle}
      />

      <Section className="!pt-0">
        <div className="spread">
          {about.welcome.map((p, i) => (
            <Reveal key={p.slice(0, 30)} delay={i * 90}>
              <p className={i === 0 ? 'measure about-open' : 'measure'}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <ChapterHead chapter={about.beauty} />
        <div className="about-body">
          {about.beauty.body?.map((p, i) => (
            <Reveal key={p.slice(0, 30)} delay={i * 70}>
              <p className="measure">{p}</p>
            </Reveal>
          ))}
        </div>
        <Plate id={about.beauty.image} />
      </Section>

      <Section>
        <ChapterHead chapter={about.awards} />
        <Reveal>
          <p className="measure about-intro">{about.awards.intro}</p>
        </Reveal>

        <ul className="awards about-awards">
          {about.awards.items?.map((item, i) => (
            <Reveal as="li" key={item.name} delay={Math.min(i * 60, 300)} className="award">
              <h3 className="award-title display">
                <svg className="award-mark" viewBox="0 0 32 24" aria-hidden="true" focusable="false">
                  <path d="M3 20h26M4.5 6.5 9 12l7-8 7 8 4.5-5.5L26 20H6z" />
                  <circle cx="16" cy="3" r="1.4" />
                </svg>
                {item.name}
              </h3>
              <p className="award-org">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="tint">
        <ChapterHead chapter={about.academic} />
        <Reveal>
          <p className="measure about-intro">{about.academic.intro}</p>
        </Reveal>

        <ol className="tline">
          {about.academic.items?.map((item, i) => (
            <Reveal as="li" key={item.name} delay={Math.min(i * 90, 300)} className="tstep">
              <span className="tstep-n mono">{item.kicker}</span>
              <div>
                <h3 className="tstep-t display">{item.name}</h3>
                <p className="tstep-x">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Plate id={about.academic.image} />
      </Section>

      <Section>
        <ChapterHead chapter={about.ambassador} />
        <div className="about-body">
          {about.ambassador.body?.map((p, i) => (
            <Reveal key={p.slice(0, 30)} delay={i * 70}>
              <p className="measure">{p}</p>
            </Reveal>
          ))}
        </div>

        <p style={{ marginTop: 44 }}>
          <Button to={ROUTES.achievements} arrow>
            Vezi palmaresul complet
          </Button>
        </p>
      </Section>
    </>
  );
}
