'use client';

import { useState, useEffect } from 'react';
import { LAB_ENTITIES } from '@/lib/entities';

export function SimpleHeader() {
  const [currentTime, setCurrentTime] = useState('');
  const [entityIndex, setEntityIndex] = useState(0);
  
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setEntityIndex(prev => (prev + 1) % LAB_ENTITIES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const currentEntity = LAB_ENTITIES[entityIndex];
  
  return (
    <header className="fixed top-0 w-full z-40 bg-black border-b border-green-500/20">
      <nav className="container mx-auto px-4 h-12 flex items-center justify-between font-mono text-xs">
        {/* Left - System Status */}
        <div className="flex items-center gap-4">
          <a href="/en" className="text-green-400 hover:text-green-300 transition-colors">
            [MPL://v1.0.0]
          </a>
          <span className="text-green-400/40 hidden sm:inline">|</span>
          <span className="text-green-400/60 hidden sm:inline">
            SYS:<span className="text-green-400">ONLINE</span>
          </span>
        </div>
        
        {/* Center - Navigation */}
        <div className="flex items-center gap-6">
          <a href="/en/shop" className="text-green-400/60 hover:text-green-400 transition-colors">
            /shop
          </a>
          <a href="/en/gallery" className="text-green-400/60 hover:text-green-400 transition-colors">
            /gallery
          </a>
          <a href="/en/music" className="text-green-400/60 hover:text-green-400 transition-colors">
            /music
          </a>
          <a href="/en/about" className="text-green-400/60 hover:text-green-400 transition-colors">
            /about
          </a>
        </div>
        
        {/* Right - Entity & Time */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline" style={{ color: currentEntity.color }}>
            {currentEntity.signature}
          </span>
          <span className="text-green-400/40 hidden sm:inline">|</span>
          <span className="text-green-400/60">
            {currentTime || '00:00:00'}
          </span>
        </div>
      </nav>
    </header>
  );
}