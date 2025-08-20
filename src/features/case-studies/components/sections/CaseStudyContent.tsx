'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { CaseStudyData } from '../../types';

interface CaseStudyContentProps {
  caseStudy: CaseStudyData;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  return (
    <motion.div
      className="max-w-none w-2/3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {renderRichTextContent(caseStudy.content)}
    </motion.div>
  );
};

export default CaseStudyContent;
