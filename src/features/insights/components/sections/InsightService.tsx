import React from 'react';
import { motion } from 'framer-motion';
import { InsightData } from '../../types';

interface InsightServiceProps {
  insight: InsightData;
}

const InsightService: React.FC<InsightServiceProps> = ({ insight }) => {
  if (!insight.service || !insight.service.name) {
    return null;
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <div className="text-white text-lg font-medium">Services</div>
        <div className="px-4 py-2 border border-[#1763F7] text-[#1763F7] rounded">
          {insight.service.name}
        </div>
      </div>
    </motion.div>
  );
};

export default InsightService;
