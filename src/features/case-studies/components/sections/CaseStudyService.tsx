'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyData } from '../../types';

interface CaseStudyServiceProps {
  caseStudy: CaseStudyData;
}

const CaseStudyService: React.FC<CaseStudyServiceProps> = ({ caseStudy }) => {
  if (!caseStudy.service || !caseStudy.service.name) return null;

  return (
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
  );
};

export default CaseStudyService;
