'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyData } from '../../types';

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyData;
}

const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({ caseStudy }) => {
  return (
    <>
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
    </>
  );
};

export default CaseStudyHeader;
