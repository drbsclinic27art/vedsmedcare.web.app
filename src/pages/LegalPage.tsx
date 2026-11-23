import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link, usePageSeo } from '../utils/router';

interface LegalPageProps {
  page: 'disclaimer' | 'privacy' | 'terms';
}

export function LegalPage({ page }: LegalPageProps) {
  const { t, loc } = useLanguage();
  const { siteSettings } = useData();

  const meta = {
    disclaimer: {
      title: t.footer.medicalDisclaimer,
      desc: "Official Medical Disclaimer for Ved's Medcare educational healthcare & pharmacy platform.",
    },
    privacy: {
      title: t.footer.privacyPolicy,
      desc: "Privacy Policy and contact form data consent practices for Ved's Medcare.",
    },
    terms: {
      title: t.footer.termsConditions,
      desc: "Terms and Conditions governing use of Ved's Medcare website and educational resources.",
    },
  }[page];

  usePageSeo(`${meta.title} — Ved's Medcare`, meta.desc);

  return (
    <div className="bg-white">
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#102A43]">{meta.title}</h1>
          <p className="mt-2 text-xs font-mono text-[#627D98]">
            {siteSettings.brandName} · {loc(siteSettings.locationEn, siteSettings.locationHi)} · Updated November 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm sm:text-base text-[#334E68] leading-relaxed">
        {page === 'disclaimer' && (
          <>
            <div className="p-6 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#15966A] mt-0.5 shrink-0" aria-hidden="true" />
              <p className="font-medium text-[#102A43]">
                {loc(
                  'Ved’s Medcare provides educational healthcare and medicine information. Website content is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for individual medical concerns. Never start, stop or change prescribed medication based only on website content.',
                  t.disclaimer.exactText
                )}
              </p>
            </div>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('No Doctor–Patient Relationship or Prescriptions', 'कोई डॉक्टर-मरीज संबंध या प्रिस्क्रिप्शन नहीं')}
              </h2>
              <p>
                {loc(
                  "Reading articles, medicine monographs, or contacting Ved's Medcare via form or WhatsApp does not create a clinical or doctor–patient relationship. We do not diagnose conditions, issue prescriptions, or recommend personalized medication dosages.",
                  'वेद’स मेडकेयर पर लेख या दवा विवरण पढ़ना अथवा संपर्क करना किसी भी प्रकार का चिकित्सीय परामर्श या प्रिस्क्रिप्शन नहीं है।'
                )}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('Medical Emergencies', 'चिकित्सीय आपातकाल')}
              </h2>
              <p>
                {loc(
                  'If you suspect a medical emergency, allergic reaction, or overdose, immediately call local emergency services (108 or 112 in India) or visit the nearest hospital emergency department.',
                  'किसी भी चिकित्सीय आपातकाल की स्थिति में तुरंत स्थानीय आपातकालीन सेवा (भारत में 108 या 112) पर कॉल करें या निकटतम अस्पताल जाएँ।'
                )}
              </p>
            </section>
          </>
        )}

        {page === 'privacy' && (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('1. Information Collected via Contact & Enquiry Forms', '1. संपर्क एवं पूछताछ फॉर्म द्वारा एकत्र जानकारी')}
              </h2>
              <p>
                {loc(
                  'When you voluntarily submit the Contact Us or Product Enquiry form with explicit consent, we collect your name, email address, phone number, subject, and message strictly for responding to your enquiry. Submissions are validated server-side and stored in access-controlled Firestore records readable solely by authorized administrators.',
                  'जब आप सहमति के साथ संपर्क या उत्पाद पूछताछ फॉर्म भरते हैं, तो हम आपका नाम, ईमेल, फोन नंबर, विषय और संदेश केवल आपके प्रश्न का उत्तर देने के उद्देश्य से सुरक्षित रूप से सहेजते हैं।'
                )}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('2. Language Preference & Local Storage', '2. भाषा वरीयता एवं लोकल स्टोरेज')}
              </h2>
              <p>
                {loc(
                  'We store your chosen interface language (English or Hindi) in browser localStorage so your reading preference persists smoothly across pages. No sensitive health or personal data is stored in browser cookies.',
                  'आपकी चयनित भाषा (अंग्रेज़ी या हिंदी) को केवल ब्राउज़र के लोकल स्टोरेज में सहेजा जाता है ताकि नेविगेशन के दौरान आपकी पसंद याद रहे।'
                )}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('3. Data Protection & Deletion Requests', '3. डेटा सुरक्षा एवं हटाने का अनुरोध')}
              </h2>
              <p>
                {loc(
                  `We never sell or rent visitor enquiry details to third parties. To request review or deletion of an enquiry you submitted, contact ${siteSettings.brandName} at ${siteSettings.phone} or through the Contact page.`,
                  `हम आगंतुकों का संपर्क डेटा कभी किसी तीसरे पक्ष को नहीं बेचते। अपने डेटा को हटाने हेतु ${siteSettings.phone} या संपर्क पृष्ठ पर अनुरोध करें।`
                )}
              </p>
            </section>
          </>
        )}

        {page === 'terms' && (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('1. Educational & Informational Use', '1. शैक्षिक एवं सूचनात्मक उपयोग')}
              </h2>
              <p>
                {loc(
                  "All content published on Ved's Medcare—including the Medicine Library, Health Awareness Blog, D.Pharm Pharmacy Education Portal, and Healthcare Products Catalogue—is provided for lawful educational and informational awareness.",
                  'वेद’स मेडकेयर पर प्रकाशित सभी सामग्री केवल शैक्षिक और सूचनात्मक जागरूकता के उद्देश्य से है।'
                )}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('2. Informational Products Catalogue (No Restricted Medicine Sales)', '2. सूचनात्मक उत्पाद कैटलॉग')}
              </h2>
              <p>
                {loc(
                  "The Healthcare Products section serves solely as an informational catalogue and enquiry directory. Ved's Medcare does not process online checkout orders for prescription-only or restricted medicines.",
                  'हेल्थकेयर उत्पाद अनुभाग केवल सूचनात्मक कैटलॉग है। इस वेबसाइट पर प्रतिबंधित या प्रिस्क्रिप्शन दवाओं की ऑनलाइन बिक्री नहीं की जाती।'
                )}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#102A43]">
                {loc('3. Intellectual Property & Study Notes', '3. बौद्धिक संपदा और अध्ययन नोट्स')}
              </h2>
              <p>
                {loc(
                  "Original bilingual articles and D.Pharm revision study sheets published by Ved's Medcare may be used for personal non-commercial student learning. Unauthorized commercial reproduction without permission is prohibited.",
                  'वेद’स मेडकेयर के मूल द्विभाषी लेख और D.Pharm नोट्स व्यक्तिगत छात्र अध्ययन के लिए हैं। बिना अनुमति व्यावसायिक पुनरुत्पादन निषिद्ध है।'
                )}
              </p>
            </section>
          </>
        )}

        <div className="pt-8 border-t border-[#E6EDF3] flex flex-wrap gap-4 text-xs font-semibold">
          <Link to="/medical-disclaimer" className="text-[#15966A] hover:underline">
            {t.footer.medicalDisclaimer}
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/privacy-policy" className="text-[#15966A] hover:underline">
            {t.footer.privacyPolicy}
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms" className="text-[#15966A] hover:underline">
            {t.footer.termsConditions}
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/contact" className="text-[#102A43] hover:underline">
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
