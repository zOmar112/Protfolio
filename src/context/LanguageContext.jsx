import { createContext, useContext, useEffect, useState } from "react";
import en from "../i18n/en";
import ar from "../i18n/ar";

const LanguageContext = createContext();

const dictionaries = { en, ar };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("lang") || "en";
  });

  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang, t.dir]);

  const toggleLang = () =>
    setLang((prev) => (prev === "en" ? "ar" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
