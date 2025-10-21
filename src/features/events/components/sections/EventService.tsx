import React from 'react';
import { motion } from 'framer-motion';
import { EventData } from '../../types';

interface EventServiceProps {
  event: EventData;
}

const EventService: React.FC<EventServiceProps> = ({ event }) => {
  if (!event.services || event.services.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-white text-lg font-medium">Services</div>
        {event.services.map((service) => (
          <div
            key={service.documentId}
            className="px-4 py-2 border border-[#1763F7] text-[#1763F7] rounded"
          >
            {service.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventService;
