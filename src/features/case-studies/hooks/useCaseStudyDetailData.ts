'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { CaseStudyData } from '../types';

interface CaseStudyDetailResponse {
  data: CaseStudyData;
  meta: Record<string, unknown>;
}

export const useCaseStudyDetailData = (documentId: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
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

        const response = await axiosInstance.get<CaseStudyDetailResponse>(`/case-studies/document/${documentId}`);
        setCaseStudy(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setCaseStudy(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  return { caseStudy, isLoading, error };
};
