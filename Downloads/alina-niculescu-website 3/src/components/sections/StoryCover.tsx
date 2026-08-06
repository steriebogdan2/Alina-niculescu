import { Container } from '@/components/ui/Container';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import { useParallax } from '@/hooks/useParallax';
import type { Story } from '@/types';

interface Props {
  story: Story;
  crumbs: Crumb[];
}

/** Copertă pe întuneric: imaginea urcă mai lent decât pagina, textul stă pe voal. */
export function StoryCover({ story, crumbs }: Props) {
  const { frame, layer } = useParallax<HTMLElement, HTMLDivElement>(0.14);
  const { cover } = story;

  return (
    <header className="story-cover" ref={frame}>
      <div className="story-cover-media" ref={layer}>
        <picture>
          {cover.webpSet && <source type="image/webp" srcSet={cover.webpSet} sizes="100vw" />}
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes="100vw"
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            style={{ objectPosition: cover.position ?? '50% 30%' }}
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            decoding="async"
          />
        </picture>
      </div>
      <div className="story-veil" aria-hidden="true" />

      <Container className="story-cover-body">
        <Breadcrumb items={crumbs} className="story-crumbs" />

        <p className="mono story-eyebrow">{story.eyebrow}</p>

        <h1 className="display story-title">
          {story.titleLead}
          <br />
          <em>{story.titleAccent}</em>
        </h1>

        <p className="lede story-sub">{story.subtitle}</p>

        <p className="mono story-meta">{story.metaLine}</p>
      </Container>

      <span className="story-cue" aria-hidden="true" />
    </header>
  );
}
