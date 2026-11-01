'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy, { PupBuddyProps } from './PupBuddy';

interface StopData {
  element: HTMLElement;
  pose: NonNullable<PupBuddyProps['pose']>;
  facing: 'left' | 'right';
  isBehind: boolean;
  enterScroll: number;
  exitScroll: number;
}

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
  const currentOpacity = useRef(1);

  const isScrollingRef = useRef(false);
  const scrollStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const printIdRef = useRef(0);
  const lastPrintPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    let rafId: number;
    let stops: StopData[] = [];

    const measureStops = () => {
      const stopEls = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]'));
      if (!stopEls.length) return;

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

      // Lock initial position to Stop 0 if at top of page
      if (scrollY < 50 && stopEls[0]) {
        const r0 = stopEls[0].getBoundingClientRect();
        currentPos.current = { x: r0.left, y: r0.top };
        currentScale.current = (r0.width || 180) / 300;
        setPose((stopEls[0].dataset.pose as any) || 'peek');
        setFacing((stopEls[0].dataset.facing as any) || 'right');
        setIsBehindLayer(stopEls[0].dataset.behind === 'true');
      }

      // Measure document position for each stop
      const rawStops = stopEls.map((el, idx) => {
        const r = el.getBoundingClientRect();
        const docY = r.top + scrollY;

        let idealScroll = 0;
        if (idx === 0) {
          idealScroll = 0;
        } else if (idx === stopEls.length - 1) {
          idealScroll = maxScroll;
        } else {
          idealScroll = Math.max(0, Math.min(maxScroll, docY - vh * 0.45));
        }

        return {
          element: el,
          pose: (el.dataset.pose as any) || 'sit',
          facing: (el.dataset.facing as 'left' | 'right') || 'right',
          isBehind: el.dataset.behind === 'true',
          idealScroll,
        };
      });

      // Ensure monotonically non-decreasing scroll order
      for (let i = 1; i < rawStops.length; i++) {
        if (rawStops[i].idealScroll <= rawStops[i - 1].idealScroll) {
          rawStops[i].idealScroll = rawStops[i - 1].idealScroll + 60;
        }
      }

      // Assign holding windows
      stops = rawStops.map((s, idx) => {
        let enterScroll = 0;
        let exitScroll = 0;

        if (idx === 0) {
          enterScroll = 0;
          exitScroll = Math.min(vh * 0.35, 260);
        } else if (idx === rawStops.length - 1) {
          enterScroll = Math.max(0, maxScroll - vh * 0.45);
          exitScroll = maxScroll + 2000;
        } else {
          const holdHalf = 80;
          enterScroll = Math.max(0, s.idealScroll - holdHalf);
          exitScroll = s.idealScroll + holdHalf;
        }

        return {
          element: s.element,
          pose: s.pose,
          facing: s.facing,
          isBehind: s.isBehind,
          enterScroll,
          exitScroll: Math.max(enterScroll, exitScroll),
        };
      });

      // Keep windows orderly
      for (let i = 1; i < stops.length; i++) {
        if (stops[i].enterScroll < stops[i - 1].exitScroll) {
          stops[i].enterScroll = stops[i - 1].exitScroll + 30;
          stops[i].exitScroll = Math.max(stops[i].enterScroll, stops[i].exitScroll);
        }
      }
    };

    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 220);
    };

    const updateFrame = () => {
      if (!stops.length) {
        measureStops();
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

      if (stops.length > 0) {
        // Detect if user is inside the pinned Meet the pups runway
        const meetSec = document.querySelector('section.tp-meet, section[aria-labelledby="meet-title"]');
        let inMeetRunway = false;
        if (meetSec) {
          const mRect = meetSec.getBoundingClientRect();
          if (mRect.top <= 80 && mRect.bottom >= vh * 0.4) {
            inMeetRunway = true;
          }
        }

        // Check if resting at any stop
        let currentStopIdx = -1;
        let isHolding = false;

        for (let i = 0; i < stops.length; i++) {
          if (scrollY >= stops[i].enterScroll && scrollY <= stops[i].exitScroll) {
            currentStopIdx = i;
            isHolding = true;
            break;
          }
        }

        let targetX = 0;
        let targetY = 0;
        let targetScale = 0.8;
        const targetOpacity = inMeetRunway ? 0 : 1;
        let nextPose: NonNullable<PupBuddyProps['pose']> = 'stand';
        let nextFacing: 'left' | 'right' = 'right';
        let nextBehind = false;

        if (isHolding && currentStopIdx >= 0) {
          const stop = stops[currentStopIdx];
          const r = stop.element.getBoundingClientRect();
          targetX = r.left;
          targetY = r.top;
          targetScale = (r.width || 180) / 300;
          nextFacing = (stop.element.dataset.facing as 'left' | 'right') || stop.facing;
          nextBehind = stop.isBehind;
          nextPose = (stop.element.dataset.pose as any) || stop.pose;
        } else {
          // Traveling between stops[k] and stops[k+1]
          let k = 0;
          for (let i = 0; i < stops.length - 1; i++) {
            if (scrollY > stops[i].exitScroll) {
              k = i;
            }
          }

          const stopA = stops[k];
          const stopB = stops[Math.min(k + 1, stops.length - 1)];

          const travelRange = Math.max(1, stopB.enterScroll - stopA.exitScroll);
          const rawT = Math.max(0, Math.min(1, (scrollY - stopA.exitScroll) / travelRange));

          // Ken Perlin's quintic smootherstep: 6t^5 - 15t^4 + 10t^3 (zero jerk departure & arrival)
          const v = rawT * rawT * rawT * (rawT * (rawT * 6 - 15) + 10);

          const rA = stopA.element.getBoundingClientRect();
          const rB = stopB.element.getBoundingClientRect();

          const scaleA = (rA.width || 180) / 300;
          const scaleB = (rB.width || 180) / 300;
          targetScale = (1 - v) * scaleA + v * scaleB;

          // Horizontal movement with gentle organic sway
          const sway = Math.sin(v * Math.PI) * 14;
          targetX = (1 - v) * rA.left + v * rB.left + sway;

          // Comfortable cruising height in viewport
          const yCruise = vh * 0.56;
          if (rawT < 0.25) {
            const alpha = rawT / 0.25;
            targetY = (1 - alpha) * rA.top + alpha * yCruise;
          } else if (rawT > 0.75) {
            const alpha = (rawT - 0.75) / 0.25;
            targetY = (1 - alpha) * yCruise + alpha * rB.top;
          } else {
            targetY = yCruise + (isScrollingRef.current ? Math.sin(scrollY * 0.04) * 3 : 0);
          }

          const dx = rB.left - rA.left;
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

            if (distSinceLast > 48) {
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

        // Basket state check
        const isAtBasket = (currentStopIdx === stops.length - 1 && isHolding) || scrollY >= maxScroll - 60;
        document.documentElement.setAttribute('data-at-basket', isAtBasket ? 'true' : 'false');
        document.documentElement.setAttribute('data-pup', 'true');

        // Damped Linear Interpolation (LERP) for velvety smooth momentum
        const LERP_FACTOR = 0.16;
        currentPos.current.x += (targetX - currentPos.current.x) * LERP_FACTOR;
        currentPos.current.y += (targetY - currentPos.current.y) * LERP_FACTOR;
        currentScale.current += (targetScale - currentScale.current) * LERP_FACTOR;
        currentOpacity.current += (targetOpacity - currentOpacity.current) * 0.25;

        // Apply direct DOM transforms for 60fps/120fps hardware acceleration
        if (actorRef.current) {
          actorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
          actorRef.current.style.opacity = `${currentOpacity.current}`;
          actorRef.current.style.visibility = currentOpacity.current < 0.02 ? 'hidden' : 'visible';
        }
        if (bodyRef.current) {
          bodyRef.current.style.transform = `scale(${Math.max(0.4, Math.min(1.4, currentScale.current))})`;
        }

        // Discrete state updates (only re-renders React when changing visual pose)
        setPose(nextPose);
        setFacing(nextFacing);
        setIsBehindLayer(nextBehind);
      }

      rafId = requestAnimationFrame(updateFrame);
    };

    measureStops();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureStops);
    rafId = requestAnimationFrame(updateFrame);

    return () => {
      document.documentElement.removeAttribute('data-pup');
      document.documentElement.removeAttribute('data-at-basket');
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureStops);
      cancelAnimationFrame(rafId);
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 4-Paw footprints trail */}
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

      {/* Dynamic Moving Puppy Mascot Companion */}
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
