'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { useEventsData } from '../hooks/useEventsData';
import EventCardMobile from './EventCardMobile';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';

const EventsPageMobile: React.FC = () => {
  const { events } = useEventsData();

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
            className="space-y-6 mx-4"
            variants={eventsListVariants}
          >
            {events && events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={eventCardVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  <EventCardMobile event={event} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-12"
                variants={emptyStateVariants}
              >
                <div className="text-gray-200 mb-4">
                  <motion.svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </motion.svg>
                  <motion.p
                    className="text-xl font-semibold mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    No events available
                  </motion.p>
                  <motion.p
                    className="text-base text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Check back soon for our upcoming events and activities.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-8"></div>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </div>

  );
};

export default EventsPageMobile; 