'use client';

import React, { useRef, useEffect, useState } from 'react';
import PupBuddy from '@/components/PupBuddy';
import Link from 'next/link';

export default function HomeMeet() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const doorRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const prevProgressRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [openStates, setOpenStates] = useState<boolean[]>(() => new Array(15).fill(false));

  const toggleDoor = (idx: number, e: React.MouseEvent) => {
    if (!openStates[idx]) {
      e.preventDefault();
      setOpenStates(prev => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    }
  };

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalDist = container.offsetHeight - window.innerHeight;

        if (totalDist > 0) {
          // Clamped scroll progress 0 -> 1
          const progress = Math.min(1, Math.max(0, -rect.top / totalDist));
          setScrollProgress(progress);

          // Track running direction
          if (progress > prevProgressRef.current + 0.001) {
            setFacing('right');
            setIsScrolling(true);
          } else if (progress < prevProgressRef.current - 0.001) {
            setFacing('left');
            setIsScrolling(true);
          }
          prevProgressRef.current = progress;

          // Calculate puppy contact position
          // Runway runs from 12% to 76% across the viewport
          const runningPercent = Math.min(76, Math.max(12, 12 + progress * 62));
          const pupScreenX = (window.innerWidth * runningPercent) / 100;
          const pupContactX = pupScreenX + 45; // Front paw & nose contact point

          setOpenStates(prev => {
            let changed = false;
            const next = [...prev];

            if (progress <= 0.015) {
              // Reset all doors closed when at runway entrance
              for (let i = 0; i < 15; i++) {
                if (next[i]) {
                  next[i] = false;
                  changed = true;
                }
              }
              return changed ? next : prev;
            }

            // Sequential door opening: as Teddy touches each door, it opens
            for (let i = 0; i < 15; i++) {
              const doorEl = doorRefs.current[i];
              if (!doorEl) continue;
              const dRect = doorEl.getBoundingClientRect();

              const shouldOpen = pupContactX >= dRect.left - 15;
              if (shouldOpen && !next[i]) {
                next[i] = true;
                changed = true;
              } else if (!shouldOpen && next[i] && pupContactX < dRect.left - 45) {
                next[i] = false;
                changed = true;
              }
            }

            return changed ? next : prev;
          });

          // Reset to stationary pose after scrolling stops
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 240);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Horizontal translation for 16 doors parade
  const maxTranslate = typeof window !== 'undefined'
    ? Math.max(0, 15 * 280 - window.innerWidth * 0.65)
    : 3200;
  const translateX = -scrollProgress * maxTranslate;

  // Running position across runway parquet track (12% -> 76%)
  const runningLeftPercent = Math.min(76, Math.max(12, 12 + scrollProgress * 62));

  return (
    <div data-section="meet">
      <section
        ref={containerRef}
        data-pup-scene="true"
        data-tone="light"
        data-pinned="true"
        data-pin-range="true"
        className="tp-scene tp-meet relative min-h-[360vh] select-none"
        style={({ '--sky-top': '#fff1d8', '--sky-bottom': '#fbe3b4', '--pinned': scrollProgress }) as React.CSSProperties}
        aria-labelledby="meet-title"
      >
        <div className="tp-meet__stage sticky top-0 h-screen flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <header className="tp-meet__head gutter z-20">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <a className="btn btn-primary shrink-0 shadow-md" href="/puppies">
              See all available puppies
            </a>
          </header>

          {/* Horizontal Hallway & Runway Track */}
          <div className="tp-meet__hall relative flex-1 flex flex-col justify-end overflow-hidden">
            <ol
              ref={trackRef}
              className="tp-meet__track will-change-transform pb-2 z-10"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
              }}
              data-treadmill="true"
              aria-label="Puppies looking for a family"
            >
                {/* Door 1: Max */}
                <li ref={(el) => { doorRefs.current[0] = el; }} className="tp-door cursor-pointer" data-open={openStates[0] ? 'true' : 'false'} onClick={(e) => toggleDoor(0, e)}>
                  <a className="tp-door__link" style={({ '--door': '#a24a1a' }) as React.CSSProperties} href="/puppies/maltipoo-max-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Max</span>
                      <span className="tp-door__meta">Maltipoo, boy, 3 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Max, male Maltipoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 2: Korean Teacup Maltipoo */}
                <li ref={(el) => { doorRefs.current[1] = el; }} className="tp-door cursor-pointer" data-open={openStates[1] ? 'true' : 'false'} onClick={(e) => toggleDoor(1, e)}>
                  <a className="tp-door__link" style={({ '--door': '#5a3a28' }) as React.CSSProperties} href="/puppies/korean-teacup-maltipoo-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Maltipoo</span>
                      <span className="tp-door__meta">girl, 2 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Maltipoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 3: Korean Teacup Poodle */}
                <li ref={(el) => { doorRefs.current[2] = el; }} className="tp-door cursor-pointer" data-open={openStates[2] ? 'true' : 'false'} onClick={(e) => toggleDoor(2, e)}>
                  <a className="tp-door__link" style={({ '--door': '#d4893f' }) as React.CSSProperties} href="/puppies/korean-teacup-poodle-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Poodle</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Poodle puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 4: Maltipoo & Cavapoo */}
                <li ref={(el) => { doorRefs.current[3] = el; }} className="tp-door cursor-pointer" data-open={openStates[3] ? 'true' : 'false'} onClick={(e) => toggleDoor(3, e)}>
                  <a className="tp-door__link" style={({ '--door': '#b8644a' }) as React.CSSProperties} href="/puppies/maltipoo-cavapoo-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo & Cavapoo</span>
                      <span className="tp-door__meta">boy, 3 months Maltipoo & 2 months Cavapoo, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Male Maltipoo & Cavapoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 5: Toy Poodle */}
                <li ref={(el) => { doorRefs.current[4] = el; }} className="tp-door cursor-pointer" data-open={openStates[4] ? 'true' : 'false'} onClick={(e) => toggleDoor(4, e)}>
                  <a className="tp-door__link" style={({ '--door': '#7a4a2e' }) as React.CSSProperties} href="/puppies/toy-poodle-male-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Toy Poodle</span>
                      <span className="tp-door__meta">boy & girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Toy Poodle puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 6: Maltipoo */}
                <li ref={(el) => { doorRefs.current[5] = el; }} className="tp-door cursor-pointer" data-open={openStates[5] ? 'true' : 'false'} onClick={(e) => toggleDoor(5, e)}>
                  <a className="tp-door__link" style={({ '--door': '#a24a1a' }) as React.CSSProperties} href="/puppies/maltipoo-female-2">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo</span>
                      <span className="tp-door__meta">girl, 3 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Maltipoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 7: Pomeranian */}
                <li ref={(el) => { doorRefs.current[6] = el; }} className="tp-door cursor-pointer" data-open={openStates[6] ? 'true' : 'false'} onClick={(e) => toggleDoor(6, e)}>
                  <a className="tp-door__link" style={({ '--door': '#5a3a28' }) as React.CSSProperties} href="/puppies/pomeranian-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Pomeranian</span>
                      <span className="tp-door__meta">girl, 3 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Pomeranian puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 8: Copper */}
                <li ref={(el) => { doorRefs.current[7] = el; }} className="tp-door cursor-pointer" data-open={openStates[7] ? 'true' : 'false'} onClick={(e) => toggleDoor(7, e)}>
                  <a className="tp-door__link" style={({ '--door': '#d4893f' }) as React.CSSProperties} href="/puppies/copper-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Copper</span>
                      <span className="tp-door__meta">Cavapoo, boy, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Copper, male Cavapoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 9: Shih Tzu Female */}
                <li ref={(el) => { doorRefs.current[8] = el; }} className="tp-door cursor-pointer" data-open={openStates[8] ? 'true' : 'false'} onClick={(e) => toggleDoor(8, e)}>
                  <a className="tp-door__link" style={({ '--door': '#b8644a' }) as React.CSSProperties} href="/puppies/shitzu-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Shih Tzu</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Shih Tzu puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 10: Shih Tzu Male */}
                <li ref={(el) => { doorRefs.current[9] = el; }} className="tp-door cursor-pointer" data-open={openStates[9] ? 'true' : 'false'} onClick={(e) => toggleDoor(9, e)}>
                  <a className="tp-door__link" style={({ '--door': '#7a4a2e' }) as React.CSSProperties} href="/puppies/shitzu-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Shih Tzu</span>
                      <span className="tp-door__meta">boy, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Male Shih Tzu puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 11: Maltipoo Female 1 */}
                <li ref={(el) => { doorRefs.current[10] = el; }} className="tp-door cursor-pointer" data-open={openStates[10] ? 'true' : 'false'} onClick={(e) => toggleDoor(10, e)}>
                  <a className="tp-door__link" style={({ '--door': '#a24a1a' }) as React.CSSProperties} href="/puppies/maltipoo-female-1">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo</span>
                      <span className="tp-door__meta">girl, 2.5 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Maltipoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 12: Maltipoo Female */}
                <li ref={(el) => { doorRefs.current[11] = el; }} className="tp-door cursor-pointer" data-open={openStates[11] ? 'true' : 'false'} onClick={(e) => toggleDoor(11, e)}>
                  <a className="tp-door__link" style={({ '--door': '#5a3a28' }) as React.CSSProperties} href="/puppies/maltipoo-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Maltipoo puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 13: Korean Teacup Pomeranian 1 */}
                <li ref={(el) => { doorRefs.current[12] = el; }} className="tp-door cursor-pointer" data-open={openStates[12] ? 'true' : 'false'} onClick={(e) => toggleDoor(12, e)}>
                  <a className="tp-door__link" style={({ '--door': '#d4893f' }) as React.CSSProperties} href="/puppies/korean-teacup-pomeranian-1">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Pomeranian</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Pomeranian puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 14: Korean Teacup Pomeranian */}
                <li ref={(el) => { doorRefs.current[13] = el; }} className="tp-door cursor-pointer" data-open={openStates[13] ? 'true' : 'false'} onClick={(e) => toggleDoor(13, e)}>
                  <a className="tp-door__link" style={({ '--door': '#b8644a' }) as React.CSSProperties} href="/puppies/korean-teacup-pomeranian">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Pomeranian</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Pomeranian puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Door 15: Korean Teacup Pomeranian Male */}
                <li ref={(el) => { doorRefs.current[14] = el; }} className="tp-door cursor-pointer" data-open={openStates[14] ? 'true' : 'false'} onClick={(e) => toggleDoor(14, e)}>
                  <a className="tp-door__link" style={({ '--door': '#7a4a2e' }) as React.CSSProperties} href="/puppies/korean-teacup-pomeranian-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Pomeranian</span>
                      <span className="tp-door__meta">boy, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Male Korean Teacup Pomeranian puppy" loading="lazy" decoding="async" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' }} src="/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </a>
                </li>

                {/* Final Link Door: Meet them all */}
                <li className="tp-door tp-door--all" data-open="true">
                  <a className="tp-door__link" href="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </a>
                </li>
              </ol>

              {/* Teddy Mascot RUNNING ON FLOOR */}
              <div
                className="tp-meet__teddy absolute bottom-[4.2rem] sm:bottom-[5rem] z-40 pointer-events-auto select-none"
                style={{
                  left: `${runningLeftPercent}%`,
                  width: 'clamp(7.5rem, 10vw, 9rem)',
                  transform: 'translateX(-50%)',
                  visibility: 'visible',
                  opacity: 1,
                }}
              >
                <PupBuddy
                  pose={isScrolling ? 'walk' : 'stand'}
                  facing={facing}
                  label="Teddy"
                />
              </div>

              {/* Grounded Wooden Parquet Floor Runway with treadmill motion matching original */}
              <div
                aria-hidden="true"
                className="tp-meet__floor relative w-full h-20 sm:h-24 border-t-[3.5px] border-[#2a170e] z-10 shadow-[0_-10px_0_-4px_#f5d9a8]"
                style={{
                  background: `linear-gradient(to bottom, #2a170e20, transparent 24%), repeating-linear-gradient(90deg, transparent 0 160px, #2a170e1a 160px 162px), linear-gradient(#e8b06a, #dc9a52)`,
                  backgroundPosition: `${-scrollProgress * 850}px 0`,
                }}
              />
            </div>
          </div>
      </section>
    </div>
  );
}
