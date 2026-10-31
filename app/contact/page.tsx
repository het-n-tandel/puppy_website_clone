'use client';

import React, { useState } from 'react';
import { currentSite } from '@/lib/siteConfig';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a24a1a]">
          every puppy is family
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
          Visit & Contact
        </h1>
        <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
          Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#fffdf8] rounded-[36px] border-2 border-[#2a170e]/15 p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#2a170e]">
              Get in Touch Directly
            </h2>

            <div className="space-y-4 text-sm text-[#5a3a28]">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fbe3b4] flex items-center justify-center shrink-0 text-[#2a170e]">
                  <MessageCircle className="w-5 h-5 text-[#1f7a4d]" />
                </div>
                <div>
                  <p className="font-bold text-[#2a170e]">WhatsApp Concierge</p>
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a24a1a] hover:underline font-semibold"
                  >
                    {currentSite.contact.whatsappDisplay} (24/7 Available)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fbe3b4] flex items-center justify-center shrink-0 text-[#2a170e]">
                  <Mail className="w-5 h-5 text-[#c2622b]" />
                </div>
                <div>
                  <p className="font-bold text-[#2a170e]">Email Us</p>
                  <a
                    href={`mailto:${currentSite.contact.email}`}
                    className="text-[#a24a1a] hover:underline break-all font-semibold"
                  >
                    {currentSite.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fbe3b4] flex items-center justify-center shrink-0 text-[#2a170e]">
                  <MapPin className="w-5 h-5 text-[#a24a1a]" />
                </div>
                <div>
                  <p className="font-bold text-[#2a170e]">Showroom Location</p>
                  <p>{currentSite.locationFull}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fbe3b4] flex items-center justify-center shrink-0 text-[#2a170e]">
                  <Clock className="w-5 h-5 text-[#2a170e]" />
                </div>
                <div>
                  <p className="font-bold text-[#2a170e]">Opening Hours</p>
                  <p>{currentSite.contact.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-sm py-3"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#fffdf8] rounded-[36px] border-2 border-[#2a170e]/15 p-8 sm:p-10 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#2a170e]">
              Send a Message to TeddyPups
            </h2>

            {submitted ? (
              <div className="bg-[#fbe3b4]/30 rounded-3xl p-8 border-2 border-emerald-500 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#2a170e]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-[#5a3a28]">
                  Thank you, <span className="font-bold text-[#2a170e]">{name}</span>. We have received your inquiry and will reach out to you within a few hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="btn-primary text-sm py-2 px-6 mt-3"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#fbe3b4]/20 rounded-2xl px-4 py-3 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +971 50 123 4567"
                      className="w-full bg-[#fbe3b4]/20 rounded-2xl px-4 py-3 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
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
                    placeholder="e.g. john@example.com"
                    className="w-full bg-[#fbe3b4]/20 rounded-2xl px-4 py-3 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2a170e] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what puppy or breed you're looking for..."
                    className="w-full bg-[#fbe3b4]/20 rounded-2xl px-4 py-3 text-sm border border-[#2a170e]/20 focus:outline-none focus:border-[#a24a1a]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base py-3.5 shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
