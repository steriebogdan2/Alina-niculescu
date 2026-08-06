import { useEffect, useState } from 'react';

/**
 * Spune dacă bara de navigație plutește peste o secțiune întunecată,
 * ca să își inverseze culorile în loc să devină ilizibilă.
 * Acceptă mai mulți selectori și reia verificarea după schimbarea rutei,
 * fiindcă paginile se încarcă separat și pot apărea cu întârziere.
 */
export function useDarkOverlap(selector: string, navHeight = 82, watch?: unknown): boolean {
  const [overlapping, setOverlapping] = useState(false);

  useEffect(() => {
    const check = () => {
      const targets = document.querySelectorAll(selector);
      let hit = false;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= navHeight && r.bottom >= navHeight) hit = true;
      });
      setOverlapping(hit);
    };

    check();
    // pagina cerută poate sosi după câteva cadre, așa că mai verificăm de câteva ori
    const timers = [60, 180, 420, 800].map((ms) => window.setTimeout(check, ms));

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [selector, navHeight, watch]);

  return overlapping;
}
