'use client';

import StewardshipCTA from './StewardshipCTA';
import StewardshipCTAMobile from './StewardshipCTAMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

const StewardshipCTAWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <StewardshipCTAMobile />;
  }

  return <StewardshipCTA />;
};

export default StewardshipCTAWrapper; 