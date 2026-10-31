'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { ALL_PUPPIES } from '@/data/puppiesData';
import {
  MapPin,
  Clock,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  Heart,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [puppyId, setPuppyId] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="tp-page min-h-screen py-10 sm:py-16 bg-[#fffdf8]">
      <div className="gutter mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p className="font-serif italic text-lg sm:text-xl font-bold text-[#c2622b]">
              every puppy is family
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-[#2a170e] tracking-tight">
              Get in touch with us
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-base sm:text-lg text-[#5a3a28] leading-relaxed">
              Have questions about our puppies or adoption process? Fill out our stationery letter or message our concierge directly on WhatsApp.
            </p>
          </div>
        </header>

        {/* 2-Column Grid: Left Showroom Visit, Right Airmail Letterform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visit us in Downtown Dubai */}
          <div className="lg:col-span-5 space-y-8">
            <div className="tp-visit bg-[#fffdf8] rounded-[36px] border-3 border-[#2a170e] p-6 sm:p-8 shadow-[6px_8px_0px_#2a170e] space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c2622b]">
                  Boutique Showroom
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#2a170e] mt-1">
                  Visit us in Downtown Dubai
                </h2>
                <p className="text-sm sm:text-base text-[#5a3a28] mt-2 leading-relaxed">
                  Step into our Downtown Dubai showroom and experience the joy of meeting and bonding with your new puppy face-to-face.
                </p>
              </div>

              {/* Showroom Polaroid Photo */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#2a170e] shadow-md bg-[#fbe3b4]">
                <Image
                  src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                  alt="Apricot puppy held up in our Dubai showroom"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-[#fffdf8]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif font-bold text-[#2a170e] border border-[#2a170e]/20 shadow-sm">
                  Downtown Dubai Showroom ✨
                </div>
              </div>

              {/* Location details */}
              <div className="space-y-4 pt-2 border-t border-[#2a170e]/10 text-sm text-[#5a3a28]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2a170e]">Downtown Dubai</strong>
                    <span>United Arab Emirates</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2a170e]">Visiting Hours</strong>
                    <span>Daily from 10:00 AM – 9:00 PM (By appointment)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2a170e]">WhatsApp Concierge</strong>
                    <span>+971 54 167 6733 (24/7 dedicated support)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-3 px-6 shadow-md inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-3 px-6 !bg-[#25D366] !text-white !border-transparent hover:brightness-105 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Airmail Letter Stationery Form */}
          <div className="lg:col-span-7">
            <div className="tp-post relative bg-[#fffdf6] rounded-[36px] border-3 border-[#2a170e] p-6 sm:p-10 shadow-[6px_8px_0px_#2a170e] overflow-hidden">
              {/* Airmail Border Envelope Accent */}
              <div
                className="absolute top-0 inset-x-0 h-3 pointer-events-none opacity-80"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, #e11d48 0 14px, transparent 14px 20px, #2563eb 20px 34px, transparent 34px 40px)`,
                }}
              />

              {/* Postage Stamp with Puppy Paw Cancellation Mark */}
              <div className="absolute top-6 right-6 w-16 h-20 bg-[#fbe3b4] border-2 border-dashed border-[#a24a1a] rounded-sm p-1.5 flex flex-col items-center justify-between rotate-[3deg] shadow-sm pointer-events-none">
                <span className="text-[9px] font-black tracking-widest text-[#a24a1a]">AIRMAIL</span>
                <svg viewBox="0 0 64 64" width="28" height="28" fill="#a24a1a">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
                <span className="text-[8px] font-bold text-[#a24a1a]">DUBAI · UAE</span>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#dcf8c6] border-2 border-[#1f7a4d] flex items-center justify-center mx-auto text-[#1f7a4d]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-black text-[#2a170e]">
                    Letter sent with love! 💌
                  </h3>
                  <p className="text-base text-[#5a3a28] max-w-md mx-auto leading-relaxed">
                    Thank you, {name || 'friend'}! Our concierge has received your letter and will reach out to you via WhatsApp / phone ({phone}) shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setArea('');
                      setMessage('');
                    }}
                    className="btn-primary text-xs py-2.5 px-6 mt-4"
                  >
                    Write another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="tp-letterform space-y-6 pt-4">
                  {/* Greeting */}
                  <p className="font-serif italic font-bold text-2xl text-[#c2622b]">
                    Dear TeddyPups,
                  </p>

                  {/* Mad-Libs Style Lined Stationery Paragraph 1 */}
                  <div className="text-base sm:text-lg text-[#2a170e] leading-loose">
                    my name is{' '}
                    <span className="inline-block border-b-2 border-[#2a170e] mx-1 min-w-[140px] max-w-full">
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="your name"
                        className="w-full bg-transparent border-0 p-0 text-[#2a170e] font-serif font-bold focus:outline-none placeholder:text-[#5a3a28]/40"
                      />
                    </span>
                    , and you can reach me on WhatsApp / phone at{' '}
                    <span className="inline-block border-b-2 border-[#2a170e] mx-1 min-w-[180px] max-w-full">
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-transparent border-0 p-0 text-[#2a170e] font-serif font-bold focus:outline-none placeholder:text-[#5a3a28]/40"
                      />
                    </span>
                    {' '}or by email at{' '}
                    <span className="inline-block border-b-2 border-[#2a170e] mx-1 min-w-[180px] max-w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email (optional)"
                        className="w-full bg-transparent border-0 p-0 text-[#2a170e] font-serif font-bold focus:outline-none placeholder:text-[#5a3a28]/40"
                      />
                    </span>
                    .
                  </div>

                  {/* Mad-Libs Style Lined Stationery Paragraph 2 */}
                  <div className="text-base sm:text-lg text-[#2a170e] leading-loose">
                    I live in{' '}
                    <span className="inline-block border-b-2 border-[#2a170e] mx-1 min-w-[150px] max-w-full">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Dubai Marina"
                        className="w-full bg-transparent border-0 p-0 text-[#2a170e] font-serif font-bold focus:outline-none placeholder:text-[#5a3a28]/40"
                      />
                    </span>
                    , and I&apos;m curious about{' '}
                    <span className="inline-block border-b-2 border-[#2a170e] mx-1 min-w-[200px] max-w-full">
                      <select
                        value={puppyId}
                        onChange={(e) => setPuppyId(e.target.value)}
                        className="w-full bg-transparent border-0 p-0 text-[#2a170e] font-serif font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="">any puppy (not sure yet)</option>
                        {ALL_PUPPIES.slice(0, 15).map((pup) => (
                          <option key={pup.id} value={pup.id}>
                            {pup.name} ({pup.breed}, {pup.gender})
                          </option>
                        ))}
                      </select>
                    </span>
                    .
                  </div>

                  {/* Mad-Libs Style Lined Stationery Paragraph 3 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#5a3a28]">
                      A little more about what I&apos;m looking for:
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. We are a family of four looking for a calm teacup puppy with hypoallergenic fur..."
                      className="w-full rounded-2xl border-2 border-[#2a170e] p-3.5 bg-white text-sm text-[#2a170e] focus:outline-none focus:ring-2 focus:ring-[#f2be6b] font-medium leading-relaxed"
                    />
                  </div>

                  {/* Sign-off */}
                  <div className="pt-2">
                    <p className="font-serif italic font-bold text-xl text-[#c2622b]">
                      Warmly,
                    </p>
                    <p className="font-serif font-bold text-lg text-[#2a170e] mt-1">
                      {name || 'Your signature'}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary text-sm sm:text-base py-3.5 px-8 shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>{loading ? 'Sealing envelope...' : 'Sign & send letter'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-serif italic text-[#5a3a28]">
                      ✉️ Arrives directly to our Dubai concierge
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
