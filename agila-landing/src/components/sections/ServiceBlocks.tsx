"use client";

import Image from "next/image";
// Link import preserved for potential future use
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_LIST } from "@/lib/services-data";

/**
 * The alternating image/content blocks for the 5 service categories.
 * Shared by the Services page and the homepage services section so both
 * always have the exact same layout.
 */
export default function ServiceBlocks() {
  const { t, language } = useLanguage();

  return (
    <>
      <div className="services-stack">
        {SERVICES_LIST.map((service, idx) => {
          const categoryName = t(`services.${service.slug}.title`);
          const allSpecs = service.specs[language as keyof typeof service.specs] || [];
          const remainingCount = Math.max(0, allSpecs.length - 4);

          return (
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
                <h3 className="heading-lg" style={{ marginBottom: "6px" }}>{categoryName}</h3>
                <p className="body-lg" style={{ marginBottom: "14px" }}>{t(`services.${service.slug}.cardDesc`)}</p>

                <p className="text-muted" style={{ fontSize: "0.8125rem", fontWeight: 500, marginBottom: "8px" }}>
                  {t("services.roles.header")}
                </p>

                <ul className="service-bullets">
                  {allSpecs.slice(0, 4).map((bullet, bIdx) => (
                    <li key={bIdx} className="bullet-item">
                      <CheckCircle2 size={20} className="bullet-icon" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                  {remainingCount > 0 && (
                    <li className="bullet-item-more">
                      {remainingCount === 1 
                        ? t("services.roles.moreSingular") 
                        : t("services.roles.morePlural").replace("{count}", remainingCount.toString())}
                    </li>
                  )}
                </ul>

                <div className="service-actions">
                  <a href={`/services/${service.slug}`} className="btn btn-primary btn-sm hover-lift inline-flex">
                    {t("services.btn.viewAllRoles")}
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx global>{`
        .services-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(60px, 10vw, 120px);
        }

        .service-block {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 4vw, 48px);
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
          display: flex;
          flex-direction: column;
        }

        .service-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .bullet-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .service-block .inline-flex {
          display: inline-flex;
          align-items: center;
        }

        .bullet-item-more {
          padding-left: 30px;
          font-style: italic;
          color: var(--text-muted);
          font-size: 0.875rem;
          list-style: none;
        }

        .service-actions {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
