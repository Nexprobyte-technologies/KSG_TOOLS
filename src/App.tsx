import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PhotosPage } from './pages/PhotosPage';
import { VideosPage } from './pages/VideosPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.getElementById(path.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuoteModal = (productName?: string) => {
    setQuoteProduct(productName || '');
    setQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
    setQuoteProduct('');
  };

  // Render current view
  const renderPage = () => {
    if (currentPath === '/about') {
      return (
        <AboutPage
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }
    if (currentPath === '/products') {
      return (
        <ProductsPage
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '').split(/[?#]/)[0];
      return (
        <ProductDetailPage
          slug={slug}
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }
    if (currentPath === '/photos') {
      return (
        <PhotosPage
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }
    if (currentPath === '/videos') {
      return (
        <VideosPage
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }
    if (currentPath === '/contact') {
      return (
        <ContactPage
          navigate={navigate}
          openQuoteModal={openQuoteModal}
        />
      );
    }

    // Default to Home page
    return (
      <HomePage
        navigate={navigate}
        openQuoteModal={openQuoteModal}
      />
    );
  };

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        openQuoteModal={openQuoteModal}
      />

      <div style={{ flex: 1 }}>{renderPage()}</div>

      <Footer navigate={navigate} />

      <FloatingWhatsApp />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={closeQuoteModal}
        selectedProduct={quoteProduct}
      />
    </div>
  );
}
