'use client';

import React, { useState } from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeQuestions() {
  const [isQuestionHovered, setIsQuestionHovered] = useState(false);

  return (
    <div data-section="questions">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-night"
        style={
          {
            '--sky-top': '#4d2b19',
            '--sky-bottom': '#2f1a10',
          } as React.CSSProperties
        }
        aria-labelledby="questions-title"
      >
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '8%',
                top: '12%',
                width: '16.2px',
                animationDelay: '0.00s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '22%',
                top: '38%',
                width: '10.8px',
                animationDelay: '0.35s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '38%',
                top: '15%',
                width: '12.6px',
                animationDelay: '0.70s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '52%',
                top: '42%',
                width: '9px',
                animationDelay: '1.05s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '68%',
                top: '20%',
                width: '14.4px',
                animationDelay: '1.40s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '84%',
                top: '35%',
                width: '10.8px',
                animationDelay: '1.75s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey"
            style={
              {
                left: '94%',
                top: '10%',
                width: '12.6px',
                animationDelay: '2.10s',
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="tp-night__sky gutter">
          <div className="tp-night__head">
            <h2 id="questions-title" className="font-plush text-huge">
              Questions, answered
            </h2>
            <Link className="btn btn-ghost tp-night__cta" href="/faq">
              Read all questions
            </Link>
            <div className="tp-night__pup">
              <div
                data-pup-stop="true"
                data-pose="curious"
                data-facing="right"
                data-act="curious"
                data-lane="true"
                className="pup-stop tp-night__teddy"
              >
                <PupBuddy
                  pose="curious"
                  facing="right"
                  isPerked={isQuestionHovered}
                  label="Teddy in curious pose, looking up at questions"
                />
              </div>
            </div>
          </div>

          {/* All 3 FAQ answers visible, matching the original site */}
          <dl
            className="tp-night__list"
            onMouseEnter={() => setIsQuestionHovered(true)}
            onMouseLeave={() => setIsQuestionHovered(false)}
          >
            <div className="tp-qa" data-pup-look="">
              <dt className="font-plush tp-qa__q">
                <svg
                  viewBox="0 0 40 40"
                  className="tp-qa__star shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Are your puppies vaccinated and health-checked?
              </dt>
              <dd className="tp-qa__a">
                Yes. All our puppies come with a verified health certificate from
                licensed vets. Every puppy is vaccinated, dewormed, and
                thoroughly checked before joining your family.
              </dd>
            </div>

            <div className="tp-qa" data-pup-look="">
              <dt className="font-plush tp-qa__q">
                <svg
                  viewBox="0 0 40 40"
                  className="tp-qa__star shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Can I meet a puppy before I decide?
              </dt>
              <dd className="tp-qa__a">
                Yes. Come meet our locally available puppies in our Downtown Dubai
                showroom and spend time bonding before making your decision.
              </dd>
            </div>

            <div className="tp-qa">
              <dt className="font-plush tp-qa__q">
                <svg
                  viewBox="0 0 40 40"
                  className="tp-qa__star shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Can I take my puppy home the same day?
              </dt>
              <dd className="tp-qa__a">
                Local puppies are available immediately, so you can take your puppy
                home the same day.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
