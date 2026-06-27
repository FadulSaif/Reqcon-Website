"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { CheckCircle2, ArrowRight, MapPin, Map, Mail, Phone } from "lucide-react";
import { LinkedinIcon as Linkedin, FacebookIcon as Facebook } from "./icons/SocialIcons";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import ContactForm from "./sections/ContactForm";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const data = SERVICES_CONFIG[slug];

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!data) return null;

  const specializations = data.specs[language] || data.specs["sv"];
  
  return (
    <>
      <Navbar forceTransparentWhite={true} />
      <main style={{ minHeight: "auto", background: "var(--background)", display: "flex", flexDirection: "column" }}>
        
        {/* A. Hero Section */}
        <section style={{ 
          position: "relative", 
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(88px, 10vh, 110px) 20px 60px 20px",
          overflow: "hidden" 
        }}>
          {/* Background Image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src={data.image}
              alt={t(`services.${slug}.imgAlt`)}
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to bottom, rgba(17, 17, 19, 0.75), rgba(17, 17, 19, 0.95))" 
            }} />
          </div>

          <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%" }}>
            <Link href="/services" style={{ 
              color: "var(--brand-primary)", 
              fontWeight: 600, 
              display: "inline-flex", 
              alignItems: "center",
              gap: 8,
              marginBottom: 24, 
              textDecoration: "none",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }} className="hover-lift">
              <span style={{ fontSize: "1.2rem" }}>←</span> {t("services.btn.back")}
            </Link>
            
            <h1 className="heading-display mb-24" style={{ color: "#ffffff", maxWidth: 900, margin: "0 auto" }}>
              {t(`services.${slug}.title`)}
            </h1>
            
            <p className="body-lg mb-40" style={{ color: "#ffffff", opacity: 0.9, maxWidth: 700, margin: "0 auto" }}>
              {t(`services.${slug}.cardDesc`)}
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#request-service" className="btn btn-primary btn-lg hover-lift inline-flex">
                {t("services.detail.reqBtn")} <ArrowRight size={20} style={{ marginLeft: 8 }} />
              </a>
            </div>
          </div>
        </section>

        {/* B. Overview / Value Section */}
        <section className="section overview-section" style={{ background: "var(--background)", padding: "100px 0 60px" }}>
          <div className="container-wide">
            <div className="overview-grid">
              
              {/* Left Column: Text & Value Highlights */}
              <motion.div 
                className="overview-content"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="eyebrow d-block mb-16" style={{ color: "var(--brand-primary)" }}>
                  {t("services.detail.overviewEyebrow")}
                </span>
                <h2 className="heading-lg mb-24">{t("services.detail.overviewHeading")}</h2>
                <p className="body-lg text-secondary mb-40" style={{ lineHeight: 1.8 }}>
                  {t("services.detail.helpText")}
                </p>

                <div className="value-highlights-list">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="highlight-item">
                      <div className="highlight-icon">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h4 className="highlight-title">{t(`services.detail.hl${num}Title`)}</h4>
                        <p className="highlight-desc text-secondary">{t(`services.detail.hl${num}Desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Premium Service Card */}
              <motion.div 
                className="overview-visual"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div className="premium-service-card hover-lift">
                  <div className="psc-bg-image">
                    <Image
                      src={data.image}
                      alt=""
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="psc-overlay" />
                  </div>
                  <div className="psc-content">
                    <h3 className="heading-md mb-16 text-white">{t(`services.${slug}.title`)}</h3>
                    <p className="body-md text-white mb-32" style={{ opacity: 0.9, lineHeight: 1.7 }}>
                      {t(`services.${slug}.intro`)}
                    </p>
                    <div className="psc-badge">
                      <span>{t("services.detail.specsCount").replace("{count}", specializations.length.toString())}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visual Connector */}
        <div className="section-connector" />

        {/* C. Specialisations Section */}
        <section id="specialisations" className="section section-bg-muted" style={{ padding: "80px 0 100px" }}>
          <div className="container-wide">
            <div className="text-center mb-48">
              <h2 className="heading-lg mb-16">{t("services.detail.specsHeading")}</h2>
              <p className="body-md text-secondary mx-auto" style={{ maxWidth: 650 }}>
                {t("services.detail.specsSubtitle")}
              </p>
            </div>

            <div className="capability-grid">
              {specializations.map((spec, idx) => (
                <div key={idx} className="capability-card hover-lift">
                  <div className="cap-card-header">
                    <span className="cap-number">{(idx + 1).toString().padStart(2, '0')}</span>
                    <CheckCircle2 size={18} className="cap-icon" />
                  </div>
                  <h4 className="cap-title">{spec}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E. Direct Request Service section */}
        <section id="request-service" className="section" style={{ background: "var(--background)", padding: "80px 0" }}>
          <div className="container-wide">
            <div className="text-center mb-48">
              <span className="label d-block mb-16">{t("contact.form.eyebrow")}</span>
              <h2 className="heading-lg">{t("contact.form.title")}</h2>
            </div>

            <div className="cp-contact-grid">
              {/* Left: Form */}
              <motion.div
                className="cp-form-wrapper glass-panel"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ContactForm 
                  defaultService={slug} 
                  defaultMessage={language === "sv" 
                    ? `Hej, jag är intresserad av tjänsten ${t(`services.${slug}.title`)} och vill gärna få mer information.`
                    : `Hello, I am interested in the ${t(`services.${slug}.title`)} service and would like to receive more information.`
                  }
                />
              </motion.div>

              {/* Right: Flip Card */}
              <motion.div
                className={`cp-flip-container ${isFlipped ? "flipped" : ""}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
              >
                <div className="cp-flipper">
                  {/* Front */}
                  <div className="cp-front">
                    <h3 className="heading-lg mb-32 text-white">
                      {t("contact.flip.title")}
                    </h3>
                    <p className="body-lg mb-40" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {t("contact.flip.desc")}
                    </p>

                    <div className="cp-info-list">
                      <div className="cp-info-item">
                        <div className="cp-info-icon">
                          <MapPin size={22} />
                        </div>
                        <div>
                          <h4 className="cp-info-label">{t("contact.flip.headOffice")}</h4>
                          <p className="cp-info-text">
                            Kungsgatan 15, 111 43 Stockholm, Sweden
                          </p>
                          <button
                            onClick={() => setIsFlipped(true)}
                            className="btn btn-sm cp-map-btn"
                          >
                            <Map size={14} /> {t("contact.flip.viewMap")}
                          </button>
                        </div>
                      </div>

                      <div className="cp-info-item">
                        <div className="cp-info-icon">
                          <Mail size={22} />
                        </div>
                        <div>
                          <h4 className="cp-info-label">{t("contact.flip.emailUs")}</h4>
                          <p className="cp-info-text">
                            <a href="mailto:info@agil.se" style={{ color: "#fff", textDecoration: "none" }}>
                              info@agil.se
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="cp-info-item">
                        <div className="cp-info-icon">
                          <Phone size={22} />
                        </div>
                        <div>
                          <h4 className="cp-info-label">{t("contact.flip.callUs")}</h4>
                          <p className="cp-info-text">
                            <a href="tel:+4681234567" style={{ color: "#fff", textDecoration: "none" }}>
                              +46 8 123 4567
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "auto", paddingTop: "40px" }}>
                      <h4 className="cp-info-label mb-16">{t("contact.flip.followUs")}</h4>
                      <div className="cp-social-row">
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-social-btn"
                        >
                          <Linkedin size={20} />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-social-btn"
                        >
                          <Facebook size={20} />
                          <span>Facebook</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Back: Map */}
                  <div className="cp-back">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.0390234123515!2d18.06821817743516!3d59.33230621063688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5c48b29f79%3A0xc3317f22312d8a0d!2sKungsgatan%2015%2C%20111%2043%20Stockholm!5e0!3m2!1sen!2sse!4v1716900000000!5m2!1sen!2sse"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="btn btn-secondary btn-sm cp-back-btn"
                      style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 10 }}
                    >
                      {t("contact.btn.back")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        .specialisations-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        @media (min-width: 640px) {
          .specialisations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .specialisations-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .spec-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .spec-card:hover {
          border-color: rgba(242, 104, 62, 0.4);
          box-shadow: 0 8px 24px rgba(242, 104, 62, 0.08);
          transform: translateY(-2px);
        }

        .spec-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(242, 104, 62, 0.15);
          color: var(--brand-red-orange);
          flex-shrink: 0;
        }
        
        .spec-icon {
          color: var(--brand-red-orange);
        }

        .spec-text {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9375rem;
          line-height: 1.4;
        }

        .cp-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 48px);
          align-items: stretch;
        }
        @media (min-width: 1024px) {
          .cp-contact-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        .cp-form-wrapper {
          padding: clamp(28px, 4vw, 44px);
          border-radius: var(--radius-xl);
        }

        /* ─── Flip Card (Contact Info Panel) ─── */
        .cp-flip-container {
          perspective: 1500px;
          border-radius: var(--radius-xl);
        }
        .cp-flipper {
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
          min-height: 580px;
        }
        .cp-flip-container.flipped .cp-flipper {
          transform: rotateY(180deg);
        }
        .cp-flip-container.flipped .cp-front { pointer-events: none; }
        .cp-flip-container:not(.flipped) .cp-back { pointer-events: none; }

        .cp-front, .cp-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .cp-front {
          background: linear-gradient(145deg, #1A1F2B 0%, #11151D 100%);
          display: flex;
          flex-direction: column;
          padding: clamp(28px, 4vw, 44px);
          z-index: 2;
        }
        .cp-front::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(242,104,62,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-back {
          background: var(--bg-elevated);
          transform: rotateY(180deg);
        }
        .cp-back-btn {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        /* Info items */
        .cp-info-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .cp-info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .cp-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(242,104,62,0.15);
          color: var(--brand-red-orange);
          flex-shrink: 0;
        }
        .cp-info-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
        }
        .cp-info-text {
          font-size: 1rem;
          color: #ffffff;
          line-height: 1.5;
        }
        .cp-map-btn {
          margin-top: 10px;
          background: rgba(255,255,255,0.08) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
        }
        .cp-map-btn:hover {
          background: var(--brand-primary) !important;
          border-color: var(--brand-primary) !important;
        }

        .cp-social-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cp-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-sm);
          color: #ffffff;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .cp-social-btn:hover {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
        }
        
        .inline-flex { display: inline-flex; align-items: center; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }
        .mb-48 { margin-bottom: 48px; }
        .mb-56 { margin-bottom: 56px; }
        .text-white { color: #ffffff !important; }
        .d-block { display: block; }

        /* ─── NEW SERVICE SHOWCASE CSS ─── */
        
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .overview-grid {
            grid-template-columns: 45% 55%;
          }
        }

        .value-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .highlight-icon {
          flex-shrink: 0;
          color: var(--brand-primary);
          background: rgba(250, 166, 50, 0.1);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .highlight-title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .highlight-desc {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .premium-service-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #111113;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 48px;
        }

        .psc-bg-image {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .psc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(17, 17, 19, 0.9) 0%, rgba(17, 17, 19, 0.7) 100%);
          z-index: 1;
        }

        .psc-content {
          position: relative;
          z-index: 2;
        }

        .psc-badge {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 100px;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .section-connector {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          width: 80%;
          margin: 0 auto;
        }

        .capability-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .capability-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .capability-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .capability-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .capability-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
          border-color: rgba(250, 166, 50, 0.3);
        }

        .dark .capability-card:hover {
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .cap-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cap-number {
          font-family: var(--font-brand);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-muted);
          opacity: 0.5;
        }

        .cap-icon {
          color: var(--brand-primary);
        }

        .cap-title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }
      `}</style>
    </>
  );
}
