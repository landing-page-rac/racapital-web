import { RichTextContent } from '@/shared/types';

export interface FooterData {
  documentId: string;
  linkedInLink: string;
  address1: RichTextContent;
  address2: RichTextContent;
  email: string;
}

export interface FooterResponse {
  data: FooterData;
  meta: Record<string, unknown>;
}
