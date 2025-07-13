import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { useLandingPageData } from '../hooks/useLandingPageData';
import OurServices from './OurServices';
import StatsBar from './StatsBar';
import StewardshipCTA from './StewardshipCTA';
import InsightCard from './InsightCard';

const LandingPage: React.FC = () => {
  const { navItems, heroSection } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main>
        <HeroSection heroSection={heroSection} />
        <OurServices />
        <StatsBar />
        <div className='p-6'>
          <StewardshipCTA />
        </div>
        <InsightCard
          subtitle="INSIGHT"
          title="The future of finance: Decoding digital treasury"
          description="In an era of constant disruption, companies need more than a contingency plan—they need an adaptive operating model that learns and evolves. This playbook outlines the four pillars of organizational adaptability and how to embed them across your enterprise."
          linkText="Explore approaches"
          linkHref="#"
        />
      </main>
    </div>
  );
};

export default LandingPage; 