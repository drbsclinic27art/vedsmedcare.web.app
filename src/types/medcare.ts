export type Language = 'en' | 'hi';

export interface Medicine {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  genericName: string;
  brandNames: string[];
  drugCategory: string;
  therapeuticCategory: string;
  classificationEn: string;
  classificationHi: string;
  usesEn: string;
  usesHi: string;
  mechanismEn: string;
  mechanismHi: string;
  sideEffectsEn: string;
  sideEffectsHi: string;
  precautionsEn: string;
  precautionsHi: string;
  contraindicationsEn: string;
  contraindicationsHi: string;
  storageEn: string;
  storageHi: string;
  references: string[];
  reviewDate: string;
  published: boolean;
  updatedBy?: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  titleEn: string;
  titleHi: string;
  summaryEn: string;
  summaryHi: string;
  contentEn: string;
  contentHi: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  lastUpdatedDate: string;
  readMinutes: number;
  references: string[];
  published: boolean;
  updatedBy?: string;
}

export type PharmacyLanguageLabel = 'Bilingual (EN + हिंदी)' | 'English' | 'हिंदी';

export interface PharmacyNote {
  id: string;
  slug: string;
  subject: string;
  languageLabel: PharmacyLanguageLabel;
  titleEn: string;
  titleHi: string;
  shortNotesEn: string;
  shortNotesHi: string;
  detailedNotesEn: string;
  detailedNotesHi: string;
  definitionsEn: string;
  definitionsHi: string;
  practicalProcedureEn: string;
  practicalProcedureHi: string;
  diagramKey: string;
  pdfUrl: string;
  published: boolean;
  updatedBy?: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  nameEn: string;
  nameHi: string;
  image: string;
  descriptionEn: string;
  descriptionHi: string;
  featuresEn: string[];
  featuresHi: string[];
  usageEn: string;
  usageHi: string;
  precautionsEn: string;
  precautionsHi: string;
  published: boolean;
  updatedBy?: string;
}

export type CategoryDomain = 'medicine' | 'blog' | 'pharmacy' | 'product';

export interface CategoryItem {
  id: string;
  domain: CategoryDomain;
  nameEn: string;
  nameHi: string;
  published: boolean;
  updatedBy?: string;
}

export type EnquiryStatus = 'new' | 'reviewed' | 'resolved';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sourceType: 'contact' | 'product_enquiry';
  consentAccepted: boolean;
  status: EnquiryStatus;
  createdAt?: string;
}

export interface SiteSettings {
  brandName: string;
  founderName: string;
  phone: string;
  whatsapp: string;
  email: string;
  locationEn: string;
  locationHi: string;
  instagramHandle: string;
  instagramUrl: string;
  seoTitleEn: string;
  seoTitleHi: string;
  seoDescriptionEn: string;
  seoDescriptionHi: string;
  googleAnalyticsId: string;
  googleSearchConsoleCode: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  roleEn: string;
  roleHi: string;
  rating: number;
  textEn: string;
  textHi: string;
  avatarColor: string;
  approved: boolean;
  createdDate: string;
  updatedBy?: string;
}

export interface SearchResultItem {
  id: string;
  type: 'medicine' | 'article' | 'pharmacy' | 'product';
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  path: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
