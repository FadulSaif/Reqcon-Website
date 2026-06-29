"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ARTICLES } from "@/lib/articles-data";

export default function ArticlesBrief() {
  const { t, language } = useLanguage();
  return (
    <section className="articles-section section">
      <div className="container-wide">
        <div className="text-center mb-48">
          <span className="eyebrow d-block mb-16">{t("articles.eyebrow")}</span>
          <h2 className="heading-lg">{t("articles.title")}</h2>
        </div>

        <div className="articles-grid">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={article.slug}
              className="article-card glass-panel hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
            >
              <div className="article-image-container">
                <Image
                  src={article.image}
                  alt={t(article.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="article-image"
                />
                <div className="article-category">{t(article.categoryKey)}</div>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span>{language === "sv" ? article.dateSv : article.dateEn}</span>
                </div>
                <h3 className="article-title">{t(article.titleKey)}</h3>
                <p className="article-excerpt">{article.excerptKey ? t(article.excerptKey) : ""}</p>
                <Link href={`/articles/${article.slug}`} className="btn btn-primary btn-sm inline-flex">
                  {t("articles.read")} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
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

        .article-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          border-radius: var(--radius-xl);
          background: var(--bg-elevated);
        }

        .article-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .article-image {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .article-card:hover .article-image {
          transform: scale(1.05);
        }

        .article-category {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--brand-primary);
          color: white;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 2;
        }

        .article-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .article-meta {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .article-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .article-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
          flex-grow: 1;
        }

        .inline-flex {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
        }
      `}</style>
    </section>
  );
}
