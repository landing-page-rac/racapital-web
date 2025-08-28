'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useServicesData } from '../hooks';
import ServicesAccordion from './ServicesAccordion';
import ContactSectionMobile from '@/shared/components/ui/ContactSectionMobile';
import Container from '@/shared/components/ui/Container';
import Navbar from '@/features/landing/components/Navbar';
import LoadingScreen from '@/shared/components/ui/LoadingScreen';
import superGraphic from '@/features/landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';

const ServicesPageMobile: React.FC = () => {
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
      <main className="relative z-10 pt-16 pb-16">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto px-4">
            {/* Title Section */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Our <span className="underline decoration-2 underline-offset-4">Services</span>
              </h1>
            </motion.div>

            {/* Services Accordion */}
            <ServicesAccordion services={services} />
          </div>
        </Container>
      </main>

      {/* Contact Section */}
      <ContactSectionMobile />

      {/* Footer */}
      <footer className="bg-black py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white/60">
            <p>&copy; 2024 Relevance and Alliance Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPageMobile;
