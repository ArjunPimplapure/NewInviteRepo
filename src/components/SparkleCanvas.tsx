import React, { useEffect, useRef } from 'react';

interface SparkleCanvasProps {
  intensity?: 'subtle' | 'celebratory';
}

export const SparkleCanvas: React.FC<SparkleCanvasProps> = ({ intensity = 'subtle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. Botanical Foliage & Flower Petals (Sage eucalyptus leaves & white jasmine petals)
    const petalCount = intensity === 'celebratory' ? 24 : 15;

    interface BotanicalParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      swayAngle: number;
      swaySpeed: number;
      swayRange: number;
      flipAngle: number;
      flipSpeed: number;
      opacity: number;
      type: 'sageLeaf' | 'jasminePetal' | 'goldLeaf';
    }

    const petals: BotanicalParticle[] = Array.from({ length: petalCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height - height * 0.2,
      size: Math.random() * 7 + 8,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayRange: Math.random() * 1.6 + 0.8,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.025 + 0.015,
      opacity: Math.random() * 0.35 + 0.45,
      type: i % 3 === 0 ? 'sageLeaf' : i % 3 === 1 ? 'jasminePetal' : 'goldLeaf',
    }));

    // 2. Golden Stardust Sparkles
    const sparkleCount = intensity === 'celebratory' ? 36 : 22;

    interface Sparkle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      pulseAngle: number;
    }

    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.15,
      maxOpacity: Math.random() * 0.6 + 0.25,
      fadeSpeed: Math.random() * 0.02 + 0.008,
      pulseAngle: Math.random() * Math.PI * 2,
    }));

    // Helper to draw realistic botanical sage leaves & jasmine petals
    const drawBotanical = (p: BotanicalParticle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleX = Math.cos(p.flipAngle);
      ctx.scale(scaleX, 1);

      if (p.type === 'sageLeaf') {
        // Watercolor Sage Green Oval Eucalyptus Leaf
        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, `rgba(107, 138, 114, ${p.opacity})`);
        grad.addColorStop(0.7, `rgba(82, 110, 88, ${p.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(62, 83, 67, ${p.opacity * 0.75})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Delicate leaf vein
        ctx.strokeStyle = `rgba(220, 235, 225, ${p.opacity * 0.45})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.1);
        ctx.lineTo(0, p.size * 1.1);
        ctx.stroke();
      } else if (p.type === 'jasminePetal') {
        // Delicate Ivory Jasmine Flower Petal
        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.95})`);
        grad.addColorStop(0.6, `rgba(247, 245, 238, ${p.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(235, 228, 210, ${p.opacity * 0.7})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.8, p.size * 0.7, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.8, 0, -p.size);
        ctx.fill();
      } else {
        // Golden Foliage Leaf
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.75})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.45, p.size, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Golden Sparkles
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.pulseAngle += s.fadeSpeed;
        s.opacity = (Math.sin(s.pulseAngle) * 0.5 + 0.5) * s.maxOpacity;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
        radGrad.addColorStop(0, `rgba(255, 245, 205, ${s.opacity})`);
        radGrad.addColorStop(0.5, `rgba(212, 175, 55, ${s.opacity * 0.6})`);
        radGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = radGrad;
        ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Delicate star cross
        if (s.size > 1.8) {
          ctx.strokeStyle = `rgba(212, 175, 55, ${s.opacity * 0.7})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 1.5, s.y);
          ctx.lineTo(s.x + s.size * 1.5, s.y);
          ctx.moveTo(s.x, s.y - s.size * 1.5);
          ctx.lineTo(s.x, s.y + s.size * 1.5);
          ctx.stroke();
        }
      });

      // Render Falling Botanical Petals & Leaves
      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotSpeed;

        p.y += p.speedY;
        p.x += Math.sin(p.swayAngle) * p.swayRange + p.speedX;

        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        drawBotanical(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      aria-hidden="true"
    />
  );
};
