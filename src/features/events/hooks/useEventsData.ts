'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { EventsResponse, EventData } from '../types';

export const useEventsData = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<EventsResponse>('/events');
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