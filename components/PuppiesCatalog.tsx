'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/types/puppy';

interface PuppiesCatalogProps {
  initialPuppies: Puppy[];
  initialBreed?: string;
}

const WASH_COLORS = ['#f2be6b', '#bfddf5', '#f9cdbf', '#e6f2df', '#fed0e0', '#fbe3b4'];
const TILTS = ['0.4deg', '-0.6deg', '0.8deg', '-0.4deg', '0.5deg', '-0.7deg'];

export default function PuppiesCatalog({ initialPuppies, initialBreed }: PuppiesCatalogProps) {
  const [selectedWhere, setSelectedWhere] = useState<string>('everywhere');
  const [selectedBreed, setSelectedBreed] = useState<string>(initialBreed || 'all');
  const [selectedGender, setSelectedGender] = useState<string>('all');

  const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter((pup) => {
      // Where filter
      if (selectedWhere === 'imported' && !pup.origin?.toLowerCase().includes('korea') && !pup.breed.toLowerCase().includes('korean')) {
        return false;
      }
      if (selectedWhere === 'korean' && !pup.breed.toLowerCase().includes('korean') && !pup.origin?.toLowerCase().includes('korea')) {
        return false;
      }

      // Breed filter
      if (selectedBreed !== 'all' && !pup.breed.toLowerCase().includes(selectedBreed.toLowerCase())) {
        return false;
      }

      // Gender filter
      if (selectedGender === 'boys' && !pup.gender.toLowerCase().includes('boy') && !pup.gender.toLowerCase().includes('male')) {
        return false;
      }
      if (selectedGender === 'girls' && !pup.gender.toLowerCase().includes('girl') && !pup.gender.toLowerCase().includes('female')) {
        return false;
      }

      return true;
    });
  }, [initialPuppies, selectedWhere, selectedBreed, selectedGender]);

  return (
    <div className="space-y-10">
      {/* Sketchpad Filter Box */}
      <div className="tp-sketchpad space-y-4">
        {/* Row 1: Where */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
          <span className="font-scrawl text-cocoa-soft min-w-[5.5rem] text-base">where</span>
          <button
            type="button"
            onClick={() => setSelectedWhere('everywhere')}
            className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
              selectedWhere === 'everywhere'
                ? 'bg-cocoa text-milk shadow-sm'
                : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
            }`}
          >
            Everywhere
          </button>
          <button
            type="button"
            onClick={() => setSelectedWhere('imported')}
            className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
              selectedWhere === 'imported'
                ? 'bg-cocoa text-milk shadow-sm'
                : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
            }`}
          >
            Imported
          </button>
          <button
            type="button"
            onClick={() => setSelectedWhere('korean')}
            className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
              selectedWhere === 'korean'
                ? 'bg-cocoa text-milk shadow-sm'
                : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
            }`}
          >
            Korean Teacup
          </button>
        </div>

        {/* Row 2: Breed */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
          <span className="font-scrawl text-cocoa-soft min-w-[5.5rem] text-base">breed</span>
          {breeds.map((breed) => {
            const isSelected = selectedBreed.toLowerCase() === breed.toLowerCase();
            return (
              <button
                key={breed}
                type="button"
                onClick={() => setSelectedBreed(isSelected ? 'all' : breed.toLowerCase())}
                className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
                  isSelected
                    ? 'bg-cocoa text-milk shadow-sm'
                    : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
                }`}
              >
                {breed}
              </button>
            );
          })}
        </div>

        {/* Row 3: Boy or Girl */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
          <span className="font-scrawl text-cocoa-soft min-w-[5.5rem] text-base">boy or girl</span>
          <button
            type="button"
            onClick={() => setSelectedGender(selectedGender === 'boys' ? 'all' : 'boys')}
            className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
              selectedGender === 'boys'
                ? 'bg-cocoa text-milk shadow-sm'
                : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
            }`}
          >
            Boys
          </button>
          <button
            type="button"
            onClick={() => setSelectedGender(selectedGender === 'girls' ? 'all' : 'girls')}
            className={`rounded-full px-5 py-1.5 font-semibold transition-all ${
              selectedGender === 'girls'
                ? 'bg-cocoa text-milk shadow-sm'
                : 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft'
            }`}
          >
            Girls
          </button>
        </div>
      </div>

      {/* Puppies Count */}
      <p className="font-scrawl text-lg text-toffee-ink">
        {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} looking for a home
      </p>

      {/* Grid of Sketch Cards */}
      <ul className="tp-sketches mt-12">
        {filteredPuppies.map((pup, idx) => {
          const tilt = TILTS[idx % TILTS.length];
          const wash = WASH_COLORS[idx % WASH_COLORS.length];
          const isAvailable = pup.status?.toLowerCase() !== 'reserved' && pup.status?.toLowerCase() !== 'adopted';

          return (
            <li key={pup.id}>
              <Link
                className="tp-sketch"
                data-reveal="true"
                style={{ '--tilt': tilt, '--d': '0ms', '--wash': wash } as React.CSSProperties}
                aria-label={`${pup.name}, ${pup.breed}, ${pup.gender}, ${pup.age}, available`}
                href={`/puppies/${pup.slug}`}
              >
                <span className="tp-sketch__frame">
                  {/* Subtle color wash behind circular photo */}
                  <span
                    className="tp-sketch__wash rounded-full"
                    style={{ background: wash, transform: 'scale(1.08)' }}
                  />

                  {/* Circular photo */}
                  <span className="tp-sketch__photo !rounded-full">
                    <Image
                      src={pup.images[0] || '/brand/logo.png'}
                      alt={pup.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </span>

                  {/* Sketched outline ink circles */}
                  <svg viewBox="0 0 100 100" className="tp-sketch__ink" aria-hidden="true">
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 10 C 50 2, 80 8, 95 35"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="1.6"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="40" r="1.5" fill="#2a170e" />
                    <circle cx="92" cy="70" r="1.5" fill="#2a170e" />
                  </svg>

                  {/* Available badge */}
                  {isAvailable && (
                    <span className="tp-sketch__sticker font-scrawl">
                      Available
                    </span>
                  )}

                  {/* Video indicator */}
                  {pup.videoUrl && (
                    <span className="tp-sketch__video">
                      ▶ video
                    </span>
                  )}
                </span>

                <span className="tp-sketch__name font-plush text-cocoa">
                  {pup.name}
                </span>
                <span className="tp-sketch__meta">
                  {pup.breed} · {pup.gender}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
