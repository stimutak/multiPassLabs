'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/ui/loading';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Simulate initial loading time (remove in production or tie to actual data loading)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Also listen for actual page load
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => setIsLoading(false), 500);
      });
    }

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration issues by not rendering loading screen on server
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}