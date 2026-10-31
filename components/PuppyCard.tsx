import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/types/puppy';

interface PuppyCardProps {
  puppy: Puppy;
  priority?: boolean;
}

export default function PuppyCard({ puppy, priority = false }: PuppyCardProps) {
  const washColor = puppy.colorWash || '#f2be6b';
  const isAvailable = puppy.status === 'Available';

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group relative flex flex-col items-center text-center sketch-card p-3 rounded-3xl transition-all duration-300 hover:-translate-y-2"
      aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age}, ${puppy.status}`}
    >
      {/* Background organic shape */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mb-3">
        {/* Soft pastel backdrop blob */}
        <div
          className="absolute inset-1 rounded-[38px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
          style={{ backgroundColor: washColor, opacity: 0.85 }}
        />

        {/* Organic image container */}
        <div className="absolute inset-2 rounded-[32px] overflow-hidden border-2 border-[#2a170e]/80 shadow-md bg-white">
          <Image
            src={puppy.images[0] || '/brand/logo.png'}
            alt={`${puppy.name} - ${puppy.breed}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500"
            priority={priority}
          />
        </div>

        {/* Status Sticker Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`badge-sticker ${
              isAvailable
                ? 'bg-[#fffdf8] text-[#2a170e] border border-[#2a170e]/40'
                : 'bg-[#2a170e] text-[#fffdf8]'
            }`}
          >
            {puppy.status}
          </span>
        </div>

        {/* Video pill indicator */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 bg-[#2a170e]/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            <span>▶</span>
            <span>video</span>
          </span>
        </div>
      </div>

      {/* Caption & Metadata */}
      <div className="flex flex-col items-center mt-1">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2a170e] group-hover:text-[#a24a1a] transition-colors">
          {puppy.name}
        </h3>
        <p className="text-sm text-[#2a170e]/75 font-medium mt-0.5">
          {puppy.breed} · {puppy.gender.toLowerCase()} · {puppy.age}
        </p>
      </div>
    </Link>
  );
}
