import React, { createContext, useContext, useMemo, useState } from 'react';
import { I18nManager } from 'react-native';
import { strings, type Locale, type Strings } from './strings';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Strings;
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = 'en',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const value = useMemo<I18nContextValue>(() => {
    const isRTL = locale === 'he';
    // Note: full RTL flip requires app reload via I18nManager.forceRTL.
    // We expose the flag so individual components can mirror layout themselves.
    return {
      locale,
      setLocale,
      t: strings[locale],
      isRTL,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export { I18nManager };
