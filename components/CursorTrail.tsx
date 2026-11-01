'use client';

import React, { useEffect, useState } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    // Only enable click animation on pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let idCounter = 0;

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: ++idCounter,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping duration-500 opacity-60"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #c2622b',
            backgroundColor: '#f2be6b40',
          }}
        />
      ))}
    </div>
  );
}
