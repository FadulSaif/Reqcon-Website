import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { getArticle } from '../content/articles';
import NotFound from './NotFound';

const Article: React.FC = () => {
  const { slug, lng } = useParams<{ slug: string; lng: 'sv' | 'en' }>();
  const article = slug ? getArticle(slug) : undefined;
  if (!article || (lng !== 'sv' && lng !== 'en')) return <NotFound />;
  const copy = article[lng];
  const backLabel = lng === 'sv' ? 'Tillbaka till tjänster' : 'Back to services';

  return (
    <article className="bg-bg-page text-text-primary">
      <SEO title={copy.title} description={copy.description} />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link to={`/${lng}/services`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:underline">
          <ArrowLeft className="w-4 h-4" />{backLabel}
        </Link>
        <header className="mt-8 border-b border-border-custom pb-10">
          <p className="section-eyebrow !mb-0">REQCON Insights</p>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-bold tracking-tight">{copy.title}</h1>
          <div className="mt-7 space-y-4 text-lg leading-8 text-text-secondary">
            {copy.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>
        <div className="mt-12 space-y-12">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-2xl font-bold">{section.heading}</h2>
              <div className="mt-4 space-y-4 leading-7 text-text-secondary">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Article;
