import { RichTextContent } from '@/shared/types';

export interface CaseStudyService {
  documentId: string;
  name: string;
  content: RichTextContent;
}

export interface CaseStudyImage {
  alternativeText: string;
  image: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface CaseStudyAttachment {
  alternativeText: string;
  media: {
    documentId: string;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface CaseStudyCollapsibleItem {
  title: string;
  content: RichTextContent;
}

export interface CaseStudyData {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  mainImage: CaseStudyImage;
  service: CaseStudyService;
  image: CaseStudyImage;
  collapsibleList: CaseStudyCollapsibleItem[];
  attachment: CaseStudyAttachment;
}

export interface CaseStudiesResponse {
  data: CaseStudyData[];
  meta: Record<string, unknown>;
}
