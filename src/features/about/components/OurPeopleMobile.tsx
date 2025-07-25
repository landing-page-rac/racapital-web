'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import peopleImage from '../assets/people.png';
import Container from '../../../shared/components/ui/Container';

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

const OurPeopleMobile: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
    }, 3000); // 3 seconds per person
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      stopAutoPlay();
      setIsPlaying(false);
    } else {
      startAutoPlay();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + people.length) % people.length);
  };

  useEffect(() => {
    // Start auto-play on mount
    startAutoPlay();
    setIsPlaying(true);

    return () => {
      stopAutoPlay();
    };
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden py-16">
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

      <Container maxWidth="7xl" className="relative z-10">
        <div className="px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our People
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
              Meet the dedicated team behind RAC&apos;s success, bringing together expertise and vision to drive value creation.
            </p>
          </motion.div>

          {/* Mobile-optimized carousel */}
          <div className="relative">
            {/* Main Card */}
            <motion.div
              key={currentIndex}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 mx-auto max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image */}
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl">
                <Image
                  src={people[currentIndex].image}
                  alt={people[currentIndex].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Name and Position */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {people[currentIndex].name}
                </h3>
                <p className="text-gray-200 text-base">
                  {people[currentIndex].position}
                </p>
              </div>
            </motion.div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {people.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to person ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {/* Play/Pause Button */}
              <button
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlayPause}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  // Pause icon
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  // Play icon
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              <button
                aria-label="Previous"
                onClick={handlePrev}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/30 transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                aria-label="Next"
                onClick={handleNext}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/30 transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Lorem Ipsum is a seasoned financial strategist who studied Economics at the University of Indonesia and earned her MBA from Harvard Business School. With over 15 years&apos; experience advising multinational family offices, she drives RAC&apos;s vision for sustainable value creation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurPeopleMobile; 