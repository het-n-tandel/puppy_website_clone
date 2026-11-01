'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface PupBuddyProps {
  pose?:
    | 'peek'
    | 'sit'
    | 'tilt'
    | 'bow'
    | 'snug'
    | 'walk'
    | 'stand'
    | 'lie-happy'
    | 'curious'
    | 'sleep'
    | 'sit-turned';
  facing?: 'left' | 'right';
  label?: string;
  className?: string;
  asStop?: boolean;
  hideBody?: boolean;
}

export default function PupBuddy({
  pose = 'sit',
  facing = 'right',
  label = 'Teddy, the TeddyPups mascot',
  className = '',
  asStop = true,
  hideBody,
}: PupBuddyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isPet, setIsPet] = useState(false);
  const [heartPopped, setHeartPopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [isPerked, setIsPerked] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const barkPhrases = [
    'woof! ❤️',
    'yip! 🐾',
    'woof!',
    'I like you! 🐾',
    'peekaboo!',
    'ruff! 🐾',
    'welcome home! 🏡',
    'boing! 🐾',
  ];

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsPet(true);
    setHeartPopped(true);
    const phrase = barkPhrases[Math.floor(Math.random() * barkPhrases.length)];
    setBubbleText(phrase);
    setTimeout(() => {
      setHeartPopped(false);
    }, 1400);
    setTimeout(() => {
      setBubbleText(null);
      setIsPet(false);
    }, 2400);
  };

  // Smooth cursor tracking for puppy eyes & ear perk reaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Center of head in 300x240 SVG is at (212, 100) -> 70.67% width, 41.67% height
      const headCenterX = rect.left + rect.width * (facing === 'left' ? 0.2933 : 0.7067);
      const headCenterY = rect.top + rect.height * 0.4167;

      const dx = e.clientX - headCenterX;
      const dy = e.clientY - headCenterY;
      const dist = Math.hypot(dx, dy);

      const threshold = Math.max(130, (rect.width || 180) * 0.85);
      setIsNearby(dist < threshold);

      // Check if user is hovering buttons or interactive cards to perk ears
      const target = e.target as HTMLElement | null;
      const isOverInteractive = !!target?.closest('button, a, [data-pup-look], [role="button"], .btn');
      setIsPerked(isOverInteractive || dist < threshold);

      if (dist < 2) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      // Deflection of pupil inside eye (up to 3.2px)
      const maxShift = 3.2;
      const strength = Math.min(dist / 320, 1);
      const angle = Math.atan2(dy, dx);

      let shiftX = Math.cos(angle) * maxShift * strength;
      const shiftY = Math.sin(angle) * maxShift * strength;

      if (facing === 'left') {
        shiftX = -shiftX;
      }

      setEyeOffset({
        x: Math.round(shiftX * 10) / 10,
        y: Math.round(shiftY * 10) / 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [facing]);

  const isWalking = pose === 'walk';
  const isSnug = pose === 'snug' || pose === 'sleep';
  const isLieHappy = pose === 'lie-happy';
  const isSmiling = isHovered || isPet || isNearby || isLieHappy;
  const isSnugSleeping = isSnug && !isHovered && !isPet && !isNearby;

  // Transforms & opacities exactly matching the authentic 300x240 coordinates
  let shadowOpacity = 0.12;
  let bodyOpacity = 1;
  let haunchOpacity = 0;
  let haunchTransform = 'translate(0 0)';
  let ledgeOpacity = 0;
  let bodyTransform = 'translate(0 0) rotate(0 196 206)';
  let headTransform = 'translate(0 0) rotate(0 212 100)';
  let earLTransform = isPerked ? 'rotate(-7 174 82)' : 'rotate(0 174 82)';
  let earRTransform = isPerked ? 'rotate(7 250 82)' : 'rotate(0 250 82)';

  if (pose === 'peek') {
    // Hero: Peeking centered over quilt blanket with paws on rim
    shadowOpacity = 0;
    bodyOpacity = 0;
    haunchOpacity = 0;
    ledgeOpacity = 1;
    headTransform = 'translate(0 4) rotate(0 212 100)';
    earLTransform = 'rotate(-6 174 82)';
    earRTransform = 'rotate(6 250 82)';
  } else if (pose === 'sit') {
    // Sitting: body and haunch disappear, cute head and front paws resting in front
    shadowOpacity = 0.08;
    bodyOpacity = hideBody === false ? 1 : 0;
    haunchOpacity = hideBody === false ? 1 : 0;
    haunchTransform = 'translate(0 1.44)';
    ledgeOpacity = 1;
    headTransform = 'translate(0 2) rotate(0 212 100)';
    earLTransform = isPerked ? 'rotate(-6 174 82)' : 'rotate(-3 174 82)';
    earRTransform = isPerked ? 'rotate(6 250 82)' : 'rotate(3 250 82)';
  } else if (pose === 'sit-turned') {
    // Sitting turned: body hidden, head turned/tilted toward content
    shadowOpacity = 0.08;
    bodyOpacity = hideBody === false ? 1 : 0;
    haunchOpacity = hideBody === false ? 1 : 0;
    haunchTransform = 'translate(0 1.44)';
    ledgeOpacity = 1;
    headTransform = 'translate(6 2) rotate(10 212 100)';
    earLTransform = 'rotate(-4 174 82)';
    earRTransform = 'rotate(7 250 82)';
  } else if (pose === 'tilt' || pose === 'curious') {
    // Questions: sitting, body disappears, head tilted 16deg with curiosity looking up at '?'
    shadowOpacity = 0.08;
    bodyOpacity = hideBody === false ? 1 : 0;
    haunchOpacity = hideBody === false ? 1 : 0;
    haunchTransform = 'translate(0 1.44)';
    ledgeOpacity = 1;
    headTransform = 'translate(0 2) rotate(16 212 100)';
    earLTransform = 'rotate(-2 174 82)';
    earRTransform = 'rotate(12 250 82)';
  } else if (pose === 'bow') {
    // Playful bow on doorstep
    shadowOpacity = 0.12;
    bodyTransform = 'translate(0 2) rotate(15 196 206) translate(196 0) scale(1 1) translate(-196 0)';
    bodyOpacity = 1;
    haunchOpacity = 0;
    haunchTransform = 'translate(0 -0.9)';
    ledgeOpacity = 0;
    headTransform = 'translate(14 30) rotate(0 212 100)';
  } else if (pose === 'lie-happy') {
    // CTA: Lying down flat on tummy, paws forward, happy curved eyes ^ ^ and tail wagging
    shadowOpacity = 0.14;
    bodyTransform = 'translate(0 18) scale(1.05 0.76) rotate(0 196 206)';
    bodyOpacity = 1;
    haunchOpacity = 0;
    ledgeOpacity = 0;
    headTransform = 'translate(8 14) rotate(-3 212 100)';
    earLTransform = 'rotate(-6 174 82)';
    earRTransform = 'rotate(4 250 82)';
  } else if (pose === 'snug' || pose === 'sleep') {
    // Footer: Nestled inside wicker basket, body hidden, paws on basket rim, sleeping eyes
    shadowOpacity = 0;
    bodyOpacity = 0;
    haunchOpacity = 0;
    ledgeOpacity = 1;
    headTransform = 'translate(0 9) rotate(4 212 100)';
    earLTransform = 'rotate(-2 174 82)';
    earRTransform = 'rotate(5 250 82)';
  } else if (pose === 'walk') {
    // Meet the pups: Strolling on wooden showroom runway floor
    shadowOpacity = 0.12;
    bodyTransform = 'translate(0 0) rotate(0 196 206)';
    bodyOpacity = 1;
    haunchOpacity = 0;
    ledgeOpacity = 0;
    headTransform = 'translate(0 0) rotate(0 212 100)';
  } else if (pose === 'stand') {
    // Passport: Standing proudly beside certified guarantee stamps
    shadowOpacity = 0.12;
    bodyTransform = 'translate(0 0) rotate(0 196 206)';
    bodyOpacity = 1;
    haunchOpacity = 0;
    ledgeOpacity = 0;
    headTransform = 'translate(0 0) rotate(0 212 100)';
  }

  if (hideBody) {
    bodyOpacity = 0;
    haunchOpacity = 0;
    ledgeOpacity = 1;
    shadowOpacity = 0;
  }

  return (
    <div
      ref={containerRef}
      className={`pup-buddy relative cursor-pointer select-none transition-transform duration-300 ${
        facing === 'left' ? '-scale-x-100' : ''
      } ${className}`}
      data-facing={facing}
      data-live="true"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseEnter={() => {
        setIsHovered(true);
        if (!bubbleText) setBubbleText('🐾');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (bubbleText === '🐾') setBubbleText(null);
      }}
      title="Click or tap to play with Teddy!"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Popping Heart Animation on click */}
      {heartPopped && (
        <span className="pup-heart-pop pointer-events-none select-none" aria-hidden="true">
          ❤️
        </span>
      )}

      {/* Bobbing '?' for curious pose */}
      {pose === 'curious' && (
        <div className="pup-curious-q font-plush pointer-events-none select-none" aria-hidden="true">
          ?
        </div>
      )}

      {/* Interactive Speech Bubble */}
      <span className="pup-bubble-at">
        <span
          className="pup-bubble font-scrawl"
          data-show={bubbleText ? 'true' : 'false'}
        >
          {bubbleText || ''}
        </span>
      </span>

      {/* Authentic Canonical 300x240 Mascot SVG */}
      <svg
        viewBox="0 0 300 240"
        style={{ overflow: 'visible' }}
        role="img"
        aria-label={label}
        focusable="false"
        className="w-full h-auto block"
      >
        <g data-p="root" className="pup-breathe">
          {/* Ground Contact Shadow */}
          <ellipse
            data-p="shadow"
            cx="150"
            cy="230"
            rx="92"
            ry="7"
            fill="#2a170e"
            opacity={shadowOpacity}
            transform="translate(0 0) scale(1 1)"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />

          {/* Torso & 4 Legs Group */}
          <g
            data-p="body"
            transform={bodyTransform}
            opacity={bodyOpacity}
            className={isWalking ? 'pup-walking-bob' : ''}
          >
            {/* Back Foot Far (bf) */}
            <g data-p="bf" transform="translate(94 192)">
              <g
                className={isWalking ? 'pup-leg-swing-bf' : ''}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 12%' }}
              >
                <path
                  d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                  fill="#e4a352"
                />
                <path
                  d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M-3.5 29 v5 M4.5 29 v5"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>

            {/* Front Foot Far (ff) */}
            <g data-p="ff" transform="translate(168 192)">
              <g
                className={isWalking ? 'pup-leg-swing-ff' : ''}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 12%' }}
              >
                <path
                  d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                  fill="#e4a352"
                />
                <path
                  d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M-3.5 29 v5 M4.5 29 v5"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>

            {/* Tail */}
            <g
              data-p="tail"
              transform="rotate(-20 84 150)"
              className={isSmiling || isPet || isLieHappy ? 'pup-tail-wag' : ''}
              style={{ transformOrigin: '84px 150px' }}
            >
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#2a170e"
                strokeWidth="9"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#f2be6b"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>

            {/* Back Foot Near (bn) */}
            <g data-p="bn" transform="translate(110 194)">
              <g
                className={isWalking ? 'pup-leg-swing-bn' : ''}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 12%' }}
              >
                <path
                  d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                  fill="#f2be6b"
                />
                <path
                  d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M-3.5 27 v5 M4.5 27 v5"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>

            {/* Fluffy Body Shapes */}
            <path
              d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Front Foot Near (fn) */}
            <g data-p="fn" transform="translate(186 194)">
              <g
                className={isWalking ? 'pup-leg-swing-fn' : ''}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 12%' }}
              >
                <path
                  d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                  fill="#f2be6b"
                />
                <path
                  d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M-3.5 27 v5 M4.5 27 v5"
                  stroke="#2a170e"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>
          </g>

          {/* Sitting Haunch (Hind leg paw) */}
          <g data-p="haunch" opacity={haunchOpacity} transform={haunchTransform}>
            <path
              d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M132 222v5M139 222v5"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Head & Facial Expression Group */}
          <g
            data-p="head"
            transform={headTransform}
            style={{ transformOrigin: '212px 100px', transformBox: 'fill-box' }}
          >
            {/* Brown Collar with Heart Tag */}
            <path
              d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
              fill="#a24a1a"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
              fill="#fbe3b4"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Left Ear */}
            <path
              data-p="earL"
              d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform={earLTransform}
              style={{ transformOrigin: '174px 82px' }}
            />

            {/* Right Ear */}
            <path
              data-p="earR"
              d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform={earRTransform}
              style={{ transformOrigin: '250px 82px' }}
            />

            {/* Curly Head Contour */}
            <path
              d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Forehead Tuft */}
            <path
              d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Snout Muzzle */}
            <path
              d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
              fill="#fbe3b4"
            />

            {/* Rosy Cheeks */}
            <circle
              cx="181"
              cy="116"
              r={isSmiling ? '8.5' : '7'}
              fill={isSmiling ? '#fca5a5' : '#f9b9a6'}
              opacity="0.9"
              className="transition-all duration-300"
            />
            <circle
              cx="243"
              cy="116"
              r={isSmiling ? '8.5' : '7'}
              fill={isSmiling ? '#fca5a5' : '#f9b9a6'}
              opacity="0.9"
              className="transition-all duration-300"
            />

            {/* Sparkling Tracking Eyes */}
            <g
              data-p="eyes"
              transform={`translate(${eyeOffset.x} ${eyeOffset.y})`}
              style={{ transition: 'transform 0.08s ease-out' }}
            >
              <g data-p="open" opacity={isSmiling || isSnugSleeping ? 0 : 1}>
                <g data-p="blink" className="pup-auto-blink" transform="translate(0 0) scale(1 1)">
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
              </g>
            </g>

            {/* Happy Curved Smiling Eyes ^ ^ on smile/hover/pet */}
            <path
              data-p="happy"
              d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              opacity={isSmiling ? 1 : 0}
              className="transition-opacity duration-200"
            />

            {/* Sleeping Eyes (Closed curved downward lines) for snug basket */}
            <path
              data-p="shut"
              d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              opacity={!isSmiling && isSnugSleeping ? 1 : 0}
            />

            {/* Nose */}
            <path
              d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
              fill="#2a170e"
            />
            {/* Philtrum and Smile line */}
            <path
              d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />

            {/* Pink Tongue */}
            <path
              data-p="tongue"
              d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
              fill="#e98c8c"
              stroke="#2a170e"
              strokeWidth="2.2"
              strokeLinejoin="round"
              opacity={isSmiling ? 1 : 0.8}
            />

            {/* Open Mouth when pet */}
            <g data-p="mouth" opacity={isPet ? 1 : 0}>
              <path
                d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z"
                fill="#6b2a1c"
                stroke="#2a170e"
                strokeWidth="2.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z"
                fill="#e98c8c"
              />
            </g>
          </g>

          {/* Front Paws resting on Ledge (quilt rim or basket rim) */}
          <g data-p="ledge" opacity={ledgeOpacity}>
            <path
              d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
