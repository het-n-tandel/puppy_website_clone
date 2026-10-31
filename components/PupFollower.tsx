'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  const lastScrollY = useRef(0);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

      // 1. Check if we are docked directly on any stop
      let dockedIndex = -1;

      // At the very top of the page (Hero section), always dock to Hero (Stop 0)
      if (scrollY < 120) {
        dockedIndex = 0;
      } else {
        // If user is inside the sticky "Meet the pups" runway, dock directly to Stop 1
        const meetSection = document.querySelector('section[aria-labelledby="meet-title"]');
        if (meetSection) {
          const mRect = meetSection.getBoundingClientRect();
          if (mRect.top <= 80 && mRect.bottom >= window.innerHeight * 0.4) {
            dockedIndex = 1;
          }
        }

        if (dockedIndex === -1) {
          // Check distance of each stop to the viewport center
          stops.forEach((stop, idx) => {
            const rect = stop.getBoundingClientRect();
            const stopCenterY = rect.top + rect.height / 2;
            const dist = Math.abs(stopCenterY - viewCenter);
            if (dist < 100) {
              dockedIndex = idx;
            }
          });
        }
      }

      // RULE 2: When movable puppy still in picture / docked:
      // Movable puppy DISAPPEARS, and STILL PUPPY at that stop APPEARS!
      if (dockedIndex !== -1) {
        setIsMoving(false);

        // Still puppy at dockedIndex appears; all other still puppies disappear
        stops.forEach((stop, idx) => {
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (idx === dockedIndex) {
            buddy.style.opacity = '1';
            buddy.style.transition = 'opacity 0.25s ease-in';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.transition = 'opacity 0.25s ease-out';
            buddy.style.visibility = 'hidden';
          }
        });

        return;
      }

      // RULE 1: When movable puppy moves:
      // ALL still picture puppies DISAPPEAR, and MOVABLE PUPPY APPEARS!
      setIsMoving(true);

      // Hide all still picture puppies
      stops.forEach((stop) => {
        const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
        buddy.style.opacity = '0';
        buddy.style.transition = 'opacity 0.15s ease-out';
        buddy.style.visibility = 'hidden';
      });

      // Find which two stops we are between
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
      const interpY = y1 + (y2 - y1) * t;

      setPos({ x: interpX, y: interpY });
      setFacing(x2 >= x1 ? 'right' : 'left');

      // Add gentle paw print along the trail
      if (Math.random() < 0.2) {
        const newPrint = {
          id: printCounter.current++,
          x: interpX + (Math.random() * 16 - 8),
          y: interpY + 24 + (Math.random() * 8 - 4),
          angle: scrollDir === 'down' ? 180 : 0,
        };
        setPawPrints((prev) => [...prev.slice(-6), newPrint]);
      }

      // If user stops scrolling for 250ms, find nearest stop and dock into it
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = setTimeout(() => {
        let nearestIdx = 0;
        let minD = Infinity;
        stops.forEach((s, idx) => {
          const r = s.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - viewCenter);
          if (d < minD) {
            minD = d;
            nearestIdx = idx;
          }
        });

        // Dock to nearest stop
        setIsMoving(false);
        stops.forEach((s, idx) => {
          const buddy = s.querySelector<HTMLElement>('.pup-buddy') || s;
          if (idx === nearestIdx) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });
      }, 300);
    };

    window.addEventListener('scroll', updatePups, { passive: true });
    window.addEventListener('resize', updatePups, { passive: true });
    updatePups();

    return () => {
      window.removeEventListener('scroll', updatePups);
      window.removeEventListener('resize', updatePups);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
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
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) scale(0.6)`,
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

      {/* MOVABLE PUPPY (Only visible while moving between stops!) */}
      {isMoving && (
        <div
          className="fixed z-40 pointer-events-none transition-transform duration-75 ease-out will-change-transform drop-shadow-xl"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '150px',
          }}
          aria-hidden="true"
        >
          <PupBuddy
            pose="walk"
            facing={facing}
            className="animate-bounce"
          />
        </div>
      )}
    </>
  );
}
