'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import { useCaseStudiesData } from '../hooks/useCaseStudiesData';
import CaseStudyCard from './CaseStudyCard';
import { ContactSectionMobile } from '@/shared/components';
import { FooterMobile } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import Container from '../../../shared/components/ui/Container';

const CaseStudiesPageMobile: React.FC = () => {
  const { navItems } = useLandingPageData();
  const { caseStudies } = useCaseStudiesData();

  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
      <Navbar navItems={navItems} />
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

      <Container maxWidth="7xl" className="relative z-10">
        <div className="px-4 pt-5 pb-16">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Case Studies
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
              Explore our success stories and learn how we&apos;ve helped our clients achieve their strategic objectives and drive sustainable growth.
            </p>
          </motion.div>

          {/* Mobile-optimized content grid */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CaseStudyCard
                    image={caseStudy.image}
                    title={caseStudy.title}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center text-gray-200 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">No case studies available</p>
                <p className="text-sm text-gray-300 mt-2">
                  Check back soon for our latest case studies and success stories.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
      <ContactSectionMobile />
      <FooterMobile />
    </section>
  );
};

export default CaseStudiesPageMobile; 