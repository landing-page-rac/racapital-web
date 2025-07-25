'use client';

import React, { useState, useEffect } from 'react';
import HelpPageMobile from './HelpPageMobile';
import HelpPageDesktop from './HelpPageDesktop';

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

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <HelpPageMobile />
      ) : (
        <HelpPageDesktop />
      )}
    </div>
  );
};

export default HelpPage; 