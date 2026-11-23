import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Language } from '../types/medcare';
import { TRANSLATIONS, type UITranslations } from '../data/translations';
import { localize } from '../utils/medcareLogic';

const STORAGE_KEY = 'veds_medcare_lang';

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  toggleLang: () => void;
  t: UITranslations;
  loc: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') return saved;
    } catch {
      // Ignore storage access errors
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  const setLang = (next: Language) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'hi' : 'en'));

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: TRANSLATIONS[lang],
      loc: (en: string, hi: string) => localize(lang, en, hi),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
