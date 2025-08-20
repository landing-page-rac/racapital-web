'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import SimpleCache from '@/shared/utils/simpleCache';
import { EventsResponse, EventData } from '../types';

export const useEventsApiDataCached = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 1. Check cache first
        const cacheKey = 'events';
        const cachedData = SimpleCache.get<EventsResponse>(cacheKey);

        if (cachedData) {
          // Use cached data if available and fresh (within 10 minutes)
          setEvents(cachedData.data);
          setIsLoading(false);
          return;
        }

        // 2. Fetch from API
        const response = await axiosInstance.get<EventsResponse>('/events');

        // 3. Save to cache
        SimpleCache.set(cacheKey, response.data);

        // 4. Set data
        setEvents(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, isLoading, error };
};
