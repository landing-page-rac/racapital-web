'use client';

import React, { useState, useEffect } from 'react';
import InsightDetailPageMobile from './InsightDetailPageMobile';
import InsightDetailPageDesktop from './InsightDetailPageDesktop';
import { useInsightDetailData } from '../hooks';

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
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Loading insight...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Insight not found</p>
              <p className="text-lg text-gray-300">
                The insight you&apos;re looking for doesn&apos;t exist or has been removed.
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
