'use client';

import { useState } from 'react';
import axiosInstance from '@/shared/utils/axios';

interface AttachmentLogPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  collectionType: string;
  collectionIdentifier: string;
  fileKey: string;
}

interface AttachmentLogResponse {
  success: boolean;
  message?: string;
}

interface AttachmentLogState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}

export const useAttachmentLog = () => {
  const [state, setState] = useState<AttachmentLogState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const submitAttachmentLog = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    collectionType: string;
    collectionIdentifier: string;
    fileKey: string;
  }) => {
    try {
      setState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });

      const payload: AttachmentLogPayload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        collectionType: formData.collectionType,
        collectionIdentifier: formData.collectionIdentifier,
        fileKey: formData.fileKey,
      };

      const response = await axiosInstance.post<AttachmentLogResponse>('/attachment-log', payload);

      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });

      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while logging the attachment download';

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
    submitAttachmentLog,
    resetState,
  };
};
