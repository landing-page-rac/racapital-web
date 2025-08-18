'use client';

import { LandingPageData } from '../types';
import StewardshipCTA from './StewardshipCTA';
import StewardshipCTAMobile from './StewardshipCTAMobile';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

interface StewardshipCTAWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

const StewardshipCTAWrapper: React.FC<StewardshipCTAWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <section className="bg-[#002E73] py-10">
        <LoadingSpinner
          size="md"
          className="py-8"
          text="Loading report..."
        />
      </section>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <section className="bg-[#002E73] py-10">
        <div className="text-center text-white">
          <p className="text-red-200 text-sm">Error loading report</p>
        </div>
      </section>
    );
  }

  // Pass reportBanner data to the appropriate component
  const reportBanner = data?.reportBanner;

  if (isMobile) {
    return <StewardshipCTAMobile reportBanner={reportBanner} />;
  }

  return <StewardshipCTA reportBanner={reportBanner} />;
};

export default StewardshipCTAWrapper; 