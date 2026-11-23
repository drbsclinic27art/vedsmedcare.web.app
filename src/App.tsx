/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Link, useRoute } from './utils/router';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MedicineLibraryPage } from './pages/MedicineLibraryPage';
import { MedicineDetailPage } from './pages/MedicineDetailPage';
import { HealthBlogPage } from './pages/HealthBlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { PharmacyEducationPage } from './pages/PharmacyEducationPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppShell() {
  const { pathname } = useRoute();
  const { lang, loc } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const renderPage = () => {
    const cleanPath = pathname.replace(/\/+$/, '') || '/';

    if (cleanPath === '/') return <HomePage />;
    if (cleanPath === '/about') return <AboutPage />;
    if (cleanPath === '/medicines') return <MedicineLibraryPage />;
    if (cleanPath.startsWith('/medicines/')) {
      return <MedicineDetailPage slug={decodeURIComponent(cleanPath.slice('/medicines/'.length))} />;
    }
    if (cleanPath === '/health-awareness') return <HealthBlogPage />;
    if (cleanPath.startsWith('/health-awareness/')) {
      return <ArticleDetailPage slug={decodeURIComponent(cleanPath.slice('/health-awareness/'.length))} />;
    }
    if (cleanPath === '/pharmacy-education') return <PharmacyEducationPage />;
    if (cleanPath === '/products') return <ProductsPage />;
    if (cleanPath.startsWith('/products/')) {
      return <ProductDetailPage slug={decodeURIComponent(cleanPath.slice('/products/'.length))} />;
    }
    if (cleanPath === '/contact') return <ContactPage />;
    if (cleanPath === '/medical-disclaimer') return <LegalPage page="disclaimer" />;
    if (cleanPath === '/privacy-policy') return <LegalPage page="privacy" />;
    if (cleanPath === '/terms') return <LegalPage page="terms" />;
    if (cleanPath === '/admin') return <AdminDashboardPage />;

    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-[#102A43]">
          {loc('Page Not Found', 'पृष्ठ नहीं मिला')}
        </h1>
        <p className="mt-3 text-sm text-[#486581]">
          {loc(
            'The page you requested does not exist on Ved’s Medcare.',
            'आपने जो पृष्ठ खोजा है वह वेद’स मेडकेयर पर उपलब्ध नहीं है।'
          )}
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
        >
          {loc('Return Home', 'होम पेज पर जाएँ')}
        </Link>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-[#102A43] ${lang === 'hi' ? 'lang-hi' : ''}`}>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main id="main-content" className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <GlobalSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <AppShell />
        </DataProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
