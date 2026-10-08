import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audioPlayer';
import { ASSETS } from '../config/assets';

interface RoyalWeddingDoorProps {
  onOpenComplete: () => void;
}

export const RoyalWeddingDoor: React.FC<RoyalWeddingDoorProps> = ({ onOpenComplete }) => {
  const [doorState, setDoorState] = useState<'closed' | 'tapping' | 'swinging' | 'entering' | 'completed'>('closed');

  const handleOpenDoors = () => {
    if (doorState !== 'closed') return;

    // 1. Immediately trigger background audio on user interaction
    weddingAudio.startMusic();

    // 2. Begin choreographed realistic door opening sequence
    setDoorState('tapping');

    // Royal shower of white jasmine petals, sage leaves, and golden stardust
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.52 },
      colors: ['#D4AF37', '#758E7B', '#F5E0A0', '#FFFDF9', '#B88E3E'],
      shapes: ['circle'],
    });

    // Doors begin swinging open smoothly in 3D
    setTimeout(() => {
      setDoorState('swinging');
    }, 380);

    // Camera smoothly glides forward through the open doorway
    setTimeout(() => {
      setDoorState('entering');
    }, 2000);

    // Complete transition to main invitation
    setTimeout(() => {
      setDoorState('completed');
      onOpenComplete();
    }, 2750);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenDoors();
    }
  };

  const isSwinging = doorState === 'swinging' || doorState === 'entering' || doorState === 'completed';
  const isEntering = doorState === 'entering' || doorState === 'completed';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 select-none ${
        doorState === 'completed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#F7F6F2',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #FCFBF7 0%, #F4F2EC 65%, #E9E6DC 100%)
        `,
      }}
      onClick={handleOpenDoors}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Wedding Palace Doors. Click or press Enter to open the doors."
    >
      {/* ================================================================= */}
      {/* RADIANT CELEBRATION LIGHT (Revealed as doors open)                */}
      {/* ================================================================= */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 pointer-events-none ${
          isSwinging ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
        }`}
      >
        {/* Soft heavenly golden sunlight & garden terrace atmosphere */}
        <div className="w-[95vw] max-w-[1100px] h-[95vh] rounded-full bg-gradient-to-tr from-[#FFF2CC] via-[#FFFDF9] to-[#FCECD8] blur-[70px]" />
      </div>

      {/* ================================================================= */}
      {/* MAIN ARCHED DOOR PORTAL (Matching botanical ivory and gold theme) */}
      {/* ================================================================= */}
      <div
        className={`relative w-full h-full max-w-[480px] sm:max-w-[530px] max-h-[96vh] sm:max-h-[94vh] flex items-center justify-center transition-transform duration-1000 ${
          isEntering ? 'scale-130 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          perspective: '1500px',
        }}
      >
        
        {/* =============================================================== */}
        {/* 1. PASSAGEWAY INTERIOR (Behind the doors - PURE RADIANT LIGHT)   */}
        {/* =============================================================== */}
        <div 
          className="absolute inset-[3.5%] sm:inset-[4.5%] rounded-[42px] sm:rounded-[52px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EBD7] shadow-inner overflow-hidden z-0 flex items-center justify-center border-2 border-[#D4AF37]/35"
        >
          {/* Subtle warm glow inside */}
          <div className="w-full h-full bg-gradient-to-t from-[#E8D4BE]/40 via-transparent to-white/70 pointer-events-none" />
        </div>

        {/* =============================================================== */}
        {/* 2. DUAL 3D REALISTIC DOOR LEAVES (LEFT & RIGHT MOVING PANELS)    */}
        {/* =============================================================== */}
        <div
          className="relative w-[92%] h-[91%] rounded-[38px] sm:rounded-[48px] flex overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-2 border-[#D4AF37]/60"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ----------------------------------------------------------- */}
          {/* LEFT DOOR PANEL (Pivots smoothly along left edge)           */}
          {/* ----------------------------------------------------------- */}
          <div
            className="relative w-1/2 h-full cursor-pointer overflow-hidden"
            style={{
              transformOrigin: 'left center',
              transition: 'transform 2.1s cubic-bezier(0.16, 0.9, 0.25, 1), box-shadow 2.1s ease',
              transform: isSwinging ? 'rotateY(-112deg)' : 'rotateY(0deg)',
              boxShadow: isSwinging
                ? 'none'
                : 'inset -2px 0 10px rgba(0,0,0,0.25), 6px 0 18px rgba(0,0,0,0.2)',
            }}
          >
            {/* Left Half of Photorealistic Door Image */}
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={ASSETS.weddingDoors}
                alt="Left Door"
                className="absolute top-0 left-0 h-full max-w-none object-cover"
                style={{
                  width: '200%',
                  objectPosition: 'left center',
                }}
              />

              {/* Dynamic 3D lighting shadow as door turns away from light */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/40 transition-opacity duration-1000 pointer-events-none ${
                  isSwinging ? 'opacity-80' : 'opacity-0'
                }`} 
              />

              {/* Center Seam Golden Bevel line */}
              <div className="absolute top-0 right-0 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-75 pointer-events-none" />
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT DOOR PANEL (Pivots smoothly along right edge)         */}
          {/* ----------------------------------------------------------- */}
          <div
            className="relative w-1/2 h-full cursor-pointer overflow-hidden"
            style={{
              transformOrigin: 'right center',
              transition: 'transform 2.1s cubic-bezier(0.16, 0.9, 0.25, 1), box-shadow 2.1s ease',
              transform: isSwinging ? 'rotateY(112deg)' : 'rotateY(0deg)',
              boxShadow: isSwinging
                ? 'none'
                : 'inset 2px 0 10px rgba(0,0,0,0.25), -6px 0 18px rgba(0,0,0,0.2)',
            }}
          >
            {/* Right Half of Photorealistic Door Image */}
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={ASSETS.weddingDoors}
                alt="Right Door"
                className="absolute top-0 right-0 h-full max-w-none object-cover"
                style={{
                  width: '200%',
                  objectPosition: 'right center',
                }}
              />

              {/* Dynamic 3D lighting shadow */}
              <div 
                className={`absolute inset-0 bg-gradient-to-l from-black/0 via-black/10 to-black/40 transition-opacity duration-1000 pointer-events-none ${
                  isSwinging ? 'opacity-80' : 'opacity-0'
                }`} 
              />

              {/* Center Seam Golden Bevel line */}
              <div className="absolute top-0 left-0 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-75 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* 3. TOP SACRED INVOCATION BANNER: "श्री महावीराय नमः" (NO SPACES)    */}
        {/* =============================================================== */}
        <div className="absolute top-5 sm:top-7 inset-x-0 text-center z-40 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37]/80 shadow-md">
            <span className="text-[#D4AF37] text-xs">✦</span>
            <span className="font-serif-cormorant text-sm sm:text-base font-bold text-[#8A641E] tracking-normal">
              श्री महावीराय नमः
            </span>
            <span className="text-[#D4AF37] text-xs">✦</span>
          </div>
        </div>

        {/* =============================================================== */}
        {/* 5. BOTTOM TAP TO ENTER PROMPT BUTTON                             */}
        {/* =============================================================== */}
        <div
          className={`absolute bottom-6 sm:bottom-8 inset-x-0 text-center z-40 transition-all duration-500 ${
            isSwinging ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-white/95 backdrop-blur-md text-[#2C2523] shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:bg-[#FFFDF9] transition-transform hover:scale-105 cursor-pointer border-2 border-[#D4AF37]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-display-cinzel text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
              Tap to Open The Doors
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
