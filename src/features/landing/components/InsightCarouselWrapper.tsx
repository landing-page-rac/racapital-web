'use client';

import { LandingPageData, FeaturedInsight } from '../types';
import { RichTextContent } from '@/shared/types';
import InsightCarousel from './InsightCarousel';
import InsightCarouselMobile from './InsightCarouselMobile';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

interface CardData {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData | string;
  documentId?: string;
}

interface InsightCarouselWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

// Fallback cards when no data is available
const fallbackCards: CardData[] = [
  {
    subtitle: 'PERSPECTIVE',
    title: 'The future of finance: Decoding digital treasury',
    description: 'Explore how digital transformation is reshaping treasury management for modern organizations.',
    linkText: 'Explore approaches',
    linkHref: '#',
    image: hero1,
  },
  {
    subtitle: 'PERSPECTIVE',
    title: 'Reimagining resilience: Building adaptive organizations',
    description: 'In an era of constant disruption, companies need more than a contingency plan—they need an adaptive operating model that learns and evolves.',
    linkText: 'Discover strategies',
    linkHref: '#',
    image: hero2,
  },
  {
    subtitle: 'PERSPECTIVE',
    title: 'Unlocking value: The rise of alternative investments',
    description: 'Alternative investments are gaining traction. Learn how to leverage them for portfolio growth.',
    linkText: 'Read more',
    linkHref: '#',
    image: hero3,
  },
];

// Function to extract plain text from RichTextContent
const extractPlainText = (content: RichTextContent): string => {
  if (!content || !Array.isArray(content)) {
    return '';
  }

  return content
    .map(block => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: { text?: string }) => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Function to transform FeaturedInsight to CardData
const transformInsightsToCards = (insights: FeaturedInsight[]): CardData[] => {
  const imageOptions = [hero1, hero2, hero3]; // Fallback images

  return insights.map((insight, index) => {
    // Use the actual image data from API if available, otherwise fallback to hero images
    const imageData = insight.mainImage?.image;
    const image =
      imageData && imageData.url
        ? imageData.url
        : imageOptions[index % imageOptions.length];

    return {
      title: insight.title,
      subtitle: 'PERSPECTIVE',
      description: extractPlainText(insight.content),
      linkText: 'Read more',
      linkHref: `/insights/${insight.documentId}`,
      image: image,
      documentId: insight.documentId,
    };
  });
};

const InsightCarouselWrapper: React.FC<InsightCarouselWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <section className="bg-[#051F42] py-20">
        <LoadingSpinner
          size="md"
          className="py-8"
          text="Loading perspective..."
        />
      </section>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <section className="bg-[#051F42] py-20">
        <div className="text-center text-white">
          <p className="text-red-200 text-sm">Error loading perspective</p>
        </div>
      </section>
    );
  }

  // Transform featuredInsights to cards or use fallback
  const cards = data?.featuredInsights
    ? transformInsightsToCards(data.featuredInsights)
    : fallbackCards;

  if (isMobile) {
    return <InsightCarouselMobile cards={cards} aspirationQuote={data?.aspirationQuote} />;
  }

  return <InsightCarousel cards={cards} aspirationQuote={data?.aspirationQuote} />;
};

export default InsightCarouselWrapper; 