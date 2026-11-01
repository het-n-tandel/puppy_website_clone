'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Puppies', href: '/puppies' },
  { name: 'Happy families', href: '/happy-families' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Visit & contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;

      setScrolled(y > 20);

      // Hide header on rapid scroll down; reveal when scrolling up or near top
      if (y > 110 && dy > 6) {
        setHidden(true);
      } else if (dy < -4 || y <= 20) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className="tp-header fixed top-0 inset-x-0 z-50 select-none"
      data-home={isHome ? 'true' : undefined}
      data-scrolled={scrolled ? 'true' : 'false'}
      data-hidden={hidden ? 'true' : 'false'}
    >
      {/* Header Bar */}
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 h-[var(--header-h,4.75rem)] flex items-center justify-between relative z-10">
        {/* Brand Logo & Name */}
        <Link href="/" className="tp-header__brand flex items-center gap-3 group">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#2a170e]/20 group-hover:scale-105 transition-transform">
            <Image
              src="/brand/logo.png"
              alt={currentSite.brandName}
              fill
              className="object-cover tp-header__logo"
              priority
            />
          </div>
          <span className="font-plush text-2xl sm:text-[1.75rem] font-black tracking-tight text-[#2a170e]">
            TeddyPups
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 tp-header__nav">
          <ul className="flex items-center gap-7 list-none">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`tp-nav-link text-[0.98rem] font-bold transition-colors py-1 relative inline-flex items-center ${
                      isActive ? 'text-[#a24a1a]' : 'text-[#2a170e] hover:text-[#8e3f15]'
                    }`}
                    data-active={isActive ? 'true' : undefined}
                  >
                    <span>{link.name}</span>
                    {/* Cute Paw icon under active/hovered link */}
                    <svg
                      viewBox="0 0 64 64"
                      className="tp-nav-link__paw absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 fill-[#c2622b] pointer-events-none transition-all duration-200"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.4)',
                      }}
                      aria-hidden="true"
                    >
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* WhatsApp Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hidden sm:inline-flex text-sm font-bold"
          >
            WhatsApp us
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#2a170e] hover:text-[#c2622b] transition-colors rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Scalloped "Round Round" Hem Edge */}
      <svg
        aria-hidden="true"
        className="tp-header__hem"
        width="100%"
        height="14"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
            <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-hem)" />
      </svg>

      {/* Mobile Menu Dialog matching original */}
      <dialog
        aria-label="Site menu"
        open={isOpen}
        className={`tp-menu fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40 ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex h-full w-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
          <div className="flex items-center justify-between">
            <span className="font-scrawl text-lg">where to, friend?</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk hover:bg-cocoa/80 transition-colors"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      data-active={isActive ? 'true' : 'false'}
                      aria-current={isActive ? 'page' : undefined}
                      className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)] hover:text-toffee-deep transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        {isActive && <span className="text-xl">🐾</span>}
                        <span>{link.name}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
            >
              WhatsApp us
            </a>
            <p className="text-center text-sm font-medium">+971 54 167 6733</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
