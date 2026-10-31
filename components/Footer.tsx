'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PupBuddy from './PupBuddy';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="tp-footer relative bg-[#1c0f08] text-[#fffdf8] pt-20 pb-16 overflow-hidden border-t-4 border-[#2a170e]">
      {/* Night Sky with Crescent Moon & Stars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden opacity-80"
      >
        <span className="absolute top-10 right-16 sm:right-32 w-12 h-12 rounded-full border-r-4 border-t-4 border-[#fbe3b4] rotate-12 shadow-[0_0_25px_#fbe3b4]" />
        <span className="absolute top-8 left-16 text-yellow-100 text-sm animate-pulse">✦</span>
        <span className="absolute top-24 left-1/3 text-yellow-200 text-xs animate-pulse delay-500">★</span>
        <span className="absolute top-16 right-1/4 text-yellow-200 text-xs animate-pulse delay-300">✦</span>
      </div>

      <div className="gutter relative mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
        {/* LEFT COLUMN: "Home, at last." & Cozy Wicker Basket */}
        <div className="md:col-span-6 space-y-8">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl font-black text-[#fbe3b4] tracking-tight">
              Home, at last.
            </h2>
            <p className="mt-4 max-w-md text-sm sm:text-base text-[#fffdf8]/80 leading-relaxed">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium concierge services and worldwide shipping.
            </p>
          </div>

          {/* Handcrafted Cozy Woven Wicker Basket Scene */}
          <div className="tp-basket relative max-w-sm mt-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 300 240"
              className="tp-basket__back w-full h-auto"
            >
              <ellipse cx="212" cy="145" rx="96" ry="12" fill="#3a1e12" />
              <path
                d="M116 145 A96 12 0 0 1 308 145"
                stroke="#6b3a24"
                strokeWidth="6"
                fill="none"
              />
            </svg>

            {/* Sleeping Puppy Mascot curled up inside basket */}
            <div
              data-pup-stop="true"
              data-pose="snug"
              data-facing="right"
              data-act="basket"
              className="pup-stop tp-basket__pup -mt-36 ml-12 sm:ml-16 w-36 sm:w-44"
            >
              <PupBuddy pose="snug" facing="right" label="Teddy sleeping peacefully in basket" />
            </div>

            {/* Front Wicker Weave & Blanket Rim */}
            <div className="relative -mt-10 bg-gradient-to-b from-[#8a4e2e] to-[#5a311b] h-16 rounded-b-[40px] border-3 border-[#2a170e] shadow-lg flex items-center justify-center">
              <span className="font-serif italic text-xs font-bold text-[#fbe3b4]/90 tracking-widest uppercase">
                *fast asleep &amp; dreaming*
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Explore Navigation Links */}
        <nav
          aria-label="Footer"
          className="md:col-span-3 space-y-4"
        >
          <h3 className="font-serif text-lg font-bold text-[#f2be6b]">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-[#fffdf8]/85 font-medium">
            <li>
              <Link href="/puppies" className="hover:text-[#f2be6b] transition-colors">
                Available puppies
              </Link>
            </li>
            <li>
              <Link href="/gone-home" className="hover:text-[#f2be6b] transition-colors">
                Gone home
              </Link>
            </li>
            <li>
              <Link href="/happy-families" className="hover:text-[#f2be6b] transition-colors">
                Happy families
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-[#f2be6b] transition-colors">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/how-it-works#delivery" className="hover:text-[#f2be6b] transition-colors">
                Delivery &amp; collection
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#f2be6b] transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#f2be6b] transition-colors">
                Visit &amp; contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT COLUMN: Say Hello & Social Media */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#f2be6b]">
              Say hello
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#fffdf8]/85">
              <li>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#f2be6b] hover:underline"
                >
                  WhatsApp {currentSite.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${currentSite.contact.email}`}
                  className="hover:text-[#f2be6b] transition-colors break-all"
                >
                  {currentSite.contact.email}
                </a>
              </li>
              <li className="text-[#fffdf8]/70">
                {currentSite.locationFull}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-[#f2be6b] mb-3">
              Follow Our Pups
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={currentSite.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-white/30 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                Instagram
              </a>
              <a
                href={currentSite.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-white/30 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                TikTok
              </a>
              <a
                href={currentSite.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-white/30 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Slogan Bar */}
      <div className="gutter relative mx-auto mt-16 max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#fffdf8]/60">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/logo.png"
            alt="TeddyPups Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span>&copy; {new Date().getFullYear()} {currentSite.brandName}. All rights reserved.</span>
        </div>
        <div className="font-serif italic text-base text-[#f2be6b]">
          every puppy is family
        </div>
      </div>
    </footer>
  );
}
