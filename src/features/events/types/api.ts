import { RichTextContent } from '@/shared/types';

// Base image and media types
export interface EventImageData {
  documentId: string;
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface EventImageWithAlt {
  alternativeText: string;
  image: EventImageData;
}

export interface EventMediaWithAlt {
  alternativeText: string;
  media: EventImageData;
}

// Service type
export interface EventService {
  documentId: string;
  name: string;
  content: RichTextContent;
}

// Collapsible list item type
export interface EventCollapsibleItem {
  title: string;
  content: RichTextContent;
}

// Main event data type
export interface EventData {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  mainImage: EventImageWithAlt;
  service: EventService;
  image: EventImageWithAlt;
  collapsibleList: EventCollapsibleItem[];
  attachment: EventMediaWithAlt;
}

// API response types
export interface EventsApiResponse {
  data: EventData[];
  meta: Record<string, unknown>;
}
