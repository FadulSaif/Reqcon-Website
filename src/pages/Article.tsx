import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Eyebrow from '../components/Eyebrow';
import { getArticle } from '../content/articles';
import NotFound from './NotFound';

const Article: React.FC = () => {
  const { slug, lng } = useParams<{ slug: string; lng: 'sv' | 'en' }>();
  const article = slug ? getArticle(slug) : undefined;
  if (!article || (lng !== 'sv' && lng !== 'en')) return <NotFound />;
  const copy = article[lng];
  const backLabel = lng === 'sv' ? 'Tillbaka till insikter' : 'Back to Insights';

  return (
    <article className="bg-bg-page text-text-primary">
      <SEO title={copy.title} description={copy.description} />
      <div className="max-w-[46rem] mx-auto px-5 pb-16 pt-[calc(var(--navbar-height)+4rem)] sm:px-6 md:pb-24 md:pt-[calc(var(--navbar-height)+6rem)]">
        <Link to={`/${lng}/articles`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:underline">
          <ArrowLeft className="w-4 h-4" />{backLabel}
        </Link>
        <header className="mt-8 border-b border-border-custom pb-12">
          <Eyebrow>REQCON Insights</Eyebrow>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-bold tracking-tight">{copy.title}</h1>
          <div className="mt-7 max-w-[65ch] space-y-5 text-[1.0625rem] md:text-lg leading-8 text-text-secondary">
            {copy.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>
        <div className="mt-14 max-w-[65ch] space-y-14">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-[1.0625rem] leading-8 text-text-secondary">
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
