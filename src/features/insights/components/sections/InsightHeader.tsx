import React from 'react';
import { motion } from 'framer-motion';
import { InsightData } from '../../types';

interface InsightHeaderProps {
  insight: InsightData;
}

const InsightHeader: React.FC<InsightHeaderProps> = ({ insight }) => {
  return (
    <>
      {/* INSIGHTS Label */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-2xl uppercase tracking-widest text-blue-300 font-medium">
          PERSPECTIVE
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
          {insight.title}
        </h1>
      </motion.div>
    </>
  );
};

export default InsightHeader;
