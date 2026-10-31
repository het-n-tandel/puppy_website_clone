'use client';

import React, { useState, useEffect } from 'react';
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fffdf8]/95 backdrop-blur-md shadow-sm border-b border-[#2a170e]/10 py-3'
          : 'bg-[#fffdf8] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#2a170e]/20 group-hover:scale-105 transition-transform">
            <Image
              src="/brand/logo.png"
              alt={currentSite.brandName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-serif text-2xl sm:text-[1.75rem] font-black tracking-tight text-[#2a170e]">
            TeddyPups
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex flex-col items-center text-[0.95rem] font-bold transition-colors py-1 ${
                  isActive ? 'text-[#c2622b]' : 'text-[#2a170e] hover:text-[#c2622b]'
                }`}
              >
                <span>{link.name}</span>
                {/* Active or hover paw indicator underneath link */}
                <span
                  className={`text-[12px] leading-none transition-all duration-200 ${
                    isActive
                      ? 'opacity-100 translate-y-0.5 text-[#c2622b]'
                      : 'opacity-0 -translate-y-1 hover:opacity-70'
                  }`}
                >
                  🐾
                </span>
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden sm:inline-flex text-sm font-bold py-2.5 px-6 shadow-sm"
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#fffdf8] border-b-2 border-[#2a170e]/15 shadow-xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#a24a1a]">where to, friend?</span>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-bold py-1 transition-colors ${
                    isActive ? 'text-[#c2622b]' : 'text-[#2a170e] hover:text-[#c2622b]'
                  }`}
                >
                  {isActive && <span>🐾</span>}
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#2a170e]/10">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-sm py-3"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
