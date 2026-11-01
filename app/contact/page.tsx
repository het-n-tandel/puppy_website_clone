'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import '../subpages.css';
import PupBuddy from '@/components/PupBuddy';
import { ALL_PUPPIES } from '@/data/puppiesData';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [puppyId, setPuppyId] = useState('');
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState<'writing' | 'sent'>('writing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('sent');
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setArea('');
    setPuppyId('');
    setMessage('');
    setPhase('writing');
  };

  return (
    <div data-page="contact" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{ '--sky-top': '#fff9ee', '--sky-bottom': '#f9dca4' } as React.CSSProperties}
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 id="contact-title" className="font-plush text-giant max-w-[12ch] lg:col-span-7">
              Get in touch
              <br />
              with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&#x27;d love to hear from you!
            </p>
          </header>

          {/* Main 2-column grid: Left Details, Right Letterform */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: WhatsApp CTA, Contacts & Showroom */}
            <div className="lg:col-span-5">
              <a
                href={getGeneralWhatsAppUrl("Hi TeddyPups! I'd love to know more about your puppies.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full sm:w-auto"
              >
                WhatsApp +971 54 167 6733
              </a>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">call us</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <a className="link-ink" href="tel:+971541676733">
                      +971 54 167 6733
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">email</dt>
                  <dd className="mt-1 break-all text-lg font-semibold">
                    <a className="link-ink" href="mailto:teddypupsadmin@gmail.com">
                      teddypupsadmin@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Downtown Dubai Showroom Shopfront */}
              <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
                <svg viewBox="0 0 300 120" className="absolute -bottom-1 right-0 w-3/4 text-toffee/30" aria-hidden="true">
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="tp-visit relative p-7 pt-6">
                  <div>
                    <h2 id="visit-title" className="font-plush text-[2rem] leading-tight">
                      Visit us in Downtown Dubai
                    </h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                      Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.
                    </p>
                    <p className="mt-4 flex items-center gap-2 font-semibold">
                      <svg viewBox="0 0 64 64" className="size-5 shrink-0 text-toffee-deep" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>
                    <a
                      href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-6 !bg-milk"
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className="tp-visit__photo">
                    <Image
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      fill
                      sizes="(min-width: 640px) 11rem, 90vw"
                      className="object-cover"
                      style={{ objectPosition: '45.3% 44.4%' }}
                    />
                  </figure>
                </div>
              </section>
            </div>

            {/* Right Column: Airmail Letterform */}
            <div className="lg:col-span-7">
              <div className="tp-post" data-phase={phase}>
                {phase === 'sent' ? (
                  <div className="tp-post__sent space-y-4">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-milk text-toffee">
                      <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2 className="font-plush text-3xl font-black text-cocoa">
                      Letter posted! 🐾
                    </h2>
                    <p className="text-base font-medium text-cocoa-soft max-w-[42ch] mx-auto">
                      Thank you, <strong className="text-cocoa">{name || 'friend'}</strong>! Your letter is on its way to Teddy and our concierge team. We will reach out to you via WhatsApp at {phone || 'your phone number'} shortly.
                    </p>
                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={getGeneralWhatsAppUrl(`Hi TeddyPups! I just sent a letter through your website. My name is ${name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        Open WhatsApp Now
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-ghost"
                      >
                        Send another note
                      </button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="tp-letterform">
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                    <p className="tp-letterform__line">
                      my name is{' '}
                      <span className="tp-blank" style={{ '--size': '16ch' } as React.CSSProperties}>
                        <input
                          aria-label="Your name (required)"
                          autoComplete="name"
                          required
                          minLength={2}
                          maxLength={80}
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </span>
                      , and you can reach me on{' '}
                      <span className="tp-blank" style={{ '--size': '15ch' } as React.CSSProperties}>
                        <input
                          aria-label="Phone or WhatsApp number with country code (required)"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          placeholder="+971 50 123 4567"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </span>{' '}
                      or by email at{' '}
                      <span className="tp-blank" style={{ '--size': '20ch' } as React.CSSProperties}>
                        <input
                          aria-label="Email (optional)"
                          type="email"
                          autoComplete="email"
                          placeholder="optional"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </span>
                      .
                    </p>

                    <p className="tp-letterform__line">
                      I live in{' '}
                      <span className="tp-blank" style={{ '--size': '13ch' } as React.CSSProperties}>
                        <input
                          aria-label="Your area (optional)"
                          autoComplete="address-level2"
                          maxLength={80}
                          placeholder="e.g. Dubai Marina"
                          name="area"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </span>
                      , and I&#x27;m curious about{' '}
                      <span className="tp-blank tp-blank--select">
                        <label htmlFor="puppySelect" className="sr-only">
                          Puppy you&#x27;re interested in (optional)
                        </label>
                        <select
                          id="puppySelect"
                          name="puppyId"
                          value={puppyId}
                          onChange={(e) => setPuppyId(e.target.value)}
                        >
                          <option value="">any puppy (not sure yet)</option>
                          {ALL_PUPPIES.map((pup) => (
                            <option key={pup.id} value={pup.id}>
                              {pup.name} ({pup.breed}, {pup.gender})
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    <label htmlFor="noteMessage" className="sr-only">
                      Your message (optional)
                    </label>
                    <textarea
                      id="noteMessage"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      placeholder="Anything else you&#x27;d like to tell us…"
                      className="tp-letterform__note"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="tp-letterform__sign">
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button type="submit" className="btn btn-primary disabled:opacity-70">
                        Post my letter
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Mascot waiting for your letter */}
              <div className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40" data-facing="left">
                <PupBuddy facing="left" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
