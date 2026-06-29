"use client";

import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { LinkedinIcon as Linkedin, FacebookIcon as Facebook } from "../icons/SocialIcons";
import LogoReversed from "../logos/LogoReversed";
import LogoSymbol from "../logos/LogoSymbol";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONFIG } from "@/lib/site-config";

const FOOTER_LINKS = [
  { translationKey: "nav.home", href: "#hero" },
  { translationKey: "footer.portfolio", href: "#portfolio" },
  { translationKey: "footer.industries", href: "#industries" },
  { translationKey: "nav.services", href: "#services" },
  { translationKey: "footer.aboutUs", href: "#why-agil" },
  { translationKey: "nav.contact", href: "/contact" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer-premium">
      <div className="container-wide">
        
        {/* Top Section - Structured Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand Anchor (max 30%) */}
          <div className="footer-col brand-col">
            <a href="#hero" style={{ 
              display: "inline-block", 
              marginBottom: "24px",
              "--text-primary": "#ffffff",
              "--brand-primary": "#ffffff",
              "--brand-accent": "rgba(255,255,255,0.8)"
            } as React.CSSProperties}>
              <LogoReversed style={{ height: 40, width: "auto" }} />
            </a>
            <h3 className="footer-slogan">
              {t("footer.slogan")}
            </h3>
            <p className="footer-description">
              {t("footer.description")}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">{t("footer.navigation")}</h4>
            <nav className="footer-nav-list">
              {FOOTER_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="footer-link group">
                  <span>{t(link.translationKey)}</span>
                  <ArrowUpRight size={14} className="link-arrow" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">{t("footer.getInTouch")}</h4>
            <div className="footer-nav-list">
              <a href={`mailto:${SITE_CONFIG.email}`} className="footer-link contact-link">
                <div className="contact-icon-wrapper"><Mail size={16} /></div>
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a href={SITE_CONFIG.phoneHref} className="footer-link contact-link">
                <div className="contact-icon-wrapper"><Phone size={16} /></div>
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Socials */}
          <div className="footer-col">
            <h4 className="footer-heading">{t("footer.followUs")}</h4>
            <div className="footer-socials-flat">
              <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-flat">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-link-flat">
                <Facebook size={20} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-grid">
          <div className="footer-bottom-left">
            <p className="copyright">
              © {new Date().getFullYear()} Agil Arbetskraft. {t("footer.rights")}
            </p>
            <span className="dot-separator hidden-mobile">•</span>
            <div className="footer-bottom-links">
              <a href="#privacy">{t("footer.privacyPolicy")}</a>
              <span className="dot-separator">•</span>
              <a href="#terms">{t("footer.termsOfService")}</a>
            </div>
          </div>

          <div className="footer-bottom-right">
            <a href="#hero" aria-label="Back to top" style={{
              display: "inline-flex",
              opacity: 0.5,
              transition: "opacity 0.3s ease",
              marginLeft: "40px",
              "--text-primary": "#ffffff",
              "--brand-primary": "#FAFAFA",
              "--brand-accent": "var(--primary)"
            } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.5"}>
              <LogoSymbol style={{ width: 28, height: 28 }} />
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-premium {
          background: #111113;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: clamp(80px, 10vw, 120px) 0 40px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle glowing orb in background for premium feel */
        .footer-premium::before {
          content: "";
          position: absolute;
          top: 0;
          right: 10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%);
          opacity: 0.8;
          pointer-events: none;
          transform: translateY(-50%);
        }

        .footer-grid, .footer-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: flex-start;
        }

        .footer-grid {
          margin-bottom: clamp(60px, 8vw, 100px);
        }

        .footer-bottom-grid {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 24px;
        }

        @media (min-width: 768px) {
          .footer-grid, .footer-bottom-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid, .footer-bottom-grid {
            grid-template-columns: 30% 1fr 1fr 1fr;
            gap: 40px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .brand-col {
          padding-right: 20px;
        }

        .footer-slogan {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 500;
          color: #FAFAFA;
          line-height: 1.2;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .text-highlight {
          color: var(--primary);
          font-weight: 600;
        }

        .footer-description {
          color: #A1A1AA;
          font-size: 1.0625rem;
          line-height: 1.6;
        }

        .footer-heading {
          font-family: var(--font-heading);
          color: #FAFAFA;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }

        .footer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #A1A1AA;
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary);
          border-bottom-color: var(--primary);
          padding-left: 8px;
        }

        .link-arrow {
          opacity: 0;
          transform: translate(-10px, 10px);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .footer-link:hover .link-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        .contact-link {
          justify-content: flex-start;
          gap: 16px;
          border-bottom: none;
          padding-bottom: 0;
        }

        .contact-link:hover {
          padding-left: 0;
          transform: translateX(8px);
        }

        .contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FAFAFA;
          transition: all 0.3s ease;
        }

        .contact-link:hover .contact-icon-wrapper {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
        }

        .footer-socials-flat {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .social-link-flat {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #A1A1AA;
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .social-link-flat:hover {
          color: var(--primary);
        }

        .footer-bottom-left {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        @media (min-width: 1024px) {
          .footer-bottom-left {
            grid-column: 1 / 4;
            flex-direction: row;
            align-items: center;
            gap: 24px;
          }
        }

        .copyright {
          color: #71717A;
          font-size: 0.875rem;
        }

        .hidden-mobile {
          display: none;
        }

        @media (min-width: 768px) {
          .hidden-mobile {
            display: inline;
          }
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-bottom-links a {
          color: #A1A1AA;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--primary);
        }

        .dot-separator {
          color: rgba(255, 255, 255, 0.1);
          font-size: 0.875rem;
        }

        .footer-bottom-right {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
      `}</style>
    </footer>
  );
}
