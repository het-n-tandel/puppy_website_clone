'use client';

import React, { useState } from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeQuestions() {
  const [isQuestionHovered, setIsQuestionHovered] = useState(false);
  const [openIndices, setOpenIndices] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });

  const toggleQuestion = (idx: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

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
                top: '30%',
                width: '9px',
                animationDelay: '0.40s',
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
                left: '41%',
                top: '8%',
                width: '12.6px',
                animationDelay: '0.80s',
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
                left: '57%',
                top: '22%',
                width: '8.1px',
                animationDelay: '1.20s',
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
                left: '72%',
                top: '6%',
                width: '14.4px',
                animationDelay: '1.60s',
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
                left: '88%',
                top: '18%',
                width: '10.8px',
                animationDelay: '2.00s',
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
                left: '95%',
                top: '42%',
                width: '9px',
                animationDelay: '2.40s',
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
                left: '4%',
                top: '58%',
                width: '10.8px',
                animationDelay: '2.80s',
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

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">
              Questions, answered
            </h2>
            <a className="btn btn-ghost tp-night__cta" href="/faq">
              Read all questions
            </a>
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

          <dl
            className="tp-night__list"
            onMouseEnter={() => setIsQuestionHovered(true)}
            onMouseLeave={() => setIsQuestionHovered(false)}
          >
            <div
              className="tp-qa cursor-pointer select-none transition-all duration-200"
              data-pup-look=""
              onClick={() => toggleQuestion(0)}
            >
              <dt className="font-plush tp-qa__q flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
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
                </span>
                <span
                  className="text-honey text-xl font-bold transition-transform duration-300 shrink-0"
                  style={{
                    transform: openIndices[0] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </dt>
              {openIndices[0] && (
                <dd className="tp-qa__a mt-3 animate-fadeIn">
                  Yes. All our puppies come with a verified health certificate from
                  licensed vets. Every puppy is vaccinated, dewormed, and
                  thoroughly checked before joining your family.
                </dd>
              )}
            </div>

            <div
              className="tp-qa cursor-pointer select-none transition-all duration-200"
              data-pup-look=""
              onClick={() => toggleQuestion(1)}
            >
              <dt className="font-plush tp-qa__q flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
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
                </span>
                <span
                  className="text-honey text-xl font-bold transition-transform duration-300 shrink-0"
                  style={{
                    transform: openIndices[1] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </dt>
              {openIndices[1] && (
                <dd className="tp-qa__a mt-3 animate-fadeIn">
                  Yes. Come meet our locally available puppies in our Downtown
                  Dubai showroom and spend time bonding before making your
                  decision.
                </dd>
              )}
            </div>

            <div
              className="tp-qa cursor-pointer select-none transition-all duration-200"
              onClick={() => toggleQuestion(2)}
            >
              <dt className="font-plush tp-qa__q flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
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
                </span>
                <span
                  className="text-honey text-xl font-bold transition-transform duration-300 shrink-0"
                  style={{
                    transform: openIndices[2] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </dt>
              {openIndices[2] && (
                <dd className="tp-qa__a mt-3 animate-fadeIn">
                  Local puppies are available immediately, so you can take your
                  puppy home the same day.
                </dd>
              )}
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
