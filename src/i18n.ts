import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationSV from './locales/sv.json';
import translationEN from './locales/en.json';

const resources = {
  sv: {
    translation: translationSV
  },
  en: {
    translation: translationEN
  }
};

const savedLanguage = localStorage.getItem('reqcon_language') || 'sv';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false // react already escapes values
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('reqcon_language', lng);
  document.documentElement.setAttribute('lang', lng);
});

// Set document lang initially
document.documentElement.setAttribute('lang', savedLanguage);

export default i18n;
