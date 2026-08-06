import { useCallback, useEffect, useRef } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useLanguage } from '@/context/LanguageContext';
import type { GalleryImage } from '@/types';

interface Props {
  images: GalleryImage[];
  /** Indexul imaginii deschise. null închide fereastra. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

/** Vizualizare pe ecran complet, cu tastatură, capcană de focus și revenire la declanșator. */
export function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const { t } = useLanguage();
  const panel = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const opener = useRef<Element | null>(null);

  const open = index !== null;
  const many = images.length > 1;

  useLockBodyScroll(open);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    closeBtn.current?.focus();
    return () => {
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight' && many) step(1);
      if (e.key === 'ArrowLeft' && many) step(-1);
      if (e.key !== 'Tab') return;

      // ținem focusul în interiorul ferestrei
      const focusable = panel.current?.querySelectorAll<HTMLElement>('button');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, many, step, onClose]);

  if (index === null) return null;
  const image = images[index];
  if (!image) return null;

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lb-panel" ref={panel}>
        <figure className="lb-figure">
          <picture>
            {image.webpSet && <source type="image/webp" srcSet={image.webpSet} sizes="92vw" />}
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="92vw"
              alt={image.alt}
              width={image.width}
              height={image.height}
              decoding="async"
            />
          </picture>
          <figcaption className="lb-cap">
            <span>
              {image.caption}
              {image.credit && <em className="lb-credit">foto: {image.credit}</em>}
            </span>
            {many && (
              <span className="mono lb-count">
                {index + 1} / {images.length}
              </span>
            )}
          </figcaption>
        </figure>

        <button ref={closeBtn} type="button" className="lb-btn lb-close" onClick={onClose}>
          <span className="sr">{t('lightboxClose')}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M4 4 16 16M16 4 4 16" />
          </svg>
        </button>

        {many && (
          <>
            <button type="button" className="lb-btn lb-prev" onClick={() => step(-1)}>
              <span className="sr">{t('lightboxPrev')}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M12.5 3.5 5.5 10l7 6.5" />
              </svg>
            </button>
            <button type="button" className="lb-btn lb-next" onClick={() => step(1)}>
              <span className="sr">{t('lightboxNext')}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M7.5 3.5 14.5 10l-7 6.5" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
