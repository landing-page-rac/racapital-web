'use client';

import React, { useState } from 'react';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: "Strategic Advisory",
    description: "We provide comprehensive strategic advisory services to help businesses navigate complex financial landscapes, optimize capital structure, and achieve sustainable growth through expert guidance and market insights."
  },
  {
    id: 2,
    title: "Capital Raising",
    description: "Our capital raising expertise spans across debt and equity financing, helping companies secure the funding they need to scale operations, expand market presence, and achieve their strategic objectives."
  },
  {
    id: 3,
    title: "M&A Advisory",
    description: "We guide clients through complex mergers and acquisitions, providing end-to-end advisory services from initial strategy and target identification to due diligence, valuation, and successful transaction closure."
  }
];

const FlagshipService: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(1); // Auto-open first card (id: 1)

  const handleCardClick = (id: number) => {
    setOpenCard(openCard === id ? null : id);
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
          {serviceItems.map((item, index) => {
            const isOpen = openCard === item.id;
            // Calculate height based on index - higher index = smaller height
            const baseHeight = 500;
            const heightReduction = index * 50; // Reduce by 50px for each index
            const dynamicHeight = Math.max(baseHeight - heightReduction, 300); // Minimum height of 300px

            return (
              <div
                key={item.id}
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
                onClick={() => handleCardClick(item.id)}
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
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
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