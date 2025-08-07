'use client';

import { useEffect, useState } from 'react';
import StartupIntroV2 from '@/components/ui/startup-intro-v2';

export default function Template({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has been shown this session
    const introShown = sessionStorage.getItem('introShown');
    if (!introShown) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introShown', 'true');
  };

  return (
    <>
      {showIntro && <StartupIntroV2 onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}