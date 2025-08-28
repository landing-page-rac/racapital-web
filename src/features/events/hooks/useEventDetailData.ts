'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { EventData } from '../types';

interface EventDetailResponse {
  data: EventData;
  meta: Record<string, unknown>;
}

export const useEventDetailData = (documentId: string) => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!documentId) {
        setError(new Error('Document ID is required'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await axiosInstance.get<EventDetailResponse>(`/events/document/${documentId}`);
        setEvent(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  return { event, isLoading, error };
};
