"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Map,
  ArrowRight,
  Send,
  Phone,
} from "lucide-react";
import { LinkedinIcon as Linkedin, FacebookIcon as Facebook } from "./icons/SocialIcons";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import {
  TEAM_MEMBERS,
  SERVICE_OPTIONS,
  getServiceLabelKey,
  resolveServiceSlug,
} from "@/lib/team-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONFIG } from "@/lib/site-config";
import ContactForm from "./sections/ContactForm";

// ─── Inner component to read searchParams inside Suspense ───
function ContactFormInner({
  onServiceFromUrl,
}: {
  onServiceFromUrl: (slug: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const resolved = resolveServiceSlug(serviceParam);
      onServiceFromUrl(resolved);
    }
  }, [searchParams, onServiceFromUrl]);

  return null;
}

// ─── Main Contact Page ───
export default function ContactPage() {
  const { language, t } = useLanguage();
  const [selectedService, setSelectedService] = useState("general");
  const [message, setMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);



  // Scroll to form with navbar offset
  const scrollToForm = useCallback(() => {
    if (formRef.current) {
      const navbarHeight = 100;
      const top =
        formRef.current.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Handle team card click: set service + pre-fill message + scroll
  const handleTeamContact = useCallback(
    (memberId: string) => {
      const member = TEAM_MEMBERS.find((m) => m.id === memberId);
      if (member && member.services.length > 0) {
        const slug = member.services[0];
        setSelectedService(slug);
        setMessage(
          language === "sv" 
            ? `Hej, jag är intresserad av tjänsten ${t(getServiceLabelKey(slug))} och vill gärna få mer information.`
            : `Hello, I am interested in the ${t(getServiceLabelKey(slug))} service and would like to receive more information.`
        );
      }
      setFlippedCard(null);
      setTimeout(scrollToForm, 80);
    },
    [scrollToForm, language, t]
  );

  // Handle URL param pre-fill
  const handleServiceFromUrl = useCallback(
    (slug: string) => {
      setSelectedService(slug);
      setMessage(
        language === "sv" 
          ? `Hej, jag är intresserad av tjänsten ${t(getServiceLabelKey(slug))} och vill gärna få mer information.`
          : `Hello, I am interested in the ${t(getServiceLabelKey(slug))} service and would like to receive more information.`
      );
      setTimeout(scrollToForm, 400);
    },
    [scrollToForm, language, t]
  );

  // When dropdown changes manually, update message too
  const handleServiceChange = (slug: string) => {
    setSelectedService(slug);
    if (slug !== "general") {
      setMessage(
        language === "sv" 
          ? `Hej, jag är intresserad av tjänsten ${t(getServiceLabelKey(slug))} och vill gärna få mer information.`
          : `Hello, I am interested in the ${t(getServiceLabelKey(slug))} service and would like to receive more information.`
      );
    } else {
      setMessage("");
    }
  };

  // Toggle flip on a team card
  const toggleCardFlip = (memberId: string) => {
    setFlippedCard((prev) => (prev === memberId ? null : memberId));
  };

  return (
    <>
      <Navbar />
      <main className="contact-page-wrapper">
        <Suspense fallback={null}>
          <ContactFormInner onServiceFromUrl={handleServiceFromUrl} />
        </Suspense>

        {/* ── Section 1: Meet the Team (first section — carries navbar clearance) ── */}
        <section className="section section-bg-muted cp-first-section">
          <div className="container-wide">
            <div className="text-center mb-48">
              <h1 className="heading-lg">{t("contact.team.title")}</h1>
            </div>

            <div className="grid-3-col">
              {TEAM_MEMBERS.map((member, idx) => (
                <motion.div
                  key={member.id}
                  className={`cp-card-perspective ${flippedCard === member.id ? "cp-card-flipped" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <div className="cp-card-flipper">
                    {/* ── Front Face ── */}
                    <div className="cp-team-card glass-panel cp-card-front">
                      <div className="cp-team-image">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="cp-team-photo"
                        />
                      </div>

                      <div className="cp-team-body">
                        <h3 className="heading-sm">{member.name}</h3>
                        <p className="cp-team-role">{t(member.titleKey)}</p>
                        <p className="body-md text-secondary mb-12">{t(member.bioKey)}</p>

                        <div className="cp-service-tags">
                          {member.services.map((slug) => {
                            const svc = SERVICE_OPTIONS.find(
                              (s) => s.slug === slug
                            );
                            return (
                              <span key={slug} className="cp-service-tag">
                                {svc ? t(svc.labelKey) : slug}
                              </span>
                            );
                          })}
                        </div>

                        <button
                          className="btn btn-primary btn-sm cp-card-btn"
                          onClick={() => toggleCardFlip(member.id)}
                        >
                          {t("contact.btn.contact")} {member.name.split(" ")[0]}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* ── Back Face ── */}
                    <div className="cp-card-back">
                      <div className="cp-back-header">
                        <div className="cp-back-avatar">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={72}
                            height={72}
                            className="cp-back-avatar-img"
                          />
                        </div>
                        <h3 className="heading-sm cp-back-name">{member.name}</h3>
                        <p className="cp-back-role">{t(member.titleKey)}</p>
                      </div>

                      <div className="cp-back-contacts">
                        <a href={`mailto:${member.email}`} className="cp-back-contact-item">
                          <div className="cp-back-icon"><Mail size={18} /></div>
                          <div>
                            <span className="cp-back-contact-label">{t("contact.lbl.email")}</span>
                            <span className="cp-back-contact-value">{member.email}</span>
                          </div>
                        </a>
                        <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="cp-back-contact-item">
                          <div className="cp-back-icon"><Phone size={18} /></div>
                          <div>
                            <span className="cp-back-contact-label">{t("contact.lbl.phone")}</span>
                            <span className="cp-back-contact-value">{member.phone}</span>
                          </div>
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="cp-back-contact-item">
                          <div className="cp-back-icon"><Linkedin size={18} /></div>
                          <div>
                            <span className="cp-back-contact-label">{t("contact.lbl.linkedin")}</span>
                            <span className="cp-back-contact-value">{t("contact.lbl.viewProfile")}</span>
                          </div>
                        </a>
                      </div>

                      <div className="cp-back-actions">
                        <button
                          className="btn btn-primary btn-sm cp-card-btn"
                          onClick={() => handleTeamContact(member.id)}
                        >
                          <Send size={14} />
                          {t("contact.btn.sendMsg")}
                        </button>
                        <button
                          className="btn btn-secondary btn-sm cp-card-btn"
                          onClick={() => toggleCardFlip(member.id)}
                        >
                          {t("contact.btn.back")}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Unified Contact Form ── */}
        <section id="contact-form" className="section" ref={formRef}>
          <div className="container-wide">
            <div className="text-center mb-48">
              <span className="section-eyebrow">{t("contact.form.eyebrow")}</span>
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
                  defaultService={selectedService} 
                  defaultMessage={message} 
                  onServiceChange={handleServiceChange}
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
                        <a
                          href={SITE_CONFIG.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-social-btn"
                        >
                          <Linkedin size={20} />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href={SITE_CONFIG.socials.facebook}
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
                      className="btn btn-primary btn-sm cp-back-btn"
                    >
                      {t("contact.flip.backToInfo")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Our Office — Company Contact & Location ── */}
        <section className="section section-bg-muted">
          <div className="container-wide">
            <div className="text-center mb-48">
              <span className="section-eyebrow">{t("contact.office.eyebrow")}</span>
              <h2 className="heading-lg">{t("contact.office.title")}</h2>
            </div>

            <div className="cp-office-grid">
              {/* Left: Contact Info */}
              <motion.div
                className="cp-office-info glass-panel"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="heading-md mb-8">Agil Arbetskraft</h3>
                <p className="body-md text-secondary mb-32">
                  {t("contact.office.desc")}
                </p>

                <div className="cp-office-details">
                  <div className="cp-office-row">
                    <div className="cp-office-icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="cp-office-detail-label">{t("contact.office.address")}</span>
                      <span className="cp-office-detail-value">
                        {SITE_CONFIG.address.full}
                      </span>
                    </div>
                  </div>

                  <div className="cp-office-row">
                    <div className="cp-office-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="cp-office-detail-label">{t("contact.lbl.email")}</span>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="cp-office-detail-value cp-office-link">
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="cp-office-row">
                    <div className="cp-office-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="cp-office-detail-label">{t("contact.lbl.phone")}</span>
                      <a href={SITE_CONFIG.phoneHref} className="cp-office-detail-value cp-office-link">
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="cp-office-socials">
                  <span className="cp-office-detail-label mb-12 d-block">{t("contact.flip.followUs")}</span>
                  <div className="cp-office-social-row">
                    <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="cp-office-social-link">
                      <Linkedin size={18} />
                      LinkedIn
                    </a>
                    <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="cp-office-social-link">
                      <Facebook size={18} />
                      Facebook
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right: Map */}
              <motion.div
                className="cp-office-map"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
              >
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        /* ─── Page ─── */
        .contact-page-wrapper { width: 100%; }

        /* First section clears the fixed navbar (the removed hero used to do this) */
        .cp-first-section {
          padding-top: clamp(104px, 12vh, 130px) !important;
        }
        /* When arriving via /contact#contact-form, keep the form below the fixed navbar */
        #contact-form {
          scroll-margin-top: 90px;
        }

        /* ─── Team Cards — Flip Card System ─── */
        .cp-card-perspective {
          perspective: 1200px;
        }
        .cp-card-flipper {
          position: relative;
          width: 100%;
          height: 100%; /* fill the equal-height grid cell so every card (and its button) aligns */
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .cp-card-flipped .cp-card-flipper {
          transform: rotateY(180deg);
        }
        .cp-card-front,
        .cp-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .cp-card-back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
          border-radius: var(--radius-xl);
          background: linear-gradient(155deg, #1A1F2B 0%, #111519 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 28px;
          overflow: hidden;
        }
        .cp-card-back::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(242,104,62,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-card-flipped .cp-card-front { pointer-events: none; }
        .cp-card-perspective:not(.cp-card-flipped) .cp-card-back { pointer-events: none; }

        /* ─── Team Card — Front Face ─── */
        .cp-team-card {
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .cp-team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        .dark .cp-team-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        .cp-team-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3.2;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cp-team-photo {
          object-fit: cover;
          object-position: center top;
          transition: transform 0.4s ease;
        }
        .cp-team-card:hover .cp-team-photo {
          transform: scale(1.03);
        }

        .cp-team-body {
          padding: 24px 24px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cp-team-role {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--brand-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 4px 0 12px;
        }

        .cp-service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          min-height: 52px;
          margin-bottom: 20px; /* guaranteed gap before the button, even with 2 rows of tags (e.g. Johan) */
        }
        .cp-service-tag {
          padding: 3px 10px;
          border-radius: 100px;
          background: var(--accent-soft);
          color: var(--text-secondary);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          height: fit-content;
        }

        .cp-card-btn {
          width: 100%;
          margin-top: auto; /* pins the button to the card bottom so all cards align */
        }

        /* ─── Team Card — Back Face ─── */
        .cp-back-header {
          text-align: center;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .cp-back-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 14px;
          border: 3px solid var(--brand-red-orange);
        }
        .cp-back-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .cp-back-name {
          color: #FAFAFA;
          margin-bottom: 4px;
        }
        .cp-back-role {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-red-orange);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .cp-back-contacts {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .cp-back-contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cp-back-contact-item:hover {
          background: rgba(242,104,62,0.12);
          border-color: rgba(242,104,62,0.3);
        }
        .cp-back-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(242,104,62,0.15);
          color: var(--brand-red-orange);
          flex-shrink: 0;
        }
        .cp-back-contact-label {
          display: block;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .cp-back-contact-value {
          display: block;
          font-size: 0.875rem;
          color: #FAFAFA;
          font-weight: 500;
        }

        .cp-back-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          z-index: 1;
        }
        .cp-back-actions .btn-secondary {
          color: rgba(255,255,255,0.7) !important;
          border-color: rgba(255,255,255,0.15);
        }
        .cp-back-actions .btn-secondary:hover {
          color: #fff !important;
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.3);
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

        .mb-0 { margin-bottom: 0; }

        .cp-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 44px;
        }

        .cp-submit-btn {
          width: 100%;
        }

        /* ─── Routing Badge ─── */
        .cp-routing-badge {
          overflow: hidden;
          margin-bottom: 20px;
        }
        .cp-routing-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          background: var(--accent-soft);
          border: 1px solid var(--border);
        }
        .cp-routing-avatar {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--brand-primary);
        }
        .cp-routing-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .cp-routing-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        .cp-routing-name {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cp-routing-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .cp-routing-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brand-primary);
          white-space: nowrap;
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

        /* ─── Office Section ─── */
        .cp-office-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 40px);
          align-items: stretch;
        }
        @media (min-width: 1024px) {
          .cp-office-grid {
            grid-template-columns: 1fr 1.3fr;
          }
        }

        .cp-office-info {
          padding: clamp(28px, 4vw, 44px);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }

        .cp-office-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }
        .cp-office-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .cp-office-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-soft);
          color: var(--brand-primary);
          flex-shrink: 0;
        }
        .cp-office-detail-label {
          display: block;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2px;
        }
        .cp-office-detail-value {
          display: block;
          font-size: 0.9375rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        .cp-office-link {
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cp-office-link:hover {
          color: var(--brand-primary);
        }

        .cp-office-socials {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .cp-office-social-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cp-office-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--accent-soft);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.8125rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .cp-office-social-link:hover {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #fff;
        }

        .cp-office-map {
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border);
          min-height: 360px;
        }
        .cp-office-map iframe {
          display: block;
        }

        .text-white { color: #ffffff !important; }
        .d-block { display: block; }
      `}</style>
    </>
  );
}
