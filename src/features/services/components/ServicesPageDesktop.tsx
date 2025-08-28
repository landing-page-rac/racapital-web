'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useServicesData } from '../hooks';
import ServicesAccordion from './ServicesAccordion';
import ContactSection from '@/shared/components/ui/ContactSection';
import Container from '@/shared/components/ui/Container';
import Navbar from '@/features/landing/components/Navbar';
import LoadingScreen from '@/shared/components/ui/LoadingScreen';
import superGraphic from '@/features/landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';

const ServicesPageDesktop: React.FC = () => {
  const { services, isLoading, error } = useServicesData();

  if (isLoading) {
    return <LoadingScreen message="Loading services..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading services</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#051F42] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Navbar */}
      <Navbar navItems={NAV_ITEMS} />

      {/* Main Content */}
      <main className="relative z-10 pt-20 lg:pt-20 pb-20">
        <Container maxWidth="7xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <motion.div
              className="text-center mb-16 lg:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Our <span className="underline decoration-2 underline-offset-4">Services</span>
              </h1>
            </motion.div>

            {/* Services Accordion */}
            <ServicesAccordion services={services} />
          </div>
        </Container>
      </main>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white/60">
            <p>&copy; 2024 Relevance and Alliance Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPageDesktop;
