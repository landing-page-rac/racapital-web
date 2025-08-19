'use client';

import React, { useState, useEffect } from 'react';
import CaseStudiesPageMobile from './CaseStudiesPageMobile';
import CaseStudiesPageDesktop from './CaseStudiesPageDesktop';
import { useCaseStudiesDataCached } from '../hooks/useCaseStudiesDataCached';

// Custom hook for responsive rendering
const useResponsiveCaseStudies = () => {
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

const CaseStudiesPage: React.FC = () => {
  const isMobile = useResponsiveCaseStudies();
  const { caseStudies, isLoading, error } = useCaseStudiesDataCached();

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <CaseStudiesPageMobile caseStudies={caseStudies} isLoading={isLoading} error={error} />
      ) : (
        <CaseStudiesPageDesktop caseStudies={caseStudies} isLoading={isLoading} error={error} />
      )}
    </div>
  );
};

export default CaseStudiesPage;   