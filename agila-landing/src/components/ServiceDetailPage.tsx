"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { CheckCircle2, ArrowRight, MapPin, Map, Mail, Phone, Plus, Minus } from "lucide-react";
import { LinkedinIcon as Linkedin, FacebookIcon as Facebook } from "./icons/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import ContactForm from "./sections/ContactForm";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [openSpec, setOpenSpec] = useState<number | null>(null);
  const data = SERVICES_CONFIG[slug];

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!data) return null;

  const specializations = data.specs[language] || data.specs["sv"];
  const specDescriptions = data.specDescriptions?.[language] || data.specDescriptions?.["sv"];
  const faqItems = data.faq?.[language] || data.faq?.["sv"];

  const faqLabel = language === "sv" ? "VANLIGA FRÅGOR" : "FREQUENTLY ASKED QUESTIONS";
  const faqHeading = language === "sv" ? "Frågor och svar" : "Questions & Answers";

  const toggleSpec = (idx: number) => {
    setOpenSpec(openSpec === idx ? null : idx);
  };

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
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src={data.image}
              alt={t(`services.${slug}.imgAlt`)}
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              priority
            />
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

              {/* Left Column */}
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

              {/* Right Column: Service Card */}
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

        {/* C. Specialisations Accordion */}
        <section id="specialisations" className="section section-bg-muted" style={{ padding: "80px 0 100px" }}>
          <div className="container-wide">
            <div className="text-center mb-48">
              <h2 className="heading-lg mb-16">{t("services.detail.specsHeading")}</h2>
              <p className="body-md text-secondary mx-auto" style={{ maxWidth: 650 }}>
                {t("services.detail.specsSubtitle")}
              </p>
            </div>

            <div className="specs-accordion">
              {specializations.map((spec, idx) => {
                const isOpen = openSpec === idx;
                const desc = specDescriptions?.[idx];
                return (
                  <motion.div
                    key={idx}
                    id={spec.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                    className={`accordion-item${isOpen ? " accordion-open" : ""}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                  >
                    <button
                      className="accordion-trigger"
                      onClick={() => toggleSpec(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="acc-number">{(idx + 1).toString().padStart(2, "0")}</span>
                      <span className="acc-title">{spec}</span>
                      <span className="acc-icon-wrap">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && desc && (
                        <motion.div
                          className="accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="accordion-inner">
                            <p className="accordion-desc">{desc}</p>
                            <a href="#request-service" className="acc-cta">
                              {t("services.btn.request")} <ArrowRight size={14} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* D. FAQ Section (only rendered if data.faq exists) */}
        {faqItems && faqItems.length > 0 && (
          <section className="section" style={{ background: "var(--background)", padding: "80px 0 100px" }}>
            <div className="container-wide">
              <div className="text-center mb-56">
                <span className="eyebrow d-block mb-16" style={{ color: "var(--brand-primary)" }}>
                  {faqLabel}
                </span>
                <h2 className="heading-lg">{faqHeading}</h2>
              </div>

              <div className="faq-grid">
                {faqItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="faq-card glass-panel"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
                  >
                    <div className="faq-q-row">
                      <span className="faq-icon">
                        <CheckCircle2 size={18} />
                      </span>
                      <h3 className="faq-question">{item.q}</h3>
                    </div>
                    <p className="faq-answer">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* E. Request Service / Contact Form */}
        <section id="request-service" className="section section-bg-muted" style={{ padding: "80px 0" }}>
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
                            {SITE_CONFIG.address.full}
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
                            <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "#fff", textDecoration: "none" }}>
                              {SITE_CONFIG.email}
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
                            <a href={SITE_CONFIG.phoneHref} style={{ color: "#fff", textDecoration: "none" }}>
                              {SITE_CONFIG.phone}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "auto", paddingTop: "40px" }}>
                      <h4 className="cp-info-label mb-16">{t("contact.flip.followUs")}</h4>
                      <div className="cp-social-row">
                        <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="cp-social-btn">
                          <Linkedin size={20} />
                          <span>LinkedIn</span>
                        </a>
                        <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="cp-social-btn">
                          <Facebook size={20} />
                          <span>Facebook</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Back: Map */}
                  <div className="cp-back">
                    <iframe
                      src={SITE_CONFIG.mapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Agil Arbetskraft Office Location"
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
        /* ─── Accordion ─── */
        .specs-accordion {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .accordion-item {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .accordion-item.accordion-open {
          border-color: rgba(250, 166, 50, 0.45);
          box-shadow: 0 4px 20px rgba(250, 166, 50, 0.07);
        }

        .accordion-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text-primary);
          transition: background 0.15s ease;
        }

        .accordion-trigger:hover {
          background: rgba(250, 166, 50, 0.04);
        }

        .acc-number {
          font-family: var(--font-brand);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-muted);
          opacity: 0.45;
          flex-shrink: 0;
          width: 22px;
        }

        .acc-title {
          flex: 1;
          font-family: var(--font-heading);
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .acc-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(250, 166, 50, 0.1);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .accordion-open .acc-icon-wrap {
          background: var(--brand-primary);
          color: #ffffff;
        }

        .accordion-inner {
          padding: 4px 24px 24px 62px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .accordion-desc {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.9375rem;
          margin: 0;
        }

        .acc-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--brand-primary);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .acc-cta:hover {
          gap: 10px;
        }

        /* ─── FAQ Grid ─── */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .faq-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .faq-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-q-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .faq-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .faq-question {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .faq-answer {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.75;
          padding-left: 30px;
        }

        /* ─── Contact Grid ─── */
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

        /* ─── Flip Card ─── */
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

        .cp-info-list { display: flex; flex-direction: column; gap: 32px; }
        .cp-info-item { display: flex; gap: 16px; align-items: flex-start; }
        .cp-info-icon {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(242,104,62,0.15); color: var(--brand-red-orange); flex-shrink: 0;
        }
        .cp-info-label {
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
          font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 6px;
        }
        .cp-info-text { font-size: 1rem; color: #ffffff; line-height: 1.5; }
        .cp-map-btn {
          margin-top: 10px;
          background: rgba(255,255,255,0.08) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
        }
        .cp-map-btn:hover { background: var(--brand-primary) !important; border-color: var(--brand-primary) !important; }
        .cp-social-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .cp-social-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 20px; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm);
          color: #ffffff; text-decoration: none; font-size: 0.875rem; font-weight: 500;
          transition: all 0.2s ease;
        }
        .cp-social-btn:hover { background: var(--brand-primary); border-color: var(--brand-primary); }

        /* ─── Overview Section ─── */
        .overview-grid {
          display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center;
        }
        @media (min-width: 1024px) {
          .overview-grid { grid-template-columns: 45% 55%; }
        }

        .value-highlights-list { display: flex; flex-direction: column; gap: 24px; }
        .highlight-item { display: flex; align-items: flex-start; gap: 16px; }
        .highlight-icon {
          flex-shrink: 0; color: var(--brand-primary);
          background: rgba(250, 166, 50, 0.1);
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .highlight-title {
          font-family: var(--font-heading); font-size: 1.125rem;
          font-weight: 600; color: var(--text-primary); margin-bottom: 4px;
        }
        .highlight-desc { font-size: 0.95rem; line-height: 1.5; }

        .premium-service-card {
          position: relative; border-radius: var(--radius-xl); overflow: hidden;
          background: #111113; box-shadow: 0 24px 60px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.1); min-height: 480px;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 48px;
        }
        .psc-bg-image { position: absolute; inset: 0; z-index: 0; }
        .psc-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(17,17,19,0.9) 0%, rgba(17,17,19,0.7) 100%);
          z-index: 1;
        }
        .psc-content { position: relative; z-index: 2; }
        .psc-badge {
          display: inline-flex; background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 100px;
          color: #ffffff; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.02em;
        }

        .section-connector {
          height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent);
          width: 80%; margin: 0 auto;
        }

        /* ─── Misc ─── */
        .inline-flex { display: inline-flex; align-items: center; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }
        .mb-48 { margin-bottom: 48px; }
        .mb-56 { margin-bottom: 56px; }
        .text-white { color: #ffffff !important; }
        .d-block { display: block; }
      `}</style>
    </>
  );
}
