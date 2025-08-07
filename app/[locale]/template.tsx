'use client';

import { useEffect, useState } from 'react';

import StartupIntroV2 from '@/components/ui/startup-intro-v2';

export default function Template({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has been shown this session
    const introShown = sessionStorage.getItem('introShown');
    console.log('Template mounted, introShown:', introShown);
    if (!introShown) {
      console.log('Showing intro on first visit');
      setShowIntro(true);
    }

    // Add keyboard shortcut to replay intro (Ctrl/Cmd + Shift + I)
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key, 'Meta:', e.metaKey, 'Ctrl:', e.ctrlKey, 'Shift:', e.shiftKey);
      
      // Try multiple key combinations
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        console.log('Replay shortcut triggered!');
        e.preventDefault();
        sessionStorage.removeItem('introShown');
        setShowIntro(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleIntroComplete = () => {
    console.log('Intro completed');
    setShowIntro(false);
    sessionStorage.setItem('introShown', 'true');
  };

  const handleReplayIntro = () => {
    console.log('Manual replay triggered');
    sessionStorage.removeItem('introShown');
    setShowIntro(true);
  };

  return (
    <>
      {showIntro && <StartupIntroV2 onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Add a floating button to replay intro */}
        {!showIntro && (
          <button
            onClick={handleReplayIntro}
            className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-black border border-green-400 text-green-400 font-mono text-xs hover:bg-green-400 hover:text-black transition-colors"
            title="Replay intro (or press Cmd+Shift+I)"
          >
            [REPLAY INTRO]
          </button>
        )}
        {children}
      </div>
    </>
  );
}