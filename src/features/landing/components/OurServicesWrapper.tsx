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
  data, // Will be used when OurServices components are updated to use API data
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Log data for debugging (will be removed when data is actually used)
  if (data) {
    console.log('OurServices data available:', data.featuredServices);
  }

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

  // For now, render the original components since they use hardcoded data
  // In the future, we can update them to use data.featuredServices
  if (isMobile) {
    return <OurServicesMobile />;
  }

  return <OurServices />;
};

export default OurServicesWrapper; 