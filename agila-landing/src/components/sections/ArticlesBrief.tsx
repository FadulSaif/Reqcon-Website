"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    title: "The Future of Flexible IT Staffing in 2026",
    excerpt:
      "As digital transformation accelerates, companies are moving away from rigid hiring models. Discover how flexible IT staffing is allowing Swedish companies to rapidly scale infrastructure and adopt AI technologies without the overhead of permanent headcount.",
    image: "/assets/it_staffing_hero.png",
    slug: "future-flexible-it-staffing",
    date: "June 15, 2026",
    category: "Technology",
  },
  {
    title: "Optimizing Warehouse Operations with Agile Talent",
    excerpt:
      "Peak seasons can break a rigid supply chain. Learn how top logistics centers are utilizing agile talent deployment to maintain extremely high throughput during critical e-commerce spikes, reducing bottlenecks and avoiding burnout.",
    image: "/assets/warehouse_agile_hero.png",
    slug: "optimizing-warehouse-operations",
    date: "May 28, 2026",
    category: "Logistics",
  },
  {
    title: "Sustainable Practices in Modern Construction",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/industry-construction.jpg",
    slug: "sustainable-practices-construction",
    date: "April 12, 2026",
    category: "Construction",
  },
  {
    title: "The Evolution of Commercial Cleaning Standards",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/assets/industry-cleaning.jpg",
    slug: "evolution-commercial-cleaning",
    date: "March 05, 2026",
    category: "Facilities",
  },
];

export default function ArticlesBrief() {
  return (
    <section className="articles-section section">
      <div className="container-wide">
        <div className="text-center mb-48">
          <span className="eyebrow d-block mb-16">LATEST INSIGHTS</span>
          <h2 className="heading-lg">Articles & Industry News</h2>
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
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="article-image"
                />
                <div className="article-category">{article.category}</div>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span>{article.date}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <a href={`/articles/${article.slug}`} className="btn btn-primary btn-sm inline-flex">
                  Read Article <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
