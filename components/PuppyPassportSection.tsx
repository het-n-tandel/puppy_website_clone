'use client';

import React from 'react';
import PupBuddy from './PupBuddy';

export default function PuppyPassportSection() {
  const stamps = [
    {
      title: 'Vet-checked & healthy',
      description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
      ink: '#a24a1a',
      tilt: '-rotate-3',
      shape: 'rounded-full',
      icon: '🩺',
    },
    {
      title: 'Korea to Dubai, safely',
      description: 'Trusted breeders, safe travel, and premium care from start to finish.',
      ink: '#1f6b45',
      tilt: 'rotate-2',
      shape: 'rounded-2xl border-dashed',
      icon: '✈️',
    },
    {
      title: 'Support 24/7',
      description: 'Always here to help, from choosing your puppy to post-delivery support.',
      ink: '#5a3a28',
      tilt: '-rotate-2',
      shape: 'rounded-[30px]',
      icon: '💬',
    },
    {
      title: 'Trusted by families worldwide',
      description: 'Puppies delivered to loving homes all around the world.',
      ink: '#c2622b',
      tilt: 'rotate-3',
      shape: 'rounded-3xl',
      icon: '🌍',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport relative py-20 overflow-hidden bg-gradient-to-b from-[#f0b866] to-[#a65a30] text-[#2a170e]"
      style={{
        ['--sky-top' as any]: '#f0b866',
        ['--sky-bottom' as any]: '#a65a30',
      }}
      aria-labelledby="trust-title"
    >
      <div className="gutter mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Open Leather Passport Booklet */}
        <div className="tp-book relative bg-[#fffdf8] rounded-[44px] border-4 border-[#2a170e] shadow-[10px_10px_0px_0px_#2a170e] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Spine Fold Visual */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/15 to-transparent pointer-events-none z-20"
          />

          {/* LEFT PASSPORT PAGE: Title & Mascot */}
          <div className="md:col-span-5 p-8 sm:p-12 border-b-4 md:border-b-0 md:border-r-4 border-[#2a170e] flex flex-col justify-between bg-[#fffaf0] relative">
            <div>
              <p
                aria-hidden="true"
                className="font-serif italic text-2xl sm:text-3xl font-black text-[#c2622b] mb-2"
              >
                puppy passport
              </p>
              <h2
                id="trust-title"
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#2a170e] leading-tight"
              >
                Why families trust TeddyPups
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5a3a28] leading-relaxed">
                Every puppy travels with official veterinary records, microchip papers, and a lifetime health guarantee.
              </p>
            </div>

            {/* Pup Stop sitting on the passport page */}
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-book__teddy mt-8 flex justify-center"
            >
              <div className="w-36 sm:w-44">
                <PupBuddy pose="sit" facing="right" label="Teddy sitting on the passport" />
              </div>
            </div>
          </div>

          {/* RIGHT PASSPORT PAGE: 4 Official Veterinary Stamps */}
          <div className="md:col-span-7 p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fffdf8]">
            {stamps.map((stamp, idx) => (
              <div
                key={idx}
                className={`relative p-5 rounded-2xl border-3 border-[#2a170e] bg-[#fffdf8] shadow-sm flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${stamp.tilt}`}
                style={{ borderColor: stamp.ink }}
              >
                {/* Stamp Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{stamp.icon}</span>
                  <h3
                    className="font-serif font-black text-base sm:text-lg tracking-tight"
                    style={{ color: stamp.ink }}
                  >
                    {stamp.title}
                  </h3>
                </div>

                {/* Stamp Description */}
                <p className="text-xs sm:text-sm text-[#5a3a28] leading-relaxed font-medium">
                  {stamp.description}
                </p>

                {/* Official Certified Seal Watermark */}
                <div
                  className="mt-3 pt-2 border-t text-[10px] uppercase font-bold tracking-widest opacity-75"
                  style={{ color: stamp.ink, borderColor: stamp.ink + '40' }}
                >
                  ✓ Certified Pedigree Guarantee
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sunset Horizon Skyline Transition */}
      <div
        aria-hidden="true"
        className="tp-horizon relative w-full h-24 sm:h-32 mt-12 overflow-hidden flex items-end"
      >
        <span className="tp-horizon__sun absolute left-1/2 -translate-x-1/2 bottom-4 w-24 h-24 rounded-full bg-[#fbe3b4] shadow-[0_0_60px_#fbe3b4] opacity-80" />
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-full text-[#4d2b19] fill-current"
        >
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
}
