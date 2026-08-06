import { useState } from 'react';
import { Lightbox } from '@/components/common/Lightbox';
import { Reveal } from '@/components/common/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import type { GalleryImage } from '@/types';

/**
 * Mozaic editorial. Cu o singură imagine devine o planșă centrată,
 * iar la adăugarea altora se rearanjează singur, fără intervenție în cod.
 */
export function StoryGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  if (!images.length) return null;

  return (
    <>
      <ul className="plates">
        {images.map((image, i) => (
          <li key={image.id} className="plate">
            <Reveal delay={(i % 3) * 70}>
              <button
                type="button"
                className="plate-btn"
                onClick={() => setOpen(i)}
                aria-label={`${t('lightboxOpen')}: ${image.caption || image.alt}`}
              >
                <span className="plate-frame">
                  <picture>
                    {image.webpSet && (
                      <source
                        type="image/webp"
                        srcSet={image.webpSet}
                        sizes="(max-width: 760px) 92vw, (max-width: 1180px) 60vw, 720px"
                      />
                    )}
                    <img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes="(max-width: 760px) 92vw, (max-width: 1180px) 60vw, 720px"
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      style={{ objectPosition: image.position ?? '50% 30%' }}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </picture>
                  <span className="plate-glow" aria-hidden="true" />
                </span>
                <span className="plate-cap">{image.caption}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
