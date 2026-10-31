import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ALL_PUPPIES } from '@/data/puppiesData';
import PuppiesCatalog from '@/components/PuppiesCatalog';
import { currentSite } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `Available puppies | ${currentSite.brandName}`,
  description:
    'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
};

export default async function PuppiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ breed?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialBreed = resolvedParams?.breed || '';

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          Available Now in Dubai & Imported
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          Available Puppies
        </h1>
        <p className="text-sm sm:text-base text-[#5a3a28] max-w-2xl leading-relaxed">
          Every puppy listed below is either resting in our Downtown Dubai showroom or ready for direct white-glove import. Real photos, verified health passports, and lifetime pedigree support.
        </p>
      </div>

      {/* Catalog with Filters */}
      <Suspense fallback={<div className="text-center py-12">Loading puppies...</div>}>
        <PuppiesCatalog initialPuppies={ALL_PUPPIES} initialBreed={initialBreed} />
      </Suspense>
    </div>
  );
}
