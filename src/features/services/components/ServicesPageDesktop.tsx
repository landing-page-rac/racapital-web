'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NavItem } from '@/features/landing/types';
import Container from '@/shared/components/ui/Container';
import Navbar from '@/features/landing/components/Navbar';
import { Footer } from '@/features/landing';
import { useServicesData } from '../hooks/useServicesData';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import superGraphic from '@/features/landing/assets/super-graphic-white.png';

interface ServicesPageDesktopProps {
  navItems: NavItem[];
}

const ServiceAccordionItem: React.FC<{
  service: import('../types').ServiceData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ service, isOpen, onToggle, index }) => {
  return (
    <motion.div
      className="border-t border-b border-white/20 last:border-b-0 py-10"
      initial={false}
      animate={{ height: 'auto' }}
    >
      <motion.button
        className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-bold text-white/60 min-w-[3rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {service.name}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl font-light cursor-pointer"
        >
          +
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pl-20">
          <div className="text-white/80 text-lg leading-relaxed mb-6">
            {renderRichTextContent(service.content)}
          </div>
          <motion.button
            className="bg-white text-[#0D52E5] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Handle brochure download - you can implement this based on your needs
              console.log('Download brochure for:', service.name);
            }}
          >
            Download Brochure
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesPageDesktop: React.FC<ServicesPageDesktopProps> = ({
  navItems,
}) => {
  const { services, isLoading, error } = useServicesData();
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const handleServiceToggle = (serviceId: string) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-[#0D52E5] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-[#0D52E5]/20"></div>
      </motion.div>

      {/* Navbar */}
      <Navbar navItems={navItems} />

      <Container maxWidth="7xl" className="relative z-10">
        <div className="py-16 lg:py-24">
          {/* Hero Section */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 flex gap-24">
                <motion.h1
                  className="text-4xl lg:text-6xl font-bold leading-tight mb-8"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2
                  }}
                >
                  Our Services
                </motion.h1>
              </div>
            </div>
          </motion.div>

          {/* Services Listings Section */}
          <motion.div
            className="max-w-6xl mx-auto mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            {isLoading ? (
              <div className="text-center text-white/80 py-12">
                <p className="text-xl">Loading services...</p>
              </div>
            ) : error ? (
              <div className="text-center text-white/80 py-12">
                <p className="text-xl">Error loading services</p>
                <p className="text-lg mt-2">Please try again later.</p>
              </div>
            ) : services && services.length > 0 ? (
              <div className="overflow-hidden">
                {services.map((service, index) => (
                  <ServiceAccordionItem
                    key={service.documentId}
                    service={service}
                    isOpen={openServiceId === service.documentId}
                    onToggle={() => handleServiceToggle(service.documentId)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-white/80 py-12">
                <p className="text-xl">No services available at the moment</p>
                <p className="text-lg mt-2">Please check back later.</p>
              </div>
            )}
          </motion.div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPageDesktop;
