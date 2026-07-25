import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import FloatingCTA from './components/FloatingCTA';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  );
};

export default App;
