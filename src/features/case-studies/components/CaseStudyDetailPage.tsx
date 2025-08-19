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
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import SimpleCache from '@/shared/utils/simpleCache';
import { CaseStudiesResponse } from '../types';

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
                The case study you're looking for doesn't exist or has been removed.
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
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
            {/* Header Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs uppercase tracking-widest text-blue-300 font-medium mb-4">
                Case Study
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {caseStudy.title}
              </h1>
            </motion.div>

            {/* Main Image */}
            {caseStudy.mainImage && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={caseStudy.mainImage.image.url}
                    alt={caseStudy.mainImage.alternativeText || caseStudy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className="prose prose-lg prose-invert max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {renderRichTextContent(caseStudy.content)}
            </motion.div>

            {/* Quote Section */}
            {caseStudy.quote && (
              <motion.div
                className="mt-16 p-8 bg-white/10 rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white mb-4">
                    {renderRichTextContent(caseStudy.quote)}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Collapsible List */}
            {caseStudy.collapsibleList && caseStudy.collapsibleList.length > 0 && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Key Insights
                </h2>
                <div className="space-y-4">
                  {caseStudy.collapsibleList.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-lg p-6 border border-white/20"
                    >
                      <div className="prose prose-invert max-w-none">
                        {renderRichTextContent(item.content)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Service Information */}
            {caseStudy.service && (
              <motion.div
                className="mt-16 p-8 bg-white/10 rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Service: {caseStudy.service.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  {renderRichTextContent(caseStudy.service.description)}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
