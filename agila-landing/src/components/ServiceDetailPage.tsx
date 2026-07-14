"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { getTeamMemberForService, SERVICE_OPTIONS, getServiceLabelKey } from "@/lib/team-data";
import { CheckCircle2, ArrowRight, Mail, Phone, Plus, Minus, Send } from "lucide-react";
import { LinkedinIcon as Linkedin } from "./icons/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import ContactForm from "./sections/ContactForm";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const [openSpec, setOpenSpec] = useState<number | null>(null);
  const [preSelectedSpecs, setPreSelectedSpecs] = useState<string[]>([]);
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

            <p className="body-lg" style={{ color: "#ffffff", opacity: 0.9, maxWidth: 700, margin: "0 auto 44px" }}>
              {t(`services.${slug}.cardDesc`)}
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#request-service" className="btn btn-primary hover-lift inline-flex">
                {t("services.detail.reqBtn")} <ArrowRight size={18} style={{ marginLeft: 8 }} />
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
                            <button
                              className="acc-cta"
                              onClick={() => {
                                setPreSelectedSpecs([spec]);
                                document.getElementById("request-service")?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                            >
                              {t("services.btn.request")} <ArrowRight size={14} />
                            </button>
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
        <section id="request-service" className="section section-bg-muted" style={{ padding: "40px 0" }}>
          <div className="container-wide">
            <div className="text-center mb-24">
              <span className="label d-block mb-12">{t("contact.form.eyebrow")}</span>
              <h2 className="heading-lg">{t("contact.form.title")}</h2>
            </div>

            <div className="sdp-contact-wrap">
              <div className="sdp-contact-grid">
                {/* Left: Form */}
                <motion.div
                  className="sdp-form-col"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ContactForm
                    defaultService={slug}
                    lockedService={true}
                    hideServiceDropdown={true}
                    hideRoutingBadge={true}
                    specializations={specializations}
                    preSelectedSpecs={preSelectedSpecs}
                    defaultMessage={language === "sv"
                      ? `Hej, jag är intresserad av tjänsten ${t(`services.${slug}.title`)} och vill gärna få mer information.`
                      : `Hello, I am interested in the ${t(`services.${slug}.title`)} service and would like to receive more information.`
                    }
                  />
                </motion.div>

                {/* Right: Team member card */}
                {(() => {
                  const member = getTeamMemberForService(slug);
                  if (!member) return null;
                  return (
                    <motion.div
                      className="sdp-member-card"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
                    >
                      <div className="sdp-member-avatar-wrap">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="sdp-member-avatar"
                        />
                      </div>
                      <h3 className="sdp-member-name">{member.name}</h3>
                      <p className="sdp-member-role">{t(member.titleKey)}</p>
                      <p className="sdp-member-bio">{t(member.bioKey)}</p>

                      <div className="sdp-member-contacts">
                        <a href={`mailto:${member.email}`} className="sdp-member-contact-row">
                          <div className="sdp-member-icon"><Mail size={16} /></div>
                          <div>
                            <span className="sdp-member-contact-label">{t("contact.lbl.email")}</span>
                            <span className="sdp-member-contact-value">{member.email}</span>
                          </div>
                        </a>
                        <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="sdp-member-contact-row">
                          <div className="sdp-member-icon"><Phone size={16} /></div>
                          <div>
                            <span className="sdp-member-contact-label">{t("contact.lbl.phone")}</span>
                            <span className="sdp-member-contact-value">{member.phone}</span>
                          </div>
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="sdp-member-contact-row">
                          <div className="sdp-member-icon"><Linkedin size={16} /></div>
                          <div>
                            <span className="sdp-member-contact-label">{t("contact.lbl.linkedin")}</span>
                            <span className="sdp-member-contact-value">{t("contact.lbl.viewProfile")}</span>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
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

        /* ─── Contact Section (Service Detail) ─── */
        .sdp-contact-wrap {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .sdp-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
          background: var(--border, #e5e7eb);
        }
        @media (min-width: 1024px) {
          .sdp-contact-grid {
            grid-template-columns: 1fr 300px;
          }
        }

        .sdp-form-col {
          padding: clamp(18px, 2.5vw, 28px);
          background: var(--surface);
          border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-xl);
        }

        @media (min-width: 1024px) {
          .sdp-form-col {
            border-radius: var(--radius-xl) 0 0 var(--radius-xl);
          }
        }

        /* ─── Team Member Card (right column) ─── */
        .sdp-member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 28px 20px;
          background: linear-gradient(145deg, #1A1F2B 0%, #11151D 100%);
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-xl);
        }

        @media (min-width: 1024px) {
          .sdp-member-card {
            border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
          }
        }

        .sdp-member-card::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(242,104,62,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .sdp-member-avatar-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--brand-red-orange);
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        .sdp-member-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .sdp-member-name {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 700;
          color: #FAFAFA;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }

        .sdp-member-role {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-red-orange);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .sdp-member-bio {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.65);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .sdp-member-contacts {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
        }

        .sdp-member-contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .sdp-member-contact-row:hover {
          background: rgba(242,104,62,0.12);
          border-color: rgba(242,104,62,0.3);
        }

        .sdp-member-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(242,104,62,0.15);
          color: var(--brand-red-orange);
          flex-shrink: 0;
        }

        .sdp-member-contact-label {
          display: block;
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .sdp-member-contact-value {
          display: block;
          font-size: 0.8125rem;
          color: #FAFAFA;
          font-weight: 500;
        }


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

        #request-service {
          scroll-margin-top: 100px;
        }
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
