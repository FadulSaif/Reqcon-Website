"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ARTICLES } from "@/lib/articles-data";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesBrief() {
  const { t } = useLanguage();
  return (
    <section className="articles-section section">
      <div className="container-wide">
        <div className="text-center mb-48">
          <span className="eyebrow d-block mb-16">{t("articles.eyebrow")}</span>
          <h2 className="heading-lg">{t("articles.title")}</h2>
        </div>

        <div className="articles-grid">
          {ARTICLES.map((article, idx) => (
            <ArticleCard
              key={article.slug}
              article={article}
              headingLevel="h3"
              imageSizes="(max-width: 768px) 100vw, 25vw"
              animationDelay={idx * 0.15}
            />
          ))}
        </div>

        <div className="articles-viewall">
          <Link href="/articles" className="btn btn-outline inline-flex">
            {t("articles.viewAll")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .articles-viewall {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        .articles-section {
          padding: clamp(80px, 10vw, 120px) 0;
          background-color: var(--background);
        }

        .mb-16 { margin-bottom: 16px; }
        .mb-48 { margin-bottom: 48px; }
        .d-block { display: block; }
        .text-center { text-align: center; }

        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          .articles-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }
        }

        /* Card styling lives in ArticleCard.tsx; only the "view all" button below. */
        .inline-flex {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </section>
  );
}
