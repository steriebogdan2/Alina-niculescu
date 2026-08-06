import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  /** "tint" schimbă fundalul, "theatre" trece secțiunea pe întuneric. */
  tone?: 'plain' | 'tint' | 'theatre';
  narrow?: boolean;
  className?: string;
  id?: string;
}

export function Section({ children, tone = 'plain', narrow = false, className, id }: Props) {
  return (
    <section
      id={id}
      className={cn(tone === 'theatre' ? 'theatre' : 'sect', tone === 'tint' && 'sect-tint', className)}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}
