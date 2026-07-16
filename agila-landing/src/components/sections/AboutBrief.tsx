"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutBrief() {
  const { t } = useLanguage();
  return (
    <section id="about-brief" className="section section-bg-muted about-section">
      <div className="container-wide">
        <div className="about-brief-grid">
          {/* Column 1: Text */}
          <motion.div
            className="about-brief-content"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="section-eyebrow">
              {t("about.eyebrow")}
            </span>
            <h2 className="heading-tight mb-20">
              {t("about.title")}
            </h2>
            <div className="body-punchy mb-24">
              <p>
                {t("about.p1")}
              </p>
              <br />
              <p>
                {t("about.p2")}
              </p>
            </div>
            <div className="btn-wrapper">
              <a href="/about" className="btn btn-secondary hover-lift">
                {t("about.cta")}
              </a>
            </div>
          </motion.div>

          {/* Column 2: Logo Graphic */}
          <motion.div
            className="about-brief-visual eyebrow-offset"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="graphic-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 110 110"
                className="monogram-graphic"
                aria-hidden="true"
              >
                {/* Official brand colors: orange #F2683E + golden #FAA632 (same as the original logo files) */}
                <path fill="#F2683E" d="M62.0226,10.4168c-13.1549,0-24.993,5.7304-33.1609,14.8217,7.2843-6.8045,17.0529-10.9811,27.7835-10.9811,22.4658,0,40.7426,18.2768,40.7426,40.7426,0,5.6493-1.1577,11.0328-3.2451,15.9283l-17.3923-38.8156h-12.5394l-26.4285,58.9815c-3.2571-1.711-6.2586-3.8453-8.9246-6.3363,8.168,9.0938,20.0079,14.826,33.1646,14.826,24.5836,0,44.5836-20,44.5836-44.5836S86.6062,10.4168,62.0226,10.4168ZM56.6453,95.7426c-3.5418,0-6.9754-.4637-10.253-1.3181l8.2288-18.3645h26.9576l-4.1305-9.2183h-18.6965l11.431-25.5108h.5964l17.572,39.2163c-7.4747,9.2585-18.9073,15.1953-31.7057,15.1953Z"/>
                <path fill="#FAA632" d="M22.7637,81.9743l2.65-5.9142h13.7884l4.1305-9.2183h-13.7884l11.4306-25.5108h.5964l9.2547,20.654,5.051-11.2725-8.3342-18.5999h-12.5394l-17.6699,39.4352c-1.916-5.1573-2.9672-10.7315-2.9672-16.5475C14.3663,28.7228,35.7451,7.344,62.0226,7.344c12.6995,0,24.2457,5.0032,32.7967,13.1298C85.3896,10.0576,71.7694,3.5027,56.6453,3.5027,28.2492,3.5027,5.148,26.6039,5.148,55s23.1013,51.4973,51.4973,51.4973c15.1221,0,28.7408-6.5531,38.1703-16.9668-8.5506,8.1245-20.0951,13.1262-32.7929,13.1262-16.2708,0-30.6568-8.2016-39.259-20.6825Z"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        /* Removed excessive padding and kept overflow hidden */
        .about-section {
          padding: clamp(60px, 8vw, 100px) 0;
          display: flex;
          align-items: center;
          overflow: hidden; 
          position: relative;
        }

        .about-brief-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: center; /* perfectly vertically centered */
        }

        @media (min-width: 1024px) {
          .about-brief-grid {
            grid-template-columns: 1.1fr 0.9fr;
            /* Graphic top meets the heading; .eyebrow-offset clears the eyebrow. */
            align-items: start;
          }
        }

        .about-brief-content {
          max-width: 600px;
          order: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          position: relative;
        }

        .about-brief-visual {
          order: 2;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center; /* Centered visually */
          align-items: center;
        }

        @media (min-width: 1024px) {
          .about-brief-content {
            order: 1;
          }
          .about-brief-visual {
            order: 2;
          }
        }

        .heading-tight {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text-primary);
        }

        .body-punchy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .btn-wrapper {
          align-self: flex-start; /* perfectly flush-left */
        }

        .mb-20 {
          margin-bottom: 20px;
        }

        .mb-24 {
          margin-bottom: 24px;
        }

        .d-block {
          display: block;
        }

        /* Logo Graphic */
        .graphic-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center; /* fully centered */
          align-items: center;
        }

        .monogram-graphic {
          width: 100%; /* Fully contained */
          max-width: 450px;
          height: auto;
          opacity: 1; /* Full opacity, no longer a watermark */
        }

        @media (max-width: 1023px) {
          .monogram-graphic {
            width: 80%; /* Slightly smaller on mobile to ensure it fits well */
          }
        }
      `}</style>
    </section>
  );
}
