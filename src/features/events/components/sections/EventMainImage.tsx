import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EventData } from '../../types';

interface EventMainImageProps {
  event: EventData;
}

const EventMainImage: React.FC<EventMainImageProps> = ({ event }) => {
  if (!event.mainImage) {
    return null;
  }

  return (
    <motion.div
      className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="relative w-full h-96 md:h-[350px]">
        <Image
          src={event.mainImage.image.url}
          alt={event.mainImage.alternativeText || event.title}
          fill
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  );
};

export default EventMainImage;
