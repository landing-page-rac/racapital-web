'use client';

import { useEffect, useState } from 'react';
import { fetchWithCache } from '@/shared/utils/cache';
import { LandingPageResponse, LandingPageData } from '../types';

export const useLandingPageData = () => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseData = await fetchWithCache<LandingPageResponse>('/home-page');
        setData(responseData.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};