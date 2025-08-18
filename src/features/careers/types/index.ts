import { RichTextContent } from '@/shared/types';

export interface CareerData {
  documentId: string;
  title: string;
  level: string;
  description: RichTextContent;
  location: string;
  applyEmail: string;
  applySubject: string;
  isActive: boolean;
}

export interface CareersResponse {
  data: CareerData[];
  meta: any;
}
