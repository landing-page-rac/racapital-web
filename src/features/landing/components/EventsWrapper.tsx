'use client';

import Events from './Events';
import EventsMobile from './EventsMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';
import { LandingPageData, Event, FeaturedEvent } from '../types';

interface EventsWrapperProps {
  data: LandingPageData | null;
  isLoading: boolean;
  error: Error | null;
}

// Map API event data to Event type
const mapApiEventsToEvents = (apiEvents: FeaturedEvent[]): Event[] => {
  return apiEvents.map((event) => ({
    documentId: event.documentId,
    title: event.title,
    date: event.date,
    image: event.image.image.url, // Extract URL from nested image object
    location: event.location,
  }));
};

const EventsWrapper: React.FC<EventsWrapperProps> = ({ data }) => {
  const isMobile = useResponsiveHero();

  // Convert API events to display events
  const events = data?.featuredEvents ? mapApiEventsToEvents(data.featuredEvents) : [];

  if (isMobile) {
    return <EventsMobile events={events} />;
  }

  return <Events events={events} />;
};

export default EventsWrapper;