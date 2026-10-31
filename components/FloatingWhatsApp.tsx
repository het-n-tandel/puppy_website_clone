'use client';

import React, { useState } from 'react';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, X } from 'lucide-react';
import { currentSite } from '@/lib/siteConfig';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#fffdf8] text-[#2a170e] text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-[#f2be6b] animate-bounce">
          <span>Chat with our puppy concierge</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#2a170e]/60 hover:text-[#2a170e]"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-[#1f7a4d] hover:bg-[#238b58] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 fill-white text-transparent" />
      </a>
    </div>
  );
}
