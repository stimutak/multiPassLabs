'use client';

import { useEffect, useRef } from 'react';

interface MetallicWavesProps {
  entityColor?: string;
}

export function MetallicWaves({ entityColor = '#00f4ff' }: MetallicWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Parse entity color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result && result[1] && result[2] && result[3] ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 244, b: 255 };
    };

    const _baseColor = hexToRgb(entityColor);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.004;
      
      // Clear canvas for oil effect
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create oil slick shimmer with rainbow interference
      const shimmer = Math.sin(timeRef.current * 3) * 0.5 + 0.5;
      const hueShift = timeRef.current * 50; // Continuous hue rotation for oil rainbow
      const colorShift = Math.sin(timeRef.current * 2) * 100; // Dramatic color shift
      const _colorShift2 = Math.cos(timeRef.current * 1.5) * 80;
      
      // Draw oil slick background with rainbow gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Create oil rainbow effect with HSL colors
      for (let i = 0; i <= 1; i += 0.1) {
        const hue = (hueShift + i * 360 + colorShift) % 360;
        const saturation = 70 + shimmer * 30; // High saturation for oil effect
        const lightness = 40 + Math.sin(i * Math.PI * 2 + timeRef.current) * 20;
        bgGradient.addColorStop(i, `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.15 + shimmer * 0.1})`);
      }
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw oil slick waves with rainbow interference and liquid chrome
      let lineCounter = 0;
      for (let y = 0; y < canvas.height; y += 15) {
        ctx.beginPath();
        
        // Every 2nd line is liquid chrome (more chrome!)
        const isChromeLine = lineCounter % 2 === 0;
        lineCounter++;
        
        if (isChromeLine) {
          // Intense liquid chrome effect - ultra-sharp reflective gradients
          const chromePhase = Math.sin(timeRef.current * 2 + y * 0.02);
          const chromeIntensity = 0.5 + Math.abs(Math.sin(timeRef.current * 3 + y * 0.01)) * 0.5;
          const shimmerPhase = Math.sin(timeRef.current * 8 + y * 0.05); // Fast shimmer
          
          // Create chrome gradient along the line with multiple reflection points
          const gradient = ctx.createLinearGradient(0, y, canvas.width, y);
          
          // Hyper-metallic chrome with extreme contrast
          if (chromePhase > 0) {
            // Bright mirror reflection phase - like polished chrome
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
            gradient.addColorStop(0.1, `rgba(245, 250, 255, ${0.9 * chromeIntensity})`);
            gradient.addColorStop(0.15, `rgba(0, 0, 5, 0.95)`); // Sharp black line
            gradient.addColorStop(0.3, `rgba(255, 255, 255, ${chromeIntensity})`);
            gradient.addColorStop(0.35, `rgba(220, 225, 235, ${0.8 * chromeIntensity})`);
            gradient.addColorStop(0.4, `rgba(10, 10, 15, 0.9)`); // Deep black
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
            gradient.addColorStop(0.55, `rgba(0, 0, 0, 0.98)`); // Ultra black
            gradient.addColorStop(0.65, `rgba(250, 252, 255, ${chromeIntensity})`);
            gradient.addColorStop(0.75, `rgba(180, 185, 195, ${0.7 * chromeIntensity})`);
            gradient.addColorStop(0.85, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`);
            gradient.addColorStop(0.9, `rgba(5, 5, 10, 0.9)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${0.8 * chromeIntensity})`);
          } else {
            // Dark chrome phase with bright highlights
            gradient.addColorStop(0, `rgba(0, 0, 0, 0.98)`); // Pure black
            gradient.addColorStop(0.1, `rgba(5, 5, 10, 0.95)`);
            gradient.addColorStop(0.2, `rgba(255, 255, 255, ${chromeIntensity})`); // Bright spike
            gradient.addColorStop(0.25, `rgba(0, 0, 0, 0.98)`);
            gradient.addColorStop(0.4, `rgba(15, 15, 20, 0.9)`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`); // Central highlight
            gradient.addColorStop(0.55, `rgba(0, 0, 0, 0.99)`);
            gradient.addColorStop(0.7, `rgba(240, 245, 255, ${0.8 * chromeIntensity})`);
            gradient.addColorStop(0.75, `rgba(0, 0, 5, 0.95)`);
            gradient.addColorStop(0.9, `rgba(255, 255, 255, ${0.7 * chromeIntensity})`);
            gradient.addColorStop(1, `rgba(0, 0, 0, 0.98)`);
          }
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 4; // Thicker for more presence
          
          // Intense glow/shadow effect for chrome
          ctx.shadowBlur = 15 + shimmerPhase * 5;
          ctx.shadowColor = chromePhase > 0 
            ? `rgba(255, 255, 255, ${0.8 + shimmerPhase * 0.2})` 
            : `rgba(0, 0, 0, 0.95)`;
        } else {
          // Oil slick rainbow lines
          const lineHue = (hueShift * 2 + y * 0.5 + Math.sin(timeRef.current + y * 0.01) * 60) % 360;
          const lineSat = 80 + Math.sin(y * 0.02 + timeRef.current * 2) * 20;
          const lineLightness = 50 + Math.cos(y * 0.01 + timeRef.current) * 25;
          ctx.strokeStyle = `hsla(${lineHue}, ${lineSat}%, ${lineLightness}%, ${0.5 + shimmer * 0.3})`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0;
        }
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const wave1 = Math.sin((x * 0.01) + timeRef.current + (y * 0.01)) * 20;
          const wave2 = Math.cos((x * 0.008) + timeRef.current * 1.3) * 15;
          const yOffset = y + wave1 + wave2;
          
          if (x === 0) {
            ctx.moveTo(x, yOffset);
          } else {
            ctx.lineTo(x, yOffset);
          }
        }
        ctx.stroke();
      }
      
      // Vertical oil film lines for mesh/interference with intense chrome
      let vertLineCounter = 0;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath();
        
        // Every 2nd vertical line is chrome (50/50 split)
        const isChromeLine = vertLineCounter % 2 === 0;
        vertLineCounter++;
        
        if (isChromeLine) {
          // Intense vertical chrome reflection
          const chromePhase = Math.cos(timeRef.current * 2.5 + x * 0.02);
          const chromeIntensity = 0.6 + Math.abs(Math.sin(timeRef.current * 2 + x * 0.015)) * 0.4;
          const glintPhase = Math.sin(timeRef.current * 10 + x * 0.1); // Rapid glinting
          
          // Ultra-metallic chrome gradient for vertical lines
          const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
          
          if (chromePhase > 0) {
            // Hyper-bright metallic sheen
            gradient.addColorStop(0, `rgba(255, 255, 255, ${chromeIntensity})`);
            gradient.addColorStop(0.05, `rgba(0, 0, 0, 0.95)`); // Sharp edge
            gradient.addColorStop(0.2, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
            gradient.addColorStop(0.25, `rgba(200, 205, 220, ${0.7 * chromeIntensity})`);
            gradient.addColorStop(0.3, `rgba(0, 0, 5, 0.98)`); // Deep black stripe
            gradient.addColorStop(0.45, `rgba(255, 255, 255, ${chromeIntensity})`);
            gradient.addColorStop(0.5, `rgba(0, 0, 0, 0.99)`); // Center black
            gradient.addColorStop(0.55, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`);
            gradient.addColorStop(0.7, `rgba(150, 155, 170, ${0.6 * chromeIntensity})`);
            gradient.addColorStop(0.75, `rgba(255, 255, 255, ${chromeIntensity})`);
            gradient.addColorStop(0.8, `rgba(0, 0, 0, 0.95)`);
            gradient.addColorStop(0.95, `rgba(255, 255, 255, ${0.8 * chromeIntensity})`);
            gradient.addColorStop(1, `rgba(0, 0, 0, 0.9)`);
          } else {
            // Dark chrome with mirror highlights
            gradient.addColorStop(0, `rgba(0, 0, 0, 0.99)`); // Pitch black
            gradient.addColorStop(0.15, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`); // Sharp highlight
            gradient.addColorStop(0.2, `rgba(0, 0, 0, 0.98)`);
            gradient.addColorStop(0.35, `rgba(10, 10, 15, 0.9)`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${chromeIntensity})`); // Bright streak
            gradient.addColorStop(0.45, `rgba(0, 0, 0, 0.99)`);
            gradient.addColorStop(0.6, `rgba(220, 225, 240, ${0.8 * chromeIntensity})`);
            gradient.addColorStop(0.65, `rgba(0, 0, 5, 0.98)`);
            gradient.addColorStop(0.8, `rgba(255, 255, 255, ${0.7 * chromeIntensity})`);
            gradient.addColorStop(0.85, `rgba(0, 0, 0, 0.97)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${0.5 * chromeIntensity})`);
          }
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3; // Thicker chrome lines
          ctx.shadowBlur = 12 + glintPhase * 8; // Dynamic shadow
          ctx.shadowColor = chromePhase > 0 
            ? `rgba(255, 255, 255, ${0.7 + glintPhase * 0.3})` 
            : `rgba(0, 0, 0, 0.9)`;
        } else {
          // Regular oil rainbow lines
          const lineHue = (hueShift * 3 + x * 0.5 + Math.cos(timeRef.current + x * 0.01) * 90) % 360;
          const lineSat = 90; // High saturation for oil
          const lineLightness = 60 + Math.sin(x * 0.01 + timeRef.current * 1.5) * 20;
          ctx.strokeStyle = `hsla(${lineHue}, ${lineSat}%, ${lineLightness}%, ${0.3 + shimmer * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 0;
        }
        
        for (let y = 0; y <= canvas.height; y += 10) {
          const wave1 = Math.sin((y * 0.01) + timeRef.current * 0.8 + (x * 0.01)) * 15;
          const wave2 = Math.cos((y * 0.006) + timeRef.current) * 10;
          const xOffset = x + wave1 + wave2;
          
          if (y === 0) {
            ctx.moveTo(xOffset, y);
          } else {
            ctx.lineTo(xOffset, y);
          }
        }
        ctx.stroke();
      }
      
      // Add oil bubble highlights with prismatic colors
      const numHighlights = 8;
      for (let i = 0; i < numHighlights; i++) {
        const x = (Math.sin(timeRef.current * 0.5 + i * 2) + 1) * canvas.width / 2;
        const y = (Math.cos(timeRef.current * 0.3 + i * 1.5) + 1) * canvas.height / 2;
        const radius = 80 + Math.sin(timeRef.current * 2 + i) * 40;
        
        const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        // Create prismatic oil bubble effect
        const bubbleHue = (hueShift * 4 + i * 45) % 360;
        highlightGradient.addColorStop(0, `hsla(${bubbleHue}, 100%, 70%, ${0.3 * shimmer})`);
        highlightGradient.addColorStop(0.3, `hsla(${(bubbleHue + 60) % 360}, 90%, 60%, ${0.2 * shimmer})`);
        highlightGradient.addColorStop(0.6, `hsla(${(bubbleHue + 120) % 360}, 80%, 50%, ${0.1 * shimmer})`);
        highlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [entityColor]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 opacity-80 pointer-events-none z-0"
    />
  );
}