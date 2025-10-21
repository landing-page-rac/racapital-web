import { RichTextContent } from '@/shared/types';

export interface ServiceCaseStudy {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
}

export interface ServiceInsight {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
}

export interface ServiceEvent {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  location: string;
  date: string;
}

export interface ServiceData {
  documentId: string;
  name: string;
  content: RichTextContent;
  number: number;
  attachment: unknown[];
  case_studies: ServiceCaseStudy[];
  insights: ServiceInsight[];
  events: ServiceEvent[];
}

export interface ServicesPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ServicesResponse {
  data: {
    results: ServiceData[];
    pagination: ServicesPagination;
  };
  meta: Record<string, unknown>;
}
