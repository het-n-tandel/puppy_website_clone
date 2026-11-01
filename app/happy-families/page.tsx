'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../subpages.css';
import { X } from 'lucide-react';
import galleryMedia from '@/data/happy-families-gallery.json';

const TAPE_COLORS = ['#f6d79a', '#cfe5f6', '#f9cdbf', '#dcf8c6', '#e0cbfb', '#fed0e0'];
const TILTS = ['-2.2deg', '1.5deg', '-1.8deg', '2.4deg', '-1.2deg', '2.1deg', '-2.6deg', '1.8deg', '-0.9deg'];

export default function HappyFamiliesPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const items = galleryMedia.map((mediaSrc, idx) => {
    const tilt = TILTS[idx % TILTS.length];
    const tape = TAPE_COLORS[idx % TAPE_COLORS.length];
    return {
      id: idx,
      src: mediaSrc,
      tilt,
      tape,
    };
  });

  return (
    <div data-page="families" className="tp-page">
      <section aria-labelledby="families-title" className="tp-memories min-h-screen">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <div className="tp-memories__head">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                our wall of happy endings
              </p>
              <h1 id="families-title" className="font-plush text-giant tp-memories__title" data-reveal="true">
                Happy
                <br />
                families
              </h1>
              <div className="mt-4">
                <svg viewBox="0 0 48 44" className="w-10 h-10 text-toffee" aria-hidden="true">
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                64 moments and counting
              </p>
            </div>

            {/* Featured Pinned Note */}
            <figure className="tp-memories__note" data-reveal="true">
              <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ '--tape': '#cfe5f6' } as React.CSSProperties} />
              <blockquote className="font-plush-text">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
            </figure>
          </div>

          {/* Polaroid Masonry Wall */}
          <div className="mt-16 md:mt-20">
            <ul className="tp-wall" aria-label="Photos from TeddyPups families">
              {items.map((item, idx) => (
                <li
                  key={item.id}
                  className="tp-wall__item mb-8 break-inside-avoid"
                  data-reveal="true"
                  style={{ '--d': `${idx * 15}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    className="tp-wall__print w-full text-left cursor-pointer"
                    onClick={() => setSelectedPhoto(item.src)}
                    aria-label={`Open photo ${item.id + 1} of ${items.length}`}
                  >
                    <span
                      className="tp-polaroid hover:scale-[1.03] transition-transform duration-300"
                      style={
                        {
                          '--tilt': item.tilt,
                          '--tape': item.tape,
                          '--i': idx,
                        } as React.CSSProperties
                      }
                    >
                      <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ '--tape': item.tape } as React.CSSProperties} />
                      <span className="tp-polaroid__photo block relative w-full overflow-hidden">
                        <Image
                          src={item.src}
                          alt="A happy TeddyPups family with their new puppy"
                          width={960}
                          height={1280}
                          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                          className="w-full h-auto object-cover"
                        />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#2a170e]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-xl w-full bg-milk p-4 rounded-3xl border-3 border-cocoa shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 size-9 bg-milk border-2 border-cocoa rounded-full flex items-center justify-center text-cocoa shadow-md hover:bg-honey-soft"
              aria-label="Close photo"
            >
              <X className="size-5" />
            </button>
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-cocoa/20">
              <Image
                src={selectedPhoto}
                alt="Happy puppy family"
                fill
                sizes="(max-width: 768px) 90vw, 600px"
                className="object-cover"
              />
            </div>
            <p className="font-scrawl text-toffee-ink mt-3 text-base">
              A happy TeddyPups family moment 🐾❤️
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
