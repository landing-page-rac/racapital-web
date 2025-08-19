'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import SimpleCache from '@/shared/utils/simpleCache';
import { CaseStudiesResponse, CaseStudyData } from '../types';

export const useCaseStudiesDataCached = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 1. Check cache first
        const cacheKey = 'case-studies';
        const cachedData = SimpleCache.get<CaseStudiesResponse>(cacheKey);

        if (cachedData) {
          // Use cached data if available and fresh (within 10 minutes)
          setCaseStudies(cachedData.data);
          setIsLoading(false);
          return;
        }

        // 2. Fetch from API
        const response = await axiosInstance.get<CaseStudiesResponse>('/case-studies');

        // 3. Save to cache
        SimpleCache.set(cacheKey, response.data);

        // 4. Set data
        setCaseStudies(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { caseStudies, isLoading, error };
};
