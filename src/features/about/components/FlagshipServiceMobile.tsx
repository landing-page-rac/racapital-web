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

const FlagshipServiceMobile: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(1); // Auto-open first card

  const handleCardClick = (id: number) => {
    setOpenCard(openCard === id ? null : id);
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
          {serviceItems.map((item) => {
            const isOpen = openCard === item.id;

            return (
              <div
                key={item.id}
                className={`
                  relative cursor-pointer transition-all duration-500 ease-in-out
                  overflow-hidden min-h-[120px] p-4
                  ${isOpen ? 'bg-white' : 'bg-[#0D52E5]'}
                `}
                onClick={() => handleCardClick(item.id)}
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
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {item.description}
                  </p>
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