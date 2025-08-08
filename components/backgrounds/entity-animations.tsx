'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Base animation interface
export interface EntityAnimation {
  name: string;
  init: (canvas: HTMLCanvasElement, color: string) => void;
  animate: () => void;
  destroy: () => void;
}

// === OSCILLOSCOPE ANIMATION (noize.p4th) ===
export class OscilloscopeAnimation implements EntityAnimation {
  name = 'oscilloscope';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#59ff6d';
  private phase = 0;
  private waves: Array<{ amplitude: number; frequency: number; offset: number }> = [];

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    // Generate multiple wave parameters
    this.waves = Array.from({ length: 3 }, () => ({
      amplitude: Math.random() * 50 + 20,
      frequency: Math.random() * 0.02 + 0.01,
      offset: Math.random() * Math.PI * 2
    }));
    
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw oscilloscope lines
    this.ctx.strokeStyle = this.color + '40'; // 25% opacity
    this.ctx.lineWidth = 1;
    
    for (let waveIndex = 0; waveIndex < this.waves.length; waveIndex++) {
      const wave = this.waves[waveIndex];
      if (!wave) continue;
      
      this.ctx.beginPath();
      
      for (let x = 0; x < this.canvas.width; x += 2) {
        const y = this.canvas.height / 2 + 
          Math.sin(x * wave.frequency + this.phase + wave.offset) * wave.amplitude * 
          (1 + Math.sin(this.phase * 0.5) * 0.3); // Amplitude modulation
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
        
        // Occasional glitch
        if (Math.random() > 0.999) {
          this.ctx.lineTo(x, y + (Math.random() - 0.5) * 100);
        }
      }
      
      this.ctx.stroke();
    }
    
    // Draw scan line
    const scanY = (this.phase * 50) % this.canvas.height;
    this.ctx.strokeStyle = this.color + '80';
    this.ctx.beginPath();
    this.ctx.moveTo(0, scanY);
    this.ctx.lineTo(this.canvas.width, scanY);
    this.ctx.stroke();
    
    this.phase += 0.05;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === CIRCUIT TRACES ANIMATION (drex:0m) ===
export class CircuitTracesAnimation implements EntityAnimation {
  name = 'circuitTraces';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#9b59ff';
  private nodes: Array<{ x: number; y: number; connections: number[] }> = [];
  private packets: Array<{ from: number; to: number; progress: number; speed: number }> = [];

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateCircuit();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateCircuit();
  };

  private generateCircuit() {
    if (!this.canvas) return;
    
    // Create grid of nodes
    this.nodes = [];
    const gridSize = 150;
    const cols = Math.ceil(this.canvas.width / gridSize) + 1;
    const rows = Math.ceil(this.canvas.height / gridSize) + 1;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.nodes.push({
          x: col * gridSize + (Math.random() - 0.5) * 50,
          y: row * gridSize + (Math.random() - 0.5) * 50,
          connections: []
        });
      }
    }
    
    // Create connections
    this.nodes.forEach((node, i) => {
      const possibleConnections = this.nodes
        .map((_, j) => j)
        .filter(j => {
          if (i === j) return false;
          const other = this.nodes[j];
          if (!other) return false;
          const dist = Math.hypot(other.x - node.x, other.y - node.y);
          return dist < 200 && dist > 50;
        });
      
      // Connect to 2-3 nearby nodes
      const numConnections = Math.floor(Math.random() * 2) + 1;
      for (let c = 0; c < numConnections && c < possibleConnections.length; c++) {
        const targetIndex = possibleConnections[Math.floor(Math.random() * possibleConnections.length)];
        if (targetIndex !== undefined && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });
    
    // Initialize some data packets
    this.packets = Array.from({ length: 10 }, () => {
      const from = Math.floor(Math.random() * this.nodes.length);
      const node = this.nodes[from];
      const to = node?.connections[Math.floor(Math.random() * node.connections.length)];
      return {
        from,
        to: to ?? from,
        progress: 0,
        speed: Math.random() * 0.02 + 0.01
      };
    });
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw traces
    this.ctx.strokeStyle = this.color + '20';
    this.ctx.lineWidth = 1;
    
    this.nodes.forEach((node, i) => {
      node.connections.forEach(targetIndex => {
        const target = this.nodes[targetIndex];
        if (!target) return;
        
        this.ctx!.beginPath();
        this.ctx!.moveTo(node.x, node.y);
        
        // Circuit-style 90-degree angles
        if (Math.abs(node.x - target.x) > Math.abs(node.y - target.y)) {
          this.ctx!.lineTo(target.x, node.y);
          this.ctx!.lineTo(target.x, target.y);
        } else {
          this.ctx!.lineTo(node.x, target.y);
          this.ctx!.lineTo(target.x, target.y);
        }
        
        this.ctx!.stroke();
      });
      
      // Draw nodes
      this.ctx!.fillStyle = this.color + '40';
      this.ctx!.fillRect(node.x - 2, node.y - 2, 4, 4);
    });
    
    // Animate packets
    this.packets.forEach(packet => {
      const from = this.nodes[packet.from];
      const to = this.nodes[packet.to];
      if (!from || !to) return;
      
      packet.progress += packet.speed;
      
      let x, y;
      if (packet.progress < 0.5) {
        // First segment
        const t = packet.progress * 2;
        if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
          x = from.x + (to.x - from.x) * t;
          y = from.y;
        } else {
          x = from.x;
          y = from.y + (to.y - from.y) * t;
        }
      } else {
        // Second segment
        const t = (packet.progress - 0.5) * 2;
        if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
          x = to.x;
          y = from.y + (to.y - from.y) * t;
        } else {
          x = from.x + (to.x - from.x) * t;
          y = to.y;
        }
      }
      
      // Draw packet
      this.ctx!.fillStyle = this.color + 'ff';
      this.ctx!.fillRect(x - 3, y - 3, 6, 6);
      
      // Glow effect
      this.ctx!.shadowBlur = 10;
      this.ctx!.shadowColor = this.color;
      this.ctx!.fillRect(x - 2, y - 2, 4, 4);
      this.ctx!.shadowBlur = 0;
      
      // Reset packet when it reaches destination
      if (packet.progress >= 1) {
        packet.from = packet.to;
        const node = this.nodes[packet.from];
        packet.to = node?.connections[Math.floor(Math.random() * node.connections.length)] ?? packet.from;
        packet.progress = 0;
        packet.speed = Math.random() * 0.02 + 0.01;
      }
    });
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === HEX WATERFALL ANIMATION (x3n0.form) ===
export class HexWaterfallAnimation implements EntityAnimation {
  name = 'hexWaterfall';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#0078f2';
  private columns: Array<{ 
    chars: string[]; 
    y: number; 
    speed: number;
    opacity: number;
  }> = [];

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Initialize hex columns
    const fontSize = 14;
    const cols = Math.floor(this.canvas.width / (fontSize * 2));
    
    this.columns = Array.from({ length: cols }, (_, i) => ({
      chars: this.generateHexString(),
      y: Math.random() * -this.canvas.height,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
  };

  private generateHexString(): string[] {
    const hexChars = '0123456789ABCDEF';
    const length = Math.floor(Math.random() * 20) + 10;
    return Array.from({ length }, () => 
      hexChars[Math.floor(Math.random() * hexChars.length)]
    );
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = '12px monospace';
    
    this.columns.forEach((column, colIndex) => {
      const x = colIndex * 28 + 14;
      
      column.chars.forEach((char, charIndex) => {
        const y = column.y + charIndex * 14;
        
        if (y > 0 && y < this.canvas!.height) {
          // Calculate fade based on position
          const fade = 1 - (y / this.canvas!.height);
          const opacity = column.opacity * fade;
          
          // Occasional glitch to entity signature characters
          const displayChar = Math.random() > 0.995 ? 
            '░▒▓█'[Math.floor(Math.random() * 4)] : char;
          
          this.ctx!.fillStyle = this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
          this.ctx!.fillText(displayChar, x, y);
        }
      });
      
      // Move column down
      column.y += column.speed;
      
      // Reset when off screen
      if (column.y > this.canvas.height) {
        column.y = -column.chars.length * 14;
        column.chars = this.generateHexString();
        column.speed = Math.random() * 2 + 0.5;
        column.opacity = Math.random() * 0.5 + 0.1;
      }
    });
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === ANIMATION MANAGER COMPONENT ===
interface AnimationManagerProps {
  entityColor: string;
  animationType: 'oscilloscope' | 'circuitTraces' | 'hexWaterfall';
}

export function EntityAnimationBackground({ entityColor, animationType }: AnimationManagerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<EntityAnimation | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Transition effect
    setIsTransitioning(true);
    
    // Clean up previous animation
    if (animationRef.current) {
      animationRef.current.destroy();
    }

    // Create new animation based on type
    let newAnimation: EntityAnimation;
    switch (animationType) {
      case 'oscilloscope':
        newAnimation = new OscilloscopeAnimation();
        break;
      case 'circuitTraces':
        newAnimation = new CircuitTracesAnimation();
        break;
      case 'hexWaterfall':
        newAnimation = new HexWaterfallAnimation();
        break;
      default:
        newAnimation = new OscilloscopeAnimation();
    }

    // Initialize and start
    newAnimation.init(canvasRef.current, entityColor);
    newAnimation.animate();
    animationRef.current = newAnimation;

    // Fade in
    setTimeout(() => setIsTransitioning(false), 300);

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [entityColor, animationType]);

  return (
    <AnimatePresence mode="wait">
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 0.3 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 1 }}
      />
    </AnimatePresence>
  );
}