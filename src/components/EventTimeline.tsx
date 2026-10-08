import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Calendar,
  Check,
  Music2,
  Flame,
  Crown,
  Gift,
  SunMedium,
} from 'lucide-react';
import { WEDDING_DATA, WeddingEvent } from '../config/weddingData';

export const EventTimeline: React.FC = () => {
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Helper to render authentic Indian motifs for each ritual
  const renderEventIcon = (type: WeddingEvent['iconType']) => {
    switch (type) {
      case 'carnival':
        return <SunMedium className="w-4 h-4 text-amber-500" />;
      case 'mayra':
        return <Gift className="w-4 h-4 text-purple-600" />;
      case 'sangeet':
        return <Music2 className="w-4 h-4 text-rose-500" />;
      case 'baarat':
        return <Crown className="w-4 h-4 text-amber-600" />;
      case 'phere':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'reception':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#B88E3E]" />;
    }
  };

  const createGoogleCalendarLink = (event: WeddingEvent) => {
    const isDay1 = event.dateKey === 'day1';
    const dateStr = isDay1 ? '20261125' : '20261126';
    
    let startHour = '103000';
    if (event.name === 'CARNIVAL') startHour = '103000';
    else if (event.name === 'MAYRA') startHour = '130000';
    else if (event.name === 'SANGEET') startHour = '200000';
    else if (event.name === 'BAARAT') startHour = '100000';
    else if (event.name === 'PHERE') startHour = '120000';
    else if (event.name === 'RECEPTION') startHour = '200000';

    const title = encodeURIComponent(`${event.name} — Priyanshu & Roopal Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startHour}/${dateStr}T230000&details=${details}&location=${location}`;
  };

  const handleShareEvent = (event: WeddingEvent) => {
    const text = `Join us for ${event.name} (${event.time}, ${event.date}) at ${WEDDING_DATA.venue.name} celebrating the wedding of Priyanshu Kocher & Roopal Jain. Details: ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2500);
    }
  };

  return (
    <section id="events" className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="font-serif-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#526E58] font-bold">
          Sacred Ceremonies & Celebrations
        </p>
        <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C2523] tracking-wide mt-2">
          Wedding Itinerary
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#D4AF37] text-xs">✦</span>
          <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>

      {/* Days Loop in Plain Straight Line Vertically */}
      <div className="space-y-14 sm:space-y-16">
        {WEDDING_DATA.dates.map((day, dayIndex) => (
          <div key={day.key} className="space-y-6">
            
            {/* Day Header Banner with Ivory & Gold Styling */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
              <div className="text-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-white border-2 border-[#D4AF37]/60 shadow-md">
                <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.25em] text-[#526E58] uppercase font-bold block">
                  {day.dayOfWeek}
                </span>
                <h3 className="font-display-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2C2523] tracking-wide">
                  {day.dateFormatted}
                </h3>
              </div>
              <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
            </div>

            {/* Plain Straight Line Vertical Stack of Event Boxes */}
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="group relative rounded-3xl royal-card border-2 border-[#D4AF37]/50 shadow-lg hover:shadow-[0_20px_45px_rgba(184,142,62,0.18)] transition-all duration-500 hover:-translate-y-1 overflow-hidden bg-white flex flex-col sm:flex-row"
                >
                  {/* Event AI Generated Image Banner */}
                  <div className="relative w-full sm:w-64 md:w-72 aspect-[16/10] sm:aspect-auto overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={event.image}
                      alt={`${event.name} celebration`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Soft subtle scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />

                    {/* Floating Time Pill with Gold Foil Rim */}
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37] text-[#2C2523] shadow-md">
                      <Clock className="w-3 h-3 text-[#B88E3E]" />
                      <span className="font-display-cinzel text-xs font-bold tracking-wider">
                        {event.time}
                      </span>
                    </div>

                    {/* Ritual Icon Badge */}
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
                      {renderEventIcon(event.iconType)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Event Name Header */}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display-cinzel text-xl sm:text-2xl font-extrabold text-[#2C2523] tracking-wide group-hover:text-[#B88E3E] transition-colors">
                          {event.name}
                        </h4>
                        <span className="hidden sm:inline-block font-sans text-xs font-bold text-[#8A641E] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/35">
                          {event.time}
                        </span>
                      </div>

                      {/* Event Description */}
                      <p className="font-sans text-xs sm:text-sm text-[#3A332E] leading-relaxed font-normal mb-3">
                        {event.description}
                      </p>

                      {/* Traditional Significance */}
                      <div className="pt-2.5 border-t border-[#D4AF37]/25">
                        <p className="font-serif-cormorant italic text-sm text-[#2E4534] leading-relaxed font-semibold">
                          {event.traditionalSignificance}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/30 flex items-center justify-between gap-2">
                      <a
                        href={createGoogleCalendarLink(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#7A5716] hover:text-[#241C1A] transition-colors"
                        title="Add to Google Calendar"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Add to Calendar</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleShareEvent(event)}
                        className="inline-flex items-center gap-1 text-xs font-sans text-[#3A332E] hover:text-[#7A5716] transition-colors font-medium cursor-pointer"
                        title="Copy event details"
                      >
                        {copiedEventId === event.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied</span>
                          </>
                        ) : (
                          <span>Share</span>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Day divider flourish if day 1 */}
            {dayIndex === 0 && (
              <div className="flex items-center justify-center gap-4 pt-8 opacity-85">
                <span className="h-[1px] w-28 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="text-[#526E58] text-lg font-serif-cormorant">❦</span>
                <span className="h-[1px] w-28 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* ================================================================= */}
      {/* RSVP SECTION (Center Aligned, after Event Boxes & before Venue)   */}
      {/* ================================================================= */}
      <div className="mt-16 sm:mt-20 max-w-xl mx-auto text-center">
        <div className="p-8 sm:p-10 rounded-[36px] sm:rounded-[44px] royal-card border-2 border-[#D4AF37]/70 shadow-2xl relative overflow-hidden bg-white/95">
          {/* Animated Gold Foil Highlight Sweep */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] animate-gold-sweep" />

          {/* Inner Decorative Arch Line */}
          <div className="absolute inset-3 border border-[#D4AF37]/35 rounded-[28px] sm:rounded-[36px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <span className="text-[#D4AF37] text-xs">✦</span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="text-[#526E58] text-xs">🌿</span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="text-[#D4AF37] text-xs">✦</span>
            </div>

            <h3 className="font-display-cinzel text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-[0.25em] uppercase mb-6">
              RSVP
            </h3>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#2C2523]">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-3">
                <span className="font-semibold text-[#241C1A]">Shri Mahendra Kocher</span>
                <a 
                  href="tel:+919993005310" 
                  className="font-bold text-[#8A641E] hover:text-[#526E58] transition-colors tracking-wide"
                >
                  +91- 99930 05310
                </a>
              </div>

              <div className="h-[1px] w-24 mx-auto bg-[#D4AF37]/30" />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-3">
                <span className="font-semibold text-[#241C1A]">Shri Abhay Kocher</span>
                <a 
                  href="tel:+919827147744" 
                  className="font-bold text-[#8A641E] hover:text-[#526E58] transition-colors tracking-wide"
                >
                  +91- 98271 47744
                </a>
              </div>

              <div className="h-[1px] w-24 mx-auto bg-[#D4AF37]/30" />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-3">
                <span className="font-semibold text-[#241C1A]">Divyansh Kocher</span>
                <a 
                  href="tel:+919340136544" 
                  className="font-bold text-[#8A641E] hover:text-[#526E58] transition-colors tracking-wide"
                >
                  +91- 93401 36544
                </a>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
              <span className="font-serif-cormorant italic text-sm text-[#526E58] font-bold">
                Warmly awaiting your gracious presence
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

