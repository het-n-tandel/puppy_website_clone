'use client';

import React, { useState } from 'react';
import PupBuddy, { PupBuddyProps } from '@/components/PupBuddy';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';

interface PoseItem {
  id: NonNullable<PupBuddyProps['pose']>;
  name: string;
  section: string;
  description: string;
  bg: string;
}

const POSES: PoseItem[] = [
  {
    id: 'peek',
    name: 'PEEK',
    section: 'Section 1: Hero',
    description: 'Only head and front paws visible over the scalloped blanket rim, body concealed.',
    bg: '#fffdf8',
  },
  {
    id: 'stand',
    name: 'STAND',
    section: 'Section 3 & 5: Signpost & Passport',
    description: 'Standing proudly on all four paws with thick 4px dark-brown outlines and collar.',
    bg: '#fff1d8',
  },
  {
    id: 'walk',
    name: 'WALK',
    section: 'Section 2: Showroom Runway',
    description: '4-leg alternating leg swing cycle, flippable left/right with wagging tail.',
    bg: '#fbe3b4',
  },
  {
    id: 'sit',
    name: 'SIT',
    section: 'Section 4 & 6: Journey & Families',
    description: 'Sitting neatly with body retracted and front paws resting cutely in front.',
    bg: '#f7d18d',
  },
  {
    id: 'sit-turned',
    name: 'SIT-TURNED',
    section: 'Interactive Journey',
    description: 'Sitting with head turned and angled attentively toward interactive elements.',
    bg: '#f0b866',
  },
  {
    id: 'curious',
    name: 'CURIOUS',
    section: 'Section 7: FAQ',
    description: '16° curious head tilt with a floating, bobbing gold question mark (?) over head.',
    bg: '#4d2b19',
  },
  {
    id: 'lie-happy',
    name: 'LIE-HAPPY',
    section: 'Section 8: Final Cottage CTA',
    description: 'Lying down on tummy, paws stretched forward, smiling curved eyes (^ ^), wagging tail.',
    bg: '#2f1a10',
  },
  {
    id: 'sleep',
    name: 'SLEEP / SNUG',
    section: 'Section 9: Footer Wicker Basket',
    description: 'Curled inside the basket, paws on rim, sleeping closed eyes, floating "z z z" ascending.',
    bg: '#24130b',
  },
  {
    id: 'bow',
    name: 'BOW',
    section: 'Greeting',
    description: 'Playful play-bow greeting on the doorstep welcoming visitors home.',
    bg: '#5a3320',
  },
];

export default function MascotGalleryPage() {
  const [facing, setFacing] = useState<'left' | 'right'>('right');

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#2a170e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation back to landing page */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a170e]/15">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#a24a1a] hover:text-[#8e3f15] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </Link>

          <div className="flex items-center gap-2 bg-[#fff1d8] px-3.5 py-1.5 rounded-full border border-[#2a170e]/20 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#c2622b]" />
            <span>Interactive Mascot Pose Gallery</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-scrawl text-sm uppercase tracking-widest text-[#a24a1a] font-bold">
            Original SVG Character Artwork
          </span>
          <h1 className="font-plush text-4xl sm:text-5xl font-black mt-2 text-[#2a170e]">
            Teddy Mascot Pose Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5a3a28]">
            Original flat-vector Maltipoo/poodle mascot created with layered SVG groups. Click or tap any pose to hear a bark and see the heart pop!
          </p>

          {/* Facing Direction Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[#fff8ea] p-1.5 rounded-full border-2 border-[#2a170e]">
            <span className="text-xs font-bold pl-3 pr-1 text-[#2a170e]/70">Facing:</span>
            <button
              onClick={() => setFacing('left')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                facing === 'left'
                  ? 'bg-[#a24a1a] text-white shadow-sm'
                  : 'text-[#2a170e] hover:bg-[#2a170e]/5'
              }`}
            >
              Left 👈
            </button>
            <button
              onClick={() => setFacing('right')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                facing === 'right'
                  ? 'bg-[#a24a1a] text-white shadow-sm'
                  : 'text-[#2a170e] hover:bg-[#2a170e]/5'
              }`}
            >
              Right 👉
            </button>
          </div>
        </div>

        {/* Gallery Grid of 9 Poses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSES.map((pose) => (
            <div
              key={pose.id}
              className="bg-[#fffdf8] rounded-3xl border-3 border-[#2a170e] shadow-[6px_8px_0_#2a170e24] overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* Mascot Showcase Stage */}
              <div
                className="relative h-64 flex items-center justify-center p-6 border-b-3 border-[#2a170e]"
                style={{
                  background: pose.id === 'curious' || pose.id === 'lie-happy' || pose.id === 'sleep' || pose.id === 'bow'
                    ? `radial-gradient(circle, ${pose.bg} 0%, #1a0e07 100%)`
                    : `radial-gradient(circle, ${pose.bg} 0%, #fbe3b4 100%)`,
                }}
              >
                <div className="w-48 max-w-full">
                  <PupBuddy
                    pose={pose.id}
                    facing={facing}
                    asStop={false}
                    label={`Teddy in ${pose.name} pose`}
                  />
                </div>
              </div>

              {/* Pose Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-scrawl text-xs font-bold text-[#c2622b]">
                      {pose.section}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#fbe3b4] font-bold text-[#2a170e]">
                      {pose.id}
                    </span>
                  </div>
                  <h2 className="font-plush text-2xl font-bold text-[#2a170e]">
                    {pose.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#5a3a28] leading-relaxed">
                    {pose.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#2a170e]/10 flex items-center justify-between text-xs text-[#2a170e]/70">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>Click puppy to interact</span>
                  </span>
                  <span>SVG Layered</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Card */}
        <div className="mt-16 bg-[#fff1d8] rounded-3xl border-3 border-[#2a170e] p-8 shadow-[6px_8px_0_#2a170e24]">
          <h2 className="font-plush text-2xl sm:text-3xl font-bold text-[#2a170e] mb-4">
            Mascot Engineering Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-[#fffdf8] p-4 rounded-2xl border-2 border-[#2a170e]/20">
              <span className="font-bold text-[#a24a1a] block mb-1">Always-on Idle Motion</span>
              <p className="text-[#5a3a28]">
                Auto-blinks every 3.8s, wags tail, ear-flops, and breathes gently with 1.02 scaleY transform.
              </p>
            </div>
            <div className="bg-[#fffdf8] p-4 rounded-2xl border-2 border-[#2a170e]/20">
              <span className="font-bold text-[#a24a1a] block mb-1">Interactive Reactions</span>
              <p className="text-[#5a3a28]">
                Pupils deflect smoothly tracking cursor; ears perk up when hovering buttons or cards; tap pops hearts and speech bubble.
              </p>
            </div>
            <div className="bg-[#fffdf8] p-4 rounded-2xl border-2 border-[#2a170e]/20">
              <span className="font-bold text-[#a24a1a] block mb-1">Scroll-Driven Follower</span>
              <p className="text-[#5a3a28]">
                Moves dynamically across landing page sections with Perlin quintic smootherstep and damped LERP interpolation.
              </p>
            </div>
            <div className="bg-[#fffdf8] p-4 rounded-2xl border-2 border-[#2a170e]/20">
              <span className="font-bold text-[#a24a1a] block mb-1">Accessible & High Perf</span>
              <p className="text-[#5a3a28]">
                100% SVG, hardware-accelerated transforms, respects prefers-reduced-motion, aria-hidden decoration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
