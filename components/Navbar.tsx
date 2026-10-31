'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { Menu, X, MessageCircle } from 'lucide-react';

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#2a170e] text-[#f2be6b] py-2 px-4 text-center text-xs sm:text-sm tracking-wider font-medium flex items-center justify-center gap-2">
        <span>🐾</span>
        <span>{currentSite.tagline}</span>
        <span>🐾</span>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#fffdf8]/95 backdrop-blur-md shadow-sm border-b border-[#2a170e]/10 py-3' : 'bg-[#fffdf8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#f2be6b] shadow-sm">
              <Image
                src="/brand/logo.png"
                alt={currentSite.brandName}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2a170e]">
                TeddyPups
              </span>
              <span className="text-[10px] sm:text-xs text-[#a24a1a] font-medium tracking-widest uppercase -mt-1">
                {currentSite.locationCity}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group/link flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-[#a24a1a]' : 'text-[#2a170e]/80 hover:text-[#a24a1a]'
                  }`}
                >
                  <span
                    className={`text-[11px] transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 scale-100 text-[#a24a1a]'
                        : 'opacity-0 scale-50 group-hover/link:opacity-60 group-hover/link:scale-100 text-[#c2622b]'
                    }`}
                  >
                    🐾
                  </span>
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#a24a1a] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden sm:inline-flex text-sm py-2 px-4 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>WhatsApp us</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#2a170e] hover:text-[#a24a1a] transition-colors rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#fffdf8] border-b border-[#2a170e]/10 shadow-xl px-6 py-6 transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#a24a1a]">where to, friend?</span>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 text-lg font-semibold py-1 transition-colors ${
                      isActive ? 'text-[#a24a1a]' : 'text-[#2a170e] hover:text-[#a24a1a]'
                    }`}
                  >
                    {isActive && <span>🐾</span>}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#2a170e]/10 flex flex-col gap-3">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-sm py-2.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>WhatsApp {currentSite.contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
