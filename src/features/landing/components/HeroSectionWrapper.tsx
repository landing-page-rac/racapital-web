'use client';

import { LandingPageData } from '../types';
import { NAV_ITEMS } from '@/shared/constants/navigation';


import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import HeroSection from './HeroSection';
import { HeroSectionMobile } from '..';

interface HeroSectionWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

const HeroSectionWrapper: React.FC<HeroSectionWrapperProps> = ({
  data,
  isLoading,
  error
}) => {
  const isMobile = useResponsiveHero();

  // Show loading state for this section
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42]">
        <LoadingSpinner
          size="lg"
          className="min-h-screen"
          text="Loading hero content..."
        />
      </div>
    );
  }

  // Show error state for this section
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-400 text-lg">Error loading hero content</p>
          <p className="text-gray-300 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // Render the appropriate hero section
  if (isMobile) {
    return (
      <HeroSectionMobile
        navItems={NAV_ITEMS}
        aboutUsIntro={data?.aboutUsIntro[0]}
        heroContent={data?.hero}
      />
    );
  }

  return (
    <HeroSection
      navItems={NAV_ITEMS}
      aboutUsIntro={data?.aboutUsIntro[0]}
      heroContent={data?.hero}
    />
  );
};

export default HeroSectionWrapper; 