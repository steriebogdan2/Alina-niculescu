import { useEffect, useRef, useState } from 'react';

/** Marchează elementul ca vizibil când intră în ecran. Respectă prefers-reduced-motion. */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px' },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, seen };
}
