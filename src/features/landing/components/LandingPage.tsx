import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { useLandingPageData } from '../hooks/useLandingPageData';
import OurServices from './OurServices';
import StatsBar from './StatsBar';
import StewardshipCTA from './StewardshipCTA';

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
      </main>
    </div>
  );
};

export default LandingPage; 