import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ArrowRight } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const { t, i18n } = useTranslation();
  const contactPath = `/${i18n.language}/contact`;
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(28);

  useEffect(() => {
    const updateThreshold = () => {
      setIsPastThreshold(window.scrollY >= window.innerHeight * 0.6);

      const isMobile = window.innerWidth < 768;
      const defaultOffset = isMobile ? 16 : 28;
      const protectedElement = document.getElementById('footer-bottom-bar');
      if (!protectedElement) {
        setBottomOffset(defaultOffset);
        return;
      }

      const protectedBounds = protectedElement.getBoundingClientRect();
      const protectedElementIsVisible =
        protectedBounds.top < window.innerHeight && protectedBounds.bottom > 0;
      const clearance = 20;
      const maximumOffset = window.innerHeight - 58;
      const protectedOffset = window.innerHeight - protectedBounds.top + clearance;

      setBottomOffset(
        protectedElementIsVisible
          ? Math.min(Math.max(defaultOffset, protectedOffset), maximumOffset)
          : defaultOffset
      );
    };
    window.addEventListener('scroll', updateThreshold, { passive: true });
    window.addEventListener('resize', updateThreshold);
    updateThreshold();

    return () => {
      window.removeEventListener('scroll', updateThreshold);
      window.removeEventListener('resize', updateThreshold);
    };
  }, []);

  if (!isPastThreshold) return null;

  return (
    <div
      className="fixed right-4 bottom-4 md:right-8 md:bottom-7 z-40 select-none"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <Link
        to={contactPath}
        aria-label={t('nav.contact')}
        className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#006897] via-[#00A5D9] to-[#008CBA] text-white font-bold text-xs tracking-wider shadow-lg shadow-[#00A5D9]/25 hover:shadow-xl hover:shadow-[#00A5D9]/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 backdrop-blur-md border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      >
        <MessageSquare className="w-4 h-4 text-white" />
        <span>{t('nav.contact')}</span>
        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default FloatingCTA;
