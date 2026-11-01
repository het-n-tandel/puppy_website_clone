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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const vMid = window.innerHeight * 0.52;

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
          <h2
            id="journey-title"
            className="home-journey-title font-plush text-huge text-5xl sm:text-7xl lg:text-[5.6rem] font-black text-[#2a170e] leading-[0.92] tracking-tight"
          >
            Your puppy journey
          </h2>
          <p className="home-journey-lede text-lede mt-6 max-w-[44ch] text-[#5a3a28] text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-relaxed">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol className="tp-chat__steps list-none p-0 mt-10">
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

          <Link
            href="/how-it-works"
            className="inline-block mt-8 rounded-full border-2 border-[#2a170e] px-7 py-2.5 text-sm font-bold text-[#2a170e] hover:bg-[#2a170e] hover:text-[#fffdf8] transition-colors shadow-sm"
          >
            How it works
          </Link>
        </div>

        {/* RIGHT COLUMN: Sticky WhatsApp Phone Mockup with Dropping Messages */}
        <div className="tp-chat__side lg:sticky lg:top-24 self-start">
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

            {/* Phone Screen with Messages Dropping Step by Step */}
            <div className="tp-phone__screen">
              {/* Group 1: Step 1 (Choose your breed) */}
              <div
                className="tp-msg-group"
                data-step="1"
                data-show={activeStep >= 1 ? 'true' : 'false'}
              >
                {/* Outgoing user message */}
                <div className="tp-msg tp-msg--me">
                  Hi TeddyPups! Looking for a teacup puppy in Dubai 🐾
                </div>

                {/* Video preview card */}
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div
                    className="tp-clip cursor-pointer group"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Click to pause' : 'Click to play puppy video'}
                  >
                    {isPlaying ? (
                      <video
                        src="/media/_cJaO-ryO6ev/af9e004679/b942a5_93358f1b7c434434b226b19e9ee0705b.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src="/media/czRyKKk8Lm5N/6356959786/b942a5_93358f1b7c434434b226b19e9ee0705bf002.jpg"
                          alt="Puppy video preview"
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="11rem"
                        />
                        <div className="tp-clip__play" aria-label="Play video">
                          <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Group 2: Step 2 (Get photos & details) */}
              <div
                className="tp-msg-group"
                data-step="2"
                data-show={activeStep >= 2 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </div>
              </div>

              {/* Group 3: Step 3 (Secure & safe delivery) */}
              <div
                className="tp-msg-group"
                data-step="3"
                data-show={activeStep >= 3 ? 'true' : 'false'}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                  <svg viewBox="0 0 220 32" className="tp-route" fill="none">
                    <circle cx="10" cy="20" r="3.5" className="tp-route__dot" />
                    <path
                      d="M12 20 C 50 8, 140 8, 192 18"
                      className="tp-route__line"
                    />
                    {/* Paw print 1 */}
                    <g transform="translate(68, 8) scale(0.14)" className="tp-route__paw">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </g>
                    {/* Paw print 2 */}
                    <g transform="translate(132, 9) scale(0.14)" className="tp-route__paw">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </g>
                    {/* Destination House Icon */}
                    <g transform="translate(196, 6)">
                      <path
                        d="M0 10 L8 2 L16 10 V18 H0 Z"
                        className="tp-route__home"
                      />
                    </g>
                  </svg>
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
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </a>
          </div>

          {/* Teddy Mascot sitting right beside the phone */}
          <div
            data-pup-stop="true"
            data-pose="stand"
            data-facing="right"
            className="pup-stop tp-chat__teddy"
          >
            <PupBuddy pose="stand" facing="right" label="Teddy listening at the chat" />
          </div>
        </div>
      </div>
    </section>
  );
}
