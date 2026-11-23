import type { Language } from '../types/medcare';

export interface UITranslations {
  nav: {
    home: string;
    about: string;
    medicines: string;
    healthAwareness: string;
    pharmacyEducation: string;
    products: string;
    contact: string;
    searchPlaceholder: string;
    searchLabel: string;
    whatsapp: string;
    adminPortal: string;
  };
  hero: {
    heading: string;
    subheading: string;
    exploreMedicines: string;
    exploreBlogs: string;
    pharmacyLearning: string;
    contactUs: string;
    trustCaption: string;
    medicalReviewNote: string;
  };
  home: {
    welcomeTitle: string;
    welcomeLead: string;
    welcomeBody: string;
    founderLine: string;
    servicesTitle: string;
    servicesSubtitle: string;
    medicineSectionTitle: string;
    medicineSectionSubtitle: string;
    medicineSearchCta: string;
    viewAllMedicines: string;
    healthSectionTitle: string;
    healthSectionSubtitle: string;
    viewAllArticles: string;
    pharmacySectionTitle: string;
    pharmacySectionSubtitle: string;
    explorePortal: string;
    featuredArticlesTitle: string;
    productsSectionTitle: string;
    productsSectionSubtitle: string;
    viewAllProducts: string;
    updatesTitle: string;
    updatesSubtitle: string;
    instagramTitle: string;
    instagramBody: string;
    followInstagram: string;
    contactBannerTitle: string;
    contactBannerBody: string;
    contactBannerCta: string;
    testimonialsKicker: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonialsPrev: string;
    testimonialsNext: string;
  };
  medicines: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allDrugCategories: string;
    allTherapeutic: string;
    allLetters: string;
    resultsCount: string;
    noResults: string;
    resetFilters: string;
    genericLabel: string;
    brandsLabel: string;
    classificationLabel: string;
    usesLabel: string;
    mechanismLabel: string;
    sideEffectsLabel: string;
    precautionsLabel: string;
    contraindicationsLabel: string;
    storageLabel: string;
    referencesLabel: string;
    reviewedOn: string;
    backToLibrary: string;
  };
  blog: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    readArticle: string;
    minRead: string;
    publishedLabel: string;
    updatedLabel: string;
    authorLabel: string;
    referencesLabel: string;
    relatedArticles: string;
    shareTitle: string;
    copyLink: string;
    copied: string;
    backToBlog: string;
  };
  pharmacy: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allSubjects: string;
    allLanguages: string;
    shortNotes: string;
    detailedNotes: string;
    definitions: string;
    practicalProcedure: string;
    diagramLabel: string;
    downloadPdf: string;
    copyrightNotice: string;
  };
  products: {
    pageTitle: string;
    pageSubtitle: string;
    catalogueNotice: string;
    allCategories: string;
    featuresLabel: string;
    usageLabel: string;
    precautionsLabel: string;
    enquireButton: string;
    whatsappEnquiry: string;
    viewDetails: string;
    backToCatalogue: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    valuesTitle: string;
    founderTitle: string;
    founderRole: string;
    founderBio: string;
  };
  contact: {
    pageTitle: string;
    pageSubtitle: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    subjectLabel: string;
    messageLabel: string;
    consentLabel: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    directChannels: string;
  };
  disclaimer: {
    shortTitle: string;
    exactText: string;
    learnMore: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legalLinks: string;
    contactInfo: string;
    medicalDisclaimer: string;
    privacyPolicy: string;
    termsConditions: string;
    rightsReserved: string;
  };
}

export const TRANSLATIONS: Record<Language, UITranslations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      medicines: 'Medicine Library',
      healthAwareness: 'Health Awareness',
      pharmacyEducation: 'Pharmacy Education',
      products: 'Healthcare Products',
      contact: 'Contact Us',
      searchPlaceholder: 'Search medicines, health articles, D.Pharm notes, or products...',
      searchLabel: 'Search',
      whatsapp: 'WhatsApp',
      adminPortal: 'Admin Portal',
    },
    hero: {
      heading: 'Your Trusted Healthcare Partner',
      subheading: 'Reliable Medicine Information, Health Awareness & Pharmacy Education.',
      exploreMedicines: 'Explore Medicines',
      exploreBlogs: 'Explore Health Blogs',
      pharmacyLearning: 'Pharmacy Learning',
      contactUs: 'Contact Us',
      trustCaption: 'Bilingual Healthcare & D.Pharm Education · Bhopal, Madhya Pradesh, India',
      medicalReviewNote: 'Educational reference aligned with WHO, NFI & ICMR public health resources.',
    },
    home: {
      welcomeTitle: "Welcome to Ved's Medcare",
      welcomeLead: 'Clear, structured, and responsible healthcare knowledge in Hindi and English.',
      welcomeBody:
        "Ved's Medcare is an educational healthcare and pharmacy knowledge platform founded by Devendra Azad in Bhopal, Madhya Pradesh. We help families understand everyday medicines responsibly, build preventive health habits, and support D.Pharm and pharmacy learners with structured bilingual study notes.",
      founderLine: "Founded by Devendra Azad · Founder, Ved's Medcare",
      servicesTitle: 'Our Core Healthcare Pillars',
      servicesSubtitle:
        'Four structured domains built for public health literacy, safe medicine awareness, and Indian pharmacy education.',
      medicineSectionTitle: 'Evidence-Based Medicine Information',
      medicineSectionSubtitle:
        'Search by medicine name, generic salt, common Indian brand reference, or drug category. Every monograph includes traceable sources and review dates.',
      medicineSearchCta: 'Search Medicines',
      viewAllMedicines: 'Open Full Medicine Library',
      healthSectionTitle: 'Preventive Health Awareness',
      healthSectionSubtitle:
        'Practical bilingual guides across heart health, blood pressure, diabetes, cholesterol, nutrition, first aid, and safe medicine habits.',
      viewAllArticles: 'Browse All Articles',
      pharmacySectionTitle: 'D.Pharm & Pharmacy Education Portal',
      pharmacySectionSubtitle:
        'Original subject-wise study notes, practical procedures, definitions, important exam & viva questions, diagrams, and downloadable PDF study sheets.',
      explorePortal: 'Open Study Dashboard',
      featuredArticlesTitle: 'Featured Health Articles',
      productsSectionTitle: 'Healthcare Products Catalogue',
      productsSectionSubtitle:
        'Informational reference guide for everyday home monitoring devices, first aid kits, and healthcare essentials. Send an enquiry directly for availability details.',
      viewAllProducts: 'Explore Product Catalogue',
      updatesTitle: 'Latest Updates & Monograph Reviews',
      updatesSubtitle: 'Recent additions and editorial review logs across Ved’s Medcare.',
      instagramTitle: "Follow Ved's Medcare on Instagram",
      instagramBody:
        'Connect with @vedsmedcare on Instagram for official bilingual healthcare awareness infographics, pharmacy learning highlights, and community announcements.',
      followInstagram: 'Follow @vedsmedcare',
      contactBannerTitle: 'Have a Question or Product Enquiry?',
      contactBannerBody:
        'Reach out to Ved’s Medcare in Bhopal via our secure contact form or connect directly on WhatsApp for general information and catalogue enquiries.',
      contactBannerCta: 'Contact Us',
      testimonialsKicker: 'Reviews & Testimonials',
      testimonialsTitle: 'What Our Readers & Students Say',
      testimonialsSubtitle:
        'Feedback from families reading our bilingual medicine guides and D.Pharm students preparing with our structured study sheets.',
      testimonialsPrev: 'Previous reviews',
      testimonialsNext: 'Next reviews',
    },
    medicines: {
      pageTitle: 'Medicine Information Library',
      pageSubtitle:
        'Structured bilingual monographs citing WHO Essential Medicines List, National Formulary of India (NFI), and MedlinePlus/NIH. Strictly educational — never a substitute for medical consultation.',
      searchPlaceholder: 'Search by medicine name, generic salt, brand name (e.g. Dolo, Glycomet), or category...',
      allDrugCategories: 'All Drug Categories',
      allTherapeutic: 'All Therapeutic Categories',
      allLetters: 'All',
      resultsCount: 'medicines found',
      noResults: 'No medicines matched your current search and filter criteria.',
      resetFilters: 'Reset Filters',
      genericLabel: 'Generic Name',
      brandsLabel: 'Common Reference Brands',
      classificationLabel: 'Drug Classification',
      usesLabel: 'Common Uses',
      mechanismLabel: 'Mechanism of Action',
      sideEffectsLabel: 'Common Side Effects',
      precautionsLabel: 'Precautions',
      contraindicationsLabel: 'Contraindications',
      storageLabel: 'Storage Information',
      referencesLabel: 'References & Medical Review Information',
      reviewedOn: 'Editorial Review Date',
      backToLibrary: 'Back to Medicine Library',
    },
    blog: {
      pageTitle: 'Health Awareness Blog',
      pageSubtitle:
        'Accessible, referenced health education articles in English and Hindi across preventive care, chronic condition literacy, nutrition, and first aid.',
      searchPlaceholder: 'Search articles by topic, condition, or keyword...',
      allCategories: 'All Categories',
      readArticle: 'Read Article',
      minRead: 'min read',
      publishedLabel: 'Published',
      updatedLabel: 'Last Updated',
      authorLabel: 'Author',
      referencesLabel: 'References & Further Reading',
      relatedArticles: 'Related Health Articles',
      shareTitle: 'Share this article',
      copyLink: 'Copy Link',
      copied: 'Link Copied',
      backToBlog: 'Back to Health Awareness',
    },
    pharmacy: {
      pageTitle: 'Pharmacy Education Portal',
      pageSubtitle:
        'Subject-wise bilingual learning hub tailored for D.Pharm and pharmacy students across India. Original study notes, practical procedures, diagrams, viva preparation, and PDF study sheets.',
      searchPlaceholder: 'Search topics, definitions, or practicals...',
      allSubjects: 'All Subjects',
      allLanguages: 'All Languages',
      shortNotes: 'Short Revision Notes',
      detailedNotes: 'Detailed Explanation',
      definitions: 'Important Definitions',
      practicalProcedure: 'Practical Procedure & Observations',
      diagramLabel: 'Reference Schematic Diagram',
      downloadPdf: 'Download Study Sheet (PDF)',
      copyrightNotice:
        "All study materials published on Ved's Medcare are original educational summaries prepared for student revision. Copyrighted third-party textbooks are not hosted or redistributed.",
    },
    products: {
      pageTitle: 'Healthcare Products Catalogue',
      pageSubtitle:
        'Informational guide to everyday home healthcare equipment, first aid supplies, personal care items, and medical accessories.',
      catalogueNotice:
        'Informational Catalogue Notice: This catalogue is strictly for product awareness and general enquiry. Ved’s Medcare does not operate an online prescription medicine store or accept online orders for restricted medicines.',
      allCategories: 'All Categories',
      featuresLabel: 'Key Features',
      usageLabel: 'Usage Information',
      precautionsLabel: 'Important Precautions',
      enquireButton: 'Send Product Enquiry',
      whatsappEnquiry: 'Enquire on WhatsApp',
      viewDetails: 'View Specifications',
      backToCatalogue: 'Back to Products Catalogue',
    },
    about: {
      pageTitle: "About Ved's Medcare",
      pageSubtitle:
        'Building a trustworthy, bilingual digital platform for responsible medicine awareness, preventive health literacy, and pharmacy education in India.',
      missionTitle: 'Our Mission',
      missionText:
        'To provide accessible, reliable and easy-to-understand medicine information, health awareness and pharmacy education.',
      visionTitle: 'Our Vision',
      visionText:
        'To develop a trusted digital platform for healthcare knowledge and public awareness.',
      valuesTitle: 'Our Core Values',
      founderTitle: 'Founder Message',
      founderRole: "Founder, Ved's Medcare · Bhopal, Madhya Pradesh",
      founderBio:
        "Devendra Azad founded Ved's Medcare in Bhopal with a clear objective: making structured, plain-language healthcare awareness and bilingual pharmacy study resources accessible to families and students across India. Every resource on this platform prioritizes transparency, cited public-health references, and responsible guidance that always respects the role of qualified healthcare professionals.",
    },
    contact: {
      pageTitle: "Contact Ved's Medcare",
      pageSubtitle:
        'Reach out for general inquiries, pharmacy study suggestions, editorial feedback, or healthcare product catalogue enquiries.',
      formTitle: 'Send a Message',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp Number',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      consentLabel:
        "I agree to the Privacy Policy and consent to Ved's Medcare storing my contact details solely to respond to this enquiry. I understand this form is not for medical emergencies or personal prescriptions.",
      submitButton: 'Submit Enquiry',
      submitting: 'Validating & Sending...',
      successTitle: 'Enquiry Received Successfully',
      successBody:
        "Thank you for contacting Ved's Medcare. Your message has been securely validated and logged for our team.",
      directChannels: 'Official Contact Details',
    },
    disclaimer: {
      shortTitle: 'Medical Disclaimer',
      exactText:
        'Ved’s Medcare provides educational healthcare and medicine information. Website content is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for individual medical concerns. Never start, stop or change prescribed medication based only on website content.',
      learnMore: 'Read Full Disclaimer',
    },
    footer: {
      tagline: 'Your Trusted Healthcare Partner — Bilingual Medicine Information, Health Awareness & Pharmacy Education.',
      quickLinks: 'Explore Platform',
      legalLinks: 'Policies & Legal',
      contactInfo: 'Contact & Social',
      medicalDisclaimer: 'Medical Disclaimer',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      rightsReserved: "All rights reserved. Educational healthcare & pharmacy information platform.",
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      medicines: 'दवा लाइब्रेरी',
      healthAwareness: 'स्वास्थ्य जागरूकता',
      pharmacyEducation: 'फार्मेसी शिक्षा',
      products: 'हेल्थकेयर उत्पाद',
      contact: 'संपर्क करें',
      searchPlaceholder: 'दवाइयाँ, स्वास्थ्य लेख, D.Pharm नोट्स या उत्पाद खोजें...',
      searchLabel: 'खोजें',
      whatsapp: 'व्हाट्सएप',
      adminPortal: 'एडमिन पोर्टल',
    },
    hero: {
      heading: 'आपका विश्वसनीय हेल्थकेयर पार्टनर',
      subheading: 'विश्वसनीय दवा जानकारी, स्वास्थ्य जागरूकता और फार्मेसी शिक्षा।',
      exploreMedicines: 'दवाइयाँ देखें',
      exploreBlogs: 'स्वास्थ्य ब्लॉग पढ़ें',
      pharmacyLearning: 'फार्मेसी शिक्षा',
      contactUs: 'संपर्क करें',
      trustCaption: 'द्विभाषी स्वास्थ्य एवं D.Pharm शिक्षा मंच · भोपाल, मध्य प्रदेश, भारत',
      medicalReviewNote: 'WHO, NFI और ICMR जैसे प्रमाणित सार्वजनिक स्वास्थ्य स्रोतों पर आधारित शैक्षिक जानकारी।',
    },
    home: {
      welcomeTitle: 'वेद’स मेडकेयर में आपका स्वागत है',
      welcomeLead: 'हिंदी और अंग्रेज़ी में स्पष्ट, संरचित और जिम्मेदार स्वास्थ्य ज्ञान।',
      welcomeBody:
        'वेद’स मेडकेयर एक शैक्षिक स्वास्थ्य और फार्मेसी ज्ञान मंच है, जिसकी स्थापना देवेंद्र आज़ाद ने भोपाल, मध्य प्रदेश में की है। हमारा उद्देश्य परिवारों को दवाओं की सही और जिम्मेदार समझ देना, निवारक स्वास्थ्य आदतों को बढ़ावा देना और D.Pharm तथा फार्मेसी विद्यार्थियों के लिए सरल द्विभाषी अध्ययन सामग्री उपलब्ध कराना है।',
      founderLine: 'संस्थापक: देवेंद्र आज़ाद · संस्थापक, वेद’स मेडकेयर',
      servicesTitle: 'हमारी प्रमुख सेवाएँ',
      servicesSubtitle:
        'जन-स्वास्थ्य साक्षरता, सुरक्षित दवा उपयोग जागरूकता और भारतीय फार्मेसी शिक्षा के चार प्रमुख स्तंभ।',
      medicineSectionTitle: 'प्रमाण-आधारित दवा जानकारी',
      medicineSectionSubtitle:
        'दवा के नाम, जेनेरिक सॉल्ट, प्रचलित ब्रांड संदर्भ या दवा श्रेणी के आधार पर खोजें। प्रत्येक जानकारी में स्रोत और समीक्षा तिथि शामिल है।',
      medicineSearchCta: 'दवा खोजें',
      viewAllMedicines: 'संपूर्ण दवा लाइब्रेरी देखें',
      healthSectionTitle: 'निवारक स्वास्थ्य जागरूकता',
      healthSectionSubtitle:
        'हृदय स्वास्थ्य, ब्लड प्रेशर, मधुमेह, कोलेस्ट्रॉल, पोषण, प्राथमिक उपचार और सुरक्षित दवा उपयोग पर सरल द्विभाषी लेख।',
      viewAllArticles: 'सभी लेख पढ़ें',
      pharmacySectionTitle: 'D.Pharm और फार्मेसी शिक्षा पोर्टल',
      pharmacySectionSubtitle:
        'विषय-वार मूल अध्ययन नोट्स, प्रैक्टिकल प्रक्रियाएँ, महत्वपूर्ण परिभाषाएँ, परीक्षा व वाइवा प्रश्न, आरेख और डाउनलोड करने योग्य PDF स्टडी शीट।',
      explorePortal: 'अध्ययन डैशबोर्ड खोलें',
      featuredArticlesTitle: 'प्रमुख स्वास्थ्य लेख',
      productsSectionTitle: 'हेल्थकेयर उत्पाद कैटलॉग',
      productsSectionSubtitle:
        'घरेलू स्वास्थ्य उपकरण, प्राथमिक उपचार किट और हेल्थकेयर आवश्यकताओं की जानकारीपूर्ण मार्गदर्शिका। जानकारी के लिए सीधे पूछताछ भेजें।',
      viewAllProducts: 'उत्पाद कैटलॉग देखें',
      updatesTitle: 'नवीनतम अपडेट और समीक्षा लॉग',
      updatesSubtitle: 'वेद’स मेडकेयर पर हाल ही में जोड़ी और समीक्षित की गई सामग्री।',
      instagramTitle: 'इंस्टाग्राम पर वेद’स मेडकेयर से जुड़ें',
      instagramBody:
        'आधिकारिक द्विभाषी स्वास्थ्य जागरूकता पोस्ट, फार्मेसी शिक्षा अपडेट और सामुदायिक सूचनाओं के लिए इंस्टाग्राम पर @vedsmedcare को फॉलो करें।',
      followInstagram: '@vedsmedcare फॉलो करें',
      contactBannerTitle: 'कोई प्रश्न या उत्पाद संबंधी पूछताछ है?',
      contactBannerBody:
        'सामान्य जानकारी और कैटलॉग पूछताछ के लिए हमारे सुरक्षित संपर्क फॉर्म का उपयोग करें या भोपाल में वेद’स मेडकेयर से व्हाट्सएप पर जुड़ें।',
      contactBannerCta: 'संपर्क करें',
      testimonialsKicker: 'समीक्षाएँ एवं प्रशंसापत्र',
      testimonialsTitle: 'हमारे पाठक और विद्यार्थी क्या कहते हैं',
      testimonialsSubtitle:
        'हमारी द्विभाषी दवा जानकारी पढ़ने वाले पाठकों और D.Pharm अध्ययन नोट्स से तैयारी करने वाले विद्यार्थियों के अनुभव।',
      testimonialsPrev: 'पिछली समीक्षाएँ',
      testimonialsNext: 'अगली समीक्षाएँ',
    },
    medicines: {
      pageTitle: 'दवा जानकारी लाइब्रेरी',
      pageSubtitle:
        'WHO आवश्यक दवा सूची, नेशनल फॉर्म्युलरी ऑफ इंडिया (NFI) और MedlinePlus/NIH पर आधारित द्विभाषी शैक्षिक जानकारी। यह केवल शिक्षा हेतु है — चिकित्सीय परामर्श का विकल्प नहीं।',
      searchPlaceholder: 'दवा का नाम, जेनेरिक नाम, ब्रांड (जैसे Dolo, Glycomet) या श्रेणी से खोजें...',
      allDrugCategories: 'सभी दवा श्रेणियाँ',
      allTherapeutic: 'सभी चिकित्सीय श्रेणियाँ',
      allLetters: 'सभी',
      resultsCount: 'दवाइयाँ मिलीं',
      noResults: 'आपकी खोज और फ़िल्टर के अनुसार कोई दवा नहीं मिली।',
      resetFilters: 'फ़िल्टर रीसेट करें',
      genericLabel: 'जेनेरिक नाम',
      brandsLabel: 'प्रचलित संदर्भ ब्रांड',
      classificationLabel: 'दवा वर्गीकरण',
      usesLabel: 'सामान्य उपयोग',
      mechanismLabel: 'कार्यप्रणाली (Mechanism of Action)',
      sideEffectsLabel: 'सामान्य दुष्प्रभाव',
      precautionsLabel: 'सावधानियाँ',
      contraindicationsLabel: 'कब न लें (Contraindications)',
      storageLabel: 'भंडारण संबंधी जानकारी',
      referencesLabel: 'संदर्भ एवं चिकित्सीय समीक्षा जानकारी',
      reviewedOn: 'समीक्षा तिथि',
      backToLibrary: 'दवा लाइब्रेरी पर वापस जाएँ',
    },
    blog: {
      pageTitle: 'स्वास्थ्य जागरूकता ब्लॉग',
      pageSubtitle:
        'निवारक देखभाल, दीर्घकालिक रोग जागरूकता, पोषण और प्राथमिक उपचार पर हिंदी और अंग्रेज़ी में प्रमाणित लेख।',
      searchPlaceholder: 'विषय, स्वास्थ्य स्थिति या कीवर्ड से लेख खोजें...',
      allCategories: 'सभी श्रेणियाँ',
      readArticle: 'लेख पढ़ें',
      minRead: 'मिनट पठन',
      publishedLabel: 'प्रकाशित',
      updatedLabel: 'अंतिम अपडेट',
      authorLabel: 'लेखक',
      referencesLabel: 'संदर्भ एवं स्रोत',
      relatedArticles: 'संबंधित स्वास्थ्य लेख',
      shareTitle: 'इस लेख को साझा करें',
      copyLink: 'लिंक कॉपी करें',
      copied: 'लिंक कॉपी हुआ',
      backToBlog: 'स्वास्थ्य ब्लॉग पर वापस जाएँ',
    },
    pharmacy: {
      pageTitle: 'फार्मेसी शिक्षा पोर्टल',
      pageSubtitle:
        'भारत के D.Pharm और फार्मेसी छात्रों के लिए विषय-वार द्विभाषी अध्ययन मंच। मूल नोट्स, प्रैक्टिकल प्रक्रियाएँ, आरेख, वाइवा प्रश्न और PDF स्टडी शीट।',
      searchPlaceholder: 'विषय, परिभाषा या प्रैक्टिकल खोजें...',
      allSubjects: 'सभी विषय',
      allLanguages: 'सभी भाषाएँ',
      shortNotes: 'संक्षिप्त रिवीज़न नोट्स',
      detailedNotes: 'विस्तृत विवरण',
      definitions: 'महत्वपूर्ण परिभाषाएँ',
      practicalProcedure: 'प्रैक्टिकल प्रक्रिया एवं अवलोकन',
      diagramLabel: 'संदर्भ आरेख (Diagram)',
      downloadPdf: 'स्टडी शीट डाउनलोड करें (PDF)',
      copyrightNotice:
        'वेद’स मेडकेयर पर उपलब्ध सभी अध्ययन सामग्री छात्रों के रिवीज़न हेतु मूल शैक्षिक सारांश हैं। किसी भी कॉपीराइट पुस्तक की प्रति यहाँ होस्ट नहीं की जाती।',
    },
    products: {
      pageTitle: 'हेल्थकेयर उत्पाद कैटलॉग',
      pageSubtitle:
        'घरेलू स्वास्थ्य उपकरणों, प्राथमिक उपचार सामग्री, पर्सनल केयर और मेडिकल एक्सेसरीज़ की जानकारीपूर्ण सूची।',
      catalogueNotice:
        'सूचनात्मक कैटलॉग नोटिस: यह कैटलॉग केवल उत्पाद जानकारी और पूछताछ हेतु है। वेद’स मेडकेयर ऑनलाइन प्रिस्क्रिप्शन दवा विक्रय या प्रतिबंधित दवाओं का ऑनलाइन ऑर्डर स्वीकार नहीं करता।',
      allCategories: 'सभी श्रेणियाँ',
      featuresLabel: 'प्रमुख विशेषताएँ',
      usageLabel: 'उपयोग विधि',
      precautionsLabel: 'महत्वपूर्ण सावधानियाँ',
      enquireButton: 'उत्पाद पूछताछ भेजें',
      whatsappEnquiry: 'व्हाट्सएप पर पूछताछ करें',
      viewDetails: 'विवरण देखें',
      backToCatalogue: 'उत्पाद कैटलॉग पर वापस जाएँ',
    },
    about: {
      pageTitle: 'वेद’स मेडकेयर के बारे में',
      pageSubtitle:
        'भारत में जिम्मेदार दवा जानकारी, स्वास्थ्य जागरूकता और फार्मेसी शिक्षा के लिए एक विश्वसनीय द्विभाषी डिजिटल मंच।',
      missionTitle: 'हमारा मिशन',
      missionText:
        'सुलभ, विश्वसनीय और आसानी से समझ में आने वाली दवा जानकारी, स्वास्थ्य जागरूकता और फार्मेसी शिक्षा प्रदान करना।',
      visionTitle: 'हमारा दृष्टिकोण',
      visionText:
        'स्वास्थ्य ज्ञान और जन-जागरूकता के लिए एक विश्वसनीय डिजिटल मंच का विकास करना।',
      valuesTitle: 'हमारे मूल मूल्य',
      founderTitle: 'संस्थापक संदेश',
      founderRole: 'संस्थापक, वेद’स मेडकेयर · भोपाल, मध्य प्रदेश',
      founderBio:
        'देवेंद्र आज़ाद ने भोपाल में वेद’स मेडकेयर की स्थापना एक स्पष्ट उद्देश्य के साथ की — भारत के परिवारों और छात्रों तक सरल भाषा में जिम्मेदार स्वास्थ्य जागरूकता और द्विभाषी फार्मेसी अध्ययन सामग्री पहुँचाना। इस मंच की हर जानकारी पारदर्शिता, प्रमाणित सार्वजनिक स्वास्थ्य स्रोतों और योग्य चिकित्सकों के परामर्श के महत्व को प्राथमिकता देती है।',
    },
    contact: {
      pageTitle: 'वेद’स मेडकेयर से संपर्क करें',
      pageSubtitle:
        'सामान्य पूछताछ, फार्मेसी अध्ययन सुझाव, संपादकीय प्रतिक्रिया या हेल्थकेयर उत्पाद जानकारी के लिए हमसे संपर्क करें।',
      formTitle: 'संदेश भेजें',
      nameLabel: 'पूरा नाम',
      emailLabel: 'ईमेल पता',
      phoneLabel: 'फोन / व्हाट्सएप नंबर',
      subjectLabel: 'विषय',
      messageLabel: 'संदेश',
      consentLabel:
        'मैं गोपनीयता नीति से सहमत हूँ और इस पूछताछ का उत्तर देने हेतु वेद’स मेडकेयर द्वारा मेरे संपर्क विवरण सहेजने की अनुमति देता/देती हूँ। मैं समझता/समझती हूँ कि यह फॉर्म चिकित्सीय आपातकाल या व्यक्तिगत प्रिस्क्रिप्शन के लिए नहीं है।',
      submitButton: 'पूछताछ भेजें',
      submitting: 'सत्यापन और प्रेषण हो रहा है...',
      successTitle: 'पूछताछ सफलतापूर्वक प्राप्त हुई',
      successBody:
        'वेद’स मेडकेयर से संपर्क करने के लिए धन्यवाद। आपका संदेश सुरक्षित रूप से सत्यापित और दर्ज कर लिया गया है।',
      directChannels: 'आधिकारिक संपर्क विवरण',
    },
    disclaimer: {
      shortTitle: 'चिकित्सीय अस्वीकरण (Medical Disclaimer)',
      exactText:
        'वेद’स मेडकेयर शैक्षिक स्वास्थ्य और दवा संबंधी जानकारी प्रदान करता है। वेबसाइट की सामग्री पेशेवर चिकित्सीय सलाह, निदान या उपचार का विकल्प नहीं है। व्यक्तिगत स्वास्थ्य समस्याओं के लिए सदैव योग्य चिकित्सक से परामर्श लें। केवल वेबसाइट की जानकारी के आधार पर कभी भी निर्धारित दवा शुरू, बंद या परिवर्तित न करें।',
      learnMore: 'पूर्ण अस्वीकरण पढ़ें',
    },
    footer: {
      tagline: 'आपका विश्वसनीय हेल्थकेयर पार्टनर — द्विभाषी दवा जानकारी, स्वास्थ्य जागरूकता और फार्मेसी शिक्षा।',
      quickLinks: 'मंच के अनुभाग',
      legalLinks: 'नीतियाँ एवं कानूनी जानकारी',
      contactInfo: 'संपर्क और सोशल मीडिया',
      medicalDisclaimer: 'चिकित्सीय अस्वीकरण',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम एवं शर्तें',
      rightsReserved: 'सर्वाधिकार सुरक्षित। शैक्षिक स्वास्थ्य एवं फार्मेसी जानकारी मंच।',
    },
  },
};
