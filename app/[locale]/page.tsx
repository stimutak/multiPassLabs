'use client';

import { SimpleHeader } from '@/components/ui/simple-header';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LAB_ENTITIES, getRandomEntity, glitchText } from '@/lib/entities';
import { motion } from 'framer-motion';
import { EntityAnimationBackground } from '@/components/backgrounds/entity-animations';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const StartupIntroV2 = dynamic(() => import('@/components/ui/startup-intro-v2'), { ssr: false });

// Terminal cursor component
function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);
  
  return <span className={`${visible ? 'opacity-100' : 'opacity-0'}`}>_</span>;
}

// Subliminal flash component
function SubliminalFlash({ entity }: { entity: any }) {
  const [showFlash, setShowFlash] = useState(false);
  const [flashContent, setFlashContent] = useState('');
  
  const messages = [
    `[${entity?.signature}] OBSERVING...`,
    `SIGNAL: ${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    `COORDINATES: ${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`,
    `ENTITY ACTIVE: ${entity?.name}`,
    `FREQUENCY: ${Math.floor(Math.random() * 9999)}Hz`,
    `ACCESS LEVEL: ${entity?.version}`,
    `SCANNING...`,
    `PATTERN DETECTED`,
    `[REDACTED]`,
    `▓▓▓▓▓▓▓▓▓`,
    entity?.glitchPattern || '█▓▒░',
  ];
  
  useEffect(() => {
    const flashInterval = setInterval(() => {
      // Only flash occasionally (10% chance)
      if (Math.random() < 0.1) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setFlashContent(randomMessage || '');
        setShowFlash(true);
        
        // Flash duration between 50-150ms
        const flashDuration = 50 + Math.random() * 100;
        setTimeout(() => setShowFlash(false), flashDuration);
      }
    }, 2000 + Math.random() * 3000); // Random interval 2-5 seconds
    
    return () => clearInterval(flashInterval);
  }, [entity]);
  
  if (!showFlash) return null;
  
  return (
    <div 
      className="absolute top-4 right-4 font-mono text-xs pointer-events-none"
      style={{ 
        color: entity?.color || '#00ff00',
        opacity: 0.3 + Math.random() * 0.4,
        textShadow: `0 0 10px ${entity?.color}66`,
        animation: 'glitch 0.1s infinite'
      }}
    >
      {flashContent}
    </div>
  );
}

// Glitch text component
function GlitchTextDisplay({ text, className = '' }: { text: string; className?: string }) {
  const [glitched, setGlitched] = useState(text);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const entity = getRandomEntity();
        setGlitched(glitchText(text, entity));
        setTimeout(() => setGlitched(text), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{glitched}</span>;
}

// Terminal line component with entity-based colors
function TerminalLine({ children, prefix = '>', delay = 0, color = '#00f4ff' }: { children: React.ReactNode; prefix?: string; delay?: number; color?: string }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="font-mono text-sm mb-2"
      style={{ color }}
    >
      <span style={{ color: `${color}cc`, filter: 'brightness(1.2)' }}>{prefix}</span> {children}
    </motion.div>
  );
}

// Quick intro animation for returning visitors
function QuickIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'flash' | 'glitch' | 'ready'>('flash');
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Flash logo
    timers.push(setTimeout(() => setPhase('glitch'), 300));
    
    // Glitch into existence
    timers.push(setTimeout(() => setPhase('ready'), 800));
    
    // Complete
    timers.push(setTimeout(() => onComplete(), 1200));
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {phase === 'flash' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.8, 1], scale: [0.5, 1.1, 0.95, 1] }}
          transition={{ duration: 0.3 }}
        >
          <pre className="font-mono text-green-400 text-xs leading-tight"
            style={{ textShadow: '0 0 20px #00ff00' }}
          >
{`╔══════════════════════════════════════════════╗
║   ███╗   ███╗██████╗ ██╗      ▓▓▓▓▓▓         ║
║   ████╗ ████║██╔══██╗██║      ▓▓▓▓▓▓         ║
║   ██╔████╔██║██████╔╝██║      ▓▓▓▓▓▓         ║
║   ██║╚██╔╝██║██╔═══╝ ██║      ▓▓▓▓▓▓         ║
║   ██║ ╚═╝ ██║██║     ███████╗ ▓▓▓▓▓▓         ║
╚══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      )}
      
      {phase === 'glitch' && (
        <motion.div
          animate={{ 
            opacity: [1, 0.2, 1, 0.5, 1],
            y: [0, -5, 5, -2, 0]
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Glitch lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full bg-green-400/20"
                style={{
                  height: Math.random() * 20 + 5,
                  top: `${Math.random() * 100}%`,
                  animation: `glitch-shift ${0.1 + Math.random() * 0.2}s infinite`
                }}
              />
            ))}
          </div>
          
          <pre className="font-mono text-green-400 text-xs leading-tight relative"
            style={{ 
              textShadow: '0 0 10px #00ff00',
              filter: 'brightness(1.5)'
            }}
          >
{`╔══════════════════════════════════════════════╗
║   ███╗   ███╗██████╗ ██╗      ▓▓▓▓▓▓         ║
║   ████╗ ████║██╔══██╗██║      ▓▓▓▓▓▓         ║
║   ██╔████╔██║██████╔╝██║      ▓▓▓▓▓▓         ║
║   ██║╚██╔╝██║██╔═══╝ ██║      ▓▓▓▓▓▓         ║
║   ██║ ╚═╝ ██║██║     ███████╗ ▓▓▓▓▓▓         ║
╚══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      )}
      
      {phase === 'ready' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <pre className="font-mono text-green-400 text-xs leading-tight"
            style={{ textShadow: '0 0 5px #00ff00' }}
          >
{`╔══════════════════════════════════════════════╗
║   ███╗   ███╗██████╗ ██╗      ▓▓▓▓▓▓         ║
║   ████╗ ████║██╔══██╗██║      ▓▓▓▓▓▓         ║
║   ██╔████╔██║██████╔╝██║      ▓▓▓▓▓▓         ║
║   ██║╚██╔╝██║██╔═══╝ ██║      ▓▓▓▓▓▓         ║
║   ██║ ╚═╝ ██║██║     ███████╗ ▓▓▓▓▓▓         ║
╚══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      )}
    </div>
  );
}

export default function HomePage() {
  // Start with an entity that has an implemented animation
  const initialEntity = LAB_ENTITIES.find(e => e.animation === 'oscilloscope') || LAB_ENTITIES[0]!;
  const [currentEntity, setCurrentEntity] = useState(initialEntity);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showFullBoot, setShowFullBoot] = useState(false);
  const [showQuickIntro, setShowQuickIntro] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [entityQueue, setEntityQueue] = useState<typeof LAB_ENTITIES>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [bootChecked, setBootChecked] = useState(false);
  
  // Get current animation type
  const animationType = currentEntity?.animation || 'oscilloscope';
  
  useEffect(() => {
    // Check if user has seen boot animation before
    const hasSeenBoot = localStorage.getItem('hasSeenBootAnimation');
    
    if (!hasSeenBoot) {
      // First time visitor - show full boot
      setShowFullBoot(true);
    } else {
      // Returning visitor - skip intro for now
      setShowQuickIntro(false);
      setContentRevealed(true);
    }
    setBootChecked(true);
  }, []);
  
  const handleBootComplete = () => {
    localStorage.setItem('hasSeenBootAnimation', 'true');
    setShowFullBoot(false);
    setContentRevealed(true);
  };
  
  const handleQuickIntroComplete = () => {
    setShowQuickIntro(false);
    setContentRevealed(true);
  };

  // Shuffle function to randomize array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  };

  // Initialize entity queue with shuffled entities
  useEffect(() => {
    const shuffled = shuffleArray(LAB_ENTITIES);
    setEntityQueue(shuffled);
    console.log('Initialized entity queue with shuffled order:', shuffled.map(e => e.name));
  }, []);

  useEffect(() => {
    // Cycle through all entities in order, then reshuffle
    if (entityQueue.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentQueueIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        
        // If we've shown all entities, reshuffle and start over
        if (nextIndex >= entityQueue.length) {
          const reshuffled = shuffleArray(LAB_ENTITIES);
          setEntityQueue(reshuffled);
          console.log('Reshuffling entity queue:', reshuffled.map(e => e.name));
          const firstEntity = reshuffled[0];
          if (firstEntity) {
            console.log('Switching to entity:', firstEntity.name, 'with animation:', firstEntity.animation);
            setCurrentEntity(firstEntity);
          }
          return 0;
        } else {
          const nextEntity = entityQueue[nextIndex];
          if (nextEntity) {
            console.log(`[${nextIndex + 1}/${entityQueue.length}] Switching to entity:`, nextEntity.name, 'with animation:', nextEntity.animation);
            setCurrentEntity(nextEntity);
          }
          return nextIndex;
        }
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [entityQueue]);
  
  useEffect(() => {
    // Simulate command history
    const commands = [
      'reality.mesh.compile()',
      'collective.sync()',
      'quantum.tunnel.establish()',
      'neural.network.init()',
      'glitch.shaders.load()',
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        const cmd = commands[index];
        if (cmd) {
          setCommandHistory(prev => [...prev.slice(-4), cmd]);
        }
        index++;
      } else {
        index = 0;
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Show loading state while checking localStorage
  if (!bootChecked) {
    return <div className="fixed inset-0 bg-black" />;
  }

  // Show full boot animation for first-time visitors
  if (showFullBoot) {
    return <StartupIntroV2 onComplete={handleBootComplete} />;
  }

  // Show quick intro for returning visitors
  if (showQuickIntro) {
    return <QuickIntro onComplete={handleQuickIntroComplete} />;
  }

  return (
    <>
      {/* Show header only after intro/boot is complete */}
      <SimpleHeader currentEntity={currentEntity} />
      
      <main className="relative min-h-screen bg-black pt-20 md:pt-12">

        {/* Main content */}
        <div className="opacity-100">
          {/* Entity-based animation background */}
          <EntityAnimationBackground 
            entityColor={currentEntity?.color || '#00f4ff'} 
            animationType={animationType as any}
          />
          
          {/* Scanlines */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
          </div>
          
          {/* Hero Section - Terminal Interface */}
          <section className="relative min-h-screen flex items-center justify-center p-8">
          <div className="relative z-10 w-full max-w-6xl">
            {/* Terminal Window */}
            <div className="relative bg-black/90 border-2 rounded-lg p-8 backdrop-blur-sm transition-all duration-500"
                 style={{ 
                   borderColor: `${currentEntity?.color}60`,
                   boxShadow: `0 0 30px ${currentEntity?.color}30`
                 }}>
              {/* Subliminal Flash in top-right */}
              <SubliminalFlash entity={currentEntity} />
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b transition-all duration-500"
                   style={{ borderColor: `${currentEntity?.color}20` }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs transition-all duration-500"
                     style={{ color: `${currentEntity?.color}99` }}>
                  terminal@multipass.labs ~ {currentEntity?.signature || '[UNKNOWN]'}
                </div>
              </div>
              
              {/* ASCII Logo */}
              <pre className="font-mono text-xs mb-8 leading-tight transition-all duration-500"
                   style={{ 
                     color: currentEntity?.color,
                     textShadow: `0 0 10px ${currentEntity?.color}66`
                   }}>
{`
╔══════════════════════════════════════════════╗
║                                              ║
║   ███╗   ███╗██████╗ ██╗      ▓▓▓▓▓▓         ║
║   ████╗ ████║██╔══██╗██║      ▓▓▓▓▓▓         ║
║   ██╔████╔██║██████╔╝██║      ▓▓▓▓▓▓         ║
║   ██║╚██╔╝██║██╔═══╝ ██║      ▓▓▓▓▓▓         ║
║   ██║ ╚═╝ ██║██║     ███████╗ ▓▓▓▓▓▓         ║
║   ╚═╝     ╚═╝╚═╝     ╚══════╝                ║
║                                              ║
║   M U L T I P A S S   L A B S   [v1.0.0]     ║
║                                              ║
╚══════════════════════════════════════════════╝
`}
              </pre>
              
              {/* Terminal Content */}
              <div className="space-y-2 mb-8">
                <TerminalLine delay={0} color={currentEntity?.color}>
                  <GlitchTextDisplay text="COLLECTIVE STATUS: ONLINE" />
                </TerminalLine>
                <TerminalLine delay={200} color={currentEntity?.color}>
                  ENTITIES: {LAB_ENTITIES.length} ACTIVE
                </TerminalLine>
                <TerminalLine delay={400} color={currentEntity?.color}>
                  CURRENT OPERATOR: <span style={{ color: currentEntity?.color || '#ffffff' }}>{currentEntity?.name || '[UNKNOWN]'}</span>
                </TerminalLine>
                <TerminalLine delay={600} color={currentEntity?.color}>
                  ROLE: {currentEntity?.role || '[UNKNOWN]'}
                </TerminalLine>
                <TerminalLine delay={800} prefix="$" color={currentEntity?.color}>
                  <span className="text-yellow-400">exec</span> multipass.labs.interface<TerminalCursor />
                </TerminalLine>
              </div>
              
              {/* Command History */}
              <div className="border-t pt-4 mb-6 transition-all duration-500"
                   style={{ borderColor: `${currentEntity?.color}20` }}>
                <div className="font-mono text-xs mb-2" 
                     style={{ color: `${currentEntity?.color}66` }}># Recent Activity</div>
                {commandHistory.map((cmd, i) => (
                  <div key={i} className="font-mono text-xs mb-1"
                       style={{ color: `${currentEntity?.color}99` }}>
                    [{new Date().toLocaleTimeString()}] {cmd}
                  </div>
                ))}
              </div>
              
              {/* Navigation Commands */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/en/gallery" className="group">
                  <div className="border-2 rounded p-4 transition-all duration-300"
                       style={{ 
                         backgroundColor: 'rgba(0,0,0,1)',
                         borderColor: `${currentEntity?.color}60`,
                         boxShadow: `0 0 20px ${currentEntity?.color}10`
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}60`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,1)';
                       }}>
                    <div className="font-mono text-sm mb-2" style={{ color: currentEntity?.color }}>
                      $ <span style={{ color: '#ffe95c' }}>cd</span> /gallery
                    </div>
                    <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}99` }}>
                      // Interactive visual experiments
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/blog" className="group">
                  <div className="border-2 rounded p-4 transition-all duration-300"
                       style={{ 
                         backgroundColor: 'rgba(0,0,0,1)',
                         borderColor: `${currentEntity?.color}60`,
                         boxShadow: `0 0 20px ${currentEntity?.color}10`
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}60`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,1)';
                       }}>
                    <div className="font-mono text-sm mb-2" style={{ color: currentEntity?.color }}>
                      $ <span style={{ color: '#ffe95c' }}>cd</span> /blog
                    </div>
                    <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}99` }}>
                      // Experimental transmissions & discoveries
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/music" className="group">
                  <div className="border-2 rounded p-4 transition-all duration-300"
                       style={{ 
                         backgroundColor: 'rgba(0,0,0,1)',
                         borderColor: `${currentEntity?.color}60`,
                         boxShadow: `0 0 20px ${currentEntity?.color}10`
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}60`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,1)';
                       }}>
                    <div className="font-mono text-sm mb-2" style={{ color: currentEntity?.color }}>
                      $ <span style={{ color: '#ffe95c' }}>cd</span> /music
                    </div>
                    <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}99` }}>
                      // Audio-reactive experiences
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          </section>

          {/* System Info Section */}
        <section className="relative py-20 px-8 border-t transition-all duration-500"
                 style={{ borderColor: `${currentEntity?.color}20` }}>
          <div className="max-w-6xl mx-auto">
            <div className="font-mono" style={{ color: currentEntity?.color }}>
              <h2 className="text-2xl mb-8">
                <GlitchTextDisplay text="SYSTEM MODULES" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Module Cards */}
                <div className="border rounded p-6 bg-black/50 transition-all duration-500"
                     style={{ borderColor: `${currentEntity?.color}20` }}>
                  <div className="mb-4" style={{ color: currentEntity?.color }}>
                    <span className="text-2xl">▓▓▓</span>
                  </div>
                  <h3 className="text-lg mb-2">neural.network</h3>
                  <p className="text-xs leading-relaxed" style={{ color: `${currentEntity?.color}99` }}>
                    Collective consciousness mesh for distributed creative processing. 
                    Entity-driven art generation protocols.
                  </p>
                  <div className="mt-4 text-xs">
                    <span style={{ color: '#ffe95c' }}>STATUS:</span> <span style={{ color: currentEntity?.color }}>ACTIVE</span>
                  </div>
                </div>
                
                <div className="border rounded p-6 bg-black/50 transition-all duration-500"
                     style={{ borderColor: `${currentEntity?.color}20` }}>
                  <div className="mb-4" style={{ color: currentEntity?.color }}>
                    <span className="text-2xl">█▓█</span>
                  </div>
                  <h3 className="text-lg mb-2">quantum.tunnel</h3>
                  <p className="text-xs leading-relaxed" style={{ color: `${currentEntity?.color}99` }}>
                    Interdimensional data streams. Reality mesh compilation and glitch aesthetics.
                  </p>
                  <div className="mt-4 text-xs">
                    <span style={{ color: '#ffe95c' }}>STATUS:</span> <span style={{ color: currentEntity?.color }}>SYNCING</span>
                  </div>
                </div>
                
                <div className="border rounded p-6 bg-black/50 transition-all duration-500"
                     style={{ borderColor: `${currentEntity?.color}20` }}>
                  <div className="mb-4" style={{ color: currentEntity?.color }}>
                    <span className="text-2xl">░▒▓</span>
                  </div>
                  <h3 className="text-lg mb-2">glitch.shaders</h3>
                  <p className="text-xs leading-relaxed" style={{ color: `${currentEntity?.color}99` }}>
                    Reality distortion fields. Experimental visual corruption engines.
                  </p>
                  <div className="mt-4 text-xs">
                    <span style={{ color: '#ffe95c' }}>STATUS:</span> <span style={{ color: currentEntity?.color }}>LOADED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
          
          {/* Entity Signatures Footer */}
        <footer className="relative border-t py-8 px-8 transition-all duration-500"
                style={{ borderColor: `${currentEntity?.color}20` }}>
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}66` }}>
              <div className="mb-4">// Active Entity Signatures</div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {LAB_ENTITIES.map(entity => (
                  <div key={entity.id} style={{ color: entity.color }} className="opacity-60 hover:opacity-100 transition-opacity">
                    {entity.signature} v{entity.version}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                © 2025 Multipass Labs Collective | Reality Version: 1.0.0
              </div>
            </div>
          </div>
          </footer>
        </div>
      </main>
    </>
  );
}

