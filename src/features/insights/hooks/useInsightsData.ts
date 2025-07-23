import { useMemo } from 'react';
import { StaticImageData } from 'next/image';
import hero1 from '../../landing/assets/hero-1.png';
import hero2 from '../../landing/assets/hero-2.png';
import hero3 from '../../landing/assets/hero-3.png';

export interface Insight {
  id: string;
  title: string;
  image: StaticImageData;
  linkText?: string;
  linkHref?: string;
}

export const useInsightsData = () => {
  const insights = useMemo<Insight[]>(() => [
    {
      id: '1',
      title: 'The future of finance: Decoding digital treasury',
      image: hero1,
      linkText: 'Read more',
      linkHref: '#',
    },
    {
      id: '2',
      title: 'Reimagining resilience: Building adaptive organizations',
      image: hero2,
      linkText: 'Explore insights',
      linkHref: '#',
    },
    {
      id: '3',
      title: 'Unlocking value: The rise of alternative investments',
      image: hero3,
      linkText: 'Learn more',
      linkHref: '#',
    },
    {
      id: '4',
      title: 'Sustainable finance: The next frontier',
      image: hero1,
      linkText: 'Discover more',
      linkHref: '#',
    },
    {
      id: '5',
      title: 'Digital assets: Navigating the new landscape',
      image: hero2,
      linkText: 'Read full article',
      linkHref: '#',
    },
    {
      id: '6',
      title: 'Risk management in a volatile world',
      image: hero3,
      linkText: 'Explore strategies',
      linkHref: '#',
    },
  ], []);

  return { insights };
}; 