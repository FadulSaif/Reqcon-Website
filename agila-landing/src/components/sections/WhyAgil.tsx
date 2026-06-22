"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Fast Response Times",
    desc: "We deploy qualified personnel rapidly, ensuring your operations never skip a beat even during unexpected surges.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: "Reliable Workforce Solutions",
    desc: "Every candidate is thoroughly vetted, referenced, and tested for reliability and peak performance.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
  {
    title: "Industry Expertise",
    desc: "Our specialists deeply understand the specific operational demands and strict compliance requirements of your sector.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"/></svg>,
  },
  {
    title: "Flexible Hiring Models",
    desc: "Scale your team up or down seamlessly. From short-term project support to permanent strategic hires.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    title: "Cost-Effective Recruitment",
    desc: "Optimize your workforce budget with our streamlined hiring process, eliminating downtime and hidden costs.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
];

export default function WhyAgil() {
  return (
    <section
      id="why-agil"
      className="why-section"
      style={{
        paddingBlock: "clamp(80px, 12vw, 160px)",
        background: "var(--bg-primary)",
      }}
    >
      <div className="container-wide">
        <div className="why-grid">
          
          {/* Left Side: Sticky Header */}
          <div className="why-sticky-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "sticky", top: "20vh" }}
            >
              <span className="label mb-16" style={{ display: "block" }}>
                Why Agil
              </span>
              <h2 className="heading-xl mb-24">
                Elevating
              <br />
              <span className="text-brand">Workforce Quality</span>
              </h2>
              <p className="body-lg" style={{ maxWidth: 400 }}>
                We don&apos;t just fill seats. We partner with you to deliver 
                highly skilled, reliable professionals that drive your business forward.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Feature Cards */}
          <div className="why-scroll-col">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="heading-md" style={{ marginBottom: 12 }}>
                    {feature.title}
                  </h3>
                  <p className="body-md" style={{ margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx global>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(40px, 8vw, 100px);
          align-items: start;
        }

        .why-sticky-col {
          height: 100%;
        }

        .why-scroll-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: clamp(24px, 4vw, 40px);
          display: flex;
          gap: 24px;
          align-items: flex-start;
          box-shadow: 0 12px 48px rgba(0,0,0,0.03);
          transition: all 0.4s var(--ease-smooth);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-orange);
          box-shadow: 0 24px 64px rgba(250, 166, 50, 0.08);
        }

        .feature-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.4s ease;
        }

        .feature-card:hover .feature-icon {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: var(--bg-card);
          transform: scale(1.05) rotate(5deg);
        }

        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
          .why-sticky-col > div {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 640px) {
          .feature-card {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
