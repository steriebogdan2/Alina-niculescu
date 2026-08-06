import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  /** Întârziere în milisecunde, pentru cascade. */
  delay?: number;
  /** "rise" ridică elementul, "wipe" îl descoperă dinspre stânga. */
  variant?: 'rise' | 'wipe';
  /** Pentru conținutul de deasupra pliului: apare fără să aștepte derularea. */
  immediate?: boolean;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'rise',
  as,
  immediate = false,
}: Props) {
  const { ref, seen } = useReveal<HTMLElement>(0.12, immediate);
  const Tag = (as ?? 'div') as ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(variant === 'wipe' ? 'rv-wipe' : 'rv', seen && 'in', className)}
    >
      {children}
    </Tag>
  );
}
