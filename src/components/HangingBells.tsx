import React from 'react';

export const HangingBells: React.FC = () => {
  return (
    <div className="absolute top-0 inset-x-0 h-44 pointer-events-none z-20 overflow-hidden flex justify-between px-3 sm:px-12">
      
      {/* Left Hanging Brass Bell / Jhumar Cluster */}
      <div className="flex items-start gap-4 sm:gap-8">
        {/* Bell 1 - Longer */}
        <div className="animate-bell-sway flex flex-col items-center">
          {/* Gold Chain */}
          <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-[#B88E3E] via-[#F5E0A0] to-[#916B27]" />
          {/* Marigold Flower bead */}
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 shadow-sm my-0.5" />
          {/* Ornate Brass Bell */}
          <svg className="w-7 h-8 sm:w-9 sm:h-10 text-[#D4AF37] drop-shadow-md" viewBox="0 0 24 28" fill="currentColor">
            {/* Bell dome */}
            <path d="M12 2 C8 2 5 6 5 13 L3 20 L21 20 L19 13 C19 6 16 2 12 2 Z" fill="url(#bellGoldGrad)" stroke="#8A641E" strokeWidth="0.5" />
            {/* Clapper / Ghanti pendulum */}
            <circle cx="12" cy="23" r="2.2" fill="#FFE8A3" />
            <path d="M12 20 L12 22" stroke="#8A641E" strokeWidth="1.2" />
            <defs>
              <linearGradient id="bellGoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF2CC" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="85%" stopColor="#8A641E" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Bell 2 - Shorter */}
        <div className="animate-bell-sway-delayed flex flex-col items-center hidden sm:flex">
          <div className="w-[1.5px] h-14 sm:h-20 bg-gradient-to-b from-[#B88E3E] via-[#F5E0A0] to-[#916B27]" />
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 shadow-sm my-0.5" />
          <svg className="w-6 h-7 sm:w-7 sm:h-8 text-[#D4AF37] drop-shadow-md" viewBox="0 0 24 28" fill="currentColor">
            <path d="M12 2 C8 2 5 6 5 13 L3 20 L21 20 L19 13 C19 6 16 2 12 2 Z" fill="url(#bellGoldGrad)" stroke="#8A641E" strokeWidth="0.5" />
            <circle cx="12" cy="23" r="2" fill="#FFE8A3" />
          </svg>
        </div>
      </div>

      {/* Center Traditional Toran Swag (Subtle marigold & mango leaf garland arch) */}
      <div className="hidden md:flex flex-1 justify-center pt-1 px-8 opacity-80">
        <svg className="w-full max-w-md h-8 text-amber-500/70" viewBox="0 0 400 30" fill="none">
          <path d="M 0 5 Q 100 28 200 5 Q 300 28 400 5" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Garlands of marigold beads */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((cx, idx) => (
            <circle key={idx} cx={cx} cy={idx % 2 === 0 ? 15 : 19} r="3" fill="#D97706" />
          ))}
        </svg>
      </div>

      {/* Right Hanging Brass Bell / Jhumar Cluster */}
      <div className="flex items-start gap-4 sm:gap-8">
        {/* Bell 3 - Shorter */}
        <div className="animate-bell-sway flex flex-col items-center hidden sm:flex">
          <div className="w-[1.5px] h-14 sm:h-20 bg-gradient-to-b from-[#B88E3E] via-[#F5E0A0] to-[#916B27]" />
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 shadow-sm my-0.5" />
          <svg className="w-6 h-7 sm:w-7 sm:h-8 text-[#D4AF37] drop-shadow-md" viewBox="0 0 24 28" fill="currentColor">
            <path d="M12 2 C8 2 5 6 5 13 L3 20 L21 20 L19 13 C19 6 16 2 12 2 Z" fill="url(#bellGoldGrad)" stroke="#8A641E" strokeWidth="0.5" />
            <circle cx="12" cy="23" r="2" fill="#FFE8A3" />
          </svg>
        </div>

        {/* Bell 4 - Longer */}
        <div className="animate-bell-sway-delayed flex flex-col items-center">
          <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-[#B88E3E] via-[#F5E0A0] to-[#916B27]" />
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 shadow-sm my-0.5" />
          <svg className="w-7 h-8 sm:w-9 sm:h-10 text-[#D4AF37] drop-shadow-md" viewBox="0 0 24 28" fill="currentColor">
            <path d="M12 2 C8 2 5 6 5 13 L3 20 L21 20 L19 13 C19 6 16 2 12 2 Z" fill="url(#bellGoldGrad)" stroke="#8A641E" strokeWidth="0.5" />
            <circle cx="12" cy="23" r="2.2" fill="#FFE8A3" />
            <path d="M12 20 L12 22" stroke="#8A641E" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

    </div>
  );
};
