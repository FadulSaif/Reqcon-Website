import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section';
import { DocumentViewer } from '../components/DocumentViewer';
import SEO from '../components/SEO';

const PersonalPolicy: React.FC = () => {
  const { t } = useTranslation();
  return <div className="flex flex-col w-full"><SEO title={t('personal_policy.title')} description={t('personal_policy.description')} /><Section background="alt" title={t('personal_policy.title')} subtitle={t('personal_policy.description')}><DocumentViewer /></Section></div>;
};

export default PersonalPolicy;
