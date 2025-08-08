'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  initAudio, 
  playBootSound, 
  playSystemCheckSound, 
  playGlitchSound,
  playAmbientDrone,
  playTypingSound,
  toggleAudioMute
} from '@/lib/audio/glitch-audio';
import { LAB_ENTITIES, glitchText } from '@/lib/entities';
import { logoVariants } from './logo-variants';

// Enhanced typewriter with glitch capability
function GlitchTypewriter({ 
  text, 
  onComplete,
  glitchFrequency = 0.1,
  withSound = true 
}: { 
  text: string; 
  onComplete?: () => void;
  glitchFrequency?: number;
  withSound?: boolean;
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    let index = 0;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`█▓▒░';
    
    const interval = setInterval(() => {
      if (index <= text.length) {
        // Play typing sound
        if (withSound && index > 0 && index % 2 === 0) {
          playTypingSound();
        }
        
        // Random glitch effect
        if (Math.random() < glitchFrequency && index > 0) {
          setGlitchActive(true);
          if (withSound) playGlitchSound();
          const glitchedPart = Array.from({ length: Math.min(5, index) }, 
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join('');
          setDisplayText(text.slice(0, index - glitchedPart.length) + glitchedPart);
          
          setTimeout(() => {
            setGlitchActive(false);
            setDisplayText(text.slice(0, index));
          }, 50);
        } else {
          setDisplayText(text.slice(0, index));
        }
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 25);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, onComplete, glitchFrequency]);

  return (
    <div className={`font-mono text-sm ${glitchActive ? 'text-red-500' : 'text-green-400'}`} style={{ color: glitchActive ? '#ef4444' : '#4ade80' }}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ color: glitchActive ? '#ef4444' : '#4ade80' }}>
        {glitchActive ? '█' : '_'}
      </span>
    </div>
  );
}


// Enhanced ASCII Logo with glitch
function GlitchAsciiLogo() {
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
      {/* Lightning effect during glitch */}
      {glitchActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl animate-pulse">⚡</div>
        </div>
      )}
      
      <motion.pre
        initial={{ opacity: 0, scale: 0.95 }}
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
        transition={{ duration: glitchActive ? 0.05 : 0.3 }}
        className="font-mono text-xs leading-tight select-none"
        style={{ 
          color: '#4ade80',
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

// System boot sequence with entities
function SystemBoot() {
  const [lines, setLines] = useState<Array<{ text: string; entity?: any }>>([]);
  
  const bootSequence = [
    { text: '> Initializing core systems...', delay: 0 },
    { text: '> Loading entity matrix...', delay: 200 },
    { text: '> [OK] Entity authentication:', delay: 400, showEntities: true },
    { text: '> Establishing quantum tunnel...', delay: 2500 },
    { text: '> Synchronizing collective consciousness...', delay: 2700 },
    { text: '> Building reality mesh...', delay: 2900 },
    { text: '> Compiling glitch shaders...', delay: 3100 },
    { text: '> ', delay: 3300 },
    { text: '> System ready.', delay: 3500 },
    { text: '> All entities online.', delay: 3700 },
  ];

  useEffect(() => {
    bootSequence.forEach(({ text, delay, showEntities }) => {
      setTimeout(() => {
        if (showEntities) {
          setLines(prev => [...prev, { text }]);
          // Add all entities with staggered delay
          LAB_ENTITIES.forEach((entity, index) => {
            setTimeout(() => {
              setLines(prev => [...prev, { 
                text: `   ✓ ${entity.name} authenticated`, 
                entity 
              }]);
            }, 100 * index);
          });
        } else {
          setLines(prev => [...prev, { text }]);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="font-mono text-xs space-y-1 max-h-96 overflow-y-auto" style={{ color: '#4ade80' }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
          className={line.entity ? 'ml-4' : ''}
        >
          <span style={{ color: line.entity ? '#86efac' : '#4ade80' }}>
            {line.text}
          </span>
          {line.entity && (
            <span style={{ color: line.entity.color }} className="ml-2">
              {line.entity.signature}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Glitch overlay effect
function GlitchOverlay() {
  const [glitchBars, setGlitchBars] = useState<Array<{ top: number; height: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchBars(
          Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
            top: Math.random() * 100,
            height: Math.random() * 5 + 1
          }))
        );
        setTimeout(() => setGlitchBars([]), 50);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {glitchBars.map((bar, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bg-red-500/20"
          style={{ 
            top: `${bar.top}%`, 
            height: `${bar.height}%`,
            animation: 'glitch-shift 0.1s infinite'
          }}
        />
      ))}
    </>
  );
}

export default function StartupIntroV2({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'boot' | 'entities' | 'logo' | 'ready'>('boot');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [logoKeyPressed, setLogoKeyPressed] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Initialize audio on first user interaction
  const handleUserInteraction = async () => {
    if (!audioInitialized) {
      await initAudio();
      setAudioInitialized(true);
      setAudioEnabled(true);
      playBootSound();
      playAmbientDrone(15);
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
    // Add click/key listeners for audio initialization
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
  
  // Phase progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    if (phase === 'boot') {
      if (audioEnabled) playBootSound();
      timers.push(setTimeout(() => {
        setPhase('entities');
      }, 1500));
    } else if (phase === 'entities') {
      if (audioEnabled) playSystemCheckSound();
      timers.push(setTimeout(() => {
        setPhase('logo');
      }, 4000));
    } else if (phase === 'logo') {
      if (audioEnabled) playGlitchSound();
      // Wait 5 seconds on logo unless key pressed
      if (!logoKeyPressed) {
        timers.push(setTimeout(() => {
          setPhase('ready');
        }, 5000));
      }
    } else if (phase === 'ready') {
      // Hold welcome screen longer (3 seconds)
      timers.push(setTimeout(() => {
        onComplete();
      }, 3000));
    }
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, onComplete, audioEnabled, logoKeyPressed]);

  // Glitch audio generation (Richard Devine style)
  useEffect(() => {
    if (!audioEnabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    const playGlitch = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // Random frequency for glitch
      oscillator.frequency.value = Math.random() * 800 + 100;
      oscillator.type = Math.random() > 0.5 ? 'square' : 'sawtooth';

      // Filter settings
      filter.type = 'bandpass';
      filter.frequency.value = Math.random() * 2000 + 200;
      filter.Q.value = Math.random() * 10 + 1;

      // Envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

      // Connect nodes
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) playGlitch();
    }, 100);

    return () => {
      clearInterval(interval);
      audioContext.close();
    };
  }, [audioEnabled]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black z-50 overflow-hidden font-mono"
        style={{ opacity: 1 }}
      >
        {/* Matrix rain effect */}
        <div className="absolute inset-0 opacity-20">
          <MatrixRain />
        </div>
        
        {/* Glitch overlay */}
        <GlitchOverlay />
        
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        </div>
        
        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-3xl space-y-6" style={{ minHeight: '200px' }}>
            {phase === 'boot' && (
              <motion.div
                key="boot"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'block' }}
              >
                <GlitchTypewriter 
                  text="[SYSTEM] Initializing MultiPass Labs collective consciousness..." 
                  glitchFrequency={0.15}
                />
                <div className="mt-2 text-xs" style={{ color: '#4ade80', opacity: 0.6 }}>
                  <GlitchTypewriter text="Loading entity protocols..." glitchFrequency={0.05} />
                </div>
              </motion.div>
            )}
            
            {phase === 'entities' && (
              <motion.div
                key="entities"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'block' }}
              >
                <SystemBoot />
              </motion.div>
            )}
            
            {phase === 'logo' && (
              <motion.div
                key="logo"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
                style={{ display: 'flex' }}
              >
                <img
                  src="/crisp-logo.png"
                  alt="MultiPass Labs logo"
                  className="w-40 h-40 mb-4"
                />
                <motion.div 
                  className="mt-6 text-xs"
                  style={{ color: '#4ade80' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  [Press any key to enter]
                </motion.div>
              </motion.div>
            )}
            
            {phase === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-center"
                style={{ display: 'block' }}
              >
                <div className="text-2xl mb-4" style={{ color: '#4ade80' }}>
                  <GlitchTypewriter text="WELCOME TO THE COLLECTIVE" glitchFrequency={0.2} />
                </div>
                <div className="text-sm" style={{ color: '#4ade80', opacity: 0.6 }}>
                  {LAB_ENTITIES[Math.floor(Math.random() * LAB_ENTITIES.length)]?.signature || '[UNKNOWN]'} online
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={() => {
              const newState = toggleAudioMute();
              setAudioEnabled(!newState);
            }}
            className="font-mono text-green-400/40 hover:text-green-400 text-xs transition-colors"
          >
            [{audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}]
          </button>
          <button
            onClick={onComplete}
            className="font-mono text-green-400/40 hover:text-green-400 text-xs transition-colors"
          >
            [SKIP]
          </button>
        </div>
        
        {/* Entity status bar */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-green-400/40">
          <span>multipass.labs v1.0.0</span>
          <span>entities: {LAB_ENTITIES.length} online</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Enhanced Matrix rain with entity signatures
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Include entity signatures in the rain
    const entityChars = LAB_ENTITIES.flatMap(e => e.name.split(''));
    const matrixChars = 'アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()_+-=';
    const chars = [...entityChars, ...matrixChars.split('')];
    
    const fontSize = 12;
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
        const text = chars[Math.floor(Math.random() * chars.length)];
        if (text && drops[i] !== undefined) {
          ctx.fillText(text, i * fontSize, drops[i]! * fontSize);
        }
        
        const dropValue = drops[i];
        if (dropValue !== undefined && dropValue * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else if (dropValue !== undefined) {
          drops[i] = dropValue + 1;
        }
      }
    };

    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}