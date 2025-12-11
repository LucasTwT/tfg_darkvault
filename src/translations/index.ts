import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from "expo-localization"
import es from './es.json';
import en from './en.json';


i18n
  .use(initReactI18next)
  .init({
    lng: Localization.getLocales()[0]?.languageCode ?? "en",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;