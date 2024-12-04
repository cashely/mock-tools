import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocaleToLocalStorage } from '../utils';
import zh from './lang/zh.json';
import en from './lang/en.json';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: getLocaleToLocalStorage(),
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;