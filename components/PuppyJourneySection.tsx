'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { Check, Phone, Video, MoreVertical } from 'lucide-react';

export default function PuppyJourneySection() {
  const [selectedBreed, setSelectedBreed] = useState<string>('Maltipoo');

  const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-journey relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#f7d18d] to-[#f0b866]"
      style={{
        ['--sky-top' as any]: '#f7d18d',
        ['--sky-bottom' as any]: '#f0b866',
      }}
      aria-labelledby="journey-title"
    >
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN: 3 Step Concierge Guide */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
                Concierge Adoption
              </span>
              <h2
                id="journey-title"
                className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e] mt-1 tracking-tight"
              >
                Your puppy journey
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#5a3a28] leading-relaxed">
                A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
              </p>
            </div>

            <ol className="space-y-6">
              {/* Step 1 */}
              <li className="flex items-start gap-4 bg-[#fffdf8]/70 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#2a170e]/10 shadow-sm">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#a24a1a] text-[#fffdf8] font-serif font-black text-xl flex items-center justify-center shadow">
                  1
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2a170e]">
                    Choose your breed
                  </h3>
                  <p className="text-sm text-[#5a3a28] mt-1 leading-relaxed">
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex items-start gap-4 bg-[#fffdf8]/70 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#2a170e]/10 shadow-sm">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#a24a1a] text-[#fffdf8] font-serif font-black text-xl flex items-center justify-center shadow">
                  2
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2a170e]">
                    Get photos & details
                  </h3>
                  <p className="text-sm text-[#5a3a28] mt-1 leading-relaxed">
                    Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex items-start gap-4 bg-[#fffdf8]/70 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#2a170e]/10 shadow-sm">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#a24a1a] text-[#fffdf8] font-serif font-black text-xl flex items-center justify-center shadow">
                  3
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2a170e]">
                    Secure & safe delivery
                  </h3>
                  <p className="text-sm text-[#5a3a28] mt-1 leading-relaxed">
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                </div>
              </li>
            </ol>

            <div>
              <Link
                href="/how-it-works"
                className="btn-ghost inline-flex items-center gap-2 text-sm sm:text-base font-bold py-2.5 px-6 bg-[#fffdf8] border-2 border-[#2a170e]"
              >
                <span>Read Full Adoption Guide</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: WhatsApp Phone Concierge Chat Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-sm bg-[#fffdf8] rounded-[40px] border-4 border-[#2a170e] shadow-[8px_8px_0px_0px_#2a170e] overflow-hidden flex flex-col">
              {/* Phone Status Bar */}
              <div className="bg-[#1f5f3e] text-white px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full bg-[#f2be6b] border border-white flex items-center justify-center overflow-hidden">
                    <span className="text-lg">🐶</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                      TeddyPups U.A.E.
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    </h4>
                    <span className="text-[10px] text-emerald-200">online</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                  <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                  <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="p-4 space-y-3.5 bg-[#f5ede1] min-h-[340px] flex flex-col justify-between text-xs sm:text-sm">
                <div className="space-y-3">
                  {/* Outgoing Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#dcf8c6] text-[#2a170e] rounded-2xl rounded-tr-none px-3.5 py-2 max-w-[85%] shadow-sm border border-[#2a170e]/10">
                      <p>Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
                      <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-gray-500">
                        <span>10:42 AM</span>
                        <Check className="w-3 h-3 text-blue-500" />
                      </div>
                    </div>
                  </div>

                  {/* Incoming Concierge Prompt */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#2a170e] rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[88%] shadow-sm border border-[#2a170e]/10 space-y-2">
                      <p className="font-medium text-[#2a170e]">
                        Welcome to TeddyPups! Which breed melts your heart today?
                      </p>

                      {/* Interactive Breed Pill Buttons */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {breeds.map((b) => (
                          <button
                            key={b}
                            onClick={() => setSelectedBreed(b)}
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                              selectedBreed === b
                                ? 'bg-[#a24a1a] text-white shadow-sm scale-105'
                                : 'bg-[#fbe3b4]/70 text-[#2a170e] hover:bg-[#f2be6b]'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Concierge Response to Breed */}
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white text-[#2a170e] rounded-2xl rounded-tl-none px-3.5 py-2 max-w-[88%] shadow-sm border border-[#2a170e]/10">
                      <p>
                        Wonderful choice! Our <span className="font-bold text-[#a24a1a]">{selectedBreed}</span> puppies are fully vaccinated, microchipped, and showroom-ready.
                      </p>
                      <span className="text-[10px] text-gray-400 block text-right mt-1">10:43 AM</span>
                    </div>
                  </div>
                </div>

                {/* Bottom WhatsApp CTA Button */}
                <div className="pt-2">
                  <a
                    href={getGeneralWhatsAppUrl(`Hi TeddyPups! I'm interested in adopting a ${selectedBreed} puppy.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-xs sm:text-sm font-bold py-2.5 px-4 text-center shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Say hello on WhatsApp</span>
                    <span>💬</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mascot Stop for Section 3 */}
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-chat__teddy mt-6 flex justify-center"
            >
              <div className="w-32 sm:w-40">
                <PupBuddy pose="sit" facing="right" label="Teddy sitting by the chat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
