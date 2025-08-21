'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { FooterResponse, FooterData } from '../types/footer';

export const useFooterData = () => {
  const [data, setData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<FooterResponse>('/footer');
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
