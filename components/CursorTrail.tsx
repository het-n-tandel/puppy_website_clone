'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const isLeftPaw = useRef(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!lastPos.current) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Drop footprints every 28px traveled
      if (dist >= 28) {
        // Calculate travel angle aligned with cursor movement direction
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        // Interpolate steps if moved fast (up to 3 steps per event)
        const steps = Math.min(Math.floor(dist / 28), 3);

        for (let i = 1; i <= steps; i++) {
          const ratio = i / steps;
          const posX = lastPos.current.x + dx * ratio;
          const posY = lastPos.current.y + dy * ratio;

          isLeftPaw.current = !isLeftPaw.current;

          // Natural outward toe tilt for left vs right puppy paw (-8 deg vs +8 deg)
          const pawTilt = isLeftPaw.current ? -8 : 8;
          const finalAngle = angle + pawTilt;

          // Alternate left and right puppy paws perpendicular to travel path
          const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;
          const sideOffset = isLeftPaw.current ? -7 : 7;
          const offsetX = Math.cos(perpAngle) * sideOffset;
          const offsetY = Math.sin(perpAngle) * sideOffset;

          // Keep maximum 32 footprint elements active to prevent DOM bloat
          if (container.children.length > 32) {
            container.firstElementChild?.remove();
          }

          const paw = document.createElement('div');
          paw.className = 'tp-cursor-paw-print';

          paw.style.left = `${(posX + offsetX).toFixed(1)}px`;
          paw.style.top = `${(posY + offsetY).toFixed(1)}px`;
          // Explicitly set BOTH --paw-rot custom property and inline transform
          paw.style.setProperty('--paw-rot', `${finalAngle.toFixed(1)}deg`);
          paw.style.transform = `translate(-50%, -50%) rotate(${finalAngle.toFixed(1)}deg)`;

          // Brand toffee paw print icon
          paw.innerHTML = `
            <svg viewBox="0 0 64 64" width="16" height="16" fill="#c2622b" class="tp-cursor-paw-svg">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          `;

          container.appendChild(paw);

          setTimeout(() => {
            paw.remove();
          }, 950);
        }

        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Dynamic click ripple paw
      const clickPaw = document.createElement('div');
      clickPaw.className = 'tp-cursor-paw-print';
      clickPaw.style.left = `${e.clientX}px`;
      clickPaw.style.top = `${e.clientY}px`;
      clickPaw.style.setProperty('--paw-rot', '0deg');
      clickPaw.style.transform = `translate(-50%, -50%) rotate(0deg)`;

      clickPaw.innerHTML = `
        <svg viewBox="0 0 64 64" width="22" height="22" fill="#a24a1a" class="tp-cursor-paw-svg animate-ping opacity-60">
          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
        </svg>
      `;

      container.appendChild(clickPaw);

      setTimeout(() => {
        clickPaw.remove();
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
