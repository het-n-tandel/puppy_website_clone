import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_PUPPIES, getPuppyBySlug } from '@/data/puppiesData';
import PuppyDetailView from '@/components/PuppyDetailView';
import { currentSite } from '@/lib/siteConfig';

export async function generateStaticParams() {
  return ALL_PUPPIES.map((puppy) => ({
    slug: puppy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const puppy = getPuppyBySlug(resolved.slug);

  if (!puppy) {
    return {
      title: `Puppy Not Found | ${currentSite.brandName}`,
    };
  }

  return {
    title: `${puppy.name}, ${puppy.breed} puppy | ${currentSite.brandName}`,
    description: puppy.description,
    openGraph: {
      title: `${puppy.name}, ${puppy.breed} puppy`,
      description: puppy.description,
      images: puppy.images.length > 0 ? [puppy.images[0]] : undefined,
    },
  };
}

export default async function PuppyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const puppy = getPuppyBySlug(resolved.slug);

  if (!puppy) {
    notFound();
  }

  // Related puppies (excluding current)
  const relatedPuppies = ALL_PUPPIES.filter(
    (p) => p.slug !== puppy.slug && (p.breed === puppy.breed || p.status === 'Available')
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <PuppyDetailView puppy={puppy} relatedPuppies={relatedPuppies} />
    </div>
  );
}
