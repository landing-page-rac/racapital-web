'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import EventCardEnhanced from './EventCardEnhanced';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { EventData } from '../types';

interface EventsPageDesktopProps {
  events: EventData[] | null;
  isLoading: boolean;
  error: Error | null;
}

const EventsPageDesktop: React.FC<EventsPageDesktopProps> = ({ events, isLoading, error }) => {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
        <Navbar navItems={NAV_ITEMS} />
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={superGraphic}
            alt="Background Graphic"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/30 to-[#051F42]/60"></div>
        </motion.div>

        <main className="relative z-10 pt-5">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Events
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Join us at our upcoming events and discover insights from industry leaders, networking opportunities, and the latest developments in investment management.
              </p>
            </motion.div>

            {/* Events List */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isLoading ? (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">Loading events...</p>
                </div>
              ) : error ? (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">Error loading events</p>
                  <p className="text-lg text-gray-300">
                    Please try again later.
                  </p>
                </div>
              ) : events && events.length > 0 ? (
                events.map((event, index) => (
                  <motion.div
                    key={event.documentId}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventCardEnhanced
                      event={event}
                      isReversed={index % 2 !== 0}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-200">
                  <p className="text-2xl mb-4">No events available</p>
                  <p className="text-lg text-gray-300">
                    Check back soon for our upcoming events and activities.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default EventsPageDesktop; 