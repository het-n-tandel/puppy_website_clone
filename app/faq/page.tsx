'use client';

import React, { useState, useMemo } from 'react';
import '../subpages.css';
import PupBuddy from '@/components/PupBuddy';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tilt: string;
  pin: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'q-1',
    question: 'Are your puppies vaccinated and health-checked?',
    answer:
      'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'q-2',
    question: 'Can I meet a puppy before I decide?',
    answer:
      'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    tilt: '1.2deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'q-3',
    question: 'Can I take my puppy home the same day?',
    answer:
      'Local puppies are available immediately, so you can take your puppy home the same day.',
    tilt: '-0.8deg',
    pin: '#d9a13c',
  },
  {
    id: 'q-4',
    question: 'Do you import puppies from abroad?',
    answer:
      'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
    tilt: '1.8deg',
    pin: '#c45a6a',
  },
  {
    id: 'q-5',
    question: 'How does an imported puppy travel to Dubai?',
    answer:
      'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
    tilt: '-1.2deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'q-6',
    question: 'Will I see photos and health details first?',
    answer:
      'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
    tilt: '1.5deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'q-7',
    question: 'Do you deliver?',
    answer:
      'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
    tilt: '-1.8deg',
    pin: '#d9a13c',
  },
  {
    id: 'q-8',
    question: 'Which breeds do you usually have?',
    answer:
      'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
    tilt: '1.2deg',
    pin: '#c45a6a',
  },
  {
    id: 'q-9',
    question: 'Is there help after my puppy comes home?',
    answer:
      'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
    tilt: '-0.9deg',
    pin: 'var(--color-toffee)',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const hasAnyOpen = useMemo(() => Object.values(openIds).some(Boolean), [openIds]);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAQS;
    return FAQS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div data-page="faq" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-faqroom overflow-hidden"
        style={{ '--sky-top': '#a95e32', '--sky-bottom': '#331c11' } as React.CSSProperties}
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="max-w-4xl">
            <h1 id="faq-title" className="font-plush text-giant text-milk">
              Questions
              <br />
              &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)] text-milk/90">
              Can&#x27;t find what you&#x27;re looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>

          {/* 2-Column: Sidebar & Corkboard */}
          <div className="mt-12 md:mt-16">
            <div className="tp-notes" data-open={hasAnyOpen ? 'true' : undefined}>
              {/* Left Column */}
              <aside className="tp-notes__side" aria-label="Find a question">
                <label htmlFor="faq-search" className="font-scrawl tp-notes__label text-milk/90">
                  sniff out a question
                </label>

                <div className="tp-notes__search">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m15.5 15.5 5 5" />
                  </svg>
                  <input
                    id="faq-search"
                    type="search"
                    placeholder="delivery, Korea, vaccinated…"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <p className="tp-notes__count text-milk/80" aria-live="polite">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? 'note' : 'notes'} on the board
                </p>

                <div className="tp-notes__teddy">
                  <span aria-hidden="true" className="tp-notes__bubble font-plush">
                    <span className="tp-notes__q">?</span>
                    <span className="tp-notes__a">!</span>
                  </span>
                  <div className="pup-buddy" data-facing="right">
                    <PupBuddy facing="right" />
                  </div>
                </div>

                <a
                  href={getGeneralWhatsAppUrl('Hi TeddyPups! I have a question:')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp tp-notes__ask"
                >
                  Ask your own question
                </a>
              </aside>

              {/* Right Column: Corkboard */}
              <div className="tp-notes__board">
                <ul className="tp-notes__list">
                  {filteredFaqs.map((item, index) => {
                    const isOpen = !!openIds[item.id];
                    return (
                      <li
                        key={item.id}
                        className="tp-note"
                        data-reveal="true"
                        data-unfolded={isOpen ? 'true' : undefined}
                        style={
                          {
                            '--tilt': item.tilt,
                            '--pin': item.pin,
                            '--i': index,
                          } as React.CSSProperties
                        }
                      >
                        <span aria-hidden="true" className="tp-note__pin"></span>
                        <h2 className="tp-note__q">
                          <button
                            type="button"
                            id={`q-${item.id}`}
                            aria-expanded={isOpen}
                            aria-controls={`a-${item.id}`}
                            onClick={() => toggleNote(item.id)}
                          >
                            <span className="font-plush-text">{item.question}</span>
                            <span
                              aria-hidden="true"
                              className="tp-note__chevron"
                            ></span>
                          </button>
                        </h2>
                        <div
                          id={`a-${item.id}`}
                          role="region"
                          aria-labelledby={`q-${item.id}`}
                          className="tp-note__answer"
                          inert={!isOpen}
                        >
                          <div className="tp-note__flap">
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
