import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-[var(--navbar-height)]">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
