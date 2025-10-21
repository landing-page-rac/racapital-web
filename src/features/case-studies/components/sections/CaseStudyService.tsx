'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyData } from '../../types';

interface CaseStudyServiceProps {
  caseStudy: CaseStudyData;
}

const CaseStudyService: React.FC<CaseStudyServiceProps> = ({ caseStudy }) => {
  if (!caseStudy.services || caseStudy.services.length === 0) return null;

  return (
    <motion.div
      className="flex items-center gap-2 md:gap-5 mb-6 md:mb-8 flex-wrap"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="text-sm md:text-xl text-blue-300 font-medium">
        Services
      </div>
      {caseStudy.services.map((service) => (
        <div key={service.documentId} className="inline-block border border-blue-500 px-2 py-1 md:px-4 md:py-2">
          <span className="text-white font-medium text-xs md:text-base">
            {service.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default CaseStudyService;
