'use client'
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { EventData } from '../types';

interface ParallaxEventsListProps {
  events: EventData[];
}

interface ParallaxEventCardProps {
  event: EventData;
  isReversed: boolean;
}

const ParallaxEventCard: React.FC<ParallaxEventCardProps> = ({ event, isReversed }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image moves slower than the card (parallax effect)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.div
      ref={ref}
      className={` rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} max-w-4xl mx-auto`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image Section with Parallax */}
      <div className="relative w-1/2 h-80 overflow-hidden">
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
          }}
          className="relative w-full h-full"
        >
          <Image
            src={event.image.image.url}
            alt={event.image.alternativeText || event.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <motion.div
        className="w-1/2 p-8 flex flex-col justify-center "
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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
              EVENT
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
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{event.location}</span>
            </div>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ParallaxEventsList: React.FC<ParallaxEventsListProps> = ({ events }) => {
  return (
    <div>
      {/* Title Section */}
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Events
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join us at our upcoming events and discover perspective from industry leaders, networking opportunities, and the latest developments in investment management.
          </motion.p>
        </div>
      </motion.div>

      {/* Events List with Parallax */}
      <div className="relative">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={event.documentId}
              className="relative py-16 overflow-hidden"
              style={{
                background: index % 2 === 0 ? '#f8fafc' : 'white',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ParallaxEventCard event={event} isReversed={!isEven} />
              </div>

              {/* Subtle Background Decoration */}
              <motion.div
                className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 opacity-5 pointer-events-none`}
                style={{
                  background: `radial-gradient(circle, #041E42 0%, transparent 70%)`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxEventsList; 