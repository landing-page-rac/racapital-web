'use client';

import { useLandingPageData } from '../hooks/useLandingPageData';
import HeroSectionWrapper from './HeroSectionWrapper';
import OurServicesWrapper from './OurServicesWrapper';
import StatsBarWrapper from './StatsBarWrapper';
import StewardshipCTAWrapper from './StewardshipCTAWrapper';
import InsightCarouselWrapper from './InsightCarouselWrapper';
import CaseStudyListWrapper from './CaseStudyListWrapper';
import EventsWrapper from './EventsWrapper';
import ContactSectionWrapper from './ContactSectionWrapper';
import FooterWrapper from './FooterWrapper';

const LandingPage: React.FC = () => {
  const { data, isLoading, error } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <main className='bg-white'>
        <HeroSectionWrapper data={data} isLoading={isLoading} error={error} />
        <OurServicesWrapper data={data} isLoading={isLoading} error={error} />
        <StatsBarWrapper data={data} isLoading={isLoading} error={error} />
        <StewardshipCTAWrapper data={data} isLoading={isLoading} error={error} />
        <InsightCarouselWrapper data={data} isLoading={isLoading} error={error} />
        <CaseStudyListWrapper data={data} isLoading={isLoading} error={error} />
        <EventsWrapper data={data} isLoading={isLoading} error={error} />
        <ContactSectionWrapper />
        <FooterWrapper />
      </main>
    </div>
  );
};

export default LandingPage; 