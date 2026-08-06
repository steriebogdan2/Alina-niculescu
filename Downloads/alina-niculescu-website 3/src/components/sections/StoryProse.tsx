import { Fragment, type ReactNode } from 'react';
import { Reveal } from '@/components/common/Reveal';

/**
 * Sparge un paragraf după fragmentele cerute și le îmbracă în accent.
 * Lucrează pe subșiruri exacte, deci textul rămâne neschimbat, se schimbă doar forma.
 */
function emphasize(text: string, accents: string[]): ReactNode {
  const hit = accents.find((a) => a && text.includes(a));
  if (!hit) return text;

  const at = text.indexOf(hit);
  const rest = accents.filter((a) => a !== hit);

  return (
    <>
      {text.slice(0, at)}
      <em className="hl">{hit}</em>
      {emphasize(text.slice(at + hit.length), rest)}
    </>
  );
}

interface Props {
  paragraphs: string[];
  accents?: string[];
  /** Coloana din stânga: reper de secțiune care rămâne lipit la derulare. */
  rail: ReactNode;
}

export function StoryProse({ paragraphs, accents = [], rail }: Props) {
  return (
    <div className="story-grid">
      <aside className="story-rail">{rail}</aside>

      <div className="story-body">
        {paragraphs.map((text, i) => (
          <Fragment key={text.slice(0, 40)}>
            <Reveal delay={i === 0 ? 0 : 40}>
              <p className={i === 0 ? 'story-p story-p-lead' : 'story-p'}>
                {emphasize(text, accents)}
              </p>
            </Reveal>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
