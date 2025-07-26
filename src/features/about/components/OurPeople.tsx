'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import peopleImage from '../assets/people.png';
import FlagshipService from './FlagshipService';

interface Person {
  id: number;
  name: string;
  position: string;
  image: StaticImageData;
}

// Sample data - you can replace this with your actual data
const people: Person[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Chief Executive Officer",
    image: peopleImage
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Chief Financial Officer",
    image: peopleImage
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Chief Investment Officer",
    image: peopleImage
  },
  {
    id: 4,
    name: "Sarah Wilson",
    position: "Head of Operations",
    image: peopleImage
  },
  {
    id: 5,
    name: "David Brown",
    position: "Head of Strategy",
    image: peopleImage
  },
  {
    id: 6,
    name: "Lisa Davis",
    position: "Head of Client Relations",
    image: peopleImage
  }
];

const CARD_WIDTH = 240; // px - smaller cards
const CARD_GAP = 24; // px
const AUTO_PLAY_INTERVAL = 30; // 30ms for smoother animation
const SCROLL_INCREMENT = 1; // pixels per interval for smoother scrolling

const OurPeople: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const total = people.length;

  // Scroll to the card at the given index
  const scrollToIndex = (i: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: i * (CARD_WIDTH + CARD_GAP),
        behavior: 'smooth',
      });
    }
  };

  // Auto-play functionality with continuous scrolling
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      if (scrollRef.current) {
        const currentScrollLeft = scrollRef.current.scrollLeft;
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        // If we've reached the end, smoothly reset to beginning
        if (currentScrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollLeft = 0;
        } else {
          // Smooth continuous scroll
          scrollRef.current.scrollLeft += SCROLL_INCREMENT;
        }
      }
    }, AUTO_PLAY_INTERVAL);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      stopAutoPlay();
      setIsPlaying(false);

      // When pausing, smoothly scroll to the nearest card
      if (scrollRef.current) {
        const currentScrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = CARD_WIDTH + CARD_GAP;
        const nearestIndex = Math.round(currentScrollLeft / cardWidth);
        const targetScrollLeft = nearestIndex * cardWidth;

        // Smooth scroll to the nearest card
        scrollRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });
      }
    } else {
      startAutoPlay();
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Pause auto-play when hovering over cards
  useEffect(() => {
    if (hoveredIdx !== null && isPlaying) {
      stopAutoPlay();
    } else if (hoveredIdx === null && isPlaying) {
      startAutoPlay();
    }
  }, [hoveredIdx, isPlaying, startAutoPlay, stopAutoPlay]);

  // Navigation
  const handleNext = () => {
    const next = (activeIdx + 1) % total;
    setActiveIdx(next);
    scrollToIndex(next);
  };
  const handlePrev = () => {
    const prev = (activeIdx - 1 + total) % total;
    setActiveIdx(prev);
    scrollToIndex(prev);
  };

  // On scroll, update the active card to the one most centered
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const idx = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
      setActiveIdx(idx);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden py-20">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-20"
          priority
        />
      </motion.div>

      <FlagshipService />
      {/* Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our People
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Meet the dedicated team behind RAC&apos;s success, bringing together expertise and vision to drive value creation.
          </p>
        </motion.div>

        {/* Horizontal Scrollable Cards */}
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto gap-6 px-4 py-4 items-center ${isPlaying ? '' : 'snap-x snap-mandatory'}`}
          style={{
            scrollBehavior: isPlaying ? 'auto' : 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onScroll={handleScroll}
        >
          <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
          {people.map((person, index) => {
            const isZoomed = hoveredIdx === index;
            return (
              <div
                key={person.id}
                className={`flex-shrink-0 transition-all duration-300 mx-3 cursor-pointer ${isPlaying ? '' : 'snap-center'} ${isZoomed ? 'w-[260px] h-[350px] z-20' : 'w-[240px] h-[320px] z-10'}`}
                style={{ scrollSnapAlign: isPlaying ? 'none' : 'center' }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(index)}
                onBlur={() => setHoveredIdx(null)}
                tabIndex={0}
              >
                <div className="bg-transparent hover:bg-white transition-all duration-300 ease-in-out p-4 shadow-sm hover:shadow-lg h-full group">
                  {/* Image */}
                  <div className="relative w-full h-48 mb-4 overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Name and Position */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {person.name}
                    </h3>
                    <p className="text-gray-200 group-hover:text-gray-700 transition-colors duration-300 text-sm">
                      {person.position}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto mt-8 mb-8 px-4 text-center">
          <p className="text-base md:text-lg text-gray-200">
            Lorem Ipsum  is a seasoned financial strategist who studied Economics at the University of Indonesia and earned her MBA from Harvard Business School. With over 15 years’ experience advising multinational family offices, she drives RAC’s vision for sustainable value creation.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {/* Play/Pause Button */}
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlayPause}
            className="w-14 h-14 bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors rounded-xl"
          >
            {isPlaying ? (
              // Pause icon
              <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              // Play icon
              <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="w-14 h-14 bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors rounded-xl"
          >
            <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={handleNext}
            className="w-14 h-14 bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors rounded-xl"
          >
            <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurPeople; 