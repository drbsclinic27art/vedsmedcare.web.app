import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { filterMedicines } from '../utils/medcareLogic';
import { Link, usePageSeo, useRoute } from '../utils/router';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export function MedicineLibraryPage() {
  const { t, loc } = useLanguage();
  const { medicines } = useData();
  const { queryParams } = useRoute();

  const [query, setQuery] = useState(() => queryParams.get('q') || '');
  const [drugCategory, setDrugCategory] = useState('all');
  const [therapeuticCategory, setTherapeuticCategory] = useState('all');
  const [letter, setLetter] = useState('ALL');

  usePageSeo(
    `${t.medicines.pageTitle} — Ved's Medcare`,
    t.medicines.pageSubtitle
  );

  const publishedMedicines = useMemo(
    () => medicines.filter((m) => m.published),
    [medicines]
  );

  const drugCategories = useMemo(
    () => Array.from(new Set(publishedMedicines.map((m) => m.drugCategory))).sort(),
    [publishedMedicines]
  );

  const therapeuticCategories = useMemo(
    () => Array.from(new Set(publishedMedicines.map((m) => m.therapeuticCategory))).sort(),
    [publishedMedicines]
  );

  const filtered = useMemo(
    () =>
      filterMedicines(publishedMedicines, {
        query,
        drugCategory,
        therapeuticCategory,
        letter,
      }),
    [publishedMedicines, query, drugCategory, therapeuticCategory, letter]
  );

  const resetFilters = () => {
    setQuery('');
    setDrugCategory('all');
    setTherapeuticCategory('all');
    setLetter('ALL');
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43]">
            {t.medicines.pageTitle}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#486581] max-w-3xl leading-relaxed">
            {t.medicines.pageSubtitle}
          </p>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search
                className="w-4 h-4 text-[#627D98] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.medicines.searchPlaceholder}
                aria-label={t.medicines.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="drug-category-filter" className="sr-only">
                {t.medicines.allDrugCategories}
              </label>
              <select
                id="drug-category-filter"
                value={drugCategory}
                onChange={(e) => setDrugCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
              >
                <option value="all">{t.medicines.allDrugCategories}</option>
                {drugCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="therapeutic-category-filter" className="sr-only">
                {t.medicines.allTherapeutic}
              </label>
              <select
                id="therapeutic-category-filter"
                value={therapeuticCategory}
                onChange={(e) => setTherapeuticCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
              >
                <option value="all">{t.medicines.allTherapeutic}</option>
                {therapeuticCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* A–Z Index Filter Bar */}
          <div
            role="group"
            aria-label="Filter medicines alphabetically A to Z"
            className="mt-5 flex flex-wrap items-center gap-1"
          >
            {ALPHABET.map((ch) => {
              const active = letter === ch;
              return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setLetter(ch)}
                  aria-pressed={active}
                  className={`min-w-[32px] h-8 px-2 text-xs font-semibold rounded-md transition-colors ${
                    active
                      ? 'bg-[#102A43] text-white'
                      : 'bg-white text-[#486581] border border-[#D9E2EC] hover:border-[#15966A] hover:text-[#102A43]'
                  }`}
                >
                  {ch === 'ALL' ? t.medicines.allLetters : ch}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6EDF3]">
          <p className="text-sm text-[#486581]">
            <strong className="text-[#102A43] font-mono tabular-nums">{filtered.length}</strong>{' '}
            {t.medicines.resultsCount}
            {query.trim() && (
              <span>
                {' '}
                — &ldquo;<span className="text-[#102A43] font-medium">{query.trim()}</span>&rdquo;
              </span>
            )}
          </p>
          {(query || drugCategory !== 'all' || therapeuticCategory !== 'all' || letter !== 'ALL') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[#15966A] hover:underline"
            >
              {t.medicines.resetFilters}
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base font-medium text-[#102A43]">{t.medicines.noResults}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58]"
            >
              {t.medicines.resetFilters}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((med) => (
              <Link
                key={med.id}
                to={`/medicines/${med.slug}`}
                className="group p-6 bg-white border border-[#D9E2EC] rounded-xl hover:border-[#15966A] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#486581]">
                    <span className="font-semibold text-[#15966A]">{med.therapeuticCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span>{med.drugCategory}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                    {loc(med.nameEn, med.nameHi)}
                  </h2>
                  <p className="mt-1 text-xs text-[#627D98]">
                    {t.medicines.genericLabel}: <span className="font-mono text-[#334E68]">{med.genericName}</span>
                    <span aria-hidden="true"> · </span>
                    {t.medicines.brandsLabel}: {med.brandNames.join(', ')}
                  </p>
                  <p className="mt-3 text-sm text-[#486581] line-clamp-2 leading-relaxed">
                    {loc(med.usesEn, med.usesHi)}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E6EDF3] flex items-center justify-between text-xs text-[#627D98]">
                  <span className="font-mono tabular-nums">
                    {t.medicines.reviewedOn}: {med.reviewDate}
                  </span>
                  <span className="font-semibold text-[#102A43] group-hover:text-[#15966A] inline-flex items-center gap-1">
                    {loc('Full Monograph', 'पूर्ण विवरण')} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Medical Safety Box */}
        <div className="mt-12 p-6 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-[#486581] leading-relaxed">
            <strong className="text-[#102A43] font-semibold">{t.disclaimer.shortTitle}: </strong>
            {t.disclaimer.exactText}
          </div>
        </div>
      </section>
    </div>
  );
}
