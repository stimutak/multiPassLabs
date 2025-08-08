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

// === GLITCH GRID ANIMATION (nU11.form) ===
export class GlitchGridAnimation implements EntityAnimation {
  name = 'glitchGrid';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#00f4ff';
  private grid: Array<Array<{ char: string; opacity: number; glitching: boolean }>> = [];
  private glitchTimer = 0;

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateGrid();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateGrid();
  };

  private generateGrid() {
    if (!this.canvas) return;
    
    const cellSize = 20;
    const cols = Math.ceil(this.canvas.width / cellSize);
    const rows = Math.ceil(this.canvas.height / cellSize);
    
    const chars = '█▓▒░╔╗╚╝║═┌┐└┘│─┼╬';
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.3,
        glitching: false
      }))
    );
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Clear canvas
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = '14px monospace';
    
    const cellSize = 20;
    
    // Update and draw grid
    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        // Random glitch chance
        if (Math.random() > 0.995) {
          cell.glitching = true;
          cell.char = '█▓▒░'[Math.floor(Math.random() * 4)];
          setTimeout(() => {
            cell.glitching = false;
            const chars = '█▓▒░╔╗╚╝║═┌┐└┘│─┼╬';
            cell.char = chars[Math.floor(Math.random() * chars.length)];
          }, 100);
        }
        
        // Melting effect
        if (this.glitchTimer % 60 === 0 && Math.random() > 0.98) {
          cell.opacity = 1;
          setTimeout(() => {
            cell.opacity = Math.random() * 0.3;
          }, 500);
        }
        
        // Draw cell
        const opacity = cell.glitching ? 1 : cell.opacity;
        this.ctx!.fillStyle = this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        this.ctx!.fillText(cell.char, x * cellSize, y * cellSize);
      });
    });
    
    // Create wave effect
    const waveY = Math.sin(this.glitchTimer * 0.02) * 10;
    const waveRow = Math.floor((this.canvas.height / 2 + waveY) / cellSize);
    if (this.grid[waveRow]) {
      this.grid[waveRow].forEach(cell => {
        cell.opacity = Math.min(1, cell.opacity + 0.1);
      });
    }
    
    this.glitchTimer++;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === SOFT PARTICLES ANIMATION (1r1s.fade) ===
export class SoftParticlesAnimation implements EntityAnimation {
  name = 'softParticles';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#ffa4f9';
  private particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
  }> = [];

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateParticles();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private generateParticles() {
    if (!this.canvas) return;
    
    this.particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 30 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      life: Math.random() * 100
    }));
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life += 0.5;
      
      // Soft floating effect
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;
      
      // Fade in and out based on life
      const lifeCycle = Math.sin(particle.life * 0.02);
      particle.opacity = 0.2 * lifeCycle * lifeCycle;
      
      // Wrap around edges softly
      if (particle.x < -particle.size) particle.x = this.canvas!.width + particle.size;
      if (particle.x > this.canvas!.width + particle.size) particle.x = -particle.size;
      if (particle.y < -particle.size) particle.y = this.canvas!.height + particle.size;
      if (particle.y > this.canvas!.height + particle.size) particle.y = -particle.size;
      
      // Draw soft gradient particle
      const gradient = this.ctx!.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, this.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, this.color + '00');
      
      this.ctx!.fillStyle = gradient;
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx!.fill();
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

// === FLOW FIELD ANIMATION (NØD3//STATE) ===
export class FlowFieldAnimation implements EntityAnimation {
  name = 'flowField';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#58d2bf';
  private particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    history: Array<{ x: number; y: number }>;
  }> = [];
  private time = 0;

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateParticles();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateParticles();
  };

  private generateParticles() {
    if (!this.canvas) return;
    
    this.particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: 0,
      vy: 0,
      history: []
    }));
  }

  private getFlowVector(x: number, y: number): { x: number; y: number } {
    // Perlin-like noise field simulation
    const scale = 0.005;
    const angle = (
      Math.sin(x * scale + this.time * 0.01) * 
      Math.cos(y * scale) + 
      Math.sin((x + y) * scale * 0.5)
    ) * Math.PI * 2;
    
    return {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2
    };
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.03)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Get flow vector at particle position
      const flow = this.getFlowVector(particle.x, particle.y);
      
      // Update velocity based on flow field
      particle.vx = particle.vx * 0.95 + flow.x * 0.05;
      particle.vy = particle.vy * 0.95 + flow.y * 0.05;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Add to history
      particle.history.push({ x: particle.x, y: particle.y });
      if (particle.history.length > 20) {
        particle.history.shift();
      }
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas!.width;
      if (particle.x > this.canvas!.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas!.height;
      if (particle.y > this.canvas!.height) particle.y = 0;
      
      // Draw particle trail
      this.ctx!.strokeStyle = this.color + '40';
      this.ctx!.lineWidth = 1;
      this.ctx!.beginPath();
      particle.history.forEach((point, i) => {
        if (i === 0) {
          this.ctx!.moveTo(point.x, point.y);
        } else {
          this.ctx!.lineTo(point.x, point.y);
        }
      });
      this.ctx!.stroke();
      
      // Draw particle
      this.ctx!.fillStyle = this.color + 'ff';
      this.ctx!.fillRect(particle.x - 1, particle.y - 1, 2, 2);
    });
    
    this.time++;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === WAVE INTERFERENCE ANIMATION (ƒ1lament) ===
export class WaveInterferenceAnimation implements EntityAnimation {
  name = 'waveInterference';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#d982ff';
  private time = 0;
  private waves: Array<{
    x: number;
    y: number;
    wavelength: number;
    amplitude: number;
    speed: number;
  }> = [];

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateWaves();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private generateWaves() {
    if (!this.canvas) return;
    
    // Create 3-4 wave sources
    this.waves = Array.from({ length: 4 }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      wavelength: Math.random() * 100 + 50,
      amplitude: Math.random() * 30 + 20,
      speed: Math.random() * 0.02 + 0.01
    }));
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Calculate interference pattern
    const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const step = 4; // Sample every 4 pixels for performance
    
    for (let x = 0; x < this.canvas.width; x += step) {
      for (let y = 0; y < this.canvas.height; y += step) {
        let totalWave = 0;
        
        // Calculate interference from all wave sources
        this.waves.forEach(wave => {
          const dist = Math.hypot(x - wave.x, y - wave.y);
          totalWave += Math.sin(dist / wave.wavelength - this.time * wave.speed) * wave.amplitude;
        });
        
        // Normalize and convert to opacity
        const intensity = (Math.sin(totalWave * 0.05) + 1) * 0.5;
        
        if (intensity > 0.3) {
          // Draw a small square for this sample point
          this.ctx.fillStyle = this.color + Math.floor(intensity * 100).toString(16).padStart(2, '0');
          this.ctx.fillRect(x, y, step, step);
        }
      }
    }
    
    // Move wave sources slowly
    this.waves.forEach(wave => {
      wave.x += Math.sin(this.time * 0.01) * 0.5;
      wave.y += Math.cos(this.time * 0.01) * 0.5;
    });
    
    this.time++;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === FEEDBACK LOOP ANIMATION (5ub.signal) ===
export class FeedbackLoopAnimation implements EntityAnimation {
  name = 'feedbackLoop';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#ffe95c';
  private feedbackCanvas: HTMLCanvasElement | null = null;
  private feedbackCtx: CanvasRenderingContext2D | null = null;
  private rotation = 0;

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    // Create feedback buffer
    this.feedbackCanvas = document.createElement('canvas');
    this.feedbackCtx = this.feedbackCanvas.getContext('2d');
    
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas || !this.feedbackCanvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.feedbackCanvas.width = window.innerWidth;
    this.feedbackCanvas.height = window.innerHeight;
  };

  animate = () => {
    if (!this.ctx || !this.canvas || !this.feedbackCtx || !this.feedbackCanvas) return;
    
    // Copy current canvas to feedback buffer
    this.feedbackCtx.drawImage(this.canvas, 0, 0);
    
    // Clear and add slight fade
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw feedback with transformation
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(1.01, 1.01);
    this.ctx.globalAlpha = 0.9;
    this.ctx.drawImage(
      this.feedbackCanvas,
      -this.canvas.width / 2,
      -this.canvas.height / 2
    );
    this.ctx.restore();
    
    // Add new elements
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Draw rotating squares
    this.ctx.strokeStyle = this.color + '60';
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const size = 50 + i * 30;
      const angle = this.rotation * (i + 1);
      
      this.ctx.save();
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(angle);
      this.ctx.strokeRect(-size/2, -size/2, size, size);
      this.ctx.restore();
    }
    
    // Occasional flash
    if (Math.random() > 0.98) {
      this.ctx.fillStyle = this.color + '20';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    this.rotation += 0.002;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === CORRUPTED TERMINAL ANIMATION (ctrlN0!r) ===
export class CorruptedTerminalAnimation implements EntityAnimation {
  name = 'corruptedTerminal';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private color: string = '#ff5566';
  private commands: Array<{
    text: string;
    x: number;
    y: number;
    speed: number;
    corrupted: boolean;
  }> = [];
  private glitchTimer = 0;

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    
    this.resize();
    this.generateCommands();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private generateCommands() {
    const commandList = [
      'sudo rm -rf /',
      'kill -9 $(ps aux)',
      'chmod 000 /*',
      'dd if=/dev/random of=/dev/sda',
      'fork() { fork|fork& }; fork',
      ':(){ :|:& };:',
      'mv /* /dev/null',
      'cat /dev/urandom > /dev/mem',
      'halt -f',
      'init 0',
      'systemctl stop reality.service',
      'echo "CORRUPTED" > /proc/sys/kernel/panic'
    ];
    
    if (!this.canvas) return;
    
    this.commands = Array.from({ length: 20 }, () => ({
      text: commandList[Math.floor(Math.random() * commandList.length)],
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      speed: Math.random() * 2 + 0.5,
      corrupted: false
    }));
  }

  animate = () => {
    if (!this.ctx || !this.canvas) return;
    
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = '12px monospace';
    
    this.commands.forEach(cmd => {
      // Move diagonally
      cmd.x += cmd.speed;
      cmd.y += cmd.speed * 0.5;
      
      // Corrupt randomly
      if (Math.random() > 0.995) {
        cmd.corrupted = true;
        setTimeout(() => {
          cmd.corrupted = false;
        }, 200);
      }
      
      // Draw command
      if (cmd.corrupted) {
        // Draw corrupted version
        const corrupted = cmd.text.split('').map(c => 
          Math.random() > 0.5 ? String.fromCharCode(Math.random() * 94 + 33) : c
        ).join('');
        this.ctx!.fillStyle = this.color + 'ff';
        this.ctx!.fillText(corrupted, cmd.x, cmd.y);
      } else {
        this.ctx!.fillStyle = this.color + '66';
        this.ctx!.fillText(cmd.text, cmd.x, cmd.y);
      }
      
      // Wrap around
      if (cmd.x > this.canvas!.width) {
        cmd.x = -200;
        cmd.y = Math.random() * this.canvas!.height;
      }
    });
    
    // ERROR messages
    if (this.glitchTimer % 120 === 0) {
      const errorX = Math.random() * this.canvas.width;
      const errorY = Math.random() * this.canvas.height;
      this.ctx.fillStyle = this.color + 'ff';
      this.ctx.font = 'bold 16px monospace';
      this.ctx.fillText('[ERROR] SYSTEM CORRUPTED', errorX, errorY);
      this.ctx.font = '12px monospace';
    }
    
    this.glitchTimer++;
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === ALL GLITCH ANIMATION (mu1ti.p@ss) ===
export class AllGlitchAnimation implements EntityAnimation {
  name = 'allGlitch';
  private canvas: HTMLCanvasElement | null = null;
  private currentAnimation: EntityAnimation | null = null;
  private animationId: number | null = null;
  private switchTimer = 0;
  private animations = [
    OscilloscopeAnimation,
    CircuitTracesAnimation,
    HexWaterfallAnimation,
    GlitchGridAnimation,
    SoftParticlesAnimation,
    FlowFieldAnimation,
    WaveInterferenceAnimation,
    FeedbackLoopAnimation,
    CorruptedTerminalAnimation
  ];
  private currentIndex = 0;

  init(canvas: HTMLCanvasElement, color: string) {
    this.canvas = canvas;
    this.switchAnimation(color);
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    // Current animation handles its own resize
  };

  private switchAnimation(color: string) {
    if (this.currentAnimation) {
      this.currentAnimation.destroy();
    }
    
    if (!this.canvas) return;
    
    const AnimationClass = this.animations[this.currentIndex];
    this.currentAnimation = new AnimationClass();
    this.currentAnimation.init(this.canvas, color);
    this.currentAnimation.animate();
    
    this.currentIndex = (this.currentIndex + 1) % this.animations.length;
  }

  animate = () => {
    // The individual animations handle their own animation loops
    // We just switch between them rapidly
    this.switchTimer++;
    
    if (this.switchTimer > 60) { // Switch every second
      this.switchAnimation('#dddddd');
      this.switchTimer = 0;
    }
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.currentAnimation) {
      this.currentAnimation.destroy();
    }
    window.removeEventListener('resize', this.resize);
  }
}

// === ANIMATION MANAGER COMPONENT ===
interface AnimationManagerProps {
  entityColor: string;
  animationType: 'oscilloscope' | 'circuitTraces' | 'hexWaterfall' | 'glitchGrid' | 'softParticles' | 'flowField' | 'waveInterference' | 'feedbackLoop' | 'corruptedTerminal' | 'allGlitch';
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
      case 'glitchGrid':
        newAnimation = new GlitchGridAnimation();
        break;
      case 'softParticles':
        newAnimation = new SoftParticlesAnimation();
        break;
      case 'flowField':
        newAnimation = new FlowFieldAnimation();
        break;
      case 'waveInterference':
        newAnimation = new WaveInterferenceAnimation();
        break;
      case 'feedbackLoop':
        newAnimation = new FeedbackLoopAnimation();
        break;
      case 'corruptedTerminal':
        newAnimation = new CorruptedTerminalAnimation();
        break;
      case 'allGlitch':
        newAnimation = new AllGlitchAnimation();
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