'use client';

import React from 'react';
import Link from 'next/link';
import PupBuddy from './PupBuddy';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function ReadyToMeetSection() {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-home relative py-20 overflow-hidden bg-[#1c0d06] text-[#fffdf8]"
      style={{
        ['--sky-top' as any]: '#1c0d06',
        ['--sky-bottom' as any]: '#150904',
      }}
      aria-labelledby="cta-title"
    >
      <div className="gutter mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Main Display Headline (Matching Screenshot 4) */}
        <h2
          id="cta-title"
          className="font-plush text-3xl sm:text-5xl md:text-6xl font-black text-[#fffdf8] tracking-tight leading-tight"
        >
          Ready to meet your<br />new best friend?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#fffdf8]/75 max-w-xl mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>

        {/* Wooden House Front Porch Facade (Matching Screenshot 4 1:1) */}
        <div className="relative my-10 max-w-2xl mx-auto select-none">
          {/* Wooden Plank Wall Facade */}
          <div
            className="relative rounded-t-3xl overflow-hidden pt-8 px-6 sm:px-12 pb-0 border-t-2 border-x-2 border-[#2b170e] shadow-2xl"
            style={{
              background: 'repeating-linear-gradient(180deg, #3f2216 0 46px, #2a140b 46px 48px)',
            }}
          >
            {/* Porch Scene: Arched Doorway, Door, Light Sconce, Plants, Puppy */}
            <div className="relative min-h-[17rem] sm:min-h-[19rem] flex items-end justify-center">
              {/* Left Potted Plant Peeking behind door */}
              <div className="absolute left-6 sm:left-12 bottom-0 flex flex-col items-center z-5 pointer-events-none">
                <div className="w-12 h-14 rounded-full bg-[#3d7a46] -mb-2" />
                <div className="w-10 h-10 bg-[#c66538] rounded-b-md border-t-2 border-[#a24e26]" />
              </div>

              {/* Teddy Mascot Standing/Bowing on Porch Deck to Left of Door */}
              <div
                data-pup-stop="true"
                data-pose="bow"
                data-facing="right"
                className="pup-stop tp-house__teddy absolute left-8 sm:left-16 bottom-0 z-20 pointer-events-auto"
                style={{ width: 'clamp(7.2rem, 9.5vw, 8.6rem)' }}
              >
                <PupBuddy pose="bow" facing="right" label="Teddy welcoming you at the front porch" />
              </div>

              {/* Arched Doorway with Authentic 3D Swung-Open Door matching reference site */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="tp-house__doorway relative rounded-t-full border-[3px] border-[#2a170e] overflow-hidden"
                  style={{
                    width: 'clamp(9.5rem, 16vw, 12.5rem)',
                    aspectRatio: '1 / 1.62',
                    perspective: '1000px',
                    boxShadow: '0 0 0 7px #b2733f, 0 0 0 10px #2a170e, 0 0 60px 18px rgba(255, 205, 120, 0.45)',
                  }}
                >
                  {/* Warm Glowing Room Interior */}
                  <div
                    className="tp-house__inside absolute inset-0 rounded-t-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 70%, #ffe4a8 0%, #e9a95a 100%)',
                    }}
                  />

                  {/* Arched Wooden Door Leaf Swung Open into the house */}
                  <div
                    className="tp-house__door absolute inset-[-3px_-3px_0] rounded-t-full border-[3px] border-[#2a170e]"
                    style={{
                      transformOrigin: '0 50%',
                      transform: 'rotateY(-102deg)',
                      background:
                        'linear-gradient(90deg, transparent calc(50% - 1.5px), #2a170e59 calc(50% - 1.5px) calc(50% + 1.5px), transparent calc(50% + 1.5px)), #a24a1a',
                      boxShadow: 'inset -8px 0 16px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Circular Peephole */}
                    <div
                      className="tp-house__peep absolute rounded-full border-[3px] border-[#2a170e] bg-[#ffd98f]"
                      style={{
                        width: '34%',
                        aspectRatio: '1',
                        top: '14%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    {/* Golden Knob */}
                    <div
                      className="tp-house__knob absolute rounded-full border-[2.5px] border-[#2a170e] bg-[#f2be6b]"
                      style={{
                        width: '0.9rem',
                        aspectRatio: '1',
                        top: '58%',
                        right: '12%',
                      }}
                    />
                  </div>
                </div>

                {/* "welcome home" Doormat at Threshold */}
                <div className="tp-house__mat font-scrawl relative -mt-1.5 z-15 bg-[#f2be6b] text-[#2a170e] font-bold text-xs px-6 py-1 rounded border-2 border-[#2a170e] shadow-sm tracking-wide text-center">
                  welcome home
                </div>
              </div>

              {/* Glowing Warm Wall Sconce Light on Right Wall */}
              <div className="absolute right-16 sm:right-28 top-16 z-15 flex flex-col items-center">
                {/* Radial Amber Lamp Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-full bg-[#f2be6b]/35 blur-xl pointer-events-none"
                />
                {/* Amber Light Fixture Capsule */}
                <div className="relative w-5 h-8 rounded-full bg-[#fff3cc] border-2 border-[#5a3014] shadow-[0_0_24px_8px_rgba(242,190,107,0.8)]" />
              </div>

              {/* Right Potted Plant in Terracotta Pot */}
              <div className="absolute right-6 sm:right-12 bottom-0 flex flex-col items-center z-15 pointer-events-none">
                {/* Foliage */}
                <div className="relative flex items-center">
                  <div className="w-10 h-12 rounded-full bg-[#468650] -mr-3" />
                  <div className="w-11 h-14 rounded-full bg-[#5aa065]" />
                </div>
                {/* Terracotta Pot */}
                <div className="w-12 h-10 bg-[#c66538] rounded-b-md border-t-2 border-[#a24e26] border-x border-b border-[#221008]" />
              </div>
            </div>
          </div>

          {/* Dark Wooden Deck Platform Ledge across Bottom */}
          <div className="relative w-[calc(100%+2rem)] -left-4 h-6 bg-[#2b160d] border-t-2 border-[#1c0d06] rounded-sm shadow-xl z-10" />
        </div>

        {/* Action Buttons (Matching Screenshot 4 1:1) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Enquire on WhatsApp Button with Blue Paw Icon */}
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#1f7a4d] hover:bg-[#18663f] text-[#fffdf8] font-bold text-sm sm:text-base py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            {/* Blue Paw Print Icon */}
            <svg viewBox="0 0 64 64" width="18" height="18" fill="#3b82f6" aria-hidden="true">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
            <span>Enquire on WhatsApp</span>
          </a>

          {/* Visit & Contact Outline Pill Button */}
          <Link
            href="/contact"
            className="inline-flex items-center bg-transparent hover:bg-white/10 text-[#fffdf8] font-bold text-sm sm:text-base py-3 px-6 rounded-full border-[1.5px] border-white shadow-lg transition-transform hover:scale-105"
          >
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
}
