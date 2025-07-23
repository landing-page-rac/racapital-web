'use client'
import React, { useEffect, useState } from 'react';
import EventCardEnhanced from './EventCardEnhanced';
import { Event } from '../hooks/useEventsData';

interface ParallaxEventsProps {
  events: Event[];
}

const ParallaxEvents: React.FC<ParallaxEventsProps> = ({ events }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Title Section */}
      <div className="text-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
            Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at industry events, conferences, and exclusive gatherings
            where we share insights and connect with the financial community.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="relative">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const parallaxSpeed = 0.3;
          const parallaxOffset = scrollY * parallaxSpeed * (isEven ? 1 : -1);

          return (
            <div
              key={event.id}
              className="relative py-16 overflow-hidden"
              style={{
                background: index % 2 === 0 ? '#f8fafc' : 'white',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`flex items-center justify-center transition-transform duration-75 ease-out`}
                  style={{
                    transform: `translateX(${parallaxOffset * 0.1}px)`,
                  }}
                >
                  <EventCardEnhanced event={event} isReversed={!isEven} />
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 opacity-5`}
                style={{
                  background: `radial-gradient(circle, #041E42 0%, transparent 70%)`,
                  transform: `translateY(${parallaxOffset * 0.05}px)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxEvents; 