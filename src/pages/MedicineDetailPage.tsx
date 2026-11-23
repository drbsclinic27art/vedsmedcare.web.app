import React from 'react';
import { ArrowLeft, BookMarked, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link, usePageSeo } from '../utils/router';

interface MedicineDetailPageProps {
  slug: string;
}

export function MedicineDetailPage({ slug }: MedicineDetailPageProps) {
  const { t, loc } = useLanguage();
  const { medicines } = useData();

  const med = medicines.find((m) => m.slug === slug && m.published);

  usePageSeo(
    med ? `${loc(med.nameEn, med.nameHi)} — Medicine Information | Ved's Medcare` : `Medicine Not Found — Ved's Medcare`,
    med ? loc(med.usesEn, med.usesHi).slice(0, 155) : t.medicines.pageSubtitle
  );

  if (!med) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#102A43]">
          {loc('Medicine monograph not found', 'दवा का विवरण नहीं मिला')}
        </h1>
        <p className="mt-3 text-sm text-[#486581]">
          {loc(
            'The requested medicine entry could not be found in our published library.',
            'अनुरोधित दवा हमारी प्रकाशित लाइब्रेरी में उपलब्ध नहीं है।'
          )}
        </p>
        <Link
          to="/medicines"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t.medicines.backToLibrary}
        </Link>
      </div>
    );
  }

  const sections = [
    { label: t.medicines.usesLabel, content: loc(med.usesEn, med.usesHi) },
    { label: t.medicines.mechanismLabel, content: loc(med.mechanismEn, med.mechanismHi) },
    { label: t.medicines.sideEffectsLabel, content: loc(med.sideEffectsEn, med.sideEffectsHi) },
    { label: t.medicines.precautionsLabel, content: loc(med.precautionsEn, med.precautionsHi) },
    { label: t.medicines.contraindicationsLabel, content: loc(med.contraindicationsEn, med.contraindicationsHi) },
    { label: t.medicines.storageLabel, content: loc(med.storageEn, med.storageHi) },
  ];

  return (
    <article className="bg-white">
      {/* Header Band */}
      <div className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/medicines"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15966A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {t.medicines.backToLibrary}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#486581]">
            <span className="font-semibold text-[#15966A]">{med.therapeuticCategory}</span>
            <span aria-hidden="true">·</span>
            <span>{med.drugCategory}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {t.medicines.reviewedOn}: {med.reviewDate}
            </span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#102A43]">
            {loc(med.nameEn, med.nameHi)}
          </h1>

          {/* Structured Clinical Metadata Definition List */}
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D9E2EC]">
            <div>
              <dt className="text-xs font-medium text-[#627D98]">{t.medicines.genericLabel}</dt>
              <dd className="mt-1 text-sm font-semibold text-[#102A43] font-mono">{med.genericName}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-[#627D98]">{t.medicines.brandsLabel}</dt>
              <dd className="mt-1 text-sm font-semibold text-[#102A43]">
                {med.brandNames.join(', ')}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-[#627D98]">{t.medicines.classificationLabel}</dt>
              <dd className="mt-1 text-sm font-medium text-[#102A43]">
                {loc(med.classificationEn, med.classificationHi)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Monograph Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {sections.map((sec) => (
            <section key={sec.label} className="pb-8 border-b border-[#E6EDF3] last:border-b-0">
              <h2 className="text-lg font-bold text-[#102A43]">{sec.label}</h2>
              <p className="mt-3 text-sm sm:text-base text-[#334E68] leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Right Reference Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl">
            <h2 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
              {t.medicines.referencesLabel}
            </h2>
            <p className="mt-3 text-xs text-[#486581] font-mono tabular-nums">
              {t.medicines.reviewedOn}: {med.reviewDate}
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-[#334E68] leading-relaxed list-disc pl-4">
              {med.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-white border border-[#D9E2EC] rounded-xl">
            <h2 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
              {t.disclaimer.shortTitle}
            </h2>
            <p className="mt-3 text-xs text-[#486581] leading-relaxed">
              {t.disclaimer.exactText}
            </p>
            <Link
              to="/medical-disclaimer"
              className="mt-4 inline-block text-xs font-semibold text-[#15966A] hover:underline"
            >
              {t.disclaimer.learnMore} →
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
