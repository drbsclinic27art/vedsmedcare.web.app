import React, { useMemo, useState } from 'react';
import { ArrowRight, Info, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PRODUCT_CATEGORIES } from '../data/seedData';
import { filterProducts } from '../utils/medcareLogic';
import { Link, usePageSeo } from '../utils/router';
import { SafeImage } from '../components/SafeImage';

export function ProductsPage() {
  const { t, loc } = useLanguage();
  const { products } = useData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  usePageSeo(`${t.products.pageTitle} — Ved's Medcare`, t.products.pageSubtitle);

  const published = useMemo(() => products.filter((p) => p.published), [products]);
  const filtered = useMemo(
    () => filterProducts(published, { query, category }),
    [published, query, category]
  );

  return (
    <div className="bg-white">
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43]">{t.products.pageTitle}</h1>
          <p className="mt-3 text-sm sm:text-base text-[#486581] max-w-3xl leading-relaxed">
            {t.products.pageSubtitle}
          </p>

          {/* Informational Catalogue Compliance Notice */}
          <div className="mt-6 p-4 bg-white border border-[#D9E2EC] rounded-xl flex items-start gap-3 max-w-4xl">
            <Info className="w-4 h-4 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-[#334E68] leading-relaxed">
              {t.products.catalogueNotice}
            </p>
          </div>

          <div className="mt-6 max-w-lg relative">
            <Search
              className="w-4 h-4 text-[#627D98] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={loc('Search products by name or category...', 'उत्पाद का नाम या श्रेणी खोजें...')}
              aria-label={loc('Search products', 'उत्पाद खोजें')}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
            />
          </div>

          {/* All 5 Product Category Filters */}
          <div
            role="group"
            aria-label="Product categories"
            className="mt-5 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                category === 'all'
                  ? 'bg-[#102A43] text-white'
                  : 'bg-white text-[#334E68] border border-[#D9E2EC] hover:border-[#15966A]'
              }`}
            >
              {t.products.allCategories}
            </button>
            {PRODUCT_CATEGORIES.map((cat) => {
              const active = category.toLowerCase() === cat.nameEn.toLowerCase();
              return (
                <button
                  key={cat.nameEn}
                  type="button"
                  onClick={() => setCategory(cat.nameEn)}
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
          <div className="py-16 text-center text-sm text-[#486581]">
            {loc('No healthcare products match your filter.', 'फ़िल्टर के अनुसार कोई उत्पाद नहीं मिला।')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((prod) => (
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
                    <div className="text-xs font-semibold text-[#15966A]">{prod.category}</div>
                    <h2 className="mt-2 text-lg font-bold text-[#102A43] group-hover:text-[#15966A] transition-colors">
                      {loc(prod.nameEn, prod.nameHi)}
                    </h2>
                    <p className="mt-2 text-sm text-[#486581] line-clamp-3 leading-relaxed">
                      {loc(prod.descriptionEn, prod.descriptionHi)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#E6EDF3] text-xs font-semibold text-[#102A43] group-hover:text-[#15966A] inline-flex items-center gap-1.5">
                    {t.products.viewDetails} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
