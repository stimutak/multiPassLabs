`use client';

import LogoHeader from '@/components/ui/LogoHeader';
import Logo, { type LogoVariant } from '@/components/Logo';
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
  const [currentEntity, setCurrentEntity] = useState(LAB_ENTITIES[0] || LAB_ENTITIES.find(() => true)!);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [logoVariant, setLogoVariant] = useState<LogoVariant>('monogram');

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
      <LogoHeader variant={logoVariant} />
      
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
                  terminal@multipass.labs ~ {currentEntity?.signature || '[UNKNOWN]'}
                </div>
              </div>
              
              {/* Vector Logo and Selector */}
              <div className="flex flex-col items-center mb-8">
                <Logo variant={logoVariant} className="h-20 md:h-28 w-auto text-green-400" />
                <select
                  value={logoVariant}
                  onChange={(e) => setLogoVariant(e.target.value as LogoVariant)}
                  className="mt-4 font-mono text-green-400 bg-black border border-green-500/30 rounded p-2"
                >
                  <option value="monogram">Monogram</option>
                  <option value="glyph">Glyph</option>
                  <option value="wordmark">Wordmark</option>
                </select>
              </div>
              
              {/* Terminal Content */}
              <div className="space-y-2 mb-8">
                <TerminalLine delay={0}>
                  <GlitchTextDisplay text="COLLECTIVE STATUS: ONLINE" />
                </TerminalLine>
                <TerminalLine delay={200}>
                  ENTITIES: {LAB_ENTITIES.length} ACTIVE
                </TerminalLine>
                <TerminalLine delay={400}>
                  CURRENT OPERATOR: <span style={{ color: currentEntity?.color || '#ffffff' }}>{currentEntity?.name || '[UNKNOWN]'}</span>
                </TerminalLine>
                <TerminalLine delay={600}>
                  ROLE: {currentEntity?.role || '[UNKNOWN]'}
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
      </main>
    </>
  );
}
