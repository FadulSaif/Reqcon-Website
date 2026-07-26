import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Card from '../components/Card';
import { articles } from '../content/articles';
import NotFound from './NotFound';

const Articles: React.FC = () => {
  const { lng } = useParams<{ lng: 'sv' | 'en' }>();

  if (lng !== 'sv' && lng !== 'en') return <NotFound />;

  const copy = lng === 'sv'
    ? {
        title: 'Insikter om kravhantering | REQCON AB',
        description: 'Praktiska insikter om kravhantering, anbudsgranskning och spårbarhet i byggprojekt.',
        eyebrow: 'REQCON Insikter',
        heading: 'Insikter för tydligare krav och säkrare beslut',
        intro: 'Praktiska artiklar för team som granskar, följer upp och för vidare krav genom anbud och leverans.',
        readMore: 'Läs artikeln',
      }
    : {
        title: 'Insights on requirements management | REQCON AB',
        description: 'Practical insights on requirements management, tender review, and traceability in construction projects.',
        eyebrow: 'REQCON Insights',
        heading: 'Insights for clearer requirements and safer decisions',
        intro: 'Practical articles for teams that review, track, and carry requirements through tender and delivery.',
        readMore: 'Read article',
      };

  const backHome = lng === 'sv' ? 'Till startsidan' : 'Back to Home';

  return (
    <main className="relative overflow-hidden bg-slate-950 text-text-primary [&_.heading-display]:!text-white [&_.body-lg]:!text-slate-300">
      <SEO title={copy.title} description={copy.description} />
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/images/articles/insights-hero-720.png"
          srcSet="/images/articles/insights-hero-720.png 720w, /images/articles/insights-hero-1080.png 1080w, /images/articles/insights-hero-1774.png 1774w"
          sizes="100vw"
          width="1774"
          height="887"
          alt=""
          className="h-full w-full object-cover opacity-35 brightness-90 contrast-105"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
      </div>
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <Link
            to={`/${lng}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary transition-colors hover:text-accent-hover"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {backHome}
          </Link>
          <p className="section-eyebrow select-none w-fit px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15">{copy.eyebrow}</p>
          <h1 className="heading-display text-text-primary">{copy.heading}</h1>
          <p className="body-lg mt-6 max-w-2xl">{copy.intro}</p>
        </div>

        <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => {
            const articleCopy = article[lng];
            return (
              <Card key={article.slug} hoverable className="flex h-full flex-col p-7 text-left shadow-sm">
                <h2 className="font-heading text-xl font-bold leading-tight text-text-primary">
                  <Link to={`/${lng}/articles/${article.slug}`} className="transition-colors hover:text-brand-secondary">
                    {articleCopy.title}
                  </Link>
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">{articleCopy.description}</p>
                <Link
                  to={`/${lng}/articles/${article.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand-secondary transition-colors hover:text-accent-hover"
                >
                  {copy.readMore}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Articles;
