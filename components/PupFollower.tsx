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

    const updatePosition = () => {
      const scrollY = window.scrollY;
      const scrollDir = scrollY >= lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = scrollY;

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;

      // 1. TOP OF PAGE: Hero Section Quilt
      if (scrollY < 60) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        // Hero still puppy is visible
        const heroTeddy = document.querySelector<HTMLElement>('.tp-hero__teddy .pup-buddy');
        if (heroTeddy) {
          heroTeddy.style.opacity = '1';
          heroTeddy.style.visibility = 'visible';
        }
        return;
      }

      // Hide Hero still puppy once scrolled
      const heroTeddy = document.querySelector<HTMLElement>('.tp-hero__teddy .pup-buddy');
      if (heroTeddy) {
        heroTeddy.style.opacity = '0';
        heroTeddy.style.visibility = 'hidden';
      }

      // 2. SHOWROOM RUNWAY: Meet the Pups
      const meetSec = document.querySelector('section[aria-labelledby="meet-title"]');
      let inMeetRunway = false;
      if (meetSec) {
        const mRect = meetSec.getBoundingClientRect();
        // If the showroom section is pinned in viewport
        if (mRect.top <= 60 && mRect.bottom >= windowH * 0.45) {
          inMeetRunway = true;
        }
      }

      if (inMeetRunway) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);
        return;
      }

      // 3. FOOTER BASKET: Very bottom
      const isAtBottom =
        windowH + scrollY >= document.documentElement.scrollHeight - 160;
      if (isAtBottom) {
        setIsMovableActive(false);
        setIsActivelyWalking(false);

        const footerTeddy = document.querySelector<HTMLElement>('.tp-basket__pup .pup-buddy');
        if (footerTeddy) {
          footerTeddy.style.opacity = '1';
          footerTeddy.style.visibility = 'visible';
        }
        return;
      }

      // Hide footer basket still puppy when not at bottom
      const footerTeddy = document.querySelector<HTMLElement>('.tp-basket__pup .pup-buddy');
      if (footerTeddy) {
        footerTeddy.style.opacity = '0';
        footerTeddy.style.visibility = 'hidden';
      }

      // 4. MOVING ACROSS ALL HOME PAGE SECTIONS
      // The movable puppy stays active throughout every frame!
      setIsMovableActive(true);
      setIsActivelyWalking(true);

      // Define section focal checkpoints
      const checkpoints: Array<{ selector: string; targetX: number; targetYOffset: number }> = [
        { selector: 'section[aria-labelledby="meet-title"]', targetX: 0.5, targetYOffset: 0.65 },
        { selector: 'section[aria-labelledby="paths-title"]', targetX: 0.5, targetYOffset: 0.62 },
        { selector: 'section[aria-labelledby="journey-title"]', targetX: 0.42, targetYOffset: 0.6 },
        { selector: 'section[aria-labelledby="trust-title"]', targetX: 0.46, targetYOffset: 0.58 },
        { selector: 'section[aria-labelledby="families-title"]', targetX: 0.55, targetYOffset: 0.62 },
        { selector: 'section[aria-labelledby="faq-title"]', targetX: 0.48, targetYOffset: 0.6 },
        { selector: 'section[aria-labelledby="ready-title"]', targetX: 0.45, targetYOffset: 0.62 },
      ];

      // Find current section & calculate interpolation
      let currentCheckX = windowW * 0.5;
      let currentCheckY = windowH * 0.65;

      for (let i = 0; i < checkpoints.length; i++) {
        const el = document.querySelector(checkpoints[i].selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If this section is around the viewport center
          if (rect.top <= windowH * 0.8 && rect.bottom >= windowH * 0.2) {
            const nextIdx = Math.min(checkpoints.length - 1, i + 1);
            const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));

            const xStart = windowW * checkpoints[i].targetX;
            const xEnd = windowW * checkpoints[nextIdx].targetX;
            const yStart = windowH * checkpoints[i].targetYOffset;
            const yEnd = windowH * checkpoints[nextIdx].targetYOffset;

            // Add gentle sinusoidal wiggle for authentic puppy trot
            const trotWiggle = Math.sin(scrollY * 0.015) * 22;

            currentCheckX = xStart + (xEnd - xStart) * progress + trotWiggle;
            currentCheckY = yStart + (yEnd - yStart) * progress;
            setFacing(xEnd >= xStart ? 'right' : 'left');
            break;
          }
        }
      }

      // Keep safely inside screen boundaries
      const clampedX = Math.min(windowW - 100, Math.max(90, currentCheckX));
      const clampedY = Math.min(windowH - 90, Math.max(120, currentCheckY));

      setPos({ x: clampedX, y: clampedY });

      // Add gentle paw print along the trail
      if (Math.random() < 0.22) {
        const newPrint = {
          id: printCounter.current++,
          x: clampedX + (Math.random() * 16 - 8),
          y: clampedY + 30 + (Math.random() * 8 - 4),
          angle: scrollDir === 'down' ? 180 : 0,
        };
        setPawPrints((prev) => [...prev.slice(-6), newPrint]);
      }

      // When scroll pauses:
      // Puppy STAYS RIGHT AT (x, y) on screen in standing pose!
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = setTimeout(() => {
        setIsActivelyWalking(false);
      }, 200);
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
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

      {/* CONTINUOUS MOVABLE PUPPY COMPANION
          - Active across every single frame of the home page
          - Stays firmly in position when scrolling pauses in pose="stand"
          - Never vanishes or clips out of bounds
      */}
      {isMovableActive && (
        <div
          className="fixed z-40 pointer-events-none transition-transform duration-75 ease-out will-change-transform drop-shadow-xl"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(145px, 16vw, 175px)',
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
