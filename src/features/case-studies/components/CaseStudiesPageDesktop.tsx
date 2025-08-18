'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { useCaseStudiesData } from '../hooks/useCaseStudiesData';
import CaseStudyCard from './CaseStudyCard';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';

const CaseStudiesPageDesktop: React.FC = () => {
  const { caseStudies, isLoading, error } = useCaseStudiesData();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
        <Navbar navItems={NAV_ITEMS} />
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={superGraphic}
            alt="Background Graphic"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/30 to-[#051F42]/60"></div>
        </motion.div>

        <main className="relative z-10 pt-5">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Explore our success stories and learn how we&apos;ve helped our clients achieve their strategic objectives and drive sustainable growth.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-8 min-h-96"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isLoading ? (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">Loading case studies...</p>
                </div>
              ) : error ? (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">Error loading case studies</p>
                  <p className="text-lg text-gray-300">
                    Please try again later.
                  </p>
                </div>
              ) : caseStudies && caseStudies.length > 0 ? (
                caseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.documentId}
                    caseStudy={caseStudy}
                  />
                ))
              ) : (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">No case studies available</p>
                  <p className="text-lg text-gray-300">
                    Check back soon for our latest case studies and success stories.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default CaseStudiesPageDesktop; 