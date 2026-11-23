import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const ROOT_DIR = process.cwd();
const UPLOADS_DIR = path.resolve(ROOT_DIR, 'public/uploads');

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Static canonical routes for dynamic sitemap.xml
const SITEMAP_PATHS = [
  '/',
  '/about',
  '/medicines',
  '/medicines/paracetamol',
  '/medicines/metformin',
  '/medicines/amlodipine',
  '/medicines/atorvastatin',
  '/medicines/omeprazole',
  '/medicines/amoxicillin',
  '/medicines/cetirizine',
  '/medicines/oral-rehydration-salts',
  '/health-awareness',
  '/health-awareness/understanding-blood-pressure-readings',
  '/health-awareness/heart-friendly-indian-nutrition',
  '/health-awareness/understanding-type-2-diabetes-screening',
  '/health-awareness/cholesterol-lipid-profile-guide',
  '/health-awareness/essential-home-first-aid-guide',
  '/health-awareness/safe-medicine-use-antibiotic-stewardship',
  '/pharmacy-education',
  '/products',
  '/products/digital-upper-arm-bp-monitor',
  '/products/fingertip-pulse-oximeter',
  '/products/non-contact-infrared-thermometer',
  '/products/home-first-aid-emergency-kit',
  '/products/digital-blood-glucose-monitor',
  '/products/stainless-medical-pill-organizer',
  '/contact',
  '/medical-disclaimer',
  '/privacy-policy',
  '/terms',
];

function sanitizeText(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

// Generate a standards-compliant minimal PDF 1.4 study guide on the fly
function createStudyGuidePdfBuffer(title: string, subject: string, lines: string[]): Buffer {
  const escapePdf = (text: string) =>
    text
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');

  const wrappedLines: string[] = [
    "VED'S MEDCARE - PHARMACY EDUCATION STUDY SHEET",
    `Subject: ${subject}`,
    `Topic: ${title}`,
    'Founder: Devendra Azad | Bhopal, Madhya Pradesh, India | +91 6266120486 | vedsmedcare@gmail.com',
    '----------------------------------------------------------------------',
    '',
  ];

  for (const rawLine of lines) {
    const clean = escapePdf(rawLine);
    const words = clean.split(/\s+/);
    let current = '';
    for (const w of words) {
      if ((current + ' ' + w).trim().length > 78) {
        wrappedLines.push(current.trim());
        current = w;
      } else {
        current = (current + ' ' + w).trim();
      }
    }
    if (current) wrappedLines.push(current);
    wrappedLines.push('');
  }

  wrappedLines.push('----------------------------------------------------------------------');
  wrappedLines.push('Educational Notice: Prepared as original D.Pharm study reference by');
  wrappedLines.push("Ved's Medcare. Consult official Indian Pharmacopoeia (IP) & faculty");
  wrappedLines.push('laboratory manuals for syllabus-specific assessments.');

  const pageLines = wrappedLines.slice(0, 44);
  const textCommands = [
    'BT',
    '/F1 11 Tf',
    '50 760 Td',
    '15 TL',
    ...pageLines.map((line, i) => `${i === 0 ? '' : 'T* '}(${escapePdf(line)}) Tj`),
    'ET',
  ].join('\n');

  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n'
  );
  objects.push(
    `4 0 obj\n<< /Length ${Buffer.byteLength(textCommands, 'utf8')} >>\nstream\n${textCommands}\nendstream\nendobj\n`
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }
  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf8');
}

const STUDY_SHEET_SUMMARIES: Record<string, { title: string; subject: string; lines: string[] }> = {
  'compressed-tablets-formulation': {
    title: 'Compressed Tablets: Formulation, Excipients & IP Quality Tests',
    subject: 'Pharmaceutics',
    lines: [
      '1. Definition: Tablets are solid unit dosage forms containing medicaments with or without suitable excipients, prepared by compression or moulding.',
      '2. Core Excipients: Diluents (Lactose, MCC), Binders (Starch paste, PVP), Disintegrants (Sodium starch glycolate), Lubricants (Magnesium stearate), Glidants (Talc).',
      '3. Manufacturing Methods: Wet Granulation (for thermostable, moisture-tolerant APIs), Dry Granulation / Slugging (for moisture-sensitive APIs), Direct Compression.',
      '4. IP Quality Control Tests: Weight Variation (20 tablets), Hardness (Monsanto/Pfizer tester), Friability (Roche friabilator, <= 1.0% weight loss), Disintegration Time, Dissolution.',
    ],
  },
  'pharmacokinetics-adme': {
    title: 'Pharmacokinetics: Absorption, Distribution, Metabolism & Excretion (ADME)',
    subject: 'Pharmacology',
    lines: [
      '1. Absorption: Transfer of drug from site of administration to systemic circulation. Bioavailability (F) is 100% for IV route.',
      '2. Distribution: Reversible transfer between blood and tissues; influenced by plasma protein binding (albumin, alpha-1 acid glycoprotein) and blood-brain barrier.',
      '3. Metabolism (Biotransformation): Primarily hepatic via Phase I (oxidation, reduction, hydrolysis - CYP450) and Phase II (glucuronidation, sulfation, acetylation).',
      '4. Excretion: Renal elimination via glomerular filtration, active tubular secretion, and passive tubular reabsorption; biliary excretion for large polar conjugates.',
    ],
  },
  'crude-drugs-classification': {
    title: 'Classification & Evaluation of Crude Drugs of Natural Origin',
    subject: 'Pharmacognosy',
    lines: [
      '1. Systems of Classification: Alphabetical, Taxonomical, Morphological (organized vs unorganized), Pharmacological, Chemical (alkaloids, glycosides, tannins, volatile oils).',
      '2. Quality Evaluation Methods: Organoleptic, Microscopic (stomatal number, vein-islet number), Physical (ash values, extractive values), Chemical, and Biological evaluation.',
      '3. Classic Examples: Senna (Anthraquinone glycoside - laxative), Digitalis (Cardiac glycoside), Cinchona (Quinoline alkaloids), Clove (Volatile oil - Eugenol).',
    ],
  },
  'limit-tests-chloride-sulphate': {
    title: 'Limit Tests for Chlorides & Sulphates (Indian Pharmacopoeia)',
    subject: 'Pharmaceutical Chemistry',
    lines: [
      '1. Purpose: Quantitative or semi-quantitative test designed to identify and control small quantities of inorganic impurities in pharmaceutical substances.',
      '2. Chloride Limit Test Principle: Reaction of soluble chloride with silver nitrate (AgNO3) in presence of dilute HNO3 yielding opalescence of AgCl compared against standard.',
      '3. Sulphate Limit Test Principle: Reaction of soluble sulphate with barium chloride (BaCl2) in presence of dilute HCl yielding turbidity of BaSO4.',
      '4. Practical Tip: Use matched Nessler cylinders and view turbidity against a dark background immediately after 5 minutes standing time.',
    ],
  },
  'cardiovascular-nephron-physiology': {
    title: 'Human Cardiovascular System & Renal Nephron Filtration',
    subject: 'Human Anatomy and Physiology',
    lines: [
      '1. Cardiac Conduction Pathway: SA Node (pacemaker) -> AV Node -> Bundle of His -> Purkinje Fibers.',
      '2. Blood Pressure Physiology: BP = Cardiac Output (CO) x Total Peripheral Resistance (TPR). Normal resting reference in adults is generally <120/80 mmHg.',
      '3. Nephron Structure: Renal corpuscle (Glomerulus + Bowman capsule), Proximal Convoluted Tubule, Loop of Henle, Distal Convoluted Tubule, Collecting Duct.',
      '4. Urine Formation Steps: Glomerular ultrafiltration (~125 mL/min GFR), selective tubular reabsorption, and active tubular secretion.',
    ],
  },
  'carbohydrates-enzymes-biochemistry': {
    title: 'Carbohydrates, Enzymes & Clinical Biochemistry Fundamentals',
    subject: 'Biochemistry',
    lines: [
      '1. Carbohydrates: Polyhydroxy aldehydes or ketones classified into Monosaccharides (Glucose), Disaccharides (Sucrose, Lactose), and Polysaccharides (Starch, Glycogen).',
      '2. Glycolysis (Embden-Meyerhof Pathway): Cytosolic breakdown of glucose to pyruvate (aerobic) or lactate (anaerobic) yielding net 2 ATP.',
      '3. Enzyme Kinetics: Michaelis-Menten equation defines Km (substrate concentration at half Vmax) and competitive vs non-competitive inhibition.',
      '4. Clinical Relevance: Fasting blood glucose, HbA1c, lipid profile, liver transaminases (ALT/AST), and serum creatinine help monitor metabolic health.',
    ],
  },
  'community-pharmacy-dispensing': {
    title: 'Good Pharmacy Practice, Prescription Handling & Patient Counselling',
    subject: 'Community Pharmacy',
    lines: [
      '1. Parts of a Prescription: Superscription (Rx), Inscription (drug names & strengths), Subscription (dispensing directions), Signatura (patient instructions), Prescriber signature.',
      '2. Dispensing Steps: Receive & validate prescription -> Check drug interactions & clarity -> Select & label accurately -> Double-check -> Counsel patient.',
      '3. Patient Counselling Essentials: Medicine purpose, timing with/without food, course completion (especially antibiotics), storage temperature, and when to contact a doctor.',
    ],
  },
  'hospital-pharmacy-formulary': {
    title: 'Hospital Pharmacy Organization, P&T Committee & Drug Distribution',
    subject: 'Hospital and Clinical Pharmacy',
    lines: [
      '1. Pharmacy & Therapeutics (P&T) Committee: Advisory body linking medical staff and pharmacy to maintain the Hospital Formulary and promote rational drug use.',
      '2. Inpatient Distribution Systems: Individual Prescription Order, Complete Floor Stock, Combined System, and Unit Dose Drug Distribution System (UDDS).',
      '3. Pharmacovigilance: Identifying, documenting, and reporting Adverse Drug Reactions (ADRs) to PvPI (Pharmacovigilance Programme of India).',
    ],
  },
  'simple-syrup-ip-practical': {
    title: 'Practical Experiment: Preparation & Evaluation of Simple Syrup IP',
    subject: 'Practical Experiments',
    lines: [
      '1. Aim: To prepare and submit 100 mL of Simple Syrup IP (66.7% w/w sucrose in purified water).',
      '2. Formula: Sucrose 66.7 g, Purified Water q.s. to 100 g.',
      '3. Procedure: Weigh sucrose accurately, add to warm purified water in a beaker with gentle stirring until completely dissolved. Cool, adjust final weight, filter through muslin cloth.',
      '4. Storage & Labelling: Store in a well-closed amber bottle in a cool place. Label clearly with preparation name, date, and storage instructions.',
    ],
  },
  'dpharm-important-viva-questions': {
    title: 'D.Pharm High-Yield Important Questions & Viva Preparation Bank',
    subject: 'Important Questions',
    lines: [
      '1. Q: Why is dilute nitric acid added in the chloride limit test? A: To prevent precipitation of other acid radicals like carbonates and phosphates as silver salts.',
      '2. Q: Define Bioavailability. A: The rate and extent to which an active drug reaches systemic circulation in unchanged form.',
      '3. Q: What is the difference between antiseptic and disinfectant? A: Antiseptics are applied to living tissues; disinfectants are used on inanimate surfaces.',
      '4. Q: What does Schedule H mean under India Drugs & Cosmetics Rules? A: Prescription-only medicines that must be sold strictly against a registered medical practitioner prescription.',
    ],
  },
};

function verifyFileMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 4) return false;
  if (mimeType === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimeType === 'image/png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }
  if (mimeType === 'image/webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    );
  }
  if (mimeType === 'application/pdf') {
    return buffer.subarray(0, 4).toString('ascii') === '%PDF';
  }
  return false;
}

const ALLOWED_MIME_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB max (PDF); images checked <= 3MB below
    files: 1,
  },
});

async function startServer() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '512kb' }));

  // Baseline security headers (iframe-compatible for AI Studio preview)
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // Serve uploaded assets safely
  app.use(
    '/uploads',
    express.static(UPLOADS_DIR, {
      fallthrough: false,
      setHeaders: (res, filePath) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        if (filePath.endsWith('.pdf')) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline');
        }
      },
    })
  );

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: "Ved's Medcare API", timestamp: new Date().toISOString() });
  });

  // SEO robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    const cleanBase = baseUrl.replace(/\/$/, '');
    res.type('text/plain').send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        'Disallow: /api/',
        `Sitemap: ${cleanBase}/sitemap.xml`,
        '',
      ].join('\n')
    );
  });

  // SEO dynamic sitemap.xml
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(
      /\/$/,
      ''
    );
    const today = new Date().toISOString().slice(0, 10);
    const entries = SITEMAP_PATHS.map(
      (p) =>
        `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`
    ).join('\n');
    res
      .type('application/xml')
      .send(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
      );
  });

  // Real downloadable PDF study sheets for Pharmacy Education
  app.get('/api/study-sheet/:slug.pdf', (req: Request, res: Response) => {
    const slug = sanitizeText(req.params.slug, 120).replace(/[^a-z0-9-]/gi, '');
    const sheet = STUDY_SHEET_SUMMARIES[slug] || {
      title: slug.replace(/-/g, ' ').toUpperCase() || 'D.Pharm Study Resource',
      subject: 'Pharmacy Education',
      lines: [
        "Original bilingual D.Pharm study reference published by Ved's Medcare.",
        'Review full English and Hindi notes, definitions, and practical steps on the Pharmacy Education portal.',
      ],
    };
    const buffer = createStudyGuidePdfBuffer(sheet.title, sheet.subject, sheet.lines);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="veds-medcare-${slug || 'study-guide'}.pdf"`
    );
    res.send(buffer);
  });

  // Server-side Contact / Enquiry Validation Endpoint
  app.post('/api/contact/validate', (req: Request, res: Response) => {
    const body = req.body || {};
    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 160);
    const phone = sanitizeText(body.phone, 24);
    const subject = sanitizeText(body.subject, 180);
    const message = sanitizeText(body.message, 3000);
    const sourceType = body.sourceType === 'product_enquiry' ? 'product_enquiry' : 'contact';
    const consentAccepted = body.consentAccepted === true;

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Valid email address is required.';
    const digits = phone.replace(/[\s+\-()]/g, '');
    if (phone.length < 7 || !/^\d{7,15}$/.test(digits)) {
      errors.phone = 'Valid phone number (7–15 digits) is required.';
    }
    if (subject.length < 2) errors.subject = 'Subject must be at least 2 characters.';
    if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
    if (!consentAccepted) errors.consentAccepted = 'Privacy consent is required.';

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ valid: false, errors });
      return;
    }

    const receiptId = `VM-${Date.now().toString(36).toUpperCase()}-${crypto
      .randomBytes(2)
      .toString('hex')
      .toUpperCase()}`;

    res.json({
      valid: true,
      receiptId,
      normalized: {
        name,
        email,
        phone,
        subject,
        message,
        sourceType,
        consentAccepted: true,
      },
    });
  });

  // Protected Admin File Upload Endpoint (Images & Educational PDFs)
  app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ') || authHeader.length < 40) {
      res.status(401).json({ error: 'Admin authentication token required for file uploads.' });
      return;
    }

    // Basic JWT structural validation (header.payload.signature) from Firebase ID token
    const tokenParts = authHeader.slice(7).split('.');
    if (tokenParts.length !== 3) {
      res.status(401).json({ error: 'Invalid authentication token format.' });
      return;
    }

    try {
      const payloadJson = Buffer.from(tokenParts[1], 'base64url').toString('utf8');
      const payload = JSON.parse(payloadJson) as {
        email_verified?: boolean;
        exp?: number;
        aud?: string;
      };
      if (!payload.email_verified) {
        res.status(403).json({ error: 'Verified admin email required.' });
        return;
      }
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        res.status(401).json({ error: 'Session token expired. Please sign in again.' });
        return;
      }
    } catch {
      res.status(401).json({ error: 'Malformed session token.' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    const ext = ALLOWED_MIME_EXT[file.mimetype];
    if (!ext) {
      res.status(400).json({ error: 'Only JPEG, PNG, WebP images and PDF files are permitted.' });
      return;
    }

    if (file.mimetype.startsWith('image/') && file.size > 3 * 1024 * 1024) {
      res.status(400).json({ error: 'Image size must not exceed 3 MB.' });
      return;
    }

    if (!verifyFileMagicBytes(file.buffer, file.mimetype)) {
      res.status(400).json({ error: 'Uploaded file signature does not match declared file type.' });
      return;
    }

    const safeName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    const targetPath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(targetPath, file.buffer);

    res.json({
      ok: true,
      url: `/uploads/${safeName}`,
      mimeType: file.mimetype,
      size: file.size,
    });
  });

  // Upload error middleware
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err && err.name === 'MulterError') {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(ROOT_DIR, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ved's Medcare server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
