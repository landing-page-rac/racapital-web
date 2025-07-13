import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { useLandingPageData } from '../hooks/useLandingPageData';

const LandingPage: React.FC = () => {
  const { navItems, heroSection } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main>
        <HeroSection heroSection={heroSection} />
      </main>
    </div>
  );
};

export default LandingPage; 