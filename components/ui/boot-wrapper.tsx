'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with localStorage
const StartupIntroV2 = dynamic(() => import('./startup-intro-v2'), { ssr: false });

export function BootWrapper({ children }: { children: React.ReactNode }) {
  const [showBootAnimation, setShowBootAnimation] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Check if user has seen boot animation before
    const hasSeenBoot = localStorage.getItem('hasSeenBootAnimation');
    
    if (!hasSeenBoot) {
      setShowBootAnimation(true);
    } else {
      setBootComplete(true);
    }
  }, []);

  const handleBootComplete = () => {
    localStorage.setItem('hasSeenBootAnimation', 'true');
    setShowBootAnimation(false);
    setBootComplete(true);
  };

  if (showBootAnimation) {
    return <StartupIntroV2 onComplete={handleBootComplete} />;
  }

  if (!bootComplete) {
    // Loading state while checking localStorage
    return <div className="fixed inset-0 bg-black" />;
  }

  return <>{children}</>;
}