import { de } from "i18n/de";
import { en } from "i18n/en";
import { fr } from "i18n/fr";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

const resources = {
  en: en,
  fr: fr,
  de: de,
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: ["en", "fr"],

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
