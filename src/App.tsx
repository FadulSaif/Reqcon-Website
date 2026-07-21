import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import FloatingCTA from './components/FloatingCTA';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
};

export default App;
