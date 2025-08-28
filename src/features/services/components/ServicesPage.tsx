'use client';

import React, { useState, useEffect } from 'react';
import ServicesPageDesktop from './ServicesPageDesktop';
import ServicesPageMobile from './ServicesPageMobile';
// import { NAV_ITEMS } from '@/shared/constants/navigation'; // Keeping for future use

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

const ServicesPage: React.FC = () => {
  const isMobile = useResponsive();

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <ServicesPageMobile />
      ) : (
        <ServicesPageDesktop />
      )}
    </div>
  );
};

export default ServicesPage;
