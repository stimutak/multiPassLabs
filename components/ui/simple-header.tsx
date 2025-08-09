'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LabEntity } from '@/lib/entities';

interface SimpleHeaderProps {
  currentEntity?: LabEntity;
}

export function SimpleHeader({ currentEntity }: SimpleHeaderProps = {}) {
  const _pathname = usePathname();
  const [currentTime, setCurrentTime] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleReplayBoot = () => {
    // Clear the flag and reload to show boot animation
    localStorage.removeItem('hasSeenBootAnimation');
    window.location.href = '/en';
  };
  
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
  
  
  
  return (
    <header className="fixed top-0 w-full z-40 bg-black border-b border-green-500/20">
      {/* Mobile - Compact header with entity ticker */}
      <div className="md:hidden">
        <div className="px-3 h-12 flex items-center justify-between font-mono text-xs">
          <Link href="/en" className="text-green-400 hover:text-green-300 transition-colors">
            [MPL]
          </Link>
          
          {/* Entity ticker - scrolls on mobile */}
          <div className="flex-1 mx-3 overflow-hidden">
            <div className="whitespace-nowrap animate-pulse" style={{ color: currentEntity?.color || '#ffffff' }}>
              {currentEntity?.name || 'UNKNOWN'} • {currentEntity?.signature || '[?]'}
            </div>
          </div>
          
          <span className="text-green-400/60 text-[10px]">
            {currentTime ? currentTime.substring(0, 5) : '00:00'}
          </span>
        </div>
        
        {/* Mobile navigation - horizontal scroll */}
        <div className="px-3 pb-2 overflow-x-auto">
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <Link href="/en/blog" className="text-green-400/60 hover:text-green-400 transition-colors whitespace-nowrap">
              /blog
            </Link>
            <Link href="/en/shop" className="text-green-400/60 hover:text-green-400 transition-colors whitespace-nowrap">
              /shop
            </Link>
            <Link href="/en/gallery" className="text-green-400/60 hover:text-green-400 transition-colors whitespace-nowrap">
              /gallery
            </Link>
            <Link href="/en/music" className="text-green-400/60 hover:text-green-400 transition-colors whitespace-nowrap">
              /music
            </Link>
            <Link href="/en/about" className="text-green-400/60 hover:text-green-400 transition-colors whitespace-nowrap">
              /about
            </Link>
          </div>
        </div>
      </div>
      
      {/* Desktop - Original layout */}
      <nav className="hidden md:flex container mx-auto px-4 h-12 items-center justify-between font-mono text-xs">
        {/* Left - System Status */}
        <div className="flex items-center gap-4">
          <Link href="/en" className="text-green-400 hover:text-green-300 transition-colors">
            [MPL://v1.0.0]
          </Link>
          <span className="text-green-400/40">|</span>
          <span className="text-green-400/60">
            SYS:<span className="text-green-400">ONLINE</span>
          </span>
        </div>
        
        {/* Center - Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/en/blog" className="text-green-400/60 hover:text-green-400 transition-colors">
            /blog
          </Link>
          <Link href="/en/shop" className="text-green-400/60 hover:text-green-400 transition-colors">
            /shop
          </Link>
          <Link href="/en/gallery" className="text-green-400/60 hover:text-green-400 transition-colors">
            /gallery
          </Link>
          <Link href="/en/music" className="text-green-400/60 hover:text-green-400 transition-colors">
            /music
          </Link>
          <Link href="/en/about" className="text-green-400/60 hover:text-green-400 transition-colors">
            /about
          </Link>
        </div>
        
        {/* Right - Entity & Time */}
        <div className="flex items-center gap-4">
          <span style={{ color: currentEntity?.color || '#ffffff' }}>
            {currentEntity?.signature || '[UNKNOWN]'}
          </span>
          <span className="text-green-400/40">|</span>
          <span className="text-green-400/60">
            {currentTime || '00:00:00'}
          </span>
          <span className="text-green-400/40">|</span>
          <button
            onClick={handleReplayBoot}
            className="text-green-400/60 hover:text-green-400 transition-colors font-mono text-xs"
            title="Replay boot sequence"
          >
            [REPLAY BOOT]
          </button>
        </div>
      </nav>
    </header>
  );
}