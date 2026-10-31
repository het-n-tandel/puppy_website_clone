'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Puppy } from '@/types/puppy';
import { currentSite } from '@/lib/siteConfig';
import { getWhatsAppInquiryUrl } from '@/lib/whatsapp';
import { InquiryService } from '@/lib/inquiryService';
import {
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
} from 'lucide-react';

interface PuppyDetailViewProps {
  puppy: Puppy;
  relatedPuppies: Puppy[];
}

export default function PuppyDetailView({ puppy, relatedPuppies }: PuppyDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const images = puppy.images.length > 0 ? puppy.images : ['/brand/logo.png'];
  const whatsappUrl = getWhatsAppInquiryUrl(puppy.name, puppy.breed);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');

    const res = await InquiryService.submitInquiry({
      puppyId: puppy.id,
      puppyName: puppy.name,
      fullName,
      phone,
      email,
      notes,
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setFormError(res.error || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="space-y-16 py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#5a3a28]">
        <Link href="/puppies" className="hover:text-[#a24a1a] transition-colors">
          Available puppies
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#2a170e]">{puppy.name}</span>
      </nav>

      {/* SECTION 1: MAIN HERO DOSSIER */}
      <section className="bg-[#fffdf8] rounded-[40px] border-2 border-[#2a170e]/15 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-[36px] overflow-hidden border-3 border-[#2a170e] shadow-lg bg-[#fbe3b4]">
              <Image
                src={images[activeImageIndex]}
                alt={`${puppy.name} photo ${activeImageIndex + 1}`}
                fill
                priority
                className="object-cover"
              />

              {/* Status Sticker */}
              <div className="absolute top-4 left-4 z-10">
                <span className="badge-sticker bg-[#fffdf8] text-[#2a170e] border border-[#2a170e]">
                  {puppy.status}
                </span>
              </div>

              {/* Navigation Arrows (if multiple images) */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                  <button
                    onClick={handlePrevImage}
                    className="pointer-events-auto p-2 rounded-full bg-[#2a170e]/80 text-[#fffdf8] hover:bg-[#2a170e] transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="pointer-events-auto p-2 rounded-full bg-[#2a170e]/80 text-[#fffdf8] hover:bg-[#2a170e] transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Index counter pill */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-[#2a170e]/80 text-[#fffdf8] text-xs font-semibold px-3 py-1 rounded-full">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#a24a1a] scale-105 shadow-md'
                        : 'border-[#2a170e]/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
                hello, it&apos;s me
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e] mt-1">
                {puppy.name}
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#c2622b] mt-1">
                {puppy.breed}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
              {puppy.description}
            </p>

            {/* Key-Value Specs Table */}
            <div className="bg-[#fbe3b4]/30 rounded-3xl p-5 border border-[#2a170e]/15 divide-y divide-[#2a170e]/10 text-sm">
              <div className="flex justify-between py-2.5">
                <span className="font-semibold text-[#5a3a28]">Breed</span>
                <span className="font-bold text-[#2a170e]">{puppy.breed}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="font-semibold text-[#5a3a28]">Boy or girl</span>
                <span className="font-bold text-[#2a170e]">{puppy.gender}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="font-semibold text-[#5a3a28]">Age</span>
                <span className="font-bold text-[#2a170e]">{puppy.age}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="font-semibold text-[#5a3a28]">Where</span>
                <span className="font-bold text-[#2a170e]">{puppy.location}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="font-semibold text-[#5a3a28]">Health Records</span>
                <span className="font-bold text-emerald-700">100% Certified</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-base py-3.5 shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Ask about {puppy.name} on WhatsApp</span>
              </a>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="btn-primary w-full justify-center text-base py-3.5 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send an enquiry</span>
              </button>
            </div>

            <p className="text-xs text-center text-[#5a3a28]/70">
              ⚡ Available for immediate viewing in Downtown Dubai or direct VIP delivery.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT COMES WITH THE PUPPY */}
      <section className="bg-[#2a170e] text-[#fffdf8] rounded-[40px] p-8 sm:p-12 border-3 border-[#f2be6b]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2be6b]">
              what comes with {puppy.name}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#fffdf8]">
              Every Teddy Pup Comes Protected
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              'Vaccinated with all core essential shots',
              'Dewormed on a strict veterinary schedule',
              'Verified health certificate from licensed vets',
              'Thoroughly checked before joining your family',
              'Implanted ISO standard global microchip',
              'Official international travel passport',
            ].map((perk, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#fffdf8]/5 rounded-2xl p-4 border border-[#fffdf8]/10">
                <CheckCircle className="w-5 h-5 text-[#f2be6b] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[#fffdf8]/90">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE WAY HOME (4 STEPS) */}
      <section className="bg-[#fffdf8] rounded-[40px] border-2 border-[#2a170e]/15 p-8 sm:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
              the way home
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2a170e]">
              Coming Home to You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Reserve your puppy', desc: 'Secure with an initial refundable deposit.' },
              { num: '2', title: 'Personalized consultation', desc: 'Receive video check-ins and veterinary charts.' },
              { num: '3', title: 'Import & arrival', desc: 'Full flight nanny and government customs handling.' },
              { num: '4', title: 'Welcome home', desc: 'Doorstep white-glove handover with starter pack.' },
            ].map((st) => (
              <div key={st.num} className="bg-[#fbe3b4]/30 rounded-3xl p-5 border border-[#2a170e]/15 space-y-2">
                <span className="font-serif text-2xl font-black text-[#c2622b]">{st.num}</span>
                <h3 className="font-serif text-base font-bold text-[#2a170e]">{st.title}</h3>
                <p className="text-xs text-[#5a3a28]">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INLINE INQUIRY FORM */}
      <section className="bg-[#fbe3b4]/40 rounded-[40px] border-2 border-[#2a170e]/15 p-8 sm:p-12">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
              Quick Reservation & Inquiry
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2a170e]">
              Ask About {puppy.name}
            </h2>
            <p className="text-sm text-[#5a3a28]">
              Leave your contact details and our concierge will reach out within minutes with photos, video clips, and showroom booking times.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#fffdf8] rounded-3xl p-8 border-2 border-emerald-500 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2a170e]">
                Inquiry Received!
              </h3>
              <p className="text-sm text-[#5a3a28] max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#2a170e]">{fullName}</span>. Our concierge team has reserved your dossier for <span className="font-bold text-[#2a170e]">{puppy.name}</span> and will connect with you on WhatsApp shortly.
              </p>
              <div className="pt-2">
                <a href={whatsappUrl} className="btn-whatsapp text-sm py-2 px-6">
                  Chat Now on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-left">
              {formError && (
                <div className="bg-rose-50 text-rose-700 text-sm p-3 rounded-2xl border border-rose-200">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#fffdf8] rounded-2xl px-4 py-3 text-sm text-[#2a170e] border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full bg-[#fffdf8] rounded-2xl px-4 py-3 text-sm text-[#2a170e] border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="w-full bg-[#fffdf8] rounded-2xl px-4 py-3 text-sm text-[#2a170e] border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                  Questions or Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={`Tell us anything about your home or preferences for ${puppy.name}...`}
                  className="w-full bg-[#fffdf8] rounded-2xl px-4 py-3 text-sm text-[#2a170e] border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-3.5 shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting Reservation...' : `Submit Inquiry for ${puppy.name}`}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 5: RELATED PUPPIES */}
      {relatedPuppies.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170e]">
              More Puppies to Meet
            </h2>
            <Link href="/puppies" className="text-sm font-semibold text-[#a24a1a] hover:underline">
              View all ({relatedPuppies.length}+)
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedPuppies.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/puppies/${rel.slug}`}
                className="group bg-[#fffdf8] rounded-3xl p-3 border-2 border-[#2a170e]/15 hover:border-[#a24a1a] transition-all hover:-translate-y-1 text-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2">
                  <Image src={rel.images[0]} alt={rel.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#2a170e] group-hover:text-[#a24a1a]">
                  {rel.name}
                </h3>
                <p className="text-xs text-[#5a3a28]">
                  {rel.breed} · {rel.gender}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MODAL DIALOG FOR RESERVATION */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2a170e]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fffdf8] rounded-[36px] max-w-lg w-full p-6 sm:p-8 border-3 border-[#2a170e] shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">Reserve or Inquire</span>
                <h3 className="font-serif text-2xl font-bold text-[#2a170e]">{puppy.name}</h3>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="w-8 h-8 rounded-full bg-[#fbe3b4] text-[#2a170e] flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="text-4xl">🎉</div>
                <h4 className="font-serif text-xl font-bold text-[#2a170e]">Thank you!</h4>
                <p className="text-sm text-[#5a3a28]">
                  Your request has been captured. Our team will contact you shortly.
                </p>
                <button onClick={() => setShowInquiryModal(false)} className="btn-primary text-sm py-2 px-6">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                {formError && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">{formError}</p>
                )}
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#fbe3b4]/30 rounded-2xl px-4 py-2.5 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fbe3b4]/30 rounded-2xl px-4 py-2.5 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbe3b4]/30 rounded-2xl px-4 py-2.5 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
                <textarea
                  rows={2}
                  placeholder="Any questions or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#fbe3b4]/30 rounded-2xl px-4 py-2.5 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                />
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 justify-center text-sm py-2.5"
                  >
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp justify-center text-sm py-2.5 px-4"
                  >
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
