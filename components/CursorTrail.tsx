'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const isLeftPaw = useRef(false);

  // Smooth lagging follower position
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check if hovering interactive elements to perk the paw
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'a, button, input, textarea, select, [role="button"], .btn, .tp-door, .pup-buddy, .tp-qa, .tp-lineup__seat, .tp-photowall__print, .tp-stamp'
      );
      isHoveringRef.current = isInteractive;

      if (!lastPos.current) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        currentPos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Drop a subtle paw print trail every 26px traveled
      if (dist >= 26) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        isLeftPaw.current = !isLeftPaw.current;

        const container = containerRef.current;
        if (container) {
          const paw = document.createElement('div');
          paw.className = 'tp-cursor-paw-print';

          // Calculate travel angle aligned with movement direction
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          const sideOffset = isLeftPaw.current ? -7 : 7;
          const moveRad = Math.atan2(dy, dx);
          const offsetX = -Math.sin(moveRad) * sideOffset;
          const offsetY = Math.cos(moveRad) * sideOffset;

          paw.style.left = `${e.clientX + offsetX}px`;
          paw.style.top = `${e.clientY + offsetY}px`;
          paw.style.setProperty('--paw-rot', `${angle.toFixed(1)}deg`);
          paw.style.transform = `translate(-50%, -50%) rotate(${angle.toFixed(1)}deg)`;

          paw.innerHTML = `
            <svg viewBox="0 0 64 64" width="16" height="16" fill="#c2622b" opacity="0.45">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          `;

          container.appendChild(paw);

          setTimeout(() => {
            if (paw.parentNode === container) {
              container.removeChild(paw);
            }
          }, 1100);
        }
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // Smooth lagging follower loop (damped LERP lag)
    const updateCursor = () => {
      const LERP = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * LERP;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * LERP;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
        if (isHoveringRef.current) {
          cursorRef.current.classList.add('is-hovering');
        } else {
          cursorRef.current.classList.remove('is-hovering');
        }
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <>
      {/* Falling pawprints container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden" aria-hidden="true" />

      {/* Lagging cartoon puppy paw custom cursor - Warm brand colors */}
      <div
        ref={cursorRef}
        className={`tp-cursor-follower pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform ${
          visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          width="28"
          height="28"
          className="transition-transform duration-200 ease-out drop-shadow-md"
        >
          {/* Main paw pad - Warm apricot with dark cocoa border */}
          <path
            d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z"
            fill="#e2943b"
            stroke="#2a170e"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Subtle inner highlight */}
          <ellipse cx="32" cy="40" rx="6" ry="4" fill="#f5c278" opacity="0.8" />
          {/* 4 toe beans - Peach cream with dark cocoa border */}
          <ellipse cx="15.5" cy="28.5" rx="5" ry="6.5" transform="rotate(-28 15.5 28.5)" fill="#fdebd0" stroke="#2a170e" strokeWidth="2.8" />
          <ellipse cx="25" cy="18" rx="5.2" ry="7" transform="rotate(-10 25 18)" fill="#fdebd0" stroke="#2a170e" strokeWidth="2.8" />
          <ellipse cx="39" cy="18" rx="5.2" ry="7" transform="rotate(10 39 18)" fill="#fdebd0" stroke="#2a170e" strokeWidth="2.8" />
          <ellipse cx="48.5" cy="28.5" rx="5" ry="6.5" transform="rotate(28 48.5 28.5)" fill="#fdebd0" stroke="#2a170e" strokeWidth="2.8" />
        </svg>
      </div>
    </>
  );
}
