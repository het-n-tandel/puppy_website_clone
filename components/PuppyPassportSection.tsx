'use client';

import React from 'react';
import PupBuddy from './PupBuddy';

export default function PuppyPassportSection() {
  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport relative select-none"
      style={{
        ['--sky-top' as any]: '#f0b866',
        ['--sky-bottom' as any]: '#a65a30',
        background: 'linear-gradient(to bottom, #f0b866, #a65a30)',
      }}
      aria-labelledby="trust-title"
    >
      {/* Small Decorative Blue Paw Print in the Sky (Matching Screenshot 5) */}
      <div
        className="absolute top-6 right-[26%] z-10 pointer-events-none rotate-12"
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" width="20" height="20" fill="#2563eb">
          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
        </svg>
      </div>

      <div className="gutter mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Open Leather Passport Booklet */}
        <div className="tp-book">
          {/* LEFT PAGE: Kicker, Title, and Teddy Mascot */}
          <div className="tp-book__page tp-book__page--left">
            <p aria-hidden="true" className="tp-book__kicker font-scrawl">
              puppy passport
            </p>
            <h2 id="trust-title" className="font-plush tp-book__title">
              Why families trust TeddyPups
            </h2>

            {/* Mascot sitting at the bottom right corner of the left page */}
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-book__teddy"
            >
              <PupBuddy pose="sit" facing="right" label="Teddy sitting inside puppy passport" />
            </div>
          </div>

          {/* RIGHT PAGE: 4 Authentic Official Stamps in 2x2 Grid */}
          <ul className="tp-book__page tp-book__page--right list-none">
            {/* Stamp 1: Vet-checked & healthy */}
            <li
              className="tp-entry"
              style={{
                ['--ink-stamp' as any]: '#a24a1a',
                ['--tilt' as any]: '-8deg',
                ['--i' as any]: 0,
              }}
            >
              <span className="tp-stamp tp-stamp--round">
                <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                  <path
                    d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 30h7l3-7 4 13 3-6h7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="tp-stamp__title font-plush">Vet-checked &amp; healthy</span>
              </span>
              <p className="tp-entry__text">
                Every puppy comes vaccinated, dewormed, and with a verified health certificate.
              </p>
            </li>

            {/* Stamp 2: Korea to Dubai, safely */}
            <li
              className="tp-entry"
              style={{
                ['--ink-stamp' as any]: '#1f6b45',
                ['--tilt' as any]: '5deg',
                ['--i' as any]: 1,
              }}
            >
              <span className="tp-stamp tp-stamp--ticket">
                <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                  <path
                    d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 50c10 4 20 4 30 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2 7"
                  />
                </svg>
                <span className="tp-stamp__title font-plush">Korea to Dubai, safely</span>
              </span>
              <p className="tp-entry__text">
                Trusted breeders, safe travel, and premium care from start to finish.
              </p>
            </li>

            {/* Stamp 3: Support 24/7 */}
            <li
              className="tp-entry"
              style={{
                ['--ink-stamp' as any]: '#5a3a28',
                ['--tilt' as any]: '-4deg',
                ['--i' as any]: 2,
              }}
            >
              <span className="tp-stamp tp-stamp--oval">
                <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                  <path
                    d="M10 14h44v28H30l-12 10v-10h-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 28h0M32 28h0M42 28h0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="tp-stamp__title font-plush">Support 24/7</span>
              </span>
              <p className="tp-entry__text">
                Always here to help, from choosing your puppy to post-delivery support.
              </p>
            </li>

            {/* Stamp 4: Trusted by families worldwide */}
            <li
              className="tp-entry"
              style={{
                ['--ink-stamp' as any]: '#c2622b',
                ['--tilt' as any]: '7deg',
                ['--i' as any]: 3,
              }}
            >
              <span className="tp-stamp tp-stamp--scallop">
                <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                  <circle
                    cx="32"
                    cy="32"
                    r="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="tp-stamp__title font-plush">Trusted by families worldwide</span>
              </span>
              <p className="tp-entry__text">
                Puppies delivered to loving homes all around the world.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Sunset Horizon Skyline Transition with Setting Sun */}
      <div aria-hidden="true" className="tp-horizon">
        <span className="tp-horizon__sun" />
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city">
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
}
