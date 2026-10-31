import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PuppyCard from '@/components/PuppyCard';
import { getFeaturedPuppies } from '@/data/puppiesData';
import { FAQS, HAPPY_FAMILIES_REVIEWS, ADOPTION_STEPS, GUARANTEES } from '@/data/contentData';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, ShieldCheck, Heart, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#fffdf8] to-[#fbe3b4]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#fbe3b4] text-[#a24a1a] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Dubai&apos;s Boutique Destination for Teacup Puppies</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2a170e] leading-[1.15] tracking-tight">
                Where every puppy is loved like{' '}
                <span className="text-[#c2622b] underline decoration-[#f2be6b] decoration-wavy underline-offset-8">
                  family
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover ethically bred teacup Maltipoos, Poodles, and Pomeranians in Dubai. Hand-raised with love, verified health certificates, and complete international pedigree guarantees.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/puppies" className="btn-primary w-full sm:w-auto text-base py-3.5 px-8">
                  <span>Find Your Puppy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full sm:w-auto text-base py-3.5 px-8"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-[#2a170e]/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170e]">100%</p>
                  <p className="text-xs sm:text-sm text-[#5a3a28]">Vet certified health</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170e]">24/7</p>
                  <p className="text-xs sm:text-sm text-[#5a3a28]">Care & guidance</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170e]">VIP</p>
                  <p className="text-xs sm:text-sm text-[#5a3a28]">UAE & global delivery</p>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/5] rounded-[48px] overflow-hidden border-4 border-[#2a170e] shadow-2xl bg-[#fbe3b4]">
                <Image
                  src={featuredPuppies[0]?.images[0] || '/brand/logo.png'}
                  alt="Featured TeddyPups puppy"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Floating sticker 1 */}
                <div className="absolute top-6 left-6 bg-[#fffdf8] text-[#2a170e] text-xs sm:text-sm font-bold py-1.5 px-4 rounded-full shadow-lg border border-[#2a170e]/20 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Meet Max the Maltipoo</span>
                </div>
                {/* Floating sticker 2 */}
                <div className="absolute bottom-6 right-6 bg-[#2a170e] text-[#f2be6b] text-xs sm:text-sm font-semibold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#f2be6b]" />
                  <span>Health Passport Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR BREEDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Curated Pedigrees
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a170e]">
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a170e] mt-1">
              Meet Our Sweet Angels
            </h2>
          </div>
          <Link
            href="/puppies"
            className="btn-ghost text-sm py-2 px-5 self-start sm:self-auto"
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

      {/* 4. WHY CHOOSE TEDDYPUPS */}
      <section className="bg-[#2a170e] text-[#fffdf8] py-20 border-y-4 border-[#f2be6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
              Ethical & Certified Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fffdf8]">
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

      {/* 5. HOW IT WORKS / 4-STEP ADOPTION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a170e]">
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
          <Link href="/how-it-works" className="btn-ghost text-sm py-2.5 px-6">
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a170e]">
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
            <Link href="/happy-families" className="btn-ghost text-sm py-2.5 px-6">
              <span>View More Happy Families</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a170e]">
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
          <Link href="/faq" className="btn-ghost text-sm py-2.5 px-6">
            <span>Read All Questions & Answers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. INSTAGRAM COMMUNITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fbe3b4] rounded-[40px] p-8 sm:p-12 border-3 border-[#2a170e] text-center space-y-5">
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
