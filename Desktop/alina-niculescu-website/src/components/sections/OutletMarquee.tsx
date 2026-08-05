import { pressBand } from '@/lib/content';

/** Banda rulantă cu publicațiile care au scris despre Alina. Dovadă, nu ornament. */
export function OutletMarquee() {
  const group = (
    <div className="marquee-group">
      {pressBand.map((name) => (
        <span key={name}>
          {name}
          <i> ✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label="Publicații care au scris despre Alina Niculescu">
      <div className="marquee-track">
        {group}
        <div aria-hidden>{group}</div>
      </div>
    </div>
  );
}
