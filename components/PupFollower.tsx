'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPose, setCurrentPose] = useState<'peek' | 'sit' | 'tilt' | 'bow' | 'snug' | 'walk'>('sit');
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isWalking, setIsWalking] = useState(false);
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  const lastScrollY = useRef(0);
  const walkTimeout = useRef<NodeJS.Timeout | null>(null);
  const printCounter = useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDir = scrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = scrollY;

      // 1. IN LANDING PAGE (Hero section, scrollY < 260):
      // Mascot sits naturally in the center of the hero quilt!
      // The follower overlay must stay hidden.
      if (scrollY < 260) {
        setVisible(false);
        setIsWalking(false);
        return;
      }

      // 2. AFTER SCROLL: Mascot follows the user down the page
      setVisible(true);
      setIsWalking(true);
      setCurrentPose('walk');
      setFacing(scrollDir === 'down' ? 'right' : 'left');

      if (walkTimeout.current) clearTimeout(walkTimeout.current);
      walkTimeout.current = setTimeout(() => {
        setIsWalking(false);
        // Find which section stop is closest
        const stops = Array.from(
          document.querySelectorAll<HTMLElement>('[data-pup-stop="true"]')
        );
        const center = window.innerHeight * 0.45;
        let closest = stops[0];
        let minDist = Infinity;

        stops.forEach((s) => {
          const rect = s.getBoundingClientRect();
          const d = Math.abs(rect.top - center);
          if (d < minDist) {
            minDist = d;
            closest = s;
          }
        });

        if (closest) {
          const pose = closest.getAttribute('data-pose') as any;
          setCurrentPose(pose || 'sit');
        } else {
          setCurrentPose('sit');
        }
      }, 350);

      // Follow smoothly docked at comfortable side margin
      const rightX = Math.min(window.innerWidth - 75, Math.max(75, window.innerWidth * 0.92));
      const targetY = window.innerHeight * 0.55;

      setPos({ x: rightX, y: targetY });

      // Leave gentle paw prints along trail
      if (Math.random() < 0.22) {
        const newPrint = {
          id: printCounter.current++,
          x: rightX + (Math.random() * 20 - 10),
          y: targetY + 28 + (Math.random() * 10 - 5),
          angle: scrollDir === 'down' ? 180 : 0,
        };
        setPawPrints((prev) => [...prev.slice(-8), newPrint]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (walkTimeout.current) clearTimeout(walkTimeout.current);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* Light Fading Paw Prints Trail */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        {pawPrints.map((p) => (
          <div
            key={p.id}
            className="absolute transition-opacity duration-1000 opacity-50"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) scale(0.6)`,
            }}
          >
            <svg viewBox="0 0 40 40" className="w-5 h-5 text-[#c2622b]/50 fill-current">
              <ellipse cx="20" cy="27" rx="9" ry="8" />
              <circle cx="11" cy="14" r="3.2" />
              <circle cx="17" cy="9" r="3.5" />
              <circle cx="23" cy="9" r="3.5" />
              <circle cx="29" cy="14" r="3.2" />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Traveling Dog Mascot Follower */}
      <div
        className="fixed z-40 pointer-events-auto transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isWalking ? '105px' : '125px',
        }}
        aria-hidden="true"
      >
        <PupBuddy
          pose={currentPose}
          facing={facing}
          className={`${isWalking ? 'animate-bounce drop-shadow-xl' : 'drop-shadow-md'}`}
        />
      </div>
    </>
  );
}
