import { BlurImage } from '@/components/common/BlurImage';
import { Reveal } from '@/components/common/Reveal';
import type { Achievement, GalleryImage } from '@/types';

const SIZES = '(max-width: 760px) 92vw, (max-width: 1180px) 46vw, 400px';

/** Coroana, desenată o singură dată și refolosită. Fără librărie de iconuri. */
function Crown() {
  return (
    <svg className="award-mark" viewBox="0 0 32 24" aria-hidden="true" focusable="false">
      <path d="M3 20h26M4.5 6.5 9 12l7-8 7 8 4.5-5.5L26 20H6z" />
      <circle cx="16" cy="3" r="1.4" />
    </svg>
  );
}

interface Props {
  items: Achievement[];
  images: GalleryImage[];
}

export function AwardCards({ items, images }: Props) {
  const byId = new Map(images.map((i) => [i.id, i]));

  return (
    <ul className="awards">
      {items.map((item, i) => {
        const image = item.image ? byId.get(item.image) : undefined;
        return (
          <Reveal
            as="li"
            key={`${item.year}-${item.title}`}
            delay={Math.min(i * 55, 330)}
            className={image ? 'award has-shot' : 'award'}
          >
            {image && (
              <div className="award-shot">
                <BlurImage image={image} sizes={SIZES} />
              </div>
            )}

            <div className="award-body">
              <p className="award-top mono">
                <span className="award-year">{item.year}</span>
                <span className="award-rank">{item.rank}</span>
              </p>

              <h3 className="award-title display">
                <Crown />
                {item.title}
              </h3>

              <p className="award-org">{item.org}</p>

              {item.location && <p className="award-loc mono">{item.location}</p>}

              {item.gallery && (
                <ul className="award-slots">
                  {item.gallery.map((slot, n) => {
                    const shot = slot ? byId.get(slot) : undefined;
                    return (
                      <li key={`${item.title}-${n}`} className={shot ? 'slot' : 'slot is-empty'}>
                        {shot ? (
                          <BlurImage
                            image={shot}
                            sizes="(max-width: 760px) 28vw, (max-width: 1180px) 14vw, 130px"
                          />
                        ) : (
                          <span className="mono">{n + 1}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
