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
  attachment: any[]; // You can define a more specific type if needed
  case_studies: ServiceCaseStudy[];
  insights: ServiceInsight[];
  events: ServiceEvent[];
}

export interface ServicesResponse {
  data: ServiceData[];
  meta: Record<string, unknown>;
}
