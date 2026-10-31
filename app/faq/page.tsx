import React from 'react';
import type { Metadata } from 'next';
import { currentSite } from '@/lib/siteConfig';
import { FAQS } from '@/data/contentData';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `Questions & answers | ${currentSite.brandName}`,
  description:
    'Frequently asked questions about adopting puppies in Dubai, veterinary health checks, international travel, and 24/7 care.',
};

export default function FAQPage() {
  const categories = ['All', 'General', 'Health', 'Travel', 'Support'];

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          every puppy is family
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          Questions & Answers
        </h1>
        <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto">
          Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-[#fffdf8] rounded-2xl border-2 border-[#2a170e]/15 p-6 [&_summary::-webkit-details-marker]:hidden shadow-sm hover:border-[#a24a1a] transition-colors"
          >
            <summary className="flex items-center justify-between cursor-pointer font-serif text-base sm:text-lg font-bold text-[#2a170e]">
              <span className="pr-4">{faq.question}</span>
              <span className="ml-2 shrink-0 transition-transform duration-200 group-open:rotate-180 text-[#a24a1a]">
                ▼
              </span>
            </summary>
            <div className="mt-4 pt-4 border-t border-[#2a170e]/10 text-sm sm:text-base text-[#5a3a28] leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* WhatsApp Support Box */}
      <div className="bg-[#fbe3b4] rounded-[36px] p-8 text-center space-y-4 border-2 border-[#2a170e] max-w-lg mx-auto">
        <h3 className="font-serif text-2xl font-bold text-[#2a170e]">
          Still Have a Question?
        </h3>
        <p className="text-sm text-[#5a3a28]">
          Our adoption advisors are available 24/7 to answer questions, share videos, or schedule your showroom visit.
        </p>
        <div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2.5 px-6"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>Chat on WhatsApp ({currentSite.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
