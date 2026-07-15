"use client";

import { COMPANY_LOGOS } from "@/lib/company-logos";
import { useLanguage } from "@/contexts/LanguageContext";

const HALF = Math.ceil(COMPANY_LOGOS.length / 2);
const ROW_A = COMPANY_LOGOS.slice(0, HALF);
const ROW_B = COMPANY_LOGOS.slice(HALF);

function LogoRow({ logos, reverse }: { logos: typeof COMPANY_LOGOS; reverse?: boolean }) {
  return (
    <div className={`logo-row ${reverse ? "reverse" : ""}`}>
      <div className="logo-row-track">
        {[...logos, ...logos, ...logos].map((logo, idx) => (
          <div key={`${logo.name}-${idx}`} className="logo-chip" title={logo.name}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompanyLogoStrip() {
  const { t } = useLanguage();
  return (
    <div className="logo-strip-wrapper hero-shell">
      <div className="logo-strip-label">
        <span className="label-line" aria-hidden="true" />
        <span className="label-dot" aria-hidden="true" />
        <span className="label-text">{t("logos.label")}</span>
        <span className="label-dot" aria-hidden="true" />
        <span className="label-line" aria-hidden="true" />
      </div>

      <div className="logo-rows">
        <LogoRow logos={ROW_A} />
        <LogoRow logos={ROW_B} reverse />
      </div>

      <style jsx global>{`
        /* Width/alignment come from .hero-shell — see globals.css */
        .logo-strip-wrapper {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-top: none;
          border-bottom-left-radius: var(--radius-xl);
          border-bottom-right-radius: var(--radius-xl);
          padding: clamp(20px, 2.5vw, 28px) 0 clamp(24px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 22px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .logo-strip-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        .logo-strip-label .label-text {
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .logo-strip-label .label-dot {
          flex: 0 0 auto;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
        }

        .logo-strip-label .label-line {
          flex: 0 1 220px;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--border-strong)
          );
        }
        .logo-strip-label .label-line:last-child {
          background: linear-gradient(
            to left,
            transparent,
            var(--border-strong)
          );
        }

        .logo-rows {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.5vw, 16px);
        }

        /* Fade the marquee out at both ends so chips cut by the card edge read
           as intentional. Sized in px, not %, so the fade stays about one chip
           wide instead of collapsing to half a chip on narrow screens. */
        .logo-row {
          overflow: hidden;
          --logo-fade: clamp(112px, 15%, 280px);
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black var(--logo-fade),
            black calc(100% - var(--logo-fade)),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black var(--logo-fade),
            black calc(100% - var(--logo-fade)),
            transparent 100%
          );
        }

        .logo-row-track {
          display: flex;
          align-items: stretch;
          gap: clamp(14px, 1.8vw, 20px);
          width: max-content;
          padding: 6px 0;
          animation: logoScroll 48s linear infinite;
        }

        .logo-row.reverse .logo-row-track {
          animation-direction: reverse;
        }

        .logo-row:hover .logo-row-track {
          animation-play-state: paused;
        }

        @keyframes logoScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.3333%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-row-track {
            animation: none;
            transform: none;
          }
          .logo-row {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            mask-image: none;
            -webkit-mask-image: none;
          }
          .logo-row::-webkit-scrollbar {
            display: none;
          }
        }

        /* ── The chip: every logo gets its own white card so all brand
           colors stay true and every mark has equal visual weight ── */
        .logo-chip {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(140px, 14vw, 180px);
          height: clamp(52px, 5.5vw, 64px);
          padding: 10px 26px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition:
            transform var(--duration-fast) var(--ease-out),
            box-shadow var(--duration-fast) var(--ease-out),
            border-color var(--duration-fast) var(--ease-out);
        }

        .logo-chip:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.1),
            0 0 0 4px color-mix(in srgb, var(--primary) 12%, transparent);
        }

        .logo-chip .logo-img {
          max-width: 100%;
          max-height: clamp(26px, 2.8vw, 34px);
          width: auto;
          height: auto;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        /* Dark mode: keep the chips white — logos are designed for light
           canvases, and the white cards on the dark bar look intentional */
        .dark .logo-chip {
          background: #fbfbfc;
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 640px) {
          .logo-chip {
            min-width: 120px;
            height: 48px;
            padding: 8px 18px;
            border-radius: 12px;
          }
          .logo-chip .logo-img {
            max-height: 24px;
          }
          .logo-strip-label .label-line {
            flex-basis: 60px;
          }
          .logo-strip-label .label-text {
            white-space: normal;
            text-align: center;
            line-height: 1.6;
          }
        }
      `}</style>
    </div>
  );
}
