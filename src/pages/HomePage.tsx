import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  HeartPulse,
  Package,
  Pill,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { BLOG_CATEGORIES, BRAND_IMAGES, PHARMACY_SUBJECTS } from '../data/seedData';
import { Link, navigate, usePageSeo } from '../utils/router';
import { formatWhatsAppUrl } from '../utils/medcareLogic';
import { SafeImage } from '../components/SafeImage';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';

export function HomePage() {
  const { lang, t, loc } = useLanguage();
  const { medicines, articles, pharmacyNotes, products, siteSettings } = useData();
  const [quickMedQuery, setQuickMedQuery] = useState('');

  usePageSeo(
    loc(siteSettings.seoTitleEn, siteSettings.seoTitleHi),
    loc(siteSettings.seoDescriptionEn, siteSettings.seoDescriptionHi)
  );

  const publishedMedicines = medicines.filter((m) => m.published);
  const publishedArticles = articles.filter((a) => a.published);
  const publishedProducts = products.filter((p) => p.published);
  const publishedNotes = pharmacyNotes.filter((n) => n.published);

  const handleQuickMedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = quickMedQuery.trim();
    navigate(q ? `/medicines?q=${encodeURIComponent(q)}` : '/medicines');
  };

  const services = [
    {
      num: '01',
      icon: Pill,
      title: loc('Medicine Information Library', 'दवा जानकारी लाइब्रेरी'),
      desc: loc(
        'Searchable monographs by generic salt, reference brand, or drug class with uses, mechanisms, side effects, precautions, contraindications, and traceable sources.',
        'जेनेरिक सॉल्ट, प्रचलित ब्रांड या दवा श्रेणी से खोजें — उपयोग, कार्यप्रणाली, सावधानियाँ, दुष्प्रभाव और प्रमाणित स्रोतों सहित।'
      ),
      to: '/medicines',
      cta: t.home.viewAllMedicines,
    },
    {
      num: '02',
      icon: HeartPulse,
      title: loc('Health Awareness Blog', 'स्वास्थ्य जागरूकता ब्लॉग'),
      desc: loc(
        'Bilingual preventive guidance covering heart health, blood pressure, cholesterol, diabetes, nutrition, first aid, and safe medicine habits.',
        'हृदय स्वास्थ्य, ब्लड प्रेशर, कोलेस्ट्रॉल, मधुमेह, पोषण, प्राथमिक उपचार और सुरक्षित दवा उपयोग पर द्विभाषी लेख।'
      ),
      to: '/health-awareness',
      cta: t.home.viewAllArticles,
    },
    {
      num: '03',
      icon: GraduationCap,
      title: loc('D.Pharm & Pharmacy Education', 'D.Pharm एवं फार्मेसी शिक्षा'),
      desc: loc(
        'Subject-wise study notes, practical lab procedures, important exam & viva questions, diagrams, and downloadable PDF study sheets.',
        'विषय-वार मूल अध्ययन नोट्स, प्रैक्टिकल प्रक्रियाएँ, महत्वपूर्ण व वाइवा प्रश्न, आरेख और डाउनलोड करने योग्य PDF स्टडी शीट।'
      ),
      to: '/pharmacy-education',
      cta: t.home.explorePortal,
    },
    {
      num: '04',
      icon: Package,
      title: loc('Healthcare Products Catalogue', 'हेल्थकेयर उत्पाद कैटलॉग'),
      desc: loc(
        'Informational reference guide for home monitoring devices, first aid kits, personal care essentials, and medical accessories with direct enquiry.',
        'घरेलू स्वास्थ्य उपकरणों, फर्स्ट एड किट और आवश्यक मेडिकल एक्सेसरीज़ की जानकारीपूर्ण सूची और सीधी पूछताछ सुविधा।'
      ),
      to: '/products',
      cta: t.home.viewAllProducts,
    },
  ];

  const leadArticle = publishedArticles[0];
  const secondaryArticles = publishedArticles.slice(1, 4);

  const latestUpdates = [
    ...publishedMedicines.slice(0, 2).map((m) => ({
      date: m.reviewDate,
      type: loc('Medicine Monograph Reviewed', 'दवा मोनोग्राफ समीक्षित'),
      title: loc(m.nameEn, m.nameHi),
      to: `/medicines/${m.slug}`,
    })),
    ...publishedArticles.slice(0, 2).map((a) => ({
      date: a.lastUpdatedDate,
      type: loc('Health Article Updated', 'स्वास्थ्य लेख अपडेट'),
      title: loc(a.titleEn, a.titleHi),
      to: `/health-awareness/${a.slug}`,
    })),
    ...publishedNotes.slice(0, 1).map((n) => ({
      date: '2026-11-15',
      type: loc('D.Pharm Study Sheet', 'D.Pharm स्टडी शीट'),
      title: loc(n.titleEn, n.titleHi),
      to: `/pharmacy-education?note=${n.slug}`,
    })),
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-white border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-medium tracking-wide text-[#15966A]">
                {t.hero.trustCaption}
              </p>
              <h1
                className="mt-4 font-bold tracking-tight text-[#102A43] leading-[1.12]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                {t.hero.heading}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#486581] leading-relaxed max-w-xl">
                {t.hero.subheading}
              </p>

              {/* Primary + Secondary CTAs (all 4 required hero buttons) */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <Link
                  to="/medicines"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors whitespace-nowrap"
                >
                  {t.hero.exploreMedicines}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/health-awareness"
                  className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] transition-colors whitespace-nowrap"
                >
                  {t.hero.exploreBlogs}
                </Link>
                <Link
                  to="/pharmacy-education"
                  className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43] bg-white hover:bg-[#F5F8FA] transition-colors whitespace-nowrap"
                >
                  {t.hero.pharmacyLearning}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-3 py-2.5 text-sm font-semibold text-[#15966A] hover:text-[#117A56] underline-offset-4 hover:underline whitespace-nowrap"
                >
                  {t.hero.contactUs}
                </Link>
              </div>

              <p className="mt-8 pt-6 border-t border-[#E6EDF3] text-xs text-[#627D98] leading-relaxed">
                {t.hero.medicalReviewNote}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[300px] lg:min-h-[420px] rounded-xl overflow-hidden border border-[#D9E2EC] bg-[#F5F8FA]">
                <SafeImage
                  src={BRAND_IMAGES.hero}
                  alt={loc(
                    "Modern clinical pharmacy consultation desk representing Ved's Medcare",
                    'वेद’स मेडकेयर का आधुनिक क्लिनिकल फार्मेसी परामर्श केंद्र'
                  )}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width factual platform overview strip below hero split */}
          <div className="mt-12 pt-8 border-t border-[#E6EDF3] grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-[#102A43] font-mono tabular-nums">
                {publishedMedicines.length}+
              </div>
              <div className="mt-1 text-xs text-[#486581]">
                {loc('Reviewed Medicine Monographs (EN & हिंदी)', 'समीक्षित दवा मोनोग्राफ (EN और हिंदी)')}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#102A43] font-mono tabular-nums">
                {BLOG_CATEGORIES.length}
              </div>
              <div className="mt-1 text-xs text-[#486581]">
                {loc('Preventive Health Awareness Categories', 'निवारक स्वास्थ्य जागरूकता श्रेणियाँ')}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#102A43] font-mono tabular-nums">
                {PHARMACY_SUBJECTS.length}
              </div>
              <div className="mt-1 text-xs text-[#486581]">
                {loc('D.Pharm Subjects & Practical Sections', 'D.Pharm विषय एवं प्रैक्टिकल अनुभाग')}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#102A43] font-mono tabular-nums">
                2
              </div>
              <div className="mt-1 text-xs text-[#486581]">
                {loc('Full Native Languages (English & हिंदी)', 'पूर्ण द्विभाषी समर्थन (अंग्रेज़ी और हिंदी)')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A. WELCOME TO VED'S MEDCARE */}
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
              {t.home.welcomeTitle}
            </h2>
            <p className="mt-3 text-sm font-medium text-[#15966A]">
              {t.home.founderLine}
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg font-medium text-[#102A43] leading-relaxed">
              {t.home.welcomeLead}
            </p>
            <p className="mt-4 text-sm sm:text-base text-[#486581] leading-relaxed">
              {t.home.welcomeBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-semibold">
              <Link to="/about" className="text-[#102A43] hover:text-[#15966A] inline-flex items-center gap-1.5">
                {t.nav.about} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/medical-disclaimer" className="text-[#486581] hover:text-[#102A43]">
                {t.footer.medicalDisclaimer}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B. OUR SERVICES */}
      <section className="bg-white border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-sm sm:text-base text-[#486581] leading-relaxed">
              {t.home.servicesSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.num}
                  className="p-6 sm:p-8 bg-white border border-[#D9E2EC] rounded-xl flex flex-col justify-between hover:border-[#15966A]/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-[#627D98] tabular-nums">
                        {srv.num}.
                      </span>
                      <Icon className="w-5 h-5 text-[#15966A]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#102A43]">{srv.title}</h3>
                    <p className="mt-2.5 text-sm text-[#486581] leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E6EDF3]">
                    <Link
                      to={srv.to}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15966A] hover:text-[#117A56]"
                    >
                      {srv.cta}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* C. MEDICINE INFORMATION */}
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                {t.home.medicineSectionTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#486581] leading-relaxed">
                {t.home.medicineSectionSubtitle}
              </p>
            </div>

            <form
              onSubmit={handleQuickMedSearch}
              className="w-full lg:w-[420px] flex items-center bg-white border border-[#D9E2EC] rounded-lg p-1.5 focus-within:border-[#15966A]"
            >
              <Search className="w-4 h-4 text-[#627D98] ml-2.5 shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={quickMedQuery}
                onChange={(e) => setQuickMedQuery(e.target.value)}
                placeholder={loc('e.g., Paracetamol, Metformin, Dolo...', 'जैसे पैरासिटामोल, मेटफॉर्मिन, Dolo...')}
                aria-label={t.home.medicineSearchCta}
                className="w-full px-3 py-1.5 text-sm text-[#102A43] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-[#102A43] text-white rounded-md hover:bg-[#1D3B58] transition-colors whitespace-nowrap shrink-0"
              >
                {t.home.medicineSearchCta}
              </button>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {publishedMedicines.slice(0, 4).map((med) => (
              <Link
                key={med.id}
                to={`/medicines/${med.slug}`}
                className="group p-6 bg-white border border-[#D9E2EC] rounded-xl hover:border-[#15966A] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#15966A] font-medium">
                    {med.therapeuticCategory}
                  </div>
                  <h3 className="mt-2 text-base font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                    {loc(med.nameEn, med.nameHi)}
                  </h3>
                  <p className="mt-1 text-xs text-[#627D98] font-mono">
                    {med.genericName}
                  </p>
                  <p className="mt-3 text-xs text-[#486581] line-clamp-3 leading-relaxed">
                    {loc(med.usesEn, med.usesHi)}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6EDF3] flex items-center justify-between text-xs text-[#627D98]">
                  <span className="font-mono tabular-nums">{med.reviewDate}</span>
                  <span className="font-semibold text-[#102A43] group-hover:text-[#15966A]">
                    {loc('Read Monograph →', 'विवरण पढ़ें →')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#D9E2EC]">
            <p className="text-xs text-[#486581] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#15966A] shrink-0" aria-hidden="true" />
              <span>
                {loc(
                  'Educational monographs only — no individualized prescriptions or dosage recommendations.',
                  'केवल शैक्षिक जानकारी — कोई व्यक्तिगत प्रिस्क्रिप्शन या खुराक सुझाव नहीं।'
                )}
              </span>
            </p>
            <Link
              to="/medicines"
              className="text-sm font-semibold text-[#102A43] hover:text-[#15966A] whitespace-nowrap"
            >
              {t.home.viewAllMedicines} →
            </Link>
          </div>
        </div>
      </section>

      {/* D. HEALTH AWARENESS & F. FEATURED HEALTH ARTICLES */}
      <section className="bg-white border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                {t.home.healthSectionTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#486581] leading-relaxed">
                {t.home.healthSectionSubtitle}
              </p>
            </div>
            <Link
              to="/health-awareness"
              className="text-sm font-semibold text-[#15966A] hover:text-[#117A56] whitespace-nowrap"
            >
              {t.home.viewAllArticles} →
            </Link>
          </div>

          {/* Interactive category filter links across all 10 Health Awareness topics */}
          <div className="mt-7 flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.nameEn}
                to={`/health-awareness?category=${encodeURIComponent(cat.nameEn)}`}
                className="px-3.5 py-2 text-xs font-medium text-[#334E68] bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg hover:border-[#15966A] hover:text-[#102A43] transition-colors whitespace-nowrap"
              >
                {loc(cat.nameEn, cat.nameHi)}
              </Link>
            ))}
          </div>

          {/* Featured Health Articles (3-tier Editorial Hierarchy) */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-[#102A43] mb-6">
              {t.home.featuredArticlesTitle}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {leadArticle && (
                <Link
                  to={`/health-awareness/${leadArticle.slug}`}
                  className="lg:col-span-7 group bg-white border border-[#D9E2EC] rounded-xl overflow-hidden hover:border-[#15966A] transition-colors flex flex-col"
                >
                  <div className="aspect-[16/10] bg-[#F5F8FA] overflow-hidden">
                    <SafeImage
                      src={leadArticle.featuredImage}
                      alt={loc(leadArticle.titleEn, leadArticle.titleHi)}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#486581] flex items-center gap-2">
                        <span className="font-semibold text-[#15966A]">{leadArticle.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{leadArticle.publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {leadArticle.readMinutes} {t.blog.minRead}
                        </span>
                      </div>
                      <h4 className="mt-3 text-xl sm:text-2xl font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                        {loc(leadArticle.titleEn, leadArticle.titleHi)}
                      </h4>
                      <p className="mt-3 text-sm text-[#486581] leading-relaxed">
                        {loc(leadArticle.summaryEn, leadArticle.summaryHi)}
                      </p>
                    </div>
                    <div className="mt-6 text-sm font-semibold text-[#102A43] group-hover:text-[#15966A] inline-flex items-center gap-1.5">
                      {t.blog.readArticle} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              )}

              <div className="lg:col-span-5 flex flex-col divide-y divide-[#D9E2EC] border border-[#D9E2EC] rounded-xl bg-white">
                {secondaryArticles.map((art) => (
                  <Link
                    key={art.id}
                    to={`/health-awareness/${art.slug}`}
                    className="group p-6 hover:bg-[#F5F8FA] transition-colors flex-1 flex flex-col justify-center"
                  >
                    <div className="text-xs text-[#486581] flex items-center gap-2">
                      <span className="font-semibold text-[#15966A]">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{art.publishedDate}</span>
                    </div>
                    <h4 className="mt-2 text-base font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                      {loc(art.titleEn, art.titleHi)}
                    </h4>
                    <p className="mt-1.5 text-xs text-[#486581] line-clamp-2 leading-relaxed">
                      {loc(art.summaryEn, art.summaryHi)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. PHARMACY EDUCATION (D.PHARM) */}
      <section className="bg-[#102A43] text-white border-b border-[#1D3B58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold text-[#5FE3B4]">
              {loc('D.Pharm & Pharmacy Learning Portal', 'D.Pharm एवं फार्मेसी अध्ययन पोर्टल')}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
              {t.home.pharmacySectionTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#BCCCDC] leading-relaxed">
              {t.home.pharmacySectionSubtitle}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#D9E2EC]">
              {PHARMACY_SUBJECTS.slice(0, 8).map((sub) => (
                <Link
                  key={sub.nameEn}
                  to={`/pharmacy-education?subject=${encodeURIComponent(sub.nameEn)}`}
                  className="hover:text-[#5FE3B4] transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#5FE3B4] shrink-0" aria-hidden="true" />
                  <span className="truncate">{loc(sub.nameEn, sub.nameHi)}</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/pharmacy-education"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors"
              >
                {t.home.explorePortal}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/pharmacy-education?subject=PDF%20Resources"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg border border-[#334E68] text-white hover:bg-[#1D3B58] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#5FE3B4]" aria-hidden="true" />
                {loc('PDF Study Sheets', 'PDF स्टडी शीट्स')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-[#1D3B58]">
              <SafeImage
                src={BRAND_IMAGES.pharmacyLab}
                alt={loc(
                  'Pharmaceutics university laboratory bench for D.Pharm practical learning',
                  'D.Pharm प्रैक्टिकल अध्ययन के लिए फार्मास्यूटिक्स प्रयोगशाला'
                )}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* G. HEALTHCARE PRODUCTS CATALOGUE */}
      <section className="bg-white border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                {t.home.productsSectionTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#486581] leading-relaxed">
                {t.home.productsSectionSubtitle}
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-[#15966A] hover:text-[#117A56] whitespace-nowrap"
            >
              {t.home.viewAllProducts} →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProducts.slice(0, 3).map((prod) => (
              <Link
                key={prod.id}
                to={`/products/${prod.slug}`}
                className="group bg-white border border-[#D9E2EC] rounded-xl overflow-hidden hover:border-[#15966A] transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#F5F8FA] overflow-hidden">
                  <SafeImage
                    src={prod.image}
                    alt={loc(prod.nameEn, prod.nameHi)}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#15966A]">{prod.category}</div>
                    <h3 className="mt-2 text-base font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                      {loc(prod.nameEn, prod.nameHi)}
                    </h3>
                    <p className="mt-2 text-xs text-[#486581] line-clamp-2 leading-relaxed">
                      {loc(prod.descriptionEn, prod.descriptionHi)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#E6EDF3] text-xs font-semibold text-[#102A43] group-hover:text-[#15966A]">
                    {t.products.viewDetails} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* H. LATEST UPDATES & I. INSTAGRAM FOLLOW SECTION */}
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* H. Latest Updates */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[#102A43]">{t.home.updatesTitle}</h2>
            <p className="mt-2 text-sm text-[#486581]">{t.home.updatesSubtitle}</p>

            <div className="mt-6 bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {latestUpdates.map((upd, i) => (
                <Link
                  key={`${upd.to}-${i}`}
                  to={upd.to}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F5F8FA] transition-colors"
                >
                  <div>
                    <div className="text-xs text-[#15966A] font-medium">{upd.type}</div>
                    <div className="mt-0.5 text-sm font-semibold text-[#102A43]">{upd.title}</div>
                  </div>
                  <span className="text-xs font-mono text-[#627D98] tabular-nums shrink-0">
                    {upd.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* I. Official Instagram Follow Section (Zero fabricated posts or fake follower counts) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#D9E2EC] rounded-xl p-8">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#102A43] text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className="mt-5 text-xs font-mono font-medium text-[#15966A]">
                {siteSettings.instagramHandle}
              </p>
              <h2 className="mt-1.5 text-2xl font-bold text-[#102A43]">
                {t.home.instagramTitle}
              </h2>
              <p className="mt-3 text-sm text-[#486581] leading-relaxed">
                {t.home.instagramBody}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E6EDF3] flex flex-wrap items-center gap-3">
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] transition-colors"
              >
                {t.home.followInstagram}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <span className="text-xs text-[#627D98] font-mono">
                instagram.com/vedsmedcare
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* J. CONTACT BANNER BEFORE FOOTER */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#102A43]">{t.home.contactBannerTitle}</h2>
            <p className="mt-2 text-sm text-[#486581] leading-relaxed">
              {t.home.contactBannerBody}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-3 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] transition-colors whitespace-nowrap"
            >
              {t.home.contactBannerCta}
            </Link>
            <a
              href={formatWhatsAppUrl(siteSettings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors whitespace-nowrap"
            >
              WhatsApp · {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      {/* K. REVIEWS & TESTIMONIALS CAROUSEL (JUST ABOVE FOOTER) */}
      <TestimonialsCarousel />
    </div>
  );
}
