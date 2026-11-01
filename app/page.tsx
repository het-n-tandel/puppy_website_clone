'use client';

import React from 'react';
import './home.css';
import HomeHero from '@/components/home/HomeHero';
import HomeMeet from '@/components/home/HomeMeet';
import HomePaths from '@/components/home/HomePaths';
import HomeJourney from '@/components/home/HomeJourney';
import HomeTrust from '@/components/home/HomeTrust';
import HomeFamilies from '@/components/home/HomeFamilies';
import HomeQuestions from '@/components/home/HomeQuestions';
import HomeCta from '@/components/home/HomeCta';
import PupFollower from '@/components/PupFollower';

export default function HomePage() {
  return (
    <div data-page="home" className="tp-page">
      <HomeHero />
      <HomeMeet />
      <HomePaths />
      <HomeJourney />
      <HomeTrust />
      <HomeFamilies />
      <HomeQuestions />
      <HomeCta />
      <PupFollower />
    </div>
  );
}
