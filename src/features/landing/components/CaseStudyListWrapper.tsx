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
  image: string | StaticImageData;
  label: string;
  title: string;
  description: string;
  link: string;
  documentId?: string;
}

interface CaseStudyListWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}


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

const transformCaseStudiesToCards = (caseStudies: FeaturedCaseStudy[]): CaseStudyData[] => {
  return caseStudies.map((caseStudy, idx) => {
    // Use the actual image data from API, fallback to static images if not present
    const imageData = caseStudy.mainImage?.image;
    let image: string | StaticImageData;
    if (imageData && imageData.url) {
      image = imageData.url;
    } else {
      // fallback to static images if needed
      const staticImages = [hero1, hero2, hero3];
      image = staticImages[idx % staticImages.length];
    }

    return {
      title: caseStudy.title,
      label: 'CASE STUDY',
      description: extractPlainText(caseStudy.content),
      link: `#case-study-${caseStudy.documentId}`,
      image: image,
      documentId: caseStudy.documentId,
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

  // Transform featuredCaseStudies to cards - only use API data
  const caseStudies = data?.featuredCaseStudies
    ? transformCaseStudiesToCards(data.featuredCaseStudies)
    : [];

  if (isMobile) {
    return <CaseStudyListMobile caseStudies={caseStudies} />;
  }

  return <CaseStudyList caseStudies={caseStudies} />;
};

export default CaseStudyListWrapper; 