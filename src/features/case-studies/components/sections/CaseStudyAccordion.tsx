'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { CaseStudyData, CaseStudyCollapsibleItem } from '../../types';

interface CollapsibleAccordionItemProps {
  item: CaseStudyCollapsibleItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const CollapsibleAccordionItem: React.FC<CollapsibleAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  index
}) => {
  return (
    <motion.div
      className="border-t border-b border-white/20 last:border-b-0 py-4 sm:py-6 lg:py-10"
      initial={false}
      animate={{ height: 'auto' }}
    >
      <motion.button
        className="w-full px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white/60 min-w-[2rem] sm:min-w-[2.5rem] lg:min-w-[3rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-tight">
              {item.title}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-xl sm:text-2xl font-light cursor-pointer flex-shrink-0 ml-2"
        >
          +
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-8 sm:pl-12 lg:pl-20">
          <div className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
            {renderRichTextContent(item.content)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CaseStudyAccordionProps {
  caseStudy: CaseStudyData;
}

const CaseStudyAccordion: React.FC<CaseStudyAccordionProps> = ({ caseStudy }) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemToggle = (itemId: number) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  if (!caseStudy.collapsibleList || caseStudy.collapsibleList.length === 0) return null;

  return (
    <motion.div
      className="mt-8 sm:mt-12 lg:mt-16 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="overflow-hidden">
        {caseStudy.collapsibleList.map((item, index) => (
          <CollapsibleAccordionItem
            key={index}
            item={item}
            isOpen={openItemId === index}
            onToggle={() => handleItemToggle(index)}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CaseStudyAccordion;
