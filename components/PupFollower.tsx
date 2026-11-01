'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy, { PupBuddyProps } from './PupBuddy';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [pose, setPose] = useState<NonNullable<PupBuddyProps['pose']>>('peek');
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isBehindLayer, setIsBehindLayer] = useState(true);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);

  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Smooth physical position with damped linear interpolation (LERP)
  const currentPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0.8);
  const currentOpacity = useRef(0);

  const isScrollingRef = useRef(false);
  const scrollStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const printIdRef = useRef(0);
  const lastPrintPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    let rafId: number;

    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 220);
    };

    const updateFrame = () => {
      const stopEls = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]'));
      if (!stopEls.length) {
        rafId = requestAnimationFrame(updateFrame);
        return;
      }

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const anchorY = vh * 0.48;

      // Check if user is inside the pinned Meet the pups showroom runway
      const meetSec = document.querySelector('section.tp-meet, section[aria-labelledby="meet-title"]');
      let inMeetRunway = false;
      if (meetSec) {
        const mRect = meetSec.getBoundingClientRect();
        if (mRect.top <= 80 && mRect.bottom >= vh * 0.4) {
          inMeetRunway = true;
        }
      }

      // Check if user has reached the footer basket
      const basketStop = stopEls[stopEls.length - 1];
      let atBasket = false;
      if (basketStop) {
        const bRect = basketStop.getBoundingClientRect();
        if (bRect.top <= vh * 0.85 || scrollY >= maxScroll - 70) {
          atBasket = true;
        }
      }

      // Determine if puppy should dock at a stationary stop
      let dockedIndex = -1;

      if (scrollY < 80) {
        // At top of page: docked to Hero quilt
        dockedIndex = 0;
      } else if (inMeetRunway) {
        // Inside pinned showroom: docked to runway track
        dockedIndex = 1;
      } else if (atBasket) {
        // At bottom of page: docked inside wicker basket
        dockedIndex = stopEls.length - 1;
      } else if (!isScrollingRef.current) {
        // When scrolling pauses, dock to nearest stop if within range
        let nearestIdx = -1;
        let minDist = Infinity;
        for (let i = 2; i < stopEls.length - 1; i++) {
          const r = stopEls[i].getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - anchorY);
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        }
        if (minDist < 120 && nearestIdx !== -1) {
          dockedIndex = nearestIdx;
        }
      }

      let targetX = 0;
      let targetY = 0;
      let targetScale = 0.8;
      let targetOpacity = 0;
      let nextPose: NonNullable<PupBuddyProps['pose']> = 'stand';
      let nextFacing: 'left' | 'right' = 'right';
      let nextBehind = false;

      if (dockedIndex !== -1) {
        // DOCKED MODE: Show the stationary puppy at this stop; hide all others
        stopEls.forEach((stop, idx) => {
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          if (idx === dockedIndex) {
            buddy.style.opacity = '1';
            buddy.style.visibility = 'visible';
          } else {
            buddy.style.opacity = '0';
            buddy.style.visibility = 'hidden';
          }
        });

        // Follower puppy hides when docked
        targetOpacity = 0;

        const dockedStop = stopEls[dockedIndex];
        const r = dockedStop.getBoundingClientRect();
        targetX = r.left;
        targetY = r.top;
        targetScale = (r.width || 180) / 300;
        nextFacing = (dockedStop.dataset.facing as 'left' | 'right') || 'right';
        nextBehind = dockedStop.dataset.behind === 'true';
        nextPose = (dockedStop.dataset.pose as any) || 'sit';

        const isAtBasket = dockedIndex === stopEls.length - 1;
        document.documentElement.setAttribute('data-at-basket', isAtBasket ? 'true' : 'false');
      } else {
        // ACTIVE MOVING FOLLOWER MODE:
        // Hide ALL stationary puppies so only the moving companion is on screen
        stopEls.forEach((stop) => {
          const buddy = stop.querySelector<HTMLElement>('.pup-buddy') || stop;
          buddy.style.opacity = '0';
          buddy.style.visibility = 'hidden';
        });

        document.documentElement.setAttribute('data-at-basket', 'false');
        targetOpacity = 1;

        // Find which two stops we are between in document coordinates
        const currentDocY = scrollY + anchorY;
        let fromIdx = 0;
        let toIdx = 1;

        for (let i = 0; i < stopEls.length - 1; i++) {
          const r1 = stopEls[i].getBoundingClientRect();
          const r2 = stopEls[i + 1].getBoundingClientRect();
          const docY1 = r1.top + scrollY + r1.height / 2;
          const docY2 = r2.top + scrollY + r2.height / 2;

          if (currentDocY >= docY1 && currentDocY <= docY2) {
            fromIdx = i;
            toIdx = i + 1;
            break;
          } else if (currentDocY > docY2) {
            fromIdx = i;
            toIdx = Math.min(stopEls.length - 1, i + 1);
          }
        }

        const stopA = stopEls[fromIdx];
        const stopB = stopEls[toIdx];
        const rA = stopA.getBoundingClientRect();
        const rB = stopB.getBoundingClientRect();

        const docY1 = rA.top + scrollY + rA.height / 2;
        const docY2 = rB.top + scrollY + rB.height / 2;
        const span = Math.max(1, docY2 - docY1);
        const rawT = Math.min(1, Math.max(0, (currentDocY - docY1) / span));

        // Smoothstep interpolation (3t^2 - 2t^3)
        const v = rawT * rawT * (3 - 2 * rawT);

        const xA = rA.left;
        const xB = rB.left;
        const yA = rA.top;
        const yB = rB.top;

        const scaleA = (rA.width || 180) / 300;
        const scaleB = (rB.width || 180) / 300;
        targetScale = (1 - v) * scaleA + v * scaleB;

        // Subtle organic trot sway
        const sway = Math.sin(v * Math.PI) * 16;
        targetX = (1 - v) * xA + v * xB + sway;

        // Maintain comfortable cruising elevation in viewport
        const yCruise = vh * 0.52;
        const blend = Math.sin(v * Math.PI);
        targetY = (1 - blend) * ((1 - v) * yA + v * yB) + blend * yCruise;

        const dx = xB - xA;
        nextFacing = dx >= 0 ? 'right' : 'left';
        nextPose = isScrollingRef.current ? 'walk' : 'stand';
        nextBehind = false;

        // Drop subtle 4-paw prints trail along movement path
        if (isScrollingRef.current && currentOpacity.current > 0.4) {
          const centerPupX = currentPos.current.x + 150 * currentScale.current;
          const centerPupY = currentPos.current.y + 180 * currentScale.current;
          const distSinceLast = Math.hypot(
            centerPupX - lastPrintPosRef.current.x,
            centerPupY - lastPrintPosRef.current.y
          );

          if (distSinceLast > 50) {
            lastPrintPosRef.current = { x: centerPupX, y: centerPupY };
            const rad = Math.atan2(rB.top - rA.top, rB.left - rA.left);
            const deg = (rad * 180) / Math.PI + 90;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const offsets = [
              { ox: -sin * -7 + cos * 12, oy: cos * -7 + sin * 12 },
              { ox: -sin * 7 + cos * 8, oy: cos * 7 + sin * 8 },
              { ox: -sin * -6 + cos * -8, oy: cos * -6 + sin * -8 },
              { ox: -sin * 6 + cos * -12, oy: cos * 6 + sin * -12 },
            ];

            const newPrints = offsets.map((p) => ({
              id: ++printIdRef.current,
              x: centerPupX + p.ox,
              y: centerPupY + p.oy,
              angle: deg,
            }));

            setPawPrints((prev) => [...prev.slice(-20), ...newPrints]);
          }
        }
      }

      // Damped Linear Interpolation (LERP) for velvety smooth momentum
      const LERP_FACTOR = 0.22;
      currentPos.current.x += (targetX - currentPos.current.x) * LERP_FACTOR;
      currentPos.current.y += (targetY - currentPos.current.y) * LERP_FACTOR;
      currentScale.current += (targetScale - currentScale.current) * LERP_FACTOR;
      currentOpacity.current += (targetOpacity - currentOpacity.current) * 0.28;

      // Apply direct DOM transforms for 60fps/120fps hardware acceleration
      if (actorRef.current) {
        actorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        actorRef.current.style.opacity = `${currentOpacity.current}`;
        actorRef.current.style.visibility = currentOpacity.current < 0.02 ? 'hidden' : 'visible';
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform = `scale(${Math.max(0.4, Math.min(1.4, currentScale.current))})`;
      }

      // Discrete state updates
      setPose(nextPose);
      setFacing(nextFacing);
      setIsBehindLayer(nextBehind);

      rafId = requestAnimationFrame(updateFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateFrame);

    return () => {
      document.documentElement.removeAttribute('data-at-basket');
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 4-Paw footprints trail dropped during walk */}
      <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden" aria-hidden="true">
        {pawPrints.map((p) => (
          <div
            key={p.id}
            className="absolute transition-opacity duration-1000 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
              opacity: 0.18,
            }}
          >
            <svg viewBox="0 0 64 64" width="13" height="13" fill="#c2622b">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Dynamic Moving Puppy Mascot Companion walking continuously down the screen */}
      <div
        className="pup-layer"
        data-front={!isBehindLayer}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: isBehindLayer ? 15 : 40,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          ref={actorRef}
          className="pup-actor"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform, opacity',
            pointerEvents: 'auto',
          }}
        >
          <div
            ref={bodyRef}
            className="pup-actor__body"
            style={{
              transformOrigin: '0 0',
              width: '300px',
            }}
          >
            <PupBuddy
              pose={pose}
              facing={facing}
              asStop={false}
              hideBody={pose === 'snug' || pose === 'sleep'}
            />
          </div>
        </div>
      </div>
    </>
  );
}
