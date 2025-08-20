'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import EventCardMobile from './EventCardMobile';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { EventData } from '../types';

interface EventsPageMobileProps {
  events: EventData[] | null;
  isLoading: boolean;
  error: Error | null;
}

const EventsPageMobile: React.FC<EventsPageMobileProps> = ({ events, isLoading, error }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const eventsListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const eventCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
      <Navbar navItems={NAV_ITEMS} />

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/50 to-[#051F42]/80"></div>
      </div>

      <main className="relative z-10 pt-2">
        <div className="px-4 py-6">
          {/* Header Section */}
          <motion.div
            className="text-center mb-6"
            variants={headerVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Events
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-200 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join us at our upcoming events and discover insights from industry leaders, networking opportunities, and the latest developments in investment management.
            </motion.p>
          </motion.div>

          {/* Events List */}
          <motion.div
            className="space-y-6"
            variants={eventsListVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <motion.div
                className="text-center py-12"
                variants={emptyStateVariants}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg text-gray-200">Loading events...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center py-12"
                variants={emptyStateVariants}
              >
                <p className="text-lg text-red-200 mb-2">Error loading events</p>
                <p className="text-sm text-gray-300">Please try again later.</p>
              </motion.div>
            ) : events && events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event.documentId}
                  variants={eventCardVariants}
                >
                  <EventCardMobile event={event} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-12"
                variants={emptyStateVariants}
              >
                <p className="text-lg text-gray-200 mb-2">No events available</p>
                <p className="text-sm text-gray-300">
                  Check back soon for our upcoming events and activities.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default EventsPageMobile; 