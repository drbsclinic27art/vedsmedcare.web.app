import React from 'react';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link } from '../utils/router';
import { formatWhatsAppUrl } from '../utils/medcareLogic';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { t, loc } = useLanguage();
  const { siteSettings } = useData();

  return (
    <footer className="bg-[#102A43] text-white border-t border-[#1D3B58]">
      {/* Medical Disclaimer Strip */}
      <div className="bg-[#0A1D2F] border-b border-[#1D3B58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-[#BCCCDC] leading-relaxed max-w-4xl">
            <strong className="text-white font-semibold">{t.disclaimer.shortTitle}: </strong>
            {t.disclaimer.exactText}
          </p>
          <Link
            to="/medical-disclaimer"
            className="text-xs font-semibold text-[#5FE3B4] hover:underline whitespace-nowrap shrink-0"
          >
            {t.disclaimer.learnMore} →
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <BrandLogo inverted />
          <p className="mt-4 text-sm text-[#BCCCDC] leading-relaxed">
            {t.footer.tagline}
          </p>
          <p className="mt-4 text-xs text-[#9FB3C8]">
            {loc('Founder', 'संस्थापक')}: <span className="text-white font-medium">{siteSettings.founderName}</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
          <ul className="space-y-2.5 text-sm text-[#BCCCDC]">
            <li><Link to="/medicines" className="hover:text-white transition-colors">{t.nav.medicines}</Link></li>
            <li><Link to="/health-awareness" className="hover:text-white transition-colors">{t.nav.healthAwareness}</Link></li>
            <li><Link to="/pharmacy-education" className="hover:text-white transition-colors">{t.nav.pharmacyEducation}</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">{t.nav.products}</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t.footer.legalLinks}</h3>
          <ul className="space-y-2.5 text-sm text-[#BCCCDC]">
            <li><Link to="/medical-disclaimer" className="hover:text-white transition-colors">{t.footer.medicalDisclaimer}</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t.footer.privacyPolicy}</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.termsConditions}</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            <li>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-[#9FB3C8] hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                {t.nav.adminPortal}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t.footer.contactInfo}</h3>
          <ul className="space-y-3 text-sm text-[#BCCCDC]">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#5FE3B4] mt-0.5 shrink-0" aria-hidden="true" />
              <span>{loc(siteSettings.locationEn, siteSettings.locationHi)}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#5FE3B4] shrink-0" aria-hidden="true" />
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors font-mono tabular-nums"
              >
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#5FE3B4] shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${siteSettings.email}`}
                className="hover:text-white transition-colors break-all"
              >
                {siteSettings.email}
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
              <a
                href={formatWhatsAppUrl(siteSettings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#5FE3B4] hover:underline whitespace-nowrap"
              >
                WhatsApp →
              </a>
              <span aria-hidden="true" className="text-[#486581]">·</span>
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#5FE3B4] hover:underline whitespace-nowrap"
              >
                Instagram ({siteSettings.instagramHandle}) →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#1D3B58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9FB3C8]">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. {t.footer.rightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</a>
            <span aria-hidden="true">·</span>
            <a href="/robots.txt" className="hover:text-white transition-colors">Robots.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
