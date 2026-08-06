import { PressRow } from '@/components/common/PressRow';
import type { PressItem } from '@/types';

export function PressList({ items }: { items: PressItem[] }) {
  return (
    <ul className="dossier">
      {items.map((item) => (
        <PressRow key={item.url} item={item} />
      ))}
    </ul>
  );
}
