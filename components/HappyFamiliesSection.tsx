'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PupBuddy from './PupBuddy';

export default function HappyFamiliesSection() {
  const polaroids = [
    {
      id: 1,
      name: 'Lulu 🧸 with her new mummy ❤️',
      src: '/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg',
      tilt: '-rotate-2',
      tapeColor: '#f6d79a',
    },
    {
      id: 2,
      name: 'Mochi settled in Palm Jumeirah ✨',
      src: '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
      tilt: 'rotate-3',
      tapeColor: '#bfddf5',
    },
    {
      id: 3,
      name: 'Teddy & Leo first birthday 🎂',
      src: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
      tilt: '-rotate-3',
      tapeColor: '#f9cdbf',
    },
    {
      id: 4,
      name: 'Bella exploring Dubai Marina 🐾',
      src: '/media/TUslu26Ueaq-/9c3516c040/edb2f5_6627857aca7e495ea37d9f62d814d323-mv2.jpeg',
      tilt: 'rotate-2',
      tapeColor: '#dcf8c6',
    },
    {
      id: 5,
      name: 'Coco & his cozy new bed 💤',
      src: '/media/OcgEePeBmGuu/41fb22320b/edb2f5_adf88f7400c848249d60698fca0336e9-mv2.jpeg',
      tilt: '-rotate-2',
      tapeColor: '#fde047',
    },
    {
      id: 6,
      name: 'Milo welcomed home in Downtown 🏡',
      src: '/media/RYkyuv4DBCTC/d9e02a0dc8/edb2f5_7ed2ee1ba89b4230b52f5e3981b1b198-mv2.jpeg',
      tilt: 'rotate-2',
      tapeColor: '#fed0e0',
    },
    {
      id: 7,
      name: 'Oliver enjoying a sunny walk ☀️',
      src: '/media/d267R4d3lMSv/96d8604ca3/edb2f5_02b95a69a2c24c7e81b60e6d8c01baf7-mv2.jpeg',
      tilt: '-rotate-3',
      tapeColor: '#bae6fd',
    },
    {
      id: 8,
      name: 'Simba & family celebration 🎉',
      src: '/media/bKP7vwN0R2OU/1aa47534b5/edb2f5_b8d76dffb97f46b5a9f2aaf9c1067b4b-mv2.jpeg',
      tilt: 'rotate-3',
      tapeColor: '#bbf7d0',
    },
    {
      id: 9,
      name: 'Buster finding cozy cuddles 🥰',
      src: '/media/stDfO2jMfvb_/6228a11db2/edb2f5_4b08003ef57c4663b55c9ac0c4147c36-mv2.jpeg',
      tilt: '-rotate-2',
      tapeColor: '#fde047',
    },
    {
      id: 10,
      name: 'Rosie joining her sisters in JBR 💕',
      src: '/media/K-U7RwW9j2A9/09d7edc058/edb2f5_22d3cc4ae0e14216a0d3a1ec9796649f-mv2.jpeg',
      tilt: 'rotate-2',
      tapeColor: '#f9cdbf',
    },
    {
      id: 11,
      name: 'Charlie living his best Dubai life 🌟',
      src: '/media/s23WYu0qJQ_h/d0ad444e50/27b888_a887dbff51fb420d95774cce6a8d54fb-mv2.jpg',
      tilt: '-rotate-3',
      tapeColor: '#dcf8c6',
    },
    {
      id: 12,
      name: 'Penny on her first puppy playdate 🐕',
      src: '/media/ab5hEGUKO4aY/de923fd8eb/edb2f5_d5177ed7ae1344d7acc11e9770df7b74-mv2.jpeg',
      tilt: 'rotate-3',
      tapeColor: '#fed0e0',
    },
    {
      id: 13,
      name: 'Toby adored by everyone in the villa 🏰',
      src: '/media/yEfM9sdMluCX/46ecd570ef/edb2f5_099acc542ba14359aa8c0f933cb4ef2c-mv2.jpeg',
      tilt: '-rotate-2',
      tapeColor: '#bae6fd',
    },
    {
      id: 14,
      name: 'Honey soaking in afternoon sunshine 🍯',
      src: '/media/_41LE-nBf847/2ea8e152eb/27b888_76aa3ad05faf40bd8eb2a6d826737525-mv2.jpg',
      tilt: 'rotate-2',
      tapeColor: '#f6d79a',
    },
    {
      id: 15,
      name: 'Rocky ready for evening walkies 🌙',
      src: '/media/tuarxe-C9j5H/913026dd39/27b888_b22e1ced7da74ea7a14a68474d8c2dc0-mv2.jpg',
      tilt: '-rotate-3',
      tapeColor: '#bfddf5',
    },
    {
      id: 16,
      name: 'Daisy pure joyful tail wags 🌼',
      src: '/media/UuJqjsRN-wKL/047b245604/b942a5_a1ead54bc6934e5ab953e98d4aa0312d-mv2.jpg',
      tilt: 'rotate-3',
      tapeColor: '#bbf7d0',
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
              className="font-plush text-3xl sm:text-5xl md:text-6xl font-black text-[#fffdf8] tracking-tight"
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

        {/* Photowall: Pinned Polaroid Wall (2 Rows of 4 Polaroids) */}
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

          {/* View All Happy Families CTA Button */}
          <div className="mt-12 text-center">
            <Link
              href="/happy-families"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#fffdf8] bg-transparent px-8 py-3.5 text-sm sm:text-base font-bold text-[#fffdf8] hover:bg-[#fffdf8] hover:text-[#2a170e] transition-all shadow-md hover:scale-105"
            >
              <span>See more happy family moments</span>
              <span>→</span>
            </Link>
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
