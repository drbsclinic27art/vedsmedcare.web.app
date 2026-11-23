import React from 'react';
import { ArrowLeft, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { formatWhatsAppUrl } from '../utils/medcareLogic';
import { Link, navigate, usePageSeo } from '../utils/router';
import { SafeImage } from '../components/SafeImage';

interface ProductDetailPageProps {
  slug: string;
}

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { lang, t, loc } = useLanguage();
  const { products, siteSettings } = useData();

  const product = products.find((p) => p.slug === slug && p.published);

  usePageSeo(
    product ? `${loc(product.nameEn, product.nameHi)} — Healthcare Products | Ved's Medcare` : `Product Not Found — Ved's Medcare`,
    product ? loc(product.descriptionEn, product.descriptionHi) : t.products.pageSubtitle
  );

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#102A43]">
          {loc('Product not found', 'उत्पाद नहीं मिला')}
        </h1>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t.products.backToCatalogue}
        </Link>
      </div>
    );
  }

  const productTitle = loc(product.nameEn, product.nameHi);
  const features = lang === 'hi' && product.featuresHi.length > 0 ? product.featuresHi : product.featuresEn;

  const handleEnquiry = () => {
    navigate(
      `/contact?type=product_enquiry&subject=${encodeURIComponent(
        `Product Enquiry: ${product.nameEn}`
      )}`
    );
  };

  return (
    <div className="bg-white">
      <div className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15966A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {t.products.backToCatalogue}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#D9E2EC] bg-[#F5F8FA]">
            <SafeImage
              src={product.image}
              alt={productTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 p-4 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl flex items-start gap-2.5 text-xs text-[#486581]">
            <Info className="w-4 h-4 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
            <span>{t.products.catalogueNotice}</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-xs font-semibold text-[#15966A]">{product.category}</div>
            <h1 className="mt-2 text-3xl font-bold text-[#102A43]">{productTitle}</h1>
            <p className="mt-4 text-sm sm:text-base text-[#334E68] leading-relaxed">
              {loc(product.descriptionEn, product.descriptionHi)}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleEnquiry}
                className="px-5 py-3 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] transition-colors"
              >
                {t.products.enquireButton}
              </button>
              <a
                href={formatWhatsAppUrl(
                  siteSettings.whatsapp,
                  `Hello Ved's Medcare, I have an enquiry about: ${product.nameEn}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors"
              >
                {t.products.whatsappEnquiry}
              </a>
            </div>
          </div>

          <section className="pt-6 border-t border-[#E6EDF3]">
            <h2 className="text-base font-bold text-[#102A43]">{t.products.featuresLabel}</h2>
            <ul className="mt-3 space-y-2.5">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-[#334E68]">
                  <CheckCircle2 className="w-4 h-4 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-6 border-t border-[#E6EDF3]">
            <h2 className="text-base font-bold text-[#102A43]">{t.products.usageLabel}</h2>
            <p className="mt-2.5 text-sm text-[#334E68] leading-relaxed">
              {loc(product.usageEn, product.usageHi)}
            </p>
          </section>

          <section className="pt-6 border-t border-[#E6EDF3]">
            <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
              {t.products.precautionsLabel}
            </h2>
            <p className="mt-2.5 text-sm text-[#334E68] leading-relaxed">
              {loc(product.precautionsEn, product.precautionsHi)}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
