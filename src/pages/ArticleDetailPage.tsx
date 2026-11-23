import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { getRelatedArticles } from '../utils/medcareLogic';
import { Link, usePageSeo } from '../utils/router';
import { SafeImage } from '../components/SafeImage';

interface ArticleDetailPageProps {
  slug: string;
}

export function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  const { t, loc } = useLanguage();
  const { articles } = useData();
  const [copied, setCopied] = useState(false);

  const article = articles.find((a) => a.slug === slug && a.published);

  usePageSeo(
    article ? `${loc(article.titleEn, article.titleHi)} — Ved's Medcare` : `Article Not Found — Ved's Medcare`,
    article ? loc(article.summaryEn, article.summaryHi) : t.blog.pageSubtitle
  );

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#102A43]">
          {loc('Health article not found', 'स्वास्थ्य लेख नहीं मिला')}
        </h1>
        <Link
          to="/health-awareness"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t.blog.backToBlog}
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(article, articles, 3);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${loc(article.titleEn, article.titleHi)} — Ved's Medcare`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <article className="bg-white">
      {/* Header */}
      <div className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/health-awareness"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15966A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {t.blog.backToBlog}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#486581]">
            <span className="font-semibold text-[#15966A]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>
              {article.readMinutes} {t.blog.minRead}
            </span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#102A43] leading-tight">
            {loc(article.titleEn, article.titleHi)}
          </h1>

          <p className="mt-4 text-base text-[#486581] leading-relaxed">
            {loc(article.summaryEn, article.summaryHi)}
          </p>

          <div className="mt-6 pt-5 border-t border-[#D9E2EC] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#486581]">
            <span>
              {t.blog.authorLabel}: <strong className="text-[#102A43]">{article.author}</strong>
            </span>
            <span className="font-mono tabular-nums">
              {t.blog.publishedLabel}: {article.publishedDate}
            </span>
            <span className="font-mono tabular-nums">
              {t.blog.updatedLabel}: {article.lastUpdatedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#D9E2EC] bg-[#F5F8FA]">
          <SafeImage
            src={article.featuredImage}
            alt={loc(article.titleEn, article.titleHi)}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-10 max-w-[70ch] mx-auto">
          <div className="text-base text-[#102A43] leading-[1.8] whitespace-pre-line space-y-5">
            {loc(article.contentEn, article.contentHi)}
          </div>

          {/* References */}
          <div className="mt-12 pt-8 border-t border-[#D9E2EC]">
            <h2 className="text-base font-bold text-[#102A43]">{t.blog.referencesLabel}</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#486581] list-disc pl-5">
              {article.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </div>

          {/* Social Share Bar */}
          <div className="mt-10 pt-6 border-t border-[#E6EDF3] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold text-[#102A43] inline-flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
              {t.blog.shareTitle}
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56]"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43] hover:bg-[#F5F8FA]"
              >
                Share on X
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43] hover:bg-[#F5F8FA]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#15966A]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.blog.copied : t.blog.copyLink}
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#D9E2EC]">
            <h2 className="text-xl font-bold text-[#102A43]">{t.blog.relatedArticles}</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/health-awareness/${rel.slug}`}
                  className="group p-5 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl hover:border-[#15966A] transition-colors"
                >
                  <div className="text-xs font-semibold text-[#15966A]">{rel.category}</div>
                  <h3 className="mt-2 text-sm font-bold text-[#102A43] group-hover:text-[#15966A]">
                    {loc(rel.titleEn, rel.titleHi)}
                  </h3>
                  <p className="mt-2 text-xs text-[#486581] line-clamp-2">
                    {loc(rel.summaryEn, rel.summaryHi)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
