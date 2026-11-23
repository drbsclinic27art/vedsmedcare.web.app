import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { globalSearch } from '../utils/medcareLogic';
import { navigate } from '../utils/router';

interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
  const { lang, t, loc } = useLanguage();
  const { medicines, articles, pharmacyNotes, products } = useData();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    return globalSearch(
      query,
      {
        medicines: medicines.filter((m) => m.published),
        articles: articles.filter((a) => a.published),
        notes: pharmacyNotes.filter((n) => n.published),
        products: products.filter((p) => p.published),
      },
      lang
    );
  }, [query, medicines, articles, pharmacyNotes, products, lang]);

  if (!open) return null;

  const typeLabel = (type: string) => {
    if (type === 'medicine') return loc('Medicine', 'दवा');
    if (type === 'article') return loc('Health Blog', 'स्वास्थ्य लेख');
    if (type === 'pharmacy') return loc('Pharmacy Note', 'फार्मेसी नोट');
    return loc('Product', 'उत्पाद');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.searchLabel}
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#102A43]/60 backdrop-blur-xs p-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl border border-[#D9E2EC] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#D9E2EC]">
          <Search className="w-5 h-5 text-[#486581] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            aria-label={t.nav.searchPlaceholder}
            className="w-full text-sm sm:text-base text-[#102A43] placeholder:text-[#627D98] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-[#486581] hover:text-[#102A43] hover:bg-[#F5F8FA]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#E6EDF3]">
          {query.trim().length === 0 ? (
            <div className="p-6 text-sm text-[#486581]">
              <p className="font-medium text-[#102A43] mb-3">
                {loc('Popular searches', 'लोकप्रिय खोजें')}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Paracetamol', 'Metformin', 'Blood Pressure', 'Pharmaceutics', 'BP Monitor', 'ORS'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs font-medium text-[#102A43] bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg hover:border-[#15966A] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#486581]">
              {loc(
                `No results found for "${query}". Try searching by generic name, brand name, or subject.`,
                `"${query}" के लिए कोई परिणाम नहीं मिला। कृपया जेनेरिक नाम, ब्रांड या विषय से खोजें।`
              )}
            </div>
          ) : (
            results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                type="button"
                onClick={() => {
                  onClose();
                  navigate(item.path);
                }}
                className="w-full text-left px-5 py-4 hover:bg-[#F5F8FA] transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-xs text-[#15966A] font-medium">
                    {typeLabel(item.type)} <span aria-hidden="true">·</span>{' '}
                    <span className="text-[#486581]">{item.category}</span>
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-[#102A43] truncate">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-[#486581] truncate">{item.subtitle}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#627D98] shrink-0" aria-hidden="true" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
