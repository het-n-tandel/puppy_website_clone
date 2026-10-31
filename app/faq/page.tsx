'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FAQS } from '@/data/contentData';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import PupBuddy from '@/components/PupBuddy';
import { Search, ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Natural organic tilts and pushpin colors for sticky note aesthetic
  const noteStyles = [
    { tilt: '-1.8deg', pin: '#c2622b', bg: '#fffdf6' },
    { tilt: '1.5deg', pin: '#1f7a4d', bg: '#fffef9' },
    { tilt: '-1.2deg', pin: '#3b82f6', bg: '#fffdf8' },
    { tilt: '2.1deg', pin: '#e4a352', bg: '#fffdf6' },
    { tilt: '-2.4deg', pin: '#e11d48', bg: '#fffef8' },
    { tilt: '1.2deg', pin: '#8b5cf6', bg: '#fffdf6' },
    { tilt: '-1.5deg', pin: '#059669', bg: '#fffef9' },
    { tilt: '2.4deg', pin: '#d97706', bg: '#fffdf8' },
    { tilt: '-1.9deg', pin: '#4f46e5', bg: '#fffdf6' },
  ];

  // Filter questions based on search query
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAQS;
    return FAQS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleQuestion = (idx: number) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <div className="tp-page min-h-screen py-10 sm:py-16 bg-[#fffdf8]">
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <header className="max-w-3xl space-y-3">
          <p className="font-serif italic text-lg sm:text-xl font-bold text-[#c2622b]">
            every puppy is family
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#2a170e] tracking-tight">
            Questions &amp; answers
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] leading-relaxed">
            Everything you need to know about adopting our puppies, health certifications, showroom visits, and overseas import flights.
          </p>
        </header>

        {/* 2-Column Board: Left Search & Teddy, Right Pinned Sticky Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar: Search & Interactive Mascot */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#fffdf8] rounded-[36px] border-3 border-[#2a170e] p-6 sm:p-8 shadow-[5px_6px_0px_#2a170e] space-y-5">
              <label htmlFor="faq-search" className="font-serif italic font-bold text-lg text-[#c2622b] block">
                sniff out a question
              </label>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a170e]/50" />
                <input
                  id="faq-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="delivery, Korea, vaccinated…"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-[#2a170e] bg-white text-[#2a170e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f2be6b] font-medium shadow-inner"
                />
              </div>

              {/* Count Indicator */}
              <p className="text-xs font-bold text-[#a24a1a] tracking-wide uppercase">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'note' : 'notes'} on the board
              </p>

              {/* Curious Mascot with animated ? / ! bubble */}
              <div className="pt-2 flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -top-3 -right-2 bg-[#f2be6b] text-[#2a170e] text-xs font-black px-2 py-0.5 rounded-full border border-[#2a170e] shadow-sm animate-bounce">
                    {expandedId !== null ? '💡 got it!' : '🐾 curious?'}
                  </span>
                  <div className="w-36 sm:w-44">
                    <PupBuddy
                      pose="tilt"
                      facing="right"
                      label="Teddy, curious about your questions"
                    />
                  </div>
                </div>
                <p className="font-serif italic text-xs text-[#5a3a28] mt-2 text-center">
                  Still wondering? We&apos;re 24/7 on WhatsApp!
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="bg-gradient-to-br from-[#eafaf1] to-[#d4f5e2] rounded-[32px] border-2 border-[#1f7a4d]/30 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#1f7a4d]">
                <MessageCircle className="w-5 h-5 fill-[#1f7a4d]/20" />
                <h3 className="font-serif font-bold text-base">Direct Concierge</h3>
              </div>
              <p className="text-xs text-[#2a170e]/80 leading-relaxed">
                Need immediate help with breed details, health charts, or showroom appointments?
              </p>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-5 !bg-[#25D366] !text-white !border-transparent hover:brightness-105 inline-flex items-center gap-1.5"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </aside>

          {/* Right Area: Pinned Sticky Notes Accordion Wall */}
          <div className="lg:col-span-8">
            {filteredFaqs.length === 0 ? (
              <div className="bg-[#fffdf8] rounded-[36px] border-3 border-dashed border-[#2a170e]/30 p-12 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-[#c2622b] mx-auto opacity-60" />
                <h3 className="font-serif text-2xl font-bold text-[#2a170e]">No notes match your sniff</h3>
                <p className="text-sm text-[#5a3a28]">
                  Try searching for keywords like &quot;Korea&quot;, &quot;vaccinated&quot;, or &quot;delivery&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn-primary text-xs py-2 px-5 mt-2"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="space-y-6 list-none p-0" aria-label="Frequently Asked Questions">
                {filteredFaqs.map((faq, idx) => {
                  const style = noteStyles[idx % noteStyles.length];
                  const isExpanded = expandedId === idx;

                  return (
                    <li
                      key={faq.question}
                      className="tp-note relative transition-all duration-300 rounded-[28px] border-2 border-[#2a170e]/20 p-6 sm:p-7 shadow-[4px_5px_0px_#2a170e18] hover:shadow-[4px_6px_0px_#2a170e30] group"
                      style={{
                        backgroundColor: style.bg,
                        transform: `rotate(${isExpanded ? '0deg' : style.tilt})`,
                      }}
                    >
                      {/* Realistic Colorful Pushpin */}
                      <span
                        className="tp-note__pin absolute -top-3.5 left-8 w-6 h-6 rounded-full border-2 border-[#2a170e] shadow-md flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: style.pin }}
                      >
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      </span>

                      {/* Question Button (Accordion Trigger) */}
                      <button
                        type="button"
                        onClick={() => toggleQuestion(idx)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-start justify-between gap-4 text-left focus:outline-none"
                      >
                        <span className="font-serif font-black text-lg sm:text-xl text-[#2a170e] leading-snug group-hover:text-[#c2622b] transition-colors">
                          {faq.question}
                        </span>
                        <span
                          className={`w-8 h-8 rounded-full border-2 border-[#2a170e] flex items-center justify-center shrink-0 transition-transform duration-300 bg-[#fbe3b4] text-[#2a170e] ${
                            isExpanded ? 'rotate-180 bg-[#c2622b] text-white' : ''
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>

                      {/* Expandable Answer */}
                      {isExpanded && (
                        <div className="tp-note__answer mt-4 pt-4 border-t border-[#2a170e]/10 text-sm sm:text-base text-[#5a3a28] leading-relaxed animate-fadeIn">
                          <p>{faq.answer}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#c2622b] uppercase tracking-wider bg-[#fbe3b4]/60 px-2.5 py-0.5 rounded-full border border-[#2a170e]/15">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
