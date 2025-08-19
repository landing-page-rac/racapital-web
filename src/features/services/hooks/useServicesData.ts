'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { ServicesResponse, ServiceData } from '../types';

export const useServicesData = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<ServicesResponse>('/services/');
        setServices(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, isLoading, error };
};
