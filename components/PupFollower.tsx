'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

interface PupStopMeta {
  el: HTMLElement;
  rect: DOMRect;
  pose: 'peek' | 'sit' | 'tilt' | 'bow' | 'snug' | 'walk';
  facing: 'left' | 'right';
  act?: string;
  centerY: number;
}

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [currentPose, setCurrentPose] = useState<'peek' | 'sit' | 'tilt' | 'bow' | 'snug' | 'walk'>('sit');
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [position, setPosition] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isTraveling, setIsTraveling] = useState(false);
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);
  const lastScrollY = useRef(0);
  const printCounter = useRef(0);

  useEffect(() => {
    setMounted(true);

    const updatePupPosition = () => {
      const stops = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pup-stop="true"]')
      );

      if (stops.length === 0) return;

      const viewportCenter = window.innerHeight * 0.45;
      const scrollY = window.scrollY;
      const scrollDir = scrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = scrollY;

      // Find closest stop to the viewport center
      let closestStop: HTMLElement | null = null;
      let minDistance = Infinity;

      stops.forEach((stop) => {
        const rect = stop.getBoundingClientRect();
        const dist = Math.abs(rect.top - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestStop = stop;
        }
      });

      if (closestStop) {
        const stopEl = closestStop as HTMLElement;
        const rect = stopEl.getBoundingClientRect();
        const poseAttr = (stopEl.getAttribute('data-pose') || 'sit') as any;
        const facingAttr = (stopEl.getAttribute('data-facing') || 'right') as any;

        // If the closest stop is within viewport, dock or head towards it
        const isNear = minDistance < 220;

        if (isNear) {
          setIsTraveling(false);
          setCurrentPose(poseAttr);
          setFacing(facingAttr);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            visible: true,
          });
        } else {
          // Pup is traveling smoothly between sections
          setIsTraveling(true);
          setCurrentPose('walk');
          setFacing(scrollDir === 'down' ? 'right' : 'left');

          // Smooth target floating on the right side of the screen as an escort
          const targetX = Math.min(window.innerWidth - 80, Math.max(80, window.innerWidth * 0.88));
          const targetY = viewportCenter;

          setPosition({
            x: targetX,
            y: targetY,
            visible: true,
          });

          // Occasionally leave a playful paw print
          if (Math.random() < 0.18) {
            const newPrint = {
              id: printCounter.current++,
              x: targetX + (Math.random() * 20 - 10),
              y: targetY + 30 + (Math.random() * 10 - 5),
              angle: scrollDir === 'down' ? 180 : 0,
            };
            setPawPrints((prev) => [...prev.slice(-12), newPrint]);
          }
        }
      }
    };

    window.addEventListener('scroll', updatePupPosition, { passive: true });
    window.addEventListener('resize', updatePupPosition, { passive: true });
    updatePupPosition();

    return () => {
      window.removeEventListener('scroll', updatePupPosition);
      window.removeEventListener('resize', updatePupPosition);
    };
  }, []);

  if (!mounted || !position.visible) return null;

  return (
    <>
      {/* Playful Floating Paw Prints along the screen trail */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        {pawPrints.map((p) => (
          <div
            key={p.id}
            className="absolute transition-opacity duration-1000 opacity-60"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) scale(0.65)`,
            }}
          >
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#c2622b]/40 fill-current">
              <ellipse cx="20" cy="27" rx="9" ry="8" />
              <circle cx="11" cy="14" r="3.2" />
              <circle cx="17" cy="9" r="3.5" />
              <circle cx="23" cy="9" r="3.5" />
              <circle cx="29" cy="14" r="3.2" />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Traveling Dog Mascot */}
      <div
        className={`fixed z-40 pointer-events-auto transition-all ${
          isTraveling ? 'duration-700 ease-out' : 'duration-300 ease-in-out'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isTraveling ? '110px' : '150px',
        }}
        aria-hidden="true"
      >
        <PupBuddy
          pose={currentPose}
          facing={facing}
          className={`${isTraveling ? 'animate-bounce drop-shadow-xl' : 'drop-shadow-md'}`}
        />
      </div>
    </>
  );
}
