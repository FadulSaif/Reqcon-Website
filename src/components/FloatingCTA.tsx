import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ArrowRight } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const { t, i18n } = useTranslation();
  const contactPath = `/${i18n.language}/contact`;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 select-none">
      <Link
        to={contactPath}
        aria-label={t('nav.contact')}
        className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#006897] via-[#00A5D9] to-[#008CBA] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00A5D9]/25 hover:shadow-xl hover:shadow-[#00A5D9]/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 backdrop-blur-md border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      >
        <MessageSquare className="w-4 h-4 text-white" />
        <span>{t('nav.contact')}</span>
        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default FloatingCTA;
