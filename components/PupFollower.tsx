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

      const viewCenter = window.innerHeight * 0.45;

      // 1. Hero Stage Check:
      // When at the very top of the page, Teddy sits centered on the quilt
      if (scrollY < 60) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        // Hero still puppy is visible; all others hidden
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

      // 2. Meet the Pups Check:
      // When approaching or inside the pinned "Meet the pups" showroom section:
      // Teddy seamlessly joins the showroom runway frame on the parquet floor
      const meetSection = document.querySelector('section[aria-labelledby="meet-title"]');
      let inMeetRunway = false;
      if (meetSection) {
        const mRect = meetSection.getBoundingClientRect();
        if (mRect.top <= window.innerHeight * 0.65 && mRect.bottom >= window.innerHeight * 0.25) {
          inMeetRunway = true;
        }
      }

      if (inMeetRunway) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        // Hide all stops except showroom runway Teddy
        stops.forEach((stop) => {
          const isMeetTeddy = stop.classList.contains('tp-meet__teddy');
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (isMeetTeddy) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });
        return;
      }

      // 3. Footer Check:
      // When approaching or inside the footer ("Home, at last."):
      // Teddy seamlessly joins the wicker basket frame and sleeps peacefully
      const footerSection = document.querySelector('footer.tp-footer');
      let inFooter = false;
      if (footerSection) {
        const fRect = footerSection.getBoundingClientRect();
        if (fRect.top <= window.innerHeight * 0.75) {
          inFooter = true;
        }
      }

      if (inFooter) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        // Reveal sleeping puppy in basket; hide all other stops
        stops.forEach((stop) => {
          const isBasketPup = stop.classList.contains('tp-basket__pup');
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (isBasketPup) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });
        return;
      }

      // 4. Moving throughout the page:
      // Movable puppy is active! All still puppies disappear.
      setIsMovableActive(true);
      setIsActivelyWalking(true);

      // Hide all stationary picture puppies
      stops.forEach((stop) => {
        const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
        buddy.style.opacity = '0';
        buddy.style.visibility = 'hidden';
      });

      // Calculate path interpolation between stops
      let fromIdx = 0;
      let toIdx = 1;

      for (let i = 0; i < stops.length - 1; i++) {
        const r1 = stops[i].getBoundingClientRect();
        const r2 = stops[i + 1].getBoundingClientRect();
        const y1 = r1.top + window.scrollY;
        const y2 = r2.top + window.scrollY;
        const currentY = scrollY + viewCenter;

        if (currentY >= y1 && currentY <= y2) {
          fromIdx = i;
          toIdx = i + 1;
          break;
        } else if (currentY > y2) {
          fromIdx = i;
          toIdx = Math.min(stops.length - 1, i + 1);
        }
      }

      const rect1 = stops[fromIdx].getBoundingClientRect();
      const rect2 = stops[toIdx].getBoundingClientRect();

      const absY1 = rect1.top + window.scrollY;
      const absY2 = rect2.top + window.scrollY;
      const range = Math.max(1, absY2 - absY1);
      const t = Math.min(1, Math.max(0, (scrollY + viewCenter - absY1) / range));

      // Viewport coordinates of fromStop and toStop
      const x1 = rect1.left + rect1.width / 2;
      const y1 = rect1.top + rect1.height / 2;
      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      // Smoothly interpolate position
      const interpX = x1 + (x2 - x1) * t;
      const interpY = Math.min(window.innerHeight - 80, Math.max(100, y1 + (y2 - y1) * t));

      setPos({ x: interpX, y: interpY });
      setFacing(x2 >= x1 ? 'right' : 'left');

      // Add gentle paw print along the trail
      if (Math.random() < 0.22) {
        const newPrint = {
          id: printCounter.current++,
          x: interpX + (Math.random() * 16 - 8),
          y: interpY + 28 + (Math.random() * 8 - 4),
          angle: scrollDir === 'down' ? 180 : 0,
        };
        setPawPrints((prev) => [...prev.slice(-6), newPrint]);
      }

      // When user pauses scrolling:
      // Teddy STAYS AT THAT EXACT POSITION on screen!
      // He does NOT disappear, and does NOT force a distant stop to sit!
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
