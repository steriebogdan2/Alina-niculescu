import { useEffect, useRef, useState } from 'react';

interface Props {
  to: number;
  label: string;
  suffix?: string;
}

/** Numără crescător o singură dată, la prima intrare pe ecran. Sare peste animație la mișcare redusă. */
export function CountUp({ to, label, suffix = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setN(to);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const p = Math.min((now - start) / 1100, 1);
          // frânare lină spre final
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <div className="stat" ref={ref}>
      <p className="stat-n display">
        {n}
        {suffix}
      </p>
      <p className="stat-k mono">{label}</p>
    </div>
  );
}
