import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { useLandingPageData } from '../hooks/useLandingPageData';
import OurServices from './OurServices';
import StatsBar from './StatsBar';
import StewardshipCTA from './StewardshipCTA';
import InsightCarousel from './InsightCarousel';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import CaseStudyList from './CaseStudyList';

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
    description: 'Effective risk management is more important than ever. Explore best practices for today’s environment.',
    linkText: 'Explore risk strategies',
    linkHref: '#',
    image: hero3,
  },
];

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
        <div className='p-6'>
          <InsightCarousel cards={dummyCards} />
        </div>
        <CaseStudyList />
      </main>
    </div>
  );
};

export default LandingPage; 