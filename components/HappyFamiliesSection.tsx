'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/image';
import PupBuddy from './PupBuddy';

export default function HappyFamiliesSection() {
  const polaroids = [
    {
      id: 1,
      name: 'Lulu 🧸 with her new mummy ❤️',
      src: 'https://puppy.instabizweb.com/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg',
      tilt: '-rotate-2',
      tapeColor: '#f6d79a',
    },
    {
      id: 2,
      name: 'Mochi settled in Palm Jumeirah ✨',
      src: 'https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
      tilt: 'rotate-3',
      tapeColor: '#bfddf5',
    },
    {
      id: 3,
      name: 'Teddy & Leo first birthday 🎂',
      src: 'https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
      tilt: '-rotate-3',
      tapeColor: '#f9cdbf',
    },
    {
      id: 4,
      name: 'Bella exploring Dubai Marina 🐾',
      src: 'https://puppy.instabizweb.com/media/aI6Bw0i86FhM/7b3ae0c1c4/b942a5_01a35791a329431eb3e8529e5fa4bce9-mv2.webp',
      tilt: 'rotate-2',
      tapeColor: '#dcf8c6',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk relative py-20 overflow-hidden bg-gradient-to-b from-[#a65a30] to-[#4d2b19] text-[#fffdf8]"
      style={{
        ['--sky-top' as any]: '#a65a30',
        ['--sky-bottom' as any]: '#4d2b19',
      }}
      aria-labelledby="dusk-title"
    >
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        {/* Header & Featured Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 max-w-6xl mx-auto">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
              Heartwarming Moments
            </span>
            <h2
              id="dusk-title"
              className="font-serif text-3xl sm:text-5xl font-black text-[#fffdf8] tracking-tight"
            >
              Happy families &amp; puppies
            </h2>
            <p className="text-base sm:text-lg text-[#fffdf8]/80 leading-relaxed max-w-xl">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients across Dubai and beyond.
            </p>
          </div>

          {/* Featured Quote Card */}
          <div className="lg:col-span-5 bg-[#fffdf8]/10 backdrop-blur-md rounded-3xl p-6 border border-[#fffdf8]/20 shadow-lg">
            <blockquote className="font-serif italic text-sm sm:text-base text-[#fffdf8] leading-relaxed">
              &ldquo;TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout gave us complete peace of mind.&rdquo;
            </blockquote>
            <figcaption className="mt-4 pt-3 border-t border-[#fffdf8]/20 font-serif font-bold text-sm text-[#f2be6b]">
              Sarah M. — Dubai, UAE
            </figcaption>
          </div>
        </div>

        {/* Photowall: Pinned Polaroid Wall */}
        <div className="tp-photowall relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {polaroids.map((p) => (
              <div
                key={p.id}
                className={`relative bg-[#fffdf8] rounded-2xl p-3 pb-5 shadow-2xl border-2 border-[#2a170e]/20 transition-transform duration-300 hover:scale-105 hover:z-20 ${p.tilt}`}
              >
                {/* Washi Tape Strip */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 shadow-sm opacity-90 rounded-sm"
                  style={{ backgroundColor: p.tapeColor }}
                />

                {/* Photo */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-200">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 16rem, 45vw"
                  />
                </div>

                {/* Handwritten Caption */}
                <p className="mt-3 text-center font-serif text-xs font-bold text-[#2a170e] line-clamp-1">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot Stop for Happy Families */}
        <div
          data-pup-stop="true"
          data-pose="sit"
          data-facing="right"
          className="pup-stop tp-dusk__teddy mt-12 flex justify-center"
        >
          <div className="w-36 sm:w-44">
            <PupBuddy pose="sit" facing="right" label="Teddy admiring happy families" />
          </div>
        </div>
      </div>
    </section>
  );
}
