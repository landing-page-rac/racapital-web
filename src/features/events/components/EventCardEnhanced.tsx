import Image from 'next/image';
import { motion } from 'framer-motion';
import { Event } from '../hooks/useEventsData';

interface EventCardEnhancedProps {
  event: Event;
  isReversed?: boolean;
}

const EventCardEnhanced: React.FC<EventCardEnhancedProps> = ({ event, isReversed = false }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} max-w-4xl mx-auto`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image Section */}
      <motion.div
        className="relative w-1/2 h-80 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="w-1/2 p-8 flex flex-col justify-center bg-white"
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="space-y-4">
          {/* Event Label */}
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="bg-[#041E42] text-white px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
              {event.type}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl font-bold text-[#041E42] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {event.title}
          </motion.h3>

          {/* Date and Location */}
          <motion.div
            className="space-y-2 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{event.date}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{event.location}</span>
            </motion.div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              className="bg-[#0C52E6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#041E42] transition-colors duration-200 flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(12, 82, 230, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventCardEnhanced; 