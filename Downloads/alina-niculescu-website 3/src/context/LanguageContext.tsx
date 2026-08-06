import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { dictionaries, type Lang, type Dictionary } from '@/i18n';

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: keyof Dictionary) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);

const STORAGE_KEY = 'an-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    return stored === 'en' || stored === 'ro' ? stored : 'ro';
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback((key: keyof Dictionary) => dictionaries[lang][key], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage trebuie folosit în interiorul LanguageProvider');
  return ctx;
}
