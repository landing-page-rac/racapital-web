import { useMemo } from 'react';
import { StaticImageData } from 'next/image';
import event1 from '../../landing/assets/event-1.png';
import event2 from '../../landing/assets/event-2.png';

export interface Event {
  id: string;
  type: string;
  title: string;
  location: string;
  date: string;
  image: StaticImageData;
}

export const useEventsData = () => {
  const events = useMemo<Event[]>(() => [
    {
      id: '1',
      type: 'EVENT',
      title: 'Advancing Corporate Stewardship: Best Practices for ESG Integration',
      location: 'JAKARTA',
      date: '1 FEBRUARY 2022',
      image: event1,
    },
    {
      id: '2',
      type: 'EVENT',
      title: 'Strategic Agility in the Digital Era: Driving Growth through Innovation',
      location: 'SINGAPORE',
      date: '15 MARCH 2022',
      image: event2,
    },
    {
      id: '3',
      type: 'EVENT',
      title: 'Sustainable Finance Summit: Building Resilient Portfolios',
      location: 'HONG KONG',
      date: '22 APRIL 2022',
      image: event1,
    },
    {
      id: '4',
      type: 'EVENT',
      title: 'Digital Transformation in Capital Markets',
      location: 'TOKYO',
      date: '10 MAY 2022',
      image: event2,
    },
    {
      id: '5',
      type: 'EVENT',
      title: 'Future of Investment: AI and Machine Learning in Finance',
      location: 'SYDNEY',
      date: '28 JUNE 2022',
      image: event1,
    },
  ], []);

  return { events };
}; 