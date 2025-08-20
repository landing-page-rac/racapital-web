'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import SimpleCache from '@/shared/utils/simpleCache';
import { InsightsResponse, InsightData } from '../types';

export const useInsightsDataCached = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 1. Check cache first
        const cacheKey = 'insights';
        const cachedData = SimpleCache.get<InsightsResponse>(cacheKey);

        if (cachedData) {
          // Use cached data if available and fresh (within 10 minutes)
          setInsights(cachedData.data);
          setIsLoading(false);
          return;
        }

        // 2. Fetch from API
        const response = await axiosInstance.get<InsightsResponse>('/insights');

        // 3. Save to cache
        SimpleCache.set(cacheKey, response.data);

        // 4. Set data
        setInsights(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { insights, isLoading, error };
};
