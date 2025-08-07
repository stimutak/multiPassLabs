'use client';

import { useEffect, useState } from 'react';
import StartupIntroV2 from '@/components/ui/startup-intro-v2';

export default function Template({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // For testing: Always show intro for now
    // Later we can re-enable sessionStorage check
    // const introShown = sessionStorage.getItem('introShown');
    // if (introShown) {
    //   setShowIntro(false);
    // }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // sessionStorage.setItem('introShown', 'true');
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