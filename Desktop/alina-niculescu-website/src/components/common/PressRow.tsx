import type { PressItem } from '@/types';

export function PressRow({ item }: { item: PressItem }) {
  return (
    <li>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        <span className="outlet">{item.outlet}</span>
        <span className="headline">{item.headline}</span>
        <span className="go">Deschide →</span>
      </a>
    </li>
  );
}
