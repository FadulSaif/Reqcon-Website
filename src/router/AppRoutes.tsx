import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// Lazy load page components for optimized bundle performance and code-splitting
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const About = lazy(() => import('../pages/About'));
const Careers = lazy(() => import('../pages/Careers'));
const Contact = lazy(() => import('../pages/Contact'));

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

  useEffect(() => {
    if (lng === 'sv' || lng === 'en') {
      if (i18n.language !== lng) {
        i18n.changeLanguage(lng);
      }
    }
  }, [lng, i18n]);

  if (lng !== 'sv' && lng !== 'en') {
    const savedLanguage = localStorage.getItem('reqcon_language') || 'sv';
    return <Navigate to={`/${savedLanguage}`} replace />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  const savedLanguage = localStorage.getItem('reqcon_language') || 'sv';

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Default landing page redirects to Swedish or saved locale */}
        <Route path="/" element={<Navigate to={`/${savedLanguage}`} replace />} />
        
        {/* Multilingual Route Structure */}
        <Route path="/:lng" element={<LanguageRouteWrapper />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Fallback for invalid paths */}
        <Route path="*" element={<Navigate to={`/${savedLanguage}`} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
