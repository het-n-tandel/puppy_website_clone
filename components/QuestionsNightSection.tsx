'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PupBuddy from './PupBuddy';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function QuestionsNightSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: 'Are your puppies vaccinated and health-checked?',
      a: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    },
    {
      q: 'Can I meet a puppy before I decide?',
      a: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    },
    {
      q: 'Can I take my puppy home the same day?',
      a: 'Local puppies are available immediately, so you can take your puppy home the same day.',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-night relative py-20 overflow-hidden bg-gradient-to-b from-[#4d2b19] to-[#2f1a10] text-[#fffdf8]"
      style={{
        ['--sky-top' as any]: '#4d2b19',
        ['--sky-bottom' as any]: '#2f1a10',
      }}
      aria-labelledby="questions-title"
    >
      {/* Twinkling Stars in Night Sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
      >
        <span className="absolute top-12 left-1/4 text-yellow-200 text-lg animate-pulse">✦</span>
        <span className="absolute top-28 right-1/4 text-yellow-100 text-sm animate-pulse delay-300">✦</span>
        <span className="absolute bottom-20 left-12 text-yellow-300 text-xs animate-pulse delay-700">★</span>
        <span className="absolute top-1/2 right-12 text-yellow-200 text-base animate-pulse delay-500">✦</span>
        <span className="absolute bottom-12 right-1/3 text-yellow-100 text-xs animate-pulse">★</span>
      </div>

      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN: Heading, FAQ Link & Inquisitive Tilting Pup with "?" */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
                Clarity & Care
              </span>
              <h2
                id="questions-title"
                className="font-serif text-3xl sm:text-5xl font-black text-[#fffdf8] mt-1 tracking-tight"
              >
                Questions, answered
              </h2>
            </div>

            <Link
              href="/faq"
              className="btn-ghost inline-flex items-center gap-2 text-sm sm:text-base font-bold py-3 px-6 bg-[#fffdf8]/10 text-[#fffdf8] border-2 border-[#fffdf8]/30 hover:border-[#f2be6b] hover:text-[#f2be6b]"
            >
              <span>Read all questions</span>
              <span>→</span>
            </Link>

            {/* Inquisitive Mascot with floating "?" wonder */}
            <div className="relative pt-6">
              <span
                aria-hidden="true"
                className="tp-night__wonder absolute -top-4 right-6 font-serif font-black text-4xl text-[#f2be6b] animate-bounce"
              >
                ?
              </span>
              <div
                data-pup-stop="true"
                data-pose="sit"
                data-facing="right"
                data-act="tilt"
                className="pup-stop tp-night__teddy"
              >
                <div className="w-28 sm:w-36">
                  <PupBuddy pose="tilt" facing="right" label="Teddy tilting head curious" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive FAQ Cards */}
          <div className="lg:col-span-7 space-y-4">
            {questions.map((q, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#fffdf8]/10 backdrop-blur-md rounded-2xl border border-[#fffdf8]/15 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-[#fffdf8] hover:text-[#f2be6b] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#f2be6b] shrink-0" />
                      <span>{q.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#f2be6b] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#fffdf8]/80 leading-relaxed border-t border-[#fffdf8]/10 pt-4">
                      {q.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
