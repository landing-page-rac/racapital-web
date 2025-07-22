'use client'
import React from 'react';
import EventCard from './EventCard';
import { Event } from '../types';
import event1 from '../assets/event-1.png';
import event2 from '../assets/event-2.png';

// Dummy data for events
const dummyEvents: Event[] = [
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
    location: 'JAKARTA',
    date: '1 FEBRUARY 2022',
    image: event2,
  },
  {
    id: '3',
    type: 'EVENT',
    title: 'Sustainable Finance Summit: Building Resilient Portfolios',
    location: 'SINGAPORE',
    date: '15 MARCH 2022',
    image: event1,
  },
  {
    id: '4',
    type: 'EVENT',
    title: 'Digital Transformation in Capital Markets',
    location: 'HONG KONG',
    date: '22 APRIL 2022',
    image: event2,
  },
];

interface EventsProps {
  events?: Event[];
  showMoreButton?: boolean;
}

const Events: React.FC<EventsProps> = ({
  events = dummyEvents,
  showMoreButton = true
}) => {
  return (
    <section className="bg-[#041E42] p-16">
      <div className="flex overflow-x-auto gap-6 px-2 py-4 scrollbar-hide items-center snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
        {[...events, ...events].map((event, idx) => (
          <div
            key={idx}
            className="snap-center"
            style={{ scrollSnapAlign: 'center' }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {showMoreButton && (
        <div className="text-center">
          <button
            className="mx-auto block mt-10 px-10 py-4 border-2 border-white text-white text-xl rounded transition-colors hover:bg-white hover:text-[#1763F7] font-light hover:cursor-pointer"
          >
            MORE EVENTS
          </button>
        </div>
      )}
    </section>
  );
};

export default Events;
