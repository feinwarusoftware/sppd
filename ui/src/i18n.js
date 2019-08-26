import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  initReactI18next
} from "react-i18next";

//Translation Files

//English
import enGB from "./translations/en-gb"; // UK

//Portuguese
import ptBR from "./translations/pt-br"; //Brazil
import ptPT from "./translations/pt-pt"; //Portugal

//Russian
import ru from "./translations/ru";

//Chinese
import zhHans from "./translations/zh-hans"; //Simplified
import zhHant from "./translations/zh-hant"; //Traditional

//Norwegian
import no from "./translations/no";

const resources = {
  "en-GB": {
    translation: enGB
  },
  "zh-Hans": {
    translation: zhHans
  },
  "zh-Hant": {
    translation: zhHant
  },
  ru: {
    translation: ru
  },
  "pt-BR": {
    translation: ptBR
  },
  "pt-PT": {
    translation: ptPT
  },
  no: {
    translation: no
  }
};

const detectionSettings = {
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
  lookupQuerystring: "hl"
};


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: detectionSettings,
    resources,
    fallbackLng: "en-GB",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  });

export default i18n;