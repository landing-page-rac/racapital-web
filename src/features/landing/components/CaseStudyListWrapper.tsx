'use client';

import { LandingPageData, FeaturedCaseStudy } from '../types';
import { RichTextContent } from '@/shared/types';
import CaseStudyList from './CaseStudyList';
import CaseStudyListMobile from './CaseStudyListMobile';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

interface CaseStudyData {
  image: StaticImageData | string;
  label: string;
  title: string;
  description: string;
  link: string;
}

interface CaseStudyListWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

// Fallback case studies when no data is available
const fallbackCaseStudies: CaseStudyData[] = [
  {
    image: hero1,
    label: 'CASE STUDY',
    title: 'GlobeBank leverages machine learning to cut fraud losses in real time.',
    description: 'How GlobeBank stopped threats before they struck',
    link: '#',
  },
  {
    image: hero2,
    label: 'CASE STUDY',
    title: 'AutoMotion scaled its EV production by deploying a digital twin of its assembly line.',
    description: 'See how AutoMotion accelerated output',
    link: '#',
  },
  {
    image: hero3,
    label: 'CASE STUDY',
    title: 'HealthSync uses advanced analytics to personalize patient care journeys.',
    description: 'Discover HealthSync\'s data-driven approach',
    link: '#',
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

// Function to transform FeaturedCaseStudy to CaseStudyData
const transformCaseStudiesToCards = (caseStudies: FeaturedCaseStudy[]): CaseStudyData[] => {
  const imageOptions = [hero1, hero2, hero3]; // Fallback images

  return caseStudies.map((caseStudy, index) => {
    // Use the actual image URL from API if available, otherwise fallback to hero images
    const image = caseStudy.image?.image?.url
      ? caseStudy.image.image.url
      : imageOptions[index % imageOptions.length];

    return {
      title: caseStudy.title,
      label: 'CASE STUDY',
      description: extractPlainText(caseStudy.content),
      link: `#case-study-${caseStudy.documentId}`,
      image: image,
    };
  });
};

const CaseStudyListWrapper: React.FC<CaseStudyListWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <section className="bg-[#1763F7] py-16">
        <LoadingSpinner
          size="md"
          className="py-8"
          text="Loading case studies..."
        />
      </section>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <section className="bg-[#1763F7] py-16">
        <div className="text-center text-white">
          <p className="text-red-200 text-sm">Error loading case studies</p>
        </div>
      </section>
    );
  }

  // Transform featuredCaseStudies to cards or use fallback
  const caseStudies = data?.featuredCaseStudies
    ? transformCaseStudiesToCards(data.featuredCaseStudies)
    : fallbackCaseStudies;

  if (isMobile) {
    return <CaseStudyListMobile caseStudies={caseStudies} />;
  }

  return <CaseStudyList caseStudies={caseStudies} />;
};

export default CaseStudyListWrapper; 