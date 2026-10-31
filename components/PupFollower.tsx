'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [isMovableActive, setIsMovableActive] = useState(false);
  const [isActivelyWalking, setIsActivelyWalking] = useState(false);
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  const lastScrollY = useRef(0);
  const walkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const printCounter = useRef(0);

  useEffect(() => {
    setMounted(true);

    const updatePups = () => {
      const scrollY = window.scrollY;
      const scrollDir = scrollY >= lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = scrollY;

      const stops = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pup-stop="true"]')
      );

      if (stops.length === 0) return;

      const viewCenter = window.innerHeight * 0.48;

      // =========================================================================
      // 1. HERO SECTION CHECK (Top of page)
      // =========================================================================
      if (scrollY < 60) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        stops.forEach((stop, idx) => {
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (idx === 0) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });
        return;
      }

      // =========================================================================
      // 2. FOOTER BASKET CHECK ("Home, at last.")
      // Prevents puppy floating over text; puppy snuggles into basket immediately
      // =========================================================================
      const basketStop = stops[stops.length - 1];
      if (basketStop) {
        const bRect = basketStop.getBoundingClientRect();
        // If the basket is in the lower portion of the screen or footer is reached
        if (bRect.top <= window.innerHeight * 0.82) {
          setIsMovableActive(false);
          setIsActivelyWalking(false);

          stops.forEach((stop, idx) => {
            const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
            if (idx === stops.length - 1) {
              buddy.style.opacity = '1';
              buddy.style.visibility = 'visible';
            } else {
              buddy.style.opacity = '0';
              buddy.style.visibility = 'hidden';
            }
          });
          return;
        }
      }

      // =========================================================================
      // 3. MEET THE PUPS SECTION (Sticky Showroom Runway)
      // =========================================================================
      const meetSection = document.querySelector<HTMLElement>(
        'section[aria-labelledby="meet-title"]'
      );
      let inMeetRunway = false;
      let meetRect: DOMRect | null = null;

      if (meetSection) {
        meetRect = meetSection.getBoundingClientRect();
        // Inside pinned runway track
        if (meetRect.top <= 80 && meetRect.bottom >= window.innerHeight * 0.45) {
          inMeetRunway = true;
        }
      }

      if (inMeetRunway) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        stops.forEach((stop, idx) => {
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (idx === 1) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });
        return;
      }

      // =========================================================================
      // 4. MOVING THROUGHOUT THE PAGE (Active Follower Mode)
      // =========================================================================
      setIsMovableActive(true);
      setIsActivelyWalking(true);

      // Hide all stationary picture puppies
      stops.forEach((stop) => {
        const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
        buddy.style.opacity = '0';
        buddy.style.visibility = 'hidden';
      });

      let calculatedX = window.innerWidth * 0.5;
      let calculatedY = viewCenter;
      let targetFacing: 'left' | 'right' = 'right';

      // --- Scenario A: Transition between HeroStage and MeetThePups ---
      if (meetRect && meetRect.top > 80) {
        const heroStop = stops[0];
        const hRect = heroStop.getBoundingClientRect();
        const startX = hRect.left + hRect.width / 2;
        const startY = hRect.top + hRect.height / 2;

        // Progress smoothly down from quilt towards runway entrance
        const totalDist = Math.max(1, meetRect.top - 80);
        const t = Math.min(1, Math.max(0, (scrollY - 60) / (scrollY - 60 + totalDist)));

        // Keep centered or gently guide towards left side of showroom without jumping to 8%
        calculatedX = startX + (window.innerWidth * 0.25 - startX) * (t * 0.6);
        calculatedY = Math.min(
          window.innerHeight - 90,
          Math.max(90, startY + (window.innerHeight - 90 - startY) * t)
        );
        targetFacing = 'right';
      }
      // --- Scenario B: Transition exiting MeetThePups towards TwoWaysSection ---
      else if (meetRect && meetRect.bottom < window.innerHeight * 0.45 && stops.length > 2) {
        const twoWaysStop = stops[2];
        const twRect = twoWaysStop.getBoundingClientRect();
        const endX = twRect.left + twRect.width / 2;
        const endY = twRect.top + twRect.height / 2;

        // Start from the runway exit (right side of parquet floor)
        const startX = window.innerWidth * 0.72;
        const startY = window.innerHeight - 90;

        const exitScroll = window.innerHeight * 0.45 - meetRect.bottom;
        const t = Math.min(1, Math.max(0, exitScroll / 400));

        calculatedX = startX + (endX - startX) * t;
        calculatedY = Math.min(
          window.innerHeight - 90,
          Math.max(90, startY + (endY - startY) * t)
        );
        targetFacing = endX >= startX ? 'right' : 'left';
      }
      // --- Scenario C: Between standard sections (TwoWays -> ... -> Footer) ---
      else {
        // Find which two stops we are between
        let fromIdx = 2;
        let toIdx = 3;

        for (let i = 2; i < stops.length - 1; i++) {
          const r1 = stops[i].getBoundingClientRect();
          const r2 = stops[i + 1].getBoundingClientRect();
          const c1 = r1.top + r1.height / 2;
          const c2 = r2.top + r2.height / 2;

          if (c1 <= viewCenter && c2 >= viewCenter) {
            fromIdx = i;
            toIdx = i + 1;
            break;
          } else if (c2 < viewCenter) {
            fromIdx = i;
            toIdx = Math.min(stops.length - 1, i + 1);
          }
        }

        const r1 = stops[fromIdx].getBoundingClientRect();
        const r2 = stops[toIdx].getBoundingClientRect();

        const x1 = r1.left + r1.width / 2;
        const y1 = r1.top + r1.height / 2;
        const x2 = r2.left + r2.width / 2;
        const y2 = r2.top + r2.height / 2;

        const distY = Math.max(1, y2 - y1);
        const t = Math.min(1, Math.max(0, (viewCenter - y1) / distY));

        calculatedX = x1 + (x2 - x1) * t;
        calculatedY = Math.min(window.innerHeight - 80, Math.max(80, y1 + (y2 - y1) * t));
        targetFacing = x2 >= x1 ? 'right' : 'left';
      }

      setPos({ x: calculatedX, y: calculatedY });
      setFacing(targetFacing);

      // Add gentle paw print along the trail
      if (Math.random() < 0.22) {
        const newPrint = {
          id: printCounter.current++,
          x: calculatedX + (Math.random() * 16 - 8),
          y: calculatedY + 28 + (Math.random() * 8 - 4),
          angle: scrollDir === 'down' ? 180 : 0,
        };
        setPawPrints((prev) => [...prev.slice(-6), newPrint]);
      }

      // When user pauses scrolling:
      // Teddy STAYS AT THAT EXACT POSITION on screen!
      // No disappearing, no jumping, stays alert standing in place
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = setTimeout(() => {
        setIsActivelyWalking(false);
      }, 200);
    };

    window.addEventListener('scroll', updatePups, { passive: true });
    window.addEventListener('resize', updatePups, { passive: true });
    updatePups();

    return () => {
      window.removeEventListener('scroll', updatePups);
      window.removeEventListener('resize', updatePups);
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Light Fading Paw Prints Trail */}
      <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden" aria-hidden="true">
        {pawPrints.map((p) => (
          <div
            key={p.id}
            className="absolute transition-opacity duration-1000 opacity-40"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) scale(0.65)`,
            }}
          >
            <svg viewBox="0 0 40 40" className="w-5 h-5 text-[#c2622b]/60 fill-current">
              <ellipse cx="20" cy="27" rx="9" ry="8" />
              <circle cx="11" cy="14" r="3.2" />
              <circle cx="17" cy="9" r="3.5" />
              <circle cx="23" cy="9" r="3.5" />
              <circle cx="29" cy="14" r="3.2" />
            </svg>
          </div>
        ))}
      </div>

      {/* MOVABLE PUPPY
          Stays right there at pos.x, pos.y when user pauses scrolling!
          When scrolling: pose="walk". When stopped: pose="stand" (standing alert on 4 paws, tail wagging).
      */}
      {isMovableActive && (
        <div
          className="fixed z-40 pointer-events-none transition-transform duration-75 ease-out will-change-transform drop-shadow-xl"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(145px, 16vw, 170px)',
          }}
          aria-hidden="true"
        >
          <PupBuddy
            pose={isActivelyWalking ? 'walk' : 'stand'}
            facing={facing}
            label="Teddy following along your journey"
          />
        </div>
      )}
    </>
  );
}
