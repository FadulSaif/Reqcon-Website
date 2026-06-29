"use client";

import { COMPANY_LOGOS } from "@/lib/company-logos";

export default function CompanyLogoStrip() {
  return (
    <div className="logo-strip-wrapper">
      <div className="logo-strip-marquee">
        <div className="logo-strip-track">
          {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, idx) => (
            <div key={`${logo.name}-${idx}`} className="logo-item">
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

      <style jsx>{`
        .logo-strip-wrapper {
          width: calc(100% - clamp(2rem, 4vw, 4rem));
          max-width: 1800px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-top: none;
          border-bottom-left-radius: var(--radius-xl);
          border-bottom-right-radius: var(--radius-xl);
          height: clamp(72px, 8vw, 88px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .logo-strip-marquee {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
          );
          display: flex;
          align-items: center;
        }

        .logo-strip-track {
          display: flex;
          align-items: center;
          gap: clamp(32px, 5vw, 80px);
          width: max-content;
          animation: logoMarqueeLeftToRight 35s linear infinite;
        }

        .logo-strip-marquee:hover .logo-strip-track {
          animation-play-state: paused;
        }

        @keyframes logoMarqueeLeftToRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-strip-track {
            animation: none;
            transform: none;
          }
          .logo-strip-marquee {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            mask-image: none;
          }
          .logo-strip-marquee::-webkit-scrollbar {
            display: none;
          }
        }

        .logo-item {
          flex: 0 0 auto;
          width: clamp(110px, 10vw, 150px);
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          max-width: 100%;
          max-height: clamp(24px, 3vw, 38px);
          width: auto;
          height: auto;
          object-fit: contain;
          object-position: center;
          display: block;
          filter: grayscale(1) opacity(0.6);
          transition: filter var(--duration-fast) var(--ease-out);
        }

        .logo-item:hover .logo-img {
          filter: grayscale(0) opacity(1);
        }
      `}</style>
    </div>
  );
}
