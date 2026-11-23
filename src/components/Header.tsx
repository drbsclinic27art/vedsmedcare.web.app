import React, { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link, useRoute } from '../utils/router';
import { formatWhatsAppUrl } from '../utils/medcareLogic';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const { siteSettings } = useData();
  const { pathname } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/medicines', label: t.nav.medicines },
    { to: '/health-awareness', label: t.nav.healthAwareness },
    { to: '/pharmacy-education', label: t.nav.pharmacyEducation },
    { to: '/products', label: t.nav.products },
    { to: '/contact', label: t.nav.contact },
  ];

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

  const whatsappHref = formatWhatsAppUrl(
    siteSettings.whatsapp,
    "Hello Ved's Medcare, I have an enquiry."
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#D9E2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark */}
        <Link to="/" aria-label="Ved's Medcare Home" className="shrink-0">
          <BrandLogo />
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-5 text-sm font-medium"
        >
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                  active
                    ? 'text-[#102A43] border-[#15966A] font-semibold'
                    : 'text-[#486581] border-transparent hover:text-[#102A43] hover:border-[#D9E2EC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Utilities & Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t.nav.searchLabel}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#334E68] hover:text-[#102A43] hover:bg-[#F5F8FA] transition-colors shrink-0"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Bilingual EN / हिंदी Switcher */}
          <div
            role="group"
            aria-label="Language Switcher"
            className="inline-flex items-center bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg p-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#102A43] text-white'
                  : 'text-[#486581] hover:text-[#102A43]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              aria-pressed={lang === 'hi'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === 'hi'
                  ? 'bg-[#102A43] text-white'
                  : 'text-[#486581] hover:text-[#102A43]'
              }`}
            >
              हिंदी
            </button>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors whitespace-nowrap shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.29-1.65a11.87 11.87 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.42Zm-8.46 18.33h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.89-9.92 9.89Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
            {t.nav.whatsapp}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#102A43] hover:bg-[#F5F8FA] transition-colors shrink-0"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-[#D9E2EC] shadow-lg">
          <nav aria-label="Mobile Navigation" className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#EDF8F4] text-[#102A43] font-semibold'
                      : 'text-[#334E68] hover:bg-[#F5F8FA] hover:text-[#102A43]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#E6EDF3] flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors"
              >
                {t.nav.whatsapp} · {siteSettings.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
