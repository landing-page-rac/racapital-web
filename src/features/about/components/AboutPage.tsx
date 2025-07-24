'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import HeroSectionMobile from './HeroSectionMobile';
import OurPeople from './OurPeople';
import OurPeopleMobile from './OurPeopleMobile';
import { ContactSection, ContactSectionMobile } from '@/shared/components';
import { Footer, FooterMobile } from '@/features/landing';

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

const AboutPage: React.FC = () => {
  const isMobile = useResponsiveHero();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {isMobile ? (
        <HeroSectionMobile />
      ) : (
        <HeroSection />
      )}

      {/* Our People Section */}
      {isMobile ? (
        <OurPeopleMobile />
      ) : (
        <OurPeople />
      )}

      {/* Contact Section */}
      {isMobile ? (
        <ContactSectionMobile />
      ) : (
        <ContactSection />
      )}
      {isMobile ? (
        <FooterMobile />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default AboutPage; 