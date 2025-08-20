'use client';

import React, { useState, useEffect } from 'react';
import CaseStudyDetailPageMobile from './CaseStudyDetailPageMobile';
import CaseStudyDetailPageDesktop from './CaseStudyDetailPageDesktop';
import { CaseStudyData } from '../types';
import SimpleCache from '@/shared/utils/simpleCache';
import { CaseStudiesResponse } from '../types';
import { LandingPageResponse, FeaturedCaseStudy } from '../../landing/types';

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

// Function to convert FeaturedCaseStudy to CaseStudyData
const convertFeaturedCaseStudyToCaseStudyData = (featuredCaseStudy: FeaturedCaseStudy): CaseStudyData => {
  return {
    documentId: featuredCaseStudy.documentId,
    title: featuredCaseStudy.title,
    content: featuredCaseStudy.content,
    quote: featuredCaseStudy.quote,
    mainImage: {
      alternativeText: featuredCaseStudy.mainImage?.alternativeText || '',
      image: {
        documentId: featuredCaseStudy.mainImage?.image.documentId || '',
        name: featuredCaseStudy.mainImage?.image.name || '',
        width: featuredCaseStudy.mainImage?.image.width || 0,
        height: featuredCaseStudy.mainImage?.image.height || 0,
        url: featuredCaseStudy.mainImage?.image.url || '',
      }
    },
    service: {
      documentId: '', // Not available in featured case study
      name: '', // Not available in featured case study
      content: [] // Not available in featured case study
    },
    image: {
      alternativeText: featuredCaseStudy.mainImage?.alternativeText || '',
      image: {
        documentId: featuredCaseStudy.mainImage?.image.documentId || '',
        name: featuredCaseStudy.mainImage?.image.name || '',
        width: featuredCaseStudy.mainImage?.image.width || 0,
        height: featuredCaseStudy.mainImage?.image.height || 0,
        url: featuredCaseStudy.mainImage?.image.url || '',
      }
    },
    collapsibleList: [], // Not available in featured case study
    attachment: {
      alternativeText: '',
      media: {
        documentId: '',
        name: '',
        width: 0,
        height: 0,
        url: '',
      }
    }
  };
};

// Function to determine the source page
const getSourcePage = (): 'landing' | 'case-studies' | 'unknown' => {
  if (typeof document === 'undefined') return 'unknown';

  const referrer = document.referrer;
  const currentHost = window.location.host;

  // If referrer is from the same domain
  if (referrer && referrer.includes(currentHost)) {
    // Check if user came from landing page
    if (referrer.includes('/') && !referrer.includes('/case-studies') && !referrer.includes('/insights') && !referrer.includes('/events')) {
      return 'landing';
    }
    // Check if user came from case studies page
    if (referrer.includes('/case-studies')) {
      return 'case-studies';
    }
  }

  return 'unknown';
};

const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveCaseStudyDetail();
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCaseStudy = () => {
      try {
        setIsLoading(true);

        const sourcePage = getSourcePage();

        // Strategy 1: If user came from landing page, check landing page cache first
        if (sourcePage === 'landing') {
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');

          if (landingPageCache && landingPageCache.data.featuredCaseStudies) {
            const foundFeaturedCaseStudy = landingPageCache.data.featuredCaseStudies.find(
              (cs) => cs.documentId === documentId
            );

            if (foundFeaturedCaseStudy) {
              const convertedCaseStudy = convertFeaturedCaseStudyToCaseStudyData(foundFeaturedCaseStudy);
              setCaseStudy(convertedCaseStudy);
              setIsLoading(false);
              return;
            }
          }

          // If not found in landing page cache, fall back to case studies cache
          const caseStudiesCache = SimpleCache.get<CaseStudiesResponse>('case-studies');
          if (caseStudiesCache) {
            const foundCaseStudy = caseStudiesCache.data.find(
              (cs) => cs.documentId === documentId
            );
            if (foundCaseStudy) {
              setCaseStudy(foundCaseStudy);
              setIsLoading(false);
              return;
            }
          }
        }

        // Strategy 2: If user came from case studies page or unknown source, check case studies cache first
        else {
          const caseStudiesCache = SimpleCache.get<CaseStudiesResponse>('case-studies');

          if (caseStudiesCache) {
            const foundCaseStudy = caseStudiesCache.data.find(
              (cs) => cs.documentId === documentId
            );
            if (foundCaseStudy) {
              setCaseStudy(foundCaseStudy);
              setIsLoading(false);
              return;
            }
          }

          // If not found in case studies cache, try landing page cache as fallback
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');
          if (landingPageCache && landingPageCache.data.featuredCaseStudies) {
            const foundFeaturedCaseStudy = landingPageCache.data.featuredCaseStudies.find(
              (cs) => cs.documentId === documentId
            );
            if (foundFeaturedCaseStudy) {
              const convertedCaseStudy = convertFeaturedCaseStudyToCaseStudyData(foundFeaturedCaseStudy);
              setCaseStudy(convertedCaseStudy);
              setIsLoading(false);
              return;
            }
          }
        }

        // If we get here, the case study was not found in any cache
        setError(new Error('Case study not found in cache'));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Loading case study...</p>
            </div>
          </div>
        </div>
      </div>
    );
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
