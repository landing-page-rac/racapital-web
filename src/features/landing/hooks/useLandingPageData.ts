import { useMemo } from 'react';
import { LandingPageProps } from '../types';

export const useLandingPageData = (): LandingPageProps => {
  const landingPageData = useMemo(() => ({
    navItems: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'About Us',
        href: '/about',
      },
      {
        label: 'Insights',
        href: '/insights',
      },
      {
        label: 'Case Studies',
        href: '/case-studies',
      },
      {
        label: 'How We Can Help',
        href: '/how-we-can-help',
      },
      {
        label: 'Careers',
        href: '/careers',
      },
    ],
    heroSection: {
      headline: 'Empowering Your Financial Future',
      subheading: 'Strategic investment management and wealth preservation solutions tailored for discerning clients who demand excellence.',
      ctaButton: {
        text: 'Start Your Journey',
        href: '/contact',
        variant: 'primary' as const,
      },
    },
  }), []);

  return landingPageData;
}; 