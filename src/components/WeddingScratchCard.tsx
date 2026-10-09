import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Eye, Calendar, Sparkles } from 'lucide-react';
import { ASSETS } from '../config/assets';

export const WeddingScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredCelebration = useRef(false);
  const isScratchedRef = useRef(isScratched);
  isScratchedRef.current = isScratched;

  // Initialize Canvas Gold Foil Layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Reset transform & composite mode before clearing and redrawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.save();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // 1. Luxury Gold Foil Gradient
    const goldGradient = ctx.createLinearGradient(0, 0, w, h);
    goldGradient.addColorStop(0, '#C5A059');
    goldGradient.addColorStop(0.25, '#D4AF37');
    goldGradient.addColorStop(0.5, '#F5E0A0');
    goldGradient.addColorStop(0.75, '#C5A059');
    goldGradient.addColorStop(1, '#8A641E');

    ctx.fillStyle = goldGradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Botanical Leaf Inlay
    ctx.strokeStyle = 'rgba(82, 110, 88, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.26, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Ornate Double Gold Border Frame
    ctx.strokeStyle = 'rgba(138, 100, 30, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // 4. Instructions text on the gold foil - Responsive and clear
    ctx.fillStyle = '#241C1A';
    const fontSize = Math.max(13, Math.min(18, Math.round(w * 0.045)));
    ctx.font = `800 ${fontSize}px "Cinzel", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL DATES', w / 2, h / 2 - 10);

    ctx.font = `600 ${Math.max(11, Math.min(13, Math.round(w * 0.032)))}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#4A3B2C';
    ctx.fillText('✨ Rub with finger or cursor ✨', w / 2, h / 2 + 15);

    ctx.restore();

    setIsScratched(false);
    setScratchPercent(0);
    hasTriggeredCelebration.current = false;
    lastPointRef.current = null;
    isDrawingRef.current = false;
  }, []);

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      if (!isScratchedRef.current) {
        initCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    // ResizeObserver ensures canvas updates if container size adjusts on layout changes
    let observer: ResizeObserver | null = null;
    if (containerRef.current && window.ResizeObserver) {
      observer = new ResizeObserver(() => {
        if (!isScratchedRef.current) {
          initCanvas();
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [initCanvas]);

  // Check scratch percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalSampled = pixels.length / 16;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
      setScratchPercent(percent);

      if (percent >= 30 && !hasTriggeredCelebration.current) {
        hasTriggeredCelebration.current = true;
        setIsScratched(true);
        triggerGoldCelebration();
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const triggerGoldCelebration = () => {
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#758E7B', '#FFFDF9', '#526E58', '#B88E3E'],
      shapes: ['circle'],
    });
  };

  const getCanvasPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratchAtPoint = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchPercentage();
  };

  const scratchAlongStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };
    checkScratchPercentage();
  };

  // Pointer Handlers (Rock-solid unified handling for touch, mouse, and stylus)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture isn't supported
    }
    isDrawingRef.current = true;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos) {
      lastPointRef.current = pos;
      scratchAtPoint(pos.x, pos.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos) {
      scratchAlongStroke(pos.x, pos.y);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
  };

  // Touch Handlers (Fallback for mobile browsers)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      isDrawingRef.current = true;
      const pos = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
      if (pos) {
        lastPointRef.current = pos;
        scratchAtPoint(pos.x, pos.y);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawingRef.current && e.touches.length > 0) {
      const pos = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
      if (pos) {
        scratchAlongStroke(pos.x, pos.y);
      }
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleRevealAll = () => {
    setIsScratched(true);
    setScratchPercent(100);
    triggerGoldCelebration();
  };

  const handleReset = () => {
    setIsScratched(false);
    setScratchPercent(0);
    hasTriggeredCelebration.current = false;
    lastPointRef.current = null;
    isDrawingRef.current = false;
    initCanvas();
  };

  return (
    <section className="relative py-12 sm:py-16 px-3 sm:px-6 max-w-xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="font-display-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#241C1A] tracking-wide">
          Scratch Card Reveal
        </h3>
        <p className="font-serif-cormorant italic text-sm sm:text-base md:text-lg text-[#3B5241] mt-1 font-semibold px-2">
          Rub below to reveal the sacred wedding dates of Priyanshu & Roopal
        </p>
      </div>

      {/* Card Frame - Mobile-friendly minimum height ensuring zero text clipping */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[300px] sm:min-h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-2xl royal-card select-none"
      >
        {/* UNDERNEATH LAYER (Revealed Wedding Dates in Ivory & Gold) */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white via-[#FAF9F5] to-[#F2EFE8] overflow-hidden">
          {/* Watermarked Monogram */}
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-1.5 sm:mb-2 shadow-md bg-white shrink-0">
            <img
              src={ASSETS.weddingLogo}
              alt="Priyanshu & Roopal Monogram"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="font-serif-cormorant text-[10px] sm:text-xs tracking-[0.25em] text-[#A67C1E] uppercase font-bold">
            SAVE THE AUSPICIOUS DATES
          </p>

          <h4 className="font-display-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-gradient tracking-wider my-0.5 sm:my-1">
            25 & 26 NOVEMBER 2026
          </h4>

          <p className="font-serif-cormorant italic text-base sm:text-lg text-[#2C2523] font-semibold">
            Priyanshu Kocher & Roopal Jain
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#526E58] font-sans font-medium px-2">
            <Calendar className="w-3.5 h-3.5 text-[#B88E3E] shrink-0" />
            <span className="truncate">Raipur Greens, Cherrikherri, Raipur</span>
          </div>

          {isScratched && (
            <div className="mt-2.5 sm:mt-3 animate-bounce inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#526E58]/10 text-[#3E5343] border border-[#526E58]/30 text-[11px] sm:text-xs font-bold shadow-sm">
              <Sparkles className="w-3 h-3 text-[#B88E3E] shrink-0" />
              <span>You are cordially invited to grace our celebrations!</span>
            </div>
          )}
        </div>

        {/* TOP SCRATCHABLE GOLD CANVAS LAYER */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 block transition-opacity duration-700 ${
            isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100 touch-none'
          }`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Progress & Controls */}
      <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3 px-1 sm:px-2">
        <div className="flex items-center gap-2">
          {!isScratched ? (
            <span className="text-xs sm:text-sm font-sans text-[#5C544E]">
              Scratched: <strong className="text-[#A67C1E] font-bold">{scratchPercent}%</strong>
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-[#3E5343] flex items-center gap-1">
              <span>✓</span> Dates Revealed!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isScratched ? (
            <button
              type="button"
              onClick={handleRevealAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-[#F7F6F2] active:scale-95 border border-[#D4AF37]/60 text-[#2C2523] text-xs font-bold transition-all shadow-sm focus:outline-none"
            >
              <Eye className="w-3.5 h-3.5 text-[#B88E3E]" />
              <span>Reveal Now</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-[#F7F6F2] active:scale-95 border border-[#D4AF37]/60 text-[#2C2523] text-xs font-bold transition-all shadow-sm focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B88E3E]" />
              <span>Scratch Again</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
