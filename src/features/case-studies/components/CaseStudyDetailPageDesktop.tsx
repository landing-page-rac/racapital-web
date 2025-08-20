'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { CaseStudyData } from '../types';
import {
  CaseStudyHeader,
  CaseStudyMainImage,
  CaseStudyService,
  CaseStudyContent,
  CaseStudyAdditionalImage,
  CaseStudyAccordion,
  CaseStudyQuote,
  CaseStudyAttachment
} from './sections';

interface CaseStudyDetailPageDesktopProps {
  caseStudy: CaseStudyData;
}

const CaseStudyDetailPageDesktop: React.FC<CaseStudyDetailPageDesktopProps> = ({ caseStudy }) => {
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
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <CaseStudyHeader caseStudy={caseStudy} />
            <CaseStudyMainImage caseStudy={caseStudy} />
            <CaseStudyService caseStudy={caseStudy} />
            <CaseStudyContent caseStudy={caseStudy} />
            <CaseStudyAdditionalImage caseStudy={caseStudy} />
            <CaseStudyAccordion caseStudy={caseStudy} />
            <CaseStudyQuote caseStudy={caseStudy} />
            <CaseStudyAttachment caseStudy={caseStudy} />
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default CaseStudyDetailPageDesktop;
