import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

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
  const routeLanguage: 'sv' | 'en' = location.pathname.startsWith('/en') ? 'en' : 'sv';
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    let frame = 0;

    const updateNavbarShape = () => {
      setIsScrolled(window.scrollY > 80);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(updateNavbarShape);
    };

    updateNavbarShape();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);



  // Close mobile and services menus on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home', { lng: routeLanguage }), path: `/${routeLanguage}` },
    { name: t('nav.services', { lng: routeLanguage }), path: `/${routeLanguage}/services` },
    { name: t('nav.about', { lng: routeLanguage }), path: `/${routeLanguage}/about` },
    { name: t('nav.careers', { lng: routeLanguage }), path: `/${routeLanguage}/careers` },
    { name: t('nav.team', { lng: routeLanguage }), path: `/${routeLanguage}/team` },
  ];

  const servicesDropdownItems = [
    { name: t('services.items.krav.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/requirements-analysis` },
    { name: t('services.items.test.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/testing-qa` },
    { name: t('services.items.pm.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/project-management` },
    { name: t('services.items.info.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/information-management` },
    { name: t('services.items.ux.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/ux-design` },
    { name: t('services.items.agile.title', { lng: routeLanguage }), path: `/${routeLanguage}/services/agile-methods` },
  ];

  const handleLanguageChange = (newLng: string) => {
    if (routeLanguage === newLng) return;
    i18n.changeLanguage(newLng);
    
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    if (pathParts[1] === 'sv' || pathParts[1] === 'en') {
      pathParts[1] = newLng;
      navigate({ pathname: pathParts.join('/'), search: location.search }, { replace: true });
    } else {
      navigate({ pathname: `/${newLng}`, search: location.search }, { replace: true });
    }
  };

  const isLinkActive = (path: string) => {
    if (path === `/${routeLanguage}`) {
      return location.pathname === path || location.pathname === `${path}/`;
    }
    return location.pathname.startsWith(path);
  };

  const contactPath = `/${routeLanguage}/contact`;
  const navSpacingClass = isScrolled ? 'gap-2 2xl:gap-3' : 'gap-3 2xl:gap-5';
  const navLinkSizeClass = isScrolled ? 'px-2 py-2 text-[11px]' : 'px-2 py-2 text-sm 2xl:px-4 2xl:text-base';
  const actionGroupClass = isScrolled ? 'gap-1' : 'gap-2';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full justify-center pointer-events-none px-4">
      <header
        ref={headerRef}
        className={`relative grid grid-cols-2 min-[1440px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${isScrolled ? 'gap-x-2' : 'gap-x-4'} items-center pointer-events-auto w-full will-change-[max-width,border-radius,height,padding,background-color,box-shadow,transform] transition-all duration-300 ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none ${
          isScrolled
            ? 'max-w-[1120px] rounded-[100px] border border-slate-200/70 bg-white/90 px-6 py-1.5 shadow-lg shadow-slate-950/10 backdrop-blur-md dark:border-white/10 dark:bg-[#06131b]/90 dark:shadow-black/30 translate-y-3'
            : 'max-w-[1440px] rounded-none border border-transparent bg-transparent px-6 py-[22px] shadow-none translate-y-0'
        }`}
      >
        {/* Logo (Left side) */}
        <div className="flex min-w-0 items-center justify-start">
          <Link to={`/${routeLanguage}`} className="flex items-center group select-none shrink-0">
            <img
              src="/images/REQCON.svg"
              alt="REQCON – Från vision till produkt"
              className={`h-auto object-contain transition-[width] duration-300 ease-out motion-reduce:transition-none ${isScrolled ? 'w-[8rem]' : 'w-40'}`}
            />
          </Link>
        </div>

        {/* Centered Desktop Navigation Links */}
        <nav className={`hidden min-[1440px]:flex shrink-0 items-center justify-center whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0,0,0.2,1)] ${isScrolled ? '-translate-x-20' : 'translate-x-0'} ${navSpacingClass}`}>
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
                    className={`relative nav-link ${navLinkSizeClass} transition-colors duration-200 z-10 flex items-center gap-1 group/services hover:after:scale-x-100 after:scale-x-0 after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-secondary/40 after:origin-center after:transition-transform after:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-2 rounded-lg ${
                      isActive
                        ? 'text-brand-secondary'
                        : 'text-slate-900 dark:text-white hover:text-brand-secondary'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {link.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-secondary rounded-full"
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
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-64 bg-white dark:bg-bg-surface border border-slate-200/80 dark:border-border-custom shadow-xl rounded-2xl p-2.5 z-50 text-left pointer-events-auto"
                      >
                        <div className="flex flex-col gap-1">
                          {servicesDropdownItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                              }}
                              className="dropdown-item px-4 py-2.5 text-text-secondary hover:text-brand-secondary hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1"
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
                className={`relative nav-link ${navLinkSizeClass} transition-colors duration-200 z-10 hover:after:scale-x-100 after:scale-x-0 after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-secondary/40 after:origin-center after:transition-transform after:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-2 rounded-lg ${
                  isActive
                    ? 'text-brand-secondary'
                    : 'text-slate-900 dark:text-white hover:text-brand-secondary'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-secondary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Unified Controls Group (Right side) */}
        <div className={`hidden min-[1440px]:flex min-w-0 shrink-0 items-center justify-end ${actionGroupClass}`}>
          <Link to={contactPath} className="shrink-0">
            <Button
              variant={isLinkActive(contactPath) ? 'secondary' : 'primary'}
              size="sm"
              className={`${isScrolled ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-2 text-xs'} font-bold uppercase tracking-wider rounded-full shrink-0 whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-300`}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('nav.contact', { lng: routeLanguage })}
            </Button>
          </Link>

          {/* Dropdown Language Selector */}
          <div className="relative shrink-0">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex shrink-0 items-center whitespace-nowrap ${isScrolled ? 'gap-1 px-2.5 py-0.5 text-[10px]' : 'gap-2 px-3 py-1.5 text-xs'} rounded-full border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#0f2330] hover:bg-slate-100 dark:hover:bg-[#153040] text-slate-900 dark:text-white transition-colors duration-200 font-bold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-2 shadow-sm`}
              aria-haspopup="true"
              aria-expanded={isLangDropdownOpen}
            >
              {routeLanguage === 'sv' ? <FlagSV /> : <FlagEN />}
              <span>{routeLanguage === 'sv' ? 'SV' : 'EN'}</span>
              <ChevronDown className={`w-3 h-3 text-slate-900 dark:text-white transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1 ${
                        routeLanguage === 'sv'
                          ? 'bg-slate-50 dark:bg-slate-800/50 text-brand-secondary'
                          : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlagSV />
                        <span>Svenska</span>
                      </div>
                      {routeLanguage === 'sv' && <Check className="w-3.5 h-3.5 text-brand-secondary" />}
                    </button>
                    
                    <button
                      onClick={() => {
                        handleLanguageChange('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1 ${
                        routeLanguage === 'en'
                          ? 'bg-slate-50 dark:bg-slate-800/50 text-brand-secondary'
                          : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlagEN />
                        <span>English</span>
                      </div>
                      {routeLanguage === 'en' && <Check className="w-3.5 h-3.5 text-brand-secondary" />}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className={`transition-transform duration-300 origin-center ${isScrolled ? 'scale-80' : 'scale-100'}`}>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex min-[1440px]:hidden min-w-0 items-center justify-end gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-2 cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-white/20"
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
              className="fixed inset-0 bg-black/60 z-40 min-[1440px]:hidden pointer-events-auto"
            />

            {/* Navigation Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-bg-surface border-l border-border-custom z-50 p-8 flex flex-col justify-between min-[1440px]:hidden pointer-events-auto shadow-2xl"
            >
              <div className="flex flex-col gap-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-border-custom">
                  <span className="text-lg font-black text-text-primary">
                    REQCON<span className="text-brand-secondary">.</span>
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1"
                    aria-label="Stäng meny"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70">
                    {routeLanguage === 'en' ? 'Navigation' : 'Navigering'}
                  </span>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => {
                      const isActive = isLinkActive(link.path);
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`text-xl font-bold py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1 rounded-lg ${
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
                      className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-full border text-xs font-bold text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1 ${
                        routeLanguage === 'sv'
                          ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary font-extrabold'
                          : 'border-border-custom bg-slate-50/50 dark:bg-slate-800/50 text-text-secondary'
                      }`}
                    >
                      <FlagSV className="w-3.5 h-2.5" />
                      <span>Svenska</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-full border text-xs font-bold text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-1 ${
                        routeLanguage === 'en'
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
                  {t('nav.contact', { lng: routeLanguage })}
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
