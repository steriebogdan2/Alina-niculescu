import type { DualityCard } from '@/types';
import { Reveal } from '@/components/common/Reveal';
import { cn } from '@/utils/cn';

/** Dipticul celor două laturi ale numelui. */
export function DualityPair({ cards }: { cards: DualityCard[] }) {
  return (
    <div className="diptych">
      {cards.map((card, i) => (
        <Reveal
          as="article"
          key={card.name}
          delay={i * 110}
          className={cn(card.voice === 'soft' ? 'soft' : 'strong')}
        >
          <h3 className="display">{card.name}</h3>
          <p>{card.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
