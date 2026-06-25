import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// For the website, we detect the browser language automatically
const detectSystemLang = (): string => {
  const nav = window.navigator;
  const lang = (nav.languages && nav.languages[0]) || nav.language;
  return lang?.split("-")[0] || "en";
};

export async function initI18n() {
  const savedLang = localStorage.getItem("mayo-lang") || detectSystemLang();

  await i18next.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          home: "HOME",
          guide: "GUIDE",
          community: "COMMUNITY",
          contact: "CONTACT",
          download: "DOWNLOAD"
        }
      }
      // You can add more languages here (fr, es, yo, etc.) 
      // by importing your JSON files later
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
}

export default i18next;