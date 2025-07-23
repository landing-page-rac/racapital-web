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
import { useLandingPageData } from '../hooks/useLandingPageData';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import Footer from './Footer';
import ContactSection from '@/shared/components/ui/ContactSection';

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
  const { navItems } = useLandingPageData();
  const isMobile = useResponsiveHero();

  return (
    <div className="min-h-screen bg-white">
      <main className='bg-white'>
        {isMobile ? (
          <HeroSectionMobile navItems={navItems} />
        ) : (
          <HeroSection navItems={navItems} />
        )}
        {isMobile ? (
          <OurServicesMobile />
        ) : (
          <OurServices />
        )}
        {isMobile ? (
          <StatsBarMobile />
        ) : (
          <StatsBar />
        )}
        {isMobile ? (
          <StewardshipCTAMobile />
        ) : (
          <StewardshipCTA />
        )}
        {isMobile ? (
          <InsightCarouselMobile cards={dummyCards} />
        ) : (
          <InsightCarousel cards={dummyCards} />
        )}
        {isMobile ? (
          <CaseStudyListMobile />
        ) : (
          <CaseStudyList />
        )}
        {isMobile ? (
          <EventsMobile />
        ) : (
          <Events />
        )}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 