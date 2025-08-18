'use client';

import React, { useState, useEffect } from 'react';
import CareersPageDesktop from './CareersPageDesktop';
import CareersPageMobile from './CareersPageMobile';
import { NAV_ITEMS } from '@/shared/constants/navigation';

// Custom hook for responsive rendering
const useResponsive = () => {
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

const CareersPage: React.FC = () => {
  const isMobile = useResponsive();

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <CareersPageMobile navItems={NAV_ITEMS} />
      ) : (
        <CareersPageDesktop navItems={NAV_ITEMS} />
      )}
    </div>
  );
};

export default CareersPage; 