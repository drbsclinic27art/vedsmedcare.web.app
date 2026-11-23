import React from 'react';
import { useData } from '../context/DataContext';
import { formatWhatsAppUrl } from '../utils/medcareLogic';

export function FloatingWhatsApp() {
  const { siteSettings } = useData();
  const href = formatWhatsAppUrl(
    siteSettings.whatsapp,
    "Hello Ved's Medcare, I would like to ask a question."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Ved's Medcare on WhatsApp (${siteSettings.whatsapp})`}
      title={`WhatsApp ${siteSettings.whatsapp}`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#15966A] text-white shadow-lg hover:bg-[#117A56] hover:scale-105 transition-transform"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.29-1.65a11.87 11.87 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.42Zm-8.46 18.33h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.89-9.92 9.89Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
