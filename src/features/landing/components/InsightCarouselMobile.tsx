'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import superGraphic from '../assets/super-graphic-1.png';

interface CardData {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData;
}

const defaultCards: CardData[] = [
  {
    subtitle: 'INSIGHT',
    title: 'The future of finance: Decoding digital treasury',
    description: 'Explore how digital transformation is reshaping treasury management for modern organizations.',
    linkText: 'Explore approaches',
    linkHref: '#',
    image: hero1,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Reimagining resilience: Building adaptive organizations',
    description: 'In an era of constant disruption, companies need more than a contingency plan—they need an adaptive operating model that learns and evolves.',
    linkText: 'Discover strategies',
    linkHref: '#',
    image: hero2,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Unlocking value: The rise of alternative investments',
    description: 'Alternative investments are gaining traction. Learn how to leverage them for portfolio growth.',
    linkText: 'Read more',
    linkHref: '#',
    image: hero3,
  },
];

const InsightCarouselMobile: React.FC<{ cards?: CardData[] }> = ({ cards = defaultCards }) => {
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
    const walk = (x - startX) * 1.5; // Reduced sensitivity from 2x to 1.5x
    setDragDistance(Math.abs(walk));

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Only snap if the drag distance was significant enough
    if (dragDistance < MIN_SWIPE_DISTANCE) {
      // Return to original position if swipe wasn't significant
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: activeIndex * (scrollContainerRef.current.offsetWidth),
          behavior: 'smooth'
        });
      }
      return;
    }

    // Snap to nearest card
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, cards.length - 1)));

      // Smooth scroll to snapped position
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers for desktop testing
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
    const walk = (x - startX) * 1.5; // Reduced sensitivity from 2x to 1.5x
    setDragDistance(Math.abs(walk));

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Only snap if the drag distance was significant enough
    if (dragDistance < MIN_SWIPE_DISTANCE) {
      // Return to original position if swipe wasn't significant
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: activeIndex * (scrollContainerRef.current.offsetWidth),
          behavior: 'smooth'
        });
      }
      return;
    }

    // Snap to nearest card
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, cards.length - 1)));

      // Smooth scroll to snapped position
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Scroll handler to update active index
  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, cards.length - 1)));
    }
  };

  // Navigation functions
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
    const next = (activeIndex + 1) % cards.length;
    goToCard(next);
  };

  const prevCard = () => {
    const prev = (activeIndex - 1 + cards.length) % cards.length;
    goToCard(prev);
  };

  return (
    <section className="bg-gradient-to-br from-[#051F42] to-[#002E73] py-12 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto overflow-hidden">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-blue-100 text-base leading-relaxed">
            Discover our latest perspectives on finance and investment strategies
          </p>
        </motion.div>

        {/* Scrollable Carousel Container */}
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

            {cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center overflow-hidden"
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
                      src={card.image || hero1}
                      alt={card.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                      {card.description}
                    </p>
                    <motion.a
                      href={card.linkHref}
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold text-sm transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {card.linkText}
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
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-blue-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
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

        {/* Footer Text */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            We conduct prudent and in-depth perspectives particularly tailored to help you achieve your utmost aspiration
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightCarouselMobile; 