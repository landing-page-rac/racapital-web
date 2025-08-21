'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { ContactUsResponse, ContactUsData } from '../types';

export const useContactUsData = () => {
  const [data, setData] = useState<ContactUsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<ContactUsResponse>('/contact-us');
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
