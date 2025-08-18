'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { EventsApiResponse, EventData } from '../types/api';

export const useEventsApiData = () => {
  const [data, setData] = useState<EventData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<EventsApiResponse>('/api/events');
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
