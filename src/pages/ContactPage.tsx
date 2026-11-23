import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { formatWhatsAppUrl, validateEnquiryInput } from '../utils/medcareLogic';
import { Link, usePageSeo, useRoute } from '../utils/router';

export function ContactPage() {
  const { t, loc } = useLanguage();
  const { siteSettings, submitEnquiry } = useData();
  const { queryParams } = useRoute();

  const initialSourceType =
    queryParams.get('type') === 'product_enquiry' ? 'product_enquiry' : 'contact';
  const initialSubject = queryParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  usePageSeo(`${t.contact.pageTitle} — Ved's Medcare`, t.contact.pageSubtitle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const validation = validateEnquiryInput({
      name,
      email,
      phone,
      subject,
      message,
      consentAccepted,
    });
    setFieldErrors(validation.errors);
    if (!validation.valid) return;

    setSubmitting(true);
    try {
      const result = await submitEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        sourceType: initialSourceType,
        consentAccepted,
      });
      setReceiptId(result.receiptId);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setConsentAccepted(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : loc('Unable to submit your enquiry right now. Please try again.', 'अभी संदेश नहीं भेजा जा सका। कृपया पुनः प्रयास करें।')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-[#F5F8FA] border-b border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43]">{t.contact.pageTitle}</h1>
          <p className="mt-3 text-sm sm:text-base text-[#486581] max-w-2xl leading-relaxed">
            {t.contact.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Official Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl space-y-5">
            <h2 className="text-lg font-bold text-[#102A43]">{t.contact.directChannels}</h2>

            <div className="space-y-4 text-sm text-[#334E68]">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-[#15966A] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[#102A43]">{siteSettings.brandName}</div>
                  <div className="text-xs text-[#486581]">
                    {loc('Founder', 'संस्थापक')}: {siteSettings.founderName}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#15966A] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#627D98]">{loc('Phone & WhatsApp', 'फोन एवं व्हाट्सएप')}</div>
                  <a
                    href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                    className="font-semibold font-mono tabular-nums text-[#102A43] hover:text-[#15966A]"
                  >
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#15966A] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#627D98]">{loc('Official Email', 'आधिकारिक ईमेल')}</div>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="font-semibold text-[#102A43] hover:text-[#15966A] break-all"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#15966A] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#627D98]">{loc('Location', 'स्थान')}</div>
                  <div className="font-medium text-[#102A43]">
                    {loc(siteSettings.locationEn, siteSettings.locationHi)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9E2EC] flex flex-wrap gap-3">
              <a
                href={formatWhatsAppUrl(siteSettings.whatsapp, "Hello Ved's Medcare, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] transition-colors whitespace-nowrap"
              >
                WhatsApp · {siteSettings.phone}
              </a>
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#D9E2EC] bg-white text-[#102A43] hover:border-[#15966A] transition-colors whitespace-nowrap"
              >
                Instagram ({siteSettings.instagramHandle})
              </a>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#D9E2EC] rounded-xl text-xs text-[#486581] leading-relaxed">
            <strong className="text-[#102A43] font-semibold block mb-1.5">
              {t.disclaimer.shortTitle}
            </strong>
            {t.disclaimer.exactText}
          </div>
        </div>

        {/* Right Validated Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-8 bg-white border border-[#D9E2EC] rounded-xl">
            <h2 className="text-xl font-bold text-[#102A43]">{t.contact.formTitle}</h2>

            {receiptId ? (
              <div
                role="status"
                className="mt-6 p-6 bg-[#EDF8F4] border border-[#15966A]/40 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-[#102A43] font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#15966A]" aria-hidden="true" />
                  <span>{t.contact.successTitle}</span>
                </div>
                <p className="text-sm text-[#334E68]">{t.contact.successBody}</p>
                <p className="text-xs font-mono text-[#102A43]">
                  Reference ID: <strong>{receiptId}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setReceiptId('')}
                  className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#102A43] text-white"
                >
                  {loc('Send Another Message', 'एक और संदेश भेजें')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {submitError && (
                  <div
                    role="alert"
                    className="p-3.5 text-sm bg-red-50 border border-red-200 text-red-800 rounded-lg"
                  >
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      {t.contact.phoneLabel} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      {t.contact.subjectLabel} *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.subject}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    {t.contact.messageLabel} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#D9E2EC] rounded-lg text-[#102A43] focus:border-[#15966A] focus:outline-none"
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-red-700">{fieldErrors.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#15966A] rounded"
                    />
                    <span className="text-xs text-[#486581] leading-relaxed">
                      {t.contact.consentLabel}{' '}
                      <Link to="/privacy-policy" className="text-[#15966A] underline">
                        {t.footer.privacyPolicy}
                      </Link>
                    </span>
                  </label>
                  {fieldErrors.consentAccepted && (
                    <p className="mt-1 text-xs text-red-700">{fieldErrors.consentAccepted}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-[#15966A] text-white hover:bg-[#117A56] disabled:opacity-60 transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {submitting ? t.contact.submitting : t.contact.submitButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
