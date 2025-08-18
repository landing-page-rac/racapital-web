import { RichTextContent } from '@/shared/types';

export interface InsightService {
  documentId: string;
  name: string;
  content: RichTextContent;
}

export interface InsightImage {
  alternativeText: string;
  image: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface InsightAttachment {
  alternativeText: string;
  media: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface InsightCollapsibleItem {
  title: string;
  content: RichTextContent;
}

export interface InsightData {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  mainImage: InsightImage;
  service: InsightService;
  image: InsightImage;
  collapsibleList: InsightCollapsibleItem[];
  attachment: InsightAttachment;
}

export interface InsightsResponse {
  data: InsightData[];
  meta: Record<string, unknown>;
}
