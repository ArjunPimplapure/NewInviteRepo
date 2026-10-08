import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../config/assets';
import { weddingAudio } from '../utils/audioPlayer';

interface LuxuryEnvelopeProps {
  onOpenComplete: () => void;
}

export const LuxuryEnvelope: React.FC<LuxuryEnvelopeProps> = ({ onOpenComplete }) => {
  const [openingState, setOpeningState] = useState<'sealed' | 'unsealing' | 'flapOpening' | 'cardRising' | 'transitioning' | 'completed'>('sealed');

  // Trigger celebration sparkles
  const launchGoldConfetti = () => {
    const colors = ['#D4AF37', '#F5E0A0', '#FFF5CC', '#8C1628', '#6F0D1C'];

    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.55 },
      colors,
      ticks: 200,
      gravity: 0.55,
      scalar: 0.95,
      shapes: ['circle'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.5 },
        colors,
        ticks: 220,
        gravity: 0.45,
        scalar: 0.8,
        shapes: ['circle'],
      });
    }, 350);
  };

  const handleOpenEnvelope = () => {
    if (openingState !== 'sealed') return;

    // 1. Attempt to start background music immediately upon user interaction
    weddingAudio.startMusic();

    // 2. Begin choreographed opening sequence
    setOpeningState('unsealing');

    // Flap opens
    setTimeout(() => {
      setOpeningState('flapOpening');
      launchGoldConfetti();
    }, 600);

    // Card begins rising
    setTimeout(() => {
      setOpeningState('cardRising');
    }, 1300);

    // Smooth transition to main website
    setTimeout(() => {
      setOpeningState('transitioning');
    }, 2500);

    // Final completion callback
    setTimeout(() => {
      setOpeningState('completed');
      onOpenComplete();
    }, 3200);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenEnvelope();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${
        openingState === 'transitioning' || openingState === 'completed'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#200307',
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(111, 13, 28, 0.7) 0%, rgba(32, 3, 7, 0.98) 85%)`,
      }}
    >
      {/* Background ambient royal glow */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-[#D4AF37]/15 blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-[500px] sm:max-w-[560px] flex flex-col items-center">
        
        {/* Sacred Jain Invocation & Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="font-serif-cormorant text-base sm:text-lg tracking-[0.3em] font-bold text-gold-gradient select-none">
            || श्री महावीराय नमः ||
          </p>
          <div className="flex items-center justify-center gap-3 mt-1.5">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-[#D4AF37] text-xs">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
          <p className="font-serif-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F5E0A0]/90 mt-1 font-semibold">
            Royal Wedding Invitation
          </p>
        </div>

        {/* 3D Heavy Shagun Envelope Object */}
        <div
          className="relative w-full aspect-[16/11] perspective-1000 cursor-pointer select-none"
          onClick={handleOpenEnvelope}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Wedding Invitation Shagun Envelope. Press Enter or click to break the royal wax seal and open the invitation."
        >
          {/* Shadow beneath envelope */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[92%] h-10 bg-black/60 blur-2xl rounded-full" />

          {/* Envelope Main Body / Backing - Royal Crimson Velvet with Gold Filigree */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#5E0B18] via-[#430610] to-[#2B0309] border-2 border-[#D4AF37]/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Fine Gold Foil Border Filigree */}
            <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/45 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-[#D4AF37]/25 rounded-lg pointer-events-none" />

            {/* Corner traditional gold kalash / paisley flourishes */}
            <svg className="absolute top-4 left-4 w-6 h-6 text-[#D4AF37]/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2h8v2H4v6H2V2zm0 20h8v-2H4v-6H2v8zm20 0h-8v-2h6v-6h2v8zm0-20h-8v2h6v6h2V2z" />
            </svg>
            <svg className="absolute top-4 right-4 w-6 h-6 text-[#D4AF37]/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2h-8v2h6v6h2V2zm0 20h-8v-2h6v-6h2v8zM2 22h8v-2H4v-6H2v8zM2 2h8v2H4v6H2V2z" />
            </svg>

            {/* Internal Royal Invitation Card (Slides upward during unsealing) */}
            <div
              className={`absolute inset-x-4 top-4 bottom-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF4E8] border-2 border-[#D4AF37]/70 p-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out ${
                openingState === 'cardRising' || openingState === 'transitioning' || openingState === 'completed'
                  ? '-translate-y-28 sm:-translate-y-36 scale-105 shadow-2xl z-30'
                  : 'translate-y-0 z-0'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-2.5 shadow-md">
                <img
                  src={ASSETS.weddingLogo}
                  alt="Priyanshu & Roopal Monogram"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-serif-cormorant text-xs tracking-widest text-[#916B27] uppercase font-bold">
                The Auspicious Wedding Of
              </p>
              <h2 className="font-display-cinzel text-lg sm:text-xl font-bold text-[#2A050B] tracking-wide mt-0.5">
                Priyanshu & Roopal
              </h2>
              <p className="font-sans text-[11px] font-semibold text-[#8A641E] mt-1">25 & 26 November 2026</p>
            </div>

            {/* Envelope Side Flaps (Internal visual folds) */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(74,8,19,0.95) 0%, rgba(48,5,12,0.92) 100%)',
                clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                borderRight: '1px solid rgba(212,175,55,0.4)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(225deg, rgba(74,8,19,0.95) 0%, rgba(48,5,12,0.92) 100%)',
                clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                borderLeft: '1px solid rgba(212,175,55,0.4)',
              }}
            />

            {/* Envelope Bottom Flap */}
            <div
              className="absolute inset-0 pointer-events-none z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]"
              style={{
                background:
                  'linear-gradient(0deg, #3D060F 0%, #540A15 100%)',
                clipPath: 'polygon(0% 100%, 50% 46%, 100% 100%)',
                borderTop: '1px solid rgba(212,175,55,0.45)',
              }}
            />

            {/* Envelope Top Triangular Flap (Folds open in 3D) */}
            <div
              className={`absolute inset-x-0 top-0 h-full pointer-events-none origin-top transition-transform duration-1000 ease-in-out z-20 ${
                openingState === 'flapOpening' || openingState === 'cardRising' || openingState === 'transitioning' || openingState === 'completed'
                  ? '-rotate-x-180 opacity-30'
                  : 'rotate-x-0 opacity-100'
              }`}
              style={{
                background:
                  'linear-gradient(180deg, #6B0E1D 0%, #4A0813 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                boxShadow: '0 12px 25px rgba(0,0,0,0.5)',
                borderBottom: '1.5px solid rgba(212,175,55,0.6)',
              }}
            />

            {/* Central Heavy 24K Royal Wax Seal */}
            <div
              className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-out ${
                openingState === 'sealed'
                  ? 'animate-seal-pulse scale-100'
                  : openingState === 'unsealing'
                  ? 'scale-120 rotate-6 brightness-125'
                  : 'scale-0 opacity-0'
              }`}
            >
              <div className="relative group w-22 h-22 sm:w-26 sm:h-26 rounded-full p-1 cursor-pointer">
                {/* Authentic Wax Edge Shadow */}
                <div className="absolute inset-0 rounded-full bg-[#6F0D1C] shadow-2xl" />
                
                {/* Wax Seal Image with PR Monogram */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#D4AF37] flex items-center justify-center bg-[#540A15] shadow-inner">
                  <img
                    src={ASSETS.waxSeal}
                    alt="Priyanshu & Roopal Royal Wax Seal"
                    className="w-full h-full object-cover mix-blend-screen scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Embossed PR overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display-cinzel text-xl sm:text-2xl font-bold text-[#FFF5CC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest">
                      PR
                    </span>
                  </div>
                </div>

                {/* Shimmering Gold Aura Ring */}
                <div className="absolute -inset-1 rounded-full border border-[#D4AF37]/60 animate-pulse pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Action Prompt Below Envelope */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#3D060F]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <p className="font-serif-cormorant text-base sm:text-lg font-bold text-[#FFF5CC] tracking-wider">
              Tap the seal to open the royal invitation
            </p>
          </div>
          <p className="font-sans text-xs text-[#F4E8D1]/70 mt-2 font-light">
            Click anywhere or press Enter to unseal
          </p>
        </div>

      </div>
    </div>
  );
};
