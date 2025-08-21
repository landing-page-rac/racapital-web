'use client';

import React from 'react';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import Footer from './Footer';
import FooterMobile from './FooterMobile';

const FooterWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  return isMobile ? <FooterMobile /> : <Footer />;
};

export default FooterWrapper; 