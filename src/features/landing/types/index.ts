import { StaticImageData } from 'next/image';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeroSection {
  headline: string;
  subheading: string;
  ctaButton: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  backgroundImage?: string;
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