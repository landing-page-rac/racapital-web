'use client';

import React, { useState, useEffect } from 'react';
import CaseStudyDetailPageMobile from './CaseStudyDetailPageMobile';
import CaseStudyDetailPageDesktop from './CaseStudyDetailPageDesktop';
import { useCaseStudyDetailData } from '../hooks';
import { LoadingScreen } from '@/shared/components';

// Custom hook for responsive rendering
const useResponsiveCaseStudyDetail = () => {
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

interface CaseStudyDetailPageProps {
  documentId: string;
}

const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveCaseStudyDetail();
  const { caseStudy, isLoading, error } = useCaseStudyDetailData(documentId);

  if (isLoading) {
    return <LoadingScreen message="Loading case study..." />;
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Case study not found</p>
              <p className="text-lg text-gray-300">
                The case study you&apos;re looking for doesn&apos;t exist or has been removed.
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
        <CaseStudyDetailPageMobile caseStudy={caseStudy} />
      ) : (
        <CaseStudyDetailPageDesktop caseStudy={caseStudy} />
      )}
    </div>
  );
};

export default CaseStudyDetailPage;
