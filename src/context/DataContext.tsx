import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  auth,
  BOOTSTRAPPED_ADMIN_EMAIL,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import {
  DEFAULT_SITE_SETTINGS,
  REVIEW_AVATAR_COLORS,
  SEED_ARTICLES,
  SEED_CATEGORIES,
  SEED_MEDICINES,
  SEED_PHARMACY_NOTES,
  SEED_PRODUCTS,
  SEED_REVIEWS,
} from '../data/seedData';
import type {
  Article,
  CategoryItem,
  Enquiry,
  EnquiryStatus,
  Medicine,
  PharmacyNote,
  Product,
  Review,
  SiteSettings,
} from '../types/medcare';
import { slugify } from '../utils/medcareLogic';

interface DataContextValue {
  loading: boolean;
  authReady: boolean;
  user: User | null;
  isAdmin: boolean;
  medicines: Medicine[];
  articles: Article[];
  pharmacyNotes: PharmacyNote[];
  products: Product[];
  categories: CategoryItem[];
  enquiries: Enquiry[];
  reviews: Review[];
  siteSettings: SiteSettings;
  loginAsAdmin: () => Promise<void>;
  logoutAdmin: () => Promise<void>;
  refreshPublicData: () => Promise<void>;
  refreshAdminData: () => Promise<void>;
  syncStarterDataToFirestore: () => Promise<number>;
  saveMedicine: (item: Medicine, isNew: boolean) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
  saveArticle: (item: Article, isNew: boolean) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  savePharmacyNote: (item: PharmacyNote, isNew: boolean) => Promise<void>;
  deletePharmacyNote: (id: string) => Promise<void>;
  saveProduct: (item: Product, isNew: boolean) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  saveCategory: (item: CategoryItem, isNew: boolean) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  saveReview: (item: Review, isNew?: boolean) => Promise<void>;
  toggleReviewApproval: (item: Review) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  submitEnquiry: (payload: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    sourceType: 'contact' | 'product_enquiry';
    consentAccepted: boolean;
  }) => Promise<{ receiptId: string }>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  saveSiteSettings: (settings: SiteSettings) => Promise<void>;
  uploadAdminFile: (file: File) => Promise<string>;
}

const DataContext = createContext<DataContextValue | null>(null);

function mergeById<T extends { id: string }>(seed: T[], remote: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of seed) {
    map.set(item.id, item);
  }
  for (const item of remote) {
    map.set(item.id, item);
  }
  return Array.from(map.values());
}

const RETIRED_PHONE_DIGITS = '918103150957';

function normalizeSiteSettings(raw: Partial<SiteSettings>): SiteSettings {
  const merged: SiteSettings = { ...DEFAULT_SITE_SETTINGS, ...raw };
  const phoneDigits = merged.phone.replace(/\D/g, '');
  const whatsappDigits = merged.whatsapp.replace(/\D/g, '');
  if (phoneDigits === RETIRED_PHONE_DIGITS || phoneDigits === '8103150957') {
    merged.phone = DEFAULT_SITE_SETTINGS.phone;
  }
  if (whatsappDigits === RETIRED_PHONE_DIGITS || whatsappDigits === '8103150957') {
    merged.whatsapp = DEFAULT_SITE_SETTINGS.whatsapp;
  }
  if (!merged.email || !merged.email.trim()) {
    merged.email = DEFAULT_SITE_SETTINGS.email;
  }
  return merged;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [medicines, setMedicines] = useState<Medicine[]>(SEED_MEDICINES);
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES);
  const [pharmacyNotes, setPharmacyNotes] = useState<PharmacyNote[]>(SEED_PHARMACY_NOTES);
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(SEED_CATEGORIES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  const mapReviewDoc = (d: { id: string; data: () => Record<string, unknown> }): Review => {
    const raw = d.data();
    return {
      id: d.id,
      reviewerName: String(raw.reviewerName || ''),
      roleEn: String(raw.roleEn || ''),
      roleHi: String(raw.roleHi || ''),
      rating: Math.max(1, Math.min(5, Math.round(Number(raw.rating) || 5))),
      textEn: String(raw.textEn || ''),
      textHi: String(raw.textHi || ''),
      avatarColor:
        typeof raw.avatarColor === 'string' && /^#[0-9A-Fa-f]{6}$/.test(raw.avatarColor)
          ? raw.avatarColor
          : REVIEW_AVATAR_COLORS[0],
      approved: Boolean(raw.approved),
      createdDate: String(raw.createdDate || ''),
      updatedBy: typeof raw.updatedBy === 'string' ? raw.updatedBy : undefined,
    };
  };

  const refreshPublicData = useCallback(async () => {
    setLoading(true);
    try {
      const [medSnap, artSnap, noteSnap, prodSnap, catSnap, revSnap, settingsSnap] =
        await Promise.all([
          getDocs(query(collection(db, 'medicines'), where('published', '==', true))).catch(() => null),
          getDocs(query(collection(db, 'articles'), where('published', '==', true))).catch(() => null),
          getDocs(query(collection(db, 'pharmacyNotes'), where('published', '==', true))).catch(() => null),
          getDocs(query(collection(db, 'products'), where('published', '==', true))).catch(() => null),
          getDocs(query(collection(db, 'categories'), where('published', '==', true))).catch(() => null),
          getDocs(query(collection(db, 'reviews'), where('approved', '==', true))).catch(() => null),
          getDoc(doc(db, 'siteSettings', 'global')).catch(() => null),
        ]);

      if (medSnap && !medSnap.empty) {
        const remote = medSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Medicine, 'id'>) }));
        setMedicines(mergeById(SEED_MEDICINES, remote));
      }
      if (artSnap && !artSnap.empty) {
        const remote = artSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Article, 'id'>) }));
        setArticles(mergeById(SEED_ARTICLES, remote));
      }
      if (noteSnap && !noteSnap.empty) {
        const remote = noteSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PharmacyNote, 'id'>) }));
        setPharmacyNotes(mergeById(SEED_PHARMACY_NOTES, remote));
      }
      if (prodSnap && !prodSnap.empty) {
        const remote = prodSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }));
        setProducts(mergeById(SEED_PRODUCTS, remote));
      }
      if (catSnap && !catSnap.empty) {
        const remote = catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CategoryItem, 'id'>) }));
        setCategories(mergeById(SEED_CATEGORIES, remote));
      }
      if (revSnap && !revSnap.empty) {
        const remote = revSnap.docs
          .map((d) => mapReviewDoc(d))
          .sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        setReviews(remote);
      }
      if (settingsSnap && settingsSnap.exists()) {
        const data = settingsSnap.data() as Partial<SiteSettings>;
        setSiteSettings(normalizeSiteSettings(data));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAdminData = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const [medSnap, artSnap, noteSnap, prodSnap, catSnap, enqSnap, revSnap, settingsSnap] =
        await Promise.all([
          getDocs(collection(db, 'medicines')),
          getDocs(collection(db, 'articles')),
          getDocs(collection(db, 'pharmacyNotes')),
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'categories')),
          getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'))),
          getDocs(collection(db, 'reviews')),
          getDoc(doc(db, 'siteSettings', 'global')),
        ]);

      setMedicines(
        mergeById(
          SEED_MEDICINES,
          medSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Medicine, 'id'>) }))
        )
      );
      setArticles(
        mergeById(
          SEED_ARTICLES,
          artSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Article, 'id'>) }))
        )
      );
      setPharmacyNotes(
        mergeById(
          SEED_PHARMACY_NOTES,
          noteSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PharmacyNote, 'id'>) }))
        )
      );
      setProducts(
        mergeById(
          SEED_PRODUCTS,
          prodSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }))
        )
      );
      setCategories(
        mergeById(
          SEED_CATEGORIES,
          catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CategoryItem, 'id'>) }))
        )
      );
      setEnquiries(
        enqSnap.docs.map((d) => {
          const raw = d.data();
          const ts = raw.createdAt?.toDate ? raw.createdAt.toDate().toISOString() : '';
          return {
            id: d.id,
            name: String(raw.name || ''),
            email: String(raw.email || ''),
            phone: String(raw.phone || ''),
            subject: String(raw.subject || ''),
            message: String(raw.message || ''),
            sourceType: raw.sourceType === 'product_enquiry' ? 'product_enquiry' : 'contact',
            consentAccepted: Boolean(raw.consentAccepted),
            status: (raw.status as EnquiryStatus) || 'new',
            createdAt: ts,
          };
        })
      );
      if (!revSnap.empty) {
        const remoteReviews = revSnap.docs
          .map((d) => mapReviewDoc(d))
          .sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        setReviews(remoteReviews);
      } else {
        setReviews(SEED_REVIEWS);
      }
      if (settingsSnap.exists()) {
        setSiteSettings(normalizeSiteSettings(settingsSnap.data() as Partial<SiteSettings>));
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'admin-collections');
    }
  }, []);

  useEffect(() => {
    void refreshPublicData();
  }, [refreshPublicData]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser || !nextUser.emailVerified) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      if (nextUser.email === BOOTSTRAPPED_ADMIN_EMAIL) {
        setIsAdmin(true);
        setAuthReady(true);
        void refreshAdminData();
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, 'admins', nextUser.uid));
        const hasRole = adminDoc.exists();
        setIsAdmin(hasRole);
        if (hasRole) {
          void refreshAdminData();
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsub();
  }, [refreshAdminData]);

  const loginAsAdmin = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const logoutAdmin = useCallback(async () => {
    await signOut(auth);
    setEnquiries([]);
    setIsAdmin(false);
    await refreshPublicData();
  }, [refreshPublicData]);

  const syncStarterDataToFirestore = useCallback(async (): Promise<number> => {
    if (!auth.currentUser) throw new Error('Admin login required.');
    const uid = auth.currentUser.uid;
    let count = 0;

    try {
      const batch = writeBatch(db);

      for (const m of SEED_MEDICINES) {
        const { id, ...rest } = m;
        batch.set(doc(db, 'medicines', id), {
          ...rest,
          slug: slugify(rest.slug || rest.nameEn),
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      for (const a of SEED_ARTICLES) {
        const { id, ...rest } = a;
        batch.set(doc(db, 'articles', id), {
          ...rest,
          slug: slugify(rest.slug || rest.titleEn),
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      for (const n of SEED_PHARMACY_NOTES) {
        const { id, ...rest } = n;
        batch.set(doc(db, 'pharmacyNotes', id), {
          ...rest,
          slug: slugify(rest.slug || rest.titleEn),
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      for (const p of SEED_PRODUCTS) {
        const { id, ...rest } = p;
        batch.set(doc(db, 'products', id), {
          ...rest,
          slug: slugify(rest.slug || rest.nameEn),
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      for (const c of SEED_CATEGORIES) {
        const { id, ...rest } = c;
        batch.set(doc(db, 'categories', id), {
          ...rest,
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      for (const r of SEED_REVIEWS) {
        const { id, ...rest } = r;
        batch.set(doc(db, 'reviews', id), {
          reviewerName: rest.reviewerName,
          roleEn: rest.roleEn,
          roleHi: rest.roleHi,
          rating: rest.rating,
          textEn: rest.textEn,
          textHi: rest.textHi,
          avatarColor: rest.avatarColor,
          approved: rest.approved,
          createdDate: rest.createdDate,
          updatedBy: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }

      batch.set(doc(db, 'siteSettings', 'global'), {
        ...siteSettings,
        updatedBy: uid,
        updatedAt: serverTimestamp(),
      });
      count++;

      await batch.commit();
      await refreshAdminData();
      return count;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'starter-sync');
    }
  }, [refreshAdminData, siteSettings]);

  const saveMedicine = useCallback(
    async (item: Medicine, isNew: boolean) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (item.id || slugify(item.nameEn) || `med-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '-');
      const ref = doc(db, 'medicines', docId);
      const base = {
        slug: slugify(item.slug || item.nameEn),
        nameEn: item.nameEn.trim().slice(0, 160),
        nameHi: item.nameHi.trim().slice(0, 200),
        genericName: item.genericName.trim().slice(0, 160),
        brandNames: item.brandNames.slice(0, 10),
        drugCategory: item.drugCategory.trim().slice(0, 100),
        therapeuticCategory: item.therapeuticCategory.trim().slice(0, 100),
        classificationEn: item.classificationEn.trim().slice(0, 240),
        classificationHi: item.classificationHi.trim().slice(0, 300),
        usesEn: item.usesEn.trim().slice(0, 2500),
        usesHi: item.usesHi.trim().slice(0, 3000),
        mechanismEn: item.mechanismEn.trim().slice(0, 2500),
        mechanismHi: item.mechanismHi.trim().slice(0, 3000),
        sideEffectsEn: item.sideEffectsEn.trim().slice(0, 2500),
        sideEffectsHi: item.sideEffectsHi.trim().slice(0, 3000),
        precautionsEn: item.precautionsEn.trim().slice(0, 2500),
        precautionsHi: item.precautionsHi.trim().slice(0, 3000),
        contraindicationsEn: item.contraindicationsEn.trim().slice(0, 2500),
        contraindicationsHi: item.contraindicationsHi.trim().slice(0, 3000),
        storageEn: item.storageEn.trim().slice(0, 800),
        storageHi: item.storageHi.trim().slice(0, 1000),
        references: item.references.slice(0, 10),
        reviewDate: item.reviewDate.trim().slice(0, 40),
        published: Boolean(item.published),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        await refreshAdminData();
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `medicines/${docId}`);
      }
    },
    [refreshAdminData]
  );

  const deleteMedicine = useCallback(
    async (id: string) => {
      try {
        await deleteDoc(doc(db, 'medicines', id));
        setMedicines((prev) => prev.filter((m) => m.id !== id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `medicines/${id}`);
      }
    },
    []
  );

  const saveArticle = useCallback(
    async (item: Article, isNew: boolean) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (item.id || slugify(item.titleEn) || `art-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '-');
      const ref = doc(db, 'articles', docId);
      const base = {
        slug: slugify(item.slug || item.titleEn),
        category: item.category.trim().slice(0, 80),
        titleEn: item.titleEn.trim().slice(0, 200),
        titleHi: item.titleHi.trim().slice(0, 240),
        summaryEn: item.summaryEn.trim().slice(0, 600),
        summaryHi: item.summaryHi.trim().slice(0, 700),
        contentEn: item.contentEn.trim().slice(0, 20000),
        contentHi: item.contentHi.trim().slice(0, 24000),
        featuredImage: item.featuredImage.trim().slice(0, 500),
        author: item.author.trim().slice(0, 100),
        publishedDate: item.publishedDate.trim().slice(0, 40),
        lastUpdatedDate: item.lastUpdatedDate.trim().slice(0, 40),
        readMinutes: Math.max(1, Math.min(60, Number(item.readMinutes) || 5)),
        references: item.references.slice(0, 12),
        published: Boolean(item.published),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        await refreshAdminData();
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `articles/${docId}`);
      }
    },
    [refreshAdminData]
  );

  const deleteArticle = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
    }
  }, []);

  const savePharmacyNote = useCallback(
    async (item: PharmacyNote, isNew: boolean) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (item.id || slugify(item.titleEn) || `note-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '-');
      const ref = doc(db, 'pharmacyNotes', docId);
      const base = {
        slug: slugify(item.slug || item.titleEn),
        subject: item.subject.trim().slice(0, 100),
        languageLabel: item.languageLabel,
        titleEn: item.titleEn.trim().slice(0, 200),
        titleHi: item.titleHi.trim().slice(0, 240),
        shortNotesEn: item.shortNotesEn.trim().slice(0, 3000),
        shortNotesHi: item.shortNotesHi.trim().slice(0, 3500),
        detailedNotesEn: item.detailedNotesEn.trim().slice(0, 15000),
        detailedNotesHi: item.detailedNotesHi.trim().slice(0, 18000),
        definitionsEn: item.definitionsEn.trim().slice(0, 4000),
        definitionsHi: item.definitionsHi.trim().slice(0, 4500),
        practicalProcedureEn: item.practicalProcedureEn.trim().slice(0, 6000),
        practicalProcedureHi: item.practicalProcedureHi.trim().slice(0, 7000),
        diagramKey: item.diagramKey.trim().slice(0, 80),
        pdfUrl: item.pdfUrl.trim().slice(0, 500),
        published: Boolean(item.published),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        await refreshAdminData();
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `pharmacyNotes/${docId}`);
      }
    },
    [refreshAdminData]
  );

  const deletePharmacyNote = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pharmacyNotes', id));
      setPharmacyNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `pharmacyNotes/${id}`);
    }
  }, []);

  const saveProduct = useCallback(
    async (item: Product, isNew: boolean) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (item.id || slugify(item.nameEn) || `prod-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '-');
      const ref = doc(db, 'products', docId);
      const base = {
        slug: slugify(item.slug || item.nameEn),
        category: item.category.trim().slice(0, 100),
        nameEn: item.nameEn.trim().slice(0, 160),
        nameHi: item.nameHi.trim().slice(0, 200),
        image: item.image.trim().slice(0, 500),
        descriptionEn: item.descriptionEn.trim().slice(0, 3000),
        descriptionHi: item.descriptionHi.trim().slice(0, 3500),
        featuresEn: item.featuresEn.slice(0, 10),
        featuresHi: item.featuresHi.slice(0, 10),
        usageEn: item.usageEn.trim().slice(0, 2500),
        usageHi: item.usageHi.trim().slice(0, 3000),
        precautionsEn: item.precautionsEn.trim().slice(0, 2500),
        precautionsHi: item.precautionsHi.trim().slice(0, 3000),
        published: Boolean(item.published),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        await refreshAdminData();
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `products/${docId}`);
      }
    },
    [refreshAdminData]
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  }, []);

  const saveCategory = useCallback(
    async (item: CategoryItem, isNew: boolean) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (item.id || `${item.domain}-${slugify(item.nameEn)}`).replace(/[^a-zA-Z0-9_-]/g, '-');
      const ref = doc(db, 'categories', docId);
      const base = {
        domain: item.domain,
        nameEn: item.nameEn.trim().slice(0, 100),
        nameHi: item.nameHi.trim().slice(0, 120),
        published: Boolean(item.published),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        await refreshAdminData();
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `categories/${docId}`);
      }
    },
    [refreshAdminData]
  );

  const deleteCategory = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `categories/${id}`);
    }
  }, []);

  const saveReview = useCallback(
    async (item: Review, isNew = false) => {
      if (!auth.currentUser) throw new Error('Admin authentication required.');
      const docId = (
        item.id || `rev-${slugify(item.reviewerName) || 'reader'}-${Date.now().toString(36)}`
      )
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 64);
      const ref = doc(db, 'reviews', docId);
      const validColor = /^#[0-9A-Fa-f]{6}$/.test(item.avatarColor)
        ? item.avatarColor
        : REVIEW_AVATAR_COLORS[0];
      const normalizedRating = Math.max(1, Math.min(5, Math.round(Number(item.rating) || 5)));
      const base = {
        reviewerName: item.reviewerName.trim().slice(0, 100),
        roleEn: item.roleEn.trim().slice(0, 120),
        roleHi: (item.roleHi || '').trim().slice(0, 150),
        rating: normalizedRating,
        textEn: item.textEn.trim().slice(0, 1200),
        textHi: (item.textHi || '').trim().slice(0, 1400),
        avatarColor: validColor,
        approved: Boolean(item.approved),
        createdDate: (item.createdDate || new Date().toISOString().slice(0, 10)).trim().slice(0, 24),
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };
      try {
        const snap = await getDoc(ref);
        if (isNew || !snap.exists()) {
          await setDoc(ref, { ...base, createdAt: serverTimestamp() });
        } else {
          await updateDoc(ref, base);
        }
        const savedReview: Review = {
          id: docId,
          reviewerName: base.reviewerName,
          roleEn: base.roleEn,
          roleHi: base.roleHi,
          rating: base.rating,
          textEn: base.textEn,
          textHi: base.textHi,
          avatarColor: base.avatarColor,
          approved: base.approved,
          createdDate: base.createdDate,
          updatedBy: base.updatedBy,
        };
        setReviews((prev) => {
          const exists = prev.some((r) => r.id === docId);
          const next = exists
            ? prev.map((r) => (r.id === docId ? savedReview : r))
            : [savedReview, ...prev];
          return next.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        });
      } catch (error) {
        handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `reviews/${docId}`);
      }
    },
    []
  );

  const toggleReviewApproval = useCallback(
    async (item: Review) => {
      await saveReview({ ...item, approved: !item.approved }, false);
    },
    [saveReview]
  );

  const deleteReview = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `reviews/${id}`);
    }
  }, []);

  const submitEnquiry = useCallback(
    async (payload: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      sourceType: 'contact' | 'product_enquiry';
      consentAccepted: boolean;
    }): Promise<{ receiptId: string }> => {
      // 1. Server-side validation & sanitization
      const res = await fetch('/api/contact/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        valid: boolean;
        receiptId?: string;
        errors?: Record<string, string>;
        normalized?: {
          name: string;
          email: string;
          phone: string;
          subject: string;
          message: string;
          sourceType: 'contact' | 'product_enquiry';
          consentAccepted: boolean;
        };
      };

      if (!res.ok || !data.valid || !data.normalized || !data.receiptId) {
        const firstErr = data.errors ? Object.values(data.errors)[0] : 'Validation failed.';
        throw new Error(firstErr);
      }

      // 2. Persist directly to Firestore enquiries collection with serverTimestamp
      const enquiryId = `enq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      try {
        await setDoc(doc(db, 'enquiries', enquiryId), {
          ...data.normalized,
          status: 'new',
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `enquiries/${enquiryId}`);
      }

      return { receiptId: data.receiptId };
    },
    []
  );

  const updateEnquiryStatus = useCallback(async (id: string, status: EnquiryStatus) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), { status });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
    }
  }, []);

  const deleteEnquiry = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `enquiries/${id}`);
    }
  }, []);

  const saveSiteSettings = useCallback(async (settings: SiteSettings) => {
    if (!auth.currentUser) throw new Error('Admin authentication required.');
    const normalized = normalizeSiteSettings({
      ...settings,
      phone: settings.phone.trim(),
      whatsapp: settings.whatsapp.trim(),
      email: (settings.email || DEFAULT_SITE_SETTINGS.email).trim(),
    });
    try {
      await setDoc(doc(db, 'siteSettings', 'global'), {
        ...normalized,
        updatedBy: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      });
      setSiteSettings(normalized);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteSettings/global');
    }
  }, []);

  const uploadAdminFile = useCallback(async (file: File): Promise<string> => {
    if (!auth.currentUser) throw new Error('Admin login required for uploads.');
    const token = await auth.currentUser.getIdToken();
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const json = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !json.url) {
      throw new Error(json.error || 'File upload failed.');
    }
    return json.url;
  }, []);

  const value = useMemo<DataContextValue>(
    () => ({
      loading,
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
      refreshPublicData,
      refreshAdminData,
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
      submitEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      saveSiteSettings,
      uploadAdminFile,
    }),
    [
      loading,
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
      refreshPublicData,
      refreshAdminData,
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
      submitEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      saveSiteSettings,
      uploadAdminFile,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
