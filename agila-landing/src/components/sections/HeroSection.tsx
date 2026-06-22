"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
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
            The Right People.
            <br />
            <span className="text-brand">At The Right Time.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="body-xl hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          >
            Reliable workforce solutions for modern businesses.
            Connecting companies with qualified professionals across Sweden.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
          >
            <a href="/#contact" className="btn btn-primary btn-hero-xl hover-lift">
              Find the Right Talent
            </a>
            <a href="/services" className="btn btn-outline-hero btn-hero-xl hover-lift">
              View Services
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .hero-section {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          padding-top: clamp(100px, 12vh, 140px);
          padding-bottom: clamp(40px, 8vh, 80px);
        }

        .hero-video-card {
          position: relative;
          width: calc(100% - 2rem);
          max-width: 1800px;
          height: 85vh;
          min-height: 600px;
          max-height: 960px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 32px 80px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.06);
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
          max-width: 860px;
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
          max-width: 580px;
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
