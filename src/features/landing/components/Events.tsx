'use client'
import React, { useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#041E42] p-16 relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Scroll left"
      >
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Scroll right"
      >
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-2 py-4 scrollbar-hide items-center snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
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
