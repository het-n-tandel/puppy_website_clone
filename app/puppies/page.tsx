import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import '../subpages.css';
import { ALL_PUPPIES } from '@/data/puppiesData';
import PuppiesCatalog from '@/components/PuppiesCatalog';
import PupBuddy from '@/components/PupBuddy';
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
    <div data-page="pups" className="tp-page">
      <section aria-labelledby="pups-title" className="tp-sketchbook min-h-screen">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Sketchbook Header */}
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy&#x27;s sketchbook
              </p>
              <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
                Available puppies
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="tp-sketchbook__underline"
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Self Portrait Mascot */}
            <div className="tp-sketchbook__self" data-reveal="true">
              <div className="pup-buddy" data-facing="left">
                <PupBuddy facing="left" />
              </div>
              <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
            </div>
          </div>

          {/* Sieve Filter and Sketches */}
          <div className="mt-12">
            <Suspense fallback={<div className="text-center py-12">Loading puppies...</div>}>
              <PuppiesCatalog initialPuppies={ALL_PUPPIES} initialBreed={initialBreed} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
