import { RichTextContent } from '@/shared/types';

export interface AboutUsMetric {
  value: string;
  label: string;
}

export interface AboutUsHero {
  title: string;
  body: string;
  metrics: AboutUsMetric[];
}

export interface AboutUsPrinciple {
  title: string;
  description: RichTextContent;
  image: {
    alternativeText: string;
    image: {
      documentId: string;
      name: string;
      width: number;
      height: number;
      url: string;
    };
  };
}

export interface AboutUsFlagshipService {
  title: string;
  description: RichTextContent;
}

export interface AboutUsTeamMember {
  name: string;
  role: string;
  bio: RichTextContent;
  photo: {
    alternativeText: string;
    image: {
      documentId: string;
      name: string;
      width: number;
      height: number;
      url: string;
    };
  };
}

export interface AboutUsData {
  documentId: string;
  hero: AboutUsHero;
  principles: AboutUsPrinciple[];
  flagshipServices: AboutUsFlagshipService[];
  teamMembers: AboutUsTeamMember[];
}

export interface AboutUsResponse {
  data: AboutUsData;
  meta: any;
}
