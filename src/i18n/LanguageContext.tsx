import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("it");

  const toggleLang = () => setLang((prev) => (prev === "it" ? "en" : "it"));
  const t = (key: TranslationKey) => translations[key][lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const fallback: LanguageContextType = {
  lang: "it",
  toggleLang: () => {},
  t: (key: TranslationKey) => translations[key]?.["it"] ?? key,
};

export const useLang = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
};
