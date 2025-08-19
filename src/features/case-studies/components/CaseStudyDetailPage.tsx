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

const CollapsibleAccordionItem: React.FC<{
  item: import('../types').CaseStudyCollapsibleItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, isOpen, onToggle, index }) => {
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
              {item.title}
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
          <div className="text-white/80 text-lg leading-relaxed">
            {renderRichTextContent(item.content)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ documentId }) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemToggle = (itemId: number) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

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
            {/* CASE STUDY Label */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-2xl uppercase tracking-widest text-blue-300 font-medium">
                CASE STUDY
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-xl md:text-4xl text-white">
                {caseStudy.title}
              </h1>
            </motion.div>

            {/* Main Image - Full Width */}
            {caseStudy.mainImage && (
              <motion.div
                className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-full h-96 md:h-[350px]">
                  <Image
                    src={caseStudy.mainImage.image.url}
                    alt={caseStudy.mainImage.alternativeText || caseStudy.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            )}

            {/* Service Section */}
            {caseStudy.service && (
              <motion.div
                className="flex items-center gap-5 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-xl text-blue-300 font-medium">
                  Services
                </div>
                <div className="inline-block border border-blue-500 px-4 py-2">
                  <span className="text-white font-medium">
                    {caseStudy.service.name}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className="max-w-none w-2/3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {renderRichTextContent(caseStudy.content)}
            </motion.div>

            {/* Additional Image */}
            {caseStudy.image && (
              <motion.div
                className="mt-12 flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="relative w-2/4 h-80">
                  <Image
                    src={caseStudy.image.image.url}
                    alt={caseStudy.image.alternativeText || caseStudy.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                {caseStudy.image.alternativeText && (
                  <div className="mt-4 text-center text-gray-300 text-sm italic">
                    {caseStudy.image.alternativeText}
                  </div>
                )}
              </motion.div>
            )}

            {/* Collapsible List Accordion */}
            {caseStudy.collapsibleList && caseStudy.collapsibleList.length > 0 && (
              <motion.div
                className="mt-16 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="overflow-hidden">
                  {caseStudy.collapsibleList.map((item, index) => (
                    <CollapsibleAccordionItem
                      key={index}
                      item={item}
                      isOpen={openItemId === index}
                      onToggle={() => handleItemToggle(index)}
                      index={index}
                    />
                  ))}
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
