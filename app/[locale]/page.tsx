'use client';

import { SimpleHeader } from '@/components/ui/simple-header';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LAB_ENTITIES, getRandomEntity, glitchText, getEntityCSSVars } from '@/lib/entities';
import { motion } from 'framer-motion';
import { EntityAnimationBackground } from '@/components/backgrounds/entity-animations';

// Terminal cursor component
function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);
  
  return <span className={`${visible ? 'opacity-100' : 'opacity-0'}`}>_</span>;
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

export default function HomePage() {
  // Start with an entity that has an implemented animation
  const initialEntity = LAB_ENTITIES.find(e => e.animation === 'oscilloscope') || LAB_ENTITIES[0]!;
  const [currentEntity, setCurrentEntity] = useState(initialEntity);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(true);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Get current animation type - default to one of our implemented ones
  const getAnimationType = () => {
    if (currentEntity?.animation === 'oscilloscope' || 
        currentEntity?.animation === 'circuitTraces' || 
        currentEntity?.animation === 'hexWaterfall') {
      return currentEntity.animation;
    }
    // Default fallback for entities without implemented animations yet
    return 'oscilloscope';
  };
  const animationType = getAnimationType();
  
  useEffect(() => {
    // Initial logo display for 2 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      // Start glitch/strobe effect
      setGlitchActive(true);
      
      // Strobe effect - flash content in
      let strobeCount = 0;
      const strobeInterval = setInterval(() => {
        setContentRevealed(prev => !prev);
        strobeCount++;
        
        // After 8 flashes (4 on/off cycles), stay on
        if (strobeCount >= 8) {
          clearInterval(strobeInterval);
          setContentRevealed(true);
          setGlitchActive(false);
        }
      }, 100); // Fast strobe effect
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    // Only cycle between entities that have implemented animations
    const entitiesWithAnimations = LAB_ENTITIES.filter(e => 
      e.animation === 'oscilloscope' || 
      e.animation === 'circuitTraces' || 
      e.animation === 'hexWaterfall'
    );
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * entitiesWithAnimations.length);
      const newEntity = entitiesWithAnimations[randomIndex];
      if (newEntity) {
        setCurrentEntity(newEntity);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
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

  return (
    <>
      {!showLogo && <SimpleHeader />}
      
      <main className="relative min-h-screen bg-black pt-12">
        {/* Show logo first */}
        {showLogo && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 0.9, 1],
                scale: [0.8, 1, 1.02, 1],
              }}
              transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
              className="relative"
            >
              {/* Lightning bolts around logo */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl animate-pulse">⚡</div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>⚡</div>
              <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: '0.25s' }}>⚡</div>
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: '0.75s' }}>⚡</div>
              
              <pre className="font-mono text-green-400 text-xs leading-tight"
                style={{
                  textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
                  filter: 'brightness(1.2)'
                }}
              >
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
            </motion.div>
          </div>
        )}

        {/* Glitch overlay during transition */}
        {glitchActive && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <div className="absolute inset-0 bg-green-500/20 mix-blend-screen animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan" />
          </div>
        )}

        {/* Main content with strobe reveal */}
        <div className={`${contentRevealed ? 'opacity-100' : 'opacity-0'} ${glitchActive ? 'animate-glitch' : ''} transition-opacity duration-100`}>
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
            <div className="bg-black/90 border rounded-lg p-8 backdrop-blur-sm transition-all duration-500"
                 style={{ 
                   borderColor: `${currentEntity?.color}40`,
                   boxShadow: `0 0 30px ${currentEntity?.color}20`
                 }}>
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
                  <div className="bg-black/50 border rounded p-4 transition-all duration-300"
                       style={{ 
                         borderColor: `${currentEntity?.color}30`,
                         ':hover': { 
                           borderColor: currentEntity?.color,
                           backgroundColor: `${currentEntity?.color}10`
                         }
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}30`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                       }}>
                    <div className="font-mono text-sm mb-2" style={{ color: currentEntity?.color }}>
                      $ <span style={{ color: '#ffe95c' }}>cd</span> /gallery
                    </div>
                    <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}99` }}>
                      // Interactive visual experiments
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/shop" className="group">
                  <div className="bg-black/50 border rounded p-4 transition-all duration-300"
                       style={{ 
                         borderColor: `${currentEntity?.color}30`
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}30`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                       }}>
                    <div className="font-mono text-sm mb-2" style={{ color: currentEntity?.color }}>
                      $ <span style={{ color: '#ffe95c' }}>cd</span> /shop
                    </div>
                    <div className="font-mono text-xs" style={{ color: `${currentEntity?.color}99` }}>
                      // Digital artifacts marketplace
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/music" className="group">
                  <div className="bg-black/50 border rounded p-4 transition-all duration-300"
                       style={{ 
                         borderColor: `${currentEntity?.color}30`
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = currentEntity?.color || '';
                         e.currentTarget.style.backgroundColor = `${currentEntity?.color}10`;
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = `${currentEntity?.color}30`;
                         e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
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

