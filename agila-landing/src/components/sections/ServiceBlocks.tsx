"use client";

import Image from "next/image";
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
                <Link href={`/contact?service=${service.slug}#contact-form`} className="btn btn-primary btn-sm hover-lift inline-flex">
                  {t("services.btn.request")} <ArrowRight size={16} style={{ marginLeft: 8 }} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
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

        .service-block .inline-flex {
          display: inline-flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
