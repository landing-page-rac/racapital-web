'use client';

import { LandingPageData } from '../types';
import StatsBar from './StatsBar';
import StatsBarMobile from './StatsBarMobile';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

interface StatsBarWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

const StatsBarWrapper: React.FC<StatsBarWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <section className="bg-[#1763F7] py-10">
        <LoadingSpinner
          size="md"
          className="py-8"
          text="Loading statistics..."
        />
      </section>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <section className="bg-[#1763F7] py-10">
        <div className="text-center text-white">
          <p className="text-red-200 text-sm">Error loading statistics</p>
        </div>
      </section>
    );
  }

  // Pass metrics data to the appropriate component
  const metrics = data?.metrics;

  if (isMobile) {
    return <StatsBarMobile metrics={metrics} />;
  }

  return <StatsBar metrics={metrics} />;
};

export default StatsBarWrapper; 