'use client';

import React, { useState, useMemo } from 'react';
import { Puppy } from '@/types/puppy';
import PuppyCard from '@/components/PuppyCard';
import { Search, RotateCcw } from 'lucide-react';

interface PuppiesCatalogProps {
  initialPuppies: Puppy[];
  initialBreed?: string;
}

export default function PuppiesCatalog({ initialPuppies, initialBreed }: PuppiesCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string>(initialBreed || 'ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Compute unique breeds dynamically
  const breedOptions = useMemo(() => {
    const set = new Set<string>();
    initialPuppies.forEach((p) => {
      // Normalize breed categories
      if (p.breed.toLowerCase().includes('maltipoo')) set.add('Maltipoo');
      else if (p.breed.toLowerCase().includes('poodle')) set.add('Poodle');
      else if (p.breed.toLowerCase().includes('pomeranian')) set.add('Pomeranian');
      else if (p.breed.toLowerCase().includes('pomsky')) set.add('Pomsky');
      else if (p.breed.toLowerCase().includes('bichon')) set.add('Bichon');
      else if (p.breed.toLowerCase().includes('maltese')) set.add('Maltese');
      else if (p.breed.toLowerCase().includes('shitzu') || p.breed.toLowerCase().includes('shih tzu')) set.add('Shih Tzu');
      else set.add(p.breed);
    });
    return Array.from(set).sort();
  }, [initialPuppies]);

  // Filter logic
  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter((p) => {
      // Search
      const searchLower = search.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        p.name.toLowerCase().includes(searchLower) ||
        p.breed.toLowerCase().includes(searchLower) ||
        p.slug.toLowerCase().includes(searchLower);

      // Breed filter
      const matchesBreed =
        selectedBreed === 'ALL' ||
        p.breed.toLowerCase().includes(selectedBreed.toLowerCase());

      // Gender filter
      const matchesGender =
        selectedGender === 'ALL' ||
        (selectedGender === 'Boy' && p.gender.includes('Boy')) ||
        (selectedGender === 'Girl' && p.gender.includes('Girl'));

      // Status filter
      const matchesStatus =
        selectedStatus === 'ALL' ||
        p.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesBreed && matchesGender && matchesStatus;
    });
  }, [initialPuppies, search, selectedBreed, selectedGender, selectedStatus]);

  const handleReset = () => {
    setSearch('');
    setSelectedBreed('ALL');
    setSelectedGender('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-[#fffdf8] rounded-3xl border-2 border-[#2a170e]/15 p-5 sm:p-6 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#5a3a28]/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by puppy name or breed (e.g. Max, Maltipoo, Poodle)..."
            className="w-full bg-[#fbe3b4]/30 rounded-full pl-12 pr-4 py-3 text-sm text-[#2a170e] placeholder-[#5a3a28]/60 border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a] focus:ring-1 focus:ring-[#a24a1a]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#a24a1a]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {/* Breed Chips */}
          <button
            onClick={() => setSelectedBreed('ALL')}
            className={`text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border transition-all ${
              selectedBreed === 'ALL'
                ? 'bg-[#2a170e] text-[#f2be6b] border-[#2a170e]'
                : 'bg-[#fffdf8] text-[#2a170e] border-[#2a170e]/20 hover:border-[#2a170e]'
            }`}
          >
            All Breeds
          </button>
          {breedOptions.map((breed) => (
            <button
              key={breed}
              onClick={() => setSelectedBreed(breed)}
              className={`text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border transition-all ${
                selectedBreed === breed
                  ? 'bg-[#2a170e] text-[#f2be6b] border-[#2a170e]'
                  : 'bg-[#fffdf8] text-[#2a170e] border-[#2a170e]/20 hover:border-[#2a170e]'
              }`}
            >
              {breed}
            </button>
          ))}
        </div>

        {/* Gender & Availability secondary row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#2a170e]/10 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#5a3a28]">Gender:</span>
            {['ALL', 'Boy', 'Girl'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`font-medium px-3 py-1 rounded-full ${
                  selectedGender === g
                    ? 'bg-[#c2622b] text-white'
                    : 'text-[#2a170e]/75 hover:text-[#2a170e]'
                }`}
              >
                {g === 'ALL' ? 'Any' : g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#5a3a28]">Status:</span>
            {['ALL', 'Available', 'Reserved'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`font-medium px-3 py-1 rounded-full ${
                  selectedStatus === s
                    ? 'bg-[#c2622b] text-white'
                    : 'text-[#2a170e]/75 hover:text-[#2a170e]'
                }`}
              >
                {s === 'ALL' ? 'All Status' : s}
              </button>
            ))}
          </div>

          {(search || selectedBreed !== 'ALL' || selectedGender !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a24a1a] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-[#5a3a28]">
        <p>
          Showing <span className="font-bold text-[#2a170e]">{filteredPuppies.length}</span> puppies
        </p>
      </div>

      {/* Puppy Grid */}
      {filteredPuppies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.id} puppy={puppy} priority={idx < 8} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#fffdf8] rounded-3xl border-2 border-dashed border-[#2a170e]/20 p-12 text-center space-y-4">
          <span className="text-4xl">🐾</span>
          <h3 className="font-serif text-2xl font-bold text-[#2a170e]">No puppies matched your filter</h3>
          <p className="text-sm text-[#5a3a28] max-w-md mx-auto">
            We regularly welcome new litters of Maltipoos, Poodles, and Pomeranians. Try clearing your filters or message us on WhatsApp for custom requests.
          </p>
          <div>
            <button onClick={handleReset} className="btn-primary text-sm py-2 px-6">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
