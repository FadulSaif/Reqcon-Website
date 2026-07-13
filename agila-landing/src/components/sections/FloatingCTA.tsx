"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingCTA() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > window.innerHeight * 0.6);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-cta"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Goes straight to the "Send us a message" form — no intermediate step */}
          <Link
            href="/contact#contact-form"
            className="floating-cta-pill hover-lift"
            aria-label="Need Staff? Go to the contact form"
          >
            {/* Phone icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            {t("cta.needStaff")}
          </Link>
        </motion.div>
      )}

      <style jsx global>{`
        .floating-cta-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 100px;
          background: var(--primary);
          color: #ffffff;
          border: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(242, 104, 62, 0.4);
        }
      `}</style>
    </AnimatePresence>
  );
}
