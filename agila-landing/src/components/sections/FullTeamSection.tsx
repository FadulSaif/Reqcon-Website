"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Target,
  PenTool,
  Code2,
  CheckCircle2,
  Plus,
  Zap,
  Layers,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROLES = [
  { icon: ClipboardList, key: "fullteam.role1" },
  { icon: Target, key: "fullteam.role2" },
  { icon: PenTool, key: "fullteam.role3" },
  { icon: Code2, key: "fullteam.role4" },
  { icon: CheckCircle2, key: "fullteam.role5" },
];

const VALUES = [
  { icon: Layers, titleKey: "fullteam.v1Title", descKey: "fullteam.v1Desc" },
  { icon: Zap, titleKey: "fullteam.v2Title", descKey: "fullteam.v2Desc" },
  { icon: TrendingUp, titleKey: "fullteam.v3Title", descKey: "fullteam.v3Desc" },
];

interface FullTeamSectionProps {
  /** "full" = split section with team-composition visual (homepage); "compact" = banner (services page). */
  variant?: "full" | "compact";
}

export default function FullTeamSection({ variant = "full" }: FullTeamSectionProps) {
  const { t } = useLanguage();

  if (variant === "compact") {
    return (
      <section className="ft-compact-section">
        <div className="container-wide">
          <motion.div
            className="ft-compact glass-panel"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="ft-compact-text">
              <span className="section-eyebrow" style={{ marginBottom: 10 }}>
                {t("fullteam.eyebrow")}
              </span>
              <h3 className="ft-compact-title">{t("fullteam.title")}</h3>
              <p className="ft-compact-desc">{t("fullteam.desc")}</p>
            </div>
            <div className="ft-compact-side">
              <ul className="ft-compact-points">
                {VALUES.map((v, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>
                      <strong>{t(v.titleKey)}</strong> – {t(v.descKey)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact#contact-form" className="btn btn-primary hover-lift">
                {t("fullteam.cta")}
              </Link>
            </div>
          </motion.div>
        </div>
        <FullTeamStyles />
      </section>
    );
  }

  return (
    <section id="full-team" className="section ft-section">
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="ft-grid">
          {/* Column 1: Content */}
          <motion.div
            className="ft-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="section-eyebrow">{t("fullteam.eyebrow")}</span>
            <h2 className="ft-heading mb-24">{t("fullteam.title")}</h2>
            <p className="ft-desc mb-40">{t("fullteam.desc")}</p>

            <div className="ft-values mb-40">
              {VALUES.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="ft-value">
                    <div className="ft-value-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="ft-value-title">{t(v.titleKey)}</h4>
                      <p className="ft-value-desc">{t(v.descKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ft-btn-wrapper">
              <Link href="/contact#contact-form" className="btn btn-primary hover-lift">
                {t("fullteam.cta")}
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Team composition visual */}
          <motion.div
            className="ft-visual eyebrow-offset"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="ft-canvas glass-panel">
              <span className="ft-canvas-label">{t("fullteam.canvasLabel")}</span>
              <div className="ft-chips">
                {ROLES.map((role, idx) => {
                  const Icon = role.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="ft-chip"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.3, delay: 0.15 + idx * 0.08, ease: "easeOut" }}
                    >
                      <span className="ft-chip-icon">
                        <Icon size={16} />
                      </span>
                      <span className="ft-chip-label">{t(role.key)}</span>
                    </motion.div>
                  );
                })}
                <motion.div
                  className="ft-chip ft-chip-extra"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: 0.15 + ROLES.length * 0.08, ease: "easeOut" }}
                >
                  <span className="ft-chip-icon">
                    <Plus size={16} />
                  </span>
                  <span className="ft-chip-label">{t("fullteam.roleExtra")}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <FullTeamStyles />
    </section>
  );
}

function FullTeamStyles() {
  return (
    <style jsx global>{`
      /* ─── Full variant ─── */
      .ft-section {
        padding: clamp(60px, 8vw, 100px) 0;
        background: var(--background);
        overflow: hidden;
      }

      .ft-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(40px, 6vw, 60px);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .ft-grid {
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }
      }

      .ft-content {
        max-width: 650px;
        display: flex;
        flex-direction: column;
      }

      .ft-heading {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 3vw, 2.5rem);
        font-weight: 700;
        line-height: 1.15;
        color: var(--text-primary);
      }

      .ft-desc {
        color: var(--text-secondary);
        font-size: 1.0625rem;
        line-height: 1.8;
      }

      .ft-values {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .ft-value {
        display: flex;
        align-items: flex-start;
        gap: 16px;
      }

      .ft-value-icon {
        flex-shrink: 0;
        color: var(--brand-primary);
        background: var(--accent-soft);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ft-value-title {
        font-family: var(--font-heading);
        font-size: 1.0625rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 2px;
      }

      .ft-value-desc {
        font-size: 0.9375rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .ft-btn-wrapper {
        align-self: flex-start;
      }

      /* Team composition canvas */
      .ft-canvas {
        border-radius: var(--radius-xl);
        padding: clamp(28px, 3.5vw, 44px);
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .ft-canvas-label {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .ft-chips {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      @media (max-width: 380px) {
        .ft-chips {
          grid-template-columns: 1fr;
        }
      }

      .ft-chip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        transition: transform 0.2s ease, border-color 0.2s ease;
      }

      .ft-chip:hover {
        transform: translateY(-2px);
        border-color: rgba(250, 166, 50, 0.45);
      }

      .ft-chip-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--accent-soft);
        color: var(--brand-primary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ft-chip-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
        line-height: 1.3;
      }

      .ft-chip-extra {
        border: 1.5px dashed rgba(250, 166, 50, 0.55);
        background: var(--accent-soft);
      }

      .ft-chip-extra .ft-chip-icon {
        background: var(--brand-primary);
        color: #ffffff;
      }

      /* ─── Compact variant (banner) ─── */
      .ft-compact-section {
        padding: 0 0 clamp(60px, 8vw, 100px);
        background: var(--background-muted);
      }

      .ft-compact {
        border-radius: var(--radius-xl);
        padding: clamp(28px, 4vw, 48px);
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(24px, 4vw, 48px);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .ft-compact {
          grid-template-columns: 1.1fr 1fr;
        }
      }

      .ft-compact-title {
        font-family: var(--font-heading);
        font-size: clamp(1.5rem, 2.2vw, 1.875rem);
        font-weight: 700;
        line-height: 1.2;
        color: var(--text-primary);
        margin-bottom: 12px;
      }

      .ft-compact-desc {
        color: var(--text-secondary);
        font-size: 0.9375rem;
        line-height: 1.7;
      }

      .ft-compact-side {
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: flex-start;
      }

      .ft-compact-points {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ft-compact-points li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.5;
      }

      .ft-compact-points li svg {
        flex-shrink: 0;
        color: var(--brand-primary);
        margin-top: 2px;
      }

      .ft-compact-points li strong {
        color: var(--text-primary);
        font-weight: 600;
      }
    `}</style>
  );
}
