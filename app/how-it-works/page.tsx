import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { ADOPTION_STEPS, GUARANTEES } from '@/data/contentData';
import { MessageCircle, ArrowRight, ShieldCheck, Plane, Heart, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: `How it works | ${currentSite.brandName}`,
  description:
    'Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.',
};

export default function HowItWorksPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          The Complete Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          How It Works
        </h1>
        <p className="text-base sm:text-lg text-[#5a3a28] leading-relaxed">
          Whether you choose to visit our Downtown Dubai showroom or order a rare pedigree teacup breed from our certified overseas breeders, TeddyPups is here to make every step seamless, safe, and unforgettable.
        </p>
      </div>

      {/* 4 Steps Detailed */}
      <div className="space-y-8">
        {ADOPTION_STEPS.map((step, idx) => {
          const icons = [Heart, ShieldCheck, Plane, Home];
          const Icon = icons[idx % icons.length];

          return (
            <div
              key={step.step}
              className="bg-[#fffdf8] rounded-[36px] border-2 border-[#2a170e]/15 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-8"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#fbe3b4] border-2 border-[#2a170e] flex items-center justify-center shrink-0">
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#c2622b]">
                  {step.step}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#a24a1a]" />
                  <h2 className="font-serif text-2xl font-bold text-[#2a170e]">
                    {step.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health & Import Protocol */}
      <section className="bg-[#2a170e] text-[#fffdf8] rounded-[40px] p-8 sm:p-12 border-3 border-[#f2be6b] space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
            Clinical Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#fffdf8]">
            Our Veterinary Guarantee
          </h2>
          <p className="text-sm sm:text-base text-[#fffdf8]/80 leading-relaxed">
            Every puppy undergoes thorough clinical screenings before departing their birthplace and upon arrival in Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((g, idx) => (
            <div
              key={idx}
              className="bg-[#fffdf8]/5 rounded-3xl p-6 border border-[#fffdf8]/10 space-y-2"
            >
              <h3 className="font-serif text-lg font-bold text-[#f2be6b]">{g.title}</h3>
              <p className="text-xs sm:text-sm text-[#fffdf8]/80 leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-[#fbe3b4] rounded-[40px] p-8 sm:p-12 border-3 border-[#2a170e] text-center space-y-5">
        <h2 className="font-serif text-3xl font-extrabold text-[#2a170e]">
          Ready to Find Your Companion?
        </h2>
        <p className="text-sm sm:text-base text-[#5a3a28] max-w-lg mx-auto">
          Contact our Dubai concierge directly on WhatsApp or browse our gallery of puppies currently available.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/puppies" className="btn-primary text-base py-3 px-8">
            <span>Browse Available Puppies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-base py-3 px-8"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
