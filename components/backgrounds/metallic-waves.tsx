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
      timeRef.current += 0.002;
      
      // Clear with subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create metallic gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Animate gradient colors based on time
      const shimmer = Math.sin(timeRef.current * 2) * 0.3 + 0.7;
      
      gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.05 * shimmer})`);
      gradient.addColorStop(0.25, `rgba(${baseColor.r * 0.8}, ${baseColor.g * 0.8}, ${baseColor.b * 0.8}, ${0.08 * shimmer})`);
      gradient.addColorStop(0.5, `rgba(${baseColor.r * 1.2}, ${baseColor.g * 1.2}, ${baseColor.b * 1.2}, ${0.1 * shimmer})`);
      gradient.addColorStop(0.75, `rgba(${baseColor.r * 0.6}, ${baseColor.g * 0.6}, ${baseColor.b * 0.6}, ${0.08 * shimmer})`);
      gradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.05 * shimmer})`);

      // Draw multiple wave layers for interference patterns
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      
      // First wave set - horizontal
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin((x * 0.01) + timeRef.current + i * 0.5) * 50 * (i + 1) +
            Math.cos((x * 0.007) + timeRef.current * 1.5 + i) * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Second wave set - vertical (creates interference)
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 5) {
          const x = canvas.width / 2 + 
            Math.sin((y * 0.01) + timeRef.current * 0.8 + i * 0.7) * 100 * (i + 1) +
            Math.cos((y * 0.005) + timeRef.current + i * 0.3) * 50;
          
          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Add metallic highlight spots (moiré effect)
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(timeRef.current * 0.5 + i * 0.5) + 1) * canvas.width / 2;
        const y = (Math.cos(timeRef.current * 0.3 + i * 0.7) + 1) * canvas.height / 2;
        const radius = Math.sin(timeRef.current * 2 + i) * 20 + 30;
        
        const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        spotGradient.addColorStop(0, `rgba(${baseColor.r * 1.5}, ${baseColor.g * 1.5}, ${baseColor.b * 1.5}, ${0.1 * shimmer})`);
        spotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = spotGradient;
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
      className="fixed inset-0 opacity-30 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}