"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import CompanyLogoStrip from "../CompanyLogoStrip";

export default function HeroSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" ref={ref} className="hero-section">
      {/* Floating Contained Media Card */}
      <motion.div
        className="hero-media-card hero-shell"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Image Background — LCP element, so it loads with priority */}
        <Image
          src="/assets/hero-home.jpg"
          alt={t("hero.imgAlt")}
          fill
          priority
          sizes="100vw"
          className="hero-media-bg"
        />

        {/* Gradient Overlay for Contrast */}
        <div className="hero-media-overlay" />

        {/* Text Content */}
        <motion.div
          className="hero-content"
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          {/* H1 */}
          <motion.h1
            className="heading-hero hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            {t("hero.title1")}
            <br />
            <span className="text-brand">{t("hero.title2")}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="body-xl hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/contact#contact-form" className="btn btn-primary btn-hero-xl hover-lift">
              {t("hero.ctaPrimary")}
            </Link>
            <Link href="/services" className="btn btn-outline-hero btn-hero-xl hover-lift">
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Static Logo Strip below the hero media card */}
      <motion.div
        className="hero-strip-slot"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <CompanyLogoStrip />
      </motion.div>

      <style jsx global>{`
        .hero-section {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--background);
          padding-top: clamp(88px, 10vh, 110px);
          padding-bottom: clamp(60px, 10vh, 100px);
        }

        /* Width/alignment come from .hero-shell — see globals.css */
        .hero-media-card {
          position: relative;
          min-height: clamp(520px, 65vh, 720px);
          height: auto;
          padding: clamp(60px, 8vh, 120px) 0;
          border-top-left-radius: var(--radius-xl);
          border-top-right-radius: var(--radius-xl);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 -4px 30px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.06);
        }

        /* .hero-section centers its children, so this reveal wrapper would
           otherwise shrink to fit and the strip's .hero-shell percentage would
           resolve against it instead of the section, insetting it twice. */
        .hero-strip-slot {
          width: 100%;
        }

        /* Favour the lower band of the photo: centring it puts the chandelier
           and the blown-out windows behind the headline. No-op on narrow
           viewports, where the card is taller than the photo and crops
           horizontally instead. */
        .hero-media-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 85%;
        }

        /* The photo's mid-band is blown-out window light, so the middle stop
           carries far more scrim than a dark video frame needed. */
        .hero-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(11,17,32,0.82) 0%, rgba(11,17,32,0.55) 50%, rgba(11,17,32,0.7) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          color: var(--text-overlay);
          margin-bottom: 24px;
        }

        .hero-subtitle {
          max-width: 680px;
          color: var(--text-overlay);
          opacity: 0.8;
          margin-bottom: clamp(32px, 4vw, 48px);
        }

        .hero-ctas {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
