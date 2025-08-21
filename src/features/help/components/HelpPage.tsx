'use client';

import React, { useState, useEffect } from 'react';
import HelpPageMobile from './HelpPageMobile';
import HelpPageDesktop from './HelpPageDesktop';
import { useContactUsDataCached } from '../hooks/useContactUsDataCached';

// Custom hook for responsive rendering
const useResponsiveHelp = () => {
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

const HelpPage: React.FC = () => {
  const isMobile = useResponsiveHelp();
  const { data, isLoading, error } = useContactUsDataCached();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D52E5] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0D52E5] flex items-center justify-center">
        <div className="text-white text-2xl">Error loading page data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <HelpPageMobile data={data} />
      ) : (
        <HelpPageDesktop data={data} />
      )}
    </div>
  );
};

export default HelpPage; 