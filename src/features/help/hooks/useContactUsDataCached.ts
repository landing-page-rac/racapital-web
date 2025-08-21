'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import SimpleCache from '@/shared/utils/simpleCache';
import { ContactUsResponse, ContactUsData } from '../types';

export const useContactUsDataCached = () => {
  const [data, setData] = useState<ContactUsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 1. Check cache first
        const cacheKey = 'contact-us';
        const cachedData = SimpleCache.get<ContactUsResponse>(cacheKey);

        if (cachedData) {
          // Use cached data if available and fresh (within 10 minutes)
          setData(cachedData.data);
          setIsLoading(false);
          return;
        }

        // 2. Fetch from API
        const response = await axiosInstance.get<ContactUsResponse>('/contact-us');

        // 3. Save to cache
        SimpleCache.set(cacheKey, response.data);

        // 4. Set data
        setData(response.data.data);
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
