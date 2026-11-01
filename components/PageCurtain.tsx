'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function PageCurtain() {
  const pathname = usePathname();
  const router = useRouter();

  // Curtain animation state:
  // Initial load: starts at translate-y-0 and lifts after paws animate
  const [isLifting, setIsLifting] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const prevPathnameRef = useRef(pathname);
  const isNavigatingRef = useRef(false);
  const isFirstMountRef = useRef(true);

  // Initial site load animation
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      const liftTimer = setTimeout(() => {
        setIsLifting(true);
      }, 700);

      return () => clearTimeout(liftTimer);
    }
  }, []);

  // Handle route change when navigating between pages
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;

      // Scroll smoothly to top of new page under the curtain
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }

      // Replay the walking paws animation
      setAnimKey((k) => k + 1);

      if (!isNavigatingRef.current) {
        // Back/Forward browser navigation without a link click
        setIsLifting(false);
        setIsDropping(false);
      }

      // Allow paws to walk across, then smoothly lift the curtain
      const liftTimer = setTimeout(() => {
        setIsLifting(true);
        setIsDropping(false);
        isNavigatingRef.current = false;
      }, 550);

      return () => clearTimeout(liftTimer);
    }
  }, [pathname]);

  // Global Link Click listener for internal route transitions
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Ignore non-primary clicks or modifier keys (allows Cmd+click / middle-click for new tabs)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore hash anchors, mailto, tel, javascript, external links, download links
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel')?.includes('external')
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);

        // Ignore external hosts
        if (url.origin !== window.location.origin) return;

        // Ignore clicks to the exact same page
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        // Intercept navigation for smooth page curtain transition
        e.preventDefault();

        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        setIsLifting(false);
        setIsDropping(true);
        setAnimKey((k) => k + 1);

        // After curtain drops (280ms), navigate to the new page
        setTimeout(() => {
          router.push(href);
        }, 280);

        // Safety timeout so curtain never gets stuck if navigation is cancelled
        setTimeout(() => {
          if (isNavigatingRef.current) {
            setIsLifting(true);
            setIsDropping(false);
            isNavigatingRef.current = false;
          }
        }, 3000);
      } catch {
        // Fallback to normal navigation
      }
    };

    document.addEventListener('click', handleLinkClick, false);
    return () => {
      document.removeEventListener('click', handleLinkClick, false);
    };
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] transition-transform ${
        isLifting
          ? '-translate-y-full duration-700 ease-in-out pointer-events-none'
          : isDropping
          ? 'translate-y-0 duration-300 ease-out pointer-events-auto'
          : 'translate-y-0 duration-700 ease-in-out pointer-events-auto'
      }`}
    >
      <div className="absolute inset-0 bg-[#fbe3b4] flex flex-col items-center justify-center border-b-4 border-[#2a170e] shadow-2xl select-none">
        {/* Walking Paw Prints Animation */}
        <div key={animKey} className="relative flex items-center justify-center gap-6 sm:gap-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-paw-fade text-[#2a170e]"
              style={{
                animationDelay: `${i * 0.12}s`,
                transform: `rotate(${i % 2 === 0 ? '12deg' : '-12deg'}) translateY(${i % 2 === 0 ? '-6px' : '6px'})`,
              }}
            >
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </div>
          ))}
        </div>

        <p className="font-serif italic font-bold text-lg sm:text-xl text-[#2a170e] mt-6 tracking-wide animate-pulse">
          every puppy is family...
        </p>

        {/* Bottom Scalloped Border SVG */}
        <div className="absolute -bottom-6 inset-x-0 h-6 overflow-hidden">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full fill-[#fbe3b4]">
            <path d="M0,0 C150,40 350,40 500,0 C650,40 850,40 1000,0 C1150,40 1200,20 1200,0 L1200,40 L0,40 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
