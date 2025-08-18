export interface ContactFormPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  topic?: string;
  location?: string;
}

export interface ContactFormData {
  id: number;
  documentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  topic: string;
  location: string;
  inquiryStatus: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}

export interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}
