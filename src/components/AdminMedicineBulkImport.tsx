import React, { useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Upload,
} from 'lucide-react';
import type { BulkImportProgress, BulkImportResult } from '../context/DataContext';
import type { Medicine } from '../types/medcare';
import {
  FIRESTORE_BATCH_SIZE,
  generateSampleMedicineCsv,
  MASTER_CSV_PUBLIC_URL,
  MASTER_MEDICINE_CSV_HEADERS,
  normalizeMedicineNameKey,
  parseMedicineCsvText,
  type MedicineCsvParseResult,
} from '../utils/medicineCsv';

interface AdminMedicineBulkImportProps {
  firestoreMedicineCount: number;
  firestoreMedicineKeys: string[];
  onBulkImport: (
    items: Medicine[],
    onProgress?: (progress: BulkImportProgress) => void
  ) => Promise<BulkImportResult>;
  onSuccessMessage: (msg: string) => void;
  onErrorMessage: (err: unknown) => void;
}

export function AdminMedicineBulkImport({
  firestoreMedicineCount,
  firestoreMedicineKeys,
  onBulkImport,
  onSuccessMessage,
  onErrorMessage,
}: AdminMedicineBulkImportProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sourceName, setSourceName] = useState<string>('');
  const [parseResult, setParseResult] = useState<MedicineCsvParseResult | null>(null);
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<BulkImportProgress | null>(null);
  const [finalResult, setFinalResult] = useState<BulkImportResult | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);

  const existingKeySet = useMemo(
    () => new Set(firestoreMedicineKeys),
    [firestoreMedicineKeys]
  );

  const previewCounts = useMemo(() => {
    if (!parseResult) return { toCreate: 0, toUpdate: 0 };
    let toUpdate = 0;
    let toCreate = 0;
    for (const med of parseResult.medicines) {
      if (existingKeySet.has(normalizeMedicineNameKey(med.nameEn))) {
        toUpdate++;
      } else {
        toCreate++;
      }
    }
    return { toCreate, toUpdate };
  }, [parseResult, existingKeySet]);

  const handleCsvText = (text: string, label: string) => {
    setFinalResult(null);
    setProgress(null);
    setSourceName(label);
    const parsed = parseMedicineCsvText(text);
    setParseResult(parsed);
  };

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    try {
      const text = await file.text();
      handleCsvText(text, file.name);
    } catch (err) {
      onErrorMessage(err);
    }
  };

  const handleLoadMasterCsv = async () => {
    setLoadingMaster(true);
    try {
      const res = await fetch(MASTER_CSV_PUBLIC_URL);
      if (!res.ok) {
        throw new Error('Could not load the attached master CSV file.');
      }
      const text = await res.text();
      handleCsvText(text, 'veds_medcare_master_medicines_complete.csv');
    } catch (err) {
      onErrorMessage(err);
    } finally {
      setLoadingMaster(false);
    }
  };

  const handleDownloadSample = () => {
    const csv = generateSampleMedicineCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'veds_medcare_medicines_template.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleStartImport = async () => {
    if (!parseResult || parseResult.medicines.length === 0) return;
    setImporting(true);
    setFinalResult(null);
    try {
      const result = await onBulkImport(parseResult.medicines, (p) => {
        setProgress(p);
      });
      setFinalResult(result);
      onSuccessMessage(
        `Bulk CSV import complete: ${result.total} medicines processed (${result.created} added, ${result.updated} updated).`
      );
    } catch (err) {
      onErrorMessage(err);
    } finally {
      setImporting(false);
    }
  };

  const progressPct =
    progress && progress.total > 0
      ? Math.min(100, Math.round((progress.uploaded / progress.total) * 100))
      : 0;

  return (
    <div className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
            Bulk Import (CSV) — UTF-8 Bilingual Master Format
          </h3>
          <p className="mt-1 text-xs text-[#486581] max-w-2xl leading-relaxed">
            Upload your 19-column UTF-8 CSV file (parsed with RFC-4180 PapaParse to preserve
            quoted commas and Hindi Devanagari text). Rows are uploaded in safe Firestore batches
            of {FIRESTORE_BATCH_SIZE}, and existing medicines matching{' '}
            <strong className="text-[#102A43]">Medicine Name (English)</strong> are automatically
            updated instead of duplicated. Currently synced in Firestore:{' '}
            <strong className="font-mono text-[#102A43]">{firestoreMedicineCount}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={importing || loadingMaster}
            onClick={() => void handleLoadMasterCsv()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] disabled:opacity-60 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#5FE3B4]" aria-hidden="true" />
            {loadingMaster ? 'Loading Master CSV...' : 'Load Master CSV (298 Medicines)'}
          </button>

          <button
            type="button"
            onClick={handleDownloadSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43] hover:bg-[#F5F8FA] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#15966A]" aria-hidden="true" />
            Sample CSV
          </button>

          <button
            type="button"
            onClick={() => setShowHeaders((prev) => !prev)}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] text-[#486581] hover:text-[#102A43] hover:bg-[#F5F8FA]"
          >
            {showHeaders ? 'Hide 19 Columns' : 'View 19 Columns'}
          </button>
        </div>
      </div>

      {showHeaders && (
        <div className="p-4 bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg">
          <p className="text-xs font-semibold text-[#102A43] mb-2">
            Supported 19 UTF-8 CSV Column Headers:
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-xs text-[#486581] list-decimal list-inside">
            {MASTER_MEDICINE_CSV_HEADERS.map((header) => (
              <li key={header} className="font-mono text-[11px] text-[#334E68]">
                {header}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* CSV File Picker */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-dashed border-[#9FB3C8] bg-[#F5F8FA] text-[#102A43] hover:border-[#15966A] hover:bg-[#EDF8F4]/50 cursor-pointer transition-colors">
          <Upload className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
          <span>Choose UTF-8 CSV File (.csv)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            disabled={importing}
            className="hidden"
            onChange={(e) => {
              void handleFileChange(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
        {sourceName && (
          <span className="text-xs text-[#486581]">
            Loaded: <strong className="text-[#102A43] font-mono">{sourceName}</strong>
          </span>
        )}
      </div>

      {/* Parsed CSV Preview & Duplicate Check */}
      {parseResult && (
        <div className="p-4 bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-[#D9E2EC] rounded-lg">
              <div className="text-[11px] text-[#627D98]">Parsed Valid Rows</div>
              <div className="mt-0.5 text-lg font-bold font-mono tabular-nums text-[#102A43]">
                {parseResult.medicines.length}
              </div>
            </div>
            <div className="p-3 bg-white border border-[#D9E2EC] rounded-lg">
              <div className="text-[11px] text-[#627D98]">New (Will Add)</div>
              <div className="mt-0.5 text-lg font-bold font-mono tabular-nums text-[#15966A]">
                {previewCounts.toCreate}
              </div>
            </div>
            <div className="p-3 bg-white border border-[#D9E2EC] rounded-lg">
              <div className="text-[11px] text-[#627D98]">Existing (Will Update)</div>
              <div className="mt-0.5 text-lg font-bold font-mono tabular-nums text-[#102A43]">
                {previewCounts.toUpdate}
              </div>
            </div>
            <div className="p-3 bg-white border border-[#D9E2EC] rounded-lg">
              <div className="text-[11px] text-[#627D98]">Firestore Batches</div>
              <div className="mt-0.5 text-lg font-bold font-mono tabular-nums text-[#102A43]">
                {Math.ceil(parseResult.medicines.length / FIRESTORE_BATCH_SIZE)}
              </div>
            </div>
          </div>

          {parseResult.missingHeaders.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>Missing expected headers:</strong> {parseResult.missingHeaders.join(', ')}.
                Defaults will be applied for missing optional columns.
              </div>
            </div>
          )}

          {parseResult.parseErrors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
              <strong>CSV Parser Notices:</strong> {parseResult.parseErrors.slice(0, 3).join(' | ')}
            </div>
          )}

          {/* 3-row Preview Table */}
          {parseResult.medicines.length > 0 && (
            <div className="overflow-x-auto bg-white border border-[#D9E2EC] rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F5F8FA] border-b border-[#D9E2EC] text-[#486581]">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Medicine (EN)</th>
                    <th className="py-2 px-3 font-semibold">Medicine (हिंदी)</th>
                    <th className="py-2 px-3 font-semibold">Generic / Salt</th>
                    <th className="py-2 px-3 font-semibold">Category</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EDF3]">
                  {parseResult.medicines.slice(0, 3).map((med) => (
                    <tr key={med.id}>
                      <td className="py-2 px-3 font-semibold text-[#102A43]">{med.nameEn}</td>
                      <td className="py-2 px-3 text-[#334E68]">{med.nameHi}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-[#486581]">
                        {med.genericName}
                      </td>
                      <td className="py-2 px-3 text-[#15966A] font-medium">
                        {med.therapeuticCategory}
                      </td>
                      <td className="py-2 px-3 text-[#486581]">{med.prescriptionStatus || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {parseResult.medicines.length > 3 && (
                <div className="px-3 py-1.5 text-[11px] text-[#627D98] border-t border-[#E6EDF3]">
                  Previewing first 3 of {parseResult.medicines.length} medicines…
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={importing || parseResult.medicines.length === 0}
              onClick={() => void handleStartImport()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] disabled:opacity-60 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              {importing
                ? 'Uploading Batches to Firestore...'
                : `Upload ${parseResult.medicines.length} Medicines to Firestore`}
            </button>
            {!importing && (
              <button
                type="button"
                onClick={() => {
                  setParseResult(null);
                  setSourceName('');
                  setProgress(null);
                  setFinalResult(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] bg-white text-[#486581] hover:text-[#102A43]"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
      )}

      {/* Live Batch Progress Bar */}
      {progress && (
        <div
          aria-live="polite"
          className="p-4 bg-[#F5F8FA] border border-[#D9E2EC] rounded-lg space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#102A43]">
            <span className="font-mono tabular-nums">
              {progress.uploaded} / {progress.total} uploaded
            </span>
            <span className="text-[#486581] font-mono tabular-nums">
              Batch {progress.currentBatch} / {progress.totalBatches} ({progressPct}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#D9E2EC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#15966A] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[11px] text-[#486581] font-mono tabular-nums">
            Added: {progress.created} · Updated (duplicate prevented): {progress.updated}
          </div>
        </div>
      )}

      {/* Final Success Summary Banner */}
      {finalResult && !importing && (
        <div
          role="status"
          className="p-4 bg-[#EDF8F4] border border-[#15966A]/40 rounded-lg text-xs sm:text-sm text-[#102A43] flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <strong>
              Successfully uploaded {finalResult.total} / {finalResult.total} medicines to Firebase
              Firestore!
            </strong>{' '}
            <span className="text-[#334E68]">
              ({finalResult.created} newly added, {finalResult.updated} existing updated without
              duplicates.)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
