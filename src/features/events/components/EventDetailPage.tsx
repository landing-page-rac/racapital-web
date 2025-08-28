'use client';

import React, { useState, useEffect } from 'react';
import EventDetailPageMobile from './EventDetailPageMobile';
import EventDetailPageDesktop from './EventDetailPageDesktop';
import { useEventDetailData } from '../hooks';
import { LoadingScreen } from '@/shared/components';

// Custom hook for responsive rendering
const useResponsiveEventDetail = () => {
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

interface EventDetailPageProps {
  documentId: string;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveEventDetail();
  const { event, isLoading, error } = useEventDetailData(documentId);

  if (isLoading) {
    return <LoadingScreen message="Loading event..." />;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Event not found</p>
              <p className="text-lg text-gray-300">
                The event you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <EventDetailPageMobile event={event} />
      ) : (
        <EventDetailPageDesktop event={event} />
      )}
    </div>
  );
};

export default EventDetailPage;
