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
  const [showSplash, setShowSplash] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
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
  }, [isLoading, hasTimedOut, timeoutMs, minDisplayMs, startTime]);

  return {
    showSplash,
    hasTimedOut,
  };
};
