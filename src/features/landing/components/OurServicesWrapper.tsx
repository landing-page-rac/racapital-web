'use client';

import { LandingPageData } from '../types';
import OurServices from './OurServices';
import OurServicesMobile from './OurServicesMobile';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

interface OurServicesWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

const OurServicesWrapper: React.FC<OurServicesWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <section className="bg-[#06306B] py-8">
        <LoadingSpinner
          size="md"
          className="py-8"
          text="Loading services..."
        />
      </section>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <section className="bg-[#06306B] py-8">
        <div className="text-center text-white">
          <p className="text-red-200 text-sm">Error loading services</p>
        </div>
      </section>
    );
  }

  // Pass featuredServices data to the components
  if (isMobile) {
    return <OurServicesMobile featuredServices={data?.featuredServices || []} />;
  }

  return <OurServices featuredServices={data?.featuredServices || []} />;
};

export default OurServicesWrapper; 