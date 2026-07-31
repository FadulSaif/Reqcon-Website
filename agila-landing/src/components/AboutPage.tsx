"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import { Clock, Briefcase, Settings, ArrowRight } from "lucide-react";
import { TEAM_MEMBERS, SERVICE_OPTIONS } from "@/lib/team-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONFIG } from "@/lib/site-config";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="about-page-wrapper">
        
        {/* Section 1: About Hero (Text separated from image) */}
        <section id="about-hero" className="hero-section">
          <div className="container-wide text-center">
            <motion.div
              className="hero-text-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="section-eyebrow">{t("about.page.hero.eyebrow")}</span>
              <h1 className="heading-xl mb-24">
                {t("about.page.hero.title")}
              </h1>
              <p className="body-lg text-secondary mx-auto mb-16" style={{ maxWidth: "800px" }}>
                {t("about.page.hero.desc")}
              </p>
              <p className="body-lg text-secondary mx-auto" style={{ maxWidth: "800px" }}>
                {t("about.page.hero.desc2")}
              </p>
            </motion.div>
          </div>

        </section>

        {/* Section 2: Vision & History */}
        <section className="about-vision-section section pt-0">
          <div className="container-wide">
            <div className="vision-grid">
              
              {/* Left: Expanded Corporate Story */}
              <motion.div
                className="vision-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="section-eyebrow vision-eyebrow">
                  {t("about.eyebrow")}
                </span>
                <h2 className="vision-heading">
                  {t("about.page.vision.title")}
                </h2>
                <div className="body-punchy">
                  <p>
                    {t("about.page.vision.p1")}
                  </p>
                  <p>
                    {t("about.page.vision.p2")}
                  </p>
                  <p>
                    {t("about.page.vision.p3")}
                  </p>
                </div>
              </motion.div>

              {/* Right: Integrated Images */}
              <motion.div
                className="vision-visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div className="vision-logo-wrap">
                  {/* unoptimized: the optimizer refuses SVG unless
                      dangerouslyAllowSVG is set, and a vector mark has
                      nothing to gain from it anyway. */}
                  <Image
                    src="/assets/agil-mark.svg"
                    alt="Agil Arbetskraft logo"
                    width={520}
                    height={526}
                    unoptimized
                    className="vision-logo"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="about-pillars-section section section-bg-muted">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="section-eyebrow">{t("about.page.why.eyebrow")}</span>
              <h2 className="heading-lg">{t("about.page.why.title")}</h2>
              <p className="body-lg text-secondary mx-auto mt-16" style={{ maxWidth: "600px" }}>
                {t("about.page.why.subtitle")}
              </p>
            </motion.div>
            
            <div className="pillars-grid">
              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3 }}
              >
                <div className="pillar-icon">
                  <Clock size={32} />
                </div>
                <h3 className="heading-md mb-16">{t("about.page.why.f1.title")}</h3>
                <p className="body-md text-secondary">
                  {t("about.page.why.f1.desc")}
                </p>
              </motion.div>

              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="pillar-icon">
                  <Briefcase size={32} />
                </div>
                <h3 className="heading-md mb-16">{t("about.page.why.f2.title")}</h3>
                <p className="body-md text-secondary">
                  {t("about.page.why.f2.desc")}
                </p>
              </motion.div>

              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="pillar-icon">
                  <Settings size={32} />
                </div>
                <h3 className="heading-md mb-16">{t("about.page.why.f3.title")}</h3>
                <p className="body-md text-secondary">
                  {t("about.page.why.f3.desc")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Meet the Team */}
        <section className="about-team-section section">
          <div className="container-wide">
            <motion.div
              className="text-center mb-48"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3 }}
            >
              <span className="section-eyebrow">{t("about.page.team.eyebrow")}</span>
              <h2 className="heading-lg">{t("about.page.team.title")}</h2>
              <p className="body-lg text-secondary mx-auto mt-16" style={{ maxWidth: "600px" }}>
                {t("about.page.team.subtitle")}
              </p>
            </motion.div>

            <div className="about-team-grid">
              {TEAM_MEMBERS.map((member, idx) => (
                <motion.div
                  key={member.id}
                  className="about-team-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: idx * 0.08, ease: "easeOut" }}
                >
                  <div className="about-team-img">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="about-team-photo"
                    />
                  </div>
                  <div className="about-team-info">
                    <h3 className="heading-sm">{member.name}</h3>
                    <p className="about-team-role">{t(member.titleKey)}</p>
                    <a className="about-team-email" href={`mailto:${member.email}`}>
                      {member.email}
                    </a>
                    <p className="body-md text-secondary mb-12">{t(member.bioKey)}</p>
                    <div className="about-team-tags">
                      {member.services.map((slug) => {
                        const svc = SERVICE_OPTIONS.find((s) => s.slug === slug);
                        return (
                          <span key={slug} className="about-team-tag">
                            {svc?.labelKey ? t(svc.labelKey) : slug}
                          </span>
                        );
                      })}
                    </div>
                    <a
                      href={`/contact?service=${member.services[0]}#contact-form`}
                      className="btn btn-primary btn-sm about-team-btn"
                    >
                      {t("contact.btn.contact")} {member.name.split(" ")[0]}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Location & Info */}
        <section className="about-info-section section">
          <div className="container-wide">
            <div className="info-grid">
              
              <motion.div 
                className="info-details"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="heading-lg mb-32">{t("about.page.visit.title")}</h2>
                
                <div className="info-block mb-32">
                  <h3 className="heading-sm mb-8 text-brand">{t("about.page.visit.address")}</h3>
                  <p className="body-md text-secondary">
                    {SITE_CONFIG.companyName}<br />
                    {SITE_CONFIG.address.street}<br />
                    {SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                  </p>
                </div>

                <div className="info-block mb-32">
                  <h3 className="heading-sm mb-8 text-brand">{t("about.page.visit.hours")}</h3>
                  <ul className="hours-list body-md text-secondary">
                    <li><span>{t("about.page.visit.sun")}</span> <span>{t("about.page.visit.closed")}</span></li>
                    <li><span>{t("about.page.visit.mon_fri")}</span> <span>{SITE_CONFIG.openingHours.weekdays}</span></li>
                    <li><span>{t("about.page.visit.sat")}</span> <span>{t("about.page.visit.closed")}</span></li>
                  </ul>
                </div>

                <div className="info-block">
                  <h3 className="heading-sm mb-8 text-brand">{t("about.page.visit.follow")}</h3>
                  <div className="social-links">
                    <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">Facebook</a>
                    <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LinkedIn</a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="info-map glass-panel"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <iframe
                  src={SITE_CONFIG.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px", borderRadius: "calc(var(--radius-lg) - 4px)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Agil Arbetskraft location"
                ></iframe>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* Section 5: Conversion CTA */}
        <section className="about-cta-section">
          {/* Background Image */}
          <div className="cta-bg-image">
            <Image
              src="/assets/industry-warehous.jpg"
              alt="Agil Arbetskraft – verksamhet i Sverige"
              fill
              className="cta-bg-img"
            />
            <div className="cta-overlay" />
          </div>

          <div className="container-wide relative z-10">
            <motion.div 
              className="about-cta-content text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="heading-xl mb-16 text-white">{t("about.page.cta.title")}</h2>
              <p className="body-lg mb-40 text-white opacity-80 mx-auto" style={{ maxWidth: "600px" }}>
                {t("about.page.cta.desc")}
              </p>
              <div className="cta-button-group">
                <Link href="/services" className="btn btn-primary hover-lift">
                  {t("about.page.cta.btn1")}
                </Link>
                <Link href="/contact#contact-form" className="btn btn-outline hover-lift dark-invert-btn">
                  {t("about.page.cta.btn2")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        /* Page Level */
        .about-page-wrapper {
          width: 100%;
        }

        /* Hero */
        .hero-section {
          width: 100%;
          background: var(--background);
          padding-top: clamp(88px, 10vh, 110px);
          padding-bottom: clamp(20px, 4vw, 40px);
        }

        .hero-text-block {
          padding: 0 16px;
        }

        .mb-8 { margin-bottom: 8px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }

        .d-block { display: block; }
        .text-center { text-align: center; }
        .text-white { color: #ffffff !important; }
        .text-brand { color: var(--brand-primary); }
        .opacity-80 { opacity: 0.8; }
        .relative { position: relative; }
        .z-10 { z-index: 10; }

        /* Vision Section */
        .about-vision-section {
          background: #f4f5f7;
          padding: clamp(72px, 8vw, 128px) 0 !important;
        }

        .vision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(48px, 7vw, 96px);
          align-items: center;
        }

        @media (min-width: 768px) {
          .vision-grid {
            grid-template-columns: minmax(0, 1.45fr) minmax(260px, 1fr);
          }
        }

        .vision-content {
          max-width: 760px;
        }

        .vision-eyebrow {
          display: block;
          margin-bottom: clamp(18px, 2vw, 28px);
        }

        .vision-heading {
          max-width: 720px;
          margin: 0 0 clamp(28px, 3vw, 40px);
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 4.6vw, 4.75rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .body-punchy {
          max-width: 720px;
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.15vw, 1.125rem);
          color: var(--text-secondary);
          line-height: 1.85;
        }

        .body-punchy p {
          margin: 0;
        }

        .body-punchy p + p {
          margin-top: clamp(20px, 2vw, 28px);
        }

        .vision-visual {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vision-logo-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vision-logo {
          width: min(100%, 520px);
          height: auto;
        }

        @media (max-width: 1023px) {
          .vision-heading {
            font-size: clamp(2.25rem, 5vw, 3.5rem);
          }

          .vision-logo {
            width: min(100%, 360px);
          }
        }

        @media (max-width: 767px) {
          .about-vision-section {
            padding: 64px 0 56px !important;
          }

          .vision-grid {
            gap: 40px;
          }

          .vision-heading {
            font-size: clamp(2.25rem, 11vw, 3.25rem);
          }

          .vision-logo {
            width: min(78vw, 300px);
          }
        }

        /* Pillars Section */

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .pillar-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }

        .pillar-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background: rgba(242, 104, 62, 0.1);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        /* Info & Location Section */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: flex-start;
        }

        @media (min-width: 1024px) {
          .info-grid {
            grid-template-columns: 1fr 1.5fr;
          }
        }

        .info-details {
          max-width: 400px;
        }

        .hours-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .hours-list li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }

        .hours-list li:last-child {
          border-bottom: none;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          color: var(--text-primary);
          font-weight: 500;
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: all 0.2s ease-in-out;
        }

        .social-link:hover {
          color: var(--brand-primary);
          text-decoration-color: var(--brand-primary);
        }

        .info-map {
          width: 100%;
          height: 100%;
          min-height: 400px;
          padding: 8px; /* Frame around map */
        }

        /* CTA Section */
        .about-cta-section {
          position: relative;
          padding: clamp(80px, 10vw, 120px) 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cta-bg-image {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .cta-bg-img {
          object-fit: cover;
          object-position: center;
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(17, 17, 19, 0.9) 0%, rgba(17, 17, 19, 0.7) 100%);
        }

        .about-cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-button-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 640px) {
          .cta-button-group {
            flex-direction: row;
            gap: 24px;
          }
        }

        .dark-invert-btn {
          border-color: rgba(255, 255, 255, 0.4) !important;
          color: #FAFAFA !important;
        }
        
        .dark-invert-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #FAFAFA !important;
        }

        /* Team Section */
        .about-team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .about-team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .about-team-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .about-team-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          height: 100%;
          padding: clamp(12px, 1.5vw, 20px) 0;
        }

        .about-team-img {
          position: relative;
          width: 88px;
          height: 88px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          margin-bottom: 24px;
        }
        .about-team-photo {
          object-fit: cover;
          object-position: center;
        }

        .about-team-info {
          width: 100%;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .about-team-role {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--brand-primary);
          text-transform: none;
          letter-spacing: 0.06em;
          margin: 6px 0 8px;
        }

        .about-team-email {
          margin-bottom: 16px;
          color: var(--brand-primary);
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.5;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 0.2s ease;
        }

        .about-team-email:hover {
          color: var(--brand-accent);
          text-decoration: underline;
        }

        .about-team-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px; /* consistent gap before the button, matching the contact page */
        }
        .about-team-tag {
          padding: 3px 10px;
          border-radius: 100px;
          background: var(--accent-soft);
          color: var(--text-secondary);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .about-team-btn {
          margin-top: auto;
          align-self: flex-start;
        }

        @media (min-width: 768px) {
          .about-team-img {
            width: 100px;
            height: 100px;
          }
        }

        @media (min-width: 1024px) {
          .about-team-img {
            width: 112px;
            height: 112px;
          }
        }

        .mt-16 { margin-top: 16px; }
      `}</style>
    </>
  );
}
