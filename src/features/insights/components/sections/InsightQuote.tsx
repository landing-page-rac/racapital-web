'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { InsightData } from '../../types';
import superGraphicWhite from '../../../landing/assets/super-graphic-white.png';

interface InsightQuoteProps {
  insight: InsightData;
}

const InsightQuote: React.FC<InsightQuoteProps> = ({ insight }) => {
  if (!insight.quote || !Array.isArray(insight.quote) || insight.quote.length === 0) return null;

  return (
    <motion.section
      className="mt-16 bg-[#0D52E5] py-20 px-4 relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={superGraphicWhite.src}
          alt="Background Graphic"
          className="w-full h-full object-cover opacity-30"
          fill
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed">
          {renderRichTextContent(insight.quote)}
        </div>
      </div>
    </motion.section>
  );
};

export default InsightQuote;
