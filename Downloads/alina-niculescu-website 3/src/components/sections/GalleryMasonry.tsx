import { useEffect, useMemo, useState } from 'react';
import { BlurImage } from '@/components/common/BlurImage';
import { Lightbox } from '@/components/common/Lightbox';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/utils/cn';
import type { GalleryCategory, GalleryImage } from '@/types';

const STEP = 12;
const SIZES = '(max-width: 640px) 92vw, (max-width: 1080px) 46vw, (max-width: 1600px) 31vw, 380px';

interface Props {
  images: GalleryImage[];
  categories: GalleryCategory[];
}

export function GalleryMasonry({ images, categories }: Props) {
  const [active, setActive] = useState('toate');
  const [shown, setShown] = useState(STEP);
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  const counts = useMemo(() => {
    const map = new Map<string, number>([['toate', images.length]]);
    images.forEach((i) => map.set(i.category ?? '', (map.get(i.category ?? '') ?? 0) + 1));
    return map;
  }, [images]);

  const filtered = useMemo(
    () => (active === 'toate' ? images : images.filter((i) => i.category === active)),
    [images, active],
  );

  // la schimbarea filtrului reluăm de la prima tranșă
  useEffect(() => setShown(STEP), [active]);

  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrează galeria">
        {categories
          .filter((c) => (counts.get(c.id) ?? 0) > 0)
          .map((c) => (
            <button
              key={c.id}
              type="button"
              className={cn('filter', active === c.id && 'on')}
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="filter-n">{counts.get(c.id)}</span>
            </button>
          ))}
      </div>

      <div className="mason" aria-live="polite">
        {visible.map((image, i) => (
          <figure className="tile" key={image.id}>
            <button
              type="button"
              className="tile-btn"
              onClick={() => setOpen(i)}
              aria-label={`${t('lightboxOpen')}: ${image.caption || image.alt}`}
            >
              <BlurImage image={image} sizes={SIZES} eager={i < 4} />
              <span className="tile-veil" aria-hidden="true" />
              <figcaption className="tile-cap">{image.caption}</figcaption>
            </button>
          </figure>
        ))}
      </div>

      {remaining > 0 && (
        <p className="mason-more">
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + STEP)}>
            Încă {Math.min(remaining, STEP)} fotografii
            <span className="arrow">↓</span>
          </button>
        </p>
      )}

      <Lightbox images={visible} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
