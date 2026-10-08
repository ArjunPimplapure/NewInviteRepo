import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // 26 November 2026 10:00:00 AM IST
    const targetDate = new Date('2026-11-26T10:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Container with gold border and ivory silk backdrop */}
      <div className="relative rounded-[36px] royal-card border-2 border-[#D4AF37]/50 p-6 sm:p-10 shadow-xl overflow-hidden">
        
        {/* Animated Gold Sweep Bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] animate-gold-sweep" />

        {/* Subtle decorative botanical corners */}
        <div className="absolute top-3 left-3 text-[#526E58]/60 pointer-events-none text-xs">🌿</div>
        <div className="absolute top-3 right-3 text-[#526E58]/60 pointer-events-none text-xs">🌿</div>
        <div className="absolute bottom-3 left-3 text-[#526E58]/60 pointer-events-none text-xs">🌿</div>
        <div className="absolute bottom-3 right-3 text-[#526E58]/60 pointer-events-none text-xs">🌿</div>

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-[#526E58] mb-3 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-gold-light-gradient">
            The Auspicious Countdown
          </span>
        </div>

        <h3 className="font-display-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2C2523] tracking-wide mb-2">
          Until The Grand Wedding Day
        </h3>
        
        <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#3B5241] mb-8 font-semibold">
          26 November 2026
        </p>

        {/* Countdown Digits Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-xl mx-auto">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative flex flex-col items-center justify-center p-3.5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-[#FAF8F5] border border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Digit Box */}
              <span className="font-display-cinzel text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#7A5716] tabular-nums drop-shadow-sm">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              {/* Unit Label */}
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-[#3B5241] mt-2 uppercase">
                {unit.label}
              </span>

              {/* Top gold accent line */}
              <span className="absolute top-0 inset-x-3 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:via-amber-400 transition-colors" />
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#3A332E] font-serif-cormorant italic font-medium">
          <span className="text-[#526E58] select-none">🌿</span>
          <span>Celebrating the eternal union of Priyanshu & Roopal</span>
          <span className="text-[#526E58] select-none">🌿</span>
        </div>

      </div>
    </section>
  );
};
