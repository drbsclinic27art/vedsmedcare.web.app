import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { filterApprovedReviews, getInitials } from '../utils/medcareLogic';

export function TestimonialsCarousel() {
  const { t, loc } = useLanguage();
  const { reviews } = useData();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const approvedReviews = filterApprovedReviews(reviews);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [approvedReviews.length, updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(400, Math.max(300, Math.round(el.clientWidth * 0.72)));
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  if (approvedReviews.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#F5F8FA] border-t border-[#D9E2EC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header Row with Title & Left/Right Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#15966A]">
              {t.home.testimonialsKicker}
            </p>
            <h2
              id="testimonials-heading"
              className="mt-2 text-2xl sm:text-3xl font-bold text-[#102A43]"
            >
              {t.home.testimonialsTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#486581] leading-relaxed">
              {t.home.testimonialsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label={t.home.testimonialsPrev}
              data-testid="testimonials-prev"
              className="w-11 h-11 rounded-full bg-[#102A43] text-white flex items-center justify-center hover:bg-[#15966A] transition-colors disabled:opacity-35 disabled:hover:bg-[#102A43] disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label={t.home.testimonialsNext}
              data-testid="testimonials-next"
              className="w-11 h-11 rounded-full bg-[#102A43] text-white flex items-center justify-center hover:bg-[#15966A] transition-colors disabled:opacity-35 disabled:hover:bg-[#102A43] disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Dark-Card Track */}
        <div
          ref={trackRef}
          data-testid="testimonials-track"
          tabIndex={0}
          aria-label={t.home.testimonialsTitle}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollByCard(1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollByCard(-1);
            }
          }}
          className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 focus:outline-none"
        >
          {approvedReviews.map((review) => {
            const initials = getInitials(review.reviewerName);
            const reviewText = loc(review.textEn, review.textHi || review.textEn);
            const reviewerRole = loc(review.roleEn, review.roleHi || review.roleEn);

            return (
              <article
                key={review.id}
                data-testid="testimonial-card"
                className="w-[300px] sm:w-[348px] lg:w-[376px] shrink-0 snap-start bg-[#102A43] border border-[#1E3A5F] hover:border-[#15966A]/70 rounded-xl p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* 5-Star Rating Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((starIndex) => {
                        const filled = starIndex <= review.rating;
                        return (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${
                              filled
                                ? 'text-[#F59E0B] fill-[#F59E0B]'
                                : 'text-[#334E68]'
                            }`}
                            aria-hidden="true"
                          />
                        );
                      })}
                      <span className="ml-1.5 text-xs font-mono font-semibold text-[#F8FAFC] tabular-nums">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    {review.createdDate && (
                      <span className="text-xs font-mono text-[#829AB1] tabular-nums">
                        {review.createdDate}
                      </span>
                    )}
                  </div>

                  {/* Review Quote */}
                  <p className="mt-5 text-sm sm:text-[15px] text-[#E6EDF5] leading-relaxed">
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Reviewer Avatar & Identity */}
                <div className="mt-6 pt-4 border-t border-[#1E3A5F] flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 select-none"
                    style={{ backgroundColor: review.avatarColor }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {review.reviewerName}
                    </div>
                    <div className="text-xs text-[#9FB3C8] truncate">
                      {reviewerRole}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
