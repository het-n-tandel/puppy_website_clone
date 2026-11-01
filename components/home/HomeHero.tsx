'use client';

import React, { useState, useEffect } from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

interface PuppyOption {
  name: string;
  breed: string;
  slug: string;
  image: string;
  alt: string;
}

interface SeatConfig {
  x: string;
  w: string;
  peek: string;
  tilt: string;
  i: string;
  puppies: PuppyOption[];
}

const SEATS: SeatConfig[] = [
  {
    x: '9%',
    w: '8.6rem',
    peek: '0.62',
    tilt: '-5deg',
    i: '0',
    puppies: [
      {
        name: 'Max',
        breed: 'Maltipoo',
        slug: 'maltipoo-max-male',
        image: '/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
        alt: 'Max, male Maltipoo puppy',
      },
      {
        name: 'Copper',
        breed: 'Cavapoo',
        slug: 'copper-male',
        image: '/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
        alt: 'Copper, Cavapoo puppy',
      },
    ],
  },
  {
    x: '22.5%',
    w: '10.4rem',
    peek: '0.8',
    tilt: '3deg',
    i: '1',
    puppies: [
      {
        name: 'Korean Teacup Maltipoo',
        breed: 'Korean Teacup Maltipoo',
        slug: 'korean-teacup-maltipoo-female',
        image: '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
        alt: 'Female Korean Teacup Maltipoo puppy',
      },
      {
        name: 'Mini Bichon',
        breed: 'Bichon Frise',
        slug: 'bichon-frise-female',
        image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
        alt: 'Mini Bichon Frise puppy',
      },
    ],
  },
  {
    x: '35%',
    w: '9.2rem',
    peek: '0.7',
    tilt: '-2deg',
    i: '2',
    puppies: [
      {
        name: 'Korean Teacup Poodle',
        breed: 'Korean Teacup Poodle',
        slug: 'korean-teacup-poodle-female',
        image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
        alt: 'Female Korean Teacup Poodle puppy',
      },
      {
        name: 'Teacup Yorkie',
        breed: 'Yorkshire Terrier',
        slug: 'teacup-yorkie-female',
        image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
        alt: 'Teacup Yorkie puppy',
      },
    ],
  },
  {
    x: '65%',
    w: '9.4rem',
    peek: '0.74',
    tilt: '3deg',
    i: '3',
    puppies: [
      {
        name: 'Maltipoo & Cavapoo',
        breed: 'Maltipoo & Cavapoo',
        slug: 'maltipoo-cavapoo-male',
        image: '/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
        alt: 'Male Maltipoo & Cavapoo puppy',
      },
      {
        name: 'Korean Pomeranian',
        breed: 'Korean Pomeranian',
        slug: 'korean-teacup-pomeranian-male',
        image: '/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg',
        alt: 'Korean Pomeranian puppy',
      },
    ],
  },
  {
    x: '77.5%',
    w: '10.6rem',
    peek: '0.82',
    tilt: '-3deg',
    i: '4',
    puppies: [
      {
        name: 'Toy Poodle',
        breed: 'Toy Poodle',
        slug: 'toy-poodle-male-female',
        image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
        alt: 'Toy Poodle puppy',
      },
      {
        name: 'Korean Teacup Pomeranian',
        breed: 'Pomeranian',
        slug: 'korean-teacup-pomeranian-male',
        image: '/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg',
        alt: 'Korean Teacup Pomeranian puppy',
      },
    ],
  },
  {
    x: '91%',
    w: '8.4rem',
    peek: '0.6',
    tilt: '4deg',
    i: '5',
    puppies: [
      {
        name: 'Maltipoo',
        breed: 'Maltipoo',
        slug: 'maltipoo-female-2',
        image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
        alt: 'Female Maltipoo puppy',
      },
      {
        name: 'Apricot Poodle',
        breed: 'Toy Poodle',
        slug: 'korean-teacup-poodle-female',
        image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
        alt: 'Apricot Poodle puppy',
      },
    ],
  },
];

export default function HomeHero() {
  // Start active on seat 4 ("Toy Poodle") matching the user screenshot
  const [activeSeat, setActiveSeat] = useState<number>(4);
  const [pupIndices, setPupIndices] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [isHoveredByUser, setIsHoveredByUser] = useState<boolean>(false);

  // Automatic timed rotation: active breed dog card rotates every 3.2s
  useEffect(() => {
    if (isHoveredByUser) return;

    const timer = setInterval(() => {
      setActiveSeat((prev) => {
        const nextSeat = (prev + 1) % SEATS.length;
        // Periodically rotate the puppy breed photo in that seat
        setPupIndices((prevIndices) => {
          const nextIndices = [...prevIndices];
          nextIndices[nextSeat] = (nextIndices[nextSeat] + 1) % SEATS[nextSeat].puppies.length;
          return nextIndices;
        });
        return nextSeat;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isHoveredByUser]);

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
            {SEATS.map((seat, i) => {
              const pupIndex = pupIndices[i] || 0;
              const currentPup = seat.puppies[pupIndex] || seat.puppies[0];
              const isActive = activeSeat === i;

              return (
                <li
                  key={i}
                  className="tp-lineup__seat"
                  style={
                    {
                      '--x': seat.x,
                      '--w': seat.w,
                      '--peek': seat.peek,
                      '--tilt': seat.tilt,
                      '--i': seat.i,
                      transform: isActive ? 'translate(-50%, -10px)' : 'translate(-50%, 0)',
                      transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: isActive ? 25 : parseInt(seat.i) + 1,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => {
                    setActiveSeat(i);
                    setIsHoveredByUser(true);
                  }}
                  onMouseLeave={() => setIsHoveredByUser(false)}
                >
                  <Link
                    className="tp-lineup__pup"
                    data-pup-friend="true"
                    aria-label={`Meet ${currentPup.name}, ${currentPup.breed}`}
                    href={`/puppies/${currentPup.slug}`}
                  >
                    <span className="tp-lineup__photo" style={{ transition: 'transform 0.4s ease-out' }}>
                      <img
                        key={currentPup.image}
                        alt={currentPup.alt}
                        fetchPriority={i === 0 || i === 1 ? 'high' : 'auto'}
                        loading="eager"
                        decoding="async"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          objectFit: 'cover',
                        }}
                        src={currentPup.image}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Floating Breed Name Tag Badges with Handwritten Font */}
          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            {SEATS.map((seat, i) => {
              const pupIndex = pupIndices[i] || 0;
              const currentPup = seat.puppies[pupIndex] || seat.puppies[0];
              const isActive = activeSeat === i;

              return (
                <li
                  key={i}
                  className="tp-lineup__seat pointer-events-none"
                  style={
                    {
                      '--x': seat.x,
                      '--w': seat.w,
                      '--peek': seat.peek,
                      '--tilt': seat.tilt,
                      '--i': seat.i,
                      transform: isActive ? 'translate(-50%, -10px)' : 'translate(-50%, 0)',
                      transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: isActive ? 30 : 10,
                    } as React.CSSProperties
                  }
                >
                  <span className="tp-lineup__ghost" data-tag={isActive ? 'show' : undefined}>
                    <span className="tp-lineup__name font-scrawl">
                      {currentPup.name}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Center Dynamic Mascot Stop: Teddy peeking over the quilt blanket with ears down */}
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
