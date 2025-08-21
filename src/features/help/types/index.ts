import { RichTextContent } from '@/shared/types';

export interface MediaData {
  documentId: string;
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface AttachmentData {
  alternativeText: string;
  media: MediaData;
}

export interface OptionData {
  label: string;
}

export interface ContactUsData {
  documentId: string;
  title: RichTextContent;
  description: string;
  topicTitle: string;
  locationTitle: string;
  attachment: AttachmentData[];
  topicOptions: OptionData[];
  locationOptions: OptionData[];
}

export interface ContactUsResponse {
  data: ContactUsData;
  meta: Record<string, unknown>;
}
