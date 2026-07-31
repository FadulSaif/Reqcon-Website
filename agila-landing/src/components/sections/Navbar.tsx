"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import LogoReversed from "../logos/LogoReversed";
import { Menu, X, Sun, Moon, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_CONFIG } from "@/lib/services-data";

const NAV_LINKS = [
  { translationKey: "nav.home", href: "/" },
  { translationKey: "nav.jobVacancies", href: "https://jobb.agilarbetskraft.se/" },
  { translationKey: "nav.services", href: "/services" },
  { translationKey: "nav.about", href: "/about" },
  { translationKey: "nav.contact", href: "/contact" },
];

/* Next.js Link with framer-motion animation support (for the mobile menu) */
const MotionLink = motion.create(Link);

/* Flag icons drawn as inline SVG (emoji flags don't render on Windows browsers) */
const FlagSE = () => (
  <svg width="20" height="14" viewBox="0 0 16 10" aria-hidden="true" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="16" height="10" fill="#006AA7" />
    <rect x="5" width="2" height="10" fill="#FECC00" />
    <rect y="4" width="16" height="2" fill="#FECC00" />
  </svg>
);
const FlagGB = () => (
  <svg width="20" height="14" viewBox="0 0 60 30" aria-hidden="true" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#ffffff" strokeWidth="6" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="2.5" />
    <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

/* Language list — add a new entry here to support more languages later */
const LANGUAGES: Array<{ code: "sv" | "en"; label: string; flag: React.ReactNode }> = [
  { code: "sv", label: "Svenska", flag: <FlagSE /> },
  { code: "en", label: "English", flag: <FlagGB /> },
];

export default function Navbar({ forceTransparentWhite = false }: { forceTransparentWhite?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // True when the link points to the page the user is currently on.
  // "/services" also counts for "/services/it" etc.; external links never match.
  const isActive = (href: string) => {
    if (!href.startsWith("/")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  // Close the language dropdown when clicking anywhere outside it
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <>
      <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className={`navbar-pill ${scrolled ? "glass-panel" : "transparent"} ${forceTransparentWhite && !scrolled ? "force-white" : ""}`}>
          {/* Logo — links to home from any page; scrolls to top when already home */}
          <Link
            href="/"
            className="navbar-brand"
            aria-label="Agil Arbetskraft – gå till startsidan"
            onClick={(e) => {
              setMobileOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <LogoReversed className="navbar-logo" />
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {NAV_LINKS.map((link) => {
              if (link.translationKey === "nav.services") {
                return (
                  <li key={link.href} className="nav-item-dropdown">
                    <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                      {t(link.translationKey)}
                    </Link>
                    <div className="dropdown-menu glass-panel">
                      {Object.keys(SERVICES_CONFIG).map((slug) => (
                        <Link key={slug} href={`/services/${slug}`} className="dropdown-item">
                          {t(`services.${slug}.title`)}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }
              // External links (e.g. the jobs site) keep a plain <a>; internal pages use <Link>
              const isExternal = !link.href.startsWith("/");
              return (
                <li key={link.href}>
                  {isExternal ? (
                    <a href={link.href} className="nav-link" target="_blank" rel="noopener noreferrer">
                      {t(link.translationKey)}
                    </a>
                  ) : (
                    <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                      {t(link.translationKey)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="navbar-actions">
            {/* Language Dropdown (flag + code, expandable for more languages) */}
            {mounted && (
              <div className="lang-dropdown desktop-cta">
                <button
                  onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                  className="navbar-icon-btn lang-btn"
                  aria-label="Select language"
                  aria-expanded={langOpen}
                >
                  {currentLang.flag}
                  <span>{currentLang.code.toUpperCase()}</span>
                  <ChevronDown size={14} className={`lang-chevron ${langOpen ? "open" : ""}`} />
                </button>
                {langOpen && (
                  <div className="lang-menu glass-panel">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`lang-item ${language === lang.code ? "active" : ""}`}
                      >
                        {lang.flag}
                        <span>{lang.label}</span>
                        {language === lang.code && <Check size={14} className="lang-check" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="navbar-icon-btn desktop-cta"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* CTA */}
            <Link href="/contact#contact-form" className="btn btn-primary btn-sm desktop-cta hover-lift">
              {t("nav.requestStaff")}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="mobile-hamburger hover-lift"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay glass-panel"
          >
            {NAV_LINKS.map((link, i) =>
              link.href.startsWith("/") ? (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                  className={`mobile-nav-link ${isActive(link.href) ? "active" : ""}`}
                >
                  {t(link.translationKey)}
                </MotionLink>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                  className="mobile-nav-link"
                >
                  {t(link.translationKey)}
                </motion.a>
              )
            )}
            <MotionLink
              href="/contact#contact-form"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {t("nav.requestStaff")}
            </MotionLink>
            
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                style={{ display: "flex", gap: "24px", marginTop: "16px" }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="theme-toggle-btn"
                      style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        fontSize: "1.1rem", fontWeight: 500,
                        padding: "8px 14px", borderRadius: "100px",
                        border: language === lang.code ? "2px solid var(--primary)" : "2px solid var(--border-subtle)",
                        color: language === lang.code ? "var(--primary)" : "var(--text-primary)",
                      }}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="theme-toggle-btn"
                >
                  {isDark ? <Sun size={28} /> : <Moon size={28} />}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0;
          transition: padding var(--duration-normal) var(--ease-out);
          pointer-events: none;
        }
        .navbar-wrapper.scrolled {
          padding: 12px 16px;
        }

        /* 3-column grid with equal side columns (1fr auto 1fr) so the links
           column is centred on the pill regardless of how wide the logo or the
           actions cluster are. justify-content:space-between only looked centred
           when both sides matched, which they don't (actions ~2x the logo). */
        .navbar-pill {
          pointer-events: auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
          max-width: 100%;
          height: 72px; /* Fixed initial height */
          padding: 0 32px;
          transition: all var(--duration-normal) var(--ease-out);
          --nav-text: var(--text-primary);
        }
        .navbar-pill.transparent {
          background: transparent;
          border: 1px solid transparent;
          box-shadow: none;
        }
        .navbar-pill.transparent.force-white {
          --nav-text: #ffffff;
        }
        /* White logo only — NOT the whole navbar, otherwise the dropdown menus
           inherit white text on their white panels and become invisible */
        .navbar-pill.transparent.force-white .navbar-brand {
          --text-primary: #ffffff;
        }
        .navbar-pill.glass-panel {
          border-radius: 100px;
          max-width: 1100px;
          height: 56px; /* Smoothly minimizes */
          padding: 0 24px;
        }

        .navbar-brand {
          grid-column: 1; /* explicit so actions stays in col 3 when links (col 2) is hidden on mobile */
          justify-self: start; /* stay natural width at the left of its column */
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
        }
        .navbar-logo {
          height: 32px;
          width: auto;
          transition: height var(--duration-normal) var(--ease-out);
        }
        .navbar-pill.glass-panel .navbar-logo {
          height: 28px; /* Logo slightly minimizes too */
        }

        .navbar-links {
          grid-column: 2;
          justify-self: center; /* centred column */
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }

        .nav-item-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 8px 0;
          min-width: 220px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          transition: all var(--duration-fast) var(--ease-out);
          display: flex;
          flex-direction: column;
          z-index: 105;
        }

        .nav-item-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          padding: 10px 20px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          transition: background var(--duration-fast), color var(--duration-fast);
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: var(--background-muted);
          color: var(--primary);
        }

        .navbar-actions {
          grid-column: 3; /* stays at the right even when links (col 2) is hidden */
          justify-self: end; /* stay natural width at the right of its column */
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: var(--nav-text);
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: none;
          transition: color var(--duration-fast) var(--ease-out);
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 2px;
          background-color: var(--primary);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform var(--duration-fast) var(--ease-out);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* Current page — fixed orange highlight + underline */
        .nav-link.active {
          color: var(--primary);
        }
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .mobile-nav-link.active {
          color: var(--primary);
        }

        /* Language dropdown */
        .lang-dropdown {
          position: relative;
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--nav-text);
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 6px 8px;
          transition: color var(--duration-fast) var(--ease-out);
        }
        .lang-btn:hover {
          color: var(--primary);
        }
        .lang-chevron {
          transition: transform var(--duration-fast) var(--ease-out);
        }
        .lang-chevron.open {
          transform: rotate(180deg);
        }
        .lang-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 6px;
          min-width: 160px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 110;
        }
        .lang-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm, 8px);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: background var(--duration-fast), color var(--duration-fast);
        }
        .lang-item:hover {
          background: var(--background-muted);
          color: var(--primary);
        }
        .lang-item.active {
          color: var(--primary);
          font-weight: 600;
        }
        .lang-check {
          margin-left: auto;
        }

        .theme-toggle-btn {
          background: transparent;
          border: none;
          color: var(--nav-text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--duration-fast) var(--ease-out);
        }
        .theme-toggle-btn:hover {
          color: var(--primary);
        }

        .mobile-hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--nav-text);
          cursor: pointer;
          z-index: 102;
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 36px;
          border-radius: 0;
        }

        .mobile-nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .desktop-cta { display: none !important; }
          .navbar-links { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
