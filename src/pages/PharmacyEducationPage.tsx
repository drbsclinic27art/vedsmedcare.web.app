import React, { useMemo, useState } from 'react';
import { BookOpen, Download, FlaskConical, Search, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PHARMACY_SUBJECTS } from '../data/seedData';
import type { PharmacyLanguageLabel } from '../types/medcare';
import { filterPharmacyNotes } from '../utils/medcareLogic';
import { usePageSeo, useRoute } from '../utils/router';
import { PharmacyDiagram } from '../components/PharmacyDiagram';

export function PharmacyEducationPage() {
  const { t, loc } = useLanguage();
  const { pharmacyNotes } = useData();
  const { queryParams } = useRoute();

  const initialSubject = queryParams.get('subject') || 'all';
  const initialNoteSlug = queryParams.get('note') || '';

  const [query, setQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [languageFilter, setLanguageFilter] = useState<PharmacyLanguageLabel | 'all'>('all');
  const [activeNoteSlug, setActiveNoteSlug] = useState(initialNoteSlug);
  const [activeTab, setActiveTab] = useState<'short' | 'detailed' | 'definitions' | 'practical'>('short');

  usePageSeo(`${t.pharmacy.pageTitle} — Ved's Medcare`, t.pharmacy.pageSubtitle);

  const published = useMemo(
    () => pharmacyNotes.filter((n) => n.published),
    [pharmacyNotes]
  );

  const filtered = useMemo(
    () =>
      filterPharmacyNotes(published, {
        query,
        subject: selectedSubject,
        languageLabel: languageFilter,
      }),
    [published, query, selectedSubject, languageFilter]
  );

  const activeNote = useMemo(() => {
    if (activeNoteSlug) {
      const match = filtered.find((n) => n.slug === activeNoteSlug) || published.find((n) => n.slug === activeNoteSlug);
      if (match) return match;
    }
    return filtered[0] || published[0] || null;
  }, [activeNoteSlug, filtered, published]);

  return (
    <div className="bg-white">
      {/* Header Band */}
      <section className="bg-[#102A43] text-white border-b border-[#1D3B58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="text-xs font-semibold text-[#5FE3B4]">
            {loc('D.Pharm & Pharmacy Students Study Hub', 'D.Pharm और फार्मेसी छात्रों का अध्ययन पोर्टल')}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            {t.pharmacy.pageTitle}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#BCCCDC] max-w-3xl leading-relaxed">
            {t.pharmacy.pageSubtitle}
          </p>

          {/* Search & Language-Label Filter */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-3 max-w-4xl">
            <div className="md:col-span-8 relative">
              <Search
                className="w-4 h-4 text-[#9FB3C8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.pharmacy.searchPlaceholder}
                aria-label={t.pharmacy.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0A1D2F] border border-[#334E68] rounded-lg text-white placeholder:text-[#9FB3C8] focus:border-[#5FE3B4] focus:outline-none"
              />
            </div>
            <div className="md:col-span-4">
              <label htmlFor="pharmacy-lang-filter" className="sr-only">
                {t.pharmacy.allLanguages}
              </label>
              <select
                id="pharmacy-lang-filter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value as PharmacyLanguageLabel | 'all')}
                className="w-full px-3.5 py-2.5 text-sm bg-[#0A1D2F] border border-[#334E68] rounded-lg text-white focus:border-[#5FE3B4] focus:outline-none"
              >
                <option value="all">{t.pharmacy.allLanguages}</option>
                <option value="Bilingual (EN + हिंदी)">Bilingual (EN + हिंदी)</option>
                <option value="English">English</option>
                <option value="हिंदी">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Subject-Wise Study Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: All 13 D.Pharm Subjects & Sections */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl p-4">
            <h2 className="text-xs font-bold text-[#102A43] px-2 pb-3 border-b border-[#D9E2EC]">
              {loc('Subjects & Study Sections (13)', 'विषय एवं अध्ययन अनुभाग (13)')}
            </h2>
            <div className="mt-2 flex flex-col gap-1 max-h-[420px] overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject('all');
                  setActiveNoteSlug('');
                }}
                aria-pressed={selectedSubject === 'all'}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedSubject === 'all'
                    ? 'bg-[#102A43] text-white'
                    : 'text-[#334E68] hover:bg-white'
                }`}
              >
                {t.pharmacy.allSubjects} ({published.length})
              </button>
              {PHARMACY_SUBJECTS.map((sub) => {
                const active = selectedSubject.toLowerCase() === sub.nameEn.toLowerCase();
                return (
                  <button
                    key={sub.nameEn}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(sub.nameEn);
                      setActiveNoteSlug('');
                    }}
                    aria-pressed={active}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-[#15966A] text-white font-semibold'
                        : 'text-[#334E68] hover:bg-white hover:text-[#102A43]'
                    }`}
                  >
                    <span className="truncate">{loc(sub.nameEn, sub.nameHi)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Topics List */}
          <div className="bg-white border border-[#D9E2EC] rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-[#F5F8FA] border-b border-[#D9E2EC] text-xs font-bold text-[#102A43]">
              {loc('Available Study Modules', 'उपलब्ध अध्ययन मॉड्यूल')} ({filtered.length})
            </div>
            {filtered.length === 0 ? (
              <div className="p-6 text-xs text-[#486581]">
                {loc('No study modules match your filter.', 'फ़िल्टर के अनुसार कोई अध्ययन नोट नहीं मिला।')}
              </div>
            ) : (
              <div className="divide-y divide-[#E6EDF3] max-h-[380px] overflow-y-auto">
                {filtered.map((note) => {
                  const selected = activeNote?.id === note.id;
                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setActiveNoteSlug(note.slug)}
                      className={`w-full text-left p-4 transition-colors ${
                        selected ? 'bg-[#EDF8F4]' : 'hover:bg-[#F5F8FA]'
                      }`}
                    >
                      <div className="text-[11px] text-[#15966A] font-medium">
                        {note.subject} <span aria-hidden="true">·</span>{' '}
                        <span className="text-[#486581]">{note.languageLabel}</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#102A43]">
                        {loc(note.titleEn, note.titleHi)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right Main Reader Canvas */}
        <div className="lg:col-span-8">
          {activeNote ? (
            <div className="bg-white border border-[#D9E2EC] rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6EDF3]">
                <div>
                  <div className="text-xs text-[#486581] flex items-center gap-2">
                    <span className="font-semibold text-[#15966A]">{activeNote.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeNote.languageLabel}</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
                    {loc(activeNote.titleEn, activeNote.titleHi)}
                  </h2>
                </div>

                {activeNote.pdfUrl && (
                  <a
                    href={activeNote.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    {t.pharmacy.downloadPdf}
                  </a>
                )}
              </div>

              {/* Study View Tabs */}
              <div
                role="tablist"
                aria-label="Study note sections"
                className="mt-6 flex flex-wrap gap-1 p-1 bg-[#F5F8FA] rounded-lg border border-[#D9E2EC]"
              >
                {[
                  { key: 'short' as const, label: t.pharmacy.shortNotes },
                  { key: 'detailed' as const, label: t.pharmacy.detailedNotes },
                  { key: 'definitions' as const, label: t.pharmacy.definitions },
                  { key: 'practical' as const, label: t.pharmacy.practicalProcedure },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-[#102A43] text-white'
                        : 'text-[#486581] hover:text-[#102A43]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'short' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
                      {t.pharmacy.shortNotes}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334E68] leading-relaxed whitespace-pre-line">
                      {loc(activeNote.shortNotesEn, activeNote.shortNotesHi)}
                    </p>
                  </div>
                )}

                {activeTab === 'detailed' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#102A43]">{t.pharmacy.detailedNotes}</h3>
                    <div className="text-sm sm:text-base text-[#334E68] leading-relaxed whitespace-pre-line">
                      {loc(activeNote.detailedNotesEn, activeNote.detailedNotesHi)}
                    </div>
                  </div>
                )}

                {activeTab === 'definitions' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#102A43]">{t.pharmacy.definitions}</h3>
                    <p className="text-sm sm:text-base text-[#334E68] leading-relaxed whitespace-pre-line">
                      {loc(activeNote.definitionsEn, activeNote.definitionsHi)}
                    </p>
                  </div>
                )}

                {activeTab === 'practical' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
                      {t.pharmacy.practicalProcedure}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334E68] leading-relaxed whitespace-pre-line">
                      {loc(activeNote.practicalProcedureEn, activeNote.practicalProcedureHi)}
                    </p>
                  </div>
                )}
              </div>

              {/* Schematic Educational Diagram */}
              {activeNote.diagramKey && (
                <div className="mt-8 pt-6 border-t border-[#E6EDF3]">
                  <h3 className="text-sm font-bold text-[#102A43] mb-3">
                    {t.pharmacy.diagramLabel}
                  </h3>
                  <PharmacyDiagram
                    diagramKey={activeNote.diagramKey}
                    caption={loc(activeNote.titleEn, activeNote.titleHi)}
                  />
                </div>
              )}

              {/* Original Material Notice */}
              <div className="mt-8 p-4 bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg flex items-start gap-2.5 text-xs text-[#486581]">
                <ShieldCheck className="w-4 h-4 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{t.pharmacy.copyrightNotice}</span>
              </div>
            </div>
          ) : (
            <div className="p-12 border border-[#D9E2EC] rounded-xl text-center text-sm text-[#486581]">
              {loc('Select a subject to start studying.', 'अध्ययन शुरू करने के लिए विषय चुनें।')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
