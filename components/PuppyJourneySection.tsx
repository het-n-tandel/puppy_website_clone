'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';

export default function PuppyJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLLIElement>(null);
  const step2Ref = useRef<HTMLLIElement>(null);
  const step3Ref = useRef<HTMLLIElement>(null);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedBreed, setSelectedBreed] = useState<string>('Maltipoo');

  const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

  useEffect(() => {
    const handleScroll = () => {
      const vMid = window.innerHeight * 0.55;

      const r1 = step1Ref.current?.getBoundingClientRect();
      const r2 = step2Ref.current?.getBoundingClientRect();
      const r3 = step3Ref.current?.getBoundingClientRect();

      if (r3 && r3.top <= vMid) {
        setActiveStep(3);
      } else if (r2 && r2.top <= vMid) {
        setActiveStep(2);
      } else if (r1 && r1.top <= vMid) {
        setActiveStep(1);
      } else {
        setActiveStep(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat select-none"
      style={{
        ['--sky-top' as any]: '#f7d18d',
        ['--sky-bottom' as any]: '#f0b866',
        background: 'linear-gradient(to bottom, #f7d18d, #f0b866)',
      }}
      aria-labelledby="journey-title"
    >
      <div className="tp-chat__grid gutter px-4 sm:px-6 lg:px-8">
        {/* LEFT COLUMN: 3 Step Story Flow */}
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge text-[#2a170e]">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[#5a3a28]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol className="tp-chat__steps list-none p-0">
            {/* Step 1 */}
            <li
              ref={step1Ref}
              className="tp-chat__step"
              data-active={activeStep === 1 ? 'true' : undefined}
              data-done={activeStep > 1 ? 'true' : undefined}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                {activeStep > 1 ? '✓' : '1'}
              </span>
              <div>
                <h3 className="font-plush tp-chat__title text-[#2a170e]">Choose your breed</h3>
                <p className="tp-chat__text">
                  Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                </p>
              </div>
            </li>

            {/* Step 2 */}
            <li
              ref={step2Ref}
              className="tp-chat__step"
              data-active={activeStep === 2 ? 'true' : undefined}
              data-done={activeStep > 2 ? 'true' : undefined}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                {activeStep > 2 ? '✓' : '2'}
              </span>
              <div>
                <h3 className="font-plush tp-chat__title text-[#2a170e]">Get photos &amp; details</h3>
                <p className="tp-chat__text">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </div>
            </li>

            {/* Step 3 */}
            <li
              ref={step3Ref}
              className="tp-chat__step"
              data-active={activeStep === 3 ? 'true' : undefined}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                3
              </span>
              <div>
                <h3 className="font-plush tp-chat__title text-[#2a170e]">Secure &amp; safe delivery</h3>
                <p className="tp-chat__text">
                  Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                </p>
              </div>
            </li>
          </ol>

          <Link href="/how-it-works" className="btn btn-ghost tp-chat__cta">
            How it works →
          </Link>
        </div>

        {/* RIGHT COLUMN: Sticky WhatsApp Phone Mockup with Dropping Messages */}
        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            {/* Phone Top Bar */}
            <div className="tp-phone__bar">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#2a170e]/20 flex-shrink-0">
                <Image
                  src="/brand/logo.png"
                  alt="TeddyPups Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">● online</span>
              </div>
            </div>

            {/* Phone Screen with Messages Dropping on Scroll */}
            <div className="tp-phone__screen">
              {/* Initial Greeting */}
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              {/* Message 1 (Step 1 Executed: Breed Selection) */}
              <div
                className="tp-msg-group"
                data-step="0"
                data-show={activeStep >= 1 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    {breeds.map((b) => (
                      <li key={b}>
                        <button
                          type="button"
                          onClick={() => setSelectedBreed(b)}
                          className={`cursor-pointer transition-colors ${
                            selectedBreed === b ? '!bg-[#a24a1a] !text-white' : ''
                          }`}
                        >
                          {b}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Message 2 (Step 2 Executed: Real Photos Drop in) */}
              <div
                className="tp-msg-group"
                data-step="1"
                data-show={activeStep >= 2 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        alt="Teddy puppy in showroom"
                        fill
                        sizes="10rem"
                        className="object-cover"
                      />
                    </span>
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                        alt="Max puppy"
                        fill
                        sizes="10rem"
                        className="object-cover"
                      />
                    </span>
                  </div>
                  <p className="mt-1.5 font-medium">
                    Here is {selectedBreed} Max! 🐾 Healthy, playful, and ready to meet you.
                  </p>
                </div>
              </div>

              {/* Message 3 (Step 3 Executed: Secure Delivery Confirmed) */}
              <div
                className="tp-msg-group"
                data-step="2"
                data-show={activeStep >= 3 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them bg-[#dcf8c6]">
                  <p className="font-medium text-[#2a170e]">
                    ✈️ Delivery confirmed directly to your home in Dubai! Certified vet check, microchip, and passport all included.
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-[#1f7a4d] uppercase tracking-wide">
                    ✓ Ready for homecoming
                  </span>
                </div>
              </div>
            </div>

            {/* Compose WhatsApp Bar */}
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Reply on WhatsApp...</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </a>
          </div>

          {/* Teddy Mascot sitting right beside the phone */}
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-chat__teddy"
          >
            <PupBuddy pose="sit" facing="right" label="Teddy listening at the chat" />
          </div>
        </div>
      </div>
    </section>
  );
}
