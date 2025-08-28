'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { InsightData } from '../types';

interface InsightDetailResponse {
  data: InsightData;
  meta: Record<string, unknown>;
}

export const useInsightDetailData = (documentId: string) => {
  const [insight, setInsight] = useState<InsightData | null>(null);
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

        const response = await axiosInstance.get<InsightDetailResponse>(`/insights/document/${documentId}`);
        setInsight(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setInsight(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  return { insight, isLoading, error };
};
