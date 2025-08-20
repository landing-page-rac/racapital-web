import React from 'react';
import { motion } from 'framer-motion';
import { InsightData } from '../../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface InsightContentProps {
  insight: InsightData;
}

const InsightContent: React.FC<InsightContentProps> = ({ insight }) => {
  return (
    <motion.div
      className="max-w-none w-2/3 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {renderRichTextContent(insight.content)}
    </motion.div>
  );
};

export default InsightContent;
