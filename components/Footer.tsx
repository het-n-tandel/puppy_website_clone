import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2a170e] text-[#fffdf8] pt-16 pb-12 border-t-4 border-[#f2be6b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#f2be6b]">
                <Image
                  src="/brand/logo.png"
                  alt={currentSite.brandName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f2be6b]">
                TeddyPups
              </span>
            </div>
            <p className="text-[#fffdf8]/80 text-sm leading-relaxed">
              Premium teacup and teddy bear puppies in Dubai and imported from world-class certified breeders with verified health certificates.
            </p>
            <p className="font-serif italic text-[#f2be6b] text-base">
              &quot;{currentSite.tagline}&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#f2be6b] mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/puppies" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  Available Puppies
                </Link>
              </li>
              <li>
                <Link href="/gone-home" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  Gone Home
                </Link>
              </li>
              <li>
                <Link href="/happy-families" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  Happy Families
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#fffdf8]/80 hover:text-[#f2be6b] transition-colors">
                  Questions & Answers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#f2be6b] mb-4">Say hello</h3>
            <ul className="space-y-3 text-sm text-[#fffdf8]/80">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#f2be6b] shrink-0" />
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2be6b] transition-colors font-medium"
                >
                  WhatsApp: {currentSite.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f2be6b] shrink-0" />
                <a
                  href={`mailto:${currentSite.contact.email}`}
                  className="hover:text-[#f2be6b] transition-colors break-all"
                >
                  {currentSite.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f2be6b] shrink-0 mt-0.5" />
                <span>{currentSite.locationFull}</span>
              </li>
            </ul>
          </div>

          {/* Social Media & Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#f2be6b] mb-4">Follow & Visit</h3>
            <p className="text-xs text-[#fffdf8]/70 mb-4">
              {currentSite.contact.hours}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={currentSite.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#fffdf8]/30 px-3.5 py-1.5 text-xs font-semibold text-[#fffdf8] hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                Instagram
              </a>
              <a
                href={currentSite.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#fffdf8]/30 px-3.5 py-1.5 text-xs font-semibold text-[#fffdf8] hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                TikTok
              </a>
              <a
                href={currentSite.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#fffdf8]/30 px-3.5 py-1.5 text-xs font-semibold text-[#fffdf8] hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#fffdf8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fffdf8]/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {currentSite.brandName}. All rights reserved.</span>
          </div>
          <span className="font-serif italic text-sm text-[#f2be6b]/90">
            {currentSite.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
