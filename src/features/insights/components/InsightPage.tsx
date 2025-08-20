'use client';

import React, { useState, useEffect } from 'react';
import InsightPageMobile from './InsightPageMobile';
import InsightPageDesktop from './InsightPageDesktop';
import { useInsightsDataCached } from '../hooks/useInsightsDataCached';

// Custom hook for responsive rendering
const useResponsiveInsights = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

const InsightPage: React.FC = () => {
  const isMobile = useResponsiveInsights();
  const { insights, isLoading, error } = useInsightsDataCached();

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <InsightPageMobile insights={insights} isLoading={isLoading} error={error} />
      ) : (
        <InsightPageDesktop insights={insights} isLoading={isLoading} error={error} />
      )}
    </div>
  );
};

export default InsightPage; 