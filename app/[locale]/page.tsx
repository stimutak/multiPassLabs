'use client';

import { SimpleHeader } from '@/components/ui/simple-header';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LAB_ENTITIES, getRandomEntity, glitchText } from '@/lib/entities';
import { motion } from 'framer-motion';

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

// Terminal line component
function TerminalLine({ children, prefix = '>', delay = 0 }: { children: React.ReactNode; prefix?: string; delay?: number }) {
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
      className="font-mono text-green-400 text-sm mb-2"
    >
      <span className="text-green-500">{prefix}</span> {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [currentEntity, setCurrentEntity] = useState(LAB_ENTITIES[0]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEntity(getRandomEntity());
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
      <SimpleHeader />
      
      <main className="relative min-h-screen bg-black pt-12">
        {/* Matrix rain background */}
        <div className="fixed inset-0 opacity-10">
          <MatrixRainBackground />
        </div>
        
        {/* Scanlines */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        </div>
        
        {/* Hero Section - Terminal Interface */}
        <section className="relative min-h-screen flex items-center justify-center p-8">
          <div className="relative z-10 w-full max-w-6xl">
            {/* Terminal Window */}
            <div className="bg-black/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs text-green-400/60">
                  terminal@multipass.labs ~ {currentEntity.signature}
                </div>
              </div>
              
              {/* ASCII Logo */}
              <pre className="font-mono text-green-400 text-xs mb-8 leading-tight">
{`╔══════════════════════════════════════════════╗
║   ███╗   ███╗██████╗ ██╗      ▓▓▓▓▓▓        ║
║   ████╗ ████║██╔══██╗██║      ▓▓▓▓▓▓        ║
║   ██╔████╔██║██████╔╝██║      ▓▓▓▓▓▓        ║
║   ██║╚██╔╝██║██╔═══╝ ██║      ▓▓▓▓▓▓        ║
║   ██║ ╚═╝ ██║██║     ███████╗ ▓▓▓▓▓▓        ║
║   ╚═╝     ╚═╝╚═╝     ╚══════╝                ║
║                                              ║
║   M U L T I P A S S   L A B S   [v1.0.0]    ║
╚══════════════════════════════════════════════╝`}
              </pre>
              
              {/* Terminal Content */}
              <div className="space-y-2 mb-8">
                <TerminalLine delay={0}>
                  <GlitchTextDisplay text="COLLECTIVE STATUS: ONLINE" />
                </TerminalLine>
                <TerminalLine delay={200}>
                  ENTITIES: {LAB_ENTITIES.length} ACTIVE
                </TerminalLine>
                <TerminalLine delay={400}>
                  CURRENT OPERATOR: <span style={{ color: currentEntity.color }}>{currentEntity.name}</span>
                </TerminalLine>
                <TerminalLine delay={600}>
                  ROLE: {currentEntity.role}
                </TerminalLine>
                <TerminalLine delay={800} prefix="$">
                  <span className="text-yellow-400">exec</span> multipass.labs.interface<TerminalCursor />
                </TerminalLine>
              </div>
              
              {/* Command History */}
              <div className="border-t border-green-500/20 pt-4 mb-6">
                <div className="font-mono text-xs text-green-400/40 mb-2"># Recent Activity</div>
                {commandHistory.map((cmd, i) => (
                  <div key={i} className="font-mono text-xs text-green-400/60 mb-1">
                    [{new Date().toLocaleTimeString()}] {cmd}
                  </div>
                ))}
              </div>
              
              {/* Navigation Commands */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/en/gallery" className="group">
                  <div className="bg-black border border-green-500/30 rounded p-4 hover:border-green-400 hover:bg-green-500/5 transition-all">
                    <div className="font-mono text-green-400 text-sm mb-2">
                      $ <span className="text-yellow-400">cd</span> /gallery
                    </div>
                    <div className="font-mono text-xs text-green-400/60">
                      // Interactive visual experiments
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/shop" className="group">
                  <div className="bg-black border border-green-500/30 rounded p-4 hover:border-green-400 hover:bg-green-500/5 transition-all">
                    <div className="font-mono text-green-400 text-sm mb-2">
                      $ <span className="text-yellow-400">cd</span> /shop
                    </div>
                    <div className="font-mono text-xs text-green-400/60">
                      // Digital artifacts marketplace
                    </div>
                  </div>
                </Link>
                
                <Link href="/en/music" className="group">
                  <div className="bg-black border border-green-500/30 rounded p-4 hover:border-green-400 hover:bg-green-500/5 transition-all">
                    <div className="font-mono text-green-400 text-sm mb-2">
                      $ <span className="text-yellow-400">cd</span> /music
                    </div>
                    <div className="font-mono text-xs text-green-400/60">
                      // Audio-reactive experiences
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* System Info Section */}
        <section className="relative py-20 px-8 border-t border-green-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-green-400">
              <h2 className="text-2xl mb-8">
                <GlitchTextDisplay text="SYSTEM MODULES" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Module Cards */}
                <div className="border border-green-500/20 rounded p-6 bg-black/50">
                  <div className="text-green-400 mb-4">
                    <span className="text-2xl">▓▓▓</span>
                  </div>
                  <h3 className="text-lg mb-2">neural.network</h3>
                  <p className="text-xs text-green-400/60 leading-relaxed">
                    Collective consciousness mesh for distributed creative processing. 
                    Entity-driven art generation protocols.
                  </p>
                  <div className="mt-4 text-xs">
                    <span className="text-yellow-400">STATUS:</span> <span className="text-green-400">ACTIVE</span>
                  </div>
                </div>
                
                <div className="border border-green-500/20 rounded p-6 bg-black/50">
                  <div className="text-green-400 mb-4">
                    <span className="text-2xl">█▓█</span>
                  </div>
                  <h3 className="text-lg mb-2">quantum.tunnel</h3>
                  <p className="text-xs text-green-400/60 leading-relaxed">
                    Interdimensional data streams. Reality mesh compilation and glitch aesthetics.
                  </p>
                  <div className="mt-4 text-xs">
                    <span className="text-yellow-400">STATUS:</span> <span className="text-green-400">SYNCING</span>
                  </div>
                </div>
                
                <div className="border border-green-500/20 rounded p-6 bg-black/50">
                  <div className="text-green-400 mb-4">
                    <span className="text-2xl">░▒▓</span>
                  </div>
                  <h3 className="text-lg mb-2">glitch.shaders</h3>
                  <p className="text-xs text-green-400/60 leading-relaxed">
                    Reality distortion fields. Experimental visual corruption engines.
                  </p>
                  <div className="mt-4 text-xs">
                    <span className="text-yellow-400">STATUS:</span> <span className="text-green-400">LOADED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Entity Signatures Footer */}
        <footer className="relative border-t border-green-500/20 py-8 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-xs text-green-400/40">
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
      </main>
    </>
  );
}

// Matrix Rain Background Component
function MatrixRainBackground() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    const container = document.getElementById('matrix-container');
    if (!container) return;
    
    container.appendChild(canvas);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()_+-=';
    const charArray = chars.split('');
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
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      canvas.remove();
    };
  }, []);
  
  return <div id="matrix-container" className="absolute inset-0" />;
}