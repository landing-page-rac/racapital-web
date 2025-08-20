import React from 'react';
import { motion } from 'framer-motion';
import { EventData } from '../../types';

interface EventHeaderProps {
  event: EventData;
}

const EventHeader: React.FC<EventHeaderProps> = ({ event }) => {
  return (
    <>
      {/* EVENTS Label */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-2xl uppercase tracking-widest text-blue-300 font-medium">
          EVENTS
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-xl md:text-4xl text-white">
          {event.title}
        </h1>
      </motion.div>

      {/* Event Details */}
      {(event.date || event.location) && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-8 text-white/80">
            {event.date && (
              <div className="flex items-center">
                <span className="text-blue-300 mr-3 text-lg">📅</span>
                <div>
                  <div className="text-blue-300 text-sm uppercase tracking-wider mb-1">
                    Date
                  </div>
                  <div className="text-white font-medium">
                    {event.date}
                  </div>
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-center">
                <span className="text-blue-300 mr-3 text-lg">📍</span>
                <div>
                  <div className="text-blue-300 text-sm uppercase tracking-wider mb-1">
                    Location
                  </div>
                  <div className="text-white font-medium">
                    {event.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EventHeader;
