import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { BRAND_IMAGES } from '../data/seedData';
import { Link, usePageSeo } from '../utils/router';
import { SafeImage } from '../components/SafeImage';

export function AboutPage() {
  const { t, loc } = useLanguage();
  const { siteSettings } = useData();

  usePageSeo(`${t.about.pageTitle} — Ved's Medcare`, t.about.pageSubtitle);

  const values = [
    {
      num: '01',
      title: loc('Reliability', 'विश्वसनीयता'),
      desc: loc(
        'Every medicine monograph and health article cites authoritative, traceable public health references such as WHO, NFI, ICMR, and MedlinePlus.',
        'प्रत्येक दवा विवरण और स्वास्थ्य लेख में WHO, NFI, ICMR और MedlinePlus जैसे प्रमाणित स्रोतों का उल्लेख किया जाता है।'
      ),
    },
    {
      num: '02',
      title: loc('Transparency', 'पारदर्शिता'),
      desc: loc(
        'We state review dates, clear educational boundaries, and never make unsupported medical claims or fabricate affiliations.',
        'हम समीक्षा तिथियाँ और शैक्षिक सीमाएँ स्पष्ट रूप से बताते हैं तथा कभी भी निराधार दावे नहीं करते।'
      ),
    },
    {
      num: '03',
      title: loc('Education', 'शिक्षा'),
      desc: loc(
        'Dedicated D.Pharm and pharmacy learning notes help Indian pharmacy students build clear conceptual and practical foundations.',
        'D.Pharm और फार्मेसी विद्यार्थियों के लिए मूल विषय-वार नोट्स और प्रैक्टिकल मार्गदर्शिकाएँ।'
      ),
    },
    {
      num: '04',
      title: loc('Accessibility', 'सुलभता'),
      desc: loc(
        'Native English and Hindi (हिंदी) content ensures essential healthcare literacy reaches families across Bhopal, Madhya Pradesh, and India.',
        'अंग्रेज़ी और हिंदी दोनों भाषाओं में सहज सामग्री ताकि स्वास्थ्य ज्ञान हर परिवार तक पहुँचे।'
      ),
    },
    {
      num: '05',
      title: loc('Responsible Healthcare Information', 'जिम्मेदार स्वास्थ्य जानकारी'),
      desc: loc(
        'We educate without replacing licensed doctors or pharmacists — always encouraging timely clinical consultation.',
        'हम योग्य चिकित्सकों के परामर्श के महत्व को सर्वोपरि रखते हैं और सुरक्षित दवा जागरूकता को बढ़ावा देते हैं।'
      ),
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-[#15966A]">
              {loc(siteSettings.locationEn, siteSettings.locationHi)}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#102A43]">
              {t.about.pageTitle}
            </h1>
            <p className="mt-4 text-base text-[#486581] leading-relaxed max-w-2xl">
              {t.about.pageSubtitle}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#D9E2EC]">
              <SafeImage
                src={BRAND_IMAGES.hero}
                alt="Ved's Medcare healthcare information platform"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E6EDF3]">
        <div className="p-8 bg-white border border-[#D9E2EC] rounded-xl">
          <h2 className="text-xl font-bold text-[#102A43]">{t.about.missionTitle}</h2>
          <p className="mt-4 text-base text-[#334E68] leading-relaxed">{t.about.missionText}</p>
        </div>
        <div className="p-8 bg-[#102A43] text-white rounded-xl">
          <h2 className="text-xl font-bold text-white">{t.about.visionTitle}</h2>
          <p className="mt-4 text-base text-[#D9E2EC] leading-relaxed">{t.about.visionText}</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E6EDF3]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">{t.about.valuesTitle}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val) => (
            <div key={val.num} className="p-6 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl">
              <div className="text-xs font-mono font-semibold text-[#15966A]">{val.num}.</div>
              <h3 className="mt-2 text-lg font-bold text-[#102A43]">{val.title}</h3>
              <p className="mt-2.5 text-sm text-[#486581] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Introduction (strictly truthful, zero invented degrees or affiliations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#D9E2EC] rounded-xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="p-6 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl">
              <div className="text-xs font-semibold text-[#15966A]">{t.about.founderTitle}</div>
              <div className="mt-2 text-2xl font-bold text-[#102A43]">{siteSettings.founderName}</div>
              <div className="mt-1 text-sm text-[#486581]">{t.about.founderRole}</div>
              <div className="mt-5 pt-4 border-t border-[#D9E2EC] space-y-2 text-xs text-[#334E68]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15966A]" aria-hidden="true" />
                  <span>{loc('Bhopal, Madhya Pradesh, India', 'भोपाल, मध्य प्रदेश, भारत')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15966A]" aria-hidden="true" />
                  <span className="font-mono">{siteSettings.instagramHandle}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-[#102A43]">
              {loc("Building Responsible Digital Healthcare Literacy", 'जिम्मेदार डिजिटल स्वास्थ्य साक्षरता का निर्माण')}
            </h2>
            <p className="mt-4 text-base text-[#334E68] leading-relaxed">{t.about.founderBio}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#102A43] text-white hover:bg-[#1D3B58]"
              >
                {t.nav.contact} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/medical-disclaimer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg border border-[#D9E2EC] text-[#102A43] hover:bg-[#F5F8FA]"
              >
                {t.footer.medicalDisclaimer}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
