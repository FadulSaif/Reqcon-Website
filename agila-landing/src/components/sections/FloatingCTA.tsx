"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
          <AnimatePresence>
            {expanded && (
              <motion.a
                href="/#contact"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.2 }}
                className="btn glass-panel hover-lift floating-cta-link"
                onClick={() => setExpanded(false)}
              >
                Request a Call
              </motion.a>
            )}
          </AnimatePresence>

          <button
            className="floating-cta-pill hover-lift"
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setExpanded(true)}
            aria-label="Need Staff? Request a call"
          >
            {/* Phone icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Need Staff?
          </button>
        </motion.div>
      )}

      <style jsx global>{`
        .floating-cta-link {
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--text-primary);
          padding: 8px 16px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 500;
        }

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
          box-shadow: 0 8px 24px rgba(242, 104, 62, 0.4);
        }
      `}</style>
    </AnimatePresence>
  );
}
