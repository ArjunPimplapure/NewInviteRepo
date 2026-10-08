/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoyalWeddingDoor } from './components/RoyalWeddingDoor';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { WeddingScratchCard } from './components/WeddingScratchCard';
import { EventTimeline } from './components/EventTimeline';
import { VenueSection } from './components/VenueSection';
import { ClosingSection } from './components/ClosingSection';
import { FloatingMusicControl } from './components/FloatingMusicControl';
import { SparkleCanvas } from './components/SparkleCanvas';
import { FloatingNav } from './components/FloatingNav';
import { ASSETS } from './config/assets';

export default function App() {
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);

  const handleOpenComplete = () => {
    setIsDoorsOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayInvitation = () => {
    setIsDoorsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#2C2523] selection:bg-[#D4AF37] selection:text-[#2C2523] overflow-x-hidden botanical-watercolor-backdrop">
      
      {/* Luxury Botanical Gold Arch Backdrop Image (Matching uploaded reference image) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-75 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${ASSETS.invitationBackground})` }}
      />

      {/* Floating Celebratory Sage Leaves, Jasmine Petals & Golden Stardust */}
      <SparkleCanvas intensity={isDoorsOpen ? 'subtle' : 'celebratory'} />

      {/* Floating Gold Soundwave Music Controller */}
      <FloatingMusicControl />

      {/* 1. Full-Sized Royal Wedding Palace Doors Opening Animation */}
      {!isDoorsOpen && (
        <RoyalWeddingDoor onOpenComplete={handleOpenComplete} />
      )}

      {/* 2. Main Wedding Invitation (Revealed after palace doors open) */}
      <main
        className={`transition-all duration-1000 ease-out ${
          isDoorsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {/* Soft Sage & Gold Ambient Watercolor Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
          <div className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#526E58]/8 blur-[120px]" />
          <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
          <div className="absolute top-2/3 -left-20 w-[500px] h-[500px] rounded-full bg-[#526E58]/8 blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Botanical Gold Cathedral Arch Hero Section */}
          <HeroSection />

          {/* Live Royal Countdown Timer for 26th November */}
          <CountdownTimer />

          {/* Interactive Botanical Gold Scratch Card in Middle */}
          <WeddingScratchCard />

          {/* Events Schedule with AI Generated Visuals */}
          <EventTimeline />

          {/* Royal Venue & Location Directions */}
          <VenueSection />

          {/* Emotional Closing & Family Signature */}
          <ClosingSection onReplayInvitation={handleReplayInvitation} />
        </div>

        {/* Floating Navigation Bar */}
        <FloatingNav onReplayInvitation={handleReplayInvitation} />
      </main>

    </div>
  );
}
