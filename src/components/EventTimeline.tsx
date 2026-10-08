import React, { useState, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { WEDDING_DATA, WeddingEvent } from '../config/weddingData';

// Single Day Horizontal Carousel Component
interface DayCarouselProps {
  day: (typeof WEDDING_DATA.dates)[number];
  onShareEvent: (event: WeddingEvent) => void;
  copiedEventId: string | null;
  createGoogleCalendarLink: (event: WeddingEvent) => string;
  renderEventIcon: (type: WeddingEvent['iconType']) => React.ReactNode;
}

const DayCarousel: React.FC<DayCarouselProps> = ({
  day,
  onShareEvent,
  copiedEventId,
  createGoogleCalendarLink,
  renderEventIcon,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(day.events.length - 1, Math.max(0, index)));
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.carousel-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="relative">
      {/* Day Header Banner with Ivory & Gold Styling */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
        <div className="text-center px-6 py-3 rounded-2xl bg-white border-2 border-[#D4AF37]/60 shadow-md">
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.25em] text-[#526E58] uppercase font-bold block">
            {day.dayOfWeek}
          </span>
          <h3 className="font-display-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2C2523] tracking-wide">
            {day.dateFormatted}
          </h3>
        </div>
        <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
      </div>

      {/* Carousel Navigation Buttons (Visible on desktop and tablets) */}
      <div className="hidden sm:flex items-center justify-end gap-2 mb-3 px-2">
        <button
          onClick={scrollPrev}
          aria-label="Previous function"
          className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/60 text-[#8A641E] hover:bg-[#F7F6F2] hover:text-[#2C2523] shadow-sm flex items-center justify-center transition-all focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next function"
          className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/60 text-[#8A641E] hover:bg-[#F7F6F2] hover:text-[#2C2523] shadow-sm flex items-center justify-center transition-all focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Carousel Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-6 pt-2 px-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {day.events.map((event) => (
          <div
            key={event.id}
            className="carousel-card w-[86vw] max-w-[360px] sm:max-w-[380px] shrink-0 snap-center group relative rounded-3xl royal-card border-2 border-[#D4AF37]/45 shadow-lg hover:shadow-[0_20px_45px_rgba(184,142,62,0.18)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between bg-white"
          >
            {/* Event AI Generated Image Banner - Fixed 16:10 aspect ratio */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={event.image}
                alt={`${event.name} celebration`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft subtle scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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

            {/* Card Body - Flex Column for Perfect Vertical Alignment */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Event Name Header */}
                <div className="min-h-[2.5rem] flex items-center mb-2">
                  <h4 className="font-display-cinzel text-xl sm:text-2xl font-extrabold text-[#2C2523] tracking-wide group-hover:text-[#B88E3E] transition-colors">
                    {event.name}
                  </h4>
                </div>

                {/* Event Description */}
                <div className="min-h-[4.25rem] flex items-start mb-3">
                  <p className="font-sans text-xs sm:text-sm text-[#3A332E] leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>

                {/* Traditional Significance */}
                <div className="pt-2.5 border-t border-[#D4AF37]/25 min-h-[3.75rem] flex items-center">
                  <p className="font-serif-cormorant italic text-sm text-[#2E4534] leading-relaxed font-semibold line-clamp-2">
                    {event.traditionalSignificance}
                  </p>
                </div>
              </div>

              {/* Card Actions - Pinned to bottom */}
              <div className="mt-5 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between gap-2">
                {/* Add to Google Calendar */}
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

                {/* Share event timing */}
                <button
                  onClick={() => onShareEvent(event)}
                  className="inline-flex items-center gap-1 text-xs font-sans text-[#3A332E] hover:text-[#7A5716] transition-colors font-medium"
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

      {/* Carousel Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {day.events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              activeIndex === idx
                ? 'w-6 bg-[#D4AF37]'
                : 'w-2 bg-[#D4AF37]/35 hover:bg-[#D4AF37]/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const EventTimeline: React.FC = () => {
  const [activeDateTab, setActiveDateTab] = useState<'all' | 'day1' | 'day2'>('all');
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
    
    let startHour = '090000';
    if (event.name === 'CARNIVAL') startHour = '090000';
    else if (event.name === 'MAYRA') startHour = '130000';
    else if (event.name === 'SANGEET') startHour = '200000';
    else if (event.name === 'BAARAT') startHour = '100000';
    else if (event.name === 'PHERE') startHour = '120000';
    else if (event.name === 'RECEPTION') startHour = '200000';

    const title = encodeURIComponent(`${event.name} — Priyanshu & Rupal Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startHour}/${dateStr}T230000&details=${details}&location=${location}`;
  };

  const handleShareEvent = (event: WeddingEvent) => {
    const text = `Join us for ${event.name} (${event.time}, ${event.date}) at ${WEDDING_DATA.venue.name} celebrating the wedding of Priyanshu Kocher & Rupal Jain. Details: ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 2500);
    }
  };

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
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
        <p className="font-sans text-xs sm:text-sm text-[#5C544E] mt-3 max-w-md mx-auto font-light">
          Swipe through each day to explore the joyous wedding celebrations.
        </p>

        {/* Date Filter Tabs with Botanical Ivory & Gold finish */}
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/50 shadow-md mt-7">
          <button
            onClick={() => setActiveDateTab('all')}
            className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeDateTab === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88E3E] text-white shadow-md'
                : 'text-[#5C544E] hover:text-[#2C2523] hover:bg-[#F7F6F2]'
            }`}
          >
            All Celebrations (6 Events)
          </button>
          <button
            onClick={() => setActiveDateTab('day1')}
            className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeDateTab === 'day1'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88E3E] text-white shadow-md'
                : 'text-[#5C544E] hover:text-[#2C2523] hover:bg-[#F7F6F2]'
            }`}
          >
            25 November (Day 1)
          </button>
          <button
            onClick={() => setActiveDateTab('day2')}
            className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeDateTab === 'day2'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88E3E] text-white shadow-md'
                : 'text-[#5C544E] hover:text-[#2C2523] hover:bg-[#F7F6F2]'
            }`}
          >
            26 November (Day 2)
          </button>
        </div>
      </div>

      {/* Days Loop with Horizontal Carousels */}
      <div className="space-y-16">
        {WEDDING_DATA.dates
          .filter((day) => activeDateTab === 'all' || activeDateTab === day.key)
          .map((day, dayIndex) => (
            <React.Fragment key={day.key}>
              <DayCarousel
                day={day}
                onShareEvent={handleShareEvent}
                copiedEventId={copiedEventId}
                createGoogleCalendarLink={createGoogleCalendarLink}
                renderEventIcon={renderEventIcon}
              />

              {/* Day divider flourish if day1 */}
              {dayIndex === 0 && activeDateTab === 'all' && (
                <div className="flex items-center justify-center gap-4 my-10 opacity-85">
                  <span className="h-[1px] w-28 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <span className="text-[#526E58] text-lg font-serif-cormorant">❦</span>
                  <span className="h-[1px] w-28 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
              )}
            </React.Fragment>
          ))}
      </div>

    </section>
  );
};
