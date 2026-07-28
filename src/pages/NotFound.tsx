import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const language = location.pathname.startsWith('/en') || i18n.language === 'en' ? 'en' : 'sv';

  return <div className="flex flex-col w-full"><SEO title={t('not_found.title')} description={t('not_found.description')} noindex /><Section background="alt" className="min-h-[60vh] flex items-center"><div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6"><Eyebrow>404</Eyebrow><h1 className="heading-display text-text-primary">{t('not_found.title')}</h1><p className="body-lg text-text-secondary">{t('not_found.description')}</p><div className="flex flex-wrap justify-center gap-3"><Link to={`/${language}`}><Button variant="primary">{t('not_found.home')}</Button></Link><Link to={`/${language}/services`}><Button variant="secondary">{t('not_found.services')}</Button></Link></div></div></Section></div>;
};

export default NotFound;
