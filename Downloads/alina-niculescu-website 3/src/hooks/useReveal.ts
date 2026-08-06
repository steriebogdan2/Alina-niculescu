import { useEffect, useRef, useState } from 'react';

/**
 * Marchează elementul ca vizibil când intră în ecran. Respectă prefers-reduced-motion.
 *
 * Conținutul aflat deasupra pliului este declarat vizibil imediat, fără să aștepte
 * observatorul. Altfel, dacă prima evaluare cade în timpul încărcării fonturilor,
 * când macheta încă se așază, elementul poate rămâne ascuns până la o derulare
 * care nu vine niciodată. Există și o plasă de siguranță pe cronometru, ca nimic
 * să nu rămână invizibil dacă observatorul nu se declanșează deloc.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.12, immediate = false) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setSeen(true);
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // deja pe ecran la montare: nu mai așteptăm observatorul
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setSeen(true);
      return;
    }

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
    const safety = window.setTimeout(() => setSeen(true), 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold, immediate]);

  return { ref, seen };
}
