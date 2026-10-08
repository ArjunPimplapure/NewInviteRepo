import React from 'react';
import { WEDDING_DATA } from '../config/weddingData';
import { ASSETS } from '../config/assets';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col items-center justify-center pt-14 pb-16 px-4 sm:px-6">
      
      {/* Main Luxury Cathedral Arch Card (Faithfully matching uploaded reference image) */}
      <div className="relative w-full max-w-3xl mx-auto p-6 sm:p-12 md:p-16 rounded-[48px] sm:rounded-[64px] royal-card border-2 sm:border-[2.5px] border-[#D4AF37]/75 shadow-2xl overflow-hidden mt-4">
        
        {/* Pure subtle watercolor wash backdrop */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/95 via-white/70 to-[#F9F8F5]/95" />

        {/* Animated Gold Foil Highlight Sweep across top arch border */}
        <div className="absolute top-0 inset-x-0 h-[2.5px] animate-gold-sweep" />

        {/* Inner Arch Frame line with rounded top (Reference design) */}
        <div className="absolute inset-3 sm:inset-5 border border-[#D4AF37]/40 rounded-[38px] sm:rounded-[52px] pointer-events-none" />

        {/* Botanical Foliage Accents in Corners (Matching Reference Image) */}
        {/* Top-Right Eucalyptus & Golden Sprig Cluster */}
        <div className="absolute top-0 right-0 p-3 sm:p-5 select-none pointer-events-none">
          <svg className="w-20 h-20 sm:w-32 sm:h-32 text-[#526E58]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M90,10 Q65,15 55,35 Q75,30 90,10 Z" fill="#6B8A72" opacity="0.85" />
            <path d="M75,5 Q50,20 50,45 Q70,35 75,5 Z" fill="#88A788" opacity="0.75" />
            <path d="M95,25 Q80,50 60,55 Q75,40 95,25 Z" fill="#526E58" opacity="0.9" />
            <path d="M85,18 Q60,25 65,50" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
            <circle cx="65" cy="50" r="3" fill="#D4AF37" />
            <circle cx="72" cy="35" r="2.5" fill="#D4AF37" />
          </svg>
        </div>

        {/* Top-Left Delicate Golden Leaves */}
        <div className="absolute top-0 left-0 p-3 sm:p-5 select-none pointer-events-none">
          <svg className="w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37]" viewBox="0 0 80 80" fill="none" stroke="currentColor">
            <path d="M10,10 Q25,15 30,35" strokeWidth="1.5" />
            <ellipse cx="22" cy="20" rx="4" ry="8" transform="rotate(-30 22 20)" fill="#D4AF37" opacity="0.8" />
            <ellipse cx="32" cy="32" rx="4" ry="7" transform="rotate(-15 32 32)" fill="#88A788" opacity="0.7" />
          </svg>
        </div>

        {/* Bottom-Left Sage Leaves & Copper Twig */}
        <div className="absolute bottom-0 left-0 p-3 sm:p-5 select-none pointer-events-none">
          <svg className="w-20 h-20 sm:w-32 sm:h-32 text-[#526E58]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,90 Q35,85 45,65 Q25,70 10,90 Z" fill="#6B8A72" opacity="0.85" />
            <path d="M25,95 Q50,80 50,55 Q30,65 25,95 Z" fill="#88A788" opacity="0.75" />
            <path d="M5,75 Q20,50 40,45 Q25,60 5,75 Z" fill="#526E58" opacity="0.9" />
            <path d="M15,82 Q40,75 35,50" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
            <circle cx="35" cy="50" r="3" fill="#D4AF37" />
          </svg>
        </div>

        {/* Bottom-Right Golden Botanical Sprig */}
        <div className="absolute bottom-0 right-0 p-3 sm:p-5 select-none pointer-events-none">
          <svg className="w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37]" viewBox="0 0 80 80" fill="none" stroke="currentColor">
            <path d="M70,70 Q55,65 50,45" strokeWidth="1.5" />
            <ellipse cx="58" cy="60" rx="4" ry="8" transform="rotate(30 58 60)" fill="#D4AF37" opacity="0.8" />
            <ellipse cx="48" cy="48" rx="4" ry="7" transform="rotate(15 48 48)" fill="#88A788" opacity="0.7" />
          </svg>
        </div>

        {/* Sacred Jain Invocation - No spaces between letters */}
        <div className="text-center mb-6 pt-2 relative z-10">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="text-[#D4AF37] text-sm">✦</span>
            <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-[#526E58] text-xs">🌿</span>
            <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-[#D4AF37] text-sm">✦</span>
          </div>

          <h2 className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A5716] select-none tracking-normal drop-shadow-sm">
            {WEDDING_DATA.invocation}
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-2.5">
            <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
            <span className="text-[#526E58] text-xs">❖</span>
            <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
          </div>
        </div>

        {/* Primary Official Wedding Logo / Monogram in Crisp Ivory & Gold Frame */}
        <div className="flex justify-center mb-6 sm:mb-8 relative z-10">
          <div className="relative group w-48 h-48 sm:w-60 sm:h-60 rounded-3xl p-2 transition-transform duration-700 hover:scale-103">
            {/* Soft Ambient Radiance */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/20 via-[#F5E0A0]/25 to-[#88A788]/20 blur-xl group-hover:bg-[#D4AF37]/35 transition-all duration-700" />
            
            {/* Refined Gold Bordered Plaque */}
            <div className="relative w-full h-full rounded-2xl p-1.5 bg-gradient-to-tr from-[#8A641E] via-[#F5E0A0] to-[#D4AF37] shadow-xl">
              <div className="w-full h-full rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-white shadow-inner flex items-center justify-center p-2.5">
                <img
                  src={ASSETS.weddingLogo}
                  alt="Priyanshu & Rupal Wedding Monogram"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Intro Blessings Tagline */}
        <div className="text-center mb-5 sm:mb-6 relative z-10">
          <p className="font-serif-cormorant italic text-lg sm:text-xl md:text-2xl text-[#3A332E] tracking-wide max-w-lg mx-auto font-medium">
            {WEDDING_DATA.blessingIntro}
          </p>
        </div>

        {/* Couple Names Presentation - Centered, Symmetrical & Clearly Visible */}
        <div className="text-center space-y-4 my-6 relative z-10">
          {/* Groom */}
          <div className="space-y-1">
            <h1 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-[#241C1A]">
              <span className="text-gold-gradient drop-shadow-sm">{WEDDING_DATA.groom.name}</span>
            </h1>
            <p className="font-serif-cormorant italic text-base sm:text-lg text-[#3B5241] tracking-wide font-semibold">
              S/o {WEDDING_DATA.groom.father}
            </p>
          </div>

          {/* Ampersand Botanical Flourish */}
          <div className="flex items-center justify-center gap-4 py-1">
            <span className="h-[1.5px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
            <div className="flex items-center gap-2">
              <span className="text-[#526E58] text-xs">🌿</span>
              <span className="font-script-alex text-5xl sm:text-6xl text-[#A67C1E] leading-none select-none drop-shadow-sm">
                &
              </span>
              <span className="text-[#526E58] text-xs">🌿</span>
            </div>
            <span className="h-[1.5px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
          </div>

          {/* Bride */}
          <div className="space-y-1">
            <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-[#241C1A]">
              <span className="text-gold-gradient drop-shadow-sm">{WEDDING_DATA.bride.name}</span>
            </h2>
            <p className="font-serif-cormorant italic text-base sm:text-lg text-[#3B5241] tracking-wide font-semibold">
              {WEDDING_DATA.bride.parentalText}
            </p>
          </div>
        </div>

        {/* Ornamental Floral Divider */}
        <div className="flex items-center justify-center gap-3 my-6 sm:my-8 relative z-10">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
          <div className="flex items-center gap-2 text-[#526E58]">
            <span className="text-xs text-[#D4AF37]">✦</span>
            <span className="text-xl font-serif-cormorant">❦</span>
            <span className="text-xs text-[#D4AF37]">✦</span>
          </div>
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
        </div>

        {/* Heartfelt Wedding Invitation Message */}
        <div className="max-w-xl mx-auto text-center px-4 relative z-10">
          <blockquote className="font-serif-cormorant text-lg sm:text-xl md:text-2xl leading-relaxed text-[#241C1A] italic font-medium">
            "{WEDDING_DATA.invitationMessage}"
          </blockquote>
          <p className="font-sans text-xs sm:text-sm text-[#4A423D] leading-relaxed mt-4 font-normal">
            {WEDDING_DATA.invitationNote}
          </p>
        </div>

        {/* Date Anchor Plaque with Sage & Gold styling */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/35 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#3A332E] font-sans relative z-10">
          <span className="font-bold text-[#241C1A] tracking-wide">25 & 26 November 2026</span>
          <span className="text-[#D4AF37]">·</span>
          <span className="text-[#3B5241] font-semibold">Raipur Greens, Raipur</span>
          <span className="text-[#D4AF37]">·</span>
          <span className="font-serif-cormorant italic font-bold text-[#7A5716]">The Kocher Family</span>
        </div>

      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#events"
        className="mt-8 flex flex-col items-center gap-1.5 text-[#526E58] hover:text-[#241C1A] transition-colors focus:outline-none group"
        aria-label="Scroll down to view wedding events schedule"
      >
        <span className="font-serif-cormorant text-xs tracking-[0.25em] uppercase font-bold text-gold-light-gradient">
          Explore Celebrations
        </span>
        <svg
          className="w-5 h-5 animate-bounce text-[#B88E3E] group-hover:text-[#241C1A]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>

    </section>
  );
};
