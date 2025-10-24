// app/providers/i18n-provider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
// Import JSON lokal
import id from "@/locales/id.json";
import en from "@/locales/en.json";

type Locale = "id" | "en";
type Translations = typeof id;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, subKey: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Fungsi utilitas untuk memuat terjemahan
const loadTranslations = (locale: Locale): Translations => {
  return locale === "id" ? id : en;
};

export const I18nProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  // State default bahasa
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && (savedLocale === "id" || savedLocale === "en")) {
      setLocaleState(savedLocale as Locale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale);
    setLocaleState(newLocale);
  };

  const translations = useMemo(() => loadTranslations(locale), [locale]);

  // Fungsi translasi (t)
  const t = (mainKey: keyof Translations, subKey: string): string => {
    // Memungkinkan akses seperti t('navigation', 'about')
    const category = translations[mainKey] as Record<string, string>;
    return category ? category[subKey] : `${mainKey}.${subKey} not found`;
  };

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, t]
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
