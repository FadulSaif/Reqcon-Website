"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_LIST } from "@/lib/services-data";

export default function ServicesPage() {
  const { t, language } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="services-page-wrapper">
        
        {/* Section 1: Services Hero */}
        <section id="services-hero" className="hero-section">
          <div className="container-wide text-center">
            <motion.div
              className="hero-text-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="eyebrow d-block mb-16">{t("services.eyebrow")}</span>
              <h1 className="heading-xl mb-24">
                {t("services.page.title")}
              </h1>
              <p className="body-lg text-secondary mx-auto" style={{ maxWidth: "800px" }}>
                {t("hero.subtitle")}
              </p>
            </motion.div>
          </div>

          <div className="container-wide mt-32">
            <motion.div
              className="hero-image-banner"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src="/assets/contact-team.jpg"
                alt="Agila Professional Services"
                fill
                priority
                className="hero-image-content"
              />
            </motion.div>
          </div>
        </section>

        {/* Section 2: Introductory Philosophy */}
        <section className="intro-section section pt-0">
          <div className="container-wide">
            <div className="intro-grid">
              
              {/* Left: Philosophy Story */}
              <motion.div
                className="intro-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="heading-lg mb-32">
                  {t("about.title")}
                </h2>
                <div className="body-punchy">
                  <p>
                    {t("about.p1")}
                  </p>
                  <br />
                  <p>
                    {t("about.p2")}
                  </p>
                </div>
              </motion.div>

              {/* Right: Integrated Images */}
              <motion.div
                className="intro-visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div className="intro-image-grid">
                  <div className="intro-img-1 glass-panel">
                    <Image
                      src="/assets/industry-workshop.jpg"
                      alt={t("services.it.imgAlt")}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="intro-image"
                    />
                  </div>
                  <div className="intro-img-2 glass-panel">
                    <Image
                      src="/assets/industry-transport.jpg"
                      alt={t("services.transport.imgAlt")}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="intro-image"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 3: In-Depth Services Core */}
        <section className="in-depth-services section section-bg-muted">
          <div className="container-wide">
            <div className="text-center mb-64">
              <h2 className="heading-xl">{t("services.page.title")}</h2>
            </div>

            <div className="services-stack">
              {SERVICES_LIST.map((service, idx) => (
                <motion.div
                  key={service.slug}
                  className={`service-block ${idx % 2 !== 0 ? "reversed" : ""}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="service-block-image-container">
                    <Image
                      src={service.image}
                      alt={t(`services.${service.slug}.imgAlt`)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="service-block-image"
                    />
                  </div>
                  
                  <div className="service-block-content">
                    <h3 className="heading-lg mb-8">{t(`services.${service.slug}.title`)}</h3>
                    <p className="body-lg mb-24">{t(`services.${service.slug}.cardDesc`)}</p>
                    
                    <ul className="service-bullets mb-32">
                      {service.specs[language as keyof typeof service.specs]?.slice(0, 4).map((bullet, bIdx) => (
                        <li key={bIdx} className="bullet-item">
                          <CheckCircle2 size={20} className="bullet-icon" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <a href={`/services/${service.slug}`} className="btn btn-secondary btn-sm hover-lift inline-flex">
                        {t("services.btn.readMore")}
                      </a>
                      <Link href={`/contact?service=${service.slug}`} className="btn btn-primary btn-sm hover-lift inline-flex">
                        {t("services.btn.request")} <ArrowRight size={16} style={{ marginLeft: 8 }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Conversion CTA */}
        <section className="services-cta-section">
          <div className="cta-bg-image">
            <Image
              src="/assets/industry-warehous.jpg"
              alt="Agila Operations"
              fill
              className="cta-bg-img"
            />
            <div className="cta-overlay" />
          </div>

          <div className="container-wide relative z-10">
            <motion.div 
              className="services-cta-content text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="heading-xl mb-16 text-white">{t("cta.title")}</h2>
              <p className="body-lg mb-40 text-white opacity-80 mx-auto" style={{ maxWidth: "600px" }}>
                {t("cta.desc")}
              </p>
              <div className="cta-button-group">
                <Link href="/contact" className="btn btn-primary btn-hero-xl hover-lift">
                  {t("cta.requestCall")}
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
        .services-page-wrapper {
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

        .hero-image-banner {
          position: relative;
          width: 100%;
          height: clamp(300px, 45vh, 500px);
          min-height: 400px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .hero-image-content {
          object-fit: cover;
          object-position: center 20%;
        }

        /* Intro Section */
        .intro-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 60px);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .intro-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }

        .intro-content {
          max-width: 600px;
        }

        .intro-visual {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .intro-image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          max-width: 500px;
        }

        .intro-img-1,
        .intro-img-2 {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .intro-img-2 {
          transform: translateY(32px);
        }

        .intro-image {
          object-fit: cover;
        }

        /* In-Depth Services */
        .services-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(60px, 10vw, 120px);
        }

        .service-block {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .service-block {
            grid-template-columns: 1fr 1fr;
          }
          .service-block.reversed {
            direction: rtl;
          }
          .service-block.reversed > * {
            direction: ltr;
          }
        }

        .service-block-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .service-block-image {
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .service-block:hover .service-block-image {
          transform: scale(1.05);
        }

        .service-block-content {
          max-width: 560px;
        }

        .inline-flex {
          display: inline-flex;
          align-items: center;
        }

        .service-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .bullet-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        /* CTA Section */
        .services-cta-section {
          position: relative;
          padding: clamp(100px, 12vw, 160px) 0;
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
          background: linear-gradient(to right, rgba(17, 17, 19, 0.95) 0%, rgba(17, 17, 19, 0.8) 100%);
        }

        .services-cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-button-group {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Utilities */
        .pt-0 { padding-top: 0 !important; }
        .mt-32 { margin-top: 32px; }
        .mb-8 { margin-bottom: 8px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }
        .mb-64 { margin-bottom: 64px; }
        .d-block { display: block; }
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-white { color: #ffffff !important; }
        .text-brand { color: var(--brand-primary); }
        .opacity-80 { opacity: 0.8; }
        .relative { position: relative; }
        .z-10 { z-index: 10; }
        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
}
