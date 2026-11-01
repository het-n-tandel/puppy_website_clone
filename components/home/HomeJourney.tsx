'use client';

import React, { useState, useEffect } from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeJourney() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // Auto-progress through the 3 steps so animations across all milestones play continuously
  useEffect(() => {
    if (isUserInteracting) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4200);
    return () => clearInterval(timer);
  }, [isUserInteracting]);

  // Determine pose based on step choreography:
  // Step 1: sitting, tail wagging, as chat shows breed chips
  // Step 2: head tilt toward phone as photos & video arrive
  // Step 3: stands and trots off as dotted path leads to house with heart
  const currentPose = activeStep === 0 ? 'sit' : activeStep === 1 ? 'tilt' : 'stand';

  return (
    <div data-section="journey">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-chat"
        style={({ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }) as React.CSSProperties}
        aria-labelledby="journey-title"
      >
        <div className="tp-chat__grid gutter" data-pin-range="true">
          {/* Left Column: 3 Steps */}
          <div className="tp-chat__story">
            <h2 id="journey-title" className="font-plush text-huge">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol
              className="tp-chat__steps"
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => setIsUserInteracting(false)}
            >
              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 0 ? 'true' : 'false'}
                data-done={activeStep > 0 ? 'true' : 'false'}
                onClick={() => setActiveStep(0)}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">
                  1
                </span>
                <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                <p className="tp-chat__text">
                  Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                </p>
              </li>

              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 1 ? 'true' : 'false'}
                data-done={activeStep > 1 ? 'true' : 'false'}
                onClick={() => setActiveStep(1)}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">
                  2
                </span>
                <h3 className="font-plush tp-chat__title">Get photos & details</h3>
                <p className="tp-chat__text">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </li>

              <li
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === 2 ? 'true' : 'false'}
                data-done={false}
                onClick={() => setActiveStep(2)}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">
                  3
                </span>
                <h3 className="font-plush tp-chat__title">Secure & safe delivery</h3>
                <p className="tp-chat__text">
                  Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                </p>
              </li>
            </ol>

            <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
              How it works
            </Link>
          </div>

          {/* Right Column: Tilted WhatsApp Phone Mockup & Companion Mascot */}
          <div className="tp-chat__side">
            <div className="tp-phone shadow-2xl" aria-label="A WhatsApp conversation with TeddyPups U.A.E." role="group">
              <div className="tp-phone__bar">
                <img
                  alt="TeddyPups Avatar"
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  className="tp-phone__avatar"
                  src="/brand/logo.png"
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">online</span>
                </span>
              </div>

              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">Hi TeddyPups! I'd love to know more about your puppies.</p>

                {/* Step 1 WhatsApp Message: Breed chips */}
                <div className="tp-msg-group" data-step="0" data-show={activeStep === 0 ? 'true' : 'false'}>
                  <div className="tp-msg tp-msg--them">
                    <p>Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      <li><Link href="/puppies?breed=maltipoo">Maltipoo</Link></li>
                      <li><Link href="/puppies?breed=pomeranian">Pomeranian</Link></li>
                      <li><Link href="/puppies?breed=poodle">Poodle</Link></li>
                      <li><Link href="/puppies?breed=cavapoo">Cavapoo</Link></li>
                      <li><Link href="/puppies?breed=shih-tzu">Shih Tzu</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 WhatsApp Message: Photos & Video */}
                <div className="tp-msg-group" data-step="1" data-show={activeStep >= 1 ? 'true' : 'false'}>
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      <span className="tp-snaps__one">
                        <img
                          alt="Showroom apricot puppy"
                          loading="lazy"
                          decoding="async"
                          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                          src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="Showroom puppy close up"
                          loading="lazy"
                          decoding="async"
                          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                          src="/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="Showroom puppy looking up"
                          loading="lazy"
                          decoding="async"
                          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                          src="/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg"
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="Showroom puppy hello"
                          loading="lazy"
                          decoding="async"
                          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                          src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-clip">
                      <video
                        src="/media/_cJaO-ryO6ev/af9e004679/b942a5_93358f1b7c434434b226b19e9ee0705b.mp4"
                        poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        muted={true}
                        loop={true}
                        playsInline={true}
                        autoPlay={true}
                        aria-label="Video of puppy in showroom"
                      />
                    </div>
                  </div>
                  <p className="tp-msg tp-msg--them">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
                </div>

                {/* Step 3 WhatsApp Message: Dotted path to house with heart */}
                <div className="tp-msg-group" data-step="2" data-show={activeStep === 2 ? 'true' : 'false'}>
                  <div className="tp-msg tp-msg--them">
                    <p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
                    <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                      <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line"></path>
                      <circle cx="14" cy="52" r="5" className="tp-route__dot"></circle>
                      <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home"></path>
                      <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart"></path>
                      {/* Dotted path pawprints with animated appear */}
                      <circle cx="65" cy="28" r="3.5" fill="#c2622b" className="tp-route__paw-1" />
                      <circle cx="108" cy="46" r="3.5" fill="#c2622b" className="tp-route__paw-2" />
                      <circle cx="142" cy="36" r="3.5" fill="#c2622b" className="tp-route__paw-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
                className="tp-phone__compose"
              >
                <span>Say hello on WhatsApp</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z"></path>
                </svg>
              </a>
            </div>

            {/* Mascot SITS beside the phone and reacts to each step */}
            <div
              data-pup-stop="true"
              data-pose={currentPose}
              data-facing="left"
              data-lane="true"
              className="pup-stop tp-chat__teddy transition-all duration-300"
            >
              <PupBuddy
                pose={currentPose}
                facing="left"
                label="Teddy, sitting beside the WhatsApp phone journey"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
