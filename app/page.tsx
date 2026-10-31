import React from 'react';
import Link from 'next/link';
import PuppyCard from '@/components/PuppyCard';
import HeroStage from '@/components/HeroStage';
import { getFeaturedPuppies } from '@/data/puppiesData';
import { FAQS, HAPPY_FAMILIES_REVIEWS, ADOPTION_STEPS, GUARANTEES } from '@/data/contentData';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredPuppies = getFeaturedPuppies(8);

  const breeds = [
    { name: 'Maltipoo', tag: 'maltipoo' },
    { name: 'Teacup Poodle', tag: 'poodle' },
    { name: 'Pomeranian', tag: 'pomeranian' },
    { name: 'Pomsky', tag: 'pomsky' },
    { name: 'Bichon Frise', tag: 'bichon' },
    { name: 'Maltese', tag: 'maltese' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION MATCHING SCREENSHOT 1:1 */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 bg-[#fffdf8] flex flex-col justify-between">
        {/* Top Centered Copy */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 z-10">
          {/* Eyebrow with Hand-drawn Wavy Underline */}
          <div className="inline-block relative">
            <span className="font-serif italic text-2xl sm:text-3xl font-bold text-[#c2622b]">
              every puppy is family
            </span>
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2.5 left-0 h-3.5 w-full text-[#c2622b]"
              aria-hidden="true"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black text-[#2a170e] leading-[1.06] tracking-tight">
            Premium teacup
            <br />
            puppies in Dubai
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-xl mx-auto leading-relaxed font-medium">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/puppies"
              className="btn-primary text-base font-bold py-3.5 px-8 shadow-md"
            >
              View available puppies
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base font-bold py-3.5 px-8 bg-[#fffdf8] shadow-md border-2 border-[#2a170e]"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Stage: Peeking Puppies Lineup, Cartoon Mascot & Scalloped Blanket */}
        <HeroStage />
      </section>

      {/* 2. CURATED BREEDS FILTER CHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Curated Pedigrees
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e]">
            Explore by Breed
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto">
            Choose from our rare imported and showroom-ready teacup puppies.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {breeds.map((b) => (
            <Link
              key={b.name}
              href={`/puppies?breed=${b.tag}`}
              className="inline-flex items-center gap-2 bg-[#fbe3b4]/60 hover:bg-[#f2be6b] text-[#2a170e] font-semibold text-sm sm:text-base py-2.5 px-6 rounded-full border border-[#2a170e]/15 transition-all duration-200 hover:scale-105"
            >
              <span>🐾</span>
              <span>{b.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PUPPIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
              Available Now in Dubai
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e] mt-1">
              Meet Our Sweet Angels
            </h2>
          </div>
          <Link
            href="/puppies"
            className="btn-ghost text-sm py-2 px-5 self-start sm:self-auto bg-[#fffdf8]"
          >
            <span>View All Puppies ({featuredPuppies.length}+)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.id} puppy={puppy} priority={idx < 4} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/puppies" className="btn-primary text-base py-3.5 px-8">
            <span>Browse Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE TEDDYPUPS (GUARANTEES) */}
      <section className="bg-[#2a170e] text-[#fffdf8] py-20 border-y-4 border-[#f2be6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
              Ethical & Certified Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#fffdf8]">
              Every Teddy Pup Comes With Peace of Mind
            </h2>
            <p className="text-sm sm:text-base text-[#fffdf8]/75 max-w-xl mx-auto">
              We uphold the highest veterinary standards to ensure your new puppy arrives happy, healthy, and protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUARANTEES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fffdf8]/5 rounded-3xl p-6 border border-[#fffdf8]/10 hover:border-[#f2be6b] transition-colors flex flex-col space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#f2be6b]/20 text-[#f2be6b] flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-[#f2be6b]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#fffdf8]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS / 4-STEP ADOPTION PATH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e]">
            The Journey Home
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto">
            From first video cuddle to doorstep delivery, here is how you welcome your puppy home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ADOPTION_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative bg-[#fffdf8] rounded-3xl p-6 border-2 border-[#2a170e]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-extrabold text-[#c2622b]">
                  {step.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2a170e] mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5a3a28] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn-ghost text-sm py-2.5 px-6 bg-[#fffdf8]">
            <span>Read Complete Adoption Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. HAPPY FAMILIES TESTIMONIALS */}
      <section className="bg-[#fbe3b4]/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
              Our Wall of Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e]">
              Happy Families Across the UAE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HAPPY_FAMILIES_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#fffdf8] rounded-3xl p-6 border-2 border-[#2a170e]/15 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-xs italic text-[#5a3a28] leading-relaxed">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#2a170e]/10">
                  <p className="font-serif font-bold text-sm text-[#2a170e]">{rev.author}</p>
                  <p className="text-xs text-[#a24a1a]">{rev.puppyName} ({rev.breed}) · {rev.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/happy-families" className="btn-ghost text-sm py-2.5 px-6 bg-[#fffdf8]">
              <span>View More Happy Families</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#5a3a28]">
            Everything you need to know about adopting a puppy in Dubai.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 5).map((faq, idx) => (
            <details
              key={idx}
              className="group bg-[#fffdf8] rounded-2xl border-2 border-[#2a170e]/15 p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer font-serif text-base sm:text-lg font-bold text-[#2a170e]">
                <span>{faq.question}</span>
                <span className="ml-4 shrink-0 transition-transform group-open:rotate-180 text-[#a24a1a]">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#5a3a28] leading-relaxed border-t border-[#2a170e]/10 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/faq" className="btn-ghost text-sm py-2.5 px-6 bg-[#fffdf8]">
            <span>Read All Questions & Answers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. INSTAGRAM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fbe3b4] rounded-[40px] p-8 sm:p-12 border-3 border-[#2a170e] text-center space-y-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Join Our Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170e]">
            Follow Daily Puppy Shenanigans on Instagram
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto">
            Get daily doses of adorable teacup puppies, live showroom stories, and adoption announcements.
          </p>
          <div className="pt-2">
            <a
              href={currentSite.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base py-3 px-8"
            >
              <span>Follow @teddypups.worldwide</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
