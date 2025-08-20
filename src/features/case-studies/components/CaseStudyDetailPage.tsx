'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { CaseStudyData } from '../types';
import SimpleCache from '@/shared/utils/simpleCache';
import { CaseStudiesResponse } from '../types';
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

interface CaseStudyDetailPageProps {
  documentId: string;
}

const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ documentId }) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCaseStudy = () => {
      try {
        setIsLoading(true);

        // Get cached case studies data
        const cachedData = SimpleCache.get<CaseStudiesResponse>('case-studies');

        if (!cachedData) {
          setError(new Error('Case study data not found in cache'));
          setIsLoading(false);
          return;
        }

        // Find the specific case study by documentId
        const foundCaseStudy = cachedData.data.find(
          (cs) => cs.documentId === documentId
        );

        if (!foundCaseStudy) {
          setError(new Error('Case study not found'));
          setIsLoading(false);
          return;
        }

        setCaseStudy(foundCaseStudy);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <Navbar navItems={NAV_ITEMS} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Loading case study...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <Navbar navItems={NAV_ITEMS} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Case study not found</p>
              <p className="text-lg text-gray-300">
                The case study you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

export default CaseStudyDetailPage;
