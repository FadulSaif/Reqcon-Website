import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, '');
  const isHomePage = normalizedPath === '/sv' || normalizedPath === '/en';

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={`flex-grow ${isHomePage ? 'pt-[var(--navbar-height)]' : ''}`}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
