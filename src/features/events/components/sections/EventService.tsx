import React from 'react';
import { motion } from 'framer-motion';
import { EventData } from '../../types';

interface EventServiceProps {
  event: EventData;
}

const EventService: React.FC<EventServiceProps> = ({ event }) => {
  if (!event.service || !event.service.name) {
    return null;
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <div className="text-white text-lg font-medium">Services</div>
        <div className="px-4 py-2 border border-[#1763F7] text-[#1763F7] rounded">
          {event.service.name}
        </div>
      </div>
    </motion.div>
  );
};

export default EventService;
