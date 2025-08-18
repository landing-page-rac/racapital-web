'use client';

import { useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { ContactFormPayload, ContactFormResponse, ContactFormState } from '@/shared/types/contact';

export const useContactForm = () => {
  const [state, setState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const submitContactForm = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    topic?: string;
    location?: string;
  }) => {
    try {
      setState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });

      // Prepare payload with default values for optional fields
      const payload: ContactFormPayload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message,
        topic: formData.topic || '-',
        location: formData.location || '-',
      };

      const response = await axiosInstance.post<ContactFormResponse>('/contact-us-form', payload);

      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred while submitting the form';

      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: errorMessage,
      });

      throw error;
    }
  };

  const resetState = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  };

  return {
    ...state,
    submitContactForm,
    resetState,
  };
};
