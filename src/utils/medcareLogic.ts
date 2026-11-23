import type {
  Article,
  Language,
  Medicine,
  PharmacyLanguageLabel,
  PharmacyNote,
  Product,
  Review,
  SearchResultItem,
  ValidationResult,
} from '../types/medcare';

export function localize(lang: Language, en: string, hi: string): string {
  if (lang === 'hi' && hi && hi.trim().length > 0) {
    return hi;
  }
  return en;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

export interface MedicineFilterParams {
  query?: string;
  drugCategory?: string;
  therapeuticCategory?: string;
  letter?: string;
}

export function filterMedicines(
  medicines: Medicine[],
  params: MedicineFilterParams
): Medicine[] {
  const q = (params.query || '').trim().toLowerCase();
  const drugCat = (params.drugCategory || '').trim().toLowerCase();
  const therapeuticCat = (params.therapeuticCategory || '').trim().toLowerCase();
  const letter = (params.letter || '').trim().toUpperCase();

  return medicines
    .filter((med) => {
      if (drugCat && drugCat !== 'all' && med.drugCategory.toLowerCase() !== drugCat) {
        return false;
      }
      if (
        therapeuticCat &&
        therapeuticCat !== 'all' &&
        med.therapeuticCategory.toLowerCase() !== therapeuticCat
      ) {
        return false;
      }
      if (letter && letter !== 'ALL') {
        const firstChar = med.nameEn.trim().charAt(0).toUpperCase();
        if (firstChar !== letter) {
          return false;
        }
      }
      if (q) {
        const haystack = [
          med.nameEn,
          med.nameHi,
          med.genericName,
          med.drugCategory,
          med.therapeuticCategory,
          med.classificationEn,
          med.classificationHi,
          ...med.brandNames,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      }
      return true;
    })
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export function filterArticles(
  articles: Article[],
  params: { query?: string; category?: string }
): Article[] {
  const q = (params.query || '').trim().toLowerCase();
  const cat = (params.category || '').trim().toLowerCase();

  return articles.filter((art) => {
    if (cat && cat !== 'all' && art.category.toLowerCase() !== cat) {
      return false;
    }
    if (q) {
      const haystack = [
        art.titleEn,
        art.titleHi,
        art.summaryEn,
        art.summaryHi,
        art.category,
        art.author,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }
    return true;
  });
}

export function getRelatedArticles(
  current: Article,
  allArticles: Article[],
  limit = 3
): Article[] {
  const others = allArticles.filter((a) => a.id !== current.id && a.published);
  const sameCategory = others.filter((a) => a.category === current.category);
  const differentCategory = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...differentCategory].slice(0, limit);
}

export function filterPharmacyNotes(
  notes: PharmacyNote[],
  params: { query?: string; subject?: string; languageLabel?: PharmacyLanguageLabel | 'all' }
): PharmacyNote[] {
  const q = (params.query || '').trim().toLowerCase();
  const subject = (params.subject || '').trim().toLowerCase();
  const langLabel = params.languageLabel || 'all';

  return notes.filter((note) => {
    if (subject && subject !== 'all' && note.subject.toLowerCase() !== subject) {
      return false;
    }
    if (langLabel !== 'all' && note.languageLabel !== langLabel) {
      return false;
    }
    if (q) {
      const haystack = [
        note.titleEn,
        note.titleHi,
        note.subject,
        note.shortNotesEn,
        note.shortNotesHi,
        note.definitionsEn,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }
    return true;
  });
}

export function filterProducts(
  products: Product[],
  params: { query?: string; category?: string }
): Product[] {
  const q = (params.query || '').trim().toLowerCase();
  const cat = (params.category || '').trim().toLowerCase();

  return products.filter((prod) => {
    if (cat && cat !== 'all' && prod.category.toLowerCase() !== cat) {
      return false;
    }
    if (q) {
      const haystack = [
        prod.nameEn,
        prod.nameHi,
        prod.category,
        prod.descriptionEn,
        prod.descriptionHi,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }
    return true;
  });
}

export function globalSearch(
  query: string,
  data: {
    medicines: Medicine[];
    articles: Article[];
    notes: PharmacyNote[];
    products: Product[];
  },
  lang: Language
): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  for (const med of filterMedicines(data.medicines, { query: q }).slice(0, 6)) {
    results.push({
      id: med.id,
      type: 'medicine',
      slug: med.slug,
      title: localize(lang, med.nameEn, med.nameHi),
      subtitle: `${med.genericName} · ${med.brandNames.slice(0, 2).join(', ')}`,
      category: med.therapeuticCategory,
      path: `/medicines/${med.slug}`,
    });
  }

  for (const art of filterArticles(data.articles, { query: q }).slice(0, 5)) {
    results.push({
      id: art.id,
      type: 'article',
      slug: art.slug,
      title: localize(lang, art.titleEn, art.titleHi),
      subtitle: localize(lang, art.summaryEn, art.summaryHi),
      category: art.category,
      path: `/health-awareness/${art.slug}`,
    });
  }

  for (const note of filterPharmacyNotes(data.notes, { query: q }).slice(0, 5)) {
    results.push({
      id: note.id,
      type: 'pharmacy',
      slug: note.slug,
      title: localize(lang, note.titleEn, note.titleHi),
      subtitle: note.subject,
      category: note.languageLabel,
      path: `/pharmacy-education?note=${note.slug}`,
    });
  }

  for (const prod of filterProducts(data.products, { query: q }).slice(0, 5)) {
    results.push({
      id: prod.id,
      type: 'product',
      slug: prod.slug,
      title: localize(lang, prod.nameEn, prod.nameHi),
      subtitle: localize(lang, prod.descriptionEn, prod.descriptionHi),
      category: prod.category,
      path: `/products/${prod.slug}`,
    });
  }

  return results;
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consentAccepted: boolean;
}

export function validateEnquiryInput(input: EnquiryInput): ValidationResult {
  const errors: Record<string, string> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (name.length < 2 || name.length > 120) {
    errors.name = 'Please enter your full name (2–120 characters).';
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 160) {
    errors.email = 'Please enter a valid email address.';
  }
  const phoneDigits = phone.replace(/[\s+\-()]/g, '');
  if (phone.length < 7 || phone.length > 24 || !/^\d{7,15}$/.test(phoneDigits)) {
    errors.phone = 'Please enter a valid phone number (7–15 digits).';
  }
  if (subject.length < 2 || subject.length > 180) {
    errors.subject = 'Please provide a clear subject (2–180 characters).';
  }
  if (message.length < 10 || message.length > 3000) {
    errors.message = 'Please enter a message of at least 10 characters (max 3000).';
  }
  if (!input.consentAccepted) {
    errors.consentAccepted = 'Please confirm privacy consent before submitting.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildSitemapXml(
  baseUrl: string,
  paths: string[],
  lastMod = '2026-11-20'
): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const urls = paths
    .map(
      (p) =>
        `  <url>\n    <loc>${cleanBase}${p.startsWith('/') ? p : `/${p}`}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function formatWhatsAppUrl(phoneNumber: string, text?: string): string {
  const digits = phoneNumber.replace(/[^\d]/g, '');
  const base = `https://wa.me/${digits}`;
  if (text && text.trim()) {
    return `${base}?text=${encodeURIComponent(text.trim())}`;
  }
  return base;
}

export function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'VM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function filterApprovedReviews(reviews: Review[]): Review[] {
  return [...reviews]
    .filter((r) => r.approved === true)
    .sort((a, b) => (b.createdDate || '').localeCompare(a.createdDate || ''));
}

export function validateReviewInput(input: {
  reviewerName: string;
  roleEn: string;
  rating: number;
  textEn: string;
  avatarColor: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  if (!input.reviewerName || input.reviewerName.trim().length < 2) {
    errors.reviewerName = 'Reviewer name must be at least 2 characters.';
  }
  if (!input.roleEn || input.roleEn.trim().length < 2) {
    errors.roleEn = 'Reviewer role or city is required.';
  }
  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    errors.rating = 'Rating must be a whole number between 1 and 5.';
  }
  if (!input.textEn || input.textEn.trim().length < 10) {
    errors.textEn = 'Review text must be at least 10 characters.';
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test((input.avatarColor || '').trim())) {
    errors.avatarColor = 'Avatar color must be a valid 6-digit hex color.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
