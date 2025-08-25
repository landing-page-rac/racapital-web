'use client';

import { useState, useEffect } from 'react';

interface UseSplashScreenProps {
  isLoading: boolean;
  timeoutMs?: number;
  minDisplayMs?: number;
}

export const useSplashScreen = ({
  isLoading,
  timeoutMs = 5000,
  minDisplayMs = 3000
}: UseSplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Check if splash screen has been shown in this session
    const hasShownSplash = sessionStorage.getItem('splashScreenShown');

    if (hasShownSplash) {
      // Splash screen already shown in this session, don't show it again
      setShowSplash(false);
      return;
    }

    // Mark splash screen as shown for this session
    sessionStorage.setItem('splashScreenShown', 'true');
    setShowSplash(true);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (!showSplash || !startTime) return;

    let timeoutId: NodeJS.Timeout;

    // Calculate how much time has passed since splash started
    const elapsedTime = Date.now() - startTime;
    const remainingMinTime = Math.max(0, minDisplayMs - elapsedTime);

    // If loading is complete, wait for minimum display time before hiding
    if (!isLoading && !hasTimedOut) {
      timeoutId = setTimeout(() => {
        setShowSplash(false);
      }, remainingMinTime + 500); // Add 500ms for smooth transition
    }

    // Set up timeout for maximum time (5 seconds)
    const timeoutTimer = setTimeout(() => {
      setHasTimedOut(true);
      setShowSplash(false);
    }, timeoutMs);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(timeoutTimer);
    };
  }, [isLoading, hasTimedOut, timeoutMs, minDisplayMs, startTime, showSplash]);

  return {
    showSplash,
    hasTimedOut,
  };
};
