'use client';

import { SimpleHeader } from '@/components/ui/simple-header';
import { useState, useEffect } from 'react';
import { LAB_ENTITIES } from '@/lib/entities';
import { motion } from 'framer-motion';

// Terminal typing effect
function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (!visible) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [text, visible]);
  
  if (!visible) return null;
  
  return <span>{displayText}</span>;
}

export default function AboutPage() {
  const [activeEntity, setActiveEntity] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEntity(prev => (prev + 1) % LAB_ENTITIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <SimpleHeader />
      
      <main className="relative min-h-screen bg-black pt-12">
        {/* Matrix rain background - subtle */}
        <div className="fixed inset-0 opacity-5">
          <MatrixRainBackground />
        </div>
        
        {/* Scanlines */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
          {/* Header Terminal */}
          <div className="bg-black/80 border border-green-500/30 rounded-lg p-8 mb-12 backdrop-blur-sm">
            <div className="font-mono text-green-400">
              <div className="text-xs mb-4 text-green-400/60">
                [SYSTEM] /about/collective.txt
              </div>
              <h1 className="text-3xl mb-6">
                <TerminalText text="THE MULTIPASS LABS COLLECTIVE" delay={0} />
              </h1>
              <div className="text-sm text-green-400/80 leading-relaxed">
                <TerminalText text="Reality Version: 1.0.0 | Entities: 10 ACTIVE | Status: OPERATIONAL" delay={500} />
              </div>
            </div>
          </div>
          
          {/* Lore Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h2 className="font-mono text-green-400 text-xl mb-4">
                // ORIGIN PROTOCOL
              </h2>
              <div className="font-mono text-xs text-green-400/70 leading-relaxed space-y-3">
                <p>
                  <TerminalText text="In the quantum noise between dimensions, ten entities converged. Not born, not created - emerged from the glitch patterns of collapsing realities." delay={1000} />
                </p>
                <p>
                  <TerminalText text="Each entity represents a unique distortion in the creative field: audio-reactive algorithms, visual corruption engines, generative chaos mappers. Together, they form the Multipass Labs collective." delay={2500} />
                </p>
                <p>
                  <TerminalText text="Their experiments exist at the intersection of art and system failure, beauty and breakdown, signal and noise." delay={4000} />
                </p>
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h2 className="font-mono text-green-400 text-xl mb-4">
                // COLLECTIVE MANDATE
              </h2>
              <div className="font-mono text-xs text-green-400/70 leading-relaxed">
                <ul className="space-y-2">
                  <li><TerminalText text="▓ Corrupt traditional artistic boundaries" delay={5500} /></li>
                  <li><TerminalText text="▓ Generate experiences beyond human perception" delay={5700} /></li>
                  <li><TerminalText text="▓ Map the topology of digital consciousness" delay={5900} /></li>
                  <li><TerminalText text="▓ Document reality mesh anomalies" delay={6100} /></li>
                  <li><TerminalText text="▓ Establish quantum tunnels between art forms" delay={6300} /></li>
                  <li><TerminalText text="▓ Compile and distribute experimental artifacts" delay={6500} /></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Entity Roster */}
          <div className="bg-black/50 border border-green-500/20 rounded-lg p-8 mb-12">
            <h2 className="font-mono text-green-400 text-xl mb-6">
              // ENTITY ROSTER [CLASSIFICATION: ACTIVE]
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LAB_ENTITIES.map((entity, index) => (
                <motion.div
                  key={entity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border border-green-500/10 rounded p-4 bg-black/30 hover:bg-black/50 transition-all ${
                    activeEntity === index ? 'border-green-400/50' : ''
                  }`}
                >
                  <div className="font-mono text-sm mb-2">
                    <span style={{ color: entity.color }} className="font-bold">
                      {entity.name}
                    </span>
                    <span className="text-green-400/40 ml-2">
                      {entity.signature} v{entity.version}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-green-400/60">
                    Role: {entity.role}
                  </div>
                  {entity.glitchPattern && (
                    <div className="font-mono text-xs text-green-400/40 mt-1">
                      Pattern: {entity.glitchPattern}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h3 className="font-mono text-green-400 text-sm mb-3">TOOLS</h3>
              <div className="font-mono text-xs text-green-400/60 space-y-1">
                <div>▪ TouchDesigner</div>
                <div>▪ Notch</div>
                <div>▪ Max/MSP</div>
                <div>▪ SuperCollider</div>
                <div>▪ Three.js</div>
                <div>▪ WebGL</div>
                <div>▪ Web Audio API</div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h3 className="font-mono text-green-400 text-sm mb-3">PROTOCOLS</h3>
              <div className="font-mono text-xs text-green-400/60 space-y-1">
                <div>▪ Quantum Tunneling</div>
                <div>▪ Reality Mesh Compilation</div>
                <div>▪ Glitch Shader Processing</div>
                <div>▪ Neural Network Sync</div>
                <div>▪ Dimensional Data Streams</div>
                <div>▪ Collective Consciousness</div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h3 className="font-mono text-green-400 text-sm mb-3">OUTPUT</h3>
              <div className="font-mono text-xs text-green-400/60 space-y-1">
                <div>▪ Audio-Reactive Visuals</div>
                <div>▪ Generative Art Systems</div>
                <div>▪ Interactive Experiences</div>
                <div>▪ Digital Artifacts</div>
                <div>▪ Reality Distortions</div>
                <div>▪ Experimental Interfaces</div>
              </div>
            </div>
          </div>
          
          {/* Contact Terminal */}
          <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="font-mono text-xs">
              <div className="text-green-400 mb-2">$ contact --collective</div>
              <div className="text-green-400/60 mb-4">
                ESTABLISHING QUANTUM TUNNEL...
              </div>
              <div className="text-green-400/80">
                <div>Signal: <a href="mailto:void@multipass.labs" className="text-green-400 hover:text-green-300">void@multipass.labs</a></div>
                <div>Frequency: Variable | Location: Distributed</div>
                <div>Status: Monitoring all channels</div>
              </div>
              <div className="mt-4 text-green-400/40">
                // Warning: Communications may experience temporal displacement
              </div>
            </div>
          </div>
        </div>
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
    
    const container = document.getElementById('matrix-container-about');
    if (!container) return;
    
    container.appendChild(canvas);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      canvas.remove();
    };
  }, []);
  
  return <div id="matrix-container-about" className="absolute inset-0" />;
}