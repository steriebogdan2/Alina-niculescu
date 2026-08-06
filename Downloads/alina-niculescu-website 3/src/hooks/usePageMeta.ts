import { useEffect } from 'react';
import { applyMeta, applyJsonLd } from '@/lib/seo';

interface Options {
  image?: string;
  type?: 'profile' | 'article' | 'website';
  /** Structured data injectat cât timp pagina este montată. */
  jsonLd?: unknown;
}

export function usePageMeta(
  title: string,
  description: string,
  path = '/',
  options: Options = {},
): void {
  const { image, type, jsonLd } = options;

  useEffect(() => {
    applyMeta({ title, description, path, image, type });
  }, [title, description, path, image, type]);

  useEffect(() => {
    if (!jsonLd) return;
    return applyJsonLd(jsonLd);
  }, [jsonLd]);
}
