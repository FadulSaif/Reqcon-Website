import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';

// High-contrast, clean vector flags that render perfectly as actual graphical flags on Windows and all other operating systems.
const FlagSV: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className={`${className} rounded-[2px] shrink-0 shadow-sm`} aria-hidden="true">
    <rect width="16" height="10" fill="#006aa7"/>
    <path d="M5,0 h2 v10 h-2 z M0,4 v2 h16 v-2 z" fill="#fecc00"/>
  </svg>
);

const FlagEN: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className={`${className} rounded-[2px] shrink-0 shadow-sm`} aria-hidden="true">
    <clipPath id="t"><path d="M0,0 v30 h50 v-30 z"/></clipPath>
    <path d="M0,0 v30 h50 v-30 z" fill="#012169"/>
    <path d="M0,0 L50,30 M0,30 L50,0" stroke="#fff" strokeWidth="6" clipPath="url(#t)"/>
    <path d="M0,0 L50,30 M0,30 L50,0" stroke="#C8102E" strokeWidth="2" clipPath="url(#t)"/>
    <path d="M25,0 v30 M0,15 h50" stroke="#fff" strokeWidth="10"/>
    <path d="M25,0 v30 M0,15 h50" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const isDarkHeaderPage = 
    location.pathname.endsWith('/about') || 
    location.pathname.endsWith('/careers') || 
    location.pathname.endsWith('/contact') ||
    location.pathname.includes('/services/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile and services menus on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: `/${i18n.language}` },
    { name: t('nav.services'), path: `/${i18n.language}/services` },
    { name: t('nav.about'), path: `/${i18n.language}/about` },
    { name: t('nav.careers'), path: `/${i18n.language}/careers` },
  ];

  const servicesDropdownItems = [
    { name: t('services.items.krav.title'), path: `/${i18n.language}/services/requirements-analysis` },
    { name: t('services.items.test.title'), path: `/${i18n.language}/services/testing-qa` },
    { name: t('services.items.pm.title'), path: `/${i18n.language}/services/project-management` },
    { name: t('services.items.info.title'), path: `/${i18n.language}/services/information-management` },
    { name: t('services.items.ux.title'), path: `/${i18n.language}/services/ux-design` },
    { name: t('services.items.agile.title'), path: `/${i18n.language}/services/agile-methods` },
  ];

  const handleLanguageChange = (newLng: string) => {
    if (i18n.language === newLng) return;
    i18n.changeLanguage(newLng);
    
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    if (pathParts[1] === 'sv' || pathParts[1] === 'en') {
      pathParts[1] = newLng;
      navigate(pathParts.join('/'), { replace: true });
    } else {
      navigate(`/${newLng}`, { replace: true });
    }
  };

  const isLinkActive = (path: string) => {
    if (path === `/${i18n.language}`) {
      return location.pathname === path || location.pathname === `${path}/`;
    }
    return location.pathname.startsWith(path);
  };

  const contactPath = `/${i18n.language}/contact`;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-500 ease-out pointer-events-none ${
        isScrolled ? 'pt-4 px-4 md:px-6' : 'pt-0 px-0'
      }`}
    >
      <header
        className={`w-full flex items-center justify-between pointer-events-auto transition-all duration-500 ease-out ${
          isScrolled
            ? 'max-w-5xl h-16 rounded-full bg-white/80 dark:bg-bg-surface/80 backdrop-blur-md shadow-lg border border-slate-200/50 dark:border-border-custom/50 px-6'
            : 'max-w-7xl h-24 rounded-none bg-transparent border-b border-transparent px-8'
        }`}
      >
        {/* Logo (Left side) */}
        <Link to={`/${i18n.language}`} onClick={() => window.scrollTo(0,0)} className="flex items-center group select-none shrink-0">
          <img 
            src="/images/logo.png" 
            alt="REQCON Logo" 
            className={`w-auto object-contain transition-all duration-500 ${
              isScrolled ? 'h-7 md:h-8' : 'h-9 md:h-10'
            } ${
              (theme === 'dark' || (!isScrolled && isDarkHeaderPage)) ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Centered Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center transition-all duration-500 ${
          isScrolled ? 'gap-1' : 'gap-3'
        }`}>
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.path);
            const isServices = link.path.endsWith('/services');
            
            if (isServices) {
              return (
                <div 
                  key={link.path}
                  className="relative py-2"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 z-10 flex items-center gap-1 group/services hover:after:scale-x-100 after:scale-x-0 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-brand-secondary/40 after:origin-center after:transition-transform after:duration-300 ${
                      isActive
                        ? 'text-brand-secondary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {link.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-secondary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white dark:bg-bg-surface border border-slate-200/80 dark:border-border-custom shadow-xl rounded-2xl p-2.5 z-50 text-left pointer-events-auto"
                      >
                        <div className="flex flex-col gap-1">
                          {servicesDropdownItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="px-4 py-2.5 text-[13px] font-semibold text-text-secondary hover:text-brand-secondary hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-all duration-200"
                            >
                              {item.name.split('(')[0].trim()}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 z-10 hover:after:scale-x-100 after:scale-x-0 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-brand-secondary/40 after:origin-center after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-brand-secondary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-secondary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Unified Controls Group (Right side) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          
          {/* Dropdown Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-custom bg-slate-100/40 dark:bg-slate-800/40 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-all duration-300 text-xs font-bold text-text-primary cursor-pointer focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isLangDropdownOpen}
            >
              {i18n.language === 'sv' ? <FlagSV /> : <FlagEN />}
              <ChevronDown className={`w-3 h-3 text-text-secondary transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <>
                  {/* Backdrop overlay to catch click-outs */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl z-20 overflow-hidden p-1.5 flex flex-col gap-1"
                  >
                    <button
                      onClick={() => {
                        handleLanguageChange('sv');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer ${
                        i18n.language === 'sv'
                          ? 'bg-slate-50 dark:bg-slate-800/50 text-brand-secondary'
                          : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlagSV />
                        <span>Svenska</span>
                      </div>
                      {i18n.language === 'sv' && <Check className="w-3.5 h-3.5 text-brand-secondary" />}
                    </button>
                    
                    <button
                      onClick={() => {
                        handleLanguageChange('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer ${
                        i18n.language === 'en'
                          ? 'bg-slate-50 dark:bg-slate-800/50 text-brand-secondary'
                          : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlagEN />
                        <span>English</span>
                      </div>
                      {i18n.language === 'en' && <Check className="w-3.5 h-3.5 text-brand-secondary" />}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
          
          <Link to={contactPath}>
            <Button
              variant={isLinkActive(contactPath) ? 'secondary' : 'primary'}
              size="sm"
              className="font-bold rounded-full transition-all duration-500"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('nav.contact')}
            </Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full text-text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer border border-transparent hover:border-slate-200/40"
            aria-expanded={isMobileMenuOpen}
            aria-label="Öppna huvudmeny"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden pointer-events-auto"
            />

            {/* Navigation Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-bg-surface border-l border-border-custom z-50 p-8 flex flex-col justify-between md:hidden pointer-events-auto shadow-2xl"
            >
              <div className="flex flex-col gap-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-border-custom">
                  <span className="text-lg font-black text-text-primary">
                    REQCON<span className="text-brand-secondary">.</span>
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-text-primary"
                    aria-label="Stäng meny"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70">
                    Navigering
                  </span>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => {
                      const isActive = isLinkActive(link.path);
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`text-xl font-bold py-2 transition-colors ${
                            isActive ? 'text-brand-secondary' : 'text-text-primary'
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                
                {/* Mobile Language Selection */}
                <div className="flex flex-col gap-3 pt-4 border-t border-border-custom text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70">
                    Språk / Language
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLanguageChange('sv')}
                      className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-full border text-xs font-bold text-center transition-all ${
                        i18n.language === 'sv'
                          ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary font-extrabold'
                          : 'border-border-custom bg-slate-50/50 dark:bg-slate-800/50 text-text-secondary'
                      }`}
                    >
                      <FlagSV className="w-3.5 h-2.5" />
                      <span>Svenska</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-full border text-xs font-bold text-center transition-all ${
                        i18n.language === 'en'
                          ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary font-extrabold'
                          : 'border-border-custom bg-slate-50/50 dark:bg-slate-800/50 text-text-secondary'
                      }`}
                    >
                      <FlagEN className="w-3.5 h-2.5" />
                      <span>English</span>
                    </button>
                  </div>
                </div>

                <Link to={contactPath}>
                  <Button variant="primary" className="w-full rounded-full" size="lg">
                    {t('nav.contact')}
                  </Button>
                </Link>
                <div className="text-center text-xs text-text-secondary opacity-60">
                  REQCON AB &copy; {new Date().getFullYear()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
