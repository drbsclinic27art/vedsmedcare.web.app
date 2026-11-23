import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSitemapXml,
  filterApprovedReviews,
  filterArticles,
  filterMedicines,
  filterPharmacyNotes,
  filterProducts,
  formatWhatsAppUrl,
  getInitials,
  getRelatedArticles,
  globalSearch,
  localize,
  slugify,
  validateEnquiryInput,
  validateReviewInput,
} from './medcareLogic';
import type { Article, Medicine, PharmacyNote, Product } from '../types/medcare';

const sampleMedicines: Medicine[] = [
  {
    id: 'paracetamol',
    slug: 'paracetamol',
    nameEn: 'Paracetamol (Acetaminophen)',
    nameHi: 'पैरासिटामोल (एसिटामिनोफेन)',
    genericName: 'Paracetamol',
    brandNames: ['Dolo-650', 'Calpol', 'Crocin'],
    drugCategory: 'Analgesic & Antipyretic',
    therapeuticCategory: 'Pain & Fever',
    classificationEn: 'Non-opioid Analgesic',
    classificationHi: 'नॉन-ओपिओइड एनाल्जेसिक',
    usesEn: 'Temporary relief of mild to moderate pain and fever.',
    usesHi: 'हल्के से मध्यम दर्द और बुखार से अस्थायी राहत।',
    mechanismEn: 'Central prostaglandin synthesis inhibition.',
    mechanismHi: 'केंद्रीय प्रोस्टाग्लैंडीन संश्लेषण का अवरोध।',
    sideEffectsEn: 'Generally well tolerated at recommended doses.',
    sideEffectsHi: 'निर्धारित खुराक पर सामान्यतः सहनीय।',
    precautionsEn: 'Avoid exceeding daily maximum limit.',
    precautionsHi: 'दैनिक अधिकतम सीमा से अधिक न लें।',
    contraindicationsEn: 'Severe hepatic impairment.',
    contraindicationsHi: 'गंभीर लिवर विकार।',
    storageEn: 'Store below 25°C away from moisture.',
    storageHi: '25°C से कम तापमान पर नमी से दूर रखें।',
    references: ['WHO Essential Medicines List'],
    reviewDate: '2026-10-15',
    published: true,
  },
  {
    id: 'metformin',
    slug: 'metformin',
    nameEn: 'Metformin Hydrochloride',
    nameHi: 'मेटफॉर्मिन हाइड्रोक्लोराइड',
    genericName: 'Metformin',
    brandNames: ['Glycomet', 'Glucophage'],
    drugCategory: 'Biguanide',
    therapeuticCategory: 'Diabetes & Endocrine',
    classificationEn: 'Oral Antihyperglycemic',
    classificationHi: 'ओरल एंटीहाइपरग्लाइसेमिक',
    usesEn: 'Management of Type 2 Diabetes Mellitus alongside diet and exercise.',
    usesHi: 'आहार और व्यायाम के साथ टाइप 2 मधुमेह प्रबंधन।',
    mechanismEn: 'Reduces hepatic gluconeogenesis and improves insulin sensitivity.',
    mechanismHi: 'यकृत ग्लूकोज उत्पादन कम करता है।',
    sideEffectsEn: 'Mild gastrointestinal discomfort initially.',
    sideEffectsHi: 'शुरुआत में हल्की पेट की असुविधा।',
    precautionsEn: 'Monitor renal function periodically.',
    precautionsHi: 'समय-समय पर किडनी फंक्शन की जांच करें।',
    contraindicationsEn: 'Severe renal impairment or metabolic acidosis.',
    contraindicationsHi: 'गंभीर किडनी रोग।',
    storageEn: 'Store in a cool, dry place below 30°C.',
    storageHi: '30°C से कम सूखे स्थान पर रखें।',
    references: ['National Formulary of India'],
    reviewDate: '2026-10-20',
    published: true,
  },
];

const sampleArticles: Article[] = [
  {
    id: 'bp-guide',
    slug: 'understanding-blood-pressure',
    category: 'Blood Pressure',
    titleEn: 'Understanding Blood Pressure Readings',
    titleHi: 'ब्लड प्रेशर रीडिंग को कैसे समझें',
    summaryEn: 'Learn what systolic and diastolic numbers represent.',
    summaryHi: 'सिस्टोलिक और डायस्टोलिक संख्याओं का अर्थ जानें।',
    contentEn: 'Detailed evidence-based overview of blood pressure categories and home monitoring.',
    contentHi: 'ब्लड प्रेशर श्रेणियों और घरेलू मॉनिटरिंग का विस्तृत परिचय।',
    featuredImage: '/img.jpg',
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-01',
    lastUpdatedDate: '2026-11-01',
    readMinutes: 5,
    references: ['WHO Hypertension Guidelines'],
    published: true,
  },
  {
    id: 'heart-diet',
    slug: 'heart-friendly-nutrition',
    category: 'Heart Health',
    titleEn: 'Heart-Friendly Everyday Indian Diet Habits',
    titleHi: 'हृदय के लिए लाभकारी भारतीय आहार आदतें',
    summaryEn: 'Practical nutrition steps for cardiovascular wellness.',
    summaryHi: 'हृदय स्वास्थ्य के लिए व्यावहारिक पोषण कदम।',
    contentEn: 'Detailed guide on fiber, healthy fats, and sodium awareness.',
    contentHi: 'फाइबर, स्वस्थ वसा और सोडियम जागरूकता पर विस्तृत मार्गदर्शिका।',
    featuredImage: '/img2.jpg',
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-12',
    lastUpdatedDate: '2026-11-02',
    readMinutes: 6,
    references: ['ICMR-NIN Dietary Guidelines'],
    published: true,
  },
];

const sampleNotes: PharmacyNote[] = [
  {
    id: 'note-1',
    slug: 'tablet-dosage-forms',
    subject: 'Pharmaceutics',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Compressed Tablets: Formulation & Evaluation',
    titleHi: 'कम्प्रेस्ड टैबलेट्स: फॉर्मूलेशन और मूल्यांकन',
    shortNotesEn: 'Key excipients and IP quality control tests.',
    shortNotesHi: 'प्रमुख एक्सिपिएंट्स और आईपी गुणवत्ता परीक्षण।',
    detailedNotesEn: 'Detailed study note on binders, disintegrants, lubricants, and friability.',
    detailedNotesHi: 'बाइंडर्स, डिसइंटीग्रेंट्स और फ्रायबिलिटी पर विस्तृत नोट्स।',
    definitionsEn: 'Tablet: Solid unit dosage form prepared by compression.',
    definitionsHi: 'टैबलेट: कम्प्रेशन द्वारा निर्मित ठोस यूनिट खुराक रूप।',
    practicalProcedureEn: 'Perform weight variation test on 20 tablets.',
    practicalProcedureHi: '20 टैबलेट्स पर वेट वेरिएशन परीक्षण करें।',
    diagramKey: 'tablet-granulation',
    pdfUrl: '/api/study-sheet/tablet-dosage-forms.pdf',
    published: true,
  },
];

const sampleProducts: Product[] = [
  {
    id: 'bp-monitor',
    slug: 'digital-upper-arm-bp-monitor',
    category: 'Healthcare Equipment',
    nameEn: 'Digital Upper-Arm BP Monitor',
    nameHi: 'डिजिटल अपर-आर्म बीपी मॉनिटर',
    image: '/prod.jpg',
    descriptionEn: 'Oscillometric home blood pressure monitor for adult upper arm.',
    descriptionHi: 'घर पर रक्तचाप जांचने के लिए डिजिटल अपर-आर्म मॉनिटर।',
    featuresEn: ['Irregular heartbeat indicator', 'Large backlit LCD'],
    featuresHi: ['अनियमित धड़कन संकेतक', 'बड़ा बैकलिट एलसीडी'],
    usageEn: 'Rest 5 minutes before sitting upright with cuff at heart level.',
    usageHi: 'माप से पहले 5 मिनट आराम करें।',
    precautionsEn: 'Do not alter prescribed medicines based on a single reading.',
    precautionsHi: 'एक रीडिंग के आधार पर निर्धारित दवा न बदलें।',
    published: true,
  },
];

test('localize picks Hindi when selected and falls back safely to English', () => {
  assert.equal(localize('hi', 'Home', 'होम'), 'होम');
  assert.equal(localize('en', 'Home', 'होम'), 'Home');
  assert.equal(localize('hi', 'Fallback', '   '), 'Fallback');
});

test('slugify produces URL-safe lowercase slugs', () => {
  assert.equal(slugify("Ved's Medcare — D.Pharm Notes 101!"), 'veds-medcare-dpharm-notes-101');
});

test('filterMedicines matches by brand name, generic name, therapeutic category, and A-Z letter', () => {
  assert.equal(filterMedicines(sampleMedicines, { query: 'Dolo' }).length, 1);
  assert.equal(filterMedicines(sampleMedicines, { query: 'glycomet' })[0].id, 'metformin');
  assert.equal(filterMedicines(sampleMedicines, { therapeuticCategory: 'Pain & Fever' }).length, 1);
  assert.equal(filterMedicines(sampleMedicines, { letter: 'M' })[0].id, 'metformin');
  assert.equal(filterMedicines(sampleMedicines, { letter: 'Z' }).length, 0);
});

test('filterArticles and getRelatedArticles filter and rank cleanly', () => {
  assert.equal(filterArticles(sampleArticles, { category: 'Blood Pressure' }).length, 1);
  assert.equal(filterArticles(sampleArticles, { query: 'भारतीय' }).length, 1);
  const related = getRelatedArticles(sampleArticles[0], sampleArticles, 2);
  assert.equal(related.length, 1);
  assert.equal(related[0].id, 'heart-diet');
});

test('filterPharmacyNotes and filterProducts match subjects, categories, and Hindi queries', () => {
  assert.equal(filterPharmacyNotes(sampleNotes, { subject: 'Pharmaceutics' }).length, 1);
  assert.equal(filterPharmacyNotes(sampleNotes, { languageLabel: 'English' }).length, 0);
  assert.equal(filterProducts(sampleProducts, { category: 'Healthcare Equipment' }).length, 1);
});

test('globalSearch searches across all 4 domains simultaneously', () => {
  const results = globalSearch('blood pressure', {
    medicines: sampleMedicines,
    articles: sampleArticles,
    notes: sampleNotes,
    products: sampleProducts,
  }, 'en');
  assert.ok(results.some((r) => r.type === 'article'));
  assert.ok(results.some((r) => r.type === 'product'));
});

test('validateEnquiryInput rejects missing consent, invalid email, and short message', () => {
  const invalid = validateEnquiryInput({
    name: 'A',
    email: 'not-an-email',
    phone: '123',
    subject: 'Hi',
    message: 'short',
    consentAccepted: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.consentAccepted);

  const valid = validateEnquiryInput({
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    subject: 'Product Enquiry',
    message: 'I would like to know more about the digital BP monitor specifications.',
    consentAccepted: true,
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildSitemapXml and formatWhatsAppUrl produce standards-compliant outputs', () => {
  const xml = buildSitemapXml('https://vedsmedcare.in/', ['/medicines', '/about']);
  assert.match(xml, /<loc>https:\/\/vedsmedcare\.in\/medicines<\/loc>/);
  assert.match(xml, /<loc>https:\/\/vedsmedcare\.in\/about<\/loc>/);
  assert.equal(formatWhatsAppUrl('+91 6266120486'), 'https://wa.me/916266120486');
  assert.match(formatWhatsAppUrl('+91 6266120486', 'Hello'), /text=Hello/);
});

test('getInitials, filterApprovedReviews, and validateReviewInput handle testimonials cleanly', () => {
  assert.equal(getInitials('Ananya Sharma'), 'AS');
  assert.equal(getInitials('Devendra'), 'DE');
  assert.equal(getInitials('   '), 'VM');

  const filtered = filterApprovedReviews([
    {
      id: '1',
      reviewerName: 'Pending User',
      roleEn: 'Student',
      roleHi: '',
      rating: 5,
      textEn: 'Should not appear before approval.',
      textHi: '',
      avatarColor: '#15966A',
      approved: false,
      createdDate: '2026-11-20',
    },
    {
      id: '2',
      reviewerName: 'Approved Older',
      roleEn: 'Reader',
      roleHi: '',
      rating: 4,
      textEn: 'Helpful bilingual medicine guide.',
      textHi: '',
      avatarColor: '#2563EB',
      approved: true,
      createdDate: '2026-11-01',
    },
    {
      id: '3',
      reviewerName: 'Approved Newer',
      roleEn: 'D.Pharm Student',
      roleHi: '',
      rating: 5,
      textEn: 'Excellent pharmacy diagrams and PDF notes.',
      textHi: '',
      avatarColor: '#D97706',
      approved: true,
      createdDate: '2026-11-19',
    },
  ]);
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0].id, '3');
  assert.equal(filtered[1].id, '2');

  const invalid = validateReviewInput({
    reviewerName: 'A',
    roleEn: '',
    rating: 6,
    textEn: 'Short',
    avatarColor: 'green',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.reviewerName);
  assert.ok(invalid.errors.rating);
  assert.ok(invalid.errors.textEn);
  assert.ok(invalid.errors.avatarColor);

  const valid = validateReviewInput({
    reviewerName: 'Priya Verma',
    roleEn: 'D.Pharm Student, Bhopal',
    rating: 5,
    textEn: 'Clear bilingual study notes and helpful diagrams.',
    avatarColor: '#15966A',
  });
  assert.equal(valid.valid, true);
});
