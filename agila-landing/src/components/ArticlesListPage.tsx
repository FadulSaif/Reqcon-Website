"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { ARTICLES } from "@/lib/articles-data";

export default function ArticlesListPage() {
  const { t, language } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="articles-list-page">
        {/* Hero */}
        <header className="al-hero">
          <div className="container-wide text-center">
            <span className="eyebrow d-block mb-16">{t("articles.eyebrow")}</span>
            <h1 className="al-title">{t("articles.page.title")}</h1>
            <p className="al-subtitle">{t("articles.page.subtitle")}</p>
          </div>
        </header>

        {/* Grid */}
        <section className="al-section">
          <div className="container-wide">
            <div className="al-grid">
              {ARTICLES.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  className="al-card glass-panel hover-lift"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                >
                  <div className="al-image-container">
                    <Image
                      src={article.image}
                      alt={t(article.titleKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="al-image"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="al-category">{t(article.categoryKey)}</span>
                  </div>
                  <div className="al-content">
                    <div className="al-meta">
                      <span>{language === "sv" ? article.dateSv : article.dateEn}</span>
                    </div>
                    <h2 className="al-card-title">
                      <Link href={`/articles/${article.slug}`}>{t(article.titleKey)}</Link>
                    </h2>
                    <p className="al-excerpt">{t(article.excerptKey)}</p>
                    <Link href={`/articles/${article.slug}`} className="btn btn-primary btn-sm inline-flex">
                      {t("articles.read")} <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />

      <style jsx>{`
        .articles-list-page { width: 100%; background: var(--background); }

        .al-hero {
          padding-top: clamp(120px, 16vh, 180px);
          padding-bottom: clamp(40px, 6vw, 64px);
        }
        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }
        .d-block { display: block; }
        .mb-16 { margin-bottom: 16px; }
        .text-center { text-align: center; }
        .al-title {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 20px;
        }
        .al-subtitle {
          max-width: 720px;
          margin: 0 auto;
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .al-section { padding-bottom: clamp(80px, 10vw, 120px); }

        .al-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) {
          .al-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .al-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .al-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          border-radius: var(--radius-xl);
          background: var(--bg-elevated);
        }
        .al-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          display: block;
        }
        .al-image { object-fit: cover; transition: transform 0.6s ease; }
        .al-card:hover .al-image { transform: scale(1.05); }
        .al-category {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--brand-primary);
          color: #fff;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 2;
        }
        .al-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .al-meta {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        .al-card-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 14px;
          color: var(--text-primary);
        }
        .al-card-title a { color: inherit; text-decoration: none; }
        .al-card-title a:hover { color: var(--brand-primary); }
        .al-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
          flex-grow: 1;
        }
        .inline-flex {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
        }
      `}</style>
    </>
  );
}
