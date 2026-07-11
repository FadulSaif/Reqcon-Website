"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ArticleMeta } from "@/lib/articles-data";

interface ArticleCardProps {
  article: ArticleMeta;
  /**
   * Heading level for the card title. Use "h3" on the homepage (it sits under
   * the section's <h2>) and "h2" on the /articles listing (under the page <h1>).
   * Keeping the correct heading order matters for accessibility and SEO.
   */
  headingLevel?: "h2" | "h3";
  /** Wrap the title in a link (listing page). The homepage relies on its button instead. */
  linkTitle?: boolean;
  /** Responsive image `sizes` hint (differs by how many columns the grid shows). */
  imageSizes?: string;
  /** framer-motion entrance delay, in seconds. */
  animationDelay?: number;
}

/**
 * Shared article card used by both the homepage ArticlesBrief and the /articles
 * ArticlesListPage. Data comes from ARTICLES (src/lib/articles-data.ts); the two
 * call sites only differ by heading level, image sizes, whether the title links,
 * and entrance delay — everything else (layout, hover, equal-height alignment)
 * lives here once.
 */
export default function ArticleCard({
  article,
  headingLevel = "h3",
  linkTitle = false,
  imageSizes = "(max-width: 768px) 100vw, 33vw",
  animationDelay = 0,
}: ArticleCardProps) {
  const { t, language } = useLanguage();
  const Heading = headingLevel;
  const title = t(article.titleKey);
  const href = `/articles/${article.slug}`;

  return (
    <motion.article
      className="article-card glass-panel hover-lift"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: animationDelay, ease: "easeOut" }}
    >
      <div className="article-image-container">
        <Image
          src={article.image}
          alt={title}
          fill
          sizes={imageSizes}
          className="article-image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="article-content">
        <div className="article-meta">
          <span className="article-category">{t(article.categoryKey)}</span>
          <span className="article-date">{language === "sv" ? article.dateSv : article.dateEn}</span>
        </div>
        <Heading className="article-title">
          {linkTitle ? <Link href={href}>{title}</Link> : title}
        </Heading>
        <p className="article-excerpt">{article.excerptKey ? t(article.excerptKey) : ""}</p>
        <Link href={href} className="btn btn-primary btn-sm inline-flex">
          {t("articles.read")} <ArrowRight size={16} />
        </Link>
      </div>

      <style jsx>{`
        .article-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          border-radius: var(--radius-xl);
          background: var(--bg-elevated);
          height: 100%; /* equal card heights so all "Läs artikel" buttons align */
        }

        .article-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          display: block;
        }

        .article-image {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .article-card:hover .article-image {
          transform: scale(1.05);
        }

        .article-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        /* Meta row: category pill on the left, date pushed to the right */
        .article-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .article-category {
          background: var(--brand-primary);
          color: #fff;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .article-date {
          margin-left: auto;
          white-space: nowrap;
        }

        .article-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 14px;
          color: var(--text-primary);
        }
        .article-title :global(a) {
          color: inherit;
          text-decoration: none;
        }
        .article-title :global(a:hover) {
          color: var(--brand-primary);
        }

        .article-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
          flex-grow: 1; /* fills leftover space, pushing the button to the bottom */
        }

        .inline-flex {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          margin-top: auto; /* pin "Läs artikel" to the card bottom regardless of text length */
        }
      `}</style>
    </motion.article>
  );
}
