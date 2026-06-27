"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import LogoReversed from "../logos/LogoReversed";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_CONFIG } from "@/lib/services-data";

const NAV_LINKS = [
  { translationKey: "nav.home", href: "/" },
  { translationKey: "nav.jobVacancies", href: "https://jobb.agilarbetskraft.se/" },
  { translationKey: "nav.services", href: "/services" },
  { translationKey: "nav.about", href: "/about" },
  { translationKey: "nav.contact", href: "/contact" },
];

export default function Navbar({ forceTransparentWhite = false }: { forceTransparentWhite?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

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
          {/* Logo */}
          <a href="#hero" className="navbar-brand hover-lift">
            <LogoReversed className="navbar-logo" />
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {NAV_LINKS.map((link) => {
              if (link.translationKey === "nav.services") {
                return (
                  <li key={link.href} className="nav-item-dropdown">
                    <a href={link.href} className="nav-link">
                      {t(link.translationKey)}
                    </a>
                    <div className="dropdown-menu glass-panel">
                      {Object.keys(SERVICES_CONFIG).map((slug) => (
                        <a key={slug} href={`/services/${slug}`} className="dropdown-item">
                          {t(`services.${slug}.title`)}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">
                    {t(link.translationKey)}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="navbar-actions">
            {/* Language Toggle */}
            {mounted && (
              <button
                onClick={() => setLanguage(language === "sv" ? "en" : "sv")}
                className="navbar-icon-btn desktop-cta"
                aria-label="Toggle language"
              >
                <Globe size={18} />
                <span>{language.toUpperCase()}</span>
              </button>
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
            <a href="/contact" className="btn btn-primary btn-sm desktop-cta hover-lift">
              {t("nav.requestStaff")}
            </a>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay glass-panel"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                className="mobile-nav-link"
              >
                {t(link.translationKey)}
              </motion.a>
            ))}
            <motion.a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {t("nav.requestStaff")}
            </motion.a>
            
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                style={{ display: "flex", gap: "24px", marginTop: "16px" }}
              >
                <button
                  onClick={() => setLanguage(language === "sv" ? "en" : "sv")}
                  className="theme-toggle-btn"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.25rem", fontWeight: 500 }}
                >
                  <Globe size={24} /> {language.toUpperCase()}
                </button>
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

        .navbar-pill {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          --text-primary: #ffffff;
        }
        .navbar-pill.glass-panel {
          border-radius: 100px;
          max-width: 1100px;
          height: 56px; /* Smoothly minimizes */
          padding: 0 24px;
        }

        .navbar-brand {
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
          text-transform: uppercase;
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
