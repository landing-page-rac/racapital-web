'use client';

import React, { useState, useEffect } from 'react';
import InsightDetailPageMobile from './InsightDetailPageMobile';
import InsightDetailPageDesktop from './InsightDetailPageDesktop';
import { InsightData } from '../types';
import SimpleCache from '@/shared/utils/simpleCache';
import { InsightsResponse } from '../types';
import { LandingPageResponse, FeaturedInsight } from '../../landing/types';

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

// Function to convert FeaturedInsight to InsightData
const convertFeaturedInsightToInsightData = (featuredInsight: FeaturedInsight): InsightData => {
  return {
    documentId: featuredInsight.documentId,
    title: featuredInsight.title,
    content: featuredInsight.content,
    quote: featuredInsight.quote,
    mainImage: {
      alternativeText: featuredInsight.mainImage?.alternativeText || '',
      image: {
        documentId: featuredInsight.mainImage?.image.documentId || '',
        name: featuredInsight.mainImage?.image.name || '',
        width: featuredInsight.mainImage?.image.width || 0,
        height: featuredInsight.mainImage?.image.height || 0,
        url: featuredInsight.mainImage?.image.url || '',
      }
    },
    service: {
      documentId: '', // Not available in featured insight
      name: '', // Not available in featured insight
      content: [] // Not available in featured insight
    },
    image: {
      alternativeText: featuredInsight.mainImage?.alternativeText || '',
      image: {
        documentId: featuredInsight.mainImage?.image.documentId || '',
        name: featuredInsight.mainImage?.image.name || '',
        width: featuredInsight.mainImage?.image.width || 0,
        height: featuredInsight.mainImage?.image.height || 0,
        url: featuredInsight.mainImage?.image.url || '',
      }
    },
    collapsibleList: [], // Not available in featured insight
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
const getSourcePage = (): 'landing' | 'insights' | 'unknown' => {
  if (typeof document === 'undefined') return 'unknown';

  const referrer = document.referrer;
  const currentHost = window.location.host;

  // If referrer is from the same domain
  if (referrer && referrer.includes(currentHost)) {
    // Check if user came from landing page
    if (referrer.includes('/') && !referrer.includes('/insights') && !referrer.includes('/case-studies') && !referrer.includes('/events')) {
      return 'landing';
    }
    // Check if user came from insights page
    if (referrer.includes('/insights')) {
      return 'insights';
    }
  }

  return 'unknown';
};

const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveInsightDetail();
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInsight = () => {
      try {
        setIsLoading(true);

        const sourcePage = getSourcePage();

        // Strategy 1: If user came from landing page, check landing page cache first
        if (sourcePage === 'landing') {
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');

          if (landingPageCache && landingPageCache.data.featuredInsights) {
            const foundFeaturedInsight = landingPageCache.data.featuredInsights.find(
              (ins) => ins.documentId === documentId
            );

            if (foundFeaturedInsight) {
              const convertedInsight = convertFeaturedInsightToInsightData(foundFeaturedInsight);
              setInsight(convertedInsight);
              setIsLoading(false);
              return;
            }
          }

          // If not found in landing page cache, fall back to insights cache
          const insightsCache = SimpleCache.get<InsightsResponse>('insights');
          if (insightsCache) {
            const foundInsight = insightsCache.data.find(
              (ins) => ins.documentId === documentId
            );
            if (foundInsight) {
              setInsight(foundInsight);
              setIsLoading(false);
              return;
            }
          }
        }

        // Strategy 2: If user came from insights page or unknown source, check insights cache first
        else {
          const insightsCache = SimpleCache.get<InsightsResponse>('insights');

          if (insightsCache) {
            const foundInsight = insightsCache.data.find(
              (ins) => ins.documentId === documentId
            );
            if (foundInsight) {
              setInsight(foundInsight);
              setIsLoading(false);
              return;
            }
          }

          // If not found in insights cache, try landing page cache as fallback
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');
          if (landingPageCache && landingPageCache.data.featuredInsights) {
            const foundFeaturedInsight = landingPageCache.data.featuredInsights.find(
              (ins) => ins.documentId === documentId
            );
            if (foundFeaturedInsight) {
              const convertedInsight = convertFeaturedInsightToInsightData(foundFeaturedInsight);
              setInsight(convertedInsight);
              setIsLoading(false);
              return;
            }
          }
        }

        // If we get here, the insight was not found in any cache
        setError(new Error('Insight not found in cache'));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setIsLoading(false);
      }
    };

    fetchInsight();
  }, [documentId]);

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
