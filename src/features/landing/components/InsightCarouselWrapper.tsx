'use client';

import InsightCarousel from './InsightCarousel';
import InsightCarouselMobile from './InsightCarouselMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import { StaticImageData } from 'next/image';

interface CardData {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData;
}

interface InsightCarouselWrapperProps {
  cards: CardData[];
}

const InsightCarouselWrapper: React.FC<InsightCarouselWrapperProps> = ({ cards }) => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <InsightCarouselMobile cards={cards} />;
  }

  return <InsightCarousel cards={cards} />;
};

export default InsightCarouselWrapper; 