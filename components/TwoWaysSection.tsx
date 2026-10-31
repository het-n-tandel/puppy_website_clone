'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';

export default function TwoWaysSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flightT, setFlightT] = useState(0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Flight runs as section moves through the viewport
      const totalRange = windowH + rect.height;
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / totalRange));
      setFlightT(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute position & angle along the cubic Bezier flight curve
  // P0 = (40, 250), C1 = (170, 40), C2 = (470, 20), P3 = (620, 168)
  const t = flightT;
  const t1 = 1 - t;
  const planeX =
    t1 * t1 * t1 * 40 +
    3 * t1 * t1 * t * 170 +
    3 * t1 * t * t * 470 +
    t * t * t * 620;
  const planeY =
    t1 * t1 * t1 * 250 +
    3 * t1 * t1 * t * 40 +
    3 * t1 * t * t * 20 +
    t * t * t * 168;

  const dx =
    3 * t1 * t1 * (170 - 40) +
    6 * t1 * t * (470 - 170) +
    3 * t * t * (620 - 470);
  const dy =
    3 * t1 * t1 * (40 - 250) +
    6 * t1 * t * (20 - 40) +
    3 * t * t * (168 - 20);
  const planeAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <section
      ref={sectionRef}
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-paths select-none"
      style={{
        ['--sky-top' as any]: '#fbe3b4',
        ['--sky-bottom' as any]: '#f7d18d',
        background: 'linear-gradient(to bottom, #fbe3b4, #f7d18d)',
      }}
      aria-labelledby="paths-title"
    >
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <h2 id="paths-title" className="tp-paths__title font-plush text-huge text-[#2a170e]">
          Two ways to meet your puppy
        </h2>

        <div className="tp-fork">
          {/* Central Wooden Signpost */}
          <div aria-hidden="true" className="tp-fork__post" />

          {/* LEFT PATH: Puppies in Dubai */}
          <article className="tp-way tp-way--left" aria-labelledby="way-local">
            <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
              Puppies in Dubai
            </h3>

            <div className="tp-way__scene" data-pup-look="true">
              {/* Skyline Outline SVG */}
              <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Showroom Window with Striped Awning */}
              <figure className="tp-window">
                <span className="tp-window__glass">
                  <Image
                    src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                    alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                    fill
                    sizes="(min-width: 1024px) 16rem, 60vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </span>
                <figcaption className="font-scrawl">In our showroom</figcaption>
              </figure>
            </div>

            <p className="tp-way__text">
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>

            <Link href="/puppies?origin=local" className="btn btn-primary">
              Meet local puppies
            </Link>
          </article>

          {/* RIGHT PATH: Imported for you */}
          <article className="tp-way tp-way--right" aria-labelledby="way-imported">
            <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
              Imported for you
            </h3>

            <div className="tp-way__scene" data-pup-look="true">
              <div className="tp-flight">
                <svg
                  viewBox="0 0 660 300"
                  role="img"
                  aria-label="A plane bringing a Korean Teacup puppy from Korea to Dubai"
                >
                  <defs>
                    <clipPath id="tp-plane-porthole">
                      <circle r="25" cx="0" cy="0" />
                    </clipPath>
                  </defs>

                  {/* Flight arc path */}
                  <path d="M40 250 C 170 40, 470 20, 620 168" className="tp-flight__route" />
                  <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                  <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
                  <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
                    Korea
                  </text>
                  <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
                    Dubai
                  </text>

                  {/* Airplane flying along the arc from Korea to Dubai */}
                  <g
                    transform={`translate(${planeX.toFixed(1)} ${planeY.toFixed(1)}) rotate(${(planeAngle * 0.7).toFixed(1)})`}
                    style={{ transition: 'transform 0.08s ease-out' }}
                  >
                    <g transform="translate(-126 -78)">
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
                      <path
                        d="M108 112 L142 156 L172 156 L158 112 Z"
                        className="tp-flight__wing tp-flight__wing--far"
                      />
                      <path
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                        className="tp-flight__body"
                      />
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
                      <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
                    </g>

                    {/* Porthole window with puppy photo */}
                    <g transform="translate(10 2)">
                      <image
                        href="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                        x="-25"
                        y="-25"
                        width="50"
                        height="50"
                        clipPath="url(#tp-plane-porthole)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="25" className="tp-flight__porthole" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className="tp-way__text">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
            </p>

            <Link href="/puppies?origin=imported" className="btn btn-primary">
              See imported puppies
            </Link>
          </article>

          {/* Center Mascot: Teddy standing at the base of the signpost */}
          <div
            data-pup-stop="true"
            data-pose="stand"
            data-facing="right"
            className="pup-stop tp-fork__teddy"
          >
            <PupBuddy pose="stand" facing="right" label="Teddy standing at the signpost" />
          </div>
        </div>
      </div>
    </section>
  );
}
