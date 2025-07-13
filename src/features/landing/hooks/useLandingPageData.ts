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
        label: 'About',
        href: '/about',
      },
      {
        label: 'Services',
        href: '/services',
      },
      {
        label: 'Portfolio',
        href: '/portfolio',
      },
      {
        label: 'Insights',
        href: '/insights',
      },
      {
        label: 'Contact',
        href: '/contact',
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