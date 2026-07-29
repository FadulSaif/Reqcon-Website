import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  const { t, i18n } = useTranslation();
  return <div className="flex flex-col w-full"><SEO title={t('privacy.title')} description={t('privacy.description')} noindex /><Section background="alt" title={t('privacy.title')} subtitle={t('privacy.description')} className="pt-[calc(var(--navbar-height)+3rem)]"><Card className="max-w-2xl mx-auto p-8 text-left"><p className="body-md text-text-secondary">{t('privacy.body')}</p><Link className="inline-block mt-6" to={`/${i18n.language}/contact`}><Button variant="primary">{t('privacy.contact')}</Button></Link></Card></Section></div>;
};

export default Privacy;
