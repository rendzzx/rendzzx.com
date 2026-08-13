"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import id from "@/locales/id.json";
import en from "@/locales/en.json";

type Locale = "id" | "en";
type Translations = typeof id;
type MainKey = keyof Translations;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <K extends MainKey>(key: K, subKey: keyof Translations[K]) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const loadTranslations = (locale: Locale): Translations => {
  return locale === "id" ? id : en;
};

export const I18nProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale === "id" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale);
    setLocaleState(newLocale);
  };

  const translations = useMemo(() => loadTranslations(locale), [locale]);

  const t = useCallback(
    <K extends MainKey>(mainKey: K, subKey: keyof Translations[K]): string => {
      const category = translations[mainKey] as Record<string, string>;
      return (
        (category && category[subKey as string]) ||
        `${String(mainKey)}.${String(subKey)}`
      );
    },
    [translations]
  );

  const contextValue = useMemo(
    () => ({locale, setLocale, t}),
    [locale, setLocale, t]
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
