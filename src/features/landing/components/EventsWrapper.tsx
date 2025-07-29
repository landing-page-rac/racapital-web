'use client';

import Events from './Events';
import EventsMobile from './EventsMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

const EventsWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <EventsMobile />;
  }

  return <Events />;
};

export default EventsWrapper; 