import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import NotFound from '../pages/NotFound';
import PersonalPolicy from '../pages/PersonalPolicy';
import Privacy from '../pages/Privacy';

// Lazy load page components for optimized bundle performance and code-splitting
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const About = lazy(() => import('../pages/About'));
const Careers = lazy(() => import('../pages/Careers'));
const Contact = lazy(() => import('../pages/Contact'));
const Article = lazy(() => import('../pages/Article'));

// Fallback spinner conforming to corporate styling
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center bg-bg-page text-brand-secondary">
    <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
  </div>
);

// Route wrapper that syncs active i18n locale with path parameter :lng
const LanguageRouteWrapper: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();

  if (lng !== 'sv' && lng !== 'en') {
    return <NotFound />;
  }

  // This must happen while rendering, not in an effect: an SSG render for
  // /en/... needs English content and metadata in its first HTML response.
  if (i18n.language !== lng) {
    void i18n.changeLanguage(lng);
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Swedish is the deterministic default for the public root URL. */}
        <Route path="/" element={<Navigate to="/sv" replace />} />
        
        {/* Multilingual Route Structure */}
        <Route path="/:lng" element={<LanguageRouteWrapper />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="personalpolicy" element={<PersonalPolicy />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Fallback for invalid paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
