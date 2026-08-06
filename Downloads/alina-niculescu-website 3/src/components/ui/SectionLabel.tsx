import { cn } from '@/utils/cn';

/** Eticheta mono cu filet care deschide fiecare secțiune. */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('sect-label mono label', className)}>
      <span>{children}</span>
    </p>
  );
}
