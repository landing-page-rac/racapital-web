'use client';

import React from 'react';
import HeroSection from './HeroSection';
import OurPeople from './OurPeople';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Our People Section */}
      <OurPeople />

      {/* Contact Section */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default AboutPage; 