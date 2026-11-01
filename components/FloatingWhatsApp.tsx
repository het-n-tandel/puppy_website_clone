'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, Phone, X } from 'lucide-react';
import { currentSite } from '@/lib/siteConfig';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div
      className={`fixed z-50 flex items-center gap-2.5 transition-all duration-300 ${
        isHome ? 'flex sm:hidden' : 'flex'
      }`}
      style={{
        bottom: 'calc(1.2rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.2rem + env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Call button on mobile */}
      <a
        href={`tel:${currentSite.contact.phone}`}
        aria-label="Call us"
        className="w-12 h-12 bg-[#fffdf8] text-[#2a170e] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border-2 border-[#2a170e] hover:scale-105 active:scale-95"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 bg-[#1f7a4d] hover:bg-[#238b58] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#fffdf8]"
      >
        <MessageCircle className="w-6 h-6 fill-white text-transparent" />
      </a>
    </div>
  );
}
