import React, { useState } from 'react';
import {
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Plus,
  Star,
  Trash2,
  Upload,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  BLOG_CATEGORIES,
  BRAND_IMAGES,
  PHARMACY_SUBJECTS,
  PRODUCT_CATEGORIES,
  REVIEW_AVATAR_COLORS,
} from '../data/seedData';
import type {
  Article,
  CategoryDomain,
  CategoryItem,
  EnquiryStatus,
  Medicine,
  PharmacyLanguageLabel,
  PharmacyNote,
  Product,
  Review,
  SiteSettings,
} from '../types/medcare';
import { getInitials, slugify, validateReviewInput } from '../utils/medcareLogic';
import { Link, usePageSeo } from '../utils/router';

type AdminTab =
  | 'overview'
  | 'medicines'
  | 'articles'
  | 'pharmacy'
  | 'products'
  | 'reviews'
  | 'categories'
  | 'enquiries'
  | 'settings';

export function AdminDashboardPage() {
  const {
    authReady,
    user,
    isAdmin,
    medicines,
    articles,
    pharmacyNotes,
    products,
    categories,
    enquiries,
    reviews,
    siteSettings,
    loginAsAdmin,
    logoutAdmin,
    syncStarterDataToFirestore,
    saveMedicine,
    deleteMedicine,
    saveArticle,
    deleteArticle,
    savePharmacyNote,
    deletePharmacyNote,
    saveProduct,
    deleteProduct,
    saveCategory,
    deleteCategory,
    saveReview,
    toggleReviewApproval,
    deleteReview,
    updateEnquiryStatus,
    deleteEnquiry,
    saveSiteSettings,
    uploadAdminFile,
  } = useData();

  const [tab, setTab] = useState<AdminTab>('overview');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [busy, setBusy] = useState(false);

  // Forms state
  const [medForm, setMedForm] = useState<Partial<Medicine> | null>(null);
  const [artForm, setArtForm] = useState<Partial<Article> | null>(null);
  const [noteForm, setNoteForm] = useState<Partial<PharmacyNote> | null>(null);
  const [prodForm, setProdForm] = useState<Partial<Product> | null>(null);
  const [revForm, setRevForm] = useState<Partial<Review> | null>(null);
  const [catDomain, setCatDomain] = useState<CategoryDomain>('blog');
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameHi, setCatNameHi] = useState('');
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);

  usePageSeo("Admin Portal — Ved's Medcare", "Role-protected administration dashboard for Ved's Medcare.");

  const flash = (msg: string) => {
    setErrorMsg('');
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const fail = (err: unknown) => {
    setStatusMsg('');
    setErrorMsg(err instanceof Error ? err.message : 'Operation failed.');
  };

  // Protected Auth Gate
  if (!authReady) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F5F8FA]">
        <p className="text-sm text-[#486581]">Verifying authentication status...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-[#F5F8FA] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-[#D9E2EC] rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#102A43] text-white flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-[#102A43]">Admin Portal Sign-In</h1>
          <p className="mt-2.5 text-sm text-[#486581] leading-relaxed">
            This area is restricted to authorized Ved&apos;s Medcare administrators. Sign in with
            your verified Google administrator account to manage medicines, articles, pharmacy
            notes, products, SEO settings, and visitor enquiries.
          </p>
          {errorMsg && (
            <div role="alert" className="mt-4 p-3 text-xs bg-red-50 border border-red-200 text-red-800 rounded-lg">
              {errorMsg}
            </div>
          )}
          <button
            type="button"
            onClick={async () => {
              try {
                setErrorMsg('');
                await loginAsAdmin();
              } catch (err) {
                fail(err);
              }
            }}
            className="mt-6 w-full px-5 py-3 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] transition-colors"
          >
            Sign In with Google
          </button>
          <p className="mt-5 text-xs text-[#627D98]">
            Role-based access control enforced via Firebase Authentication &amp; Firestore Security Rules.
          </p>
          <Link to="/" className="mt-4 inline-block text-xs font-semibold text-[#15966A] hover:underline">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] bg-[#F5F8FA] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-[#D9E2EC] rounded-xl p-8 text-center">
          <h1 className="text-xl font-bold text-[#102A43]">Access Restricted</h1>
          <p className="mt-3 text-sm text-[#486581] leading-relaxed">
            Signed in as <strong className="text-[#102A43]">{user.email}</strong>, which does not
            hold administrator permissions for Ved&apos;s Medcare.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => void logoutAdmin()}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#102A43] text-white"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleFileUpload = async (
    file: File | undefined,
    onUrl: (url: string) => void
  ) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadAdminFile(file);
      onUrl(url);
      flash('File uploaded securely.');
    } catch (err) {
      fail(err);
    } finally {
      setBusy(false);
    }
  };

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'medicines', label: `Medicines (${medicines.length})` },
    { id: 'articles', label: `Articles (${articles.length})` },
    { id: 'pharmacy', label: `Pharmacy Notes (${pharmacyNotes.length})` },
    { id: 'products', label: `Products (${products.length})` },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'categories', label: `Categories (${categories.length})` },
    { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
    { id: 'settings', label: 'SEO & Contact' },
  ];

  return (
    <div className="bg-[#F5F8FA] min-h-screen">
      {/* Top Admin Header */}
      <div className="bg-[#102A43] text-white border-b border-[#1D3B58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#5FE3B4]">RBAC Protected Console</p>
            <h1 className="text-xl font-bold text-white">Ved&apos;s Medcare Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#BCCCDC]">{user.email}</span>
            <button
              type="button"
              onClick={() => void logoutAdmin()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#334E68] text-white hover:bg-[#1D3B58]"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap gap-1.5">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                if (item.id === 'settings') setSettingsForm(siteSettings);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                tab === item.id
                  ? 'bg-[#102A43] text-white'
                  : 'text-[#486581] hover:bg-[#F5F8FA] hover:text-[#102A43]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {statusMsg && (
          <div role="status" className="p-3.5 bg-[#EDF8F4] border border-[#15966A]/40 rounded-lg text-sm text-[#102A43] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
            <span>{statusMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div role="alert" className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {errorMsg}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: 'Medicines', count: medicines.length },
                { label: 'Health Articles', count: articles.length },
                { label: 'Pharmacy Notes', count: pharmacyNotes.length },
                { label: 'Products', count: products.length },
                { label: 'Reviews', count: reviews.length },
                { label: 'Visitor Enquiries', count: enquiries.length },
              ].map((s) => (
                <div key={s.label} className="p-5 bg-white border border-[#D9E2EC] rounded-xl">
                  <div className="text-xs text-[#627D98]">{s.label}</div>
                  <div className="mt-1 text-2xl font-bold text-[#102A43] font-mono tabular-nums">
                    {s.count}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border border-[#D9E2EC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#15966A]" aria-hidden="true" />
                  Initialize / Sync Bilingual Starter Library to Firestore
                </h2>
                <p className="mt-1 text-xs text-[#486581] max-w-2xl">
                  Push all baseline Hindi &amp; English medicines, health awareness articles,
                  D.Pharm study notes, products, reader reviews, categories, and site settings into
                  your managed Cloud Firestore database so every entry is live and editable.
                </p>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    const count = await syncStarterDataToFirestore();
                    flash(`Synced ${count} records to Firestore successfully.`);
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] disabled:opacity-60 whitespace-nowrap"
              >
                {busy ? 'Syncing...' : 'Sync Starter Library'}
              </button>
            </div>
          </div>
        )}

        {/* MEDICINES TAB */}
        {tab === 'medicines' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#102A43]">Manage Medicine Library</h2>
              <button
                type="button"
                onClick={() =>
                  setMedForm({
                    id: '',
                    slug: '',
                    nameEn: '',
                    nameHi: '',
                    genericName: '',
                    brandNames: [],
                    drugCategory: '',
                    therapeuticCategory: '',
                    classificationEn: '',
                    classificationHi: '',
                    usesEn: '',
                    usesHi: '',
                    mechanismEn: '',
                    mechanismHi: '',
                    sideEffectsEn: '',
                    sideEffectsHi: '',
                    precautionsEn: '',
                    precautionsHi: '',
                    contraindicationsEn: '',
                    contraindicationsHi: '',
                    storageEn: 'Store below 25°C in a dry place away from moisture.',
                    storageHi: '25°C से कम तापमान पर सूखे स्थान में रखें।',
                    references: ['National Formulary of India (NFI)'],
                    reviewDate: new Date().toISOString().slice(0, 10),
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white"
              >
                <Plus className="w-4 h-4" /> Add Medicine
              </button>
            </div>

            {medForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const isNew = !medForm.id;
                    const item: Medicine = {
                      id: medForm.id || slugify(medForm.nameEn || `med-${Date.now()}`),
                      slug: slugify(medForm.slug || medForm.nameEn || ''),
                      nameEn: medForm.nameEn || '',
                      nameHi: medForm.nameHi || medForm.nameEn || '',
                      genericName: medForm.genericName || '',
                      brandNames: medForm.brandNames || [],
                      drugCategory: medForm.drugCategory || 'General',
                      therapeuticCategory: medForm.therapeuticCategory || 'General',
                      classificationEn: medForm.classificationEn || '',
                      classificationHi: medForm.classificationHi || medForm.classificationEn || '',
                      usesEn: medForm.usesEn || '',
                      usesHi: medForm.usesHi || medForm.usesEn || '',
                      mechanismEn: medForm.mechanismEn || '',
                      mechanismHi: medForm.mechanismHi || medForm.mechanismEn || '',
                      sideEffectsEn: medForm.sideEffectsEn || '',
                      sideEffectsHi: medForm.sideEffectsHi || medForm.sideEffectsEn || '',
                      precautionsEn: medForm.precautionsEn || '',
                      precautionsHi: medForm.precautionsHi || medForm.precautionsEn || '',
                      contraindicationsEn: medForm.contraindicationsEn || '',
                      contraindicationsHi: medForm.contraindicationsHi || medForm.contraindicationsEn || '',
                      storageEn: medForm.storageEn || '',
                      storageHi: medForm.storageHi || medForm.storageEn || '',
                      references: medForm.references || ['WHO EML'],
                      reviewDate: medForm.reviewDate || new Date().toISOString().slice(0, 10),
                      published: medForm.published !== false,
                    };
                    await saveMedicine(item, isNew);
                    setMedForm(null);
                    flash('Medicine saved to Firestore.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-4"
              >
                <h3 className="text-sm font-bold text-[#102A43]">
                  {medForm.id ? 'Edit Medicine Monograph' : 'New Medicine Monograph'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    required
                    placeholder="Medicine Name (English)"
                    value={medForm.nameEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, nameEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="दवा का नाम (हिंदी)"
                    value={medForm.nameHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, nameHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Generic Name"
                    value={medForm.genericName || ''}
                    onChange={(e) => setMedForm({ ...medForm, genericName: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Drug Category"
                    value={medForm.drugCategory || ''}
                    onChange={(e) => setMedForm({ ...medForm, drugCategory: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Therapeutic Category"
                    value={medForm.therapeuticCategory || ''}
                    onChange={(e) => setMedForm({ ...medForm, therapeuticCategory: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    placeholder="Brands (comma-separated)"
                    value={(medForm.brandNames || []).join(', ')}
                    onChange={(e) =>
                      setMedForm({
                        ...medForm,
                        brandNames: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Classification (EN)"
                    value={medForm.classificationEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, classificationEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="वर्गीकरण (हिंदी)"
                    value={medForm.classificationHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, classificationHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Review Date (YYYY-MM-DD)"
                    value={medForm.reviewDate || ''}
                    onChange={(e) => setMedForm({ ...medForm, reviewDate: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    required
                    rows={2}
                    placeholder="Common Uses (EN)"
                    value={medForm.usesEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, usesEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="सामान्य उपयोग (हिंदी)"
                    value={medForm.usesHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, usesHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Mechanism of Action (EN)"
                    value={medForm.mechanismEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, mechanismEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="कार्यप्रणाली (हिंदी)"
                    value={medForm.mechanismHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, mechanismHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Side Effects (EN)"
                    value={medForm.sideEffectsEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, sideEffectsEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="दुष्प्रभाव (हिंदी)"
                    value={medForm.sideEffectsHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, sideEffectsHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Precautions (EN)"
                    value={medForm.precautionsEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, precautionsEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="सावधानियाँ (हिंदी)"
                    value={medForm.precautionsHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, precautionsHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Contraindications (EN)"
                    value={medForm.contraindicationsEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, contraindicationsEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="कब न लें (हिंदी)"
                    value={medForm.contraindicationsHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, contraindicationsHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Storage (EN)"
                    value={medForm.storageEn || ''}
                    onChange={(e) => setMedForm({ ...medForm, storageEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="भंडारण (हिंदी)"
                    value={medForm.storageHi || ''}
                    onChange={(e) => setMedForm({ ...medForm, storageHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <input
                  placeholder="Authoritative References (comma-separated)"
                  value={(medForm.references || []).join(', ')}
                  onChange={(e) =>
                    setMedForm({
                      ...medForm,
                      references: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white"
                  >
                    Save Medicine
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedForm(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {medicines.map((med) => (
                <div key={med.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[#102A43]">{med.nameEn}</div>
                    <div className="text-xs text-[#486581]">
                      {med.genericName} · {med.therapeuticCategory} ·{' '}
                      <span className={med.published ? 'text-[#15966A]' : 'text-amber-700'}>
                        {med.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void saveMedicine({ ...med, published: !med.published }, false).then(() => flash('Updated publish status.'))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#D9E2EC] rounded-lg hover:bg-[#F5F8FA]"
                    >
                      {med.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {med.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMedForm(med)}
                      className="px-3 py-1.5 text-xs font-semibold border border-[#D9E2EC] rounded-lg hover:bg-[#F5F8FA]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteMedicine(med.id).then(() => flash('Medicine deleted.'))}
                      aria-label={`Delete ${med.nameEn}`}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HEALTH ARTICLES TAB */}
        {tab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#102A43]">Manage Health Awareness Articles</h2>
              <button
                type="button"
                onClick={() =>
                  setArtForm({
                    id: '',
                    slug: '',
                    category: BLOG_CATEGORIES[0].nameEn,
                    titleEn: '',
                    titleHi: '',
                    summaryEn: '',
                    summaryHi: '',
                    contentEn: '',
                    contentHi: '',
                    featuredImage: BRAND_IMAGES.heartHealth,
                    author: "Ved's Medcare Editorial Desk",
                    publishedDate: new Date().toISOString().slice(0, 10),
                    lastUpdatedDate: new Date().toISOString().slice(0, 10),
                    readMinutes: 5,
                    references: ['WHO Public Health Resources'],
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white"
              >
                <Plus className="w-4 h-4" /> Add Article
              </button>
            </div>

            {artForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const isNew = !artForm.id;
                    const item: Article = {
                      id: artForm.id || slugify(artForm.titleEn || `art-${Date.now()}`),
                      slug: slugify(artForm.slug || artForm.titleEn || ''),
                      category: artForm.category || 'General Health',
                      titleEn: artForm.titleEn || '',
                      titleHi: artForm.titleHi || artForm.titleEn || '',
                      summaryEn: artForm.summaryEn || '',
                      summaryHi: artForm.summaryHi || artForm.summaryEn || '',
                      contentEn: artForm.contentEn || '',
                      contentHi: artForm.contentHi || artForm.contentEn || '',
                      featuredImage: artForm.featuredImage || BRAND_IMAGES.heartHealth,
                      author: artForm.author || "Ved's Medcare Editorial Desk",
                      publishedDate: artForm.publishedDate || new Date().toISOString().slice(0, 10),
                      lastUpdatedDate: new Date().toISOString().slice(0, 10),
                      readMinutes: Number(artForm.readMinutes) || 5,
                      references: artForm.references || ['WHO'],
                      published: artForm.published !== false,
                    };
                    await saveArticle(item, isNew);
                    setArtForm(null);
                    flash('Health article saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={artForm.category || ''}
                    onChange={(e) => setArtForm({ ...artForm, category: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c.nameEn} value={c.nameEn}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    placeholder="Title (English)"
                    value={artForm.titleEn || ''}
                    onChange={(e) => setArtForm({ ...artForm, titleEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="शीर्षक (हिंदी)"
                    value={artForm.titleHi || ''}
                    onChange={(e) => setArtForm({ ...artForm, titleHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    placeholder="Featured Image URL"
                    value={artForm.featuredImage || ''}
                    onChange={(e) => setArtForm({ ...artForm, featuredImage: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] cursor-pointer hover:bg-[#F5F8FA]">
                    <Upload className="w-3.5 h-3.5 text-[#15966A]" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        void handleFileUpload(e.target.files?.[0], (url) =>
                          setArtForm({ ...artForm, featuredImage: url })
                        )
                      }
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    required
                    rows={2}
                    placeholder="Short Summary (EN)"
                    value={artForm.summaryEn || ''}
                    onChange={(e) => setArtForm({ ...artForm, summaryEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="संक्षिप्त विवरण (हिंदी)"
                    value={artForm.summaryHi || ''}
                    onChange={(e) => setArtForm({ ...artForm, summaryHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Full Article Content (EN, min 40 chars)"
                    value={artForm.contentEn || ''}
                    onChange={(e) => setArtForm({ ...artForm, contentEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="पूर्ण लेख सामग्री (हिंदी, कम से कम 40 अक्षर)"
                    value={artForm.contentHi || ''}
                    onChange={(e) => setArtForm({ ...artForm, contentHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={busy} className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white">
                    Save Article
                  </button>
                  <button type="button" onClick={() => setArtForm(null)} className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC]">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {articles.map((art) => (
                <div key={art.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[#102A43]">{art.titleEn}</div>
                    <div className="text-xs text-[#486581]">
                      {art.category} · {art.publishedDate} ·{' '}
                      <span className={art.published ? 'text-[#15966A]' : 'text-amber-700'}>
                        {art.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void saveArticle({ ...art, published: !art.published }, false).then(() => flash('Updated publish status.'))}
                      className="px-3 py-1.5 text-xs font-medium border border-[#D9E2EC] rounded-lg"
                    >
                      {art.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setArtForm(art)}
                      className="px-3 py-1.5 text-xs font-semibold border border-[#D9E2EC] rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteArticle(art.id).then(() => flash('Article deleted.'))}
                      aria-label={`Delete ${art.titleEn}`}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHARMACY NOTES TAB */}
        {tab === 'pharmacy' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#102A43]">Manage D.Pharm Study Notes &amp; PDFs</h2>
              <button
                type="button"
                onClick={() =>
                  setNoteForm({
                    id: '',
                    slug: '',
                    subject: PHARMACY_SUBJECTS[0].nameEn,
                    languageLabel: 'Bilingual (EN + हिंदी)',
                    titleEn: '',
                    titleHi: '',
                    shortNotesEn: '',
                    shortNotesHi: '',
                    detailedNotesEn: '',
                    detailedNotesHi: '',
                    definitionsEn: '',
                    definitionsHi: '',
                    practicalProcedureEn: '',
                    practicalProcedureHi: '',
                    diagramKey: 'tablet-granulation',
                    pdfUrl: '',
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white"
              >
                <Plus className="w-4 h-4" /> Add Pharmacy Note
              </button>
            </div>

            {noteForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const isNew = !noteForm.id;
                    const item: PharmacyNote = {
                      id: noteForm.id || slugify(noteForm.titleEn || `note-${Date.now()}`),
                      slug: slugify(noteForm.slug || noteForm.titleEn || ''),
                      subject: noteForm.subject || 'Pharmaceutics',
                      languageLabel: (noteForm.languageLabel as PharmacyLanguageLabel) || 'Bilingual (EN + हिंदी)',
                      titleEn: noteForm.titleEn || '',
                      titleHi: noteForm.titleHi || noteForm.titleEn || '',
                      shortNotesEn: noteForm.shortNotesEn || '',
                      shortNotesHi: noteForm.shortNotesHi || noteForm.shortNotesEn || '',
                      detailedNotesEn: noteForm.detailedNotesEn || '',
                      detailedNotesHi: noteForm.detailedNotesHi || noteForm.detailedNotesEn || '',
                      definitionsEn: noteForm.definitionsEn || '',
                      definitionsHi: noteForm.definitionsHi || '',
                      practicalProcedureEn: noteForm.practicalProcedureEn || '',
                      practicalProcedureHi: noteForm.practicalProcedureHi || '',
                      diagramKey: noteForm.diagramKey || 'tablet-granulation',
                      pdfUrl: noteForm.pdfUrl || '',
                      published: noteForm.published !== false,
                    };
                    await savePharmacyNote(item, isNew);
                    setNoteForm(null);
                    flash('Pharmacy study note saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={noteForm.subject || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, subject: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  >
                    {PHARMACY_SUBJECTS.map((s) => (
                      <option key={s.nameEn} value={s.nameEn}>
                        {s.nameEn}
                      </option>
                    ))}
                  </select>
                  <select
                    value={noteForm.languageLabel || 'Bilingual (EN + हिंदी)'}
                    onChange={(e) =>
                      setNoteForm({ ...noteForm, languageLabel: e.target.value as PharmacyLanguageLabel })
                    }
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  >
                    <option value="Bilingual (EN + हिंदी)">Bilingual (EN + हिंदी)</option>
                    <option value="English">English</option>
                    <option value="हिंदी">हिंदी</option>
                  </select>
                  <select
                    value={noteForm.diagramKey || 'tablet-granulation'}
                    onChange={(e) => setNoteForm({ ...noteForm, diagramKey: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  >
                    <option value="tablet-granulation">Diagram: Tablet Granulation</option>
                    <option value="pharmacokinetics-adme">Diagram: Pharmacokinetics ADME</option>
                    <option value="nephron-filtration">Diagram: Nephron Filtration</option>
                    <option value="dispensing-workflow">Diagram: Dispensing Workflow</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Topic Title (EN)"
                    value={noteForm.titleEn || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, titleEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="विषय शीर्षक (हिंदी)"
                    value={noteForm.titleHi || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, titleHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Short Notes (EN)"
                    value={noteForm.shortNotesEn || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, shortNotesEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="संक्षिप्त नोट्स (हिंदी)"
                    value={noteForm.shortNotesHi || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, shortNotesHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Detailed Explanation (EN, min 20 chars)"
                    value={noteForm.detailedNotesEn || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, detailedNotesEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="विस्तृत नोट्स (हिंदी, कम से कम 20 अक्षर)"
                    value={noteForm.detailedNotesHi || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, detailedNotesHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    placeholder="Educational PDF URL (original material only)"
                    value={noteForm.pdfUrl || ''}
                    onChange={(e) => setNoteForm({ ...noteForm, pdfUrl: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] cursor-pointer hover:bg-[#F5F8FA]">
                    <Upload className="w-3.5 h-3.5 text-[#15966A]" />
                    Upload PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        void handleFileUpload(e.target.files?.[0], (url) =>
                          setNoteForm({ ...noteForm, pdfUrl: url })
                        )
                      }
                    />
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={busy} className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white">
                    Save Study Note
                  </button>
                  <button type="button" onClick={() => setNoteForm(null)} className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC]">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {pharmacyNotes.map((note) => (
                <div key={note.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[#102A43]">{note.titleEn}</div>
                    <div className="text-xs text-[#486581]">
                      {note.subject} · {note.languageLabel}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void savePharmacyNote({ ...note, published: !note.published }, false).then(() => flash('Updated publish status.'))}
                      className="px-3 py-1.5 text-xs font-medium border border-[#D9E2EC] rounded-lg"
                    >
                      {note.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteForm(note)}
                      className="px-3 py-1.5 text-xs font-semibold border border-[#D9E2EC] rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void deletePharmacyNote(note.id).then(() => flash('Note deleted.'))}
                      aria-label={`Delete ${note.titleEn}`}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#102A43]">Manage Healthcare Products Catalogue</h2>
              <button
                type="button"
                onClick={() =>
                  setProdForm({
                    id: '',
                    slug: '',
                    category: PRODUCT_CATEGORIES[0].nameEn,
                    nameEn: '',
                    nameHi: '',
                    image: BRAND_IMAGES.productsEssentials,
                    descriptionEn: '',
                    descriptionHi: '',
                    featuresEn: ['Durable clinical-grade build'],
                    featuresHi: ['टिकाऊ गुणवत्ता'],
                    usageEn: '',
                    usageHi: '',
                    precautionsEn: '',
                    precautionsHi: '',
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            {prodForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const isNew = !prodForm.id;
                    const item: Product = {
                      id: prodForm.id || slugify(prodForm.nameEn || `prod-${Date.now()}`),
                      slug: slugify(prodForm.slug || prodForm.nameEn || ''),
                      category: prodForm.category || 'Healthcare Essentials',
                      nameEn: prodForm.nameEn || '',
                      nameHi: prodForm.nameHi || prodForm.nameEn || '',
                      image: prodForm.image || BRAND_IMAGES.productsEssentials,
                      descriptionEn: prodForm.descriptionEn || '',
                      descriptionHi: prodForm.descriptionHi || prodForm.descriptionEn || '',
                      featuresEn: prodForm.featuresEn || ['Reliable home monitoring'],
                      featuresHi: prodForm.featuresHi || ['विश्वसनीय घरेलू उपयोग'],
                      usageEn: prodForm.usageEn || '',
                      usageHi: prodForm.usageHi || prodForm.usageEn || '',
                      precautionsEn: prodForm.precautionsEn || '',
                      precautionsHi: prodForm.precautionsHi || prodForm.precautionsEn || '',
                      published: prodForm.published !== false,
                    };
                    await saveProduct(item, isNew);
                    setProdForm(null);
                    flash('Product saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={prodForm.category || ''}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  >
                    {PRODUCT_CATEGORIES.map((c) => (
                      <option key={c.nameEn} value={c.nameEn}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    placeholder="Product Name (EN)"
                    value={prodForm.nameEn || ''}
                    onChange={(e) => setProdForm({ ...prodForm, nameEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="उत्पाद का नाम (हिंदी)"
                    value={prodForm.nameHi || ''}
                    onChange={(e) => setProdForm({ ...prodForm, nameHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    placeholder="Product Image URL"
                    value={prodForm.image || ''}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC] cursor-pointer hover:bg-[#F5F8FA]">
                    <Upload className="w-3.5 h-3.5 text-[#15966A]" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        void handleFileUpload(e.target.files?.[0], (url) =>
                          setProdForm({ ...prodForm, image: url })
                        )
                      }
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    required
                    rows={2}
                    placeholder="Description (EN)"
                    value={prodForm.descriptionEn || ''}
                    onChange={(e) => setProdForm({ ...prodForm, descriptionEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="विवरण (हिंदी)"
                    value={prodForm.descriptionHi || ''}
                    onChange={(e) => setProdForm({ ...prodForm, descriptionHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Usage Information (EN)"
                    value={prodForm.usageEn || ''}
                    onChange={(e) => setProdForm({ ...prodForm, usageEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="उपयोग विधि (हिंदी)"
                    value={prodForm.usageHi || ''}
                    onChange={(e) => setProdForm({ ...prodForm, usageHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Precautions (EN)"
                    value={prodForm.precautionsEn || ''}
                    onChange={(e) => setProdForm({ ...prodForm, precautionsEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="सावधानियाँ (हिंदी)"
                    value={prodForm.precautionsHi || ''}
                    onChange={(e) => setProdForm({ ...prodForm, precautionsHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={busy} className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white">
                    Save Product
                  </button>
                  <button type="button" onClick={() => setProdForm(null)} className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC]">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[#102A43]">{prod.nameEn}</div>
                    <div className="text-xs text-[#486581]">{prod.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void saveProduct({ ...prod, published: !prod.published }, false).then(() => flash('Updated publish status.'))}
                      className="px-3 py-1.5 text-xs font-medium border border-[#D9E2EC] rounded-lg"
                    >
                      {prod.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProdForm(prod)}
                      className="px-3 py-1.5 text-xs font-semibold border border-[#D9E2EC] rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteProduct(prod.id).then(() => flash('Product deleted.'))}
                      aria-label={`Delete ${prod.nameEn}`}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS & TESTIMONIALS TAB */}
        {tab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#102A43]">
                  Manage Reviews &amp; Testimonials
                </h2>
                <p className="text-xs text-[#486581] mt-0.5">
                  Only approved reviews appear in the homepage &ldquo;What Our Readers &amp; Students Say&rdquo; carousel.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setRevForm({
                    id: '',
                    reviewerName: '',
                    roleEn: '',
                    roleHi: '',
                    rating: 5,
                    textEn: '',
                    textHi: '',
                    avatarColor:
                      REVIEW_AVATAR_COLORS[reviews.length % REVIEW_AVATAR_COLORS.length],
                    approved: true,
                    createdDate: new Date().toISOString().slice(0, 10),
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56]"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>

            {revForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const validation = validateReviewInput({
                    reviewerName: revForm.reviewerName || '',
                    roleEn: revForm.roleEn || '',
                    rating: Number(revForm.rating) || 5,
                    textEn: revForm.textEn || '',
                    avatarColor: revForm.avatarColor || REVIEW_AVATAR_COLORS[0],
                  });
                  if (!validation.valid) {
                    setErrorMsg(Object.values(validation.errors)[0] || 'Please check review fields.');
                    return;
                  }
                  setBusy(true);
                  try {
                    const isNew = !revForm.id;
                    const item: Review = {
                      id:
                        revForm.id ||
                        `rev-${slugify(revForm.reviewerName || 'reader')}-${Date.now().toString(36)}`,
                      reviewerName: (revForm.reviewerName || '').trim(),
                      roleEn: (revForm.roleEn || '').trim(),
                      roleHi: (revForm.roleHi || '').trim(),
                      rating: Math.max(1, Math.min(5, Math.round(Number(revForm.rating) || 5))),
                      textEn: (revForm.textEn || '').trim(),
                      textHi: (revForm.textHi || '').trim(),
                      avatarColor: revForm.avatarColor || REVIEW_AVATAR_COLORS[0],
                      approved: revForm.approved !== false,
                      createdDate: revForm.createdDate || new Date().toISOString().slice(0, 10),
                    };
                    await saveReview(item, isNew);
                    setRevForm(null);
                    flash(isNew ? 'Review added to Firestore.' : 'Review updated in Firestore.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-4"
              >
                <h3 className="text-sm font-bold text-[#102A43]">
                  {revForm.id ? 'Edit Reader / Student Review' : 'New Reader / Student Review'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    required
                    placeholder="Reviewer Full Name"
                    value={revForm.reviewerName || ''}
                    onChange={(e) => setRevForm({ ...revForm, reviewerName: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    required
                    placeholder="Role / City (English, e.g. D.Pharm Student, Bhopal)"
                    value={revForm.roleEn || ''}
                    onChange={(e) => setRevForm({ ...revForm, roleEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <input
                    placeholder="भूमिका / शहर (हिंदी — वैकल्पिक)"
                    value={revForm.roleHi || ''}
                    onChange={(e) => setRevForm({ ...revForm, roleHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRevForm({ ...revForm, rating: n })}
                          aria-label={`Set rating to ${n} stars`}
                          className="p-1 rounded hover:bg-[#F5F8FA]"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              n <= (revForm.rating || 5)
                                ? 'text-[#F59E0B] fill-[#F59E0B]'
                                : 'text-[#BCCCDC]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-1 text-xs font-mono font-semibold text-[#102A43]">
                        {(revForm.rating || 5).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Avatar Color
                    </label>
                    <div className="flex items-center gap-2">
                      {REVIEW_AVATAR_COLORS.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => setRevForm({ ...revForm, avatarColor: hex })}
                          aria-label={`Select avatar color ${hex}`}
                          className={`w-7 h-7 rounded-full transition-transform ${
                            revForm.avatarColor === hex
                              ? 'ring-2 ring-offset-2 ring-[#102A43] scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Review Date
                    </label>
                    <input
                      type="date"
                      value={revForm.createdDate || new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setRevForm({ ...revForm, createdDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    required
                    rows={3}
                    placeholder="Review Text (English, min 10 characters)"
                    value={revForm.textEn || ''}
                    onChange={(e) => setRevForm({ ...revForm, textEn: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                  <textarea
                    rows={3}
                    placeholder="समीक्षा पाठ (हिंदी — वैकल्पिक)"
                    value={revForm.textHi || ''}
                    onChange={(e) => setRevForm({ ...revForm, textHi: e.target.value })}
                    className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                  />
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-[#102A43] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={revForm.approved !== false}
                    onChange={(e) => setRevForm({ ...revForm, approved: e.target.checked })}
                    className="rounded border-[#D9E2EC]"
                  />
                  Approved (visible on public homepage carousel)
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58] disabled:opacity-60"
                  >
                    Save Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevForm(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#D9E2EC]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                      style={{ backgroundColor: rev.avatarColor }}
                      aria-hidden="true"
                    >
                      {getInitials(rev.reviewerName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#102A43]">{rev.reviewerName}</span>
                        <span className="text-xs text-[#627D98]">· {rev.roleEn}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-0.5 text-[#D97706] font-mono font-semibold">
                          {'★'.repeat(rev.rating)}
                          {'☆'.repeat(5 - rev.rating)} ({rev.rating}.0)
                        </span>
                        <span className="text-[#627D98] font-mono">· {rev.createdDate}</span>
                        <span className="text-[#627D98]">·</span>
                        <span className={rev.approved ? 'font-semibold text-[#15966A]' : 'font-semibold text-amber-700'}>
                          {rev.approved ? 'Approved' : 'Pending Approval'}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#334E68] leading-relaxed">
                        &ldquo;{rev.textEn}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        try {
                          await toggleReviewApproval(rev);
                          flash(rev.approved ? 'Review hidden from homepage.' : 'Review approved for homepage.');
                        } catch (err) {
                          fail(err);
                        } finally {
                          setBusy(false);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#D9E2EC] rounded-lg hover:bg-[#F5F8FA]"
                    >
                      {rev.approved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {rev.approved ? 'Unapprove' : 'Approve'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRevForm(rev)}
                      className="px-3 py-1.5 text-xs font-semibold border border-[#D9E2EC] rounded-lg hover:bg-[#F5F8FA]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        try {
                          await deleteReview(rev.id);
                          flash('Review deleted.');
                        } catch (err) {
                          fail(err);
                        } finally {
                          setBusy(false);
                        }
                      }}
                      aria-label={`Delete review by ${rev.reviewerName}`}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {tab === 'categories' && (
          <div className="space-y-6">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!catNameEn.trim()) return;
                setBusy(true);
                try {
                  const item: CategoryItem = {
                    id: `${catDomain}-${slugify(catNameEn)}`,
                    domain: catDomain,
                    nameEn: catNameEn.trim(),
                    nameHi: catNameHi.trim() || catNameEn.trim(),
                    published: true,
                  };
                  await saveCategory(item, true);
                  setCatNameEn('');
                  setCatNameHi('');
                  flash('Category saved.');
                } catch (err) {
                  fail(err);
                } finally {
                  setBusy(false);
                }
              }}
              className="p-5 bg-white border border-[#D9E2EC] rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3"
            >
              <select
                value={catDomain}
                onChange={(e) => setCatDomain(e.target.value as CategoryDomain)}
                className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
              >
                <option value="medicine">Medicine Library</option>
                <option value="blog">Health Blog</option>
                <option value="pharmacy">Pharmacy Education</option>
                <option value="product">Healthcare Products</option>
              </select>
              <input
                required
                placeholder="Category Name (EN)"
                value={catNameEn}
                onChange={(e) => setCatNameEn(e.target.value)}
                className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
              />
              <input
                placeholder="श्रेणी नाम (हिंदी)"
                value={catNameHi}
                onChange={(e) => setCatNameHi(e.target.value)}
                className="px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
              />
              <button
                type="submit"
                disabled={busy}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#15966A] text-white"
              >
                Add Category
              </button>
            </form>

            <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="text-sm text-[#102A43]">
                    <strong>{cat.nameEn}</strong> · {cat.nameHi}{' '}
                    <span className="text-xs text-[#627D98] font-mono">({cat.domain})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void deleteCategory(cat.id).then(() => flash('Category removed.'))}
                    aria-label={`Delete ${cat.nameEn}`}
                    className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENQUIRIES INBOX TAB */}
        {tab === 'enquiries' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#102A43]">Contact &amp; Product Enquiries Inbox</h2>
            {enquiries.length === 0 ? (
              <div className="p-10 bg-white border border-[#D9E2EC] rounded-xl text-center text-sm text-[#486581]">
                No visitor enquiries stored in Firestore yet.
              </div>
            ) : (
              <div className="bg-white border border-[#D9E2EC] rounded-xl divide-y divide-[#E6EDF3]">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-sm font-bold text-[#102A43]">{enq.subject}</span>
                        <span className="ml-2 text-xs text-[#486581]">
                          ({enq.sourceType === 'product_enquiry' ? 'Product Enquiry' : 'General Contact'})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Status for ${enq.subject}`}
                          value={enq.status}
                          onChange={(e) =>
                            void updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus).then(() =>
                              flash('Enquiry status updated.')
                            )
                          }
                          className="px-2.5 py-1 text-xs border border-[#D9E2EC] rounded-lg"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => void deleteEnquiry(enq.id).then(() => flash('Enquiry deleted.'))}
                          aria-label={`Delete enquiry from ${enq.name}`}
                          className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#334E68]">{enq.message}</p>
                    <div className="text-xs text-[#627D98] font-mono">
                      {enq.name} · {enq.email} · {enq.phone}
                      {enq.createdAt ? ` · ${enq.createdAt.slice(0, 10)}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SEO & SITE SETTINGS TAB */}
        {tab === 'settings' && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                await saveSiteSettings(settingsForm);
                flash('SEO metadata and official contact information updated.');
              } catch (err) {
                fail(err);
              } finally {
                setBusy(false);
              }
            }}
            className="p-6 bg-white border border-[#D9E2EC] rounded-xl space-y-5"
          >
            <h2 className="text-lg font-bold text-[#102A43]">SEO Metadata &amp; Official Contact Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">Phone Number</label>
                <input
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">WhatsApp Number</label>
                <input
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#102A43] mb-1">Official Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">SEO Title (English)</label>
                <input
                  value={settingsForm.seoTitleEn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoTitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">SEO Title (हिंदी)</label>
                <input
                  value={settingsForm.seoTitleHi}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoTitleHi: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">SEO Meta Description (EN)</label>
                <textarea
                  rows={2}
                  value={settingsForm.seoDescriptionEn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoDescriptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">SEO Meta Description (हिंदी)</label>
                <textarea
                  rows={2}
                  value={settingsForm.seoDescriptionHi}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoDescriptionHi: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Google Analytics Measurement ID (e.g. G-XXXXXXXXXX)
                </label>
                <input
                  placeholder="Optional GA4 Measurement ID"
                  value={settingsForm.googleAnalyticsId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Google Search Console Verification Code
                </label>
                <input
                  placeholder="Optional verification token"
                  value={settingsForm.googleSearchConsoleCode}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, googleSearchConsoleCode: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56]"
            >
              Save Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
