'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { InsightCollapsibleItem, InsightData } from '../../types';

interface CollapsibleAccordionItemProps {
  item: InsightCollapsibleItem;
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
      className="border-t border-b border-white/20 last:border-b-0 py-10"
      initial={false}
      animate={{ height: 'auto' }}
    >
      <motion.button
        className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-bold text-white/60 min-w-[3rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl font-light cursor-pointer"
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
        <div className="px-6 pb-6 pl-20">
          <div className="text-white/80 text-lg leading-relaxed">
            {renderRichTextContent(item.content)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface InsightAccordionProps {
  insight: InsightData;
}

const InsightAccordion: React.FC<InsightAccordionProps> = ({ insight }) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemToggle = (itemId: number) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  if (!insight.collapsibleList || insight.collapsibleList.length === 0) return null;

  return (
    <motion.div
      className="mt-16 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="overflow-hidden">
        {insight.collapsibleList.map((item, index) => (
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

export default InsightAccordion;
