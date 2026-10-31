import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { currentSite } from '@/lib/siteConfig';
import { HAPPY_FAMILIES_REVIEWS } from '@/data/contentData';
import { Star, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `Happy families | ${currentSite.brandName}`,
  description:
    'Nothing makes us happier than seeing our puppies in loving homes! Real reviews and moments shared by our amazing clients.',
};

export default function HappyFamiliesPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          our wall of happy endings
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          Happy Families
        </h1>
        <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
          Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments and real reviews shared by our amazing clients after welcoming their furry friends.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HAPPY_FAMILIES_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#fffdf8] rounded-[36px] border-2 border-[#2a170e]/15 p-8 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif italic text-base sm:text-lg text-[#2a170e] leading-relaxed">
                &quot;{rev.quote}&quot;
              </blockquote>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#2a170e]/10">
              {rev.image && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#f2be6b] shrink-0">
                  <Image src={rev.image} alt={rev.puppyName} fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-serif font-bold text-base text-[#2a170e]">
                  {rev.author}
                </h3>
                <p className="text-xs text-[#a24a1a] font-medium">
                  Adopted {rev.puppyName} ({rev.breed}) · {rev.location}
                </p>
                <p className="text-[11px] text-[#5a3a28]/60 mt-0.5">{rev.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Your Story Banner */}
      <div className="bg-[#fbe3b4] rounded-[40px] p-8 sm:p-12 border-3 border-[#2a170e] text-center space-y-4 max-w-2xl mx-auto">
        <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170e]">
          Are You a TeddyPups Parent?
        </h2>
        <p className="text-sm text-[#5a3a28]">
          Send us your latest photos and puppy milestones on WhatsApp or tag @teddypups.worldwide to be featured on our Wall of Love!
        </p>
        <div className="pt-2">
          <Link href="/contact" className="btn-primary text-sm py-2.5 px-6">
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
