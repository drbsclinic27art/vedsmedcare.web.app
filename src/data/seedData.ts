import type {
  Article,
  CategoryItem,
  Medicine,
  PharmacyNote,
  Product,
  Review,
  SiteSettings,
} from '../types/medcare';

export const BRAND_IMAGES = {
  hero: '/src/assets/images/hero_medcare_pharmacy_1795162513804.jpg',
  heartHealth: '/src/assets/images/blog_heart_health_1795162512355.jpg',
  diabetesNutrition: '/src/assets/images/blog_diabetes_nutrition_1795162513067.jpg',
  pharmacyLab: '/src/assets/images/pharmacy_education_lab_1795162514693.jpg',
  productsEssentials: '/src/assets/images/products_healthcare_essentials_1795162514726.jpg',
  ogCard: '/src/assets/images/og_social_card_1795162514797.jpg',
} as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: "Ved's Medcare",
  founderName: 'Devendra Azad',
  phone: '+91 6266120486',
  whatsapp: '+91 6266120486',
  email: 'vedsmedcare@gmail.com',
  locationEn: 'Bhopal, Madhya Pradesh, India',
  locationHi: 'भोपाल, मध्य प्रदेश, भारत',
  instagramHandle: '@vedsmedcare',
  instagramUrl: 'https://www.instagram.com/vedsmedcare/',
  seoTitleEn: "Ved's Medcare — Your Trusted Healthcare Partner | Medicine Info & Pharmacy Education",
  seoTitleHi: 'वेद’स मेडकेयर — विश्वसनीय दवा जानकारी, स्वास्थ्य जागरूकता और फार्मेसी शिक्षा',
  seoDescriptionEn:
    "Reliable bilingual (Hindi & English) medicine information, preventive health awareness articles, D.Pharm study notes, and healthcare product guides by Ved's Medcare, Bhopal.",
  seoDescriptionHi:
    'हिंदी और अंग्रेज़ी में विश्वसनीय दवा जानकारी, स्वास्थ्य जागरूकता लेख, D.Pharm फार्मेसी नोट्स और हेल्थकेयर उत्पाद कैटलॉग।',
  googleAnalyticsId: '',
  googleSearchConsoleCode: '',
};

export const BLOG_CATEGORIES = [
  { nameEn: 'Heart Health', nameHi: 'हृदय स्वास्थ्य' },
  { nameEn: 'Cholesterol', nameHi: 'कोलेस्ट्रॉल' },
  { nameEn: 'Blood Pressure', nameHi: 'ब्लड प्रेशर' },
  { nameEn: 'Diabetes', nameHi: 'मधुमेह (डायबिटीज़)' },
  { nameEn: 'Nutrition', nameHi: 'पोषण एवं आहार' },
  { nameEn: 'General Health', nameHi: 'सामान्य स्वास्थ्य' },
  { nameEn: 'First Aid', nameHi: 'प्राथमिक उपचार' },
  { nameEn: 'Medicine Awareness', nameHi: 'दवा जागरूकता' },
  { nameEn: 'Preventive Healthcare', nameHi: 'निवारक स्वास्थ्य देखभाल' },
  { nameEn: 'Healthy Lifestyle', nameHi: 'स्वस्थ जीवनशैली' },
] as const;

export const PHARMACY_SUBJECTS = [
  { nameEn: 'Pharmaceutics', nameHi: 'फार्मास्यूटिक्स' },
  { nameEn: 'Pharmacology', nameHi: 'फार्माकोलॉजी' },
  { nameEn: 'Pharmacognosy', nameHi: 'फार्माकोग्नॉसी' },
  { nameEn: 'Pharmaceutical Chemistry', nameHi: 'फार्मास्यूटिकल केमिस्ट्री' },
  { nameEn: 'Human Anatomy and Physiology', nameHi: 'मानव शरीर रचना एवं क्रिया विज्ञान' },
  { nameEn: 'Biochemistry', nameHi: 'बायोकेमिस्ट्री' },
  { nameEn: 'Community Pharmacy', nameHi: 'कम्युनिटी फार्मेसी' },
  { nameEn: 'Hospital and Clinical Pharmacy', nameHi: 'हॉस्पिटल एवं क्लिनिकल फार्मेसी' },
  { nameEn: 'Practical Experiments', nameHi: 'प्रैक्टिकल प्रयोग' },
  { nameEn: 'Important Questions', nameHi: 'महत्वपूर्ण प्रश्न' },
  { nameEn: 'Viva Questions', nameHi: 'वाइवा प्रश्न' },
  { nameEn: 'Study Notes', nameHi: 'अध्ययन नोट्स' },
  { nameEn: 'PDF Resources', nameHi: 'PDF संसाधन' },
] as const;

export const PRODUCT_CATEGORIES = [
  { nameEn: 'Healthcare Equipment', nameHi: 'हेल्थकेयर उपकरण' },
  { nameEn: 'First Aid Products', nameHi: 'प्राथमिक उपचार उत्पाद' },
  { nameEn: 'Personal Care', nameHi: 'पर्सनल केयर' },
  { nameEn: 'Medical Accessories', nameHi: 'मेडिकल एक्सेसरीज़' },
  { nameEn: 'Healthcare Essentials', nameHi: 'हेल्थकेयर आवश्यक वस्तुएँ' },
] as const;

export const SEED_CATEGORIES: CategoryItem[] = [
  ...BLOG_CATEGORIES.map((c, idx) => ({
    id: `blog-cat-${idx + 1}`,
    domain: 'blog' as const,
    nameEn: c.nameEn,
    nameHi: c.nameHi,
    published: true,
  })),
  ...PRODUCT_CATEGORIES.map((c, idx) => ({
    id: `prod-cat-${idx + 1}`,
    domain: 'product' as const,
    nameEn: c.nameEn,
    nameHi: c.nameHi,
    published: true,
  })),
];

export const SEED_MEDICINES: Medicine[] = [
  {
    id: 'paracetamol',
    slug: 'paracetamol',
    nameEn: 'Paracetamol (Acetaminophen)',
    nameHi: 'पैरासिटामोल (एसिटामिनोफेन)',
    genericName: 'Paracetamol',
    brandNames: ['Dolo', 'Calpol', 'Crocin', 'Pacimol'],
    drugCategory: 'Analgesic & Antipyretic',
    therapeuticCategory: 'Pain & Fever',
    classificationEn: 'Para-aminophenol derivative; Non-opioid analgesic & antipyretic',
    classificationHi: 'पैरा-अमीनोफिनोल व्युत्पन्न; नॉन-ओपिओइड दर्द निवारक एवं ज्वरनाशक',
    usesEn:
      'Commonly used for temporary relief of mild to moderate pain (such as headache, muscle ache, toothache, or menstrual discomfort) and to reduce fever associated with common infections. Always follow package directions or a clinician’s advice.',
    usesHi:
      'हल्के से मध्यम दर्द (जैसे सिरदर्द, बदन दर्द, दाँत दर्द) से अस्थायी राहत और सामान्य बुखार कम करने में उपयोगी। उपयोग से पहले हमेशा लेबल या चिकित्सक के निर्देश का पालन करें।',
    mechanismEn:
      'Acts predominantly within the central nervous system by inhibiting cyclooxygenase (COX)-mediated prostaglandin synthesis, elevating the pain threshold and acting on the hypothalamic heat-regulating center to lower fever.',
    mechanismHi:
      'यह मुख्य रूप से केंद्रीय तंत्रिका तंत्र में प्रोस्टाग्लैंडीन संश्लेषण को कम करके दर्द की संवेदनशीलता घटाता है और मस्तिष्क के तापमान नियंत्रण केंद्र (हाइपोथैलेमस) पर कार्य कर बुखार कम करता है।',
    sideEffectsEn:
      'Generally well tolerated at appropriate therapeutic doses. Rare adverse reactions include allergic skin rash, hives, or blood dyscrasias. Overdose poses a serious risk of acute liver toxicity (hepatotoxicity).',
    sideEffectsHi:
      'सही निर्धारित मात्रा में सामान्यतः सुरक्षित रूप से सहनीय। दुर्लभ स्थितियों में त्वचा पर चकत्ते या एलर्जी हो सकती है। अधिक मात्रा (ओवरडोज़) लेने पर लिवर को गंभीर क्षति का खतरा होता है।',
    precautionsEn:
      'Check labels of all combination cold, flu, or pain medicines carefully to avoid accidentally doubling paracetamol intake. Exercise caution and consult a physician if you have chronic liver disease, regular alcohol use, or low body weight.',
    precautionsHi:
      'सर्दी-जुकाम या दर्द की अन्य मिश्रित दवाओं का लेबल अवश्य जांचें ताकि अनजाने में पैरासिटामोल की दोहरी मात्रा न ली जाए। लिवर रोग या नियमित शराब सेवन की स्थिति में डॉक्टर से परामर्श अनिवार्य है।',
    contraindicationsEn:
      'Known hypersensitivity to paracetamol; severe active hepatic impairment or acute liver failure.',
    contraindicationsHi:
      'पैरासिटामोल से ज्ञात एलर्जी (अतिसंवेदनशीलता); गंभीर सक्रिय लिवर विकार या एक्यूट लिवर फेल्योर।',
    storageEn: 'Store below 25°C–30°C in a dry place protected from direct sunlight and moisture. Keep out of reach of children.',
    storageHi: '25°C–30°C से कम तापमान पर सूखे स्थान में सीधी धूप और नमी से दूर रखें। बच्चों की पहुँच से बाहर रखें।',
    references: [
      'WHO Model List of Essential Medicines (23rd List)',
      'National Formulary of India (NFI), Indian Pharmacopoeia Commission',
      'MedlinePlus (U.S. National Library of Medicine): Acetaminophen',
    ],
    reviewDate: '2026-10-18',
    published: true,
  },
  {
    id: 'metformin',
    slug: 'metformin',
    nameEn: 'Metformin Hydrochloride',
    nameHi: 'मेटफॉर्मिन हाइड्रोक्लोराइड',
    genericName: 'Metformin Hydrochloride',
    brandNames: ['Glycomet', 'Cetapin', 'Obimet', 'Glucophage'],
    drugCategory: 'Biguanide',
    therapeuticCategory: 'Diabetes & Endocrine',
    classificationEn: 'Oral Antihyperglycemic Agent (Biguanide class)',
    classificationHi: 'ओरल एंटीहाइपरग्लाइसेमिक दवा (बाइगुआनाइड श्रेणी)',
    usesEn:
      'First-line prescription medicine used alongside individualized diet and physical activity to help improve blood glucose control in adults and eligible adolescents with Type 2 Diabetes Mellitus.',
    usesHi:
      'टाइप 2 मधुमेह (डायबिटीज़) में संतुलित आहार और नियमित व्यायाम के साथ रक्त शर्करा (ब्लड शुगर) नियंत्रित करने हेतु प्रयुक्त प्रमुख प्रिस्क्रिप्शन दवा।',
    mechanismEn:
      'Decreases hepatic glucose production (gluconeogenesis), reduces intestinal glucose absorption, and improves peripheral insulin sensitivity through activation of AMP-activated protein kinase (AMPK), without directly stimulating insulin secretion.',
    mechanismHi:
      'यह यकृत द्वारा अतिरिक्त ग्लूकोज निर्माण को कम करती है, आंतों में ग्लूकोज अवशोषण को घटाती है और शरीर की कोशिकाओं में इंसुलिन संवेदनशीलता बढ़ाती है।',
    sideEffectsEn:
      'Gastrointestinal symptoms such as nausea, mild abdominal discomfort, bloating, or loose stools are common when starting therapy and often improve when taken with meals. Long-term therapy may lower vitamin B12 levels.',
    sideEffectsHi:
      'शुरुआत में मतली, पेट में हल्का भारीपन, गैस या दस्त जैसे लक्षण हो सकते हैं, जो भोजन के साथ लेने पर अक्सर कम हो जाते हैं। लंबे समय तक उपयोग से विटामिन B12 का स्तर कम हो सकता है।',
    precautionsEn:
      'Periodic kidney function (eGFR/serum creatinine) and vitamin B12 monitoring are recommended by clinicians. Inform your doctor before medical imaging involving iodinated contrast dye or major surgical procedures.',
    precautionsHi:
      'चिकित्सक के निर्देशानुसार नियमित किडनी फंक्शन (eGFR) और विटामिन B12 की जांच आवश्यक है। किसी सर्जरी या कंट्रास्ट डाई स्कैन से पहले डॉक्टर को इस दवा के बारे में अवश्य बताएं।',
    contraindicationsEn:
      'Severe renal impairment (eGFR < 30 mL/min/1.73m²), acute or chronic metabolic acidosis (including diabetic ketoacidosis), and known hypersensitivity to metformin.',
    contraindicationsHi:
      'गंभीर किडनी विकार (eGFR < 30), एक्यूट या क्रोनिक मेटाबोलिक एसिडोसिस (डायबिटिक कीटोएसिडोसिस सहित), और दवा से ज्ञात एलर्जी।',
    storageEn: 'Store in tightly closed blister strips or container below 30°C away from heat and humidity.',
    storageHi: '30°C से कम तापमान पर नमी और गर्मी से सुरक्षित बंद पैक में रखें।',
    references: [
      'WHO Model List of Essential Medicines — Antidiabetic Agents',
      'National Formulary of India (NFI) — Endocrine System',
      'MedlinePlus / NIH: Metformin Monograph',
    ],
    reviewDate: '2026-10-22',
    published: true,
  },
  {
    id: 'amlodipine',
    slug: 'amlodipine',
    nameEn: 'Amlodipine Besylate',
    nameHi: 'एम्लोडिपिन बेसिलेट',
    genericName: 'Amlodipine',
    brandNames: ['Amlong', 'Stamlo', 'Amlokind', 'Amlovas'],
    drugCategory: 'Calcium Channel Blocker',
    therapeuticCategory: 'Cardiovascular & Blood Pressure',
    classificationEn: 'Long-acting Dihydropyridine Calcium Channel Blocker',
    classificationHi: 'दीर्घ-अवधि डाइहाइड्रोपाइरीडीन कैल्शियम चैनल ब्लॉकर',
    usesEn:
      'Prescribed for the management of essential hypertension (high blood pressure) to help lower cardiovascular risk, and for chronic stable or vasospastic angina under medical supervision.',
    usesHi:
      'उच्च रक्तचाप (हाई ब्लड प्रेशर) के प्रबंधन और क्रोनिक स्टेबल एंजाइना (सीने के दर्द) की रोकथाम के लिए चिकित्सकीय देखरेख में दी जाने वाली दवा।',
    mechanismEn:
      'Selectively inhibits transmembrane influx of calcium ions into vascular smooth muscle and cardiac muscle, relaxing peripheral arterial smooth muscle and lowering systemic vascular resistance.',
    mechanismHi:
      'यह रक्त वाहिकाओं की चिकनी मांसपेशियों में कैल्शियम आयनों के प्रवेश को नियंत्रित कर धमनियों को शिथिल (रिलैक्स) करती है, जिससे रक्तचाप कम होता है।',
    sideEffectsEn:
      'Peripheral ankle or foot swelling (edema), flushing, headache, mild dizziness, or fatigue may occur. Report persistent swelling, rapid heartbeat, or worsening chest discomfort to a physician.',
    sideEffectsHi:
      'टखनों या पैरों में हल्की सूजन (एडिमा), चेहरे पर गर्माहट, सिरदर्द, चक्कर या थकान महसूस हो सकती है। अधिक सूजन या सीने में तकलीफ होने पर तुरंत डॉक्टर से संपर्क करें।',
    precautionsEn:
      'Do not discontinue blood pressure medication abruptly without medical guidance. Patients with severe hepatic impairment or severe aortic stenosis require careful physician evaluation.',
    precautionsHi:
      'बिना डॉक्टर की सलाह के ब्लड प्रेशर की दवा अचानक बंद न करें। गंभीर लिवर रोग या हृदय वाल्व संकुचन (एओर्टिक स्टेनोसिस) में विशेष चिकित्सकीय निगरानी आवश्यक है।',
    contraindicationsEn:
      'Known hypersensitivity to dihydropyridines, severe hypotension, cardiogenic shock, or hemodynamically unstable heart failure after acute myocardial infarction.',
    contraindicationsHi:
      'डाइहाइड्रोपाइरीडीन वर्ग से एलर्जी, गंभीर निम्न रक्तचाप (हाइपोटेंशन), या कार्डियोजेनिक शॉक।',
    storageEn: 'Store below 25°C–30°C in original light-resistant packaging away from moisture.',
    storageHi: 'मूल प्रकाश-सुरक्षित पैकिंग में 25°C–30°C से कम तापमान पर सूखे स्थान में रखें।',
    references: [
      'WHO Guideline for Pharmacological Treatment of Hypertension in Adults',
      'National Formulary of India (NFI) — Cardiovascular Medicines',
      'NHS Medicines A–Z: Amlodipine',
    ],
    reviewDate: '2026-10-25',
    published: true,
  },
  {
    id: 'atorvastatin',
    slug: 'atorvastatin',
    nameEn: 'Atorvastatin Calcium',
    nameHi: 'एटोर्वास्टेटिन कैल्शियम',
    genericName: 'Atorvastatin',
    brandNames: ['Atorva', 'Lipikind', 'Storvas', 'Tonact'],
    drugCategory: 'Statin (Lipid-Lowering)',
    therapeuticCategory: 'Cardiovascular & Blood Pressure',
    classificationEn: 'HMG-CoA Reductase Inhibitor',
    classificationHi: 'HMG-CoA रिडक्टेस इनहिबिटर (स्टैटिन)',
    usesEn:
      'Used alongside heart-healthy lifestyle measures to lower elevated LDL cholesterol and triglycerides, and to reduce long-term risk of heart attack and stroke in individuals evaluated by a physician.',
    usesHi:
      'स्वस्थ आहार और जीवनशैली के साथ बढ़े हुए LDL कोलेस्ट्रॉल व ट्राइग्लिसराइड्स को कम करने तथा हृदय रोग के जोखिम को घटाने के लिए चिकित्सक द्वारा दी जाने वाली दवा।',
    mechanismEn:
      'Competitively inhibits HMG-CoA reductase, the rate-limiting hepatic enzyme in cholesterol biosynthesis, increasing liver LDL receptors and enhancing clearance of LDL cholesterol from blood.',
    mechanismHi:
      'यह यकृत में कोलेस्ट्रॉल निर्माण करने वाले प्रमुख एंजाइम HMG-CoA रिडक्टेस को अवरुद्ध करती है, जिससे रक्त से LDL कोलेस्ट्रॉल का स्तर कम होता है।',
    sideEffectsEn:
      'Mild muscle aches, joint discomfort, mild digestive upset, or headache can occur. Seek prompt medical evaluation for unexplained persistent muscle pain, tenderness, weakness, or dark urine.',
    sideEffectsHi:
      'हल्का मांसपेशियों या जोड़ों का दर्द, पेट की हल्की असुविधा या सिरदर्द हो सकता है। यदि बिना कारण तेज मांसपेशी दर्द, कमजोरी या गहरे रंग का पेशाब दिखे तो तुरंत डॉक्टर से मिलें।',
    precautionsEn:
      'Avoid excessive alcohol intake and large quantities of grapefruit juice while taking atorvastatin. Periodic lipid profile and liver enzyme tests may be advised by your doctor.',
    precautionsHi:
      'इस दवा के दौरान अत्यधिक शराब और अंगूर (ग्रेपफ्रूट) के अधिक जूस से बचें। डॉक्टर के निर्देशानुसार लिपिड प्रोफाइल और लिवर टेस्ट कराते रहें।',
    contraindicationsEn:
      'Active liver disease, unexplained persistent elevations in hepatic transaminases, pregnancy, breastfeeding, and hypersensitivity to atorvastatin.',
    contraindicationsHi:
      'सक्रिय लिवर रोग, गर्भावस्था, स्तनपान की अवधि और एटोर्वास्टेटिन से ज्ञात एलर्जी।',
    storageEn: 'Store at room temperature below 30°C in a dry place out of reach of children.',
    storageHi: 'कमरे के तापमान (30°C से कम) पर सूखे और सुरक्षित स्थान पर रखें।',
    references: [
      'National Formulary of India (NFI) — Lipid-Regulating Drugs',
      'MedlinePlus / NIH: Atorvastatin Information',
      'NHS Medicines A–Z: Atorvastatin',
    ],
    reviewDate: '2026-10-28',
    published: true,
  },
  {
    id: 'omeprazole',
    slug: 'omeprazole',
    nameEn: 'Omeprazole',
    nameHi: 'ओमेप्राज़ोल',
    genericName: 'Omeprazole',
    brandNames: ['Omez', 'Ocid', 'Lomac', 'Prilosec'],
    drugCategory: 'Proton Pump Inhibitor (PPI)',
    therapeuticCategory: 'Gastrointestinal & Acidity',
    classificationEn: 'Substituted Benzimidazole; Proton Pump Inhibitor',
    classificationHi: 'प्रोटॉन पंप इनहिबिटर (PPI) — पेट के अम्ल को कम करने वाली दवा',
    usesEn:
      'Used to reduce excess stomach acid in conditions such as gastroesophageal reflux disease (GERD), peptic ulcer disease, erosive esophagitis, and acid-related dyspepsia as guided by a physician.',
    usesHi:
      'पेट में अत्यधिक एसिड बनने की समस्या, एसिड रिफ्लक्स (GERD), पेप्टिक अल्सर और अम्लता (एसिडिटी) के उपचार में चिकित्सक के निर्देशानुसार प्रयुक्त।',
    mechanismEn:
      'Irreversibly inhibits the H+/K+-ATPase enzyme system (proton pump) at the secretory surface of gastric parietal cells, suppressing both basal and meal-stimulated gastric acid secretion.',
    mechanismHi:
      'यह पेट की पैराइटल कोशिकाओं में मौजूद H+/K+-ATPase प्रोटॉन पंप को अवरुद्ध कर अम्ल (एसिड) के स्राव को कम करती है।',
    sideEffectsEn:
      'Headache, mild nausea, abdominal discomfort, constipation, or flatulence. Prolonged unsupervised use may be associated with low magnesium, low vitamin B12, or increased bone fracture risk.',
    sideEffectsHi:
      'सिरदर्द, हल्की मतली, पेट में गैस या कब्ज हो सकता है। बिना चिकित्सकीय समीक्षा के लंबे समय तक लगातार सेवन से मैग्नीशियम या विटामिन B12 की कमी हो सकती है।',
    precautionsEn:
      'Swallow enteric-coated capsules whole without crushing or chewing. Consult a doctor if heartburn persists beyond two weeks or is accompanied by unintentional weight loss or difficulty swallowing.',
    precautionsHi:
      'एंटरिक-कोटेड कैप्सूल को बिना तोड़े या चबाए पूरा निगलें। यदि सीने में जलन दो सप्ताह से अधिक रहे या निगलने में कठिनाई हो तो चिकित्सक को दिखाएं।',
    contraindicationsEn:
      'Known hypersensitivity to omeprazole or other substituted benzimidazoles; concomitant use with rilpivirine-containing products.',
    contraindicationsHi:
      'ओमेप्राज़ोल या अन्य प्रोटॉन पंप इनहिबिटर से ज्ञात एलर्जी।',
    storageEn: 'Store below 25°C in moisture-resistant strips; protect from light and humidity.',
    storageHi: 'नमी-रोधी स्ट्रिप में 25°C से कम तापमान पर प्रकाश से दूर रखें।',
    references: [
      'WHO Model List of Essential Medicines — Gastrointestinal Medicines',
      'National Formulary of India (NFI) — Anti-ulcer Medicines',
      'MedlinePlus / NIH: Omeprazole',
    ],
    reviewDate: '2026-11-01',
    published: true,
  },
  {
    id: 'amoxicillin',
    slug: 'amoxicillin',
    nameEn: 'Amoxicillin',
    nameHi: 'एमोक्सिसिलिन',
    genericName: 'Amoxicillin Trihydrate',
    brandNames: ['Mox', 'Novamox', 'Almox', 'Cipmox'],
    drugCategory: 'Penicillin Antibiotic',
    therapeuticCategory: 'Infectious Diseases (Prescription Only)',
    classificationEn: 'Broad-spectrum Beta-lactam Aminopenicillin Antibiotic',
    classificationHi: 'ब्रॉड-स्पेक्ट्रम बीटा-लैक्टम पेनिसिलिन एंटीबायोटिक',
    usesEn:
      'Prescription-only antibiotic used for susceptible bacterial infections such as certain respiratory tract, ear, throat, dental, or urinary tract infections. Ineffective against viral illnesses like the common cold or flu.',
    usesHi:
      'केवल डॉक्टर के प्रिस्क्रिप्शन पर जीवाणु (बैक्टीरियल) संक्रमण जैसे श्वसन, कान, गले या दाँत के कुछ संक्रमणों में प्रयुक्त। यह सामान्य वायरल सर्दी-जुकाम में काम नहीं करती।',
    mechanismEn:
      'Inhibits bacterial cell wall mucopeptide biosynthesis by binding to penicillin-binding proteins (PBPs), leading to cell wall weakening and bacterial lysis.',
    mechanismHi:
      'यह जीवाणु की कोशिका भित्ति (सेल वॉल) के निर्माण को अवरुद्ध करती है, जिससे संक्रमण फैलाने वाले संवेदनशील बैक्टीरिया नष्ट हो जाते हैं।',
    sideEffectsEn:
      'Mild diarrhea, nausea, or mild skin rash. Stop and seek urgent medical care if signs of severe allergic reaction (facial swelling, hives, wheezing) or severe watery diarrhea develop.',
    sideEffectsHi:
      'हल्के दस्त, मतली या त्वचा पर चकत्ते हो सकते हैं। चेहरे/होंठ में सूजन, सांस लेने में कठिनाई या गंभीर एलर्जी के लक्षण दिखें तो तुरंत आपातकालीन चिकित्सा सहायता लें।',
    precautionsEn:
      'Never self-medicate with antibiotics. Always complete the full prescribed course as directed by a registered medical practitioner to prevent antimicrobial resistance (AMR).',
    precautionsHi:
      'एंटीबायोटिक दवाएँ कभी भी स्वयं न लें। एंटीबायोटिक प्रतिरोध (AMR) से बचने के लिए डॉक्टर द्वारा निर्धारित पूरा कोर्स अवश्य पूरा करें।',
    contraindicationsEn:
      'History of serious hypersensitivity or anaphylaxis to penicillins, amoxicillin, or other beta-lactam antibiotics; history of amoxicillin-associated cholestatic jaundice.',
    contraindicationsHi:
      'पेनिसिलिन या बीटा-लैक्टम एंटीबायोटिक से गंभीर एलर्जी (एनाफिलेक्सिस) का इतिहास।',
    storageEn: 'Store dry capsules/tablets below 25°C away from moisture. Reconstituted pediatric suspensions must follow label refrigeration and discard timelines.',
    storageHi: 'सूखे कैप्सूल/टैबलेट 25°C से कम तापमान पर नमी से दूर रखें। घोलने वाले सिरप के लिए लेबल पर लिखे भंडारण निर्देश मानें।',
    references: [
      'WHO AWaRe Antibiotic Book (Access Group)',
      'National Formulary of India (NFI) — Antibacterials',
      'CDSCO / India Schedule H1 Antibiotic Awareness',
    ],
    reviewDate: '2026-11-03',
    published: true,
  },
  {
    id: 'cetirizine',
    slug: 'cetirizine',
    nameEn: 'Cetirizine Dihydrochloride',
    nameHi: 'सिटिरीज़ीन डाइहाइड्रोक्लोराइड',
    genericName: 'Cetirizine',
    brandNames: ['Cetzine', 'Alerid', 'Okacet', 'Zyrtec'],
    drugCategory: 'Antihistamine (H1 Blocker)',
    therapeuticCategory: 'Allergy & Respiratory',
    classificationEn: 'Second-Generation Non-Sedating Peripheral H1-Receptor Antagonist',
    classificationHi: 'द्वितीय-पीढ़ी H1-रिसेप्टर एंटीहिस्टामाइन',
    usesEn:
      'Commonly used for symptomatic relief of allergic rhinitis (sneezing, runny nose, itchy or watery eyes) and chronic idiopathic urticaria (hives).',
    usesHi:
      'एलर्जिक राइनाइटिस (छींक आना, नाक बहना, आँखों में खुजली/पानी) और पित्ती (अर्टिकेरिया) के लक्षणों से राहत के लिए उपयोगी।',
    mechanismEn:
      'Selectively antagonizes peripheral histamine H1 receptors with minimal penetration across the blood-brain barrier compared to first-generation antihistamines.',
    mechanismHi:
      'यह शरीर में एलर्जी उत्पन्न करने वाले हिस्टामाइन के परिधीय H1 रिसेप्टर्स को अवरुद्ध करती है, जिससे खुजली और छींक कम होती है।',
    sideEffectsEn:
      'Mild drowsiness or fatigue in some individuals, dry mouth, or mild headache. Avoid driving or operating heavy machinery until you know how it affects alertness.',
    sideEffectsHi:
      'कुछ लोगों में हल्की नींद, थकान या मुँह सूखना हो सकता है। जब तक इसका प्रभाव समझ न लें, वाहन या भारी मशीनरी चलाने में सावधानी बरतें।',
    precautionsEn:
      'Patients with reduced kidney function require dose interval adjustment by a physician. Avoid combining with alcohol or central nervous system depressants.',
    precautionsHi:
      'किडनी की समस्या होने पर चिकित्सक से सही खुराक अंतराल अवश्य पूछें। शराब या नींद लाने वाली अन्य दवाओं के साथ न लें।',
    contraindicationsEn:
      'Known hypersensitivity to cetirizine, hydroxyzine, or piperazine derivatives; end-stage renal disease without specialist supervision.',
    contraindicationsHi:
      'सिटिरीज़ीन या हाइड्रॉक्सीज़ीन से ज्ञात एलर्जी; गंभीर अंतिम चरण की किडनी बीमारी।',
    storageEn: 'Store below 30°C in a dry place protected from light.',
    storageHi: '30°C से कम तापमान पर सूखे स्थान में प्रकाश से बचाकर रखें।',
    references: [
      'National Formulary of India (NFI) — Antiallergics',
      'MedlinePlus / NIH: Cetirizine',
      'NHS Medicines A–Z: Cetirizine',
    ],
    reviewDate: '2026-11-05',
    published: true,
  },
  {
    id: 'oral-rehydration-salts',
    slug: 'oral-rehydration-salts',
    nameEn: 'Oral Rehydration Salts (WHO Low-Osmolarity ORS)',
    nameHi: 'ओरल रिहाइड्रेशन सॉल्ट्स (WHO लो-ऑस्मोलैरिटी ORS)',
    genericName: 'Sodium Chloride + Potassium Chloride + Sodium Citrate + Dextrose',
    brandNames: ['Electral', 'WHO ORS', 'Prolyte ORS'],
    drugCategory: 'Fluid & Electrolyte Replacement',
    therapeuticCategory: 'Hydration & Digestive Care',
    classificationEn: 'WHO Recommended Low-Osmolarity Oral Rehydration Solution (245 mOsm/L)',
    classificationHi: 'WHO अनुशंसित लो-ऑस्मोलैरिटी ओरल रिहाइड्रेशन घोल (245 mOsm/L)',
    usesEn:
      'Essential first-line support to prevent and treat mild-to-moderate dehydration caused by acute watery diarrhea, vomiting, or heat-related fluid loss in children and adults.',
    usesHi:
      'दस्त, उल्टी या अत्यधिक गर्मी के कारण होने वाले निर्जलीकरण (डिहाइड्रेशन) की रोकथाम और शरीर में पानी व इलेक्ट्रोलाइट्स की पूर्ति हेतु प्रथम पंक्ति का समाधान।',
    mechanismEn:
      'Uses sodium-glucose co-transport (SGLT1) across the small intestinal mucosa to actively absorb sodium and water efficiently even during diarrheal illness, while citrate helps correct metabolic acidosis.',
    mechanismHi:
      'यह छोटी आंत में सोडियम-ग्लूकोज को-ट्रांसपोर्ट प्रणाली के माध्यम से पानी और आवश्यक लवणों के त्वरित अवशोषण में सहायता करता है।',
    sideEffectsEn:
      'Safe when prepared accurately with the exact measured volume of clean drinking water specified on the sachet. Improper concentration (too little water) can cause hypernatremia.',
    sideEffectsHi:
      'पैकेट पर लिखी सटीक मात्रा के स्वच्छ पानी में घोलकर पीने पर सुरक्षित। कम पानी में अधिक पाउडर घोलने से सोडियम असंतुलन हो सकता है।',
    precautionsEn:
      'Always dissolve the entire sachet strictly in the exact stated volume of safe, boiled-and-cooled drinking water (typically 1 litre for a standard 21.8 g WHO sachet). Discard unused solution after 24 hours. Seek urgent medical care for severe dehydration, blood in stools, or persistent vomiting.',
    precautionsHi:
      'पूरा पैकेट हमेशा लेबल पर बताई गई सटीक मात्रा के स्वच्छ उबले-ठंडे पानी (मानक 21.8 ग्राम पैकेट के लिए 1 लीटर) में ही घोलें। बना हुआ घोल 24 घंटे बाद उपयोग न करें। गंभीर निर्जलीकरण या लगातार उल्टी में तुरंत अस्पताल जाएँ।',
    contraindicationsEn:
      'Intestinal obstruction, paralytic ileus, severe intractable vomiting, or shock requiring intravenous rehydration.',
    contraindicationsHi:
      'आंतों में रुकावट, लगातार गंभीर उल्टी या शॉक की स्थिति (जहाँ IV फ्लूइड आवश्यक हो)।',
    storageEn: 'Store unopened sachets in a cool, dry place below 30°C away from moisture.',
    storageHi: 'बिना खुले पैकेट 30°C से कम सूखे स्थान में रखें।',
    references: [
      'WHO / UNICEF Joint Statement on Low-Osmolarity ORS Formula',
      'National Formulary of India (NFI) — Electrolytes',
      'Ministry of Health & Family Welfare (India) Diarrhoea Control Guidelines',
    ],
    reviewDate: '2026-11-08',
    published: true,
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: 'art-bp-readings',
    slug: 'understanding-blood-pressure-readings',
    category: 'Blood Pressure',
    titleEn: 'Understanding Your Blood Pressure Readings & Accurate Home Monitoring',
    titleHi: 'ब्लड प्रेशर रीडिंग को कैसे समझें और घर पर सही जाँच कैसे करें',
    summaryEn:
      'Learn what systolic and diastolic numbers signify, common home measurement mistakes, and when to share readings with your physician.',
    summaryHi:
      'सिस्टोलिक और डायस्टोलिक संख्याओं का अर्थ, घर पर जाँच के दौरान होने वाली सामान्य गलतियाँ और चिकित्सक से कब सलाह लें — जानें इस गाइड में।',
    contentEn: `Blood pressure measures the force exerted by circulating blood against the walls of your arteries. Every reading contains two numbers expressed in millimetres of mercury (mmHg): the upper number (systolic pressure) reflects pressure when the heart contracts, while the lower number (diastolic pressure) reflects pressure when the heart rests between beats.

According to World Health Organization (WHO) and Indian clinical guidelines, hypertension often develops silently without obvious early symptoms. Regular screening helps detect persistent elevation early, allowing timely medical evaluation and lifestyle adjustments.

How to Take a Reliable Home Reading:
1. Sit quietly for at least 5 minutes before measuring, with your back supported and feet flat on the floor (uncrossed).
2. Avoid caffeine, smoking, or vigorous exercise for 30 minutes prior to measurement, and empty your bladder beforehand.
3. Place a properly sized upper-arm cuff directly over bare skin, supported on a table at heart level.
4. Record two readings 1 minute apart and maintain a dated log to share at your doctor's appointment.

Important Reminder: A single elevated reading does not establish a diagnosis, and you should never start, stop, or adjust prescribed blood pressure medicines without consulting your doctor.`,
    contentHi: `ब्लड प्रेशर (रक्तचाप) वह दबाव है जो प्रवाहित होता रक्त आपकी धमनियों की दीवारों पर डालता है। प्रत्येक रीडिंग में दो संख्याएँ होती हैं (mmHg में): ऊपरी संख्या (सिस्टोलिक प्रेशर) हृदय के संकुचन के समय का दबाव बताती है, जबकि निचली संख्या (डायस्टोलिक प्रेशर) दो धड़कनों के बीच हृदय के विश्राम के समय का दबाव दर्शाती है।

विश्व स्वास्थ्य संगठन (WHO) और भारतीय चिकित्सीय दिशानिर्देशों के अनुसार, उच्च रक्तचाप अक्सर बिना किसी स्पष्ट शुरुआती लक्षण के बढ़ता है। नियमित जांच से समय पर पहचान और चिकित्सकीय परामर्श संभव होता है।

घर पर सही ब्लड प्रेशर मापने के 4 नियम:
1. जाँच से पहले कम से कम 5 मिनट शांत बैठें; पीठ को सहारा दें और दोनों पैर ज़मीन पर सीधे रखें।
2. माप से 30 मिनट पहले चाय, कॉफी, धूम्रपान या भारी व्यायाम से बचें।
3. सही आकार का अपर-आर्म कफ सीधे बांह पर बाँधें और बांह को मेज़ पर हृदय के स्तर पर रखें।
4. एक मिनट के अंतर पर दो रीडिंग लें और तारीख सहित डायरी में नोट करके अपने डॉक्टर को दिखाएं।

महत्वपूर्ण ध्यान दें: केवल एक बार बढ़ी हुई रीडिंग से बीमारी तय नहीं होती। कभी भी डॉक्टर की सलाह के बिना रक्तचाप की दवा शुरू, बंद या परिवर्तित न करें।`,
    featuredImage: BRAND_IMAGES.heartHealth,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-10',
    lastUpdatedDate: '2026-11-12',
    readMinutes: 5,
    references: [
      'World Health Organization (WHO): Hypertension Fact Sheet (2025)',
      'ICMR Standard Treatment Workflows — Hypertension Management',
      'American Heart Association (AHA): Home Blood Pressure Monitoring',
    ],
    published: true,
  },
  {
    id: 'art-heart-nutrition',
    slug: 'heart-friendly-indian-nutrition',
    category: 'Heart Health',
    titleEn: 'Heart-Friendly Everyday Indian Diet Habits Backed by ICMR-NIN Guidelines',
    titleHi: 'हृदय स्वास्थ्य के लिए ICMR-NIN आधारित व्यावहारिक भारतीय आहार आदतें',
    summaryEn:
      'Simple kitchen-level shifts in cooking oils, dietary fiber, hidden salt intake, and whole millets that support cardiovascular wellness.',
    summaryHi:
      'खाना पकाने के तेल, फाइबर, छिपे हुए नमक और साबुत अनाज/मिलेट्स में छोटे बदलाव जो हृदय स्वास्थ्य को सहारा देते हैं।',
    contentEn: `Preventive heart care begins in everyday home kitchens rather than restrictive fad diets. The ICMR–National Institute of Nutrition (NIN) Dietary Guidelines for Indians highlight practical, culturally familiar patterns that support long-term cardiovascular health.

Core Principles for Everyday Meals:
1. Prioritize Whole Grains & Millets: Rotate whole wheat with jowar, bajra, ragi, and oats alongside dals and legumes to increase soluble dietary fiber.
2. Watch Hidden Sodium: WHO recommends keeping adult salt intake below 5 grams per day (about one teaspoon total), paying attention to pickles, papads, packaged snacks, and instant masalas.
3. Choose Cooking Oils Mindfully: Avoid repeatedly reheating cooking oils, limit trans fats found in commercial bakery snacks, and rotate cold-pressed or balanced vegetable oils in moderation.
4. Fill Half the Plate with Vegetables & Greens: Seasonal vegetables, palak, methi, lauki, salads, and a small handful of unsalted nuts supply potassium, folate, and protective phytonutrients.

Pair balanced eating with at least 150 minutes of moderate physical activity per week (such as brisk walking), quality sleep, and regular preventive checkups.`,
    contentHi: `हृदय की देखभाल किसी कठिन डाइट से नहीं, बल्कि रोज़मर्रा की रसोई की सरल आदतों से शुरू होती है। ICMR–राष्ट्रीय पोषण संस्थान (NIN) के भारतीय आहार दिशानिर्देश संतुलित और व्यावहारिक खान-पान पर ज़ोर देते हैं।

रोज़मर्रा के भोजन के 4 प्रमुख सिद्धांत:
1. साबुत अनाज और मिलेट्स अपनाएँ: गेहूँ के साथ ज्वार, बाजरा, रागी और दालों को नियमित भोजन में शामिल करने से घुलनशील फाइबर बढ़ता है।
2. छिपे हुए नमक पर ध्यान दें: WHO के अनुसार वयस्कों के लिए दैनिक नमक की मात्रा 5 ग्राम (लगभग 1 छोटा चम्मच) से कम रखनी चाहिए। अचार, पापड़ और पैकेटबंद नमकीन में अतिरिक्त सोडियम होता है।
3. तेल का सीमित और सही उपयोग: एक ही तेल को बार-बार गर्म न करें, ट्रांस फैट वाले पैकेट स्नैक्स से बचें और सीमित मात्रा में संतुलित खाद्य तेल चुनें।
4. थाली का आधा हिस्सा सब्ज़ियों और सलाद से भरें: मौसमी हरी सब्ज़ियाँ, पालक, मेथी, लौकी और मुट्ठी भर बिना नमक वाले सूखे मेवे हृदय के लिए लाभकारी पोषक तत्व देते हैं।

संतुलित आहार के साथ सप्ताह में कम से कम 150 मिनट तेज़ चलना और नियमित स्वास्थ्य जांच करवाना अत्यंत महत्वपूर्ण है।`,
    featuredImage: BRAND_IMAGES.diabetesNutrition,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-16',
    lastUpdatedDate: '2026-11-10',
    readMinutes: 6,
    references: [
      'ICMR-NIN Dietary Guidelines for Indians (2024)',
      'World Health Organization: Healthy Diet & Salt Reduction Fact Sheets',
    ],
    published: true,
  },
  {
    id: 'art-diabetes-screening',
    slug: 'understanding-type-2-diabetes-screening',
    category: 'Diabetes',
    titleEn: 'Understanding HbA1c, Fasting Glucose & Preventive Type 2 Diabetes Literacy',
    titleHi: 'HbA1c, फास्टिंग शुगर और टाइप 2 मधुमेह जागरूकता को समझें',
    summaryEn:
      'A clear explanation of common blood sugar tests, why early screening matters in India, and the pillars of sustainable blood glucose care.',
    summaryHi:
      'प्रमुख ब्लड शुगर जांचों का सरल परिचय, भारत में समय पर स्क्रीनिंग का महत्व और मधुमेह प्रबंधन के आधार स्तंभ।',
    contentEn: `India carries one of the largest populations living with prediabetes and Type 2 diabetes worldwide. Understanding standard laboratory markers empowers families to have more informed conversations with their physicians.

Key Blood Glucose Tests Explained:
• Fasting Plasma Glucose (FPG): Measured after at least 8 hours without caloric intake.
• Postprandial Blood Glucose (PPBS): Measured 2 hours after the start of a meal to evaluate how the body handles dietary carbohydrates.
• HbA1c (Glycated Hemoglobin): Reflects average blood glucose levels over the preceding 2 to 3 months without requiring fasting.

Lifestyle Foundations Alongside Medical Care:
Balanced portion control, replacing refined sugars and sweetened beverages with water and fiber-rich foods, daily post-meal walking, foot care awareness, and adhering strictly to doctor-prescribed monitoring schedules all work together to protect eyes, kidneys, nerves, and heart health.`,
    contentHi: `भारत में प्री-डायबिटीज़ और टाइप 2 मधुमेह के मामले तेजी से बढ़े हैं। सामान्य लैब जांचों की सही समझ होने पर मरीज और परिवार अपने डॉक्टर से बेहतर संवाद कर सकते हैं।

प्रमुख ब्लड शुगर जांचें:
• फास्टिंग ब्लड शुगर (FPG): कम से कम 8 घंटे खाली पेट रहने के बाद की जाने वाली जाँच।
• पोस्ट-प्रैंडियल शुगर (PPBS): भोजन शुरू करने के 2 घंटे बाद की जाँच, जो भोजन के बाद शुगर प्रतिक्रिया दर्शाती है।
• HbA1c जाँच: यह पिछले 2 से 3 महीनों के औसत रक्त शर्करा स्तर को बताती है और इसके लिए खाली पेट होना आवश्यक नहीं होता।

चिकित्सीय उपचार के साथ जीवनशैली का महत्व:
संतुलित मात्रा में भोजन, मीठे पेय पदार्थों से दूरी, भोजन के बाद नियमित टहलना, पैरों की स्वच्छता और डॉक्टर द्वारा बताई गई नियमित जांचें आँखों, किडनी, नसों और हृदय की सुरक्षा में सहायक होती हैं।`,
    featuredImage: BRAND_IMAGES.diabetesNutrition,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-21',
    lastUpdatedDate: '2026-11-11',
    readMinutes: 5,
    references: [
      'ICMR Guidelines for Management of Type 2 Diabetes',
      'World Health Organization: Diabetes Key Facts',
    ],
    published: true,
  },
  {
    id: 'art-cholesterol-guide',
    slug: 'cholesterol-lipid-profile-guide',
    category: 'Cholesterol',
    titleEn: 'Decoding Your Lipid Profile: LDL, HDL, Triglycerides & Preventive Steps',
    titleHi: 'लिपिड प्रोफाइल रिपोर्ट को समझें: LDL, HDL और ट्राइग्लिसराइड्स',
    summaryEn:
      'What each line of a standard lipid panel means and why doctors assess cholesterol alongside overall cardiovascular risk.',
    summaryHi:
      'लिपिड प्रोफाइल रिपोर्ट के हर पैरामीटर का अर्थ और डॉक्टर समग्र हृदय जोखिम का आकलन कैसे करते हैं।',
    contentEn: `Cholesterol is a waxy lipid essential for building cell membranes and certain hormones, yet imbalances in blood lipoproteins can gradually contribute to arterial plaque buildup (atherosclerosis).

Reading a Standard Lipid Profile:
• LDL ("Low-Density Lipoprotein"): Often termed "bad" cholesterol because excess LDL particles can deposit within artery walls.
• HDL ("High-Density Lipoprotein"): Helps transport excess cholesterol back to the liver for clearance.
• Triglycerides: Blood fats influenced closely by refined carbohydrates, excess sugar, alcohol, and physical inactivity.
• Total Cholesterol & Non-HDL Cholesterol: Broad indicators clinicians evaluate together with age, blood pressure, diabetes status, and family history.

Always interpret lipid numbers with a qualified physician — target levels vary meaningfully depending on your individual cardiovascular profile.`,
    contentHi: `कोलेस्ट्रॉल एक आवश्यक वसायुक्त तत्व है जो कोशिका झिल्लियों और हार्मोन निर्माण में काम आता है, किंतु रक्त में इसका असंतुलन धीरे-धीरे धमनियों में रुकावट (एथेरोस्क्लेरोसिस) का कारण बन सकता है।

लिपिड प्रोफाइल के प्रमुख भाग:
• LDL कोलेस्ट्रॉल: अधिक मात्रा में होने पर यह धमनियों की दीवारों में जमा हो सकता है।
• HDL कोलेस्ट्रॉल: यह अतिरिक्त कोलेस्ट्रॉल को वापस यकृत (लिवर) तक ले जाने में मदद करता है।
• ट्राइग्लिसराइड्स: अधिक रिफाइंड कार्बोहाइड्रेट, मीठा, शराब और शारीरिक निष्क्रियता से इनका स्तर बढ़ सकता है।

हमेशा अपनी रिपोर्ट का मूल्यांकन योग्य चिकित्सक से कराएँ, क्योंकि सुरक्षित लक्ष्य हर व्यक्ति के स्वास्थ्य जोखिम के अनुसार अलग हो सकते हैं।`,
    featuredImage: BRAND_IMAGES.heartHealth,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-10-28',
    lastUpdatedDate: '2026-11-12',
    readMinutes: 4,
    references: [
      'MedlinePlus / NIH: Cholesterol Levels — What You Need to Know',
      'WHO Cardiovascular Diseases Prevention Guidance',
    ],
    published: true,
  },
  {
    id: 'art-home-first-aid',
    slug: 'essential-home-first-aid-guide',
    category: 'First Aid',
    titleEn: 'Essential Home First Aid Preparedness for Everyday Minor Injuries',
    titleHi: 'घर में आवश्यक प्राथमिक उपचार (फर्स्ट एड) और सुरक्षित तैयारी',
    summaryEn:
      'Practical steps for cleaning minor cuts, cooling minor kitchen burns safely, and organizing a checked household first aid kit.',
    summaryHi:
      'मामूली कटने, हल्के जलने पर सही प्राथमिक देखभाल और घर के फर्स्ट एड बॉक्स को व्यवस्थित रखने के सुरक्षित तरीके।',
    contentEn: `Calm, accurate first aid helps stabilize minor everyday injuries while recognizing immediately when emergency hospital care is needed.

Key Safe First Aid Practices:
1. Minor Cuts & Scrapes: Wash your hands, rinse the wound gently under clean running water, apply gentle pressure with sterile gauze to stop bleeding, and cover with a clean sterile dressing.
2. Minor First-Degree Kitchen Burns: Cool the area immediately under cool (not ice-cold) running tap water for 15–20 minutes. Never apply toothpaste, butter, oil, or raw ice to a burn.
3. First Aid Box Checklist: Sterile gauze pads, roller bandages, medical adhesive tape, antiseptic wound cleanser, blunt-tip scissors, clean disposable gloves, digital thermometer, and WHO ORS sachets. Inspect expiry dates every 6 months.

Emergency Red Flags: Seek immediate emergency medical attention (dial 108 / 112 in India) for severe bleeding, deep burns, chest pain, breathing difficulty, sudden weakness, or suspected poisoning.`,
    contentHi: `शांत और सही प्राथमिक उपचार मामूली घरेलू चोटों को सुरक्षित रूप से संभालने में मदद करता है और यह पहचानने में सहायक होता है कि कब तुरंत अस्पताल जाना आवश्यक है।

प्राथमिक उपचार के सुरक्षित नियम:
1. मामूली कट या खरोंच: पहले हाथ धोएँ, घाव को स्वच्छ बहते पानी से साफ करें, स्टेराइल गॉज से हल्का दबाव देकर रक्तस्राव रोकें और साफ पट्टी लगाएँ।
2. रसोई में हल्का जलना: जले हुए हिस्से को तुरंत 15–20 मिनट तक सामान्य ठंडे बहते पानी के नीचे रखें। जले पर कभी भी टूथपेस्ट, तेल, घी या बर्फ न लगाएँ।
3. फर्स्ट एड बॉक्स की नियमित जाँच: स्टेराइल गॉज, बैंडेज, मेडिकल टेप, एंटीसेप्टिक घोल, थर्मामीटर और WHO ORS पैकेट रखें तथा हर 6 महीने में एक्सपायरी डेट जाँचें।

आपातकालीन चेतावनी: गंभीर रक्तस्राव, गहरा जलना, सीने में दर्द या सांस लेने में कठिनाई होने पर तुरंत आपातकालीन सेवा (भारत में 108 / 112) पर संपर्क करें।`,
    featuredImage: BRAND_IMAGES.productsEssentials,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-11-02',
    lastUpdatedDate: '2026-11-14',
    readMinutes: 5,
    references: [
      'Indian Red Cross Society — Basic First Aid Guidelines',
      'WHO Basic Emergency Care Awareness Resources',
    ],
    published: true,
  },
  {
    id: 'art-medicine-safety',
    slug: 'safe-medicine-use-antibiotic-stewardship',
    category: 'Medicine Awareness',
    titleEn: 'Safe Medicine Habits: Reading Labels, Storage & Avoiding Antibiotic Misuse',
    titleHi: 'सुरक्षित दवा आदतें: लेबल पढ़ना, सही भंडारण और एंटीबायोटिक जागरूकता',
    summaryEn:
      'How to verify expiry dates, store medicines safely in Indian summer heat, and protect your family from antimicrobial resistance.',
    summaryHi:
      'एक्सपायरी डेट की जाँच, भारतीय गर्मी में दवाओं का सही भंडारण और एंटीबायोटिक दुरुपयोग से बचाव के आवश्यक नियम।',
    contentEn: `Responsible medicine awareness prevents avoidable side effects and keeps essential treatments effective for everyone.

Five Everyday Medicine Safety Habits:
1. Read the Generic Name & Strength: Many multi-symptom cold and pain products contain the same active ingredient (such as paracetamol). Reading the composition prevents accidental duplication.
2. Respect Antibiotic Prescriptions: Antibiotics treat bacterial infections — not viral colds. Never share leftover antibiotics or stop early without consulting your prescribing doctor.
3. Store Properly in Warm Climates: Keep medicines away from damp bathrooms, sunlit windowsills, and parked vehicles. Store in original strips so expiry dates and batch numbers remain readable.
4. Use Proper Measuring Devices: For liquid syrups, use the calibrated measuring cup or oral syringe provided rather than household kitchen spoons.
5. Dispose Safely: Separate expired or unused medicines safely out of reach of children and pets.`,
    contentHi: `दवाओं के प्रति जागरूकता अनावश्यक दुष्प्रभावों को रोकती है और आवश्यक उपचार को प्रभावी बनाए रखती है।

दवा सुरक्षा की 5 आवश्यक आदतें:
1. जेनेरिक नाम और स्ट्रेंथ अवश्य पढ़ें: कई मिश्रित दवाओं में एक ही मुख्य घटक (जैसे पैरासिटामोल) हो सकता है। लेबल पढ़ने से अनजाने ओवरडोज़ से बचा जा सकता है।
2. एंटीबायोटिक का जिम्मेदार उपयोग: एंटीबायोटिक केवल बैक्टीरियल संक्रमण पर काम करती हैं, वायरल जुकाम पर नहीं। कभी भी बची हुई एंटीबायोटिक बिना डॉक्टर की सलाह के न लें और कोर्स अधूरा न छोड़ें।
3. गर्मी और नमी से सुरक्षित भंडारण: दवाओं को बाथरूम की नमी, सीधी धूप या गर्म कार में न रखें। मूल स्ट्रिप में रखने से एक्सपायरी डेट स्पष्ट रहती है।
4. सही माप उपकरण का उपयोग: सिरप के लिए घरेलू चम्मच के बजाय साथ दिए गए माप कप या ओरल सिरिंज का प्रयोग करें।
5. बच्चों से दूर सुरक्षित रखरखाव: सभी दवाओं को बच्चों की पहुँच से बाहर रखें।`,
    featuredImage: BRAND_IMAGES.hero,
    author: "Ved's Medcare Editorial Desk",
    publishedDate: '2026-11-06',
    lastUpdatedDate: '2026-11-15',
    readMinutes: 5,
    references: [
      'WHO Antimicrobial Resistance (AMR) Public Awareness',
      'Pharmacovigilance Programme of India (PvPI) — Consumer Medicine Safety',
    ],
    published: true,
  },
];

export const SEED_PHARMACY_NOTES: PharmacyNote[] = [
  {
    id: 'note-pharmaceutics-tablets',
    slug: 'compressed-tablets-formulation',
    subject: 'Pharmaceutics',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Compressed Tablets: Excipients, Granulation & IP Evaluation',
    titleHi: 'कम्प्रेस्ड टैबलेट्स: एक्सिपिएंट्स, ग्रैन्यूलेशन और IP गुणवत्ता परीक्षण',
    shortNotesEn:
      'Compressed tablets are solid unit dosage forms containing active pharmaceutical ingredient (API) with excipients (diluents, binders, disintegrants, lubricants, glidants). Manufactured via wet granulation, dry granulation, or direct compression.',
    shortNotesHi:
      'कम्प्रेस्ड टैबलेट ठोस यूनिट खुराक रूप हैं जिनमें मुख्य औषधि (API) के साथ एक्सिपिएंट्स (डाइल्यूएंट, बाइंडर, डिसइंटीग्रेंट, लुब्रिकेंट) होते हैं। इन्हें वेट ग्रैन्यूलेशन, ड्राई ग्रैन्यूलेशन या डायरेक्ट कम्प्रेशन से बनाया जाता है।',
    detailedNotesEn: `1. Core Excipients & Examples:
• Diluents / Fillers: Increase bulk weight (Lactose, Microcrystalline Cellulose, Dicalcium Phosphate).
• Binders / Adhesives: Impart cohesiveness to granules (Starch paste, PVP K-30, Acacia).
• Disintegrants: Break tablet into smaller fragments in GI fluid (Starch, Sodium Starch Glycolate, Croscarmellose Sodium).
• Lubricants & Glidants: Reduce die-wall friction and improve powder flow (Magnesium Stearate, Talc, Colloidal Silicon Dioxide).

2. Indian Pharmacopoeia (IP) Quality Control Tests:
• Weight Variation Test: 20 tablets weighed individually; % deviation checked against IP limits (±10% for ≤80 mg, ±7.5% for 80–250 mg, ±5% for ≥250 mg).
• Friability Test: Roche Friabilator rotated at 25 rpm for 4 minutes (100 revolutions); acceptable weight loss is generally ≤ 1.0%.
• Disintegration Test: Uncoated tablets typically disintegrate within 15 minutes in water at 37 ± 2°C.`,
    detailedNotesHi: `1. प्रमुख एक्सिपिएंट्स और उदाहरण:
• डाइल्यूएंट (Diluents): टैबलेट का आकार व भार बढ़ाने के लिए (लैक्टोज, माइक्रोक्रिस्टलाइन सेलुलोज)।
• बाइंडर (Binders): कणों को आपस में जोड़ने के लिए (स्टार्च पेस्ट, PVP)।
• डिसइंटीग्रेंट (Disintegrants): पेट के द्रव में टैबलेट को जल्दी तोड़ने के लिए (सोडियम स्टार्च ग्लाइकोलेट)।
• लुब्रिकेंट एवं ग्लाइडेंट: पंच से चिपकने से रोकने और पाउडर का प्रवाह सुधारने हेतु (मैग्नीशियम स्टीयरेट, टैल्क)।

2. इंडियन फार्माकोपिया (IP) गुणवत्ता परीक्षण:
• वेट वेरिएशन टेस्ट: 20 टैबलेट्स का अलग-अलग वजन तौलकर मानक विचलन सीमा की जाँच।
• फ्रायबिलिटी टेस्ट: रोश फ्रायबिलेटर में 25 rpm पर 4 मिनट (100 चक्कर); सामान्य स्वीकृत भार हानि ≤ 1.0%।
• डिसइंटीग्रेशन टेस्ट: अनकोटेड टैबलेट सामान्यतः 37 ± 2°C पर 15 मिनट के भीतर विघटित होनी चाहिए।`,
    definitionsEn:
      'Granulation: Process of agglomerating fine powder particles into larger free-flowing granules to improve compressibility and prevent segregation. Capping: Partial or complete separation of top or bottom crown of a tablet.',
    definitionsHi:
      'ग्रैन्यूलेशन: महीन पाउडर कणों को एकसमान दानेदार कणों में बदलने की प्रक्रिया। कैपिंग (Capping): कम्प्रेशन के दौरान टैबलेट की ऊपरी या निचली परत का अलग हो जाना।',
    practicalProcedureEn:
      'Weight Variation Lab Check: 1) Clean analytical balance and calibrate zero. 2) Weigh 20 uncoated tablets individually and calculate average weight. 3) Compute percentage deviation for each tablet and verify IP compliance.',
    practicalProcedureHi:
      'वेट वेरिएशन प्रैक्टिकल: 1) एनालिटिकल बैलेंस को साफ कर शून्य पर सेट करें। 2) 20 अनकोटेड टैबलेट्स का व्यक्तिगत वजन नोट कर औसत वजन निकालें। 3) प्रत्येक टैबलेट का प्रतिशत विचलन निकालकर IP सीमा से मिलान करें।',
    diagramKey: 'tablet-granulation',
    pdfUrl: '/api/study-sheet/compressed-tablets-formulation.pdf',
    published: true,
  },
  {
    id: 'note-pharmacology-adme',
    slug: 'pharmacokinetics-adme',
    subject: 'Pharmacology',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Pharmacokinetics: ADME Principles & Bioavailability',
    titleHi: 'फार्माकोकाइनेटिक्स: ADME सिद्धांत और बायोअवेलेबिलिटी',
    shortNotesEn:
      'Pharmacokinetics describes "what the body does to the drug" across four core phases: Absorption, Distribution, Metabolism (Biotransformation), and Excretion (ADME).',
    shortNotesHi:
      'फार्माकोकाइनेटिक्स यह बताता है कि "शरीर दवा के साथ क्या करता है" — इसके चार मुख्य चरण हैं: अवशोषण (Absorption), वितरण (Distribution), चयापचय (Metabolism) और उत्सर्जन (Excretion)।',
    detailedNotesEn: `1. Absorption: Passage of drug from administration site into systemic circulation via passive diffusion, facilitated diffusion, or active transport. First-pass hepatic metabolism reduces oral bioavailability for certain drugs.
2. Distribution: Reversible transfer of drug between intravascular fluid and extravascular tissues. Governed by lipid solubility, regional blood flow, plasma protein binding (albumin for acidic drugs), and physiological barriers (Blood-Brain Barrier).
3. Metabolism (Biotransformation): Converts lipophilic drugs into more polar, excretable metabolites predominantly in the liver.
   • Phase I (Functionalization): Oxidation (CYP450), reduction, hydrolysis.
   • Phase II (Conjugation): Glucuronidation, sulfation, acetylation, methylation.
4. Excretion: Primarily renal via glomerular filtration, active tubular secretion, and passive tubular reabsorption; biliary/fecal and pulmonary routes play secondary roles.`,
    detailedNotesHi: `1. अवशोषण (Absorption): दवा का दिए गए स्थान से रक्त परिसंचरण में पहुँचना। ओरल दवाओं में यकृत का फर्स्ट-पास मेटाबॉलिज्म बायोअवेलेबिलिटी को प्रभावित कर सकता है।
2. वितरण (Distribution): रक्त से शरीर के विभिन्न ऊतकों तक दवा का पहुँचना। यह प्लाज्मा प्रोटीन बाइंडिंग (एल्बुमिन), रक्त प्रवाह और ब्लड-ब्रेन बैरियर पर निर्भर करता है।
3. चयापचय (Metabolism): मुख्यतः यकृत में वसा-घुलनशील दवाओं को जल-घुलनशील रूप में बदलना ताकि वे बाहर निकल सकें।
   • फेज़ I: ऑक्सीकरण (CYP450), अपचयन, जल-अपघटन।
   • फेज़ II: ग्लूक्यूरोनिडेशन, सल्फेशन, एसिटिलेशन।
4. उत्सर्जन (Excretion): मुख्य रूप से किडनी द्वारा ग्लोमेरुलर फिल्ट्रेशन और ट्यूबुलर स्राव के माध्यम से मूत्र द्वारा निष्कासन।`,
    definitionsEn:
      'Bioavailability (F): Fraction of administered unchanged drug reaching systemic circulation (100% for IV injection). Plasma Half-Life (t½): Time required for plasma drug concentration to decrease by 50%.',
    definitionsHi:
      'बायोअवेलेबिलिटी (F): दी गई दवा का वह अंश जो बिना बदले रक्त परिसंचरण में पहुँचता है (IV इंजेक्शन के लिए 100%)। हाफ-लाइफ (t½): रक्त में दवा की सांद्रता आधी होने में लगने वाला समय।',
    practicalProcedureEn:
      'Exam Concept Exercise: Compare onset of action and bioavailability curves across IV bolus, intramuscular, sublingual, and oral tablet routes.',
    practicalProcedureHi:
      'अभ्यास कार्य: IV, IM, सबलिंगुअल और ओरल टैबलेट मार्गों की बायोअवेलेबिलिटी व प्रभाव प्रारंभ समय की तुलनात्मक तालिका तैयार करें।',
    diagramKey: 'pharmacokinetics-adme',
    pdfUrl: '/api/study-sheet/pharmacokinetics-adme.pdf',
    published: true,
  },
  {
    id: 'note-pharmacognosy-crude',
    slug: 'crude-drugs-classification',
    subject: 'Pharmacognosy',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Classification & Quality Evaluation of Crude Drugs',
    titleHi: 'क्रूड ड्रग्स का वर्गीकरण और गुणवत्ता मूल्यांकन',
    shortNotesEn:
      'Crude drugs are naturally occurring unrefined plant, animal, or mineral substances used medicinally. Classified by alphabetical, taxonomical, morphological, pharmacological, and chemical systems.',
    shortNotesHi:
      'क्रूड ड्रग्स वे प्राकृतिक वनस्पति, प्राणिज या खनिज पदार्थ हैं जिनका औषधीय उपयोग होता है। इनका वर्गीकरण वर्णानुक्रम, टैक्सोनॉमिकल, मॉर्फोलॉजिकल, फार्माकोलॉजिकल और रासायनिक आधार पर किया जाता है।',
    detailedNotesEn: `1. Organized vs Unorganized Crude Drugs:
• Organized (Cellular): Direct plant parts with cellular structure — leaves (Senna, Digitalis), bark (Cinchona, Cinnamon), roots (Rauwolfia), flower buds (Clove).
• Unorganized (Acellular): Extracts, gums, resins, latex, or volatile oils — Acacia gum, Aloe juice, Beeswax, Asafoetida.

2. Five Pillars of Crude Drug Evaluation:
• Organoleptic (Sensory): Colour, odour, taste, size, fracture.
• Microscopic: Quantitative microscopy (stomatal index, palisade ratio, vein-islet number, trichomes).
• Physical: Moisture content, ash values (total, acid-insoluble, water-soluble), extractive values, refractive index.
• Chemical: Phytochemical screening (Mayer's/Dragendorff's test for alkaloids; Borntrager's test for anthraquinone glycosides).
• Biological: Bioassays when chemical assay is insufficient.`,
    detailedNotesHi: `1. ऑर्गेनाइज्ड बनाम अनऑर्गेनाइज्ड क्रूड ड्रग्स:
• ऑर्गेनाइज्ड (कोशिकीय): पौधे के सीधे अंग जैसे पत्तियाँ (सनाय/सेन्ना), छाल (सिनकोना, दालचीनी), जड़ (सर्पगंधा), कली (लौंग)।
• अनऑर्गेनाइज्ड (अकोशिकीय): गोंद, रेज़िन, लैटेक्स या वाष्पशील तेल जैसे बबूल गोंद, एलोवेरा रस, हींग।

2. मूल्यांकन की 5 प्रमुख विधियाँ:
• ऑर्गेनोलेप्टिक (इंद्रिय जाँच): रंग, गंध, स्वाद, आकार।
• माइक्रोस्कोपिक: स्टोमेटल इंडेक्स, ट्राइकोम्स व सूक्ष्म संरचना।
• भौतिक (Physical): ऐश वैल्यू, नमी की मात्रा, एक्सट्रैक्टिव वैल्यू।
• रासायनिक: एल्कलॉइड्स हेतु मेयर/ड्रैगेंडॉर्फ परीक्षण, ग्लाइकोसाइड्स हेतु बॉर्नट्रेगर परीक्षण।`,
    definitionsEn:
      'Adulteration: Partial or complete substitution of genuine crude drug with inferior, exhausted, or spurious material. Stomatal Index (SI) = [S / (E + S)] × 100.',
    definitionsHi:
      'मिलावट (Adulteration): असली क्रूड ड्रग के स्थान पर निम्न गुणवत्ता या नकली पदार्थ का आंशिक या पूर्ण मिश्रण।',
    practicalProcedureEn:
      'Microscopic Lab Step: Prepare thin transverse section of Clove bud or Cinnamon bark, clear with chloral hydrate, stain with phloroglucinol + conc. HCl to identify lignified fibers and oil glands.',
    practicalProcedureHi:
      'प्रैक्टिकल विधि: दालचीनी की छाल या लौंग का पतला अनुप्रस्थ काट (T.S.) लेकर क्लोरल हाइड्रेट से साफ करें और फ्लोरोग्लूसिनोल + HCl से अभिरंजित कर सूक्ष्मदर्शी में देखें।',
    diagramKey: 'dispensing-workflow',
    pdfUrl: '/api/study-sheet/crude-drugs-classification.pdf',
    published: true,
  },
  {
    id: 'note-pharmchem-limittests',
    slug: 'limit-tests-chloride-sulphate',
    subject: 'Pharmaceutical Chemistry',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Indian Pharmacopoeia Limit Tests for Chlorides & Sulphates',
    titleHi: 'क्लोराइड और सल्फेट के लिए IP लिमिट टेस्ट',
    shortNotesEn:
      'Limit tests are semi-quantitative pharmacopoeial procedures used to verify that trace inorganic impurities (Cl⁻, SO₄²⁻, Fe, As, Pb) stay within permissible IP standards.',
    shortNotesHi:
      'लिमिट टेस्ट वे अर्ध-मात्रात्मक फार्माकोपियल परीक्षण हैं जो सुनिश्चित करते हैं कि दवाओं में क्लोराइड, सल्फेट या आयरन जैसी अशुद्धियाँ अनुमत सीमा से कम हैं।',
    detailedNotesEn: `1. Chloride Limit Test (IP):
• Principle: Soluble chloride reacts with silver nitrate (AgNO₃) in the presence of dilute nitric acid (HNO₃) to form insoluble silver chloride (AgCl) opalescence.
• Role of Dilute HNO₃: Keeps the solution acidic so other radicals (carbonates, phosphates) do not precipitate as silver salts.
• Evaluation: Compare test Nessler cylinder opalescence against the standard cylinder prepared with 1 mL of 0.05845% w/v NaCl solution. Test opalescence must be less than standard to PASS.

2. Sulphate Limit Test (IP):
• Principle: Soluble sulphate reacts with barium chloride (BaCl₂) in dilute HCl to produce barium sulphate (BaSO₄) turbidity. Barium sulphate reagent contains potassium sulphate (seeding) and alcohol (prevents supersaturation).`,
    detailedNotesHi: `1. क्लोराइड लिमिट टेस्ट (IP):
• सिद्धांत: तनु नाइट्रिक अम्ल (HNO₃) की उपस्थिति में घुलनशील क्लोराइड सिल्वर नाइट्रेट (AgNO₃) से अभिक्रिया कर सफेद धुंधलापन (AgCl) उत्पन्न करता है।
• तनु HNO₃ की भूमिका: माध्यम को अम्लीय बनाए रखता है ताकि कार्बोनेट या फॉस्फेट जैसी अन्य अशुद्धियाँ अवक्षेपित न हों।
• निष्कर्ष: यदि टेस्ट नेस्लर सिलेंडर का धुंधलापन मानक (Standard) से कम है, तो नमूना परीक्षण में उत्तीर्ण (Pass) होता है।

2. सल्फेट लिमिट टेस्ट (IP):
• सिद्धांत: तनु HCl की उपस्थिति में सल्फेट, बेरियम क्लोराइड से अभिक्रिया कर BaSO₄ की टर्बिडिटी उत्पन्न करता है।`,
    definitionsEn:
      'Opalescence: Milky translucent appearance seen in dilute AgCl suspension. Nessler Cylinder: Flat-bottomed calibrated glass cylinder used for visual turbidity comparison.',
    definitionsHi:
      'ओपलेसेंस (Opalescence): तनु AgCl निलंबन में दिखने वाला दूधिया धुंधलापन। नेस्लर सिलेंडर: टर्बिडिटी की तुलना हेतु मानकीकृत काँच का सिलेंडर।',
    practicalProcedureEn:
      '1) Take two matched 50 mL Nessler cylinders labelled "Test" and "Standard". 2) Dissolve specified sample in distilled water + 10 mL dil. HNO₃; dilute to 50 mL. 3) Add 1 mL 0.1M AgNO₃ to both, stir with glass rod, stand 5 minutes protected from light, and compare against a black background.',
    practicalProcedureHi:
      '1) दो समान 50 mL नेस्लर सिलेंडर ("Test" व "Standard") लें। 2) निर्धारित नमूने को आसुत जल व 10 mL तनु HNO₃ में घोलकर 50 mL तक पूरा करें। 3) दोनों में 1 mL 0.1M AgNO₃ मिलाकर 5 मिनट रखें और काले बैकग्राउंड के सामने तुलना करें।',
    diagramKey: 'tablet-granulation',
    pdfUrl: '/api/study-sheet/limit-tests-chloride-sulphate.pdf',
    published: true,
  },
  {
    id: 'note-hap-nephron',
    slug: 'cardiovascular-nephron-physiology',
    subject: 'Human Anatomy and Physiology',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Nephron Structure, Urine Formation & Cardiac Conduction',
    titleHi: 'नेफ्रॉन संरचना, मूत्र निर्माण और हृदय संवहन प्रणाली',
    shortNotesEn:
      'The nephron is the structural and functional unit of the kidney (~1 million per kidney), executing glomerular filtration, selective tubular reabsorption, and tubular secretion.',
    shortNotesHi:
      'नेफ्रॉन किडनी की संरचनात्मक और कार्यात्मक इकाई है (प्रत्येक किडनी में लगभग 10 लाख), जो ग्लोमेरुलर फिल्ट्रेशन, पुनःअवशोषण और स्राव द्वारा रक्त शुद्ध करती है।',
    detailedNotesEn: `1. Three Steps of Urine Formation:
• Glomerular Ultrafiltration: Driven by net filtration pressure across Bowman's capsule; normal adult GFR is approximately 125 mL/min (~180 L/day filtrate).
• Selective Tubular Reabsorption: ~99% of water, 100% of glucose, amino acids, and essential electrolytes are reclaimed primarily in the Proximal Convoluted Tubule (PCT) and Loop of Henle.
• Tubular Secretion: Active transport of H⁺, K⁺, creatinine, and organic drug ions from peritubular capillaries into the distal tubule to maintain acid-base balance.

2. Cardiac Conduction Sequence:
SA Node (Natural Pacemaker) → AV Node → Bundle of His → Right & Left Bundle Branches → Purkinje Fibers.`,
    detailedNotesHi: `1. मूत्र निर्माण के तीन मुख्य चरण:
• ग्लोमेरुलर अल्ट्राफिल्ट्रेशन: बोमन कैप्सूल में दाब के कारण रक्त प्लाज्मा छनता है (सामान्य GFR लगभग 125 mL/मिनट)।
• चयनात्मक ट्यूबुलर पुनःअवशोषण: लगभग 99% जल, ग्लूकोज और आवश्यक लवण PCT व हेनले लूप में वापस रक्त में अवशोषित होते हैं।
• ट्यूबुलर स्राव: अतिरिक्त H⁺, K⁺ और अपशिष्ट आयनों का नलिका में स्राव जिससे अम्ल-क्षार संतुलन बना रहता है।

2. हृदय विद्युत संवहन क्रम:
SA नोड (प्राकृतिक पेसमेकर) → AV नोड → बंडल ऑफ हिस → पुर्किंजे फाइबर।`,
    definitionsEn:
      'Glomerular Filtration Rate (GFR): Total volume of filtrate formed by all renal corpuscles of both kidneys per minute. Cardiac Output (CO) = Heart Rate × Stroke Volume.',
    definitionsHi:
      'GFR: दोनों किडनियों द्वारा प्रति मिनट निर्मित निस्यंद (फिल्ट्रेट) की कुल मात्रा। कार्डियक आउटपुट = हृदय गति × स्ट्रोक वॉल्यूम।',
    practicalProcedureEn:
      'Anatomy Lab Focus: Identify renal cortex, medulla, Bowman’s capsule, PCT, Loop of Henle, DCT, and Collecting Duct on a labelled nephron chart.',
    practicalProcedureHi:
      'एनाटॉमी अभ्यास: नेफ्रॉन मॉडल/आरेख पर ग्लोमेरुलस, बोमन कैप्सूल, PCT, हेनले लूप, DCT और कलेक्टिंग डक्ट की पहचान करें।',
    diagramKey: 'nephron-filtration',
    pdfUrl: '/api/study-sheet/cardiovascular-nephron-physiology.pdf',
    published: true,
  },
  {
    id: 'note-biochem-enzymes',
    slug: 'carbohydrates-enzymes-biochemistry',
    subject: 'Biochemistry',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Carbohydrates, Glycolysis & Enzyme Kinetics Essentials',
    titleHi: 'कार्बोहाइड्रेट, ग्लाइकोलाइसिस और एंजाइम काइनेटिक्स के मूल सिद्धांत',
    shortNotesEn:
      'Carbohydrates serve as primary cellular fuel via glycolysis (cytosol) and TCA cycle (mitochondria). Enzymes are protein biocatalysts lowering activation energy without being consumed.',
    shortNotesHi:
      'कार्बोहाइड्रेट कोशिकाओं के प्रमुख ऊर्जा स्रोत हैं। एंजाइम वे जैव-उत्प्रेरक (प्रोटीन) हैं जो सक्रियण ऊर्जा को कम कर जैव-रासायनिक अभिक्रियाओं की गति बढ़ाते हैं।',
    detailedNotesEn: `1. Carbohydrate Classification:
• Monosaccharides: Glucose, Fructose, Galactose (cannot be hydrolysed further).
• Disaccharides: Sucrose (Glu+Fru), Lactose (Glu+Gal), Maltose (Glu+Glu).
• Polysaccharides: Starch, Glycogen (storage), Cellulose (structural).

2. Clinical Qualitative Tests:
• Molisch's Test: General test for carbohydrates (violet ring at junction).
• Benedict's Test: Detects reducing sugars (brick-red Cu₂O precipitate on heating).

3. Enzyme Inhibition in Pharmacology:
• Competitive Inhibition: Inhibitor competes at active site (increases apparent Km, Vmax unchanged) — e.g., Statins inhibiting HMG-CoA reductase.
• Non-Competitive Inhibition: Binds allosteric site (decreases Vmax, Km unchanged).`,
    detailedNotesHi: `1. कार्बोहाइड्रेट का वर्गीकरण:
• मोनोसैकेराइड: ग्लूकोज, फ्रक्टोज, गैलेक्टोज।
• डाइसैकेराइड: सुक्रोज, लैक्टोज, माल्टोज।
• पॉलीसैकेराइड: स्टार्च, ग्लाइकोजन, सेलुलोज।

2. प्रमुख गुणात्मक परीक्षण:
• मोलिश टेस्ट: सभी कार्बोहाइड्रेट की सामान्य पहचान (बैंगनी वलय)।
• बेनेडिक्ट टेस्ट: रिड्यूसिंग शुगर की पहचान (गर्म करने पर ईंट जैसा लाल अवक्षेप)।

3. एंजाइम अवरोधन (Inhibition):
• कॉम्पिटिटिव इनहिबिशन: सक्रिय स्थल पर प्रतिस्पर्धा (Km बढ़ता है, Vmax स्थिर रहता है)।`,
    definitionsEn:
      'Km (Michaelis Constant): Substrate concentration at which reaction velocity equals half of maximum velocity (½ Vmax). Lower Km indicates higher enzyme affinity.',
    definitionsHi:
      'Km (माइकलिस स्थिरांक): वह सबस्ट्रेट सांद्रता जिस पर एंजाइम अभिक्रिया की गति अधिकतम गति (Vmax) की आधी होती है।',
    practicalProcedureEn:
      'Benedict’s Qualitative Test: Add 8 drops of test glucose solution to 5 mL Benedict’s reagent in a clean test tube, boil for 2 minutes in a water bath, and observe colour progression (blue → green → yellow → orange/brick-red).',
    practicalProcedureHi:
      'बेनेडिक्ट परीक्षण: 5 mL बेनेडिक्ट अभिकर्मक में 8 बूँद परीक्षण घोल डालकर 2 मिनट उबालें और रंग परिवर्तन (नीला → हरा → पीला → लाल अवक्षेप) नोट करें।',
    diagramKey: 'pharmacokinetics-adme',
    pdfUrl: '/api/study-sheet/carbohydrates-enzymes-biochemistry.pdf',
    published: true,
  },
  {
    id: 'note-community-dispensing',
    slug: 'community-pharmacy-dispensing',
    subject: 'Community Pharmacy',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Prescription Parts, Good Dispensing Practice & Patient Counselling',
    titleHi: 'प्रिस्क्रिप्शन के भाग, उत्तम डिस्पेंसिंग और रोगी परामर्श',
    shortNotesEn:
      'Good Pharmacy Practice (GPP) ensures accurate prescription verification, clear bilingual labelling, drug-interaction screening, and structured patient counselling.',
    shortNotesHi:
      'उत्तम फार्मेसी अभ्यास (GPP) के अंतर्गत प्रिस्क्रिप्शन का सही सत्यापन, स्पष्ट लेबलिंग और रोगी को दवा के सुरक्षित उपयोग की जानकारी देना शामिल है।',
    detailedNotesEn: `1. Standard Parts of a Medical Prescription:
• Date & Patient Details (Name, Age, Sex, Weight where relevant).
• Superscription: Symbol "Rx" (Latin: Recipe — "take thou").
• Inscription: Main body listing generic/brand drug names and strengths.
• Subscription: Directions to the pharmacist for dispensing.
• Signatura (Sig.): Clear dosage and administration instructions for the patient.
• Prescriber's Name, Qualification, Registration Number & Signature.

2. Five-Step Dispensing Workflow:
Receive & validate prescription → Interpret & screen for interactions/clarity → Select, count & label accurately → Double-check against prescription → Counsel patient verbally & check understanding.`,
    detailedNotesHi: `1. प्रिस्क्रिप्शन के प्रमुख भाग:
• दिनांक और रोगी का विवरण (नाम, आयु, लिंग)।
• सुपरस्क्रिप्शन: "Rx" प्रतीक।
• इंस्क्रिप्शन: दवाओं के नाम और मात्रा (स्ट्रेंथ)।
• सब्सक्रिप्शन: फार्मासिस्ट हेतु निर्देश।
• सिग्नेचुरा (Sig.): रोगी के लिए दवा लेने का तरीका व समय।
• चिकित्सक का नाम, पंजीकरण संख्या और हस्ताक्षर।

2. डिस्पेंसिंग के 5 चरण:
प्रिस्क्रिप्शन सत्यापन → व्याख्या एवं सुरक्षा जाँच → सही चयन व लेबलिंग → पुनः मिलान → रोगी परामर्श।`,
    definitionsEn:
      'Patient Counselling: Interactive communication by a pharmacist providing clear medication instructions, storage advice, and adherence guidance to optimize therapeutic safety.',
    definitionsHi:
      'रोगी परामर्श (Patient Counselling): फार्मासिस्ट द्वारा रोगी को दवा के सही समय, विधि, सावधानियों और भंडारण की सरल जानकारी देना।',
    practicalProcedureEn:
      'Counselling Checklist Roleplay: Confirm patient identity, explain timing (before/after meals), clarify duration, highlight storage conditions, and ask the patient to repeat key directions.',
    practicalProcedureHi:
      'परामर्श अभ्यास: रोगी को दवा भोजन से पहले या बाद में लेने का समय, कोर्स की अवधि और भंडारण की सावधानियाँ स्पष्ट रूप से समझाएं।',
    diagramKey: 'dispensing-workflow',
    pdfUrl: '/api/study-sheet/community-pharmacy-dispensing.pdf',
    published: true,
  },
  {
    id: 'note-hospital-formulary',
    slug: 'hospital-pharmacy-formulary',
    subject: 'Hospital and Clinical Pharmacy',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'P&T Committee, Hospital Formulary & Pharmacovigilance (PvPI)',
    titleHi: 'P&T समिति, हॉस्पिटल फॉर्म्युलरी और फार्माकोविजिलेंस (PvPI)',
    shortNotesEn:
      'Covers the Pharmacy & Therapeutics (P&T) Committee, inpatient drug distribution systems (UDDS, Floor Stock), and ADR reporting under the Pharmacovigilance Programme of India (PvPI).',
    shortNotesHi:
      'अस्पताल में P&T समिति की भूमिका, इनपेशेंट दवा वितरण प्रणाली (UDDS) और भारत के फार्माकोविजिलेंस कार्यक्रम (PvPI) के अंतर्गत ADR रिपोर्टिंग का अध्ययन।',
    detailedNotesEn: `1. Pharmacy & Therapeutics (P&T) Committee:
Multidisciplinary advisory group (physicians, clinical pharmacists, nursing leads, hospital administrator) responsible for compiling the Hospital Formulary, evaluating drug safety, and promoting rational drug therapy.

2. Inpatient Drug Distribution Systems:
• Individual Prescription Order System (common in smaller hospitals).
• Complete Floor Stock System (charge & non-charge ward stock).
• Unit Dose Drug Distribution System (UDDS): Individually packaged single doses dispensed for 24 hours — minimizes medication errors and wastage.

3. Pharmacovigilance (PvPI — IPC Ghaziabad):
Systematic science of detecting, assessing, understanding, and preventing Adverse Drug Reactions (ADRs).`,
    detailedNotesHi: `1. फार्मेसी एवं थेराप्यूटिक्स (P&T) समिति:
चिकित्सकों, फार्मासिस्ट और नर्सिंग प्रतिनिधियों की सलाहकार समिति जो हॉस्पिटल फॉर्म्युलरी तैयार करती है और सुरक्षित, तर्कसंगत दवा उपयोग सुनिश्चित करती है।

2. अस्पताल में दवा वितरण प्रणालियाँ:
• व्यक्तिगत प्रिस्क्रिप्शन ऑर्डर प्रणाली।
• फ्लोर स्टॉक प्रणाली।
• यूनिट डोज़ डिस्पेंसिंग सिस्टम (UDDS): प्रत्येक रोगी के लिए 24 घंटे की एकल पैक खुराक — इससे त्रुटियाँ और दवा की बर्बादी कम होती है।

3. फार्माकोविजिलेंस (PvPI):
दवाओं से होने वाले प्रतिकूल प्रभावों (ADRs) की पहचान, मूल्यांकन और रोकथाम की वैज्ञानिक प्रणाली।`,
    definitionsEn:
      'Hospital Formulary: Continuously revised compilation of essential pharmaceuticals selected for safe, effective, and cost-conscious clinical use within a hospital.',
    definitionsHi:
      'हॉस्पिटल फॉर्म्युलरी: अस्पताल में सुरक्षित और प्रभावी उपचार हेतु चुनी गई आवश्यक दवाओं की अद्यतन सूची।',
    practicalProcedureEn:
      'ADR Form Familiarity: Review the standard PvPI Suspected Adverse Drug Reaction Reporting Form sections (Patient info, Suspected ADR, Suspected medication, Reporter details).',
    practicalProcedureHi:
      'प्रैक्टिकल अभ्यास: मानक PvPI संदिग्ध ADR रिपोर्टिंग फॉर्म के चारों अनुभागों का अध्ययन करें।',
    diagramKey: 'dispensing-workflow',
    pdfUrl: '/api/study-sheet/hospital-pharmacy-formulary.pdf',
    published: true,
  },
  {
    id: 'note-practical-syrup',
    slug: 'simple-syrup-ip-practical',
    subject: 'Practical Experiments',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Practical: Preparation & Evaluation of Simple Syrup IP (66.7% w/w)',
    titleHi: 'प्रैक्टिकल: सिंपल सिरप IP (66.7% w/w) का निर्माण और मूल्यांकन',
    shortNotesEn:
      'Complete D.Pharm Pharmaceutics laboratory record format covering Aim, Apparatus, IP Formula (66.7% w/w sucrose), Method, Labelling, and Viva points.',
    shortNotesHi:
      'D.Pharm फार्मास्यूटिक्स लैब के लिए उद्देश्य, उपकरण, IP फॉर्मूला (66.7% w/w सुक्रोज), विधि और लेबलिंग का पूर्ण प्रारूप।',
    detailedNotesEn: `Aim: To prepare and submit 100 g (or scaled quantity) of Simple Syrup IP.
Official Formula (IP):
• Sucrose (IP grade): 66.7 g
• Purified Water IP: q.s. to 100 g

Theory: Simple Syrup IP is a saturated aqueous solution of sucrose (66.7% w/w; specific gravity ~1.31). High osmotic pressure inhibits microbial growth naturally (self-preserving concentration), though excessive heating must be avoided to prevent caramelization and inversion of sucrose.`,
    detailedNotesHi: `उद्देश्य: 100 ग्राम सिंपल सिरप IP तैयार करना और प्रस्तुत करना।
आधिकारिक फॉर्मूला (IP):
• सुक्रोज (IP ग्रेड): 66.7 ग्राम
• शुद्ध जल (Purified Water IP): 100 ग्राम पूरा करने हेतु पर्याप्त मात्रा (q.s.)

सिद्धांत: सिंपल सिरप IP सुक्रोज का संतृप्त जलीय घोल है (66.7% w/w)। उच्च ऑस्मोटिक दाब के कारण यह सूक्ष्मजीव वृद्धि को रोकता है। अत्यधिक ताप से बचना चाहिए ताकि सुक्रोज का कैरेमलाइजेशन न हो।`,
    definitionsEn:
      'Inversion of Sucrose: Hydrolysis of sucrose into glucose and fructose upon overheating, causing darkening and increased fermentation tendency.',
    definitionsHi:
      'सुक्रोज का इन्वर्जन: अधिक गर्म करने पर सुक्रोज का ग्लूकोज और फ्रक्टोज में टूटना, जिससे सिरप का रंग गहरा हो सकता है।',
    practicalProcedureEn:
      '1) Weigh 66.7 g sucrose accurately on a clean balance. 2) Add to ~30 mL warm purified water in a tared beaker and stir gently on a water bath until completely dissolved. 3) Cool to room temperature, adjust final weight to 100 g with purified water. 4) Filter through clean muslin cloth, transfer to a clean bottle, and attach a neat white label.',
    practicalProcedureHi:
      '1) 66.7 ग्राम सुक्रोज सटीक तौलें। 2) लगभग 30 mL हल्के गर्म शुद्ध जल में डालकर वॉटर बाथ पर धीरे-धीरे हिलाते हुए घोलें। 3) कमरे के तापमान पर ठंडा कर शुद्ध जल से अंतिम वजन 100 ग्राम पूरा करें। 4) साफ मलमल के कपड़े से छानकर बोतल में भरें और स्पष्ट लेबल लगाएँ।',
    diagramKey: 'tablet-granulation',
    pdfUrl: '/api/study-sheet/simple-syrup-ip-practical.pdf',
    published: true,
  },
  {
    id: 'note-viva-important',
    slug: 'dpharm-important-viva-questions',
    subject: 'Important Questions',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'D.Pharm High-Yield Important Questions, Viva Bank & Quick Revision Notes',
    titleHi: 'D.Pharm महत्वपूर्ण परीक्षा प्रश्न, वाइवा प्रश्न बैंक और त्वरित नोट्स',
    shortNotesEn:
      'Curated exam-oriented short answers and practical viva questions across Pharmaceutics, Pharmacology, Pharmacognosy, and Pharmaceutical Jurisprudence.',
    shortNotesHi:
      'फार्मास्यूटिक्स, फार्माकोलॉजी, फार्माकोग्नॉसी और ज्यूरिसप्रूडेंस से परीक्षा और वाइवा हेतु चुनिंदा महत्वपूर्ण प्रश्नोत्तर।',
    detailedNotesEn: `High-Yield Exam & Viva Q&A:
Q1. Distinguish between Antiseptic and Disinfectant.
Ans: Antiseptics inhibit or destroy microorganisms on living tissues (e.g., Povidone-iodine); disinfectants are applied to inanimate surfaces and instruments (e.g., Sodium hypochlorite).

Q2. What is Schedule H and Schedule H1 under India's Drugs & Cosmetics Rules?
Ans: Schedule H lists prescription-only medicines sold strictly against a registered medical practitioner's prescription. Schedule H1 adds stricter dispensing record requirements for specific antibiotics, anti-TB drugs, and habit-forming medicines.

Q3. Why is isotonicity important in ophthalmic and parenteral preparations?
Ans: Isotonic solutions (equivalent to 0.9% w/v NaCl) prevent cellular shrinkage (crenation) or swelling (hemolysis) and minimize irritation to delicate eye tissues.

Q4. Define Half-Life (t½) and Therapeutic Index (TI).
Ans: Half-life is the time for plasma drug level to fall by 50%. Therapeutic Index (LD₅₀/ED₅₀) indicates a drug's margin of safety.`,
    detailedNotesHi: `परीक्षा एवं वाइवा हेतु प्रमुख प्रश्नोत्तर:
प्रश्न 1. एंटीसेप्टिक और डिसइन्फेक्टेंट में क्या अंतर है?
उत्तर: एंटीसेप्टिक जीवित ऊतकों (त्वचा/घाव) पर सूक्ष्मजीवों को रोकने के लिए प्रयुक्त होते हैं, जबकि डिसइन्फेक्टेंट निर्जीव सतहों व उपकरणों को कीटाणुरहित करने हेतु।

प्रश्न 2. भारत के ड्रग्स एंड कॉस्मेटिक्स नियमों के अंतर्गत शेड्यूल H और H1 क्या हैं?
उत्तर: शेड्यूल H में वे प्रिस्क्रिप्शन दवाएँ आती हैं जो केवल पंजीकृत चिकित्सक के पर्चे पर ही दी जा सकती हैं। शेड्यूल H1 में चयनित एंटीबायोटिक व विशेष दवाओं के वितरण का अलग रिकॉर्ड रखना अनिवार्य होता है।

प्रश्न 3. आई ड्रॉप्स में आइसोटोनिसिटी क्यों आवश्यक है?
उत्तर: 0.9% w/v NaCl के समतुल्य आइसोटोनिक घोल आँखों में जलन और कोशिका क्षति को रोकता है।`,
    definitionsEn:
      'Pharmacopoeia: Official legally recognized book of standards for identity, purity, and strength of medicines (e.g., Indian Pharmacopoeia — IP).',
    definitionsHi:
      'फार्माकोपिया: दवाओं की पहचान, शुद्धता और मानक गुणवत्ता निर्धारित करने वाली आधिकारिक पुस्तक (जैसे इंडियन फार्माकोपिया — IP)।',
    practicalProcedureEn:
      'Viva Preparation Tip: Always revise Aim, Principle, Formula calculation, Role of each reagent, Storage condition, and Schedule label before entering practical exams.',
    practicalProcedureHi:
      'वाइवा टिप: प्रैक्टिकल परीक्षा से पहले हमेशा उद्देश्य, सिद्धांत, फॉर्मूला गणना, प्रत्येक रसायन की भूमिका और भंडारण निर्देश दोहराएँ।',
    diagramKey: 'pharmacokinetics-adme',
    pdfUrl: '/api/study-sheet/dpharm-important-viva-questions.pdf',
    published: true,
  },
  {
    id: 'note-viva-dedicated',
    slug: 'pharmacy-viva-questions-guide',
    subject: 'Viva Questions',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Practical Viva Voce Guide: Pharmaceutics & Chemistry Lab',
    titleHi: 'प्रैक्टिकल वाइवा गाइड: फार्मास्यूटिक्स और केमिस्ट्री लैब',
    shortNotesEn:
      'Focused practical examiner questions on glass apparatus calibration, sterilization autoclaving (121°C, 15 psi, 15 min), emulsions vs suspensions, and titration indicators.',
    shortNotesHi:
      'काँच के उपकरण, ऑटोक्लेव स्टेरलाइज़ेशन (121°C, 15 psi, 15 मिनट), इमल्शन बनाम सस्पेंशन और टाइट्रेशन इंडिकेटर्स पर प्रैक्टिकल वाइवा प्रश्न।',
    detailedNotesEn: `Common Examiner Viva Questions:
1. Standard Moist Heat Sterilization (Autoclave) condition? — 121°C at 15 psi pressure for 15–20 minutes.
2. Difference between Emulsion and Suspension? — Emulsion is a biphasic liquid of two immiscible liquids (oil-in-water or water-in-oil); suspension contains insoluble solid particles dispersed in a liquid vehicle.
3. Why is amber-coloured glass used for photosensitive medicines? — Amber glass blocks ultraviolet light (<450 nm) that causes photodegradation.
4. What is the indicator in acid-base titration of strong acid vs strong base? — Phenolphthalein or Methyl Orange.`,
    detailedNotesHi: `प्रैक्टिकल परीक्षक के प्रमुख वाइवा प्रश्न:
1. ऑटोक्लेव (Moist Heat Sterilization) की मानक स्थिति क्या है? — 121°C तापमान, 15 psi दाब, 15–20 मिनट।
2. इमल्शन और सस्पेंशन में अंतर? — इमल्शन दो अमिश्रणीय द्रवों का मिश्रण है, जबकि सस्पेंशन में अघुलनशील ठोस कण द्रव में फैले होते हैं।
3. प्रकाश-संवेदनशील दवाओं के लिए अंबर रंग की बोतल क्यों उपयोग होती है? — यह पराबैंगनी (UV) किरणों को रोककर दवा को खराब होने से बचाती है।`,
    definitionsEn:
      'Flocculated Suspension: Suspension where particles form loose aggregates that settle rapidly and redisperse easily upon shaking.',
    definitionsHi:
      'फ्लोक्यूलेटेड सस्पेंशन: ऐसा सस्पेंशन जिसमें कण ढीले समूह बनाते हैं और हिलाने पर आसानी से पुनः मिल जाते हैं।',
    practicalProcedureEn:
      'Lab Viva Drill: Practice stating chemical equations, standard temperatures, and IP tolerance limits concisely in 2 sentences.',
    practicalProcedureHi:
      'वाइवा अभ्यास: रासायनिक समीकरण, मानक तापमान और IP सीमाओं को 2 स्पष्ट वाक्यों में बोलने का अभ्यास करें।',
    diagramKey: 'nephron-filtration',
    pdfUrl: '/api/study-sheet/dpharm-important-viva-questions.pdf',
    published: true,
  },
  {
    id: 'note-study-notes-bundle',
    slug: 'dpharm-study-notes-overview',
    subject: 'Study Notes',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'D.Pharm Quick Revision Summary: Dosage Forms & Routes of Administration',
    titleHi: 'D.Pharm त्वरित रिवीज़न नोट्स: डोसेज़ फॉर्म और दवा देने के मार्ग',
    shortNotesEn:
      'Structured comparison of Solid, Liquid, Semi-solid, and Sterile dosage forms alongside enteral, parenteral, and topical routes of drug administration.',
    shortNotesHi:
      'ठोस, तरल, अर्ध-ठोस और स्टेराइल डोसेज़ फॉर्म तथा एंटरल, पैरेंटरल और टॉपिकल मार्गों का सरल तुलनात्मक सारांश।',
    detailedNotesEn: `1. Classification of Dosage Forms:
• Solid: Tablets, Capsules, Powders, Granules, Lozenges.
• Liquid: Syrups, Elixirs, Suspensions, Emulsions, Solutions.
• Semi-Solid: Ointments, Creams, Gels, Pastes, Suppositories.
• Sterile: Injections (IV, IM, SC), Ophthalmic drops, Irrigations.

2. Routes of Administration Highlights:
• Oral: Convenient, economical, subject to first-pass effect.
• Sublingual: Rapid absorption bypassing first-pass metabolism (e.g., Nitroglycerin).
• Intravenous (IV): 100% bioavailability, immediate emergency onset.`,
    detailedNotesHi: `1. डोसेज़ फॉर्म का वर्गीकरण:
• ठोस: टैबलेट, कैप्सूल, पाउडर, ग्रैन्यूल्स।
• तरल: सिरप, एलिक्सिर, सस्पेंशन, इमल्शन।
• अर्ध-ठोस: ऑइंटमेंट, क्रीम, जेल, पेस्ट।
• स्टेराइल: इंजेक्शन (IV, IM, SC), आई ड्रॉप्स।

2. दवा देने के प्रमुख मार्ग:
• ओरल: सुविधाजनक व सुरक्षित, लेकिन फर्स्ट-पास प्रभाव संभव।
• सबलिंगुअल: जीभ के नीचे शीघ्र अवशोषण, फर्स्ट-पास से बचाव।
• इंट्रावीनस (IV): 100% बायोअवेलेबिलिटी व त्वरित प्रभाव।`,
    definitionsEn:
      'Dosage Form: Physical form in which an active medicinal agent is formulated with excipients for safe, accurate administration.',
    definitionsHi:
      'डोसेज़ फॉर्म: वह भौतिक रूप जिसमें मुख्य औषधि को एक्सिपिएंट्स के साथ सुरक्षित उपयोग हेतु तैयार किया जाता है।',
    practicalProcedureEn:
      'Revision Strategy: Map 2 official Indian Pharmacopoeia examples under each dosage form category.',
    practicalProcedureHi:
      'रिवीज़न रणनीति: प्रत्येक डोसेज़ फॉर्म श्रेणी के नीचे 2 इंडियन फार्माकोपिया उदाहरण लिखकर अभ्यास करें।',
    diagramKey: 'tablet-granulation',
    pdfUrl: '/api/study-sheet/compressed-tablets-formulation.pdf',
    published: true,
  },
  {
    id: 'note-pdf-resources',
    slug: 'dpharm-pdf-resources-pack',
    subject: 'PDF Resources',
    languageLabel: 'Bilingual (EN + हिंदी)',
    titleEn: 'Downloadable D.Pharm Original Study Sheets (PDF Collection)',
    titleHi: 'डाउनलोड करने योग्य D.Pharm मूल स्टडी शीट्स (PDF संग्रह)',
    shortNotesEn:
      'Printable, original one-page D.Pharm revision PDFs prepared by Ved’s Medcare covering Pharmaceutics, Pharmacology, Limit Tests, Anatomy, and Viva preparation.',
    shortNotesHi:
      'वेद’स मेडकेयर द्वारा तैयार मूल एक-पृष्ठ D.Pharm रिवीज़न PDF शीट्स — फार्मास्यूटिक्स, फार्माकोलॉजी, लिमिट टेस्ट, एनाटॉमी और वाइवा तैयारी के लिए।',
    detailedNotesEn: `Every PDF study sheet available in this portal is an original educational summary authored for quick exam revision and laboratory preparation — never scanned or redistributed copyrighted books.

Included Printable Sheets:
• Compressed Tablets & IP Quality Control Summary
• Pharmacokinetics (ADME) Quick Reference
• Indian Pharmacopoeia Limit Tests (Chloride & Sulphate)
• Human Nephron & Cardiovascular Conduction Summary
• Community Pharmacy Prescription & Dispensing Guide
• High-Yield D.Pharm Viva & Important Questions Sheet`,
    detailedNotesHi: `इस पोर्टल में उपलब्ध सभी PDF स्टडी शीट्स त्वरित परीक्षा रिवीज़न और प्रैक्टिकल तैयारी के लिए मूल शैक्षिक सारांश हैं — किसी भी कॉपीराइट पुस्तक की प्रति नहीं।

उपलब्ध प्रिंटेबल शीट्स:
• कम्प्रेस्ड टैबलेट्स एवं IP गुणवत्ता नियंत्रण सारांश
• फार्माकोकाइनेटिक्स (ADME) त्वरित संदर्भ
• IP लिमिट टेस्ट (क्लोराइड और सल्फेट)
• नेफ्रॉन एवं हृदय संवहन सारांश
• कम्युनिटी फार्मेसी डिस्पेंसिंग गाइड
• महत्वपूर्ण D.Pharm वाइवा प्रश्न शीट`,
    definitionsEn:
      'Open Educational Revision Sheet: Concise student-authored or educator-authored summary sheet structured for self-study without infringing publisher copyrights.',
    definitionsHi:
      'ओपन एजुकेशनल रिवीज़न शीट: स्व-अध्ययन के लिए तैयार संक्षिप्त मूल सारांश शीट।',
    practicalProcedureEn:
      'Click "Download Study Sheet (PDF)" below to save a print-ready study reference directly to your device.',
    practicalProcedureHi:
      'अपने डिवाइस पर प्रिंट-रेडी स्टडी शीट सेव करने के लिए नीचे "स्टडी शीट डाउनलोड करें (PDF)" पर क्लिक करें।',
    diagramKey: 'dispensing-workflow',
    pdfUrl: '/api/study-sheet/dpharm-important-viva-questions.pdf',
    published: true,
  },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-bp-monitor',
    slug: 'digital-upper-arm-bp-monitor',
    category: 'Healthcare Equipment',
    nameEn: 'Digital Upper-Arm Blood Pressure Monitor',
    nameHi: 'डिजिटल अपर-आर्म ब्लड प्रेशर मॉनिटर',
    image: BRAND_IMAGES.productsEssentials,
    descriptionEn:
      'Automatic oscillometric upper-arm blood pressure monitor designed for convenient home tracking of systolic, diastolic, and pulse readings.',
    descriptionHi:
      'घर पर सिस्टोलिक, डायस्टोलिक और पल्स रीडिंग की सुविधाजनक निगरानी के लिए ऑटोमैटिक अपर-आर्म डिजिटल बीपी मॉनिटर।',
    featuresEn: [
      'Wide-range soft upper-arm cuff (22–32 cm standard fit)',
      'Large high-contrast LCD display for easy readability',
      'Irregular heartbeat detection indicator',
      'Dual-user memory log with date and time stamp',
    ],
    featuresHi: [
      'आरामदायक अपर-आर्म कफ (22–32 सेमी मानक आकार)',
      'स्पष्ट और बड़ा हाई-कंट्रास्ट LCD डिस्प्ले',
      'अनियमित धड़कन संकेतक सुविधा',
      'तिथि व समय सहित रीडिंग मेमोरी स्टोरेज',
    ],
    usageEn:
      'Rest quietly for 5 minutes before sitting upright with feet flat on the floor. Wrap the cuff snugly 2 cm above the elbow crease on the bare upper arm and support the arm at heart level during inflation.',
    usageHi:
      'माप से 5 मिनट पहले शांत बैठें। कफ को कोहनी के जोड़ से लगभग 2 सेमी ऊपर बांह पर बाँधें और माप के समय बांह को हृदय के स्तर पर मेज़ पर टिकाकर रखें।',
    precautionsEn:
      'Use strictly for home tracking and sharing logs with your doctor. Never self-adjust blood pressure medications based solely on home device readings. Periodically verify device calibration with a healthcare clinic.',
    precautionsHi:
      'यह उपकरण केवल घरेलू निगरानी के लिए है। रीडिंग के आधार पर स्वयं दवा में बदलाव न करें और नियमित रूप से अपने चिकित्सक से परामर्श लें।',
    published: true,
  },
  {
    id: 'prod-pulse-oximeter',
    slug: 'fingertip-pulse-oximeter',
    category: 'Healthcare Equipment',
    nameEn: 'Fingertip Pulse Oximeter (SpO₂ & Pulse Rate)',
    nameHi: 'फिंगरटिप पल्स ऑक्सीमीटर (SpO₂ और पल्स रेट)',
    image: BRAND_IMAGES.productsEssentials,
    descriptionEn:
      'Compact, non-invasive fingertip sensor that estimates peripheral blood oxygen saturation (SpO₂) and pulse rate within seconds.',
    descriptionHi:
      'रक्त में ऑक्सीजन संतृप्ति स्तर (SpO₂) और पल्स दर को कुछ ही सेकंड में दर्शाने वाला कॉम्पैक्ट फिंगरटिप उपकरण।',
    featuresEn: [
      'Dual-wavelength optical sensor for SpO₂ & PR',
      'Clear multi-directional OLED screen',
      'Low-power automatic shut-off after removal',
      'Lightweight pocket lanyard design',
    ],
    featuresHi: [
      'SpO₂ और पल्स रेट हेतु ड्यूल-वेवलेंथ ऑप्टिकल सेंसर',
      'स्पष्ट मल्टी-डायरेक्शनल OLED स्क्रीन',
      'उपयोग के बाद ऑटोमैटिक पावर-ऑफ सुविधा',
      'हल्का और पोर्टेबल डिज़ाइन',
    ],
    usageEn:
      'Warm cold hands before testing, remove dark nail polish if present, place the index or middle finger fully inside the sensor while seated calmly, and wait 20–30 seconds for the reading to stabilize.',
    usageHi:
      'परीक्षण से पहले हाथ सामान्य तापमान पर हों; शांत बैठकर तर्जनी या मध्यमा उंगली सेंसर में रखें और रीडिंग स्थिर होने के लिए 20–30 सेकंड प्रतीक्षा करें।',
    precautionsEn:
      'Cold fingers, motion, poor circulation, or dark nail polish can cause inaccurate readings. Seek prompt medical evaluation if you experience shortness of breath regardless of device numbers.',
    precautionsHi:
      'ठंडी उंगलियाँ, हलचल या गहरी नेल पॉलिश रीडिंग को प्रभावित कर सकती है। सांस फूलने या असहजता होने पर तुरंत डॉक्टर से संपर्क करें।',
    published: true,
  },
  {
    id: 'prod-ir-thermometer',
    slug: 'non-contact-infrared-thermometer',
    category: 'Healthcare Equipment',
    nameEn: 'Non-Contact Infrared Forehead Thermometer',
    nameHi: 'नॉन-कॉन्टैक्ट इन्फ्रारेड फोरहेड थर्मामीटर',
    image: BRAND_IMAGES.productsEssentials,
    descriptionEn:
      'Hygienic touch-free digital thermometer delivering fast forehead temperature readings in Celsius (°C) or Fahrenheit (°F) for family monitoring.',
    descriptionHi:
      'परिवार में स्वच्छ और त्वरित तापमान जाँच के लिए °C और °F विकल्प वाला टच-फ्री इन्फ्रारेड थर्मामीटर।',
    featuresEn: [
      '1-second hygienic non-contact measurement (3–5 cm distance)',
      'Switchable °C / °F temperature display',
      'Backlit screen with silent night mode',
      'Stores previous readings for fever trend tracking',
    ],
    featuresHi: [
      '3–5 सेमी दूरी से 1 सेकंड में स्वच्छ तापमान माप',
      '°C और °F दोनों इकाइयों में डिस्प्ले',
      'रात में उपयोग हेतु बैकलिट स्क्रीन और साइलेंट मोड',
      'पिछली रीडिंग सहेजने की सुविधा',
    ],
    usageEn:
      'Ensure forehead skin is dry and clear of sweat or hair. Hold the probe 3–5 cm from the center of the forehead and press the scan trigger until the beep/indicator confirms reading.',
    usageHi:
      'माथे की त्वचा सूखी और पसीने से रहित होनी चाहिए। सेंसर को माथे के मध्य से 3–5 सेमी दूर रखकर बटन दबाएँ।',
    precautionsEn:
      'Allow the thermometer to acclimatize to room temperature for 15 minutes before use. For infants under 3 months with suspected fever, consult a pediatrician promptly.',
    precautionsHi:
      'उपयोग से पहले थर्मामीटर को कमरे के तापमान के अनुकूल होने दें। छोटे शिशुओं में बुखार होने पर तुरंत बाल रोग विशेषज्ञ से संपर्क करें।',
    published: true,
  },
  {
    id: 'prod-first-aid-kit',
    slug: 'home-first-aid-emergency-kit',
    category: 'First Aid Products',
    nameEn: 'Comprehensive Home & Travel First Aid Kit',
    nameHi: 'घरेलू और यात्रा प्राथमिक उपचार (फर्स्ट एड) किट',
    image: BRAND_IMAGES.productsEssentials,
    descriptionEn:
      'Organized hard-shell first aid box containing essential sterile dressings, bandages, antiseptic wipes, medical tape, and basic wound care supplies.',
    descriptionHi:
      'स्टेराइल ड्रेसिंग, बैंडेज, एंटीसेप्टिक वाइप्स, मेडिकल टेप और आवश्यक घाव देखभाल सामग्री से सुसज्जित मजबूत फर्स्ट एड बॉक्स।',
    featuresEn: [
      'Dust-resistant compact hard case with clear inner dividers',
      'Includes sterile gauze pads, crepe bandage & adhesive strips',
      'Blunt-tip stainless bandage scissors & clean disposable gloves',
      'Bilingual quick emergency checklist card inside lid',
    ],
    featuresHi: [
      'धूल-रोधी मजबूत केस और व्यवस्थित आंतरिक खाँचे',
      'स्टेराइल गॉज पैड, क्रेप बैंडेज और एडहेसिव स्ट्रिप्स',
      'ब्लंट-टिप स्टेनलेस कैंची और डिस्पोज़ेबल दस्ताने',
      'ढक्कन के अंदर द्विभाषी प्राथमिक उपचार चेकलिस्ट',
    ],
    usageEn:
      'Keep in an easily accessible, cool, dry household location known to all adult family members, yet safely out of reach of small children.',
    usageHi:
      'घर के ऐसे सूखे और सुलभ स्थान पर रखें जिसकी जानकारी सभी वयस्क सदस्यों को हो, किंतु छोटे बच्चों की पहुँच से दूर।',
    precautionsEn:
      'Inspect consumable sterility and expiry dates every 6 months and replenish used items immediately. Serious wounds, deep burns, or trauma always require professional medical care.',
    precautionsHi:
      'हर 6 महीने में सामग्री की एक्सपायरी डेट जाँचें और उपयोग किए गए सामान को तुरंत बदलें। गंभीर चोट में तुरंत चिकित्सकीय सहायता लें।',
    published: true,
  },
  {
    id: 'prod-glucometer',
    slug: 'digital-blood-glucose-monitor',
    category: 'Healthcare Essentials',
    nameEn: 'Digital Blood Glucose Monitoring System (Informational)',
    nameHi: 'डिजिटल ब्लड ग्लूकोज मॉनिटरिंग सिस्टम',
    image: BRAND_IMAGES.diabetesNutrition,
    descriptionEn:
      'Self-monitoring blood glucose meter reference guide featuring quick capillary testing, lancing device overview, and logbook support.',
    descriptionHi:
      'रक्त शर्करा की स्व-निगरानी के लिए डिजिटल ग्लूकोमीटर, लैंसिंग डिवाइस और रीडिंग लॉग की जानकारीपूर्ण मार्गदर्शिका।',
    featuresEn: [
      'Small capillary blood sample volume requirement',
      '5-second measurement readout in mg/dL',
      'Pre-meal and post-meal tagging option',
      'Compact travel pouch for strips and lancing pen',
    ],
    featuresHi: [
      'अत्यंत कम रक्त बूँद से त्वरित परीक्षण',
      'mg/dL में 5 सेकंड में स्पष्ट परिणाम',
      'भोजन से पहले और बाद की रीडिंग टैग करने की सुविधा',
      'स्ट्रिप्स और लैंसिंग पेन के लिए सुरक्षित पाउच',
    ],
    usageEn:
      'Wash and dry hands thoroughly with soap and water (avoid alcohol residue). Insert a valid, unexpired compatible test strip, prick the side of a fingertip with a fresh sterile lancet, and apply the blood drop.',
    usageHi:
      'हाथ साबुन और पानी से धोकर अच्छी तरह सुखा लें। वैध टेस्ट स्ट्रिप लगाकर हमेशा नए स्टेराइल लैंसेट से उंगली के किनारे पर हल्का प्रिक करें।',
    precautionsEn:
      'Never reuse or share lancets. Store test strips tightly capped in their original vial away from humidity. Discuss target glucose ranges and medicine adjustments strictly with your physician.',
    precautionsHi:
      'लैंसेट को कभी दोबारा उपयोग या साझा न करें। टेस्ट स्ट्रिप्स की शीशी हमेशा कसकर बंद रखें और दवा में बदलाव केवल डॉक्टर की सलाह से करें।',
    published: true,
  },
  {
    id: 'prod-pill-organizer',
    slug: 'weekly-hygienic-pill-organizer',
    category: 'Medical Accessories',
    nameEn: '7-Day Morning/Evening Hygienic Medicine Organizer',
    nameHi: '7-दिवसीय सुबह/शाम हाइजीनिक दवा ऑर्गनाइज़र',
    image: BRAND_IMAGES.hero,
    descriptionEn:
      'BPA-free, snap-lock weekly pill organizer helping elderly family members and caregivers keep doctor-prescribed daily schedules neatly separated.',
    descriptionHi:
      'बुजुर्ग सदस्यों और देखभालकर्ताओं के लिए डॉक्टर द्वारा निर्धारित दैनिक दवाओं को व्यवस्थित रखने हेतु BPA-मुक्त साप्ताहिक दवा बॉक्स।',
    featuresEn: [
      'Food-grade BPA-free translucent compartments',
      'Clear AM / PM tactile lettering for visibility',
      'Moisture-resistant snap latches for secure closure',
      'Detachable daily pods for work or travel convenience',
    ],
    featuresHi: [
      'फूड-ग्रेड BPA-मुक्त सुरक्षित पारदर्शी खाँचे',
      'सुबह (AM) और शाम (PM) के स्पष्ट बड़े अक्षर',
      'नमी से बचाव हेतु मजबूत स्नैप-लॉक ढक्कन',
      'यात्रा के लिए अलग होने वाले दैनिक बॉक्स',
    ],
    usageEn:
      'Fill once weekly in good lighting directly from original labelled medicine strips while verifying the prescribing doctor’s schedule. Wash with mild soap and dry completely before refilling.',
    usageHi:
      'अच्छी रोशनी में मूल लेबल वाली दवा स्ट्रिप्स से डॉक्टर के पर्चे के अनुसार सप्ताह में एक बार भरें। दोबारा भरने से पहले साफ व सूखा रखें।',
    precautionsEn:
      'Do not remove moisture-sensitive or light-sensitive medicines (e.g., effervescent or sublingual tablets) from their original foil blister until immediately before intake. Keep strictly out of reach of children.',
    precautionsHi:
      'नमी या प्रकाश के प्रति संवेदनशील दवाओं को सेवन से पहले मूल फॉइल पैक से बाहर न निकालें। बच्चों की पहुँच से दूर रखें।',
    published: true,
  },
  {
    id: 'prod-antiseptic-hygiene',
    slug: 'gentle-antiseptic-hand-hygiene-kit',
    category: 'Personal Care',
    nameEn: 'Everyday Clinical Hand Hygiene & Skin Care Essentials',
    nameHi: 'दैनिक क्लिनिकल हैंड हाइजीन और त्वचा देखभाल किट',
    image: BRAND_IMAGES.productsEssentials,
    descriptionEn:
      'Informational overview of alcohol-based hand rub (70% v/v), mild pH-balanced hand wash, and sterile saline cleansing wipes for daily household infection prevention.',
    descriptionHi:
      'दैनिक घरेलू संक्रमण रोकथाम हेतु 70% हैंड रब, सौम्य pH-संतुलित हैंड वॉश और स्टेराइल क्लींजिंग वाइप्स की जानकारी।',
    featuresEn: [
      'WHO-aligned hand hygiene routine guidance',
      'Skin-friendly emollient formulation awareness',
      'Compact home and pocket dispenser formats',
      'Clear external-use safety labelling',
    ],
    featuresHi: [
      'WHO अनुशंसित हैंड हाइजीन विधि की जानकारी',
      'त्वचा के अनुकूल सौम्य संरचना',
      'घर और यात्रा के लिए सुविधाजनक पैक',
      'स्पष्ट बाहरी उपयोग सुरक्षा लेबलिंग',
    ],
    usageEn:
      'Wash hands with soap and water for at least 20 seconds when visibly soiled. Use alcohol-based hand rub over all hand surfaces until completely dry when soap and water are unavailable.',
    usageHi:
      'हाथ गंदे होने पर कम से कम 20 सेकंड तक साबुन और पानी से धोएँ। पानी उपलब्ध न होने पर हैंड रब को पूरी तरह सूखने तक हाथों पर मलें।',
    precautionsEn:
      'For external use only. Keep alcohol-based sanitizers away from open flames, eyes, and young children without supervision.',
    precautionsHi:
      'केवल बाहरी उपयोग हेतु। अल्कोहल युक्त सैनिटाइज़र को आग, आँखों और छोटे बच्चों की पहुँच से दूर रखें।',
    published: true,
  },
];

export const REVIEW_AVATAR_COLORS = [
  '#15966A',
  '#2563EB',
  '#D97706',
  '#0D9488',
  '#7C3AED',
  '#E11D48',
] as const;

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-ananya-sharma',
    reviewerName: 'Ananya Sharma',
    roleEn: 'D.Pharm 2nd Year Student · Bhopal',
    roleHi: 'D.Pharm द्वितीय वर्ष विद्यार्थी · भोपाल',
    rating: 5,
    textEn:
      'The bilingual Pharmacology ADME notes and wet granulation diagrams saved me hours before my internal viva. Having both English terms and simple Hindi explanations side by side makes revision effortless.',
    textHi:
      'द्विभाषी फार्माकोलॉजी ADME नोट्स और टैबलेट निर्माण के आरेखों ने वाइवा की तैयारी में बहुत मदद की। अंग्रेज़ी शब्दों के साथ सरल हिंदी समझ से दोहराना आसान हो गया।',
    avatarColor: '#15966A',
    approved: true,
    createdDate: '2026-11-18',
  },
  {
    id: 'rev-rajesh-patel',
    reviewerName: 'Rajesh Patel',
    roleEn: 'Health Awareness Reader · Indore',
    roleHi: 'स्वास्थ्य पाठक · इंदौर',
    rating: 5,
    textEn:
      'The home blood pressure monitoring guide helped my parents stop common cuff mistakes. I appreciate that every medicine monograph lists clear precautions and authentic WHO and NFI references.',
    textHi:
      'घर पर ब्लड प्रेशर मापने के गाइड ने मेरे माता-पिता की सामान्य गलतियों को सुधारने में मदद की। हर दवा की जानकारी में स्पष्ट सावधानियाँ और WHO व NFI संदर्भ दिए गए हैं।',
    avatarColor: '#2563EB',
    approved: true,
    createdDate: '2026-11-15',
  },
  {
    id: 'rev-rohit-meena',
    reviewerName: 'Rohit Meena',
    roleEn: 'D.Pharm 1st Year Student · Sehore',
    roleHi: 'D.Pharm प्रथम वर्ष विद्यार्थी · सीहोर',
    rating: 5,
    textEn:
      'Pharmaceutics practical procedures like Simple Syrup IP and Limit Tests for Chlorides are written cleanly step by step. The downloadable PDF study sheets are super handy before lab exams.',
    textHi:
      'फार्मास्यूटिक्स के प्रैक्टिकल जैसे सिंपल सिरप IP और क्लोराइड लिमिट टेस्ट बहुत साफ और चरणबद्ध तरीके से समझाए गए हैं। PDF स्टडी शीट प्रैक्टिकल परीक्षा से पहले बहुत उपयोगी हैं।',
    avatarColor: '#D97706',
    approved: true,
    createdDate: '2026-11-11',
  },
  {
    id: 'rev-sunita-tiwari',
    reviewerName: 'Sunita Tiwari',
    roleEn: 'Family Caregiver · Bhopal',
    roleHi: 'परिवार की देखभालकर्ता · भोपाल',
    rating: 5,
    textEn:
      'Being able to switch the entire website to Hindi with one click is a blessing. I read the cholesterol and Indian heart-friendly diet articles with my family every weekend.',
    textHi:
      'एक क्लिक में पूरी वेबसाइट को हिंदी में बदल पाना बहुत सुविधाजनक है। मैं अपने परिवार के साथ कोलेस्ट्रॉल और हृदय के अनुकूल भारतीय आहार के लेख नियमित रूप से पढ़ती हूँ।',
    avatarColor: '#0D9488',
    approved: true,
    createdDate: '2026-11-08',
  },
  {
    id: 'rev-vikram-joshi',
    reviewerName: 'Vikram Joshi',
    roleEn: 'Pharmacy Graduate · Jabalpur',
    roleHi: 'फार्मेसी स्नातक · जबलपुर',
    rating: 5,
    textEn:
      'Clean layout, zero clickbait, and responsible educational framing. Searching by generic salt or Indian brand name pulls up mechanism, side effects, and storage guidance within seconds.',
    textHi:
      'साफ-सुथरा डिज़ाइन और जिम्मेदार शैक्षिक सामग्री। जेनेरिक नाम या प्रचलित ब्रांड से खोजने पर दवा की कार्यप्रणाली, दुष्प्रभाव और भंडारण की जानकारी तुरंत मिल जाती है।',
    avatarColor: '#7C3AED',
    approved: true,
    createdDate: '2026-11-03',
  },
  {
    id: 'rev-neha-kulkarni',
    reviewerName: 'Neha Kulkarni',
    roleEn: 'D.Pharm Student · Gwalior',
    roleHi: 'D.Pharm विद्यार्थी · ग्वालियर',
    rating: 5,
    textEn:
      'Community Pharmacy counselling notes and the Important Viva Questions section gave me confidence for my diploma practicals. Thank you Ved’s Medcare for making pharmacy learning accessible.',
    textHi:
      'कम्युनिटी फार्मेसी काउंसलिंग नोट्स और महत्वपूर्ण वाइवा प्रश्नों ने मेरी डिप्लोमा प्रैक्टिकल परीक्षा में आत्मविश्वास बढ़ाया। फार्मेसी शिक्षा को सरल बनाने के लिए धन्यवाद।',
    avatarColor: '#E11D48',
    approved: true,
    createdDate: '2026-10-29',
  },
];
