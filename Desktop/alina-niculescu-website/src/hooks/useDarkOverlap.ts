import { useEffect, useState } from 'react';

/**
 * Spune dacă bara de navigație plutește peste o secțiune întunecată,
 * ca să își inverseze culorile în loc să devină ilizibilă.
 */
export function useDarkOverlap(selector: string, navHeight = 82): boolean {
  const [overlapping, setOverlapping] = useState(false);

  useEffect(() => {
    const check = () => {
      const target = document.querySelector(selector);
      if (!target) {
        setOverlapping(false);
        return;
      }
      const r = target.getBoundingClientRect();
      setOverlapping(r.top <= navHeight && r.bottom >= navHeight);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [selector, navHeight]);

  return overlapping;
}
