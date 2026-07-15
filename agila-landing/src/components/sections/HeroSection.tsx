"use client";

import { useRef } from "react";
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
      {/* Floating Contained Video Card */}
      <motion.div
        className="hero-video-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/contact-team.jpg"
          className="hero-video-bg"
        >
          <source src="/assets/top.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for Contrast */}
        <div className="hero-video-overlay" />

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

      {/* Static Logo Strip below the hero video card */}
      <motion.div
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

        .hero-video-card {
          position: relative;
          width: calc(100% - clamp(2rem, 4vw, 4rem));
          max-width: 1800px;
          min-height: clamp(520px, 65vh, 720px);
          height: auto;
          padding: clamp(60px, 8vh, 120px) 0;
          border-top-left-radius: var(--radius-xl);
          border-top-right-radius: var(--radius-xl);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          overflow: hidden;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 -4px 30px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.06);
        }

        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(11,17,32,0.75) 0%, rgba(11,17,32,0.2) 50%, rgba(11,17,32,0.55) 100%);
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
