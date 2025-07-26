import { StaticImageData } from 'next/image';

// Base types for rich text content
export interface RichTextChild {
  text: string;
  type: 'text';
  bold?: boolean;
  underline?: boolean;
}

export interface RichTextParagraph {
  type: 'paragraph';
  children: RichTextChild[];
}

export type RichTextContent = RichTextParagraph[];

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
export interface HeroSection {
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
}

// Featured insight type
export interface FeaturedInsight {
  documentId: string;
  title: string;
  content: RichTextContent;
  quote: RichTextContent;
}

// Main landing page data type
export interface LandingPageData {
  documentId: string;
  aboutUsIntro: RichTextContent;
  aspirationQuote: string;
  hero: HeroSection;
  featuredServices: FeaturedService[];
  metrics: Metric[];
  reportBanner: ReportBanner;
  featuredCaseStudies: FeaturedCaseStudy[];
  featuredInsights: FeaturedInsight[];
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
  heroSection: HeroSection;
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
  id: string;
  type: string;
  title: string;
  location: string;
  date: string;
  image: string | StaticImageData;
} 