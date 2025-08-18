'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import EventCardMobile from './EventCardMobile';
import { Event } from '../types';


interface EventsMobileProps {
  events: Event[];
  showMoreButton?: boolean;
}

const EventsMobile: React.FC<EventsMobileProps> = ({
  events,
  showMoreButton = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Minimum distance required for a swipe (in pixels)
  const MIN_SWIPE_DISTANCE = 50;

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(walk));

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (dragDistance < MIN_SWIPE_DISTANCE) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: activeIndex * (scrollContainerRef.current.offsetWidth),
          behavior: 'smooth'
        });
      }
      return;
    }

    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, events.length - 1)));

      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(walk));

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (dragDistance < MIN_SWIPE_DISTANCE) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: activeIndex * (scrollContainerRef.current.offsetWidth),
          behavior: 'smooth'
        });
      }
      return;
    }

    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, events.length - 1)));

      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, events.length - 1)));
    }
  };

  const goToCard = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextCard = () => {
    const next = (activeIndex + 1) % events.length;
    goToCard(next);
  };

  const prevCard = () => {
    const prev = (activeIndex - 1 + events.length) % events.length;
    goToCard(prev);
  };

  return (
    <section className="bg-[#041E42] py-12 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto overflow-hidden">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-blue-100 text-base leading-relaxed">
            Join us at our latest events and stay ahead of industry trends
          </p>
        </motion.div>

        {/* Scrollable Events Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              overscrollBehavior: 'contain'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onScroll={handleScroll}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
              div {
                overscroll-behavior: contain;
                -webkit-overflow-scrolling: touch;
              }
            `}</style>

            {events.map((event, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center overflow-hidden"
                style={{ minWidth: 'calc(100vw - 2rem)' }}
              >
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <EventCardMobile event={event} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-blue-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextCard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA Button */}
        {showMoreButton && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="mx-auto block px-10 py-4 border-2 border-white text-white text-xl rounded transition-colors hover:bg-white hover:text-[#1763F7] font-light hover:cursor-pointer">
              MORE EVENTS
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsMobile; 