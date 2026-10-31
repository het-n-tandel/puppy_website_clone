'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import PupBuddy from '@/components/PupBuddy';
import {
  Heart,
  ShieldCheck,
  Plane,
  Home,
  MessageCircle,
  Clock,
  Sparkles,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'local' | 'imported'>('local');

  const localSteps = [
    {
      num: '1',
      title: 'Explore our puppies',
      desc: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.',
      icon: Search,
      tint: '#fbe3b4',
    },
    {
      num: '2',
      title: 'Choose your puppy',
      desc: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.',
      icon: Heart,
      tint: '#fed0e0',
    },
    {
      num: '3',
      title: 'Meet before you choose',
      desc: 'Spend time bonding before making your decision. Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.',
      icon: Sparkles,
      tint: '#bfddf5',
    },
    {
      num: '4',
      title: 'Pick-up or delivery',
      desc: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.',
      icon: Home,
      tint: '#dcf8c6',
    },
  ];

  const importedSteps = [
    {
      num: '1',
      title: 'Reserve your puppy',
      desc: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.',
      icon: Award,
      tint: '#fbe3b4',
    },
    {
      num: '2',
      title: 'Personalized consultation',
      desc: 'Once your reservation is confirmed, we will work closely with you to finalize details and provide video check-ins and health updates on your puppy’s journey.',
      icon: MessageCircle,
      tint: '#e0cbfb',
    },
    {
      num: '3',
      title: 'Import and arrival',
      desc: 'We manage all aspects of the import process, including health checks, flight nanny travel arrangements, and necessary documentation. Your puppy will arrive ready to join your family.',
      icon: Plane,
      tint: '#bfddf5',
    },
    {
      num: '4',
      title: 'Welcome home',
      desc: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available 24/7 for any additional assistance.',
      icon: Home,
      tint: '#dcf8c6',
    },
  ];

  const activeSteps = activeTab === 'local' ? localSteps : importedSteps;

  return (
    <div className="tp-page min-h-screen py-10 sm:py-16 bg-[#fffdf8]">
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <header className="max-w-4xl space-y-4">
          <p className="font-serif italic text-lg sm:text-xl font-bold text-[#c2622b]">
            every puppy is family
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-[#2a170e] tracking-tight">
            How it works
          </h1>
          <p className="text-base sm:text-xl text-[#5a3a28] max-w-2xl leading-relaxed">
            Whether you choose to visit us locally in Downtown Dubai or order a rare teacup puppy from overseas, TeddyPups is here to make the experience seamless and unforgettable.
          </p>

          {/* Subnav Chips */}
          <nav aria-label="Page sections" className="tp-chips flex flex-wrap gap-2.5 pt-4">
            <a href="#two-ways" className="chip h-11 border-2 border-[#2a170e] bg-[#fffdf8] px-4 hover:bg-[#fbe3b4] rounded-full inline-flex items-center gap-2 text-sm font-bold text-[#2a170e] shadow-sm">
              <span className="font-serif text-[#c2622b]">1</span> Two ways home
            </a>
            <a href="#promise" className="chip h-11 border-2 border-[#2a170e] bg-[#fffdf8] px-4 hover:bg-[#fbe3b4] rounded-full inline-flex items-center gap-2 text-sm font-bold text-[#2a170e] shadow-sm">
              <span className="font-serif text-[#c2622b]">2</span> Our premium puppy promise
            </a>
            <a href="#delivery" className="chip h-11 border-2 border-[#2a170e] bg-[#fffdf8] px-4 hover:bg-[#fbe3b4] rounded-full inline-flex items-center gap-2 text-sm font-bold text-[#2a170e] shadow-sm">
              <span className="font-serif text-[#c2622b]">3</span> Delivery &amp; collection
            </a>
            <a href="#why" className="chip h-11 border-2 border-[#2a170e] bg-[#fffdf8] px-4 hover:bg-[#fbe3b4] rounded-full inline-flex items-center gap-2 text-sm font-bold text-[#2a170e] shadow-sm">
              <span className="font-serif text-[#c2622b]">4</span> Why choose us
            </a>
          </nav>
        </header>

        {/* 1. TWO WAYS HOME WITH INTERACTIVE TAB SWITCHER */}
        <section id="two-ways" className="tp-journeys rounded-[40px] bg-gradient-to-b from-[#fff1d8] to-[#fbe3b4] border-3 border-[#2a170e] p-6 sm:p-12 shadow-[6px_8px_0px_#2a170e]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-serif italic text-lg font-bold text-[#c2622b]">
                choose your way
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e]">
                Two ways home
              </h2>
            </div>

            {/* Whimsical Dual Tab Switcher */}
            <div className="tp-switch inline-flex p-1.5 bg-[#2a170e] rounded-full border-2 border-[#2a170e] shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('local')}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 flex flex-col items-center leading-tight ${
                  activeTab === 'local'
                    ? 'bg-[#f2be6b] text-[#2a170e] shadow-md scale-102'
                    : 'text-[#fffdf8]/80 hover:text-white'
                }`}
              >
                <span>In Dubai</span>
                <span className="text-[11px] font-normal opacity-90">meet in person</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('imported')}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 flex flex-col items-center leading-tight ${
                  activeTab === 'imported'
                    ? 'bg-[#f2be6b] text-[#2a170e] shadow-md scale-102'
                    : 'text-[#fffdf8]/80 hover:text-white'
                }`}
              >
                <span>Imported</span>
                <span className="text-[11px] font-normal opacity-90">order upon request</span>
              </button>
            </div>
          </div>

          {/* Stepper Grid */}
          <ol className="tp-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {activeSteps.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.num}
                  className="tp-step bg-[#fffdf8] rounded-[32px] border-2 border-[#2a170e] p-6 shadow-[3px_4px_0px_#2a170e] flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-12 h-12 rounded-2xl border-2 border-[#2a170e] flex items-center justify-center font-serif font-black text-xl text-[#2a170e]" style={{ backgroundColor: step.tint }}>
                        {step.num}
                      </span>
                      <Icon className="w-6 h-6 text-[#c2622b]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#2a170e] leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5a3a28] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#2a170e]/10 mt-6 flex items-center gap-1.5 text-xs font-bold text-[#c2622b]">
                    <span>Step {step.num} of 4</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* 2. OUR PREMIUM PUPPY PROMISE (PASSPORT SEALS) */}
        <section id="promise" className="tp-board rounded-[40px] bg-[#fffdf8] border-3 border-[#2a170e] p-6 sm:p-12 shadow-[6px_8px_0px_#2a170e]">
          <p className="font-serif italic text-lg font-bold text-[#c2622b]">
            puppy passport
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e] mt-1">
            Our premium puppy promise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {/* Stamp 1 */}
            <div className="tp-entry p-6 rounded-3xl bg-[#fbe3b4]/40 border-2 border-[#2a170e]/20 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full border-3 border-dashed border-[#a24a1a] flex flex-col items-center justify-center text-[#a24a1a] p-2 rotate-[-4deg]">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">VET HEALTH</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2a170e]">Hand-selected breeders</h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                We work exclusively with certified, ethical breeders in Europe and South Korea who prioritize genetic health, parentage lineage, and warm early socialization.
              </p>
            </div>

            {/* Stamp 2 */}
            <div className="tp-entry p-6 rounded-3xl bg-[#fbe3b4]/40 border-2 border-[#2a170e]/20 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full border-3 border-dashed border-[#1f7a4d] flex flex-col items-center justify-center text-[#1f7a4d] p-2 rotate-[4deg]">
                <Award className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">100% CLEAR</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2a170e]">Full transparency</h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                Real photos, high-definition videos, and official veterinary health certificates are shared directly with you on WhatsApp prior to travel.
              </p>
            </div>

            {/* Stamp 3 */}
            <div className="tp-entry p-6 rounded-3xl bg-[#fbe3b4]/40 border-2 border-[#2a170e]/20 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full border-3 border-dashed border-[#c2622b] flex flex-col items-center justify-center text-[#c2622b] p-2 rotate-[-2deg]">
                <Plane className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">PET NANNY</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2a170e]">Safe, stress-free delivery</h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                We manage every single detail of temperature-regulated cabin pet nanny transit, customs ministry clearances, and doorstep arrival.
              </p>
            </div>
          </div>
        </section>

        {/* 3. DELIVERY & COLLECTION (AIRMAIL POSTCARD) */}
        <section id="delivery" className="tp-postcard rounded-[40px] bg-gradient-to-br from-[#fff7ec] to-[#fcead0] border-3 border-[#2a170e] p-6 sm:p-12 shadow-[6px_8px_0px_#2a170e]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c2622b]">
                World-class transit
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e]">
                Delivery &amp; collection
              </h2>
              <p className="text-base text-[#5a3a28] leading-relaxed">
                From a same-day visit in Downtown Dubai to a safe flight from Seoul, Korea, every puppy travels comfortably and arrives safely into your open arms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">Take home the same day</h3>
                  <p className="text-sm text-[#5a3a28]">Local puppies are available immediately — visit, fall in love, and go home together.</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">Delivery within Dubai</h3>
                  <p className="text-sm text-[#5a3a28]">Prefer to stay home? We deliver directly to your doorstep within Dubai in climate-controlled comfort.</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">Safe international cargo</h3>
                  <p className="text-sm text-[#5a3a28]">We handle all export health certificates and ministry clearances for worry-free transit.</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">Worldwide delivery</h3>
                  <p className="text-sm text-[#5a3a28]">Our international airline partners deliver puppies safely to loving families across the globe.</p>
                </div>
              </div>
            </div>

            {/* Flight Route Artwork */}
            <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-3xl bg-[#fbe3b4] border-2 border-[#2a170e] overflow-hidden flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="font-serif italic font-bold text-base text-[#c2622b]">Seoul, Korea</span>
                <span className="font-serif italic font-bold text-base text-[#2a170e]">Downtown Dubai</span>
              </div>

              {/* Bézier Flight Arc SVG with Airplane */}
              <svg viewBox="0 0 500 160" className="w-full h-auto text-[#c2622b]" fill="none">
                <path
                  d="M40 130 C 140 10, 360 10, 460 130"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
                {/* Airplane icon along curve */}
                <g transform="translate(250 36) rotate(6)">
                  <path
                    d="M-14 0 L14 0 M0 -12 L6 0 L0 12 L-4 0 Z"
                    fill="#2a170e"
                    stroke="#2a170e"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              {/* Dubai City Skyline Silhouette */}
              <div className="pt-2 text-center">
                <span className="text-xs font-serif italic text-[#5a3a28]">
                  ✈️ Direct VIP pet nanny cabin flights to UAE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section id="why" className="rounded-[40px] bg-[#fffdf8] border-3 border-[#2a170e] p-6 sm:p-12 shadow-[6px_8px_0px_#2a170e]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e]">
                Why choose us
              </h2>
              <p className="text-base sm:text-lg text-[#5a3a28] leading-relaxed">
                We&apos;re here to help you find a true new family member. From the moment you browse our site to the joyful day your puppy steps into your home, we are with you every step of the way.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbe3b4]/30 border border-[#2a170e]/15">
                <Plane className="w-8 h-8 text-[#c2622b] shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">International Cargo &amp; Cabin Travel</h3>
                  <p className="text-sm text-[#5a3a28] mt-1">We safely deliver puppies to loving homes worldwide with experienced pet travel companions.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbe3b4]/30 border border-[#2a170e]/15">
                <Clock className="w-8 h-8 text-[#c2622b] shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">24/7 Concierge Support</h3>
                  <p className="text-sm text-[#5a3a28] mt-1">Direct WhatsApp access to our team for questions on puppy transition, feeding, training, and vet checkups.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbe3b4]/30 border border-[#2a170e]/15">
                <ShieldCheck className="w-8 h-8 text-[#c2622b] shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2a170e]">Verified Health Guarantee</h3>
                  <p className="text-sm text-[#5a3a28] mt-1">Every puppy is microchipped, fully vaccinated, dewormed, and backed by a comprehensive health warranty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. UNIQUE AND HIGH QUALITY PUPPIES CTA BANNER */}
        <div className="rounded-[40px] bg-[#2a170e] text-[#fffdf8] p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="font-serif italic text-xl text-[#f2be6b]">
              every puppy is family
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black">
              Unique and high quality puppies
            </h2>
            <p className="text-base text-[#fffdf8]/80 leading-relaxed">
              When you choose TeddyPups, you can trust that you are welcoming a happy, healthy companion of verified lineage. Browse our available pups or message our concierge on WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/puppies" className="btn-primary text-sm sm:text-base py-3 px-8 shadow-md">
                <span>See available puppies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm sm:text-base py-3 px-8 !bg-[#25D366] !text-white !border-transparent hover:brightness-105"
              >
                <span>Ask us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
