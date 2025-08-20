'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyData } from '../../types';

interface CaseStudyAttachmentProps {
  caseStudy: CaseStudyData;
}

const CaseStudyAttachment: React.FC<CaseStudyAttachmentProps> = ({ caseStudy }) => {
  if (!caseStudy.attachment || !caseStudy.attachment.media || !caseStudy.attachment.media.url) return null;

  return (
    <motion.section
      className="bg-white py-16 px-4 -mx-4 sm:-mx-6 lg:-mx-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.button
          className="border border-[#0D52E5] text-[#0D52E5] px-8 py-4 hover:bg-[#0D52E5] hover:text-white transition-colors duration-200 cursor-pointer text-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (caseStudy.attachment?.media?.url) {
              window.open(caseStudy.attachment.media.url, '_blank');
            }
          }}
        >
          Download Summary File
        </motion.button>
      </div>
    </motion.section>
  );
};

export default CaseStudyAttachment;
