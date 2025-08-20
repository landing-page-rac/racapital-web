import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InsightData } from '../../types';

interface InsightAdditionalImageProps {
  insight: InsightData;
}

const InsightAdditionalImage: React.FC<InsightAdditionalImageProps> = ({ insight }) => {
  if (!insight.image || !insight.image.alternativeText) {
    return null;
  }

  return (
    <motion.div
      className="mb-8 flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
    >
      <div className="w-1/3">
        <div className="relative w-full h-64">
          <Image
            src={insight.image.image.url}
            alt={insight.image.alternativeText}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="mt-4 text-center text-white/80 text-sm">
          {insight.image.alternativeText}
        </div>
      </div>
    </motion.div>
  );
};

export default InsightAdditionalImage;
