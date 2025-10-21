'use client';

import React, { useState, useEffect } from 'react';
import InsightDetailPageMobile from './InsightDetailPageMobile';
import InsightDetailPageDesktop from './InsightDetailPageDesktop';
import { useInsightDetailData } from '../hooks';
import { LoadingScreen } from '@/shared/components';
import Navbar from '@/features/landing/components/Navbar';
import { NAV_ITEMS } from '@/shared/constants/navigation';

// Custom hook for responsive rendering
const useResponsiveInsightDetail = () => {
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

interface InsightDetailPageProps {
  documentId: string;
}

const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveInsightDetail();
  const { insight, isLoading, error } = useInsightDetailData(documentId);

  if (isLoading) {
    return <LoadingScreen message="Loading Perspective..." />;
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <Navbar navItems={NAV_ITEMS} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Perspective not found</p>
              <p className="text-lg text-gray-300">
                The Perspective you&apos;re looking for doesn&apos;t exist or has been removed.
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
        <InsightDetailPageMobile insight={insight} />
      ) : (
        <InsightDetailPageDesktop insight={insight} />
      )}
    </div>
  );
};

export default InsightDetailPage;
