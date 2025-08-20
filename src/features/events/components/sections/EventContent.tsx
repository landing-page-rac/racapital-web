import React from 'react';
import { motion } from 'framer-motion';
import { EventData } from '../../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface EventContentProps {
  event: EventData;
}

const EventContent: React.FC<EventContentProps> = ({ event }) => {
  return (
    <motion.div
      className="max-w-none w-2/3 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {renderRichTextContent(event.content)}
    </motion.div>
  );
};

export default EventContent;
