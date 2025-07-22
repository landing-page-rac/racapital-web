'use client'
import React, { useRef, useState } from 'react';
import InsightCard from './InsightCard';
import { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';

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

const InsightCarousel: React.FC<{ cards?: CardData[] }> = ({ cards = defaultCards }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <div className="w-full max-w-full bg-[#051F42] py-20">
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto gap-6 snap-x snap-mandatory px-2 py-4 ${scrollbarHide} items-center`}
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
              className={`flex-shrink-0 snap-center transition-all duration-300 mx-3 ${isZoomed ? 'w-[400px] h-[560px] z-20' : 'w-[320px] h-[480px] z-10'}`}
              style={{ scrollSnapAlign: 'center' }}
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
    </div>
  );
};

export default InsightCarousel; 