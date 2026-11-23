import Papa from 'papaparse';
import type { Medicine } from '../types/medcare';
import { slugify } from './medcareLogic';

export const MASTER_CSV_PUBLIC_URL =
  '/assets/aistudio/veds_medcare_master_medicines_complete_68b5f3d4.csv';

export const MASTER_MEDICINE_CSV_HEADERS = [
  'Medicine Name (English)',
  'Medicine Name (Hindi)',
  'Generic Name / Salt',
  'Medicine Type',
  'Popular Brand Names',
  'Category',
  'Dosage Form',
  'Prescription Status',
  'Timing',
  'Uses (English)',
  'Uses (Hindi)',
  'How to Take (English)',
  'How to Take (Hindi)',
  'Common Side Effects (English)',
  'Common Side Effects (Hindi)',
  'Important Precautions',
  'Drug Class',
  'Mechanism of Action (MOA)',
  'D.Pharm Exam Tip',
] as const;

export const FIRESTORE_BATCH_SIZE = 50;

export interface MedicineCsvParseResult {
  medicines: Medicine[];
  detectedHeaders: string[];
  missingHeaders: string[];
  skippedRows: number[];
  duplicateInFileCount: number;
  parseErrors: string[];
}

export interface MedicineUpsertPlan {
  toCreate: Medicine[];
  toUpdate: Array<{
    existingId: string;
    existingSlug: string;
    medicine: Medicine;
  }>;
}

export function normalizeMedicineNameKey(nameEn: string): string {
  return nameEn.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function splitBrandNames(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function chunkArray<T>(items: T[], size = FIRESTORE_BATCH_SIZE): T[][] {
  if (size <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function cleanCell(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function makeUniqueSlug(baseName: string, usedSlugs: Set<string>, fallbackIndex: number): string {
  const base = slugify(baseName) || `medicine-${fallbackIndex}`;
  if (!usedSlugs.has(base)) {
    usedSlugs.add(base);
    return base;
  }
  let suffix = 2;
  while (usedSlugs.has(`${base}-${suffix}`)) {
    suffix++;
  }
  const unique = `${base}-${suffix}`;
  usedSlugs.add(unique);
  return unique;
}

export function parseMedicineCsvText(
  csvText: string,
  reviewDate = new Date().toISOString().slice(0, 10)
): MedicineCsvParseResult {
  const cleaned = csvText.replace(/^\uFEFF/, '');
  const parsed = Papa.parse<Record<string, string>>(cleaned, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (header) => header.replace(/^\uFEFF/, '').trim(),
  });

  const detectedHeaders = (parsed.meta.fields || []).map((h) => h.trim()).filter(Boolean);
  const headerSet = new Set(detectedHeaders);
  const missingHeaders = MASTER_MEDICINE_CSV_HEADERS.filter((h) => !headerSet.has(h));

  const parseErrors = parsed.errors
    .filter((err) => err.code !== 'TooFewFields' || (err.row ?? -1) >= 0)
    .map((err) => `Row ${(err.row ?? 0) + 2}: ${err.message}`);

  const skippedRows: number[] = [];
  const byNameKey = new Map<string, Medicine>();
  const usedSlugs = new Set<string>();
  let duplicateInFileCount = 0;

  parsed.data.forEach((row, index) => {
    const rowNumber = index + 2;
    const nameEn = cleanCell(row['Medicine Name (English)']);
    if (!nameEn || nameEn.length < 2) {
      skippedRows.push(rowNumber);
      return;
    }

    const key = normalizeMedicineNameKey(nameEn);
    const existingInFile = byNameKey.get(key);
    if (existingInFile) {
      duplicateInFileCount++;
    }

    const nameHi = cleanCell(row['Medicine Name (Hindi)']) || nameEn;
    const genericName = cleanCell(row['Generic Name / Salt']) || nameEn;
    const medicineType = cleanCell(row['Medicine Type']);
    const brandNames = splitBrandNames(cleanCell(row['Popular Brand Names']));
    const category = cleanCell(row['Category']) || 'General Medicine';
    const dosageForm = cleanCell(row['Dosage Form']);
    const prescriptionStatus = cleanCell(row['Prescription Status']);
    const timing = cleanCell(row['Timing']);
    const usesEn = cleanCell(row['Uses (English)']) || 'Refer to prescribing physician for clinical indications.';
    const usesHi = cleanCell(row['Uses (Hindi)']);
    const howToTakeEn = cleanCell(row['How to Take (English)']);
    const howToTakeHi = cleanCell(row['How to Take (Hindi)']);
    const sideEffectsEn =
      cleanCell(row['Common Side Effects (English)']) || 'Consult a doctor if any unusual reactions occur.';
    const sideEffectsHi = cleanCell(row['Common Side Effects (Hindi)']);
    const precautionsEn =
      cleanCell(row['Important Precautions']) || 'Use strictly under medical guidance.';
    const drugClass = cleanCell(row['Drug Class']) || category;
    const mechanismEn =
      cleanCell(row['Mechanism of Action (MOA)']) || 'Acts according to its pharmacological drug class.';
    const examTip = cleanCell(row['D.Pharm Exam Tip']);

    const slug = existingInFile
      ? existingInFile.slug
      : makeUniqueSlug(nameEn, usedSlugs, index + 1);

    const medicine: Medicine = {
      id: existingInFile ? existingInFile.id : slug,
      slug,
      nameEn: nameEn.slice(0, 180),
      nameHi: nameHi.slice(0, 220),
      genericName: genericName.slice(0, 400),
      medicineType: medicineType.slice(0, 60),
      brandNames,
      drugCategory: drugClass.slice(0, 160),
      therapeuticCategory: category.slice(0, 120),
      dosageForm: dosageForm.slice(0, 60),
      prescriptionStatus: prescriptionStatus.slice(0, 60),
      timing: timing.slice(0, 120),
      classificationEn: drugClass.slice(0, 300),
      classificationHi: '',
      usesEn: usesEn.slice(0, 2500),
      usesHi: usesHi.slice(0, 3000),
      howToTakeEn: howToTakeEn.slice(0, 1500),
      howToTakeHi: howToTakeHi.slice(0, 1800),
      mechanismEn: mechanismEn.slice(0, 2500),
      mechanismHi: '',
      sideEffectsEn: sideEffectsEn.slice(0, 2500),
      sideEffectsHi: sideEffectsHi.slice(0, 3000),
      precautionsEn: precautionsEn.slice(0, 2500),
      precautionsHi: '',
      contraindicationsEn: '',
      contraindicationsHi: '',
      storageEn: 'Store in a cool, dry place away from direct sunlight and out of reach of children.',
      storageHi: 'सीधी धूप और नमी से दूर ठंडे व सूखे स्थान पर बच्चों की पहुँच से बाहर रखें।',
      examTip: examTip.slice(0, 1500),
      references: ["Ved's Medcare Master Clinical Formulary", 'National Formulary of India (NFI)'],
      reviewDate,
      published: true,
    };

    byNameKey.set(key, medicine);
  });

  return {
    medicines: Array.from(byNameKey.values()),
    detectedHeaders,
    missingHeaders,
    skippedRows,
    duplicateInFileCount,
    parseErrors,
  };
}

export function planMedicineUpserts(
  parsedMedicines: Medicine[],
  existingMedicines: Array<{ id: string; slug: string; nameEn: string }>
): MedicineUpsertPlan {
  const existingMap = new Map<string, { id: string; slug: string }>();
  const usedIds = new Set<string>();

  for (const existing of existingMedicines) {
    usedIds.add(existing.id);
    const key = normalizeMedicineNameKey(existing.nameEn);
    if (key && !existingMap.has(key)) {
      existingMap.set(key, { id: existing.id, slug: existing.slug });
    }
  }

  const toCreate: Medicine[] = [];
  const toUpdate: MedicineUpsertPlan['toUpdate'] = [];

  for (const med of parsedMedicines) {
    const key = normalizeMedicineNameKey(med.nameEn);
    const match = existingMap.get(key);

    if (match) {
      toUpdate.push({
        existingId: match.id,
        existingSlug: match.slug || med.slug,
        medicine: {
          ...med,
          id: match.id,
          slug: match.slug || med.slug,
        },
      });
    } else {
      let candidateId = (med.id || slugify(med.nameEn) || 'medicine').replace(/[^a-zA-Z0-9_-]/g, '-');
      if (usedIds.has(candidateId)) {
        let suffix = 2;
        while (usedIds.has(`${candidateId}-${suffix}`)) {
          suffix++;
        }
        candidateId = `${candidateId}-${suffix}`;
      }
      usedIds.add(candidateId);
      toCreate.push({
        ...med,
        id: candidateId,
        slug: slugify(med.slug || candidateId),
      });
    }
  }

  return { toCreate, toUpdate };
}

export function mergeMedicinesDeduplicated(seed: Medicine[], remote: Medicine[]): Medicine[] {
  const byNameKey = new Map<string, Medicine>();
  const idToNameKey = new Map<string, string>();

  const upsert = (item: Medicine) => {
    const key = normalizeMedicineNameKey(item.nameEn) || item.id;
    const prevKey = idToNameKey.get(item.id);
    if (prevKey && prevKey !== key) {
      byNameKey.delete(prevKey);
    }
    byNameKey.set(key, item);
    idToNameKey.set(item.id, key);
  };

  for (const item of seed) upsert(item);
  for (const item of remote) upsert(item);

  return Array.from(byNameKey.values()).sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export function generateSampleMedicineCsv(): string {
  const sampleRows = [
    {
      'Medicine Name (English)': 'Dolo 650mg Tablet',
      'Medicine Name (Hindi)': 'डोलो 650mg टैबलेट',
      'Generic Name / Salt': 'Paracetamol 650 mg',
      'Medicine Type': 'Branded',
      'Popular Brand Names': 'Dolo 650, Calpol 650, Crocin 650, P-650',
      Category: 'Pain & Fever',
      'Dosage Form': 'Tablet',
      'Prescription Status': 'OTC',
      Timing: 'After Food',
      'Uses (English)':
        'Used to reduce fever and relieve mild to moderate pain including headache, body ache, and toothache.',
      'Uses (Hindi)':
        'बुखार कम करने और सिरदर्द, बदन दर्द व दाँत दर्द जैसे हल्के से मध्यम दर्द से राहत के लिए उपयोगी।',
      'How to Take (English)': 'Swallow whole with water after food. Maintain at least 6 hours between doses.',
      'How to Take (Hindi)': 'खाने के बाद पानी के साथ निगलें। दो खुराकों के बीच कम से कम 6 घंटे का अंतर रखें।',
      'Common Side Effects (English)': 'Rare at therapeutic doses; mild nausea or allergic skin rash.',
      'Common Side Effects (Hindi)': 'सामान्य खुराक में सुरक्षित; दुर्लभ स्थिति में मतली या त्वचा पर एलर्जी।',
      'Important Precautions':
        'Do not exceed 4g/day in adults. Avoid alcohol and check combination cold/flu medicines to prevent liver toxicity.',
      'Drug Class': 'Analgesic & Antipyretic (Para-aminophenol Derivative)',
      'Mechanism of Action (MOA)':
        'Inhibits central COX-mediated prostaglandin synthesis in the CNS and resets the hypothalamic thermoregulatory center.',
      'D.Pharm Exam Tip':
        'Paracetamol toxicity depletes glutathione -> toxic NAPQI metabolite; specific antidote is N-Acetylcysteine (NAC).',
    },
  ];
  return '\uFEFF' + Papa.unparse(sampleRows, { columns: [...MASTER_MEDICINE_CSV_HEADERS] });
}
