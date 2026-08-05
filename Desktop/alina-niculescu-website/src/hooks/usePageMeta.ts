import { useEffect } from 'react';
import { applyMeta } from '@/lib/seo';

export function usePageMeta(title: string, description: string, path = '/'): void {
  useEffect(() => {
    applyMeta({ title, description, path });
  }, [title, description, path]);
}
