'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import Container from '../../../shared/components/ui/Container';
import InsightListCard from './InsightListCard';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { ContactSectionMobile } from '@/shared/components';
import { FooterMobile } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { InsightData } from '../types';

interface InsightPageMobileProps {
  insights: InsightData[];
  isLoading: boolean;
  error: Error | null;
}

const InsightPageMobile: React.FC<InsightPageMobileProps> = ({
  insights,
  isLoading,
  error
}) => {

  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden" >
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
              Insights
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
              Discover our latest thoughts and perspectives on market trends, investment strategies, and industry developments.
            </p>
          </motion.div>

          {/* Mobile-optimized content grid */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isLoading ? (
              <motion.div
                className="text-center text-gray-200 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">Loading insights...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center text-gray-200 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">Error loading insights</p>
                <p className="text-sm text-gray-300 mt-2">
                  Please try again later.
                </p>
              </motion.div>
            ) : insights && insights.length > 0 ? (
              insights.map((insight) => (
                <motion.div
                  key={insight.documentId}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <InsightListCard
                    insight={insight}
                    linkText="Read more"
                    linkHref={`/insights/${insight.documentId}`}
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
                <p className="text-lg">No insights available</p>
                <p className="text-sm text-gray-300 mt-2">
                  Check back soon for our latest insights and analysis.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
      <ContactSectionMobile />
      <FooterMobile />
    </section >
  );
};

export default InsightPageMobile; 