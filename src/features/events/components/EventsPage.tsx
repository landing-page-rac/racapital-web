'use client';

import React, { useState, useEffect } from 'react';
import EventsPageMobile from './EventsPageMobile';
import EventsPageDesktop from './EventsPageDesktop';

// Custom hook for responsive rendering
const useResponsiveEvents = () => {
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

const EventsPage: React.FC = () => {
  const isMobile = useResponsiveEvents();

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <EventsPageMobile />
      ) : (
        <EventsPageDesktop />
      )}
    </div>
  );
};

export default EventsPage; 