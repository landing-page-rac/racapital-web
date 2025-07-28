'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import HeroSectionMobile from './HeroSectionMobile';
import OurServices from './OurServices';
import OurServicesMobile from './OurServicesMobile';
import StatsBar from './StatsBar';
import StatsBarMobile from './StatsBarMobile';
import StewardshipCTA from './StewardshipCTA';
import StewardshipCTAMobile from './StewardshipCTAMobile';
import InsightCarousel from './InsightCarousel';
import InsightCarouselMobile from './InsightCarouselMobile';
import CaseStudyList from './CaseStudyList';
import CaseStudyListMobile from './CaseStudyListMobile';
import Events from './Events';
import EventsMobile from './EventsMobile';
import ContactSection from '@/shared/components/ui/ContactSection';
import ContactSectionMobile from '@/shared/components/ui/ContactSectionMobile';
import Footer from './Footer';
import FooterMobile from './FooterMobile';
import { useLandingPageData } from '../hooks/useLandingPageData';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

const dummyCards = [
  {
    subtitle: 'INSIGHT',
    title: 'The future of finance: Decoding digital treasury',
    description: 'Explore how digital transformation is reshaping treasury management for modern organizations.',
    linkText: 'Explore approaches',
    linkHref: '#',
    image: hero1,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Reimagining resilience: Building adaptive organizations',
    description: 'In an era of constant disruption, companies need more than a contingency plan—they need an adaptive operating model that learns and evolves.',
    linkText: 'Discover strategies',
    linkHref: '#',
    image: hero2,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Unlocking value: The rise of alternative investments',
    description: 'Alternative investments are gaining traction. Learn how to leverage them for portfolio growth.',
    linkText: 'Read more',
    linkHref: '#',
    image: hero3,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Sustainable finance: The next frontier',
    description: 'Sustainability is now a core driver of value. Discover how finance leaders are adapting.',
    linkText: 'See insights',
    linkHref: '#',
    image: hero2,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Digital assets: Navigating the new landscape',
    description: 'Digital assets are transforming markets. Learn what this means for your organization.',
    linkText: 'Learn more',
    linkHref: '#',
    image: hero1,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Risk management in a volatile world',
    description: 'Effective risk management is more important than ever. Explore best practices for today\'s environment.',
    linkText: 'Explore risk strategies',
    linkHref: '#',
    image: hero3,
  },
];

// Custom hook for responsive rendering
const useResponsiveHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

const LandingPage: React.FC = () => {
  const { data, isLoading, error } = useLandingPageData();
  const isMobile = useResponsiveHero();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading page content</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show message if no data
  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className='bg-white'>
        {isMobile ? (
          <>
            <HeroSectionMobile navItems={NAV_ITEMS} />
            <OurServicesMobile />
            <StatsBarMobile />
            <StewardshipCTAMobile />
            <InsightCarouselMobile cards={dummyCards} />
            <CaseStudyListMobile />
            <EventsMobile />
            <ContactSectionMobile />
            <FooterMobile />

          </>
        ) : (
          <>
            <HeroSection navItems={NAV_ITEMS} />
            <OurServices />
            <StatsBar />
            <StewardshipCTA />
            <InsightCarousel cards={dummyCards} />
            <CaseStudyList />
            <Events />
            <ContactSection />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
};

export default LandingPage; 