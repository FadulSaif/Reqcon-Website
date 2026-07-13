"use client";

import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { ARTICLES } from "@/lib/articles-data";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesListPage() {
  const { t } = useLanguage();

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
                <ArticleCard
                  key={article.slug}
                  article={article}
                  headingLevel="h2"
                  linkTitle
                  imageSizes="(max-width: 768px) 100vw, 33vw"
                  animationDelay={(idx % 3) * 0.1}
                />
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
          align-items: stretch; /* every card fills its row height so buttons align */
        }
        @media (min-width: 640px) {
          .al-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .al-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Card styling lives in ArticleCard.tsx (shared with the homepage). */
      `}</style>
    </>
  );
}
