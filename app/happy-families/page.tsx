'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, X, ArrowRight } from 'lucide-react';
import galleryMedia from '@/data/happy-families-gallery.json';

const TAPE_COLORS = ['#f6d79a', '#bfddf5', '#f9cdbf', '#dcf8c6', '#e0cbfb', '#fed0e0'];

const CAPTIONS = [
  'Lulu 🧸 with her new mummy ❤️',
  'Adorable Maltipoo baby 🧸❤️',
  'My new teddy puppy 🥺🧸',
  'Our new puppies 🧸🥺🤗',
  'New puppy 🧸😍',
  'Gang of 3 😍🧸',
  'So happy 😍😍',
  'New pup 🤗💫',
  'First morning at home 🐾✨',
  'Pure unconditional love ❤️',
  'Nap time after playtime 😴💤',
  'Best companion ever! 🧸',
];

export default function HappyFamiliesPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Generate deterministic rotation and tape color per photo
  const items = galleryMedia.map((mediaSrc, idx) => {
    const tiltValues = [-2.6, 2.1, -1.8, 2.8, -3.2, 1.5, -1.2, 2.4, -2.1];
    const tilt = tiltValues[idx % tiltValues.length];
    const tape = TAPE_COLORS[idx % TAPE_COLORS.length];
    const caption = CAPTIONS[idx % CAPTIONS.length];
    return {
      id: idx,
      src: mediaSrc,
      tilt: `${tilt}deg`,
      tape,
      caption,
    };
  });

  return (
    <div className="tp-memories min-h-screen py-10 sm:py-16">
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        {/* Head with Header & Sarah M Note */}
        <div className="tp-memories__head mb-16">
          <div>
            <p className="font-serif italic text-lg sm:text-xl font-bold text-[#c2622b]">
              our wall of happy endings
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#2a170e] tracking-tight mt-2 flex items-center gap-3">
              Happy families
              <svg viewBox="0 0 48 44" className="w-8 h-8 text-[#c2622b] inline-block" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z" />
              </svg>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#5a3a28] max-w-xl leading-relaxed">
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
            </p>
            <p className="font-serif italic mt-4 text-lg font-bold text-[#c2622b]">
              {items.length} moments and counting
            </p>
          </div>

          {/* Featured Sarah M note */}
          <figure className="tp-memories__note">
            <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ ['--tape' as any]: '#cfe5f6' }} />
            <blockquote className="font-serif italic text-base sm:text-lg text-[#2a170e] leading-relaxed">
              &ldquo;TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.&rdquo;
            </blockquote>
            <figcaption className="font-serif font-bold text-sm text-[#a24a1a] mt-3">
              Sarah M., Dubai, UAE
            </figcaption>
          </figure>
        </div>

        {/* Polaroid Wall */}
        <ul className="tp-wall" aria-label="Photos from TeddyPups families">
          {items.map((item) => (
            <li key={item.id} className="tp-wall__item">
              <button
                type="button"
                className="tp-wall__print text-left"
                onClick={() => setSelectedPhoto(item.src)}
                aria-label={`Open photo ${item.id + 1} of ${items.length}`}
              >
                <span
                  className="tp-polaroid"
                  style={{
                    ['--tilt' as any]: item.tilt,
                    ['--tape' as any]: item.tape,
                  }}
                >
                  <span aria-hidden="true" className="tp-tape tp-tape--center" />
                  <span className="tp-polaroid__photo block aspect-[4/5] relative w-full overflow-hidden rounded-[2px]">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </span>
                  <span className="block mt-3 text-center text-xs sm:text-sm font-serif font-medium text-[#2a170e]">
                    {item.caption}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom CTA Banner */}
        <div className="mt-20 max-w-3xl mx-auto bg-[#fffdf8] rounded-[36px] border-3 border-[#2a170e] p-8 sm:p-12 text-center space-y-4 shadow-[6px_8px_0px_#2a170e]">
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2a170e]">
            Are You a TeddyPups Parent?
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-lg mx-auto">
            Send us your latest photos and puppy milestones on WhatsApp or tag @teddypups.worldwide to be featured on our Wall of Love!
          </p>
          <div className="pt-2">
            <Link href="/contact" className="btn-primary text-sm py-3 px-8 shadow-md inline-flex items-center gap-2">
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#2a170e]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#fffdf8] p-4 sm:p-6 rounded-3xl border-3 border-[#2a170e] shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#fbe3b4] text-[#2a170e] hover:bg-[#c2622b] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[4/5] max-h-[70vh] rounded-2xl overflow-hidden mt-2 border border-[#2a170e]/20">
              <Image
                src={selectedPhoto}
                alt="Enlarged puppy moment"
                fill
                sizes="(max-width: 768px) 90vw, 600px"
                className="object-contain bg-black/5"
              />
            </div>
            <p className="font-serif italic font-bold text-[#2a170e] mt-4 text-center text-base">
              TeddyPups Happy Moment
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
