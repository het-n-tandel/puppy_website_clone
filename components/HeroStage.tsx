'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    w: '8.4rem',
    peek: 0.62,
    tilt: '-5deg',
    image: 'https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
  },
  {
    id: 'korean-maltipoo',
    name: 'Korean Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    x: '22%',
    w: '10.8rem',
    peek: 0.82,
    tilt: '3deg',
    image: 'https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
  },
  {
    id: 'pomeranian',
    name: 'Pomeranian',
    breed: 'Pomeranian',
    slug: 'korean-teacup-poodle-female',
    x: '35%',
    w: '9.2rem',
    peek: 0.72,
    tilt: '-2deg',
    image: 'https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
  },
  {
    id: 'maltipoo-cavapoo',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-cavapoo-male',
    x: '65%',
    w: '9.4rem',
    peek: 0.74,
    tilt: '3deg',
    image: 'https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
  },
  {
    id: 'poodle',
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    slug: 'toy-poodle-male-female',
    x: '78%',
    w: '11rem',
    peek: 0.84,
    tilt: '-3deg',
    image: 'https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
  },
  {
    id: 'maltipoo-2',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-female-2',
    x: '92%',
    w: '8.4rem',
    peek: 0.6,
    tilt: '4deg',
    image: 'https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
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

        {/* Center Mascot: Teddy the Puppy */}
        <div
          className="absolute left-1/2 bottom-[3.2rem] -translate-x-1/2 z-20 pointer-events-auto transition-transform hover:-translate-y-2 duration-300"
          style={{ width: '13rem', height: '11.5rem' }}
        >
          <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible drop-shadow-md">
            <g data-p="root">
              <g data-p="head" transform="translate(0 4)">
                {/* Ears */}
                <path
                  data-p="earL"
                  d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  transform="rotate(-6 174 82)"
                />
                <path
                  data-p="earR"
                  d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  transform="rotate(6 250 82)"
                />
                {/* Fluffy Head Shape */}
                <path
                  d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Fluffy tuft on forehead */}
                <path
                  d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Muzzle */}
                <path
                  d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                  fill="#fbe3b4"
                />
                {/* Cheeks */}
                <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                {/* Eyes with shiny highlights */}
                <g data-p="eyes">
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
                {/* Nose & Mouth */}
                <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
              </g>
              {/* Paws on the quilt ledge */}
              <g data-p="ledge" transform="translate(0 4)">
                <path
                  d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              </g>
            </g>
          </svg>
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
