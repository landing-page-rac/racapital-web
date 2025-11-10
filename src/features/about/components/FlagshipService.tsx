'use client';

import React, { useState } from 'react';
import { AboutUsFlagshipService } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface FlagshipServiceProps {
  flagshipServices?: AboutUsFlagshipService[];
}

const FlagshipService: React.FC<FlagshipServiceProps> = ({ flagshipServices = [] }) => {
  const [openCard, setOpenCard] = useState<number | null>(0); // Auto-open first card (index: 0)

  const handleCardClick = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 px-10">
          <h2 className="text-xl lg:text-2xl text-white mb-4">
            OUR FLAGSHIP SERVICES
          </h2>
        </div>

        {/* Accordion Cards */}
        <div className="flex flex-col lg:flex-row items-end">
          {flagshipServices.map((item, index) => {
            const isOpen = openCard === index;
            // Calculate height based on index - higher index = smaller height
            const baseHeight = 400;
            const heightReduction = index * 50; // Reduce by 50px for each index
            const dynamicHeight = Math.max(baseHeight - heightReduction, 200); // Minimum height of 300px

            return (
              <div
                key={index}
                className={`
                  relative cursor-pointer transition-all duration-500 ease-in-out
                  ${isOpen
                    ? 'lg:flex-[2] bg-white'
                    : 'lg:flex-1'
                  }
                  overflow-hidden
                `}
                style={{
                  backgroundColor: isOpen ? 'white' : '#0D52E5',
                  height: `${dynamicHeight}px`
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="p-6 lg:p-8 h-full flex flex-col">
                  {/* Title */}
                  <h3
                    className={`
                      text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300
                      ${isOpen ? 'text-gray-900' : 'text-white'}
                    `}
                  >
                    {item.title}
                  </h3>

                  {/* Description - shown only when open */}
                  <div
                    className={`
                      transition-all duration-500 ease-in-out overflow-hidden
                      ${isOpen
                        ? 'opacity-100 max-h-96'
                        : 'opacity-0 max-h-0'
                      }
                    `}
                  >
                    <div className="text-gray-700 leading-relaxed">
                      {renderRichTextContent(item.description)}
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div
                  className={`
                    absolute inset-0 transition-opacity duration-300
                    ${isOpen ? 'opacity-0' : 'opacity-0 hover:opacity-10'}
                    bg-white pointer-events-none
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlagshipService; 