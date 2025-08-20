'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CaseStudyData } from '../../types';

interface CaseStudyAdditionalImageProps {
  caseStudy: CaseStudyData;
}

const CaseStudyAdditionalImage: React.FC<CaseStudyAdditionalImageProps> = ({ caseStudy }) => {
  if (!caseStudy.image || !caseStudy.image.image || !caseStudy.image.image.url) return null;

  return (
    <motion.div
      className="mt-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="relative w-2/4 h-80">
        <Image
          src={caseStudy.image.image.url}
          alt={caseStudy.image.alternativeText || caseStudy.title}
          fill
          className="object-cover object-center"
        />
      </div>
      {caseStudy.image.alternativeText && (
        <div className="mt-4 text-center text-gray-300 text-sm italic">
          {caseStudy.image.alternativeText}
        </div>
      )}
    </motion.div>
  );
};

export default CaseStudyAdditionalImage;
