"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import ServiceBlocks from "./sections/ServiceBlocks";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

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
              <h1 className="heading-xl mb-24">
                {t("services.page.title")}
              </h1>
              <p className="body-lg text-secondary mx-auto" style={{ maxWidth: "800px" }}>
                {t("hero.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2: In-Depth Services Core (shared layout with homepage) */}
        <section className="in-depth-services section section-bg-muted">
          <div className="container-wide">
            <ServiceBlocks />
          </div>
        </section>

        {/* Section 4: Conversion CTA */}
        <section className="services-cta-section">
          <div className="cta-bg-image">
            <Image
              src="/assets/industry-warehous.jpg"
              alt="Agil Arbetskraft – personal i arbete"
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
                <Link href="/contact#contact-form" className="btn btn-primary btn-hero-xl hover-lift">
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
      `}</style>
    </>
  );
}
