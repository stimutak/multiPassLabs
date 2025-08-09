'use client';

import { useEffect, useRef } from 'react';

interface MetallicWavesProps {
  entityColor?: string;
}

export function MetallicWaves({ entityColor = '#00f4ff' }: MetallicWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Parse entity color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 244, b: 255 };
    };

    const baseColor = hexToRgb(entityColor);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.003;
      
      // Clear canvas completely for clean metallic effect
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create metallic shimmer with color shifts
      const shimmer = Math.sin(timeRef.current * 3) * 0.5 + 0.5;
      const colorShift = Math.sin(timeRef.current * 2) * 30;
      
      // Draw metallic sheet background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, `rgba(${Math.min(255, baseColor.r + colorShift)}, ${Math.min(255, baseColor.g + colorShift)}, ${Math.min(255, baseColor.b + colorShift)}, 0.1)`);
      bgGradient.addColorStop(0.3, `rgba(${Math.min(255, baseColor.r + colorShift + 40)}, ${Math.min(255, baseColor.g + colorShift + 40)}, ${Math.min(255, baseColor.b + colorShift + 40)}, 0.15)`);
      bgGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.05 * shimmer})`); // White highlight for metallic sheen
      bgGradient.addColorStop(0.7, `rgba(${Math.max(0, baseColor.r - 30)}, ${Math.max(0, baseColor.g - 30)}, ${Math.max(0, baseColor.b - 30)}, 0.1)`);
      bgGradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.08)`);
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw metallic sheets as mesh grid that undulates
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${Math.min(255, baseColor.r + colorShift)}, ${Math.min(255, baseColor.g + colorShift)}, ${Math.min(255, baseColor.b + colorShift)}, ${0.3 + shimmer * 0.2})`;
        ctx.lineWidth = 1;
        
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
      
      // Vertical lines for mesh/interference
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + shimmer * 0.1})`; // White for metallic highlights
        ctx.lineWidth = 0.5;
        
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
      
      // Add specular highlights for metallic sheen
      const numHighlights = 5;
      for (let i = 0; i < numHighlights; i++) {
        const x = (Math.sin(timeRef.current * 0.7 + i * 2) + 1) * canvas.width / 2;
        const y = (Math.cos(timeRef.current * 0.5 + i * 1.5) + 1) * canvas.height / 2;
        const radius = 100 + Math.sin(timeRef.current * 2 + i) * 50;
        
        const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 * shimmer})`);
        highlightGradient.addColorStop(0.5, `rgba(${Math.min(255, baseColor.r + 50)}, ${Math.min(255, baseColor.g + 50)}, ${Math.min(255, baseColor.b + 50)}, ${0.1 * shimmer})`);
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
      className="fixed inset-0 opacity-60 pointer-events-none z-0"
    />
  );
}