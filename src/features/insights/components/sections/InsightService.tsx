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
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-white text-lg font-medium">Services</div>
        {insight.services.map((service) => (
          <div
            key={service.documentId}
            className="px-4 py-2 border border-[#1763F7] text-[#1763F7] rounded"
          >
            {service.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InsightService;
