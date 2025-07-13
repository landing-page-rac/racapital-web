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
  const [index, setIndex] = useState(0);
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

  // Infinite next/prev
  const handleNext = () => {
    const next = (index + 1) % total;
    setIndex(next);
    scrollToIndex(next);
  };
  const handlePrev = () => {
    const prev = (index - 1 + total) % total;
    setIndex(prev);
    scrollToIndex(prev);
  };

  // Snap to card on index change
  React.useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  // Handle manual scroll to update index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const i = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
      setIndex(i % total);
    }
  };

  return (
    <div className="w-full max-w-full">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 snap-x snap-mandatory px-2 py-4 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
        onScroll={handleScroll}
      >
        {cards.concat(cards).map((card, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <div
              key={i}
              className={`flex-shrink-0 w-[320px] snap-center transition-transform duration-300 ${isHovered ? 'scale-110 z-20' : 'scale-100 z-10'}`}
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