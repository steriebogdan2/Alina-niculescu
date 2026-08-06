import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Container({
  children,
  narrow = false,
  className,
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return <div className={cn('wrap', narrow && 'wrap-narrow', className)}>{children}</div>;
}
