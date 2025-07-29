'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import InsightCard from './InsightCard';
import Image, { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';
import superGraphic from '../assets/super-graphic-1.png';
import CaseStudyButton from './CaseStudyButton';

interface CardData {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData | string;
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
    image: hero1,
  },
  {
    subtitle: 'INSIGHT',
    title: 'Unlocking value: The rise of alternative investments',
    description: 'Alternative investments are gaining traction. Learn how to leverage them for portfolio growth.',
    linkText: 'Read more',
    linkHref: '#',
    image: hero1,
  },
];

const CARD_WIDTH = 320; // px
const CARD_GAP = 24; // px
const AUTO_PLAY_INTERVAL = 30; // 30ms for smoother animation
const SCROLL_INCREMENT = 1; // pixels per interval for smoother scrolling

const InsightCarousel: React.FC<{ cards?: CardData[] }> = ({ cards = defaultCards }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const total = cards.length;

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

  // Hide scrollbar (utility class)
  const scrollbarHide = 'scrollbar-hide';

  return (
    <div className="w-full max-w-full bg-[#051F42] py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto gap-6 px-2 py-4 ${scrollbarHide} items-center ${isPlaying ? '' : 'snap-x snap-mandatory'}`}
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
          {cards.map((card, i) => {
            const isZoomed = hoveredIdx === i;
            return (
              <div
                key={i}
                className={`flex-shrink-0 transition-all duration-300 mx-3 ${isPlaying ? '' : 'snap-center'} ${isZoomed ? 'w-[400px] h-[560px] z-20' : 'w-[320px] h-[480px] z-10'}`}
                style={{ scrollSnapAlign: isPlaying ? 'none' : 'center' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(i)}
                onBlur={() => setHoveredIdx(null)}
                tabIndex={0}
              >
                <InsightCard {...card} />
              </div>
            );
          })}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-2">
          {/* Play/Pause Button */}
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlayPause}
            className="w-14 h-14 rounded-xl bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors"
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
            className="w-14 h-14 rounded-xl bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors"
          >
            <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={handleNext}
            className="w-14 h-14 rounded-xl bg-[#f4f4f4] flex items-center justify-center shadow hover:bg-[#e0e0e0] transition-colors"
          >
            <svg width="28" height="28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <p className='text-center mt-10 text-3xl px-44'>We conduct prudent and in-depth perspectives particulary tailored to help you achieve your utmost aspiration</p>

        <CaseStudyButton />
      </div>
    </div>
  );
};

export default InsightCarousel; 