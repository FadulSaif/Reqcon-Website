"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LandingContact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="lc-section">
      <div className="container-wide">
        <motion.div
          className="lc-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Subtle background accents inside the card */}
          <div className="lc-bg-shapes">
            <div className="lc-shape lc-shape-1" />
            <div className="lc-shape lc-shape-2" />
          </div>

          <div className="lc-content">
            {/* Icon */}
            <motion.div
              className="lc-icon-wrapper"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Users size={36} strokeWidth={1.5} />
            </motion.div>

            {/* Headline */}
            <h2 className="lc-headline">
              {t("cta.title")}
            </h2>

            {/* Supporting Copy */}
            <p className="lc-subtext">
              {t("cta.desc")}
            </p>

            {/* Buttons */}
            <div className="lc-button-group">
              <a
                href="/contact?service=staffing"
                className="btn btn-primary btn-lg hover-lift"
              >
                {t("nav.requestStaff")}
                <ArrowRight size={18} />
              </a>
              <a href="/contact" className="btn btn-secondary btn-lg hover-lift">
                {t("footer.getInTouch")}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* ─── Landing CTA Section ─── */
        .lc-section {
          padding-block: var(--section-padding);
          background: var(--background);
          position: relative;
        }

        .lc-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: linear-gradient(155deg, #1A1F2B 0%, #111519 100%);
          padding: clamp(60px, 8vw, 100px) clamp(28px, 5vw, 80px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        .dark .lc-card {
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        /* Background accent shapes inside card */
        .lc-bg-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .lc-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .lc-shape-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(242, 104, 62, 0.2) 0%, transparent 70%);
          top: -100px;
          right: -60px;
          animation: lc-float-1 12s ease-in-out infinite;
        }

        .lc-shape-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(250, 166, 50, 0.12) 0%, transparent 70%);
          bottom: -80px;
          left: -40px;
          animation: lc-float-2 14s ease-in-out infinite;
        }

        @keyframes lc-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(1.06); }
        }

        @keyframes lc-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -10px) scale(1.04); }
        }

        /* Content */
        .lc-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .lc-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(242, 104, 62, 0.12);
          border: 1px solid rgba(242, 104, 62, 0.25);
          color: var(--brand-red-orange);
          margin-bottom: 32px;
        }

        .lc-headline {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #FAFAFA;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .lc-highlight {
          background: linear-gradient(135deg, var(--brand-red-orange) 0%, var(--brand-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lc-subtext {
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 40px;
        }

        .lc-button-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Override btn colors for dark context */
        .lc-button-group .btn-secondary {
          color: rgba(255, 255, 255, 0.85) !important;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .lc-button-group .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .lc-button-group {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
          }

          .lc-button-group .btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
