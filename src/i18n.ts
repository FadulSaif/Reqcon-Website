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

const initialLanguage = typeof window !== 'undefined' && window.location.pathname.startsWith('/en')
  ? 'en'
  : 'sv';

i18n
  .use(initReactI18next)
  .init({
    resources,
    // The URL route wrapper selects the active locale before a page renders.
    // Swedish is only a deterministic fallback for routes without a locale.
    lng: initialLanguage,
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false // react already escapes values
    }
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('reqcon_language', lng);
    document.documentElement.setAttribute('lang', lng);
  }
});

// This only enhances the client document. SSR/SSG markup gets its language
// from the route-specific renderer rather than browser storage.
if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('lang', i18n.language);
}

export default i18n;
