'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  initAudio, 
  playBootSound, 
  playSystemCheckSound, 
  playGlitchSound,
  playAmbientDrone,
  toggleAudioMute
} from '@/lib/audio/glitch-audio';
import { LAB_ENTITIES, formatEntitySignature } from '@/lib/entities';
import { logoVariants } from './logo-variants';

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

// ASCII Art Logo with multiple variations
function AsciiLogo() {
  const [logoVariant, setLogoVariant] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Cycle through logo variants for glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => {
        setLogoVariant(prev => (prev + 1) % logoVariants.length);
        setGlitchActive(false);
      }, 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const logo = logoVariants[logoVariant] || logoVariants[0];

  return (
    <div className="relative">
      {/* Lightning effect */}
      {glitchActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl animate-pulse">⚡</div>
        </div>
      )}
      
      <motion.pre
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: glitchActive ? [1, 0.2, 1, 0.5, 1] : 1, 
          scale: glitchActive ? [1, 1.02, 0.98, 1.01, 1] : 1,
          filter: glitchActive ? [
            'hue-rotate(0deg) brightness(1)',
            'hue-rotate(180deg) brightness(1.5)',
            'hue-rotate(90deg) brightness(0.8)',
            'hue-rotate(270deg) brightness(1.2)',
            'hue-rotate(0deg) brightness(1)'
          ] : 'hue-rotate(0deg) brightness(1)'
        }}
        transition={{ duration: glitchActive ? 0.05 : 0.5 }}
        className={`font-mono text-green-400 text-xs leading-tight ${
          glitchActive ? 'text-shadow-lg' : ''
        }`}
        style={{
          textShadow: glitchActive 
            ? '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00'
            : '0 0 5px #00ff00'
        }}
      >
        {logo}
      </motion.pre>
    </div>
  );
}

// System info display with entity signatures
function SystemInfo({ onLineRender }: { onLineRender?: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  // Generate system lines with random entity signatures
  const systemLines = [
    '> Initializing core systems...',
    `> Loading art modules... ${formatEntitySignature(LAB_ENTITIES[0]!)} [OK]`,
    `> Connecting to neural network... ${formatEntitySignature(LAB_ENTITIES[2]!)} [OK]`,
    `> Establishing quantum tunnel... ${formatEntitySignature(LAB_ENTITIES[4]!)} [OK]`,
    `> Synchronizing creative matrix... ${formatEntitySignature(LAB_ENTITIES[6]!)} [OK]`,
    `> Building reality mesh... ${formatEntitySignature(LAB_ENTITIES[8]!)} [OK]`,
    '',
    `> System ready. ${formatEntitySignature(LAB_ENTITIES[9]!)}`,
    '> Welcome to MultiPass Labs.'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < systemLines.length) {
        const line = systemLines[index];
        if (line !== undefined) {
          setLines(prev => [...prev, line]);
        }
        if (onLineRender) onLineRender();
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [onLineRender]);

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
        const dropValue = drops[i];
        if (text && dropValue !== undefined) {
          ctx.fillText(text, i * fontSize, dropValue * fontSize);
        }
        
        if (dropValue !== undefined && dropValue * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else if (dropValue !== undefined) {
          drops[i] = dropValue + 1;
        }
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
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [logoKeyPressed, setLogoKeyPressed] = useState(false);
  const selectedEntity = useRef(LAB_ENTITIES[Math.floor(Math.random() * LAB_ENTITIES.length)] || LAB_ENTITIES[0]);
  
  // Initialize audio on first user interaction
  const handleUserInteraction = async () => {
    if (!audioInitialized) {
      await initAudio();
      setAudioInitialized(true);
      setAudioEnabled(true);
      playBootSound();
      playAmbientDrone(10);
    }
  };

  // Handle keypress during logo phase
  const handleLogoKeyPress = () => {
    if (phase === 'logo' && !logoKeyPressed) {
      setLogoKeyPressed(true);
      setPhase('ready');
    }
  };

  useEffect(() => {
    // Add click listener for audio initialization
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audioInitialized]);

  useEffect(() => {
    // Add keypress listener for logo phase
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUserInteraction();
      handleLogoKeyPress();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, logoKeyPressed]);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    if (phase === 'boot') {
      if (audioEnabled) playBootSound();
      timers.push(setTimeout(() => setPhase('system'), 2000));
    } else if (phase === 'system') {
      timers.push(setTimeout(() => setPhase('logo'), 3000));
    } else if (phase === 'logo') {
      if (audioEnabled) playGlitchSound();
      // Wait 5 seconds on logo unless key pressed
      if (!logoKeyPressed) {
        timers.push(setTimeout(() => setPhase('ready'), 5000));
      }
    } else if (phase === 'ready') {
      // Hold welcome screen longer (3 seconds)
      timers.push(setTimeout(onComplete, 3000));
    }
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, onComplete, audioEnabled, logoKeyPressed]);

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
                <div className="mt-2 text-xs font-mono" style={{ color: selectedEntity.current?.color }}>
                  {selectedEntity.current && formatEntitySignature(selectedEntity.current)} ACTIVE
                </div>
              </motion.div>
            )}
            
            {phase === 'system' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SystemInfo onLineRender={() => audioEnabled && playSystemCheckSound()} />
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
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-4">
          {/* Audio toggle */}
          <button
            onClick={() => {
              const newState = toggleAudioMute();
              setAudioEnabled(!newState);
            }}
            className="font-mono text-green-400/40 hover:text-green-400 text-xs transition-colors"
          >
            {audioEnabled ? '[AUDIO: ON]' : '[AUDIO: OFF]'}
          </button>
          
          {/* Skip button */}
          <button
            onClick={onComplete}
            onMouseEnter={() => setSkipHover(true)}
            onMouseLeave={() => setSkipHover(false)}
            className="font-mono text-green-400/40 hover:text-green-400 text-xs transition-colors"
          >
            {skipHover ? '[SKIP]' : 'skip'}
          </button>
        </div>
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}