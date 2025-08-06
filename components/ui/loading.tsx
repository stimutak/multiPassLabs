'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface LoadingScreenProps {
  fullScreen?: boolean;
  message?: string;
  showProgress?: boolean;
}

export function LoadingScreen({ 
  fullScreen = true, 
  message,
  showProgress = true 
}: LoadingScreenProps) {
  const t = useTranslations('common');
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  // Loading messages that cycle through
  const loadingMessages = [
    t('loading.preparing'),
    t('loading.initializing'),
    t('loading.almost'),
    t('loading.ready')
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth progression with slight randomness
        return prev + Math.random() * 15;
      });
    }, 300);

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Animated logo/spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          
          {/* Inner rotating ring (opposite direction) */}
          <div className="absolute inset-4 rounded-full border-4 border-violet-500/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-violet-500 border-b-transparent border-l-transparent animate-spin-reverse" />
          
          {/* Center dot */}
          <div className="absolute inset-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full animate-pulse" />
          
          {/* MultiPass Labs text or logo could go here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-light text-white animate-fade-in">
            {message || loadingMessages[currentMessage]}
          </h2>
          
          {/* Progress bar */}
          {showProgress && (
            <div className="w-64 mx-auto">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-sm text-white/60 mt-2">
                {Math.round(Math.min(progress, 100))}%
              </p>
            </div>
          )}
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for content
export function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Image loader with fade-in effect
export function ImageLoader({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}