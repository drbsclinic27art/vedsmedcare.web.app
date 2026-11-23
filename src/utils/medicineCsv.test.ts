import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  chunkArray,
  MASTER_MEDICINE_CSV_HEADERS,
  mergeMedicinesDeduplicated,
  normalizeMedicineNameKey,
  parseMedicineCsvText,
  planMedicineUpserts,
} from './medicineCsv.ts';
import { filterMedicines } from './medcareLogic.ts';

const masterCsvPath = path.resolve(
  process.cwd(),
  'public/assets/aistudio/veds_medcare_master_medicines_complete_68b5f3d4.csv'
);

test('parseMedicineCsvText parses the complete 298-row UTF-8 master CSV cleanly with zero errors', () => {
  const csvText = fs.readFileSync(masterCsvPath, 'utf8');
  const result = parseMedicineCsvText(csvText, '2026-11-21');

  assert.equal(result.missingHeaders.length, 0);
  assert.equal(result.parseErrors.length, 0);
  assert.equal(result.skippedRows.length, 0);
  assert.equal(result.medicines.length, 298);
  assert.equal(result.detectedHeaders.length, MASTER_MEDICINE_CSV_HEADERS.length);

  const first = result.medicines[0];
  assert.equal(first.nameEn, 'AB Phylline 100mg Capsule');
  assert.equal(first.nameHi, 'एबी फाइलिन 100mg कैप्सूल');
  assert.equal(first.genericName, 'Acebrophylline 100 mg');
  assert.equal(first.medicineType, 'Branded');
  assert.deepEqual(first.brandNames, ['AB Phylline', 'Abphyllin', 'Acebro', 'Macphylline']);
  assert.equal(first.therapeuticCategory, 'Respiratory');
  assert.equal(first.dosageForm, 'Capsule');
  assert.equal(first.prescriptionStatus, 'Schedule H');
  assert.equal(first.timing, 'After Food');
  assert.ok(first.usesHi.includes('अस्थमा'));
  assert.ok(first.howToTakeHi.includes('डॉक्टर'));
  assert.ok(first.sideEffectsEn.includes('Nausea, stomach upset'));
  assert.ok(first.precautionsEn.includes('stomach ulcers'));
  assert.equal(first.drugCategory, 'Mucolytic & Bronchodilator (Xanthine Derivative)');
  assert.ok(first.mechanismEn.includes('bronchodilation'));
  assert.ok(first.examTip.includes('Ambroxol + Theophylline-7-acetic acid'));

  const last = result.medicines[result.medicines.length - 1];
  assert.equal(last.nameEn, 'Zolfresh 5mg Tablet');
  assert.equal(last.nameHi, 'ज़ोलफ्रेश 5mg टैबलेट');
  assert.equal(last.prescriptionStatus, 'Schedule H1');
});

test('parseMedicineCsvText preserves commas inside quoted Hindi and English fields and deduplicates in-file rows', () => {
  const headers = MASTER_MEDICINE_CSV_HEADERS.join(',');
  const row1 = [
    '"TestMed 500mg Tablet"',
    '"टेस्टमेड 500mg, टैबलेट"',
    '"Salt A 250mg, Salt B 250mg"',
    'Branded',
    '"BrandOne, BrandTwo, BrandThree"',
    'Pain & Fever',
    'Tablet',
    'OTC',
    'After Food',
    '"Relieves headache, fever, and body ache."',
    '"सिरदर्द, बुखार और बदन दर्द में उपयोगी।"',
    '"Take after meals, with water."',
    '"भोजन के बाद, पानी के साथ लें।"',
    '"Nausea, mild dizziness."',
    '"मतली, हल्का चक्कर।"',
    '"Avoid alcohol, check liver health."',
    '"Analgesic, Antipyretic"',
    '"Inhibits COX-1, COX-2 enzymes."',
    '"Key tip: comma, preserved cleanly."',
  ].join(',');
  const row2 = row1.replace('Relieves headache, fever, and body ache.', 'Updated uses with comma, preserved.');

  const result = parseMedicineCsvText(`\uFEFF${headers}\n${row1}\n${row2}\n`, '2026-11-21');
  assert.equal(result.medicines.length, 1);
  assert.equal(result.duplicateInFileCount, 1);
  assert.equal(result.medicines[0].usesEn, 'Updated uses with comma, preserved.');
  assert.equal(result.medicines[0].nameHi, 'टेस्टमेड 500mg, टैबलेट');
  assert.deepEqual(result.medicines[0].brandNames, ['BrandOne', 'BrandTwo', 'BrandThree']);
});

test('chunkArray splits 298 medicines into safe 50-item Firestore batches', () => {
  const items = Array.from({ length: 298 }, (_, i) => i + 1);
  const batches = chunkArray(items, 50);
  assert.deepEqual(
    batches.map((b) => b.length),
    [50, 50, 50, 50, 50, 48]
  );
});

test('planMedicineUpserts prevents duplicates by matching Medicine Name (English) case-insensitively', () => {
  const csvText = fs.readFileSync(masterCsvPath, 'utf8');
  const { medicines } = parseMedicineCsvText(csvText, '2026-11-21');
  const existing = [
    {
      id: 'existing-ab-phylline-doc',
      slug: 'ab-phylline-custom',
      nameEn: '  ab phylline  100mg   capsule ',
    },
  ];

  const plan = planMedicineUpserts(medicines, existing);
  assert.equal(plan.toUpdate.length, 1);
  assert.equal(plan.toCreate.length, 297);
  assert.equal(plan.toUpdate[0].existingId, 'existing-ab-phylline-doc');
  assert.equal(plan.toUpdate[0].existingSlug, 'ab-phylline-custom');
  assert.equal(normalizeMedicineNameKey(plan.toUpdate[0].medicine.nameEn), 'ab phylline 100mg capsule');
});

test('filterMedicines searches across English name, Hindi name, generic salt, popular brands, and category', () => {
  const csvText = fs.readFileSync(masterCsvPath, 'utf8');
  const { medicines } = parseMedicineCsvText(csvText, '2026-11-21');

  assert.ok(filterMedicines(medicines, { query: 'AB Phylline' }).some((m) => m.nameEn === 'AB Phylline 100mg Capsule'));
  assert.ok(filterMedicines(medicines, { query: 'एबी फाइलिन' }).some((m) => m.nameEn === 'AB Phylline 100mg Capsule'));
  assert.ok(filterMedicines(medicines, { query: 'Acebrophylline' }).some((m) => m.nameEn === 'AB Phylline 100mg Capsule'));
  assert.ok(filterMedicines(medicines, { query: 'Macphylline' }).some((m) => m.nameEn === 'AB Phylline 100mg Capsule'));
  assert.ok(filterMedicines(medicines, { query: 'Respiratory' }).length >= 5);
});

test('mergeMedicinesDeduplicated prevents duplicates between seed and remote by Medicine Name (English)', () => {
  const csvText = fs.readFileSync(masterCsvPath, 'utf8');
  const { medicines } = parseMedicineCsvText(csvText, '2026-11-21');
  const seed = [medicines[0]];
  const remote = [{ ...medicines[0], id: 'remote-override-id', timing: 'Before Food' }];

  const merged = mergeMedicinesDeduplicated(seed, remote);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].id, 'remote-override-id');
  assert.equal(merged[0].timing, 'Before Food');
});
