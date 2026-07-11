"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICES = [
  {
    titleKey: "services.s1.title",
    descKey: "services.s1.desc"
  },
  {
    titleKey: "services.s2.title",
    descKey: "services.s2.desc"
  },
  {
    titleKey: "services.s3.title",
    descKey: "services.s3.desc"
  },
  {
    titleKey: "services.s4.title",
    descKey: "services.s4.desc"
  }
];

export default function ServicesBrief() {
  const { t } = useLanguage();
  return (
    <section id="services-brief" className="section section-bg-elevated services-section">
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="services-brief-grid">
          {/* Column 1: Visual */}
          <motion.div
            className="services-brief-visual"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="image-container">
              <Image
                src="/assets/service-recruitment.jpg"
                alt="Agil Arbetskraft Services"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h3 className="overlay-title">{t("services.overlayTitle")}</h3>
                  <p className="overlay-text">{t("services.overlayText")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Content & Services List */}
          <motion.div
            className="services-brief-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <span className="eyebrow d-block">
              {t("services.eyebrow")}
            </span>
            <h2 className="heading-tight mb-32">
              {t("services.title")}
            </h2>

            <div className="services-list mb-40">
              {SERVICES.map((service, idx) => (
                <div key={idx} className="service-item">
                  <div className="service-icon">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="service-text">
                    <h4 className="service-title">{t(service.titleKey)}</h4>
                    <p className="service-desc">{t(service.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="btn-wrapper">
              <Link href="/services" className="btn btn-primary hover-lift">
                {t("services.cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          padding: clamp(60px, 8vw, 100px) 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          background-color: var(--bg-elevated);
        }

        .services-brief-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 60px);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .services-brief-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .services-brief-content {
          max-width: 650px;
          display: flex;
          flex-direction: column;
          z-index: 2;
          position: relative;
        }

        .services-brief-visual {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
          margin-bottom: 16px;
        }

        .heading-tight {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3vw, 2.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text-primary);
        }

        /* Single-column checklist — same design as the service page bullet list */
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .service-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .service-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .service-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .service-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .btn-wrapper {
          align-self: flex-start;
        }

        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }
        .d-block { display: block; }

        .image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          max-height: 550px;
        }

        @media (min-width: 1024px) {
          .image-container {
            aspect-ratio: 1/1;
          }
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 24px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
          color: white;
          display: flex;
          align-items: flex-end;
        }

        .overlay-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: white;
        }

        .overlay-text {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </section>
  );
}
