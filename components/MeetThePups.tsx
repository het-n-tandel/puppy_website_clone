'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/types/puppy';

interface MeetThePupsProps {
  puppies: Puppy[];
}

export default function MeetThePups({ puppies }: MeetThePupsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalDist = container.offsetHeight - window.innerHeight;

      if (totalDist > 0) {
        // Calculate progress from 0 to 1
        const progress = Math.min(1, Math.max(0, -rect.top / totalDist));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayPuppies = puppies.slice(0, 10);
  // Calculate horizontal translation percentage
  const maxTranslate = (displayPuppies.length - 2.5) * 280;
  const translateX = -scrollProgress * maxTranslate;

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] bg-gradient-to-b from-[#fff1d8] to-[#fbe3b4] select-none"
      aria-labelledby="meet-title"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden pt-20 pb-8 sm:pb-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
          <div>
            <h2 id="meet-title" className="font-serif text-3xl sm:text-5xl font-black text-[#2a170e]">
              Meet the pups
            </h2>
            <p className="text-sm sm:text-base text-[#5a3a28] mt-2 max-w-lg font-medium">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>
          <Link href="/puppies" className="btn-primary text-sm sm:text-base font-bold py-3 px-7 shrink-0 shadow-md">
            See all available puppies
          </Link>
        </div>

        {/* Horizontal Parade Track */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto">
          <div
            className="flex items-end gap-6 sm:gap-10 pl-[8vw] sm:pl-[20vw] pr-[20vw] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
            }}
          >
            {displayPuppies.map((pup, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={pup.id}
                  className="shrink-0 group relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Name Plate Header */}
                  <div className="mb-3 text-center transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2a170e]">
                      {pup.name}
                    </h3>
                    <p className="text-xs text-[#5a3a28] font-medium">
                      {pup.breed} · {pup.gender.toLowerCase()} · {pup.age}
                    </p>
                  </div>

                  {/* Arched Doorway with Peekaboo Door Leaf */}
                  <Link
                    href={`/puppies/${pup.slug}`}
                    className="relative block w-44 sm:w-56 h-60 sm:h-76 rounded-t-full overflow-hidden border-[3.5px] border-[#2a170e] bg-[#fffdf8] shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    {/* Puppy Photo inside the room */}
                    <Image
                      src={pup.images[0] || '/brand/logo.png'}
                      alt={`${pup.name} puppy`}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Door Leaf that swings open on hover with paw peephole */}
                    <div
                      className={`absolute inset-0 bg-[#e4a352] border-r-2 border-[#2a170e] transition-transform duration-500 origin-left flex items-center justify-center ${
                        isHovered ? '-rotate-y-90 opacity-0' : 'rotate-y-0 opacity-85'
                      }`}
                    >
                      <div className="text-[#2a170e]">
                        <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                      <span className="badge-sticker bg-[#fffdf8] text-[#2a170e] text-[11px] font-bold border border-[#2a170e]">
                        {pup.status}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="text-center z-20 text-xs font-bold text-[#5a3a28] tracking-widest uppercase flex items-center justify-center gap-2">
          <span>🐾</span>
          <span>Scroll to walk through the puppy gallery</span>
          <span>🐾</span>
        </div>
      </div>
    </section>
  );
}
