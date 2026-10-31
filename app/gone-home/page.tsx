import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getGoneHomePuppies } from '@/data/puppiesData';
import { currentSite } from '@/lib/siteConfig';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `Gone Home | ${currentSite.brandName}`,
  description:
    'Our cherished puppies that have safely arrived at their loving forever homes across Dubai and the UAE.',
};

export default function GoneHomePage() {
  const goneHomePuppies = getGoneHomePuppies();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          Cherished Memories
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          Gone Home
        </h1>
        <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
          Nothing brings us more fulfillment than seeing our puppies thriving in their forever homes. Here are some of our adopted alumni.
        </p>
      </div>

      {/* Grid of Adopted Puppies */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {goneHomePuppies.map((puppy) => (
          <div
            key={puppy.id}
            className="group relative flex flex-col items-center text-center p-3 rounded-3xl bg-[#fffdf8] border-2 border-[#2a170e]/15 shadow-sm"
          >
            <div className="relative w-full aspect-square rounded-[28px] overflow-hidden mb-3 bg-[#fbe3b4]">
              <Image
                src={puppy.images[0] || '/brand/logo.png'}
                alt={puppy.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="badge-sticker bg-[#2a170e] text-[#f2be6b] text-xs">
                  Gone Home ❤️
                </span>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2a170e]">
              {puppy.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#5a3a28] font-medium mt-0.5">
              {puppy.breed} · Adopted in UAE
            </p>
          </div>
        ))}
      </div>

      {/* Adoption CTA */}
      <div className="bg-[#fbe3b4]/50 rounded-[36px] p-8 text-center space-y-4 border-2 border-[#2a170e]/20 max-w-xl mx-auto">
        <Sparkles className="w-8 h-8 text-[#a24a1a] mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#2a170e]">
          Ready to Add a Furry Baby to Your Family?
        </h2>
        <p className="text-sm text-[#5a3a28]">
          Explore our current litter of puppies available for adoption in Dubai today.
        </p>
        <div className="pt-2">
          <Link href="/puppies" className="btn-primary text-sm py-2.5 px-6">
            <span>View Available Puppies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
