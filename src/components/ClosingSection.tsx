import React from 'react';
import { Share2, MessageCircle, RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingData';
import { ASSETS } from '../config/assets';

interface ClosingSectionProps {
  onReplayInvitation: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplayInvitation }) => {
  const handleWhatsAppWishes = () => {
    const text = encodeURIComponent(
      `Heartiest Congratulations Priyanshu & Rupal! We are delighted to receive your wedding invitation and look forward to celebrating with the Kocher family on 25 & 26 November 2026 at Raipur Greens.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Priyanshu & Rupal Wedding Invitation',
        text: 'You are cordially invited to celebrate the wedding of Priyanshu Kocher & Rupal Jain on 25 & 26 November 2026 at Raipur Greens, Raipur.',
        url: window.location.href,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      const shareUrl = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Wedding Invitation: Priyanshu Kocher & Rupal Jain\n25 & 26 November 2026 | Raipur Greens, Raipur\nView Invitation: `
      );
      window.open(`https://wa.me/?text=${text}${shareUrl}`, '_blank');
    }
  };

  return (
    <footer id="closing" className="relative py-24 px-4 sm:px-6 text-center overflow-hidden">
      
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto space-y-8">
        
        {/* Heartfelt Emotional Quote */}
        <div className="space-y-3">
          <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#241C1A] leading-snug font-medium">
            "{WEDDING_DATA.closing.heartfeltQuote}"
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#526E58] text-sm select-none">🌿</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Couple Names */}
        <div>
          <h3 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-gold-gradient drop-shadow-sm">
            {WEDDING_DATA.closing.coupleNames}
          </h3>
        </div>

        {/* Wedding Monogram Logo Underneath */}
        <div className="flex justify-center py-2">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl p-2.5 border-2 border-[#D4AF37] bg-white shadow-xl flex items-center justify-center">
            <img
              src={ASSETS.weddingLogo}
              alt="Priyanshu & Rupal Monogram"
              className="w-full h-full object-contain bg-white"
              referrerPolicy="no-referrer"
            />
            {/* Shimmer ring */}
            <div className="absolute -inset-1 rounded-2xl border border-[#D4AF37]/40 animate-pulse pointer-events-none" />
          </div>
        </div>

        {/* Family Signature */}
        <div className="space-y-2">
          <p className="font-serif-cormorant italic text-xl sm:text-2xl text-[#3B5241] whitespace-pre-line leading-relaxed font-semibold">
            {WEDDING_DATA.closing.familySignature}
          </p>
          <p className="font-sans text-xs tracking-widest text-[#7A5716] uppercase font-bold mt-1">
            {WEDDING_DATA.closing.greetings}
          </p>
        </div>

        {/* Interactive Actions for Guests */}
        <div className="pt-6 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-center gap-3">
          {/* Send Blessings via WhatsApp */}
          <button
            onClick={handleWhatsAppWishes}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-400/50 text-xs sm:text-sm font-bold transition-all shadow-sm focus:outline-none"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Send Wishes & Blessings</span>
          </button>

          {/* Share on WhatsApp */}
          <button
            onClick={handleShareInvitation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F7F6F2] text-[#2C2523] border border-[#D4AF37]/60 text-xs sm:text-sm font-bold transition-all shadow-sm focus:outline-none"
          >
            <Share2 className="w-4 h-4 text-[#B88E3E]" />
            <span>Share Invitation</span>
          </button>

          {/* Replay Opening Animation */}
          <button
            onClick={onReplayInvitation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F7F6F2] text-[#526E58] border border-[#526E58]/35 text-xs sm:text-sm font-medium transition-all focus:outline-none shadow-sm"
            title="Replay the wedding palace doors opening animation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B88E3E]" />
            <span>Replay Doors</span>
          </button>
        </div>

        {/* Subtle footer watermark */}
        <div className="pt-8 text-xs text-[#5C544E]/80 font-sans font-light">
          <p>Raipur Greens, Cherrikherri, Raipur · 25 & 26 November 2026</p>
        </div>

      </div>

    </footer>
  );
};
