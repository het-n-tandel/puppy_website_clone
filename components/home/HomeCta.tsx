'use client';

import React from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeCta() {
  return (
    <div data-section="cta">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-home"
        style={({ '--sky-top': '#2f1a10', '--sky-bottom': '#24130b' }) as React.CSSProperties}
        aria-labelledby="cta-title"
      >
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        {/* Cozy house front with warm wall lights, potted plants, open door & welcome home mat */}
        <div className="tp-house">
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left"></span>
          <span aria-hidden="true" className="tp-house__lamp"></span>

          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img
                alt="Max, waiting inside"
                loading="lazy"
                decoding="async"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }}
                src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
              />
            </span>
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep"></span>
              <span className="tp-house__knob"></span>
            </span>
          </div>

          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right"></span>
          <span aria-hidden="true" className="tp-house__mat font-scrawl">
            welcome home
          </span>

          {/* Mascot on porch in LIE-HAPPY pose, tail wagging, eyes closed & smiling */}
          <div
            data-pup-stop="true"
            data-pose="lie-happy"
            data-facing="right"
            data-lane="true"
            className="pup-stop tp-house__teddy"
          >
            <PupBuddy
              pose="lie-happy"
              facing="right"
              label="Teddy, lying happily on the porch welcoming you home"
            />
          </div>
        </div>

        {/* Action Buttons: WhatsApp green + Outlined Visit & contact */}
        <div className="tp-home__actions gutter">
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Enquire on WhatsApp
          </a>
          <Link className="btn btn-ghost tp-home__ghost" href="/contact">
            Visit & contact
          </Link>
        </div>
      </section>
    </div>
  );
}
