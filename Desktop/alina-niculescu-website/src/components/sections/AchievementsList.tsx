import { Reveal } from '@/components/common/Reveal';
import type { Achievement } from '@/types';

/** Palmaresul, cronologic. Anul este structură, nu ornament. */
export function AchievementsList({ items }: { items: Achievement[] }) {
  return (
    <ul className="palm">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={`${item.year}-${item.title}`}
          delay={Math.min(i * 45, 400)}
          className="palm-row"
        >
          <div>
            <span className="palm-year">{item.year}</span>
            <div>
              <p className="palm-title">{item.title}</p>
              <span className="palm-org">{item.org}</span>
            </div>
            <span className="palm-rank">{item.rank}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
