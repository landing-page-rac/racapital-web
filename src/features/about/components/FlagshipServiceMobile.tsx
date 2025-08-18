'use client';

import React, { useState } from 'react';
import { AboutUsFlagshipService } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface FlagshipServiceMobileProps {
  flagshipServices?: AboutUsFlagshipService[];
}

const FlagshipServiceMobile: React.FC<FlagshipServiceMobileProps> = ({ flagshipServices = [] }) => {
  const [openCard, setOpenCard] = useState<number | null>(0); // Auto-open first card

  const handleCardClick = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-sm mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl text-white mb-4">
            OUR FLAGSHIP SERVICES
          </h2>
        </div>

        {/* Service Cards */}
        <div className="space-y-3">
          {flagshipServices.map((item, index) => {
            const isOpen = openCard === index;

            return (
              <div
                key={index}
                className={`
                  relative cursor-pointer transition-all duration-500 ease-in-out
                  overflow-hidden min-h-[120px] p-4
                  ${isOpen ? 'bg-white' : 'bg-[#0D52E5]'}
                `}
                onClick={() => handleCardClick(index)}
              >
                {/* Title */}
                <h3
                  className={`
                    text-lg font-bold mb-3 transition-colors duration-300
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
                  <div className="text-gray-700 leading-relaxed text-sm">
                    {renderRichTextContent(item.description)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlagshipServiceMobile; 