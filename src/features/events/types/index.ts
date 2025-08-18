import { RichTextContent } from '@/shared/types';

export interface EventService {
  documentId: string;
  name: string;
  content: RichTextContent;
}

export interface EventImage {
  alternativeText: string;
  image: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface EventAttachment {
  alternativeText: string;
  media: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface EventCollapsibleItem {
  title: string;
  content: RichTextContent;
}

export interface EventData {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  location: string;
  date: string;
  mainImage: EventImage;
  service: EventService;
  image: EventImage;
  collapsibleList: EventCollapsibleItem[];
  attachment: EventAttachment;
}

export interface EventsResponse {
  data: EventData[];
  meta: Record<string, unknown>;
}
