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

interface CaseStudiesPageMobileProps {
  caseStudies: CaseStudyData[];
  isLoading: boolean;
  error: Error | null;
}

const CaseStudiesPageMobile: React.FC<CaseStudiesPageMobileProps> = ({
  caseStudies,
  isLoading,
  error
}) => {

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
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/50 to-[#051F42]/80"></div>
        </motion.div>

        <main className="relative z-10 pt-4">
          <div className="px-4 py-8">
            {/* Header Section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Case Studies
              </h1>
              <p className="text-base sm:text-lg text-gray-200 max-w-md mx-auto leading-relaxed">
                Explore our success stories and learn how we&apos;ve helped our clients achieve their strategic objectives and drive sustainable growth.
              </p>
            </motion.div>

            {/* Case Studies Grid */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isLoading ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="text-gray-200 mb-4">
                    <p className="text-xl font-semibold mb-2">Loading case studies...</p>
                  </div>
                </motion.div>
              ) : error ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="text-gray-200 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-xl font-semibold mb-2">Error loading case studies</p>
                    <p className="text-base text-gray-300">
                      Please try again later.
                    </p>
                  </div>
                </motion.div>
              ) : caseStudies && caseStudies.length > 0 ? (
                caseStudies.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.documentId}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg bg-[#0a2342] group cursor-pointer">
                      {/* Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={caseStudy.image.image.url}
                          alt={caseStudy.image.alternativeText || caseStudy.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="space-y-2">
                          <div className="text-xs uppercase tracking-widest text-blue-300 font-medium">
                            Case Study
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                            {caseStudy.title}
                          </h3>
                          <div className="text-white text-sm font-medium flex items-center group-hover:text-blue-300 transition-colors">
                            Explore Approaches
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="text-gray-200 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xl font-semibold mb-2">No case studies available</p>
                    <p className="text-base text-gray-300">
                      Check back soon for our latest case studies and success stories.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Bottom Spacing */}
            <div className="h-8"></div>
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default CaseStudiesPageMobile; 