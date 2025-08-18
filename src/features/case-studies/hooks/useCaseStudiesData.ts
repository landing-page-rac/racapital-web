'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { CaseStudiesResponse, CaseStudyData } from '../types';

export const useCaseStudiesData = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<CaseStudiesResponse>('/case-studies');
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