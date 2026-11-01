'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';

interface Seat {
  id: string;
  name: string;
  breed: string;
  slug: string;
  x: string;
  w: string;
  peek: number;
  tilt: string;
  image: string;
}

const SEATS: Seat[] = [
  {
    id: 'copper',
    name: 'Copper',
    breed: 'Cavapoo',
    slug: 'copper-male',
    x: '8%',
    w: 'clamp(3.8rem, 12.5vw, 8.4rem)',
    peek: 0.62,
    tilt: '-5deg',
    image: '/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
  },
  {
    id: 'korean-maltipoo',
    name: 'Korean Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    x: '22%',
    w: 'clamp(4.6rem, 15vw, 10.8rem)',
    peek: 0.82,
    tilt: '3deg',
    image: '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
  },
  {
    id: 'pomeranian',
    name: 'Pomeranian',
    breed: 'Pomeranian',
    slug: 'korean-teacup-poodle-female',
    x: '35%',
    w: 'clamp(4.2rem, 13.5vw, 9.2rem)',
    peek: 0.72,
    tilt: '-2deg',
    image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
  },
  {
    id: 'maltipoo-cavapoo',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-cavapoo-male',
    x: '65%',
    w: 'clamp(4.2rem, 13.5vw, 9.4rem)',
    peek: 0.74,
    tilt: '3deg',
    image: '/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
  },
  {
    id: 'poodle',
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    slug: 'toy-poodle-male-female',
    x: '78%',
    w: 'clamp(4.6rem, 15vw, 11rem)',
    peek: 0.84,
    tilt: '-3deg',
    image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
  },
  {
    id: 'maltipoo-2',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-female-2',
    x: '92%',
    w: 'clamp(3.8rem, 12.5vw, 8.4rem)',
    peek: 0.6,
    tilt: '4deg',
    image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
  },
];

export default function HeroStage() {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[22rem] sm:h-[26rem] mt-6 overflow-hidden select-none">
      {/* Peeking Puppies Lineup */}
      <div className="absolute inset-x-0 bottom-0 top-0 max-w-[1300px] mx-auto">
        {SEATS.map((seat) => {
          const isHovered = hoveredSeat === seat.id;
          return (
            <div
              key={seat.id}
              className="absolute transition-transform duration-300 ease-out z-10"
              style={{
                left: seat.x,
                bottom: '3.6rem',
                transform: `translateX(-50%) rotate(${seat.tilt})`,
              }}
              onMouseEnter={() => setHoveredSeat(seat.id)}
              onMouseLeave={() => setHoveredSeat(null)}
            >
              {/* Speech Bubble Tag */}
              <div
                className={`absolute left-1/2 -top-10 -translate-x-1/2 bg-[#fffdf8] text-[#2a170e] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#2a170e] shadow-md transition-all duration-300 whitespace-nowrap pointer-events-none ${
                  isHovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-2'
                }`}
              >
                <span>{seat.name}</span>
              </div>

              {/* Arched Window with Puppy */}
              <Link
                href={`/puppies/${seat.slug}`}
                aria-label={`Meet ${seat.name}`}
                className="block relative rounded-t-full overflow-hidden border-[3.5px] border-[#2a170e] bg-[#fbe3b4] shadow-md transition-all duration-300 hover:-translate-y-3"
                style={{
                  width: seat.w,
                  height: `calc(${seat.w} * 1.35)`,
                }}
              >
                <Image
                  src={seat.image}
                  alt={seat.name}
                  fill
                  sizes="220px"
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </div>
          );
        })}

        {/* Center Mascot: Teddy the Puppy (Peeking Pose - Matching Screenshot 2) */}
        <div
          data-pup-stop="true"
          data-pose="peek"
          data-facing="right"
          className="pup-stop hero-mascot-teddy absolute left-1/2 bottom-[2.2rem] sm:bottom-[2.6rem] -translate-x-1/2 z-20 pointer-events-auto transition-transform hover:-translate-y-2 duration-300"
          style={{
            width: 'clamp(9.5rem, min(24vw, 26vh), 14.5rem)',
            height: 'clamp(7.5rem, min(22vw, 24vh), 12.5rem)',
          }}
        >
          <PupBuddy pose="peek" facing="right" label="Teddy peeking over the quilt" />
        </div>
      </div>

      {/* Quilted Blanket Fence with Scalloped Edge across bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 z-25 bg-[#fff1d8] border-t-0 shadow-sm">
        {/* Diamond quilt pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent 0 46px, #2a170e1a 46px 48px),
                              repeating-linear-gradient(-45deg, transparent 0 46px, #2a170e1a 46px 48px)`,
          }}
        />

        {/* Scalloped Stitched Edge SVG */}
        <svg
          className="absolute -top-[39px] left-0 w-full h-[40px] pointer-events-none"
          width="100%"
          height="40"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="quilt-scallop-pat" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fff1d8" />
              <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2a170e"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.45"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#quilt-scallop-pat)" />
        </svg>
      </div>
    </div>
  );
}
