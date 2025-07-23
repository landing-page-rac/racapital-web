'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

interface CaseStudyData {
  image: StaticImageData;
  label: string;
  title: string;
  description: string;
  link: string;
}

const caseStudies: CaseStudyData[] = [
  {
    image: hero1,
    label: 'CASE STUDY',
    title: 'GlobeBank leverages machine learning to cut fraud losses in real time.',
    description: 'How GlobeBank stopped threats before they struck',
    link: '#',
  },
  {
    image: hero2,
    label: 'CASE STUDY',
    title: 'AutoMotion scaled its EV production by deploying a digital twin of its assembly line.',
    description: 'See how AutoMotion accelerated output',
    link: '#',
  },
  {
    image: hero3,
    label: 'CASE STUDY',
    title: 'HealthSync uses advanced analytics to personalize patient care journeys.',
    description: 'Discover HealthSync\'s data-driven approach',
    link: '#',
  },
];

const CaseStudyListMobile: React.FC = () => {
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
      setActiveIndex(Math.max(0, Math.min(newIndex, caseStudies.length - 1)));

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
      setActiveIndex(Math.max(0, Math.min(newIndex, caseStudies.length - 1)));

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
      setActiveIndex(Math.max(0, Math.min(newIndex, caseStudies.length - 1)));
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
    const next = (activeIndex + 1) % caseStudies.length;
    goToCard(next);
  };

  const prevCard = () => {
    const prev = (activeIndex - 1 + caseStudies.length) % caseStudies.length;
    goToCard(prev);
  };

  return (
    <section className="bg-gradient-to-br from-[#1763F7] to-[#0F4CD1] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Case Studies
          </h2>
          <p className="text-blue-100 text-base leading-relaxed">
            Discover how we help organizations achieve transformative results
          </p>
        </motion.div>

        {/* Scrollable Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
            `}</style>

            {caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center"
                style={{ minWidth: 'calc(100vw - 2rem)' }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Image */}
                  <div className="relative mb-4">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {caseStudy.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                      {caseStudy.title}
                    </h3>
                    <motion.a
                      href={caseStudy.link}
                      className="inline-flex items-center text-blue-200 hover:text-white font-semibold text-sm transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {caseStudy.description}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                    ? 'bg-blue-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to case study ${index + 1}`}
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
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
            View All Case Studies
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyListMobile; 