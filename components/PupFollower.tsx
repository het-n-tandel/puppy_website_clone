'use client';

import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

interface StopData {
  element: HTMLElement;
  pose: string;
  act: string;
  facing: 'left' | 'right';
  targetScroll: number;
}

interface PawPrint {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function PupFollower() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pose, setPose] = useState<any>('sit');
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [isAtBasket, setIsAtBasket] = useState(false);

  const prevPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScrollYRef = useRef(0);
  const scrollStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
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

      stops = stopEls.map((el, idx) => {
        const rect = el.getBoundingClientRect();
        const docY = rect.top + scrollY + rect.height / 2;

        let targetScroll = 0;
        if (idx === 0) {
          targetScroll = 0;
        } else if (idx === stopEls.length - 1) {
          targetScroll = maxScroll;
        } else {
          // Center the stop vertically in viewport
          targetScroll = Math.max(0, Math.min(maxScroll, docY - vh * 0.5));
        }

        return {
          element: el,
          pose: el.dataset.pose || 'sit',
          act: el.dataset.act || '',
          facing: (el.dataset.facing as 'left' | 'right') || 'right',
          targetScroll,
        };
      });

      // Ensure targetScroll values are monotonically non-decreasing
      for (let i = 1; i < stops.length; i++) {
        if (stops[i].targetScroll < stops[i - 1].targetScroll) {
          stops[i].targetScroll = stops[i - 1].targetScroll + 120;
        }
      }
    };

    const handleScrollActivity = () => {
      isScrollingRef.current = true;
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 260);
    };

    // Cubic Bézier smootherstep
    const smootherstep = (t: number) => {
      const c = Math.max(0, Math.min(1, t));
      return c * c * c * (c * (6 * c - 15) + 10);
    };

    const updateFrame = () => {
      if (!stops.length) {
        measureStops();
      }

      const scrollY = window.scrollY;
      lastScrollYRef.current = scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      if (stops.length > 0) {
        // Find which pair of stops we are currently between
        let k = 0;
        for (let i = 0; i < stops.length - 1; i++) {
          if (scrollY >= stops[i].targetScroll) {
            k = i;
          }
        }

        const stopA = stops[k];
        const stopB = stops[Math.min(k + 1, stops.length - 1)];

        const range = Math.max(1, stopB.targetScroll - stopA.targetScroll);
        const rawT = (scrollY - stopA.targetScroll) / range;

        // Hold range: stay resting if within 18% of either stop
        const holdThreshold = 0.18;
        let v = 0;
        let isHolding = false;

        if (k === stops.length - 1 || rawT <= holdThreshold) {
          v = 0;
          isHolding = true;
        } else if (rawT >= 1 - holdThreshold) {
          v = 1;
          isHolding = true;
        } else {
          v = (rawT - holdThreshold) / (1 - 2 * holdThreshold);
          v = smootherstep(v);
        }

        let targetScreenX = 0;
        let targetScreenY = 0;
        let activePose = stopA.pose;
        let activeFacing = stopA.facing;

        // Check if currently holding in the footer basket (last stop)
        const isHoldingAtLastStop = (k === stops.length - 1 || (k === stops.length - 2 && v === 1 && isHolding));
        setIsAtBasket(isHoldingAtLastStop);

        if (isHolding && v === 0) {
          // Locked to Stop A directly from its live DOM bounding box
          const rA = stopA.element.getBoundingClientRect();
          targetScreenX = rA.left + rA.width / 2;
          targetScreenY = rA.top + rA.height / 2;
          activePose = stopA.pose;
          activeFacing = stopA.facing;
        } else if (isHolding && v === 1) {
          // Locked to Stop B directly from its live DOM bounding box
          const rB = stopB.element.getBoundingClientRect();
          targetScreenX = rB.left + rB.width / 2;
          targetScreenY = rB.top + rB.height / 2;
          activePose = stopB.pose;
          activeFacing = stopB.facing;
        } else {
          // In transit between Stop A and Stop B along cubic Bézier curve
          const rA = stopA.element.getBoundingClientRect();
          const rB = stopB.element.getBoundingClientRect();

          const docAx = rA.left + rA.width / 2;
          const docAy = rA.top + scrollY + rA.height / 2;

          const docBx = rB.left + rB.width / 2;
          const docBy = rB.top + scrollY + rB.height / 2;

          const dx = docBx - docAx;
          const dy = docBy - docAy;
          const hDist = Math.max(0.45 * Math.abs(dx), 40);
          const dir = dx >= 0 ? 1 : -1;

          // Natural Bézier control points
          const c1x = docAx + dir * hDist;
          const c1y = docAy + dy * 0.28;
          const c2x = docBx - dir * hDist;
          const c2y = docAy + dy * 0.72;

          // Cubic Bézier formula
          const omt = 1 - v;
          const posX =
            omt * omt * omt * docAx +
            3 * omt * omt * v * c1x +
            3 * omt * v * v * c2x +
            v * v * v * docBx;
          const posY =
            omt * omt * omt * docAy +
            3 * omt * omt * v * c1y +
            3 * omt * v * v * c2y +
            v * v * v * docBy;

          // Convert document position to screen viewport coordinates
          targetScreenX = posX;
          targetScreenY = posY - scrollY;

          // Orientation during transit
          const diffX = targetScreenX - prevPosRef.current.x;
          if (diffX > 0.4) {
            activeFacing = 'right';
          } else if (diffX < -0.4) {
            activeFacing = 'left';
          } else {
            activeFacing = prevPosRef.current.x < docBx ? 'right' : 'left';
          }

          // Active locomotion vs paused standing
          if (isScrollingRef.current) {
            activePose = 'walk';
          } else {
            activePose = 'stand'; // Paused while scrolling: stands proudly on 4 paws
          }

          // Drop subtle 4-paw quadruped prints along travel path
          const distFromLastPrint = Math.hypot(
            posX - lastPrintPosRef.current.x,
            posY - lastPrintPosRef.current.y
          );
          if (distFromLastPrint > 52 && isScrollingRef.current) {
            lastPrintPosRef.current = { x: posX, y: posY };
            const rad = Math.atan2(dy, dx);
            const angle = (rad * 180) / Math.PI + 90;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            // 4 distinct paws per stride (FL, FR, HL, HR)
            const quadPaws = [
              { ox: -sin * -8 + cos * 14, oy: cos * -8 + sin * 14 },
              { ox: -sin * 8 + cos * 10, oy: cos * 8 + sin * 10 },
              { ox: -sin * -7 + cos * -10, oy: cos * -7 + sin * -10 },
              { ox: -sin * 7 + cos * -14, oy: cos * 7 + sin * -14 },
            ];

            const newPrints = quadPaws.map((p) => ({
              id: ++printIdRef.current,
              x: targetScreenX + p.ox,
              y: targetScreenY + 36 + p.oy,
              angle,
            }));

            setPawPrints((prev) => [...prev.slice(-24), ...newPrints]);
          }
        }

        // Clamp safely inside viewport so puppy is never cut off
        const marginX = 80;
        const marginY = 60;
        const clampedX = Math.max(marginX, Math.min(vw - marginX, targetScreenX));
        const clampedY = Math.max(marginY, Math.min(vh - marginY, targetScreenY));

        prevPosRef.current = { x: clampedX, y: clampedY };
        setPos({ x: clampedX, y: clampedY });
        setPose(activePose);
        setFacing(activeFacing);
      }

      rafId = requestAnimationFrame(updateFrame);
    };

    measureStops();
    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('resize', measureStops);
    rafId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('scroll', handleScrollActivity);
      window.removeEventListener('resize', measureStops);
      cancelAnimationFrame(rafId);
      if (scrollStopTimeoutRef.current) clearTimeout(scrollStopTimeoutRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 4-Paw subtle light footprints trail */}
      <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden" aria-hidden="true">
        {pawPrints.map((p) => (
          <div
            key={p.id}
            className="absolute transition-opacity duration-1000 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
              opacity: 0.16, // Very light and delicate
            }}
          >
            <svg viewBox="0 0 64 64" width="14" height="14" fill="#c2622b">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* The ONE and ONLY visible Puppy Traveling Companion */}
      <div
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={`absolute will-change-transform transition-all duration-150 ease-out ${
            isAtBasket ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            width: 'clamp(14rem, 18vw, 17.5rem)',
          }}
        >
          <PupBuddy
            pose={pose}
            facing={facing}
            label="Teddy, your puppy companion"
          />
        </div>
      </div>
    </>
  );
}
