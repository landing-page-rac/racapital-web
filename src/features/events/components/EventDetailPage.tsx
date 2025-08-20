'use client';

import React, { useState, useEffect } from 'react';
import EventDetailPageMobile from './EventDetailPageMobile';
import EventDetailPageDesktop from './EventDetailPageDesktop';
import { EventData } from '../types';
import SimpleCache from '@/shared/utils/simpleCache';
import { EventsResponse } from '../types';
import { LandingPageResponse, FeaturedEvent } from '../../landing/types';

// Custom hook for responsive rendering
const useResponsiveEventDetail = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

interface EventDetailPageProps {
  documentId: string;
}

// Function to convert FeaturedEvent to EventData
const convertFeaturedEventToEventData = (featuredEvent: FeaturedEvent): EventData => {
  return {
    documentId: featuredEvent.documentId,
    title: featuredEvent.title,
    content: featuredEvent.content,
    quote: featuredEvent.quote,
    location: featuredEvent.location,
    date: featuredEvent.date,
    mainImage: {
      alternativeText: featuredEvent.image.alternativeText,
      image: {
        documentId: featuredEvent.image.image.documentId,
        name: featuredEvent.image.image.name,
        width: featuredEvent.image.image.width,
        height: featuredEvent.image.image.height,
        url: featuredEvent.image.image.url,
      }
    },
    service: {
      documentId: '', // Not available in featured event
      name: '', // Not available in featured event
      content: [] // Not available in featured event
    },
    image: {
      alternativeText: featuredEvent.image.alternativeText,
      image: {
        documentId: featuredEvent.image.image.documentId,
        name: featuredEvent.image.image.name,
        width: featuredEvent.image.image.width,
        height: featuredEvent.image.image.height,
        url: featuredEvent.image.image.url,
      }
    },
    collapsibleList: [], // Not available in featured event
    attachment: {
      alternativeText: '',
      media: {
        documentId: '',
        name: '',
        width: 0,
        height: 0,
        url: '',
      }
    }
  };
};

// Function to determine the source page
const getSourcePage = (): 'landing' | 'events' | 'unknown' => {
  if (typeof document === 'undefined') return 'unknown';

  const referrer = document.referrer;
  const currentHost = window.location.host;

  // If referrer is from the same domain
  if (referrer && referrer.includes(currentHost)) {
    // Check if user came from landing page
    if (referrer.includes('/') && !referrer.includes('/events') && !referrer.includes('/insights') && !referrer.includes('/case-studies')) {
      return 'landing';
    }
    // Check if user came from events page
    if (referrer.includes('/events')) {
      return 'events';
    }
  }

  return 'unknown';
};

const EventDetailPage: React.FC<EventDetailPageProps> = ({ documentId }) => {
  const isMobile = useResponsiveEventDetail();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = () => {
      try {
        setIsLoading(true);

        const sourcePage = getSourcePage();

        // Strategy 1: If user came from landing page, check landing page cache first
        if (sourcePage === 'landing') {
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');

          if (landingPageCache && landingPageCache.data.featuredEvents) {
            const foundFeaturedEvent = landingPageCache.data.featuredEvents.find(
              (evt) => evt.documentId === documentId
            );

            if (foundFeaturedEvent) {
              const convertedEvent = convertFeaturedEventToEventData(foundFeaturedEvent);
              setEvent(convertedEvent);
              setIsLoading(false);
              return;
            }
          }

          // If not found in landing page cache, fall back to events cache
          const eventsCache = SimpleCache.get<EventsResponse>('events');
          if (eventsCache) {
            const foundEvent = eventsCache.data.find(
              (evt) => evt.documentId === documentId
            );
            if (foundEvent) {
              setEvent(foundEvent);
              setIsLoading(false);
              return;
            }
          }
        }

        // Strategy 2: If user came from events page or unknown source, check events cache first
        else {
          const eventsCache = SimpleCache.get<EventsResponse>('events');

          if (eventsCache) {
            const foundEvent = eventsCache.data.find(
              (evt) => evt.documentId === documentId
            );
            if (foundEvent) {
              setEvent(foundEvent);
              setIsLoading(false);
              return;
            }
          }

          // If not found in events cache, try landing page cache as fallback
          const landingPageCache = SimpleCache.get<LandingPageResponse>('landing-page');
          if (landingPageCache && landingPageCache.data.featuredEvents) {
            const foundFeaturedEvent = landingPageCache.data.featuredEvents.find(
              (evt) => evt.documentId === documentId
            );
            if (foundFeaturedEvent) {
              const convertedEvent = convertFeaturedEventToEventData(foundFeaturedEvent);
              setEvent(convertedEvent);
              setIsLoading(false);
              return;
            }
          }
        }

        // If we get here, the event was not found in any cache
        setError(new Error('Event not found in cache'));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
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
      {isMobile ? (
        <EventDetailPageMobile event={event} />
      ) : (
        <EventDetailPageDesktop event={event} />
      )}
    </div>
  );
};

export default EventDetailPage;
