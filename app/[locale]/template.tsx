'use client';

import { useEffect, useState } from 'react';
import StartupIntro from '@/components/ui/startup-intro';

export default function Template({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [hasShownIntro, setHasShownIntro] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    if (introShown) {
      setShowIntro(false);
      setHasShownIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasShownIntro(true);
    sessionStorage.setItem('introShown', 'true');
  };

  return (
    <>
      {showIntro && <StartupIntro onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}