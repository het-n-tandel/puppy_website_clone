'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';

export default function TwoWaysSection() {
  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-paths relative py-20 overflow-hidden bg-gradient-to-b from-[#fbe3b4] to-[#f7d18d] border-b-2 border-[#2a170e]/10"
      style={{
        ['--sky-top' as any]: '#fbe3b4',
        ['--sky-bottom' as any]: '#f7d18d',
      }}
      aria-labelledby="paths-title"
    >
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2
          id="paths-title"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-center text-[#2a170e] mb-12 tracking-tight"
        >
          Two ways to meet your puppy
        </h2>

        {/* The Fork Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-6xl mx-auto">
          {/* Central Wooden Signpost */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-[#8c512d] rounded-full shadow-inner z-0"
          >
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#a24a1a] border-2 border-[#2a170e] shadow-md flex items-center justify-center text-white text-xs font-bold">
              ✦
            </div>
          </div>

          {/* LEFT PATH: Puppies in Dubai (Showroom) */}
          <article
            className="relative bg-[#fffdf8] rounded-[36px] p-6 sm:p-8 border-3 border-[#2a170e] shadow-[6px_6px_0px_0px_#2a170e] flex flex-col justify-between z-10 transition-transform duration-300 hover:-translate-y-1"
            aria-labelledby="way-local"
          >
            {/* Wooden Direction Sign */}
            <div className="inline-block self-start bg-[#a24a1a] text-[#fffdf8] font-serif font-black text-xl sm:text-2xl px-6 py-2.5 rounded-2xl shadow-md border-2 border-[#2a170e] -rotate-1 mb-4">
              <span id="way-local">Puppies in Dubai</span>
            </div>

            {/* Illustration / Window Scene */}
            <div className="relative my-4 aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#2a170e] bg-[#f9e9cb]">
              <Image
                src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 1024px) 28rem, 90vw"
              />
              <div className="absolute bottom-3 left-3 bg-[#2a170e]/85 backdrop-blur-sm text-[#fffdf8] text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                Downtown Dubai Showroom
              </div>
            </div>

            {/* Copy & Action */}
            <div className="space-y-3 mt-2">
              <h3 className="font-serif text-2xl font-bold text-[#2a170e]">
                In our showroom
              </h3>
              <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
                See them, love them, take them home. Come meet our locally available puppies before you decide.
              </p>
              <div className="pt-2">
                <Link
                  href="/puppies?availability=available"
                  className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base font-bold py-3 px-6 shadow-md"
                >
                  <span>Meet local puppies</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </article>

          {/* RIGHT PATH: Imported for you (Overseas Order) */}
          <article
            className="relative bg-[#fffdf8] rounded-[36px] p-6 sm:p-8 border-3 border-[#2a170e] shadow-[6px_6px_0px_0px_#2a170e] flex flex-col justify-between z-10 transition-transform duration-300 hover:-translate-y-1"
            aria-labelledby="way-imported"
          >
            {/* Wooden Direction Sign */}
            <div className="inline-block self-start bg-[#2f6e9e] text-[#fffdf8] font-serif font-black text-xl sm:text-2xl px-6 py-2.5 rounded-2xl shadow-md border-2 border-[#2a170e] rotate-1 mb-4">
              <span id="way-imported">Imported for you</span>
            </div>

            {/* Illustration / Window Scene with Airplane & Puppy */}
            <div className="relative my-4 aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#2a170e] bg-[#bfddf5]/40">
              <Image
                src="https://puppy.instabizweb.com/media/aI6Bw0i86FhM/7b3ae0c1c4/b942a5_01a35791a329431eb3e8529e5fa4bce9-mv2.webp"
                alt="A rare Korean teacup puppy ready for private international flight"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 1024px) 28rem, 90vw"
              />
              <div className="absolute top-3 right-3 bg-[#fffdf8]/90 backdrop-blur-sm text-[#2a170e] text-xs font-bold px-3 py-1.5 rounded-full border border-[#2a170e]/20 flex items-center gap-1.5">
                <span className="animate-pulse">✈️</span> Korea to UAE
              </div>
            </div>

            {/* Copy & Action */}
            <div className="space-y-3 mt-2">
              <h3 className="font-serif text-2xl font-bold text-[#2a170e]">
                Order Upon Request
              </h3>
              <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
                Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
              </p>
              <div className="pt-2">
                <Link
                  href="/puppies?availability=order-only"
                  className="btn-ghost inline-flex items-center gap-2 text-sm sm:text-base font-bold py-3 px-6 bg-[#fffdf8] border-2 border-[#2a170e] shadow-md"
                >
                  <span>See imported puppies</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Mascot Stop at Fork */}
        <div
          data-pup-stop="true"
          data-pose="sit"
          data-facing="right"
          className="pup-stop tp-fork__teddy mt-10 flex justify-center"
        >
          <div className="w-28 sm:w-36">
            <PupBuddy pose="sit" facing="right" label="Teddy sitting at the fork" />
          </div>
        </div>
      </div>
    </section>
  );
}
