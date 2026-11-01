'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Damped linear interpolation for velvety smooth lagging follower
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
        'a, button, input, textarea, select, [role="button"], .btn, .tp-door, .pup-buddy, .tp-qa, .tp-lineup__seat, .tp-photowall__print, .tp-stamp, .cursor-pointer'
      );
      isHoveringRef.current = isInteractive;
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // Smooth lagging follower loop (damped LERP lag)
    const updateCursor = () => {
      const LERP = 0.24;
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
    /* Exactly ONE cartoon puppy paw custom cursor - Warm brand colors */
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
  );
}
