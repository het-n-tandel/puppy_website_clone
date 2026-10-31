'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function ReadyToMeetSection() {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-home relative py-20 overflow-hidden bg-gradient-to-b from-[#2f1a10] to-[#24130b] text-[#fffdf8]"
      style={{
        ['--sky-top' as any]: '#2f1a10',
        ['--sky-bottom' as any]: '#24130b',
      }}
      aria-labelledby="cta-title"
    >
      <div className="gutter mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Eyebrow and Headline */}
        <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
          Welcome to the Family
        </span>
        <h2
          id="cta-title"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#fffdf8] tracking-tight leading-tight"
        >
          Ready to meet your new best friend?
        </h2>
        <p className="text-base sm:text-lg text-[#fffdf8]/80 max-w-2xl mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>

        {/* House Living Room Illustration Scene */}
        <div className="tp-house relative my-12 max-w-2xl mx-auto bg-[#3a2014]/60 backdrop-blur-md rounded-[48px] p-8 border-3 border-[#f2be6b]/30 shadow-2xl overflow-hidden">
          {/* Warm Glowing Ambient Light */}
          <div
            aria-hidden="true"
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#f2be6b]/15 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Arched Doorway with Puppy Waiting Inside */}
            <div className="relative w-44 h-56 rounded-t-full border-4 border-[#f2be6b] overflow-hidden shadow-xl bg-stone-900 shrink-0">
              <Image
                src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                alt="Max waiting cheerfully inside"
                fill
                className="object-cover"
                sizes="12rem"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#2a170e]/80 text-[11px] font-bold text-[#fffdf8] px-2.5 py-0.5 rounded-full border border-white/20 whitespace-nowrap">
                Waiting for you!
              </div>
            </div>

            {/* Playful Bowing Mascot at the Front Door */}
            <div className="flex flex-col items-center">
              <div
                data-pup-stop="true"
                data-pose="bow"
                data-facing="right"
                className="pup-stop tp-house__teddy"
              >
                <div className="w-32 sm:w-40">
                  <PupBuddy pose="bow" facing="right" label="Teddy in playful bow pose" />
                </div>
              </div>
              <p className="font-serif italic text-xs text-[#f2be6b] mt-2">
                *tail wagging excitedly*
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/puppies"
            className="btn-primary text-base font-bold py-3.5 px-8 shadow-xl"
          >
            View available puppies
          </Link>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base font-bold py-3.5 px-8 bg-[#fffdf8]/10 text-[#fffdf8] border-2 border-[#fffdf8]/40 hover:border-[#f2be6b] hover:text-[#f2be6b] shadow-xl"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
