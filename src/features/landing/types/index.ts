import { RichTextContent } from '@/shared/types';




// Image types
export interface ImageData {
  documentId: string;
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface ImageWithAlt {
  alternativeText: string;
  image: ImageData;
}

export interface MediaWithAlt {
  alternativeText: string;
  media: ImageData;
}

// Hero section types
export interface HeroSectionContentType {
  headline: RichTextContent;
  tagline: RichTextContent;
  centerImage: ImageWithAlt;
  leftImage: ImageWithAlt;
  rightImage: ImageWithAlt;
}

// Featured service type
export interface FeaturedService {
  documentId: string;
  name: string;
  content: RichTextContent;
}

// Metrics type
export interface Metric {
  value: string;
  label: string;
}

// Report banner type
export interface ReportBanner {
  text: string;
  attachment: MediaWithAlt;
}

// Featured case study type
export interface FeaturedCaseStudy {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  mainImage?: ImageWithAlt;
}

// Featured insight type
export interface FeaturedInsight {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  mainImage?: ImageWithAlt;
}

// Featured event type
export interface FeaturedEvent {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
  location: string;
  date: string;
  image: ImageWithAlt;
}

// Main landing page data type
export interface LandingPageData {
  documentId: string;
  aboutUsIntro: RichTextContent;
  aspirationQuote: string;
  hero: HeroSectionContentType;
  featuredServices: FeaturedService[];
  metrics: Metric[];
  reportBanner: ReportBanner;
  featuredCaseStudies: FeaturedCaseStudy[];
  featuredInsights: FeaturedInsight[];
  featuredEvents: FeaturedEvent[];
}

// API response type
export interface LandingPageResponse {
  data: LandingPageData;
  meta: Record<string, unknown>;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface LandingPageProps {
  heroSection: HeroSectionContentType;
  navItems: NavItem[];
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

export interface Event {
  documentId: string;
  title: string;
  date: string;
  image: string; // URL string from API
  location: string;
}