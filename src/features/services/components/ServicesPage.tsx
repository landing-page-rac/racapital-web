'use client';

import React, { useState, useEffect } from 'react';
import ServicesPageDesktop from './ServicesPageDesktop';
import ServicesPageMobile from './ServicesPageMobile';
import { NAV_ITEMS } from '@/shared/constants/navigation';

// Custom hook for responsive rendering
const useResponsiveServices = () => {
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
  const isMobile = useResponsiveServices();

  return (
    <>
      {isMobile ? (
        <ServicesPageMobile navItems={NAV_ITEMS} />
      ) : (
        <ServicesPageDesktop navItems={NAV_ITEMS} />
      )}
    </>
  );
};

export default ServicesPage;
