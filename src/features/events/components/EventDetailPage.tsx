'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { ContactSection } from '@/shared/components';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { EventData } from '../types';
import SimpleCache from '@/shared/utils/simpleCache';
import { EventsResponse } from '../types';
import {
  EventHeader,
  EventMainImage,
  EventService,
  EventContent,
  EventAdditionalImage,
  EventAccordion,
  EventQuote,
  EventAttachment
} from './sections';

interface EventDetailPageProps {
  documentId: string;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ documentId }) => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = () => {
      try {
        setIsLoading(true);

        // Get cached events data
        const cachedData = SimpleCache.get<EventsResponse>('events');

        if (!cachedData) {
          setError(new Error('Event data not found in cache'));
          setIsLoading(false);
          return;
        }

        // Find the specific event by documentId
        const foundEvent = cachedData.data.find(
          (evt) => evt.documentId === documentId
        );

        if (!foundEvent) {
          setError(new Error('Event not found'));
          setIsLoading(false);
          return;
        }

        setEvent(foundEvent);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <Navbar navItems={NAV_ITEMS} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Loading event...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
          <Navbar navItems={NAV_ITEMS} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-2xl mb-4">Event not found</p>
              <p className="text-lg text-gray-300">
                The event you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <EventHeader event={event} />
            <EventMainImage event={event} />
            <EventService event={event} />
            <EventContent event={event} />
            <EventAdditionalImage event={event} />
            <EventAccordion event={event} />
            <EventQuote event={event} />
            <EventAttachment event={event} />
          </div>
        </main>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default EventDetailPage;
