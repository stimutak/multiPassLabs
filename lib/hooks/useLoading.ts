'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLoadingOptions {
  minDuration?: number; // Minimum loading duration in ms
  autoStart?: boolean;  // Start loading on mount
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { minDuration = 500, autoStart = false } = options;
  const [isLoading, setIsLoading] = useState(autoStart);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Start loading with optional minimum duration
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    setStartTime(Date.now());
  }, []);

  // Stop loading (respects minimum duration)
  const stopLoading = useCallback(async () => {
    if (startTime) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
    }
    
    setIsLoading(false);
    setProgress(100);
    setStartTime(null);
  }, [startTime, minDuration]);

  // Update progress (0-100)
  const updateProgress = useCallback((value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);

  // Simulate progress for indeterminate loading
  useEffect(() => {
    if (!isLoading || progress >= 90) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down as we approach 90%
        const increment = Math.random() * (90 - prev) * 0.1;
        return Math.min(90, prev + increment);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, progress]);

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
    updateProgress,
  };
}

// Hook for route transitions
export function useRouteLoading() {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsChanging(true);
    const handleComplete = () => setIsChanging(false);

    // Listen for route changes (Next.js specific)
    if (typeof window !== 'undefined') {
      // For Next.js App Router, we need to observe navigation differently
      const observer = new MutationObserver(() => {
        // Check if URL changed
        if (window.location.href !== observer.lastUrl) {
          handleStart();
          observer.lastUrl = window.location.href;
          setTimeout(handleComplete, 500);
        }
      });

      observer.lastUrl = window.location.href;
      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, []);

  return isChanging;
}

// Hook for image preloading
export function useImagePreloader(images: string[]) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(images.map(preloadImage))
      .then(() => setLoaded(true))
      .catch(error => {
        console.error('Failed to preload images:', error);
        setLoaded(true); // Continue anyway
      });
  }, [images]);

  return { loaded, progress };
}

// Hook for lazy loading with intersection observer
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>() {
  const [ref, setRef] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  return { setRef, isVisible };
}