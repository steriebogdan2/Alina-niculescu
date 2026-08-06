import { useEffect, useRef } from 'react';

/**
 * Deplasează un strat mai lent decât derularea, folosind doar transform.
 * Rulează numai cât secțiunea este pe ecran, se oprește la mișcare redusă
 * și rămâne inactiv pe ecrane mici, unde ar consuma cadre fără câștig vizual.
 */
export function useParallax<
  F extends HTMLElement = HTMLElement,
  L extends HTMLElement = HTMLElement,
>(strength = 0.16, minWidth = 761) {
  const frame = useRef<F | null>(null);
  const layer = useRef<L | null>(null);

  useEffect(() => {
    const box = frame.current;
    const inner = layer.current;
    if (!box || !inner) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);

    let ticking = false;
    let visible = false;
    let io: IntersectionObserver | null = null;

    const paint = () => {
      ticking = false;
      const rect = box.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      // -1 deasupra ecranului, 1 dedesubt
      const progress = 1 - ((rect.top + rect.height) / span) * 2;
      const shift = progress * rect.height * strength;
      inner.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking || !visible) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    const stop = () => {
      io?.disconnect();
      io = null;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      inner.style.transform = '';
    };

    const start = () => {
      stop();
      if (reduced.matches || !wide.matches) return;
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) onScroll();
        },
        { rootMargin: '120px 0px' },
      );
      io.observe(box);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      paint();
    };

    start();
    reduced.addEventListener('change', start);
    wide.addEventListener('change', start);

    return () => {
      stop();
      reduced.removeEventListener('change', start);
      wide.removeEventListener('change', start);
    };
  }, [strength, minWidth]);

  return { frame, layer };
}
