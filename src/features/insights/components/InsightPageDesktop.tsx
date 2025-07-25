import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import { useInsightsData } from '../hooks/useInsightsData';
import InsightListCard from './InsightListCard';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';

const InsightPageDesktop: React.FC = () => {
  const { navItems } = useLandingPageData();
  const { insights } = useInsightsData();

  console.log('Insights data:', insights);

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
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

        <main className="relative z-10 pt-5">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Insights
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Discover our latest thoughts and perspectives on market trends, investment strategies, and industry developments.
              </p>
            </motion.div>

            <motion.div
              className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {insights && insights.length > 0 ? (
                insights.map((insight) => (
                  <InsightListCard
                    key={insight.id}
                    image={insight.image}
                    title={insight.title}
                    linkText={insight.linkText}
                    linkHref={insight.linkHref}
                  />
                ))
              ) : (
                <div className="text-center text-gray-200 col-span-full">
                  <p className="text-2xl mb-4">No insights available</p>
                  <p className="text-lg text-gray-300">
                    Check back soon for our latest insights and analysis.
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

export default InsightPageDesktop; 