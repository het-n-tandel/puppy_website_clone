'use client';

import React from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <div data-section="hero">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-hero"
        style={
          {
            '--sky-top': '#fffdf8',
            '--sky-bottom': '#fff1d8',
            '--quilt': '#fff1d8',
          } as React.CSSProperties
        }
        aria-labelledby="hero-title"
      >
        <span aria-hidden="true" className="tp-hero__sun"></span>

        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
              aria-hidden="true"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </p>
          <h1 id="hero-title" className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>
          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>
          <div className="tp-hero__actions">
            <Link className="btn btn-primary" href="/puppies">
              View available puppies
            </Link>
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          {/* 6 Real Puppy Showcase Cards (Left and Right Wings) */}
          <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
            <li
              className="tp-lineup__seat"
              style={{ '--x': '9%', '--w': '8.6rem', '--peek': '0.62', '--tilt': '-5deg', '--i': '0' } as React.CSSProperties}
            >
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Max, Maltipoo" href="/puppies/maltipoo-max-male">
                <span className="tp-lineup__photo">
                  <img
                    alt="Max, male Maltipoo puppy"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                  />
                </span>
              </Link>
            </li>

            <li
              className="tp-lineup__seat"
              style={{ '--x': '22.5%', '--w': '10.4rem', '--peek': '0.8', '--tilt': '3deg', '--i': '1' } as React.CSSProperties}
            >
              <Link
                className="tp-lineup__pup"
                data-pup-friend="true"
                aria-label="Meet Korean Teacup Maltipoo, Korean Teacup Maltipoo"
                href="/puppies/korean-teacup-maltipoo-female"
              >
                <span className="tp-lineup__photo">
                  <img
                    alt="Female Korean Teacup Maltipoo puppy"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                  />
                </span>
              </Link>
            </li>

            <li
              className="tp-lineup__seat"
              style={{ '--x': '35%', '--w': '9.2rem', '--peek': '0.7', '--tilt': '-2deg', '--i': '2' } as React.CSSProperties}
            >
              <Link
                className="tp-lineup__pup"
                data-pup-friend="true"
                aria-label="Meet Korean Teacup Poodle, Korean Teacup Poodle"
                href="/puppies/korean-teacup-poodle-female"
              >
                <span className="tp-lineup__photo">
                  <img
                    alt="Female Korean Teacup Poodle puppy"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg"
                  />
                </span>
              </Link>
            </li>

            <li
              className="tp-lineup__seat"
              style={{ '--x': '65%', '--w': '9.4rem', '--peek': '0.74', '--tilt': '3deg', '--i': '3' } as React.CSSProperties}
            >
              <Link
                className="tp-lineup__pup"
                data-pup-friend="true"
                aria-label="Meet Maltipoo & Cavapoo, Maltipoo & Cavapoo"
                href="/puppies/maltipoo-cavapoo-male"
              >
                <span className="tp-lineup__photo">
                  <img
                    alt="Male Maltipoo & Cavapoo puppy"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg"
                  />
                </span>
              </Link>
            </li>

            <li
              className="tp-lineup__seat"
              style={{ '--x': '77.5%', '--w': '10.6rem', '--peek': '0.82', '--tilt': '-3deg', '--i': '4' } as React.CSSProperties}
            >
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Toy Poodle, Toy Poodle" href="/puppies/toy-poodle-male-female">
                <span className="tp-lineup__photo">
                  <img
                    alt="Toy Poodle puppy"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg"
                  />
                </span>
              </Link>
            </li>

            <li
              className="tp-lineup__seat"
              style={{ '--x': '91%', '--w': '8.4rem', '--peek': '0.6', '--tilt': '4deg', '--i': '5' } as React.CSSProperties}
            >
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Maltipoo, Maltipoo" href="/puppies/maltipoo-female-2">
                <span className="tp-lineup__photo">
                  <img
                    alt="Female Maltipoo puppy"
                    loading="eager"
                    decoding="async"
                    style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                    src="/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg"
                  />
                </span>
              </Link>
            </li>
          </ul>

          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            <li className="tp-lineup__seat" style={{ '--x': '9%', '--w': '8.6rem', '--peek': '0.62', '--tilt': '-5deg', '--i': '0' } as React.CSSProperties}>
              <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Max</span></span>
            </li>
            <li className="tp-lineup__seat" style={{ '--x': '22.5%', '--w': '10.4rem', '--peek': '0.8', '--tilt': '3deg', '--i': '1' } as React.CSSProperties}>
              <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Korean Teacup Maltipoo</span></span>
            </li>
            <li className="tp-lineup__seat" style={{ '--x': '35%', '--w': '9.2rem', '--peek': '0.7', '--tilt': '-2deg', '--i': '2' } as React.CSSProperties}>
              <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Korean Teacup Poodle</span></span>
            </li>
            <li className="tp-lineup__seat" style={{ '--x': '65%', '--w': '9.4rem', '--peek': '0.74', '--tilt': '3deg', '--i': '3' } as React.CSSProperties}>
              <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Maltipoo & Cavapoo</span></span>
            </li>
            <li className="tp-lineup__seat" style={{ '--x': '77.5%', '--w': '10.6rem', '--peek': '0.82', '--tilt': '-3deg', '--i': '4' } as React.CSSProperties}>
              <span className="tp-lineup__ghost" data-tag="show"><span className="tp-lineup__name font-scrawl">Korean Teacup Pomeranian</span></span>
            </li>
            <li className="tp-lineup__seat" style={{ '--x': '91%', '--w': '8.4rem', '--peek': '0.6', '--tilt': '4deg', '--i': '5' } as React.CSSProperties}>
              <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Maltipoo</span></span>
            </li>
          </ul>

          {/* Center Dynamic Mascot Stop: Teddy peeking over the quilt blanket */}
          <div
            data-pup-stop="true"
            data-pose="peek"
            data-facing="right"
            data-act="peekaboo"
            data-behind="true"
            data-lane="true"
            className="pup-stop tp-hero__teddy"
          >
            <PupBuddy
              pose="peek"
              facing="right"
              label="Teddy, the TeddyPups puppy, peeking over the quilt"
            />
          </div>

          {/* Scalloped Quilt Blanket */}
          <div aria-hidden="true" className="tp-quilt">
            <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
              <defs>
                <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }}></path>
                  <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3"></path>
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="1.6"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                    opacity=".42"
                  ></path>
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop)"></rect>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
