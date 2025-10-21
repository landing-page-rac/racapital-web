import React from 'react';
import { motion } from 'framer-motion';
import { InsightData } from '../../types';

interface InsightServiceProps {
  insight: InsightData;
}

const InsightService: React.FC<InsightServiceProps> = ({ insight }) => {
  if (!insight.services || insight.services.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">
        <div className="text-white text-sm md:text-lg font-medium">Services</div>
        {insight.services.map((service) => (
          <div
            key={service.documentId}
            className="px-2 py-1 md:px-4 md:py-2 border border-[#1763F7] text-[#1763F7] rounded text-xs md:text-base"
          >
            {service.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InsightService;
