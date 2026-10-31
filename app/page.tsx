'use client';

import React from 'react';
import Link from 'next/link';
import HeroStage from '@/components/HeroStage';
import MeetThePups from '@/components/MeetThePups';
import TwoWaysSection from '@/components/TwoWaysSection';
import PuppyJourneySection from '@/components/PuppyJourneySection';
import PuppyPassportSection from '@/components/PuppyPassportSection';
import HappyFamiliesSection from '@/components/HappyFamiliesSection';
import QuestionsNightSection from '@/components/QuestionsNightSection';
import ReadyToMeetSection from '@/components/ReadyToMeetSection';
import PupFollower from '@/components/PupFollower';
import { ALL_PUPPIES } from '@/data/puppiesData';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePage() {
  const breeds = [
    { name: 'Maltipoo', tag: 'maltipoo' },
    { name: 'Teacup Poodle', tag: 'poodle' },
    { name: 'Pomeranian', tag: 'pomeranian' },
    { name: 'Pomsky', tag: 'pomsky' },
    { name: 'Bichon Frise', tag: 'bichon' },
    { name: 'Maltese', tag: 'maltese' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Interactive Traveling Puppy Mascot Follower across the whole page */}
      <PupFollower />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 bg-[#fffdf8] flex flex-col justify-between">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 z-10">
          {/* Eyebrow with Hand-drawn Wavy Underline */}
          <div className="inline-block relative">
            <span className="font-serif italic text-2xl sm:text-3xl font-bold text-[#c2622b]">
              every puppy is family
            </span>
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2.5 left-0 h-3.5 w-full text-[#c2622b]"
              aria-hidden="true"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black text-[#2a170e] leading-[1.06] tracking-tight">
            Premium teacup
            <br />
            puppies in Dubai
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-xl mx-auto leading-relaxed font-medium">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/puppies"
              className="btn-primary text-base font-bold py-3.5 px-8 shadow-md"
            >
              View available puppies
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base font-bold py-3.5 px-8 bg-[#fffdf8] shadow-md border-2 border-[#2a170e]"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Stage: Peeking Puppies Lineup, Cartoon Mascot & Scalloped Blanket */}
        <HeroStage />
      </section>

      {/* 2. STICKY HORIZONTAL SCROLL PARADE (MEET THE PUPS) */}
      <MeetThePups puppies={ALL_PUPPIES} />

      {/* 3. TWO WAYS TO MEET YOUR PUPPY */}
      <TwoWaysSection />

      {/* 4. YOUR PUPPY JOURNEY (CONCIERGE & WHATSAPP CHAT) */}
      <PuppyJourneySection />

      {/* 5. PUPPY PASSPORT / WHY FAMILIES TRUST TEDDYPUPS */}
      <PuppyPassportSection />

      {/* 6. HAPPY FAMILIES & PUPPIES (POLAROID WALL) */}
      <HappyFamiliesSection />

      {/* 7. QUESTIONS, ANSWERED (STARRY NIGHT FAQ) */}
      <QuestionsNightSection />

      {/* 8. READY TO MEET YOUR NEW BEST FRIEND? */}
      <ReadyToMeetSection />

      {/* 9. BROWSE BY BREED QUICK CHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          Curated Pedigrees
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e] mt-2 mb-6">
          Explore by Breed
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {breeds.map((b) => (
            <Link
              key={b.name}
              href={`/puppies?breed=${b.tag}`}
              className="inline-flex items-center gap-2 bg-[#fbe3b4]/70 hover:bg-[#f2be6b] text-[#2a170e] font-semibold text-sm sm:text-base py-2.5 px-6 rounded-full border border-[#2a170e]/15 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <span>🐾</span>
              <span>{b.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
