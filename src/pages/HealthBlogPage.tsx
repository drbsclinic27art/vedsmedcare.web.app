import React, { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { BLOG_CATEGORIES } from '../data/seedData';
import { filterArticles } from '../utils/medcareLogic';
import { Link, usePageSeo, useRoute } from '../utils/router';
import { SafeImage } from '../components/SafeImage';

export function HealthBlogPage() {
  const { t, loc } = useLanguage();
  const { articles } = useData();
  const { queryParams } = useRoute();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    () => queryParams.get('category') || 'all'
  );

  usePageSeo(`${t.blog.pageTitle} — Ved's Medcare`, t.blog.pageSubtitle);

  const published = useMemo(() => articles.filter((a) => a.published), [articles]);
  const filtered = useMemo(
    () => filterArticles(published, { query, category: selectedCategory }),
    [published, query, selectedCategory]
  );

  return (
    <div className="bg-white">
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43]">{t.blog.pageTitle}</h1>
          <p className="mt-3 text-sm sm:text-base text-[#486581] max-w-3xl leading-relaxed">
            {t.blog.pageSubtitle}
          </p>

          <div className="mt-8 max-w-xl relative">
            <Search
              className="w-4 h-4 text-[#627D98] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              aria-label={t.blog.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
            />
          </div>

          {/* All 10 Blog Category Interactive Filters */}
          <div
            role="group"
            aria-label="Health blog categories"
            className="mt-6 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#102A43] text-white'
                  : 'bg-white text-[#334E68] border border-[#D9E2EC] hover:border-[#15966A]'
              }`}
            >
              {t.blog.allCategories}
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.nameEn.toLowerCase();
              return (
                <button
                  key={cat.nameEn}
                  type="button"
                  onClick={() => setSelectedCategory(cat.nameEn)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#102A43] text-white'
                      : 'bg-white text-[#334E68] border border-[#D9E2EC] hover:border-[#15966A]'
                  }`}
                >
                  {loc(cat.nameEn, cat.nameHi)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base font-medium text-[#102A43]">
              {loc(
                'No health articles published under this filter yet.',
                'इस श्रेणी में अभी कोई लेख उपलब्ध नहीं है।'
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
            >
              {t.blog.allCategories}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((art) => (
              <Link
                key={art.id}
                to={`/health-awareness/${art.slug}`}
                className="group bg-white border border-[#D9E2EC] rounded-xl overflow-hidden hover:border-[#15966A] transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#F5F8FA] overflow-hidden">
                  <SafeImage
                    src={art.featuredImage}
                    alt={loc(art.titleEn, art.titleHi)}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#486581] flex items-center gap-2">
                      <span className="font-semibold text-[#15966A]">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{art.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {art.readMinutes} {t.blog.minRead}
                      </span>
                    </div>
                    <h2 className="mt-2.5 text-lg font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                      {loc(art.titleEn, art.titleHi)}
                    </h2>
                    <p className="mt-2 text-sm text-[#486581] line-clamp-3 leading-relaxed">
                      {loc(art.summaryEn, art.summaryHi)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#E6EDF3] flex items-center justify-between text-xs font-semibold text-[#102A43] group-hover:text-[#15966A]">
                    <span>{art.author}</span>
                    <span className="inline-flex items-center gap-1">
                      {t.blog.readArticle} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
