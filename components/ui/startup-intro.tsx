'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Typewriter effect for boot sequence
function Typewriter({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, onComplete]);

  return (
    <div className="font-mono text-green-400 text-sm">
      {displayText}
      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
    </div>
  );
}

// Glitch effect text
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [glitchedText, setGlitchedText] = useState(text);
  
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const pos = Math.floor(Math.random() * text.length);
        const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        setGlitchedText(
          text.slice(0, pos) + glitchChar + text.slice(pos + 1)
        );
      } else {
        setGlitchedText(text);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{glitchedText}</span>;
}

// ASCII Art Logo
function AsciiLogo() {
  const logo = `
╔══════════════════════════════════════╗
║                                      ║
║   ███╗   ███╗██████╗ ██╗            ║
║   ████╗ ████║██╔══██╗██║            ║
║   ██╔████╔██║██████╔╝██║            ║
║   ██║╚██╔╝██║██╔═══╝ ██║            ║
║   ██║ ╚═╝ ██║██║     ███████╗       ║
║   ╚═╝     ╚═╝╚═╝     ╚══════╝       ║
║                                      ║
║     M U L T I P A S S   L A B S      ║
║                                      ║
╚══════════════════════════════════════╝
  `;

  return (
    <motion.pre
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono text-green-400 text-xs leading-tight"
    >
      {logo}
    </motion.pre>
  );
}

// System info display
function SystemInfo() {
  const [lines, setLines] = useState<string[]>([]);
  
  const systemLines = [
    '> Initializing core systems...',
    '> Loading art modules... [OK]',
    '> Connecting to neural network... [OK]',
    '> Establishing quantum tunnel... [OK]',
    '> Synchronizing creative matrix... [OK]',
    '> Building reality mesh... [OK]',
    '',
    '> System ready.',
    '> Welcome to MultiPass Labs.'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < systemLines.length) {
        setLines(prev => [...prev, systemLines[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-green-400 text-xs space-y-1">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

// Matrix rain effect background
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-10"
    />
  );
}

export default function StartupIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'boot' | 'system' | 'logo' | 'ready'>('boot');
  const [skipHover, setSkipHover] = useState(false);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    if (phase === 'boot') {
      timers.push(setTimeout(() => setPhase('system'), 2000));
    } else if (phase === 'system') {
      timers.push(setTimeout(() => setPhase('logo'), 3000));
    } else if (phase === 'logo') {
      timers.push(setTimeout(() => setPhase('ready'), 2000));
    } else if (phase === 'ready') {
      timers.push(setTimeout(onComplete, 1000));
    }
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-50 overflow-hidden"
      >
        <MatrixRain />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-8">
            {phase === 'boot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typewriter text="[SYSTEM] Booting MultiPass Labs v1.0.0..." />
                <div className="mt-4 text-green-400 font-mono text-xs opacity-60">
                  <GlitchText text="Reality Engine Initialized" />
                </div>
              </motion.div>
            )}
            
            {phase === 'system' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SystemInfo />
              </motion.div>
            )}
            
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <AsciiLogo />
                <motion.div 
                  className="mt-4 text-green-400 font-mono text-xs"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Press any key to continue...
                </motion.div>
              </motion.div>
            )}
            
            {phase === 'ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center"
              >
                <div className="font-mono text-green-400 text-2xl mb-2">
                  <GlitchText text="WELCOME" />
                </div>
                <div className="font-mono text-green-400/60 text-sm">
                  Entering the multiverse...
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Skip button */}
        <button
          onClick={onComplete}
          onMouseEnter={() => setSkipHover(true)}
          onMouseLeave={() => setSkipHover(false)}
          className="absolute top-4 right-4 font-mono text-green-400/40 hover:text-green-400 text-xs transition-colors"
        >
          {skipHover ? '[SKIP]' : 'skip'}
        </button>
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}