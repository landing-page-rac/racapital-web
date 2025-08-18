'use client';

import Footer from './Footer';
import FooterMobile from './FooterMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

const FooterWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <FooterMobile />;
  }

  return <Footer />;
};

export default FooterWrapper; 